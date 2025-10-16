// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      // Just update the hash — HomePage will handle scroll
      window.history.pushState(null, '', `#${id}`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      navigate(`/#${id}`);
    }
  };

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`relative top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" onClick={() => goToSection('home')}>
            <img src={logo} alt="Logo" className="h-[40px]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className="text-gray-700 font-medium hover:text-blue-600 transition-all duration-300 relative group"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => goToSection('contact')}
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => goToSection(id)}
              className="block w-full text-left text-gray-700 font-medium py-3 px-4 hover:bg-blue-50"
            >
              {label}
            </button>
          ))}
          <div className="border-t p-4">
            <button
              onClick={() => goToSection('contact')}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
