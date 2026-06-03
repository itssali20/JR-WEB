import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Jahangir from "../../src/assets/images/team/jahangirt.jpg";

// 🔧 Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID  = "service_f0xeo0h";
const EMAILJS_TEMPLATE_ID = "template_y93cjx4";
const EMAILJS_PUBLIC_KEY  = "-1dEw9QgK0TwsaNh5";

export default function ContactSection() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name:    formData.name,
      from_email:   formData.email,
      service:      formData.service,
      message:      formData.message,
      to_email:     "jrdigitalmediacollc@gmail.com",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0a0c2a] via-[#0d122f] to-[#001a3a] text-white py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold mb-10 leading-tight">
            {t("contact_heading")}
          </h2>

          <div className="flex items-center mb-6">
            <img
              src={Jahangir}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-lg">Muhammad Jahangir Ahmad</h4>
              <p className="text-gray-400 text-sm">{t("ceo_title")}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-md">{t("desc")}</p>
        </div>

        {/* Right Section - Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">{t("name_label")}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("name_placeholder")}
                required
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">{t("email_label")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("email_placeholder")}
                required
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">{t("service_label")}</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                {t("service_placeholder") || "Select a service"}
              </option>
              <option value="Branding">{t("branding")}</option>
              <option value="Web Design">{t("web_design")}</option>
              <option value="Development">{t("development")}</option>
              <option value="Marketing">{t("marketing")}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">{t("message_label")}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("message_placeholder")}
              rows="5"
              required
              className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          {/* Status messages */}
          {status === "success" && (
            <p className="text-green-400 text-sm">
              ✅ Message sent! We'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">
              ❌ Something went wrong. Please try again or email us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : t("submit_btn")}
          </button>
        </form>
      </div>
    </section>
  );
}