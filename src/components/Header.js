// Header.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import AvatarBadge from "./Avatar";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const goToSection = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      navigate(`#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUserMenuToggle = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navItems = [
    { id: "about", label: "THE BRAND" },
    { id: "services", label: "SERVICES" },
    { id: "portfolio", label: "PROFILE" },
    { id: "pricing", label: "PRICING" },
  ];

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    if (id === "portfolio") {
      navigate("/portfolio");
    } else if (id === "about") {
      if (location.pathname === "/") {
        navigate("#about");
      } else {
        navigate("/#about");
      }
    } else {
      goToSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-2xl border-b border-blue-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" onClick={() => goToSection("home")}>
            <img src={logo} alt="Logo" className="h-[45px] transition-transform duration-300 hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="text-gray-800 font-bold tracking-wide text-sm uppercase hover:text-blue-700 transition-all duration-300 relative group"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-800 transition-all duration-300 group-hover:w-full rounded-full"></span>
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-400 blur-sm transition-all duration-500 group-hover:w-4/5 group-hover:left-1/10"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                >
                  <AvatarBadge 
                    user={user} 
                    size="sm" 
                    className="flex-shrink-0"
                  />
                  <span className="text-gray-800 font-semibold max-w-[120px] truncate">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-blue-600 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 py-3 z-50 backdrop-blur-sm">
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <FiUser className="w-4 h-4 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/portfolio"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <FiBriefcase className="w-4 h-4 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Portfolio</span>
                    </Link>
                    <div className="border-t border-blue-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                    >
                      <svg className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/contact">
                <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white font-bold tracking-wide text-sm uppercase shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-blue-900 relative overflow-hidden group">
                  <span className="relative z-10">GET IN TOUCH</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-800 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-2xl border-t border-blue-100">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="block w-full text-left text-gray-800 font-bold py-4 px-6 hover:bg-blue-50 border-b border-blue-50 uppercase tracking-wide text-sm transition-all duration-200"
            >
              {label}
            </button>
          ))}
          <div className="border-t border-blue-100 p-6 bg-gradient-to-b from-blue-50/50 to-white">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <AvatarBadge 
                    user={user} 
                    size="lg" 
                    showName={true}
                    className="justify-center"
                  />
                </div>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-3 w-full bg-white text-gray-800 py-4 rounded-xl font-bold border border-blue-100 hover:bg-blue-50 hover:shadow-lg transition-all duration-200"
                >
                  <FiUser className="w-5 h-5 text-blue-600" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/portfolio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-3 w-full bg-white text-gray-800 py-4 rounded-xl font-bold border border-blue-100 hover:bg-blue-50 hover:shadow-lg transition-all duration-200"
                >
                  <FiBriefcase className="w-5 h-5 text-blue-600" />
                  <span>Portfolio</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white py-4 rounded-full font-bold tracking-wide text-sm uppercase shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  GET IN TOUCH
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Add missing FiUser and FiBriefcase icon imports
const FiUser = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const FiBriefcase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h0V6" />
  </svg>
);

export default Header;