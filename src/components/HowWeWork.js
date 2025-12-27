import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import laptopImage from "../assets/images/j2.jpg";

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const rightRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const isLockedRef = useRef(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const stepRefs = useRef([]);

  // Custom scroll tracking for the vertical line
  useEffect(() => {
    const handleScroll = () => {
      if (!stepsContainerRef.current) return;

      const container = stepsContainerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress
      // Start filling when container enters viewport, finish when it exits
      const startPoint = viewportHeight;
      const endPoint = -containerHeight;
      const scrollRange = startPoint - endPoint;
      const currentPosition = rect.top;

      const progress = 1 - ((currentPosition - endPoint) / scrollRange);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      setLineProgress(clampedProgress);

      // Calculate which step the line has reached
      // Divide the progress by number of steps to determine active step
      const totalSteps = steps.length;
      const stepProgress = clampedProgress * totalSteps;
      const currentActiveStep = Math.floor(stepProgress);

      setActiveStep(Math.min(currentActiveStep, totalSteps - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row h-auto overflow-visible bg-white"
    >
      {/* LEFT SIDE - Mobile: Top, Desktop: Left */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-16 py-12 lg:py-0 lg:sticky lg:top-0 lg:h-screen bg-white">
        <div className="max-w-md w-full">
          <h2 className="text-3xl lg:text-4xl font-semibold md:font-extrabold lg:font-extrabold leading-tight mb-6 lg:mb-8 text-gray-900">
            STRATEGIC STEPS TO IMPACTFUL RESULTS
          </h2>
          <div className="relative">
            <img
              src={laptopImage}
              alt="Person with laptop"
              className="rounded-2xl lg:rounded-[2rem] w-full"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Mobile: Bottom, Desktop: Right with custom scroll */}
      <div
        ref={rightRef}
        className="w-full lg:w-1/2 overflow-y-visible py-12 lg:py-16 px-6 lg:px-16 scroll-smooth hide-scrollbar"
        style={{
          height: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <div className="relative">
          {/* Static Vertical Line */}
          <div className="absolute left-4 lg:left-4 top-0 h-full w-0.5 bg-gray-200">
            <div
              className="absolute top-0 left-0 w-full bg-blue-500 origin-top transition-all duration-100 ease-out"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {/* Steps Container */}
          <div ref={stepsContainerRef} className="relative border-l-0 ml-8 lg:ml-8 space-y-8 lg:space-y-6">
            {steps.map((step, i) => (
              <div key={i} data-step={i} className="pl-4 lg:pl-6 relative">
                {/* Static Circle */}
                <div className="absolute -left-[34px] lg:-left-[27px] top-0">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center"
                    style={{
                      borderColor: "blue",
                      backgroundColor: activeStep >= i ? "blue" : "transparent",
                      transform: activeStep === i ? "scale(1.2)" : "scale(1)",
                    }}
                  >
                    {/* Checkmark for completed steps */}
                    {activeStep > i && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}

                    {/* Dot for current step */}
                    {activeStep === i && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div
                  style={{
                    transform:
                      activeStep === i ? "translateX(8px)" : "translateX(0)",
                  }}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <h3 className="text-4xl lg:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-blue-600">
                      {step.number}
                    </h3>
                    <h4 className="text-xl lg:text-xl font-bold mt-1 mb-2 text-gray-900">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed max-w-full lg:max-w-sm text-base lg:text-inherit">
                    {step.description}
                  </p>
                </div>
              </div>
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
