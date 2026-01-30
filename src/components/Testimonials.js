import React from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { t } = useTranslation();
   const testimonials = [
     {
      name: "Sarah Lin",
      title: "Customer",
      image:
        "https://img.freepik.com/free-photo/front-view-sign-language-concept_23-2148572467.jpg?semt=ais_hybrid&w=740&q=80",
      quote:
        "JR Digital Media transformed our outdated online presence into a sleek, modern platform. We've seen a huge uptick in engagement and conversions since launch. Their team is truly exceptional!",
      rating: 4,
    },
    {
      name: "Jason Turner",
      title: "Startup Founder",
      image:
        "https://photoheads.co.uk/wp-content/uploads/2020/05/headshot-with-client-testimonial.jpg",
      quote:
        "They don't just design; they understand your business. The brand strategy and web development provided by JR Digital Media were pivotal in our successful market entry.",
      rating: 5,
    },
    {
      name: "Mia Reynolds",
      title: "Creative Director",
      image:
        "https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg",
      quote:
        "Working with JR Digital Media was smooth from day one. The designs were sharp, the communication was clear, and delivery was on point.",
      rating: 5,
    },
    {
      name: "Ava Nishi",
      title: "First-Time Entrepreneur",
      image:
        "https://media.istockphoto.com/id/1324194583/photo/head-shot-portrait-smiling-attractive-woman-blogger-speaking-at-camera.jpg?s=612x612&w=0&k=20&c=1FJKrE_wqVyZhed7cYTgE2raRwHONesu258tl8N6VIQ=",
      quote:
        "JR Digital Media helped us go from zero to launch with confidence. Their templates saved us weeks of work.",
      rating: 4,
    },
    {
      name: "Martin Gomez",
      title: "Brand Consultant",
      image: "https://www.hubspot.com/hubfs/Testimonial-lead-gen-1.webp",
      quote:
        "It's rare to find a design partner who's both strategic and insanely creative. These guys get both.",
      rating: 5,
    },
    {
      name: "Rachel Foster",
      title: "Operations Lead, Wellnify",
      image:
        "https://media.istockphoto.com/id/168518740/photo/portrait-of-woman-with-short-hair.jpg?s=612x612&w=0&k=20&c=5vGIftrKdgSMJzHdA0bzEYTQKloWi6BYgcJAPyTnfsI=",
      quote:
        "Every step was thoughtful and intentional. They asked the right questions and delivered beyond expectations.",
      rating: 5,
    },
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-xl lg:text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-gray-900 leading-tight mb-4">
          {t("testimonials_heading")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("subheading")}
        </p>
      </div>

      {/* Testimonials Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r  to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l  to-transparent z-10"></div>

        {/* First Row Carousel */}
        <div className="flex mb-8">
          <div className="flex animate-scroll-slow hover:pause-animation">
            {duplicatedTestimonials
              .slice(0, duplicatedTestimonials.length / 2)
              .map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-4 border border-gray-200 rounded-[2rem] p-8 shadow-sm bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                  style={{ width: "400px" }}
                >
                  {/* Header */}
                  <div className="flex items-center mb-5">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{t.title}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {t.quote}
                  </p>

                  {/* Rating */}
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={18}
                        className={`${idx < t.rating
                            ? "text-orange-500 fill-orange-500"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Second Row Carousel (Reverse) */}
        <div className="flex">
          <div className="flex animate-scroll-slow-reverse hover:pause-animation">
            {duplicatedTestimonials
              .slice(duplicatedTestimonials.length / 2)
              .map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-4 border border-gray-200 rounded-[2rem] p-8 shadow-sm bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                  style={{ width: "400px" }}
                >
                  {/* Header */}
                  <div className="flex items-center mb-5">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{t.title}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {t.quote}
                  </p>

                  {/* Rating */}
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={18}
                        className={`${idx < t.rating
                            ? "text-orange-500 fill-orange-500"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Stats Below Carousel */}
      <div className="mt-12 lg:mt-24 grid grid-cols-3 text-center">
        <div>
          <h3 className="text-xl lg:text-5xl font-bold text-gray-900">
            100 %
          </h3>
          <p className="text-sm lg:text-xl text-gray-600 mt-2">{t("satisfaction")}</p>
        </div>

        <div>
          <h3 className="text-xl lg:text-5xl font-bold text-gray-900">
            4.9/5
          </h3>
          <p className="text-sm lg:text-xl text-gray-600 mt-2">{t("rating")}</p>
        </div>

        <div>
          <h3 className="text-xl lg:text-5xl font-bold text-gray-900">
            140+
          </h3>
          <p className="text-sm lg:text-xl text-gray-600 mt-2">{t("happy_clients")}</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-424px * 9));
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(calc(-424px * 9));
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-slow {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll-slow-reverse {
          animation: scroll-reverse 60s linear infinite;
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
              transform: translateX(calc(-344px * 9));
            }
          }

          @keyframes scroll-reverse {
            0% {
              transform: translateX(calc(-344px * 9));
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      `}</style>
    </section>
  );
}
