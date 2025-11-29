import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/Hero';
import Header from '../components/Header';
import ServicesSection from '../components/Services';
import AboutUs from '../components/About';
import Portfolio from '../components/Portfolio';
import HowWeWork from '../components/HowWeWork';
import TeamSection from '../components/TeamSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/Testimonials';
import FaqSection from '../components/FAQSection';
import InsightsSection from '../components/Insights';
import ContactSection from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="relative">
      <Header />
      <main>
        <section id="home"><HeroSection /></section>
        <section id="services"><ServicesSection /></section>
        <section id="about"><AboutUs /></section>
        <section id="portfolio"><Portfolio /></section>
        <section id="how-we-work"><HowWeWork /></section>
        <section id="team"><TeamSection /></section>
        <section id="pricing"><PricingSection /></section>
        <section id="testimonials"><TestimonialsSection /></section>
        <section id="faq"><FaqSection /></section>
        <section id="insights"><InsightsSection /></section>
        <section id="contact"><ContactSection /></section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
