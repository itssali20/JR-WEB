import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function WorkWithBadMarketingForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    businessType: "",
    instagram: "",
    solutions: {},
    revenue: "",
    heardFrom: "",
    currentMarketing: "",
    consent: true,
  });

  const [status, setStatus] = useState({ state: "idle", message: "" });

  const solutionList = [
    "Email / SMS Marketing",
    "Facebook / Instagram Ads",
    "Google / Youtube Ads",
    "Amazon Growth",
    "TikTok Shops",
    "Lead Generation",
  ];

  const revenues = [
    "<$20k",
    "$20k-$50k",
    "$50k-100k",
    "$100k-$250k",
    "$250k-$500k",
    "$500k-$1m",
    "$1m+",
  ];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "consent") {
      setForm((s) => ({ ...s, consent: checked }));
      return;
    }

    if (type === "checkbox") {
      setForm((s) => ({
        ...s,
        solutions: { ...s.solutions, [name]: checked },
      }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      return "Please provide your full name.";
    }
    if (!form.email.trim()) return "Please provide your email.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "Please provide a valid email.";
    if (!form.phone.trim()) return "Please provide a phone number.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "submitting", message: "Submitting..." });
    const err = validate();
    if (err) {
      setStatus({ state: "error", message: err });
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus({
        state: "success",
        message: "Thank you! Your submission has been received!",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        businessType: "",
        instagram: "",
        solutions: {},
        revenue: "",
        heardFrom: "",
        currentMarketing: "",
        consent: true,
      });
    } catch (e) {
      setStatus({
        state: "error",
        message: "Oops! Something went wrong while submitting the form.",
      });
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-blue-100/10 pt-20">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-20 animate-bounce delay-700"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-ping"></div>

          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full translate-x-1/3 translate-y-1/3 opacity-20 blur-3xl animate-pulse delay-1000"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">
                We're accepting new clients
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              LET'S CREATE
              <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent animate-gradient">
                SOMETHING GREAT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business? Let's discuss how we can drive
              exceptional results together.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 pt-8 border-t border-blue-500/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-blue-200 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-blue-200 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24h</div>
                <div className="text-blue-200 text-sm">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </section>

        <main className="relative py-20">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left - Enhanced Content Section */}
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>
                  <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    LET'S GET
                    <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      STARTED
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Please fill out this application, and one of our team
                    members will get back to you as soon as possible.
                  </p>
                </div>

                {/* Enhanced Info Card */}
                <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 shadow-2xl group hover:shadow-3xl transition-all duration-500">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Need to reach us another way?
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Check our social links in the footer or send us an email at{" "}
                    <a
                      href="hello@jandr.info"
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors underline"
                    >
                      hello@jandr.info
                    </a>
                    .
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Typically replies within 2 hours
                    </div>
                  </div>
                </div>

                {/* Enhanced Contact Details */}
                <div className="space-y-6 pt-8">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-blue-200">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Call Us Directly
                      </h3>
                      <p className="text-gray-600 text-lg font-medium">
                        +971529126565
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-blue-200">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Send Us an Email
                      </h3>
                      <p className="text-gray-600 text-lg font-medium">
                        hello@jandr.info
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Enhanced Form with Animated Border */}
              <div className="relative">
                {/* Animated Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 rounded-3xl blur-lg opacity-75 animate-gradient-x"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 rounded-3xl blur-lg opacity-50 animate-gradient-x delay-1000"></div>

                {/* Main Form Container */}
                <form
                  className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-8 border-white backdrop-blur-sm"
                  onSubmit={handleSubmit}
                >
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Project Application
                    </h3>
                    <p className="text-gray-600">
                      Tell us about your business goals
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col group">
                        <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                          First name *
                        </span>
                        <input
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                          required
                        />
                      </label>

                      <label className="flex flex-col group">
                        <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                          Last name *
                        </span>
                        <input
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                          required
                        />
                      </label>
                    </div>

                    {/* Contact Fields */}
                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Email *
                      </span>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                        required
                      />
                    </label>

                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Phone number *
                      </span>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                        required
                      />
                    </label>

                    {/* Company Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col group">
                        <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                          Company
                        </span>
                        <input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                        />
                      </label>

                      <label className="flex flex-col group">
                        <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                          Website
                        </span>
                        <input
                          name="website"
                          value={form.website}
                          onChange={handleChange}
                          placeholder="https://"
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                        />
                      </label>
                    </div>

                    {/* Business Type */}
                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        What Kind Of Business?
                      </span>
                      <select
                        name="businessType"
                        value={form.businessType}
                        onChange={handleChange}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                      >
                        <option value="">Type Of Business</option>
                        <option>Local Business</option>
                        <option>Ecommerce/Amazon</option>
                        <option>Course/Coaching</option>
                        <option>Automotive</option>
                        <option>Other</option>
                      </select>
                    </label>

                    {/* Instagram */}
                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Business Instagram
                      </span>
                      <input
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        placeholder="@yourhandle"
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                      />
                    </label>

                    {/* Solutions Checkboxes */}
                    <div className="group">
                      <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        What Solutions are you interested in?
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Select ALL that apply
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {solutionList.map((s) => (
                          <label
                            key={s}
                            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group-hover:shadow-lg"
                          >
                            <input
                              type="checkbox"
                              name={s}
                              checked={!!form.solutions[s]}
                              onChange={handleChange}
                              className="rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {s}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Revenue */}
                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        What's your monthly revenue?
                      </span>
                      <select
                        name="revenue"
                        value={form.revenue}
                        onChange={handleChange}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                      >
                        <option value="">Select</option>
                        {revenues.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </label>

                    {/* How did you hear about us */}
                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        How did you hear about us?
                      </span>
                      <input
                        name="heardFrom"
                        value={form.heardFrom}
                        onChange={handleChange}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                      />
                    </label>

                    {/* Current Marketing */}
                    <label className="flex flex-col group">
                      <span className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        What kind of marketing are you currently doing?
                      </span>
                      <textarea
                        name="currentMarketing"
                        value={form.currentMarketing}
                        onChange={handleChange}
                        rows={4}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/50 backdrop-blur-sm resize-none"
                      />
                    </label>

                    {/* Consent Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div className="text-xs text-gray-600 mb-4">
                        <p>
                          By submitting this form, you agree to receive text
                          messages from us. By signing up via text, you agree to
                          receive recurring automated marketing messages,
                          including call reminders, at the phone number
                          provided. Consent is not a condition of purchase. Text
                          HELP for Help or Reply STOP to unsubscribe. Message
                          frequency varies. Msg & data rates may apply. Your
                          Privacy is our priority. Your information will not be
                          shared.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={form.consent}
                            onChange={handleChange}
                            className="rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
                          />
                          <span className="text-sm font-semibold text-gray-700">
                            I agree to receive messages
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={status.state === "submitting"}
                        className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white font-bold tracking-wide uppercase shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-blue-900 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {status.state === "submitting" ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              PROCESSING...
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              LAUNCH YOUR PROJECT
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                      </button>

                      {status.state === "success" && (
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {status.message}
                        </div>
                      )}
                      {status.state === "error" && (
                        <div className="flex items-center gap-2 text-red-600 font-semibold">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          {status.message}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Enhanced CTA Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              READY TO GET STARTED?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's schedule a call to discuss your project and see how we can
              help you achieve remarkable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://calendly.com/jrdigitalmedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white font-bold tracking-wide uppercase shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-lg">
                  Schedule a call
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Add custom animations */}
        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </div>
    </>
  );
}
