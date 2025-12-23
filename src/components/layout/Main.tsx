import React, { useEffect } from 'react';
import HeroSection from '../../sections/HeroSection';
import ApproachSection from '../../sections/ApproachSection';
import AboutSection from '../../sections/AboutSection';
import ProgramsSection from '../../sections/ProgramsSection';
import ProductsSection from '../../sections/ProductsSection';
import ReformerSection from '../../sections/ReformerSection';
import RecipesSection from '../../sections/RecipesSection';
import FeedbackSection from '../../sections/FeedbackSection';
import ContactSection from '../../sections/ContactSection';
import GallerySection from '../../sections/GallerySection';

/**
 * Main content component containing all page sections
 * Implements scroll-to-top on mount and accessibility landmarks
 */
export default function Main(): JSX.Element {
  
  useEffect(() => {
    // Scroll to top when Main component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" role="main">
      <section id="hero"><HeroSection /></section>
      <section id="approach" className="section"><ApproachSection /></section>
      <section id="about" className="section"><AboutSection /></section>
      <section id="programs" className="section"><ProgramsSection /></section>
      <section id="products" className="section"><ProductsSection /></section>
      <section id="reformer" className="section"><ReformerSection /></section>
      <section id="recipes" className="section"><RecipesSection /></section>
      <section id="feedback" className="section"><FeedbackSection /></section>
      <section id="contact" className="section"><ContactSection /></section>
      <section id="gallery" className="section"><GallerySection /></section>
    </main>
  );
}
