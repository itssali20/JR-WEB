import React, { useState, useEffect, useRef, } from "react";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const [activeFilter, setActiveFilter] = useState("web");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [view, setView] = useState("packages");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [customPlans, setCustomPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const filtersContainerRef = useRef(null);

  const filters = [
    { id: "web", label: "Website Design", icon: "💻" },
    { id: "seo", label: "SEO Services", icon: "🔍" },
    { id: "social", label: "Social Media", icon: "📱" },
    { id: "cgi", label: "CGI & 3D", icon: "🎬" },
    { id: "erp", label: "ERP Systems", icon: "📊" },
    { id: "creative", label: "Creative Design", icon: "🎨" },
  ];

  // Firestore collections
  const servicesCollection = collection(db, "pricingServices");
  const packagesCollection = collection(db, "pricingPackages");
  const customPlansCollection = collection(db, "pricingCustomPlans");

  // Load data from Firestore
  useEffect(() => {
    setLoading(true);

    // Subscribe to services
    const servicesQuery = query(
      servicesCollection,
      orderBy("createdAt", "asc")
    );
    const unsubscribeServices = onSnapshot(servicesQuery, (snapshot) => {
      const servicesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);
      
      // Filter services for initial view
      const initialServices = servicesData.filter(
        (service) => service.category === activeFilter
      );
      setFilteredServices(initialServices);
    });

    // Subscribe to packages
    const packagesQuery = query(
      packagesCollection,
      orderBy("createdAt", "desc")
    );
    const unsubscribePackages = onSnapshot(packagesQuery, (snapshot) => {
      const packagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPackages(packagesData);
    });

    // Subscribe to custom plans
    const customPlansQuery = query(
      customPlansCollection,
      orderBy("createdAt", "desc")
    );
    const unsubscribeCustomPlans = onSnapshot(customPlansQuery, (snapshot) => {
      const customPlansData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomPlans(customPlansData);
    });

    setLoading(false);

    // Cleanup subscriptions
    return () => {
      unsubscribeServices();
      unsubscribePackages();
      unsubscribeCustomPlans();
    };
  }, []);

  // Check scroll position
  const checkScrollPosition = () => {
    const container = filtersContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    const container = filtersContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = filtersContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Filter services with animation
  const handleFilterClick = (filterId) => {
    if (filterId === activeFilter || isAnimating) return;

    setIsAnimating(true);
    setActiveFilter(filterId);
    setIsDropdownOpen(false);

    setTimeout(() => {
      const filtered = services.filter(
        (service) => service.category === filterId
      );
      setFilteredServices(filtered);
      setIsAnimating(false);
    }, 400);
  };

  // Close dropdown when clicking outside and check scroll position
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    const container = filtersContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  // Safe current filter label
  const currentFilter = filters.find((f) => f.id === activeFilter);
  const currentFilterLabel = currentFilter?.label || filters[0]?.label;

  // Loading state
  if (loading) {
    return (
      <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-200 rounded-3xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-gray-900 leading-tight mb-8">
          {view === "packages"
            ? "DIGITAL TRANSFORMATION PACKAGES"
            : "CUSTOM PACKAGES FOR DIGITAL TRANSFORMATION"}
        </h2>
      </div>

      {/* Enhanced Filter Bar with Carousel */}
      {view === "packages" && (
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-2">
          <div className="relative group">
            {/* Scroll Buttons for Desktop */}
            <button
              onClick={scrollLeft}
              className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
                canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>

            <button
              onClick={scrollRight}
              className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
                canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>

            {/* Desktop Filter Bar with PERFECTLY ALIGNED Highlight */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 relative overflow-hidden">
                {/* Animated Background Slider */}
                <div
                  className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-500 ease-out shadow-lg"
                  style={{
                    width: `${100 / filters.length}%`,
                    left: `${
                      (filters.findIndex((f) => f.id === activeFilter) * 100) /
                      filters.length
                    }%`,
                  }}
                ></div>

                {/* Filter Tabs */}
                <div className="relative flex items-center justify-between">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={`relative flex-1 py-4 px-2 mx-1 rounded-xl font-semibold text-sm transition-all duration-300 z-10 ${
                        activeFilter === filter.id
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                      } ${isAnimating ? "opacity-70" : "opacity-100"}`}
                      disabled={isAnimating}
                    >
                      <span className="relative z-10 whitespace-nowrap">
                        {filter.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Dropdown Filter */}
            <div className="md:hidden filter-dropdown">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full py-4 px-4 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">
                      {currentFilter?.icon || "💻"}
                    </span>
                    {currentFilterLabel}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => handleFilterClick(filter.id)}
                        className={`w-full py-4 px-6 text-left font-semibold transition-all duration-200 flex items-center gap-3 ${
                          activeFilter === filter.id
                            ? "bg-gradient-to-r from-sky-50 to-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${isAnimating ? "opacity-70" : "opacity-100"}`}
                        disabled={isAnimating}
                      >
                        <span className="text-lg">{filter.icon}</span>
                        {filter.label}
                        {activeFilter === filter.id && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-200/40 via-blue-400/30 to-blue-800/20 blur-2xl rounded-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      {view === "packages" ? (
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500 ${
              isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col h-auto justify-between group bg-white rounded-3xl md:rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    {service.popular && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    {service.price}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <Check
                          size={16}
                          className="text-green-500 mr-3 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && !isAnimating && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No services found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're working on new {currentFilterLabel.toLowerCase()}{" "}
                services. Check back soon!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {customPlans.map((plan, i) => (
            <div
              key={plan.id || i}
              className="rounded-[2rem] border border-gray-200 p-10 flex flex-col text-center"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2 uppercase">
                {plan.name}
              </h3>
              <p className="text-green-600 font-bold mb-2">{plan.offer}</p>
              <p className="text-gray-500 text-sm mb-6">{plan.min}</p>
              <p className="text-4xl font-extrabold text-blue-600 mb-1">
                AED {plan.price}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                (Monthly) Payable Quarterly
              </p>
              <button
                className={`${plan.buttonColor} text-white font-semibold py-3 px-10 rounded-full flex items-center justify-center gap-2 transition-all mx-auto`}
              >
                Get Started <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Need a Custom Solution?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Let's discuss your specific requirements and create a tailored package
          just for you.
        </p>
        <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Get Custom Quote
        </Link>
      </div>
    </section>
  );
}
