import React, { useEffect, useRef, useState } from "react";
import asfahan from "../assets/images/team/1.jpg";
import asmar from "../assets/images/team/asmar.jpg";
import jahangirt from "../assets/images/team/jahangirt.jpg";
import Rashed from "../assets/images/team/Rashed.jpg";

export default function TeamSection() {
  const team = [
    {
      name: "Jahangir Khan",
      role: "Chief Executive Officer",
      image: jahangirt,
    },
    {
      name: "Asfahan Ahmed",
      role: "Marketing Director",
      image: asfahan,
    },
    {
      name: "Rashed Khan",
      role: "Project Manager",
      image: Rashed,
    },
    {
      name: "Asmar Ali",
      role: "Chief Finance Officer",
      image: asmar,
    },
  ];

  // repeatCount will be calculated to make sure the repeated content is wide enough
  const [repeatCount, setRepeatCount] = useState(2);
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const firstSetRef = useRef(null);

  // default duplicated array shows at least 2 copies
  const sets = Array.from({ length: repeatCount }, () => team);

  useEffect(() => {
    const measure = () => {
      const wrapper = wrapperRef.current;
      const firstSet = firstSetRef.current;
      const inner = innerRef.current;
      if (wrapper && firstSet && inner) {
        const wrapperWidth = wrapper.offsetWidth;
        const setWidth = firstSet.offsetWidth;
        if (setWidth === 0) return; // avoid div by zero

        // Get the gap from the inner container
        const innerStyle = window.getComputedStyle(inner);
        const gap = parseFloat(innerStyle.gap) || 0;
        const totalSetWidth = setWidth + gap;

        // compute the required repeat count so inner content covers wrapper and one set extra
        // We need enough sets to cover the wrapper width AFTER shifting by one set.
        // Formula: Math.ceil(wrapperWidth / totalSetWidth) + 2 ensures robust coverage.
        const required = Math.ceil(wrapperWidth / totalSetWidth) + 2;
        if (required !== repeatCount) setRepeatCount(required);

        // compute pixel-based step equal to one set's width PLUS the gap
        const stepPx = -totalSetWidth;
        // set CSS variable on inner so it applies where transform is used
        inner.style.setProperty("--scroll-step-px", `${stepPx}px`);
      }
    };

    // measure initially and on resize
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [repeatCount, team]);

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-gray-900 leading-tight">
          DEDICATED DIGITAL EXPERTS AT YOUR SERVICE
        </h2>
      </div>

      {/* Team Grid - Single Row (horizontally scrollable on small/medium, grid on large) */}
      <div
        ref={wrapperRef}
        className="w-full"
        role="list"
        aria-label="Team members"
      >
        <div
          ref={innerRef}
          className="flex animate-scroll-slow hover:pause-animation flex-nowrap w-full gap-16"
          role="list"
        >
          {sets.map((set, setIndex) => (
            <div
              key={`set-${setIndex}`}
              className="flex gap-16 items-start"
              ref={setIndex === 0 ? firstSetRef : undefined}
            >
              {set.map((member, i) => (
                <div
                  key={`item-${setIndex}-${i}`}
                  role="listitem"
                  tabIndex={0}
                  className="w-64 flex-shrink-0 sm:w-72 md:w-80 lg:w-72 flex flex-col items-center text-center"
                >
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-[2.5rem] [clip-path:polygon(0_0,100%_0,100%_85%,85%_100%,0_100%)]"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-5">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-base">{member.role}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        /* We'll compute step dynamically in JS and update the keyframes using a CSS variable in px. */
        :root {
          --scroll-step-px: -1px;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--scroll-step-px));
          }
        }

        .animate-scroll-slow {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          /* Will be updated via JS using --scroll-step */
        }
      `}</style>
    </section>
  );
}
