import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioShowcase = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  const projects = [
    {
      id: 1,
      tag: t("portfolio.marketing_tag"),
      title: t("portfolio.marketing_title"),
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRmb2xpb3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
    },
    {
      id: 2,
      tag: t("portfolio.branding_tag"),
      title: t("portfolio.branding_title"),
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 3,
      tag: t("portfolio.design_tag"),
      title: t("portfolio.design_title"),
      image:
        "https://www.mahareng.co.za/wp-content/uploads/2015/03/web-design-and-graphic-design-wallpapers.jpg",
    },
  ];

  const navigate = (newDirection) => {
    if (isAnimating.current) return;

    // Check boundaries
    if (newDirection === 1 && current >= projects.length - 1) return;
    if (newDirection === -1 && current <= 0) return;

    isAnimating.current = true;
    setDirection(newDirection);
    setCurrent(prev => prev + newDirection);

    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating.current = false;
    }, 1000);
  };

  // Wheel event handler
  useEffect(() => {
    const handleWheel = (e) => {
      // Only handle wheel events when we're at the boundaries of card navigation
      if ((e.deltaY > 5 && current < projects.length - 1) || 
          (e.deltaY < -5 && current > 0)) {
        e.preventDefault();
        
        if (e.deltaY > 5) {
          navigate(1); // Scroll down - next
        } else if (e.deltaY < -5) {
          navigate(-1); // Scroll up - previous
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        navigate(1);
      } else if (e.key === 'ArrowUp') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current]);

  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? "100%" : "-100%",
      scale: 0.95,
      opacity: 0,
      zIndex: 1,
    }),
    center: {
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 2,
    },
    exit: (direction) => ({
      y: direction > 0 ? "-80%" : "80%",
      scale: 1.05,
      opacity: 0.7,
      zIndex: 0,
    }),
  };

  const backgroundVariants = {
    enter: (direction) => ({
      y: direction > 0 ? "30%" : "-30%",
      scale: 1.1,
      opacity: 0.3,
      zIndex: 0,
    }),
    center: {
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      y: direction > 0 ? "-30%" : "30%",
      scale: 0.9,
      opacity: 0.3,
      zIndex: 0,
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-20 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center"
    >
      {/* header */}
      <div className="text-center mb-12 px-6 z-20">
        <h1 className="text-2xl lg:text-4xl font-semibold md:font-bold lg:font-bold md:text-5xl text-gray-900 leading-tight">
          {t("portfolio.heading")}
        </h1>
      </div>

      {/* card container */}
      <div className="relative w-[85%] h-[70vh] rounded-[50px] overflow-hidden shadow-2xl">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          {/* Background Layer */}
          <motion.div
            key={`bg-${current}`}
            custom={direction}
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={projects[current].image}
              alt={projects[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 rounded-[50px]" />
          </motion.div>

          {/* Foreground Card */}
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-4 rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img
              src={projects[current].image}
              alt={projects[current].title}
              className="w-full h-full object-cover"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[40px]">
              
              {/* Top Left Content */}
              <div className="absolute top-8 left-8">
                <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg">
                  {projects[current].tag}
                </span>
                <h3 className="text-white text-5xl md:text-6xl font-bold mt-6 leading-tight drop-shadow-2xl">
                  {projects[current].title}
                </h3>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-30 flex items-center justify-between px-6">
          <button
            onClick={() => navigate(-1)}
            disabled={current === 0}
            className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={current === projects.length - 1}
            className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="flex space-x-3 mt-8 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== current) {
                const newDirection = index > current ? 1 : -1;
                setDirection(newDirection);
                setCurrent(index);
              }
            }}
            className={`w-4 h-4 rounded-full transition-all duration-500 ${
              index === current 
                ? 'bg-blue-500 scale-125 shadow-lg' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioShowcase;