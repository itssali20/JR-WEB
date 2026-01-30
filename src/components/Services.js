import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";

const ServicesSection = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      title: t("website_title"),
      tag: t("website_tag"),
      number: "01",
      description: t("website_desc"),
      items: [  
        t("website_items_0"),
        t("website_items_1"),
        t("website_items_2"),
        t("website_items_3"),
        t("website_items_4"),
        t("website_items_5"),
      ],
      image:
        "https://i.pinimg.com/564x/70/20/f4/7020f453974ebf3d25268e55e983b816.jpg",
    },
    {
      id: 2,
      title: t("social_title"),
      tag: t("social_tag"),
      number: "02",
      description: t("social_desc"),
      items: [
        t("social_items_0"),
        t("social_items_1"),
        t("social_items_2"),
        t("social_items_3"),
      ],
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: t("crm_title"),
      tag: t("crm_tag"),
      number: "03",
      description: t("crm_desc"),
      items: [
        t("crm_items_0"),
        t("crm_items_1"),
        t("crm_items_2"),
        t("crm_items_3"),
      ],
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: t("ads_title"),
      tag: t("ads_tag"),
      number: "04",
      description: t("ads_desc"),
      items: [
        t("ads_items_0"),
        t("ads_items_1"),
        t("ads_items_2"),
        t("ads_items_3"),
      ],
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const toggleService = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hoveredService = services.find((s) => s.id === hoveredId);

  return (
    <div 
      className="relative lg:min-h-screen bg-white text-gray-900 px-4 md:px-20 py-8 md:py-20 font-sans overflow-hidden"
      ref={sectionRef}
    >
      {/* Simple cursor image - appears/disappears instantly */}
      {hoveredService && (
        <div
          className="fixed pointer-events-none z-50 hidden md:block"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y + 20,
          }}
        >
          <img
            src={hoveredService.image}
            alt={hoveredService.title}
            className="w-64 h-40 object-cover rounded-xl shadow-2xl border-2 border-white"
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="mb-10 md:ml-[10%] px-2">
          <h2 className="text-2xl md:text-5xl font-bold mt-2 leading-tight">
            {t("services_heading")}
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {services.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div
                key={service.id}
                className="py-4 md:py-10 relative group"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  onClick={() => toggleService(service.id)}
                  className="flex justify-between items-start md:items-center cursor-pointer px-2 md:ml-[10%]"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline space-y-2 md:space-y-0 md:space-x-4 flex-1">
                    <div className="flex items-baseline space-x-3">
                      <span className="text-blue-600 text-sm font-semibold">
                        {service.number}
                      </span>
                      <h3
                        className={`text-xl md:text-7xl font-semibold md:font-extrabold lg:font-extrabold transition-colors duration-300 ${
                          isOpen ? "text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {service.title.toUpperCase()}
                      </h3>
                    </div>
                    <span className="text-gray-500 text-base font-semibold md:ml-4">
                      {service.tag}
                    </span>
                  </div>
                  <div className="border border-gray-400 rounded-full p-2 hover:bg-gray-100 transition ml-4 flex-shrink-0 mt-1 md:mt-0">
                    {isOpen ? (
                      <FiX className="text-gray-700" size={20} />
                    ) : (
                      <FiPlus className="text-gray-700" size={20} />
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
                      <div className="mt-6 grid md:grid-cols-2 gap-6 px-2 md:ml-[calc(10%+4rem)]">
                        <p className="text-gray-700 leading-relaxed text-base md:text-inherit">
                          {service.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                          {service.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center space-x-2 py-1"
                            >
                              <span className="text-blue-600">•</span>
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;