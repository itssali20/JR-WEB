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
            {t('contact_heading')}
          </h2>

          <div className="flex items-center mb-6">
            <img
              src={Jahangir}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-lg">Muhammad Jahangir Ahmad</h4>
              <p className="text-gray-400 text-sm">{t('ceo_title')}</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-md">
            {t('desc')}
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">{t('name_label')}</label>
              <input
                type="text"
                placeholder={t('name_placeholder')}
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">{t('email_label')}</label>
              <input
                type="email"
                placeholder={t('email_placeholder')}
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">{t('service_label')}</label>
            <select className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>{t('branding')}</option>
              <option>{t('web_design')}</option>
              <option>{t('development')}</option>
              <option>{t('marketing')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">{t('message_label')}</label>
            <textarea
              placeholder={t('message_placeholder')}
              rows="5"
              className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:opacity-90 transition"
          >
            {t('submit_btn')}
          </button>
        </form>
      </div>
    </section>
  );
}
