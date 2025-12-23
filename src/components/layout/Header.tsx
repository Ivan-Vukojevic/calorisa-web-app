import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';

/**
 * Header component with scroll-based visibility and styling
 * Manages navigation bar appearance based on scroll position
 */
function Header(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isPassedApproach, setIsPassedApproach] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const secondSection = document.querySelector('#second-section');
      const secondSectionTop = secondSection ? secondSection.getBoundingClientRect().top : 1;

      if (secondSectionTop <= 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check if we've scrolled past the hero section (for mobile)
      const heroSection = document.querySelector('#hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // If the bottom of hero section is at or above the top of viewport
        setIsPassedApproach(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <Navigation isScrolled={isScrolled} isPassedApproach={isPassedApproach} />
    </header>
  );
}

export default Header;
