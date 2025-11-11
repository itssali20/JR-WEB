// components/AvatarBadge.js
import React, { useState, useEffect } from "react";

const AvatarBadge = ({ 
  user, 
  size = "md",
  className = "",
  showName = false 
}) => {
  const [imageError, setImageError] = useState(false);
  const [hasValidImage, setHasValidImage] = useState(false);

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
    "2xl": "w-20 h-20 text-xl",
    "3xl": "w-24 h-24 text-2xl"
  };

  useEffect(() => {
    // Reset image error state when user changes
    setImageError(false);
    setHasValidImage(false);
    
    // Check if photoURL exists and is a valid URL
    if (user?.photoURL) {
      const img = new Image();
      img.src = user.photoURL;
      img.onload = () => setHasValidImage(true);
      img.onerror = () => setImageError(true);
    }
  }, [user]);

  const getUserInitials = () => {
    if (user?.displayName) {
      const names = user.displayName.split(' ').filter(name => name.length > 0);
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0]?.slice(0, 2).toUpperCase() || "U";
    }
    return user?.email?.slice(0, 2).toUpperCase() || "U";
  };

  const getUserDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getColorClass = (str) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-teal-500 to-teal-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600"
    ];
    
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const colorClass = getColorClass(user?.displayName || user?.email || "user");

  // Show badge if no valid image URL or image failed to load
  const showBadge = !hasValidImage || imageError;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {!showBadge && user?.photoURL ? (
        <img
          src={user.photoURL}
          alt={getUserDisplayName()}
          onError={() => setImageError(true)}
          className={`${sizes[size]} rounded-full object-cover border border-gray-200 shadow-sm`}
        />
      ) : (
        <div className={`${sizes[size]} ${colorClass} rounded-full flex items-center justify-center text-white font-semibold shadow-sm border border-white/20`}>
          {getUserInitials()}
        </div>
      )}
      
      {showName && (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-sm">
            {getUserDisplayName()}
          </span>
          {user?.email && (
            <span className="text-gray-500 text-xs">
              {user.email}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarBadge;