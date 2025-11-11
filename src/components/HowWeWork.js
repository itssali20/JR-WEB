import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const rightRef = useRef(null);
  const isLockedRef = useRef(false);
  const [activeStep, setActiveStep] = useState(0);

  // Scroll animation for the vertical line
  const { scrollYProgress } = useScroll({
    container: rightRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Lock body scroll when right panel is scrolling - Desktop only
  useEffect(() => {
    const right = rightRef.current;

    if (!right) return;

    const handleWheel = (e) => {
      // Only apply custom handling on desktop-sized viewports
      if (window.innerWidth < 1024) return;

      const atTop = right.scrollTop === 0;
      const atBottom = right.scrollHeight - right.scrollTop <= right.clientHeight + 1;

      // If the right panel can scroll in the direction of the wheel, prevent default and scroll it
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
        e.preventDefault();
        isLockedRef.current = true;
        right.scrollTop += e.deltaY;

        // Clear the lock after a short timeout
        clearTimeout(handleWheel._unlockTimeout);
        handleWheel._unlockTimeout = setTimeout(() => {
          isLockedRef.current = false;
        }, 100);
      } else {
        isLockedRef.current = false;
      }
    };

    const handleTouchMove = (e) => {
      if (isLockedRef.current && window.innerWidth >= 1024) {
        e.preventDefault();
      }
    };

    // Intersection Observer to track active step
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setActiveStep(stepIndex);
          }
        });
      },
      {
        root: rightRef.current,
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    // Observe all step elements
    const stepElements = right?.querySelectorAll('[data-step]');
    stepElements?.forEach((el) => observer.observe(el));

    // Attach listener to the right panel element rather than the window to avoid intercepting early wheel events
    right.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      right.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(handleWheel._unlockTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row h-screen overflow-hidden bg-white"
    >
      {/* LEFT SIDE - Mobile: Top, Desktop: Left */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-16 py-12 lg:py-0 lg:sticky lg:top-0 lg:h-screen bg-white">
        <div className="max-w-md w-full">
          <h2 className="text-3xl lg:text-4xl font-semibold md:font-extrabold lg:font-extrabold leading-tight mb-6 lg:mb-8 text-gray-900">
            STRATEGIC STEPS TO IMPACTFUL RESULTS
          </h2>
          <div className="relative">
            <img
              src="https://duplocloud.com/wp-content/uploads-webpc/uploads/2025/06/duplocloud-blog-cover-3-min-1024x517.png.webp"
              alt="Person with laptop"
              className="rounded-2xl lg:rounded-[2rem] w-full"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Mobile: Bottom, Desktop: Right with custom scroll */}
      <div
        ref={rightRef}
        className="w-full lg:w-1/2 overflow-y-auto py-12 lg:py-16 px-6 lg:px-16 scroll-smooth hide-scrollbar"
        style={{ 
          height: '100vh',
        }}
      >
        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-4 lg:left-4 top-0 h-full w-0.5 bg-gray-200">
            <motion.div
              className="absolute top-0 left-0 w-full bg-blue-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps Container - Reduced spacing */}
          <div className="relative border-l-0 ml-8 lg:ml-8 space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                data-step={i}
                className="pl-4 lg:pl-6 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                viewport={{ 
                  root: rightRef,
                  once: false,
                  margin: "-20% 0px -20% 0px"
                }}
              >
                {/* Animated Circle */}
                <div className="absolute -left-[34px] lg:-left-[34px] top-0">
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center"
                    animate={{
                      borderColor: activeStep >= i ? "blue" : "blue",
                      backgroundColor: activeStep >= i ? "blue" : "transparent",
                      scale: activeStep === i ? 1.2 : 1
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Checkmark for completed steps */}
                    {activeStep > i && (
                      <motion.svg
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                    {/* Dot for current step */}
                    {activeStep === i && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Step Content */}
                <motion.div
                  animate={{
                    x: activeStep === i ? 8 : 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <h3 className="text-4xl lg:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-blue-600">
                    {step.number}
                  </h3>
                  <h4 className="text-xl lg:text-xl font-bold mt-1 mb-2 text-gray-900">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed max-w-full lg:max-w-sm text-base lg:text-inherit">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

// Steps Data
const steps = [
  {
    number: "1",
    title: "Discovery & Research",
    description:
      "We start by deeply understanding your goals, target audience, and market landscape — identifying key insights that shape our bespoke digital strategy.",
  },
  {
    number: "2",
    title: "Planning with Purpose",
    description:
      " We analyze current trends, competitor strategies, and emerging opportunities to craft a clear, actionable roadmap for your digital success.",
  },
  {
    number: "3",
    title: "Visualizing Your Ideas",
    description:
      "Creative concepts come to life as we design user-friendly, visually appealing, and conversion-optimized digital solutions.",
  },
  {
    number: "4",
    title: "Bringing It to Life",
    description:
      "Using cutting-edge technologies and agile methodologies, we develop and implement your project with precision, care, and continuous optimization.",
  },
  {
    number: "5",
    title: "Delivering Success",
    description:
      "After a seamless launch, we provide ongoing support, performance monitoring, and strategic adjustments to ensure sustained long-term success and growth.",
  },
];