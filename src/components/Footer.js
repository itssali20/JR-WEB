import React from "react";
import logo from "../assets/images/logo.png";
import instagramIcon from "../assets/icons/instagram.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import behanceIcon from "../assets/icons/behance.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] text-gray-800 py-16 px-8 md:px-20 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-16 lg:mb-12">
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

          {/* Navigation */}
          <div>
            <ul className="text-gray-700 space-y-1">
              <li className="flex lg:flex-wrap gap-4 lg:gap-5">
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
                  About
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
                  Blogs
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="hover:text-gray-900 transition text-[10px] lg:text-[15px]"
                >
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
                <a
                  href="https://www.behance.net/jrdigimediacollc"
                  className="text-gray-600 hover:text-gray-900 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={behanceIcon} alt="Behance" className="w-6 h-6" />
                </a>
                <a
                  href="https://www.youtube.com/@JRDigitalMedia-co"
                  className="text-gray-600 hover:text-gray-900 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={youtubeIcon} alt="Youtube" className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="font-semibold mb-3">Address</h4>
          <p className="text-gray-700 lg:mb-4 leading-relaxed">
            office 1105, building 11th floor, Warsan tower, al
            barsha, Dubai, UAE.
          </p>
          <span className="font-semibold">Phone no: <p className="text-gray-600 mb-2"> +971 529126465</p></span>
          <span className="font-semibold">Email: <p className="text-gray-900 font-semibold mb-6">
            info@jrdigitalmedia.info
          </p></span>
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
