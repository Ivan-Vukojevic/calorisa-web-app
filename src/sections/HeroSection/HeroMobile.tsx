import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import heroImage from '../../assets/images/calorisa-home-osijek-nutrition-hero.jpg';

interface HeroMobileProps {
  nutritionstAlt: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

function HeroMobile({ 
  nutritionstAlt, 
  title, 
  description, 
  ctaPrimary, 
  ctaSecondary 
}: HeroMobileProps): JSX.Element {
  return (
    <div className="lg:hidden min-h-screen flex flex-col">
      {/* Image Section - Mobile */}
      <motion.div 
        className="relative h-[55vh] w-full"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img 
          alt={nutritionstAlt}
          className="absolute inset-0 w-full h-full object-cover"
          src={heroImage}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </motion.div>

      {/* Content Section - Mobile */}
      <div className="relative bg-white flex flex-col justify-center items-center text-center px-6 py-12 flex-1">
        <div className="relative z-10 max-w-xl">
          <motion.h1 
            className="font-['Anton',sans-serif] text-[#6b4f4f] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <span className="block text-4xl sm:text-5xl leading-tight">
              WELCOME TO
            </span>
            <span className="block text-4xl sm:text-5xl leading-tight">
              THE GOOD LIFE.
            </span>
          </motion.h1>

          <motion.p 
            className="text-[#6b4f4f] text-lg mb-8 opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            <HeroButtons 
              ctaPrimary={ctaPrimary}
              ctaSecondary={ctaSecondary}
              isMobile={true}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroMobile;
