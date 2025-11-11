// Profile.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AvatarBadge from "../components/Avatar";
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave, FiX, FiCheck } from "react-icons/fi";

const Profile = () => {
  const { user, updateUser, loading } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await updateUser({
        displayName: formData.displayName.trim(),
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user.displayName || "",
    });
    setIsEditing(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <AvatarBadge 
                  user={user} 
                  size="3xl" 
                  className="flex-shrink-0"
                />
              </div>
              
              <div className="text-center sm:text-left text-white flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-xl font-bold w-full max-w-md"
                    placeholder="Enter your name"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {user.displayName || "Anonymous User"}
                  </h1>
                )}
                <p className="text-blue-100 mt-1 flex items-center justify-center sm:justify-start">
                  <FiMail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                <p className="text-blue-100 mt-1 flex items-center justify-center sm:justify-start">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Joined {formatDate(user.metadata?.creationTime)}
                </p>
              </div>

              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saveLoading || !formData.displayName.trim()}
                      className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saveSuccess ? (
                        <FiCheck className="w-4 h-4" />
                      ) : saveLoading ? (
                        <div className="w-4 h-4 border-t-2 border-blue-600 border-solid rounded-full animate-spin" />
                      ) : (
                        <FiSave className="w-4 h-4" />
                      )}
                      <span>{saveSuccess ? "Saved!" : saveLoading ? "Saving..." : "Save"}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saveLoading}
                      className="flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors disabled:opacity-50"
                    >
                      <FiX className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                  Account Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-gray-900 mt-1">{user.displayName || "Not set"}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-gray-900 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Verification</label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.emailVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.emailVerified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
                  Account Stats
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p className="text-gray-900 mt-1">{formatDate(user.metadata?.creationTime)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Sign In</label>
                    <p className="text-gray-900 mt-1">{formatDate(user.metadata?.lastSignInTime)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">User ID</label>
                    <p className="text-gray-900 text-sm font-mono truncate mt-1">{user.uid}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentication Provider Info */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h2>
              <div className="flex items-center space-x-3">
                {user.providerData?.[0]?.providerId === 'google.com' ? (
                  <>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Signed in with Google</p>
                      <p className="text-sm text-gray-600">Connected to {user.email}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <FiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Signed in with Email</p>
                      <p className="text-sm text-gray-600">Password authentication</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;