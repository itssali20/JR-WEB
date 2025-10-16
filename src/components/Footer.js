import React from "react";
import logo from "../assets/images/logo.png";

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
              className="w-[50%] h-10 mr-3"
            />
          </div>

          {/* Contact Info */}
          <p className="text-gray-600 mb-2">+1 (555) 987-6543</p>
          <p className="text-gray-900 font-semibold mb-6">
            support@brightedge.com
          </p>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-2">Navigation</h4>
            <ul className="text-gray-700 space-y-1">
              <li className="flex flex-wrap gap-5 text-[15px]">
                <a href="#" className="hover:text-gray-900 transition">
                  Home
                </a>
                <a href="#" className="hover:text-gray-900 transition">
                  About
                </a>
                <a href="#" className="hover:text-gray-900 transition">
                  Services
                </a>
                <a href="#" className="hover:text-gray-900 transition">
                  Projects
                </a>
                <a href="#" className="hover:text-gray-900 transition">
                  Blogs
                </a>
                <a href="#" className="hover:text-gray-900 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="font-semibold mb-3">Address</h4>
          <p className="text-gray-700 mb-4 leading-relaxed">
            1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
          </p>

          <div className="rounded-lg overflow-hidden border border-gray-300">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA+94043&output=embed"
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
          © Copyright 2025. All Rights Reserved by{" "}
          <a
            href="#"
            className="text-gray-800 underline hover:text-gray-900 transition"
          >
            SafoLifeTech
          </a>
        </p>

      </div>
    </footer>
  );
}
