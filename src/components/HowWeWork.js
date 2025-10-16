import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const rightRef = useRef(null);
  const isLockedRef = useRef(false);

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

    // Attach listener to the right panel element rather than the window to avoid intercepting early wheel events
    right.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      right.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(handleWheel._unlockTimeout);
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
          <p className="text-orange-600 font-semibold mb-2 text-lg lg:text-base">{`{ How We Work }`}</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-6 lg:mb-8 text-gray-900">
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
        className="w-full lg:w-1/2 overflow-y-auto py-12 lg:py-24 px-6 lg:px-16 scroll-smooth"
        style={{ 
          height: '100vh',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {/* Hide scrollbar for Chrome, Safari and Opera */}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="hide-scrollbar relative border-l-2 border-gray-200 ml-4 lg:ml-4 space-y-16 lg:space-y-24">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="pl-8 lg:pl-10 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-[13px] top-0 bg-white border-2 border-gray-300 rounded-full w-6 h-6" />
              <h3 className="text-4xl lg:text-5xl font-extrabold text-orange-500">
                {step.number}
              </h3>
              <h4 className="text-xl lg:text-xl font-bold mt-2 mb-3 lg:mb-2 text-gray-900">
                {step.title}
              </h4>
              <p className="text-gray-600 leading-relaxed max-w-full lg:max-w-sm text-base lg:text-inherit">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
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