// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoS_2J_gJ4mh8jFIsnVRNLJnesE6Y_OxE",
  authDomain: "jr-digital-media.firebaseapp.com",
  projectId: "jr-digital-media",
  storageBucket: "jr-digital-media.firebasestorage.app",
  messagingSenderId: "338001909591",
  appId: "1:338001909591:web:c798daacf75e32f970d012",
  measurementId: "G-JNYE7E535G"
};

// ✅ Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export Firebase instances
export { app, auth, db, storage };
export { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword };
export { ref, uploadBytes, getDownloadURL, setDoc, doc };
