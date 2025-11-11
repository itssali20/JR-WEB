import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from "../firebase";

const STORAGE_KEY = "app_user_v1";
const STORAGE_TOKEN_KEY = "app_token_v1";

const UserContext = createContext();

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  authChecked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_AUTH":
      return {
        ...state,
        user: action.payload.user ?? null,
        token: action.payload.token ?? null,
        loading: false,
        error: null,
        authChecked: true,
      };
    case "CLEAR_AUTH":
      return { 
        ...state,
        user: null, 
        token: null, 
        loading: false, 
        error: null,
        authChecked: true,
      };
    case "UPDATE_USER":
      return { ...state, user: { ...(state.user || {}), ...action.payload } };
    case "SET_AUTH_CHECKED":
      return { ...state, authChecked: action.payload };
    default:
      return state;
  }
}

// Helper function to create/update user in Firestore
const createUserInFirestore = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  // If user doesn't exist, create them
  if (!userSnap.exists()) {
    const { displayName, email, photoURL, phoneNumber } = user;
    
    try {
      await setDoc(userRef, {
        uid: user.uid,
        displayName,
        email,
        photoURL,
        phoneNumber,
        ...additionalData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log("User created in Firestore");
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
    }
  } else {
    // Update existing user
    try {
      await setDoc(userRef, {
        updatedAt: serverTimestamp(),
        ...additionalData,
      }, { merge: true });
      console.log("User updated in Firestore");
    } catch (error) {
      console.error("Error updating user in Firestore:", error);
    }
  }
};

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist user/token to localStorage
  const persist = useCallback((user, token) => {
    try {
      if (user)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
      if (token)
        localStorage.setItem(STORAGE_TOKEN_KEY, token);
      else localStorage.removeItem(STORAGE_TOKEN_KEY);
    } catch (e) {
      console.error("Failed to persist auth", e);
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(STORAGE_KEY);
      const rawToken = localStorage.getItem(STORAGE_TOKEN_KEY);
      const user = rawUser ? JSON.parse(rawUser) : null;
      const token = rawToken ?? null;
      if (user || token) {
        dispatch({ type: "SET_AUTH", payload: { user, token } });
      } else {
        dispatch({ type: "SET_AUTH_CHECKED", payload: true });
      }
    } catch (e) {
      console.error("Failed to read user from localStorage", e);
      dispatch({ type: "SET_AUTH_CHECKED", payload: true });
    }
  }, []);

  // Firebase Auth State Listener with Firestore integration
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const token = await firebaseUser.getIdToken();
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          phoneNumber: firebaseUser.phoneNumber,
          providerData: firebaseUser.providerData,
          metadata: {
            creationTime: firebaseUser.metadata.creationTime,
            lastSignInTime: firebaseUser.metadata.lastSignInTime,
          }
        };

        // Create/update user in Firestore
        await createUserInFirestore(firebaseUser);

        dispatch({ type: "SET_AUTH", payload: { user, token } });
        persist(user, token);
      } else {
        // User is signed out
        dispatch({ type: "CLEAR_AUTH" });
        persist(null, null);
      }
    });

    return () => unsubscribe();
  }, [persist]);

  // ---- SIGNUP with Email/Password ----
  const signup = useCallback(
    async (userData) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const { user: firebaseUser } = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        // Update profile with additional information
        if (userData.firstName || userData.lastName) {
          await updateProfile(firebaseUser, {
            displayName: `${userData.firstName} ${userData.lastName}`.trim(),
          });
        }

        // Create user in Firestore with additional data
        await createUserInFirestore(firebaseUser, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          displayName: `${userData.firstName} ${userData.lastName}`.trim(),
        });

        // Get fresh token after profile update
        const token = await firebaseUser.getIdToken();
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          emailVerified: firebaseUser.emailVerified,
          metadata: {
            creationTime: firebaseUser.metadata.creationTime,
            lastSignInTime: firebaseUser.metadata.lastSignInTime,
          }
        };

        return { 
          user, 
          success: true, 
          message: "Registration successful!" 
        };
      } catch (error) {
        console.error("Signup error:", error);
        let errorMessage = "Registration failed. Please try again.";
        
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = "This email is already registered.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email address.";
            break;
          case 'auth/weak-password':
            errorMessage = "Password is too weak.";
            break;
          case 'auth/operation-not-allowed':
            errorMessage = "Email/password accounts are not enabled.";
            break;
          default:
            errorMessage = error.message;
        }
        
        dispatch({ type: "SET_ERROR", payload: errorMessage });
        throw new Error(errorMessage);
      }
    },
    []
  );

  // ---- LOGIN with Email/Password ----
  const login = useCallback(
    async (email, password) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        
        // Auth state listener will handle the rest
        return user;
      } catch (error) {
        console.error("Login error:", error);
        let errorMessage = "Login failed. Please try again.";
        
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = "No account found with this email.";
            break;
          case 'auth/wrong-password':
            errorMessage = "Incorrect password.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email address.";
            break;
          case 'auth/user-disabled':
            errorMessage = "This account has been disabled.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message;
        }
        
        dispatch({ type: "SET_ERROR", payload: errorMessage });
        throw new Error(errorMessage);
      }
    },
    []
  );

  // ---- GOOGLE AUTH ----
  const signInWithGoogle = useCallback(
    async (useRedirect = false) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const provider = new GoogleAuthProvider();
        
        // Add scopes if needed
        provider.addScope('profile');
        provider.addScope('email');
        
        // Optional: Custom parameters
        provider.setCustomParameters({
          prompt: 'select_account'
        });

        let result;
        if (useRedirect) {
          // Use redirect for mobile devices
          await signInWithRedirect(auth, provider);
          // The result will be handled by getRedirectResult
          return null;
        } else {
          // Use popup for desktop
          result = await signInWithPopup(auth, provider);
          
          // Create/update user in Firestore for Google sign-in
          await createUserInFirestore(result.user, {
            signInMethod: 'google'
          });
          
          return result.user;
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
        let errorMessage = "Google sign-in failed. Please try again.";
        
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = "Sign-in was cancelled.";
            break;
          case 'auth/popup-blocked':
            errorMessage = "Sign-in popup was blocked. Please allow popups for this site.";
            break;
          case 'auth/unauthorized-domain':
            errorMessage = "This domain is not authorized for Google sign-in.";
            break;
          default:
            errorMessage = error.message;
        }
        
        dispatch({ type: "SET_ERROR", payload: errorMessage });
        throw new Error(errorMessage);
      }
    },
    []
  );

  // Handle redirect result for Google auth
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User signed in with redirect, create/update in Firestore
          await createUserInFirestore(result.user, {
            signInMethod: 'google'
          });
          console.log("Google redirect sign-in successful");
        }
      } catch (error) {
        console.error("Google redirect error:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    handleRedirectResult();
  }, []);

  // ---- LOGOUT ----
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      // Auth state listener will handle clearing the state
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // ---- UPDATE USER PROFILE ----
  const updateUserProfile = useCallback(
    async (updates) => {
      try {
        if (!auth.currentUser) {
          throw new Error("No user is currently signed in.");
        }

        await updateProfile(auth.currentUser, updates);
        
        // Update user in Firestore
        await createUserInFirestore(auth.currentUser, updates);
        
        // Update local state
        dispatch({ type: "UPDATE_USER", payload: updates });
        
        // Get fresh user data
        const updatedUser = {
          ...state.user,
          ...updates
        };
        
        // Persist to localStorage
        persist(updatedUser, state.token);
        
        return updatedUser;
      } catch (error) {
        console.error("Update profile error:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
        throw error;
      }
    },
    [state.user, state.token, persist]
  );

  // ---- GET ID TOKEN ----
  const getIdToken = useCallback(async (forceRefresh = false) => {
    try {
      if (auth.currentUser) {
        return await auth.currentUser.getIdToken(forceRefresh);
      }
      return null;
    } catch (error) {
      console.error("Get ID token error:", error);
      return null;
    }
  }, []);

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    authChecked: state.authChecked,
    isAuthenticated: !!state.user && !!state.token,
    signup,
    login,
    logout,
    updateUser: updateUserProfile,
    signInWithGoogle,
    getIdToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}

export default UserContext;