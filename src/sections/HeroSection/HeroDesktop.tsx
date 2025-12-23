import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import heroImage from '../../assets/images/calorisa-home-osijek-nutrition-hero.jpg';

interface HeroDesktopProps {
  nutritionstAlt: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

function HeroDesktop({ 
  nutritionstAlt, 
  title, 
  description, 
  ctaPrimary, 
  ctaSecondary 
}: HeroDesktopProps): JSX.Element {
  return (
    <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
      {/* Left Content Section */}
      <div className="relative bg-neutral-100 flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 py-20 lg:py-0">
        {/* Main Content */}
        <div className="relative z-10 max-w-xl">
          <motion.h1 
            className="font-['Anton',sans-serif] text-[#6b4f4f] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              WELCOME TO
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              THE GOOD LIFE.
            </span>
          </motion.h1>

          <motion.p 
            className="text-[#6b4f4f] text-lg sm:text-xl mb-8 max-w-md opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <HeroButtons 
              ctaPrimary={ctaPrimary}
              ctaSecondary={ctaSecondary}
              isMobile={false}
            />
          </motion.div>
        </div>
      </div>

      {/* Right Image Section */}
      <motion.div 
        className="relative h-auto overflow-hidden"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img 
          alt={nutritionstAlt}
          className="absolute inset-0 w-full h-full object-cover"
          src={heroImage}
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}

export default HeroDesktop;
