import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";

const services = [
  {
    id: 1,
    title: "Branding",
    tag: "Brain Storm",
    number: "01",
    description:
      "We craft impactful brand stories that connect with your audience and build long-term trust. Through strategic thinking and visual storytelling, your brand gains clarity, consistency, and character.",
    items: [
      "Visual Content Strategy",
      "Competitive Analysis",
      "Key Messaging",
      "Research & Testing",
      "UI & UX Strategy",
      "Content Strategy",
    ],
    image:
      "https://i.pinimg.com/564x/70/20/f4/7020f453974ebf3d25268e55e983b816.jpg",
  },
  {
    id: 2,
    title: "Web Design",
    tag: "UI / UX",
    number: "02",
    description:
      "We create modern, responsive websites that deliver exceptional user experiences and reflect your brand identity.",
    items: [
      "Responsive Design",
      "Prototyping",
      "User Journey Mapping",
      "UI Components",
    ],
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Development",
    tag: "Coding",
    number: "03",
    description:
      "From concept to launch, we build fast, scalable, and secure digital products that perform across all devices.",
    items: [
      "Full-stack Development",
      "API Integration",
      "Performance Optimization",
      "Cross-platform Apps",
    ],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Marketing",
    tag: "Integrations",
    number: "04",
    description:
      "We help brands grow with smart digital strategies, data-driven insights, and creative storytelling that converts.",
    items: [
      "Social Media Strategy",
      "Email Campaigns",
      "SEO Optimization",
      "Content Creation",
    ],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
  },
];

const ServicesSection = () => {
  const [openId, setOpenId] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  const toggleService = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const hoveredService = services.find((s) => s.id === hoveredId);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 px-6 md:px-20 py-20 font-sans overflow-hidden">
      <div className="relative z-10">
        <div className="mb-10">
          <p className="text-orange-500 text-sm font-medium tracking-wider">
            {"{ Our Services }"}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
            EXPLORE WHAT WE CAN DO FOR YOU
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {services.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div
                key={service.id}
                className="py-10 relative group"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  onClick={() => toggleService(service.id)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="text-orange-500 text-sm font-semibold">
                      {service.number}
                    </span>
                    <h3
                      className={`text-3xl md:text-6xl font-extrabold transition-colors duration-300 ${
                        isOpen ? "text-orange-600" : "text-gray-900"
                      }`}
                    >
                      {service.title.toUpperCase()}
                    </h3>
                    <span className="text-gray-500 text-sm font-medium">
                      {service.tag}
                    </span>
                  </div>
                  <div className="border border-gray-400 rounded-full p-2 hover:bg-gray-100 transition">
                    {isOpen ? (
                      <FiX className="text-gray-700" size={22} />
                    ) : (
                      <FiPlus className="text-gray-700" size={22} />
                    )}
                  </div>
                </div>

                {/* Expandable section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid md:grid-cols-2 gap-8">
                        <p className="text-gray-700 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="grid grid-cols-2 gap-x-6 text-gray-700 text-sm">
                          {service.items.map((item, i) => (
                            <li
                              key={i}
                              className="mb-2 flex items-center space-x-2"
                            >
                              <span>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover floating preview */}
                {hoveredId === service.id && (
                  <AnimatePresence>
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 40 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 3,
                        y: 0,
                        transition: { type: "spring", stiffness: 150, damping: 10 },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        rotate: 0,
                        y: 40,
                        transition: { duration: 0.3 },
                      }}
                      className="absolute -right-10 top-1/2 transform -translate-y-1/2"
                    >
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-56 h-36 object-cover rounded-xl shadow-2xl border border-gray-200"
                        whileHover={{ rotate: 6, scale: 1.05 }}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
