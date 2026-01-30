import React from "react";
import { useTranslation } from "react-i18next";
import Jahangir from "../../src/assets/images/team/jahangirt.jpg";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-[#0a0c2a] via-[#0d122f] to-[#001a3a] text-white py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold mb-10 leading-tight">
            {t('contact.heading')}
          </h2>

          <div className="flex items-center mb-6">
            <img
              src={Jahangir}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-lg">Muhammad Jahangir Ahmad</h4>
              <p className="text-gray-400 text-sm">{t('contact.ceo_title')}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-md">
            {t('contact.description')}
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">{t('contact.form_name')}</label>
              <input
                type="text"
                placeholder={t('contact.placeholder_name')}
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">{t('contact.form_email')}</label>
              <input
                type="email"
                placeholder={t('contact.placeholder_email')}
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">{t('contact.form_service_needed')}</label>
            <select className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>{t('contact.service_branding')}</option>
              <option>{t('contact.service_web_design')}</option>
              <option>{t('contact.service_development')}</option>
              <option>{t('contact.service_marketing')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">{t('contact.form_message')}</label>
            <textarea
              placeholder={t('contact.placeholder_message')}
              rows="5"
              className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:opacity-90 transition"
          >
            {t('contact.submit_btn')}
          </button>
        </form>
      </div>
    </section>
  );
}
