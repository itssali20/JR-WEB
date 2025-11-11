import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const scrollRef = useRef(null);

  const faqs = [
    { question: "What is included in your branding services?", answer: "Our branding services include logo design, brand guidelines, color palette, typography, and strategy." },
    { question: "How long does it take to complete a branding project?", answer: "Typically between 4–6 weeks, depending on feedback rounds and project scope." },
    { question: "Do you offer mobile-friendly designs?", answer: "Yes. All our websites are fully responsive for phones, tablets, and desktops." },
    { question: "Can you redesign an existing website?", answer: "Absolutely. We specialize in refreshing outdated websites with modern design and performance improvements." },
    { question: "Do you provide custom development solutions?", answer: "Yes, we build fully custom web and app solutions using modern frameworks." },
    { question: "Will I be able to update the website on my own?", answer: "Yes. We build user-friendly CMS systems so you can edit content without coding." },
    { question: "How do you approach digital marketing campaigns?", answer: "We design data-driven campaigns across SEO, email, and social platforms to grow your brand." },
  ];

  // Lock/unlock page scroll when FAQ area is hovered
  useEffect(() => {
    const scrollable = scrollRef.current;

    const handleMouseEnter = () => {
      document.body.style.overflow = "hidden";
    };
    const handleMouseLeave = () => {
      document.body.style.overflow = "auto";
    };

    scrollable.addEventListener("mouseenter", handleMouseEnter);
    scrollable.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scrollable.removeEventListener("mouseenter", handleMouseEnter);
      scrollable.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-white py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT - Static Content */}
        <div className="sticky top-32 self-start">
          <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-gray-900 mb-12 leading-tight">
            CLEAR SOLUTIONS <br /> TO YOUR CONCERNS
          </h2>

          <div className="rounded-[4rem] overflow-hidden shadow-sm">
            <img
              src="https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.webp?b=1&s=612x612&w=0&k=20&c=zQxhQVNtR7T9qdOtQo72zS4zb0I4yqdmUiC9xI2wLyw="
              alt="Office team working"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* RIGHT - Scrollable FAQ */}
        <div
          ref={scrollRef}
          className="max-h-[75vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {faqs.map((item, index) => (
            <React.Fragment key={index}>
              <div className="border-b border-gray-200 py-6">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900 focus:outline-none"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {item.question}
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>

              {/* Add a horizontal line between every two questions */}
              {(index + 1) % 2 === 0 && index !== faqs.length - 1 && (
                <div className="h-[1px] bg-gray-300 my-2 opacity-60"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
