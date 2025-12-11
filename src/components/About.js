import React from "react";
import logo1 from "../assets/images/partners-logos/logo-1.png";
import logo2 from "../assets/images/partners-logos/logo-2.png";
import logo3 from "../assets/images/partners-logos/logo-3.png";
import logo4 from "../assets/images/partners-logos/logo-4.png";
import logo5 from "../assets/images/partners-logos/logo-5.png";
import logo6 from "../assets/images/partners-logos/logo-6.png";
import logo7 from "../assets/images/partners-logos/logo-7.png";
import logo8 from "../assets/images/partners-logos/logo-8.png";
import logo9 from "../assets/images/partners-logos/logo-9.png";
import logo10 from "../assets/images/partners-logos/logo-10.png";
import logo11 from "../assets/images/partners-logos/logo-11.png";
import logo12 from "../assets/images/partners-logos/logo-12.png";
import logo13 from "../assets/images/partners-logos/logo-13.png";
import logo14 from "../assets/images/partners-logos/logo-14.png";
import logo15 from "../assets/images/partners-logos/logo-15.png";
import logo16 from "../assets/images/partners-logos/logo-16.png";
import logo17 from "../assets/images/partners-logos/logo-17.png";
import logo18 from "../assets/images/partners-logos/logo-18.png";
import logo19 from "../assets/images/partners-logos/logo-19.png";
import logo20 from "../assets/images/partners-logos/logo-20.png";
import logo21 from "../assets/images/partners-logos/logo-21.png";
import logo22 from "../assets/images/partners-logos/logo-22.png";

const AboutSection = () => {
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
    logo13,
    logo14,
    logo15,
    logo16,
    logo17,
    logo18,
    logo19,
    logo20,
    logo21,
    logo22,
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-12 text-center">
          WE ARE LEADING DIGITAL TRANSFORMATION EXPERTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Image Block */}
          <div className="relative">
            <img
              src="https://www.hellobackgrounds.com/assets/img/previews/hb-workspace-0016.jpg"
              alt="Office workspace"
              className="w-full rounded-[30px] shadow-lg object-cover"
            />

            {/* Floating Circle Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-full shadow-md flex flex-col items-center justify-center text-center w-28 h-28">
              <div className="text-blue-600 text-sm font-semibold uppercase">
                Create
              </div>
              <div className="w-10 h-[1px] bg-gray-300 my-1"></div>
              <div className="text-gray-600 text-[11px] leading-tight">
                Idea • Insight <br /> Solution
              </div>
            </div>
          </div>

          {/* Right Side Text & Small Image */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Our story
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At <span className="font-semibold">JR Digital Media</span>, we
                specialize in crafting custom digital solutions that drive real
                business growth. From innovative website design and development
                to strategic social media management, powerful CRM automation,
                and targeted digital advertising, we tailor our services to meet
                your unique business needs and deliver measurable results.
              </p>
            </div>

            <img
              src="https://www.shutterstock.com/image-photo/high-angle-view-software-developer-600nw-2218017813.jpg"
              alt="Developer working"
              className="rounded-3xl shadow-lg w-full object-cover"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              10<span className="text-blue-600">+</span>
            </h3>
            <p className="text-gray-600 mt-2">Years Experience</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              500<span className="text-blue-600">+</span>
            </h3>
            <p className="text-gray-600 mt-2">Projects Done</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              140<span className="text-blue-600">+</span>
            </h3>
            <p className="text-gray-600 mt-2">Happy Clients</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              98<span className="text-blue-600">%</span>
            </h3>
            <p className="text-gray-600 mt-2">Satisfied Clients</p>
          </div>
        </div>

        {/* Enhanced Company Logos Carousel Section */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            We work with the world's top companies
          </h3>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Trusted by industry leaders and innovative startups worldwide
          </p>

          {/* Carousel Container */}
          <div className="relative">
            {/* First Row Carousel */}
            <div className="flex mb-8">
              <div className="flex animate-scroll-slow hover:pause-animation">
                {duplicatedLogos
                  .slice(0, duplicatedLogos.length / 2)
                  .map((logo, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 mx-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:shadow-2xl hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-500 group"
                    >
                      <img
                        src={logo}
                        alt={`Partner logo ${index + 1}`}
                        className="h-8 md:h-10 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Second Row Carousel (Reverse) */}
            <div className="flex">
              <div className="flex animate-scroll-slow-reverse hover:pause-animation">
                {duplicatedLogos
                  .slice(duplicatedLogos.length / 2)
                  .map((logo, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 mx-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:shadow-2xl hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-500 group"
                    >
                      <img
                        src={logo}
                        alt={`Partner logo ${index + 1 + duplicatedLogos.length / 2
                          }`}
                        className="h-8 md:h-10 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-250px * 11));
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(calc(-250px * 11));
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-slow {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll-slow-reverse {
          animation: scroll-reverse 40s linear infinite;
        }

        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-200px * 11));
            }
          }

          @keyframes scroll-reverse {
            0% {
              transform: translateX(calc(-200px * 11));
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
