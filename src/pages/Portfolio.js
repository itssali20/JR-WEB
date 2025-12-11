import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "branding", label: "Branding" },
    { id: "uiux", label: "UI/UX Design" },
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "web",
      subcategory: "ecommerce",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Modern e-commerce solution with advanced features and seamless user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      title: "Fitness Mobile App",
      category: "mobile",
      subcategory: "uiux",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Cross-platform fitness tracking application with real-time analytics.",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 3,
      title: "Corporate Branding",
      category: "branding",
      subcategory: "uiux",
      image:
        "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Complete brand identity for innovative tech startup.",
      technologies: ["Adobe Suite", "Brand Strategy", "Visual Identity"],
    },
    {
      id: 4,
      title: "Food Delivery App",
      category: "mobile",
      subcategory: "ecommerce",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "On-demand food delivery service with live tracking.",
      technologies: ["Flutter", "Node.js", "Stripe", "Google Maps"],
    },
    {
      id: 5,
      title: "SaaS Dashboard",
      category: "web",
      subcategory: "uiux",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Advanced analytics dashboard for B2B SaaS platform.",
      technologies: ["Vue.js", "D3.js", "Express", "Chart.js"],
    },
    {
      id: 6,
      title: "Luxury Brand Store",
      category: "ecommerce",
      subcategory: "web",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Premium e-commerce experience for luxury fashion brand.",
      technologies: ["Next.js", "Shopify", "Tailwind CSS", "Sanity CMS"],
    },
    {
      id: 7,
      title: "Banking Application",
      category: "mobile",
      subcategory: "uiux",
      image:
        "https://images.unsplash.com/photo-1563013541-2e3091cc06a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Secure mobile banking with biometric authentication.",
      technologies: ["Swift", "Kotlin", "Blockchain", "Firebase"],
    },
    {
      id: 8,
      title: "Travel Platform",
      category: "web",
      subcategory: "ecommerce",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Comprehensive travel booking and management system.",
      technologies: ["React", "GraphQL", "AWS", "Redis"],
    },
    {
      id: 9,
      title: "Healthcare Portal",
      category: "web",
      subcategory: "uiux",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Patient management and telemedicine platform.",
      technologies: ["Angular", "Python", "PostgreSQL", "Docker"],
    },
  ];

  // Filter projects with animation
  const handleFilterClick = (filterId) => {
    if (filterId === activeFilter || isAnimating) return;

    setIsAnimating(true);
    setActiveFilter(filterId);
    setIsDropdownOpen(false);

    setTimeout(() => {
      if (filterId === "all") {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(
          (project) =>
            project.category === filterId || project.subcategory === filterId
        );
        setFilteredProjects(filtered);
      }
      setIsAnimating(false);
    }, 400);
  };

  // Initialize with all projects
  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const currentFilterLabel = filters.find(f => f.id === activeFilter)?.label;

  return (
    <>
      <Header />

      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Creating Digital Excellence
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our diverse portfolio of successful projects that showcase our expertise
            in delivering cutting-edge digital solutions.
          </p>
        </div>

        {/* Enhanced Filter Bar - Dropdown for Mobile, Tabs for Desktop */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-2">
          <div className="relative">
            {/* Desktop Filter Bar (Hidden on mobile) */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
                <div className="relative flex items-center justify-between">
                  {/* Animated Background Slider */}
                  <div
                    className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-500 ease-out shadow-lg"
                    style={{
                      width: `${100 / filters.length}%`,
                      left: `${(filters.findIndex(f => f.id === activeFilter) * 100) / filters.length}%`,
                    }}
                  ></div>

                  {/* Filter Tabs */}
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={`relative flex-1 py-4 px-2 mx-1 rounded-xl font-semibold text-sm transition-all duration-300 z-10 ${activeFilter === filter.id
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

            {/* Mobile Dropdown Filter (Hidden on desktop) */}
            <div className="md:hidden filter-dropdown">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
                {/* Dropdown Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full py-4 px-4 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                >
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {currentFilterLabel}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => handleFilterClick(filter.id)}
                        className={`w-full py-4 px-6 text-left font-semibold transition-all duration-200 flex items-center ${activeFilter === filter.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                          } ${isAnimating ? "opacity-70" : "opacity-100"}`}
                        disabled={isAnimating}
                      >
                        {activeFilter === filter.id && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        )}
                        {filter.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl rounded-3xl -z-10 opacity-40 md:opacity-60"></div>
          </div>

          {/* Active Filter Indicator */}
          <div className="text-center mt-4 md:mt-6">
            <span className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs md:text-sm font-medium border border-blue-200/50 shadow-sm">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mr-1.5 md:mr-2 animate-pulse"></div>
              Showing {filteredProjects.length} projects
              {activeFilter !== "all" &&
                ` in ${filters.find((f) => f.id === activeFilter)?.label}`}
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500 ${isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
              }`}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-gray-100"
              >
                {/* Project Image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4">
                    <span className="px-2 md:px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 font-semibold py-2 md:py-3 rounded-xl hover:bg-white transition-colors duration-200 text-sm md:text-base">
                      View Case Study
                    </button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && !isAnimating && (
            <div className="text-center py-12 md:py-16">
              <div className="text-5xl md:text-6xl mb-4">🚧</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
                We're working on new{" "}
                {activeFilter !== "all"
                  ? filters.find((f) => f.id === activeFilter)?.label.toLowerCase()
                  : ""}{" "}
                projects. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Ready to start your project?
          </h3>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Let's collaborate to bring your digital vision to life with our expert team.
          </p>
          <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base">
            Start Your Project Today
          </button>
        </div>
      </section>
    </>
  );
}