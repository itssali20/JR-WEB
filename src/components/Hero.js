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
  const videoScale = useTransform(smoothY, [0, 400], [1, 1.15]); // desktop only
  const videoWidth = useTransform(smoothY, [0, 400], ["54%", "54%"]); // desktop only
  const borderRadius = useTransform(smoothY, [0, 400], ["6rem", "0rem"]); // desktop only

  return (
    <section className="relative mt-[7%] w-full min-h-screen bg-white flex flex-col lg:flex-row-reverse items-center justify-center overflow-hidden">
      {/* Video Section */}
      <motion.div
        style={{
          // Apply animated width only on desktop
          width: videoWidth,
          borderTopLeftRadius: borderRadius,
        }}
        className="relative w-full lg:w-[57%] overflow-hidden hidden lg:block"
      >
        {/* White & black overlays */}
        <div className="absolute inset-0 bg-white bg-opacity-30 z-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-0 z-10 lg:hidden"></div>

        <motion.video
          style={{
            // Animate scale only on desktop
            scale: videoScale,
          }}
          className="w-full h-[60vh] lg:h-screen object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </motion.video>

        {/* Badge - keep only for desktop */}
        <div className="hidden lg:flex absolute bottom-12 right-12 w-32 h-32 items-center justify-center z-20">
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

        {/* Desktop Text Overlay */}
        <motion.div
          style={{ opacity }}
          className="absolute z-20 bottom-8 right-8 bg-white px-8 py-4 rounded-tl-3xl shadow-xl hidden lg:flex"
        >
          <h2 className="text-gray-900 font-semibold text-3xl leading-tight md:font-extrabold lg:font-extrabold">
            CREATING THAT <br /> INSPIRES
          </h2>
        </motion.div>
      </motion.div>

      // mobile view
      <motion.div
        style={{
          // Apply animated width only on desktop
          width: '100%',
        }}
        className="relative w-full block lg:hidden"
      >
        {/* White & black overlays */}
        <div className="absolute inset-0 bg-white bg-opacity-30 z-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-0 z-10 lg:hidden"></div>

        <motion.video
          className="w-full h-[60vh] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </motion.video>

        {/* Badge - keep only for desktop */}
        <div className="hidden lg:flex absolute bottom-12 right-12 w-32 h-32 items-center justify-center z-20">
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

        {/* Desktop Text Overlay */}
        <motion.div
          style={{ opacity }}
          className="absolute z-20 bottom-8 right-8 bg-white px-8 py-4 rounded-tl-3xl shadow-xl hidden lg:flex"
        >
          <h2 className="text-gray-900 font-semibold text-3xl leading-tight md:font-extrabold lg:font-extrabold">
            CREATING THAT <br /> INSPIRES
          </h2>
        </motion.div>
      </motion.div>

      {/* Mobile Text Section */}
      <div className="w-full px-8 mt-6 lg:hidden flex flex-col items-start">
        <p className="text-[#333333] font-semibold text-3xl flex items-center mb-2">
          <AsteriskIcon className="w-16 h-16 mr-2" />
          We are digital design
        </p>
        <h1 className="text-6xl font-semibold leading-[4rem] mb-4">CREATORS</h1>
        <p className="text-gray-500 text-lg text-center leading-relaxed">
          From Concept to Creation — Beautiful design has the power to captivate
          audiences
        </p>
      </div>

      {/* Desktop Text Section */}
      <motion.div
        style={{ opacity }}
        className="hidden lg:flex flex-col justify-center items-start px-20 w-[43%] h-full"
      >
        <p className="text-[#333333] font-semibold text-3xl flex items-center mb-4">
          <AsteriskIcon className="w-10 h-10 mr-4" />
          We are digital design
        </p>
        <h1 className="text-[6.6rem] leading-[8.5rem] font-bold text-gray-800 tracking-tight mb-6">
          CREATORS
        </h1>
        <p className="text-gray-500 text-2xl leading-relaxed max-w-xl">
          From Concept to Creation — Beautiful design has the power to captivate
          audiences
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
