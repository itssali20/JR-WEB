import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import video from "../assets/videos/video.mp4";
import { ReactComponent as AsteriskIcon } from "../assets/icons/asterisk.svg";

const HeroSection = () => {
  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const opacity = useTransform(smoothY, [0, 200], [1, 0]);
  const videoScale = useTransform(smoothY, [0, 400], [1, 1.15]);
  const videoWidth = useTransform(smoothY, [0, 400], ["54%", "54%"]);
  const borderRadius = useTransform(smoothY, [0, 400], ["6rem", "0rem"]);

  return (
    <section className="relative mt-[7%] w-full min-h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* Mobile Text Overlay - Visible only on mobile */}
      <div className="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 lg:hidden">
        <div className="max-w-xl">
          <p className="text-[#333333] font-semibold text-3xl flex items-center">
            <AsteriskIcon className="text-blue-600 w-16 h-16 mr-2" />
            We are digital design
          </p>

          <h1 className="text-6xl leading-[4rem] font-semibold md:font-extrabold lg:font-extrabold text-gray-900 mt-4 tracking-tight">
            CREATORS
          </h1>

          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            From Concept to Creation — Beautiful design has the power to captivate audiences
          </p>

        </div>
      </div>

      {/* Desktop Text Section - Hidden on mobile */}
      <motion.div
        style={{ opacity }}
        className="absolute z-20 top-0 left-0 w-full lg:w-[80%] h-full flex-col justify-center items-start px-8 lg:px-20 hidden lg:flex"
      >
        <div className="max-w-2xl">
          {/* Subtitle with larger asterisk */}
          <p className="text-[#333333] font-semibold text-3xl flex items-center">
            <AsteriskIcon className="text-blue-600 w-10 h-10 mr-4" />
            We are digital design
          </p>

          {/* Main heading */}
          <h1 className="text-[6.6rem] leading-[8.5rem] font-bold text-gray-800 tracking-tight">
            CREATORS
          </h1>

          {/* Description text - larger to match scale */}
          <p className="text-gray-500 mt-8 text-2xl leading-relaxed max-w-xl">
            From Concept to Creation — Beautiful design has the power to captivate audiences
          </p>
        </div>
      </motion.div>

      {/* Video Section - Full width on mobile, animated on desktop */}
      <motion.div
        style={{
          width: videoWidth,
          borderTopLeftRadius: borderRadius,
        }}
        className="relative w-full lg:w-[57%] rounded-tl-[6rem] overflow-hidden ml-auto"
      >
        {/* White shade overlay for better text readability */}
        <div className="absolute inset-0 bg-white bg-opacity-30 z-10 mix-blend-overlay"></div>

        {/* Additional overlay for mobile text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-0 z-10 lg:hidden"></div>

        <motion.video
          style={{ scale: videoScale }}
          className="w-full h-screen object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </motion.video>

        {/* Badge - slightly larger to match scale */}
        <div className="absolute bottom-12 right-12 w-32 h-32 flex items-center justify-center z-20">
          <div className="absolute w-full h-full rounded-full border-2 border-gray-300 flex items-center justify-center text-[11px] text-gray-700 animate-spin-slow">
            <span className="tracking-widest font-medium">
              INSIGHT • SOLUTION • CREATE • IDEA •
            </span>
          </div>
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Text Overlay - larger to match scale */}
        <div className="absolute bottom-8 right-8 bg-white px-8 py-4 rounded-tl-3xl shadow-xl z-20">
          <h2 className="text-gray-900 font-semibold md:font-extrabold lg:font-extrabold text-3xl leading-tight">
            CREATING THAT <br /> INSPIRES
          </h2>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;