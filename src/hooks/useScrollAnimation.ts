import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for animating sections on scroll using IntersectionObserver
 * Adds 'visible' class to sections when they enter viewport
 */
const useScrollAnimation = (): void => {
  const location = useLocation();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>('.section');
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observerInstance.unobserve(entry.target); 
            }
          });
        },
        {
          threshold: 0.2, 
        }
      );
      
      sections.forEach((section) => observer.observe(section));
      
      return () => {
        sections.forEach((section) => observer.unobserve(section));
      };
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [location.pathname]);
};

export default useScrollAnimation;
