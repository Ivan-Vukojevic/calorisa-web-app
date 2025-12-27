import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import heroAvif480 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w480.avif';
import heroAvif768 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w768.avif';
import heroAvif1024 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1024.avif';
import heroWebp480 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w480.webp';
import heroWebp768 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w768.webp';
import heroWebp1024 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1024.webp';
import heroJpg480 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w480.jpg';
import heroJpg768 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w768.jpg';
import heroJpg1024 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1024.jpg';

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
      <div className="relative h-[55vh] w-full">
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroAvif480} 480w, ${heroAvif768} 768w, ${heroAvif1024} 1024w`}
          />
          <source
            type="image/webp"
            srcSet={`${heroWebp480} 480w, ${heroWebp768} 768w, ${heroWebp1024} 1024w`}
          />
          <img 
            alt={nutritionstAlt}
            className="absolute inset-0 w-full h-full object-cover"
            src={heroJpg768}
            srcSet={`${heroJpg480} 480w, ${heroJpg768} 768w, ${heroJpg1024} 1024w`}
            sizes="100vw"
            loading="eager"
            {...({ fetchpriority: "high" } as any)}
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Content Section - Mobile */}
      <div className="relative bg-white flex flex-col justify-center items-center text-center px-6 py-12 flex-1">
        <div className="relative z-10 max-w-xl">
          <motion.h1 
            className="font-['Anton',sans-serif] text-[#3c2626] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="block text-4xl sm:text-5xl leading-tight">
              WELCOME TO
            </span>
            <span className="block text-4xl sm:text-5xl leading-tight">
              THE GOOD LIFE.
            </span>
          </motion.h1>

          <motion.p 
            className="text-[#3c2626] text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
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
