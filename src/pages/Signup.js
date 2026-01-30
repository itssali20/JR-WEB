import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";


const SignupScreen = () => {
  const { t } = useTranslation();
  const { signup, signInWithGoogle, loading, error } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear field error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = t("signup.error_first_name");
    }

    if (!formData.lastName.trim()) {
      errors.lastName = t("signup.error_last_name");
    }

    if (!formData.email.trim()) {
      errors.email = t("signup.error_email_required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t("signup.error_email_invalid");
    }

    if (!formData.password) {
      errors.password = t("signup.error_password_required");
    } else if (formData.password.length < 6) {
      errors.password = t("signup.error_password_length");
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t("signup.error_password_match");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      
      // Success - you can redirect or show success message here
      console.log("Signup successful!");
      
    } catch (err) {
      // Error is handled by context, you can show additional UI feedback if needed
      console.error("Signup failed:", err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      console.log("Google signup successful!");
    } catch (err) {
      console.error("Google signup failed:", err);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-blue-600 text-4xl">*</span>
              <h1 className="text-3xl font-bold text-gray-900">JR Digital Media</h1>
            </div>
            <p className="text-gray-600 text-lg">{t("signup.subtitle")}</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Google Signup Button - Moved to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? t("signup.signing_up") : t("signup.continue_google")}
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t("signup.or_email")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("signup.first_name_label")}
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("signup.first_name_placeholder")}
              />
              {formErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("signup.last_name_label")}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("signup.last_name_placeholder")}
              />
              {formErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t("signup.email_label")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("signup.email_placeholder")}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t("signup.password_label")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("signup.password_placeholder")}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {t("signup.confirm_password_label")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("signup.confirm_password_placeholder")}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                {t("signup.terms_agree")}{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  {t("signup.terms_link")}
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow-lg mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    {t("signup.creating_account")}
                  </div>
                ) : (
                  t("signup.create_account")
              )}
            </motion.button>

            {/* Login Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                {t("signup.have_account")}{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                  {t("signup.sign_in")}
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Section - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center relative z-10 max-w-md"
        >
          {/* Large Asterisk */}
          <div className="text-blue-600 text-9xl mb-8">*</div>
          
          {/* Main Heading */}
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            {t("signup.join_heading")} <span className="text-blue-600">JR Digital Media</span>
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {t("signup.description")}
          </p>

          {/* Features List */}
          <div className="space-y-4 text-left">
            {[
              "Access to exclusive design resources",
              "Connect with creative professionals",
              "Showcase your portfolio",
              "Get inspired by latest trends"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Team Avatars */}
          <div className="mt-12">
            <p className="text-gray-600 mb-4">{t("signup.join_customers")}</p>
            <div className="flex justify-center -space-x-3">
              {["men/1", "women/44", "women/68", "men/32", "women/22"].map((path, i) => (
                <img
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg"
                  src={`https://randomuser.me/api/portraits/${path}.jpg`}
                  alt={`user${i}`}
                />
              ))}
              <div className="w-12 h-12 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                +9995
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default SignupScreen;