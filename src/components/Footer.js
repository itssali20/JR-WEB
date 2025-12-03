import React from "react";
import logo from "../assets/images/logo.png";
import instagramIcon from "../assets/icons/instagram.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] text-gray-800 py-16 px-8 md:px-20 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-12">
        {/* Left Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center mb-6">
            <img
              src={logo}
              alt="BrightEdge Logo"
              className="w-auto h-10 mr-3"
            />
          </div>

          {/* Contact Info */}
          <p className="text-gray-600 mb-2">+971 529126465</p>
          <p className="text-gray-900 font-semibold mb-6">
            info@jrdigitalmedia.info
          </p>

          {/* Navigation */}
          <div>
            <ul className="text-gray-700 space-y-1">
              <li className="flex lg:flex-wrap gap-4 lg:gap-5 text-[15px]">
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  Home
                </a>
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  About
                </a>
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  Services
                </a>
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  Projects
                </a>
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  Blogs
                </a>
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  Pricing
                </a>
                <a href="#" className="hover:text-gray-900 transition text-[10px]">
                  Contact
                </a>
              </li>
            </ul>

            <ul className="text-gray-700 space-y-1 mt-4">
              <li className="flex flex-wrap gap-5">
                <a
                  href="https://www.instagram.com/jandr.info?igsh=bDMwaWF1NGEzbHRj"
                  className="text-gray-600 hover:text-gray-900 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://www.facebook.com/share/17Tr3DJ4s9/?mibextid=wwXIfr"
                  className="text-gray-600 hover:text-gray-900 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/jrinternational/"
                  className="text-gray-600 hover:text-gray-900 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="font-semibold mb-3">Address</h4>
          <p className="text-gray-700 mb-4 leading-relaxed">
            office 1105, building 11th floor, Warsan tower, al
            barsha, Dubai, UAE.
          </p>

          <div className="rounded-lg overflow-hidden border border-gray-300">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0157307486065!2d55.176408574834284!3d25.101328835578187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b7655e944ed%3A0x5555fe6370e4f712!2swarsan%20towers!5e0!3m2!1sen!2s!4v1760645097448!5m2!1sen!2s"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>
          © 2025
          <a
            href="#"
            className="text-gray-800 underline hover:text-gray-900 transition"
          >
            {" "}
            JR Digital Media
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
