import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import video from "../assets/videos/video.MOV";
import { ReactComponent as AsteriskIcon } from "../assets/icons/asterisk.svg";

const HeroSection = () => {
  const { t } = useTranslation();
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
      </motion.div>

      {/* mobile view */}
      <motion.div
        style={{
          // Apply animated width only on desktop
          width: "100%",
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
      </motion.div>

      {/* Mobile Text Section */}
      <div className="w-full px-8 mt-6 lg:hidden flex flex-col items-start">
        <p className="text-[#333333] font-semibold text-2xl flex items-center mb-2">
          <AsteriskIcon className="w-12 h-12 mr-2 text-blue-800" />
          {t("tagline_prefix")}
        </p>
        <h1 className="text-6xl font-semibold leading-[4rem] mb-4">{t("main_heading")}</h1>
        <p className="text-gray-500 text-lg text-center leading-relaxed">
          {t("sub_heading")}
        </p>
      </div>

      {/* Desktop Text Section */}
      <motion.div
        // style={{ opacity }}
        className="hidden lg:flex flex-col justify-center items-start px-20 w-[43%] h-full"
      >
        <p className="text-[#333333] font-semibold text-3xl flex items-center mb-4">
          <AsteriskIcon className="w-10 h-10 mr-4 text-blue-800" />
          {t("tagline_prefix")}
        </p>
        <h1 className="text-[6rem] leading-[8.5rem] font-bold text-gray-800 tracking-tight mb-6">
          {t("main_heading")}
        </h1>
        <p className="text-gray-500 text-2xl leading-relaxed max-w-xl">
          {t("sub_heading")}
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
