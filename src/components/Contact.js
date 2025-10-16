import React from "react";

export default function ContactSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0a0c2a] via-[#0d122f] to-[#001a3a] text-white py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Section */}
        <div>
          <p className="text-orange-500 font-semibold mb-3">{`{ Get in touch }`}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight">
            LET’S START YOUR PROJECT TODAY
          </h2>

          <div className="flex items-center mb-6">
            <img
              src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-lg">Michael Bridges</h4>
              <p className="text-gray-400 text-sm">CEO, BrightEdge</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-md">
            At BrightEdge, we believe in building meaningful digital experiences.
            If you ever have questions or need guidance, I’m always here to
            support you. Your success is our mission — let’s create something
            incredible together.
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="johnsmith@gmail.com"
                className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Service Needed ?</label>
            <select className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Branding</option>
              <option>Web Design</option>
              <option>Development</option>
              <option>Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">What Can I Help You...</label>
            <textarea
              placeholder="Hello, I'd like to enquire about..."
              rows="5"
              className="w-full bg-[#2b2b2b] text-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff5e2d] text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
