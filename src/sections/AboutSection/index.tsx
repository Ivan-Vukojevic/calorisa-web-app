import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import AboutContent from './AboutContent';
import AboutImage from './AboutImage';
import AboutStats from './AboutStats';

/**
 * About section with content, image, and stats
 */
function AboutSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' } }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="bg-neutral-100 text-[#6b4f4f]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-20 box-border">
        <motion.div
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 md:mb-16"
        >
          <AboutContent 
            container={container}
            itemUp={itemUp}
            sectionRef={sectionRef}
          />
          <AboutImage imageReveal={imageReveal} />
        </motion.div>

        <AboutStats itemUp={itemUp} />
      </div>
    </motion.section>
  );
}

export default AboutSection;
