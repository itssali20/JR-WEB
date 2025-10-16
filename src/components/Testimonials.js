import React from "react";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Lin",
      title: "Customer",
      image: "https://img.freepik.com/free-photo/front-view-sign-language-concept_23-2148572467.jpg?semt=ais_hybrid&w=740&q=80",
      quote:
        "BrightEdge Pro transformed our outdated website into a sleek, modern platform. We’ve seen a huge uptick in engagement since launch.",
      rating: 4,
    },
    {
      name: "Jason Turner",
      title: "Startup Founder",
      image: "https://photoheads.co.uk/wp-content/uploads/2020/05/headshot-with-client-testimonial.jpg",
      quote:
        "They don’t just design – they understand your business. The brand strategy workshop alone was worth the investment.",
      rating: 5,
    },
    {
      name: "Mia Reynolds",
      title: "Creative Director",
      image: "https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg",
      quote:
        "Working with BrightEdge was smooth from day one. The designs were sharp, the communication was clear, and delivery was on point.",
      rating: 5,
    },
    {
      name: "Ava Nishi",
      title: "First-Time Entrepreneur",
      image: "https://media.istockphoto.com/id/1324194583/photo/head-shot-portrait-smiling-attractive-woman-blogger-speaking-at-camera.jpg?s=612x612&w=0&k=20&c=1FJKrE_wqVyZhed7cYTgE2raRwHONesu258tl8N6VIQ=",
      quote:
        "BrightEdge helped us go from zero to launch with confidence. Their templates saved us weeks of work.",
      rating: 4,
    },
    {
      name: "Martin Gomez",
      title: "Brand Consultant",
      image: "https://www.hubspot.com/hubfs/Testimonial-lead-gen-1.webp",
      quote:
        "It’s rare to find a design partner who’s both strategic and insanely creative. These guys get both.",
      rating: 5,
    },
    {
      name: "Rachel Foster",
      title: "Operations Lead, Wellnify",
      image: "https://media.istockphoto.com/id/168518740/photo/portrait-of-woman-with-short-hair.jpg?s=612x612&w=0&k=20&c=5vGIftrKdgSMJzHdA0bzEYTQKloWi6BYgcJAPyTnfsI=",
      quote:
        "Every step was thoughtful and intentional. They asked the right questions and delivered beyond expectations.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-orange-600 font-semibold mb-2">{`{ What Our Clients Are Saying }`}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          TESTIMONIALS THAT INSPIRE CONFIDENCE
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-[2rem] p-8 shadow-sm bg-white"
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
              <p className="text-gray-600 leading-relaxed mb-5">{t.quote}</p>

              {/* Rating */}
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    className={`${
                      idx < t.rating ? "text-orange-500 fill-orange-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fading Edges for visual polish */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent pointer-events-none hidden lg:block" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none hidden lg:block" />
      </div>
    </section>
  );
}
