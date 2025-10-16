import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import video from "../assets/videos/video.mp4";

const HeroSection = () => {
  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const opacity = useTransform(smoothY, [0, 200], [1, 0]);
  const videoScale = useTransform(smoothY, [0, 400], [1, 1.15]);
  const videoWidth = useTransform(smoothY, [0, 400], ["65%", "100%"]);
  const borderRadius = useTransform(smoothY, [0, 400], ["6rem", "0rem"]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* Mobile Text Overlay - Visible only on mobile */}
      <div className="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 lg:hidden">
        <div className="max-w-xl">
          <p className="text-gray-900 font-semibold text-xl flex items-center">
            <span className="text-red-500 text-6xl mr-2">*</span>
            We are digital design
          </p>

          <h1 className="text-6xl leading-[4rem] font-extrabold text-gray-900 mt-4 tracking-tight">
            CREATORS
          </h1>

          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            From Concept to Creation — Beautiful design has the power to captivate audiences
          </p>

          <div className="flex items-center mt-10 space-x-4">
            <div className="flex -space-x-3">
              {["men/1", "women/44", "women/68", "men/32"].map((path, i) => (
                <img
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  src={`https://randomuser.me/api/portraits/${path}.jpg`}
                  alt={`team${i}`}
                />
              ))}
            </div>

            <div className="flex items-center">
              <span className="text-gray-900 font-medium mr-3">Meet Our Team</span>
              <button className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition">
                <span className="text-2xl text-gray-900">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Text Section - Hidden on mobile */}
      <motion.div
        style={{ opacity }}
        className="absolute z-20 top-0 left-0 w-full lg:w-1/2 h-full flex-col justify-center items-start px-8 lg:px-20 hidden lg:flex"
      >
        <div className="max-w-xl">
          <p className="text-gray-900 font-semibold text-xl flex items-center">
            <span className="text-red-500 text-6xl mr-2">*</span>
            We are digital design
          </p>

          <h1 className="text-[7.5rem] leading-[5.5rem] font-extrabold text-gray-900 mt-4 tracking-tight">
            CREATORS
          </h1>

          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            From Concept to Creation — Beautiful design has the power to captivate audiences
          </p>

          <div className="flex items-center mt-10 space-x-4">
            <div className="flex -space-x-3">
              {["men/1", "women/44", "women/68", "men/32"].map((path, i) => (
                <img
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  src={`https://randomuser.me/api/portraits/${path}.jpg`}
                  alt={`team${i}`}
                />
              ))}
            </div>

            <div className="flex items-center">
              <span className="text-gray-800 font-medium mr-3">Meet Our Team</span>
              <button className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Section - Full width on mobile, animated on desktop */}
      <motion.div 
        style={{ 
          width: videoWidth,
          borderTopLeftRadius: borderRadius
        }}
        className="relative w-full lg:w-[65%] rounded-tl-[6rem] overflow-hidden ml-auto"
      >
        {/* Overlay for mobile text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-0 z-10"></div>
        
        <motion.video
          style={{ scale: videoScale }}
          className="w-full h-[80vh] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </motion.video>

        {/* Badge */}
        <div className="absolute bottom-8 right-8 w-28 h-28 flex items-center justify-center z-20">
          <div className="absolute w-full h-full rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-700 animate-spin-slow">
            <span className="tracking-widest font-medium">
              INSIGHT • SOLUTION • CREATE • IDEA •
            </span>
          </div>
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-4 right-4 bg-white px-6 py-2 rounded-tl-2xl shadow-md z-20">
          <h2 className="text-gray-900 font-extrabold text-2xl leading-tight">
            CREATING WORK <br /> THAT INSPIRES
          </h2>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;