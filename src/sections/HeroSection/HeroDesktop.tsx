import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import heroAvif480 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w480.avif';
import heroAvif768 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w768.avif';
import heroAvif813 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w813.avif';
import heroAvif1024 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1024.avif';
import heroAvif1440 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1440.avif';
import heroWebp480 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w480.webp';
import heroWebp768 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w768.webp';
import heroWebp813 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w813.webp';
import heroWebp1024 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1024.webp';
import heroWebp1440 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1440.webp';
import heroJpg480 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w480.jpg';
import heroJpg768 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w768.jpg';
import heroJpg813 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w813.jpg';
import heroJpg1024 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1024.jpg';
import heroJpg1440 from '../../assets/images/calorisa-home-osijek-nutrition-hero-w1440.jpg';

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
            className="font-['Anton',sans-serif] text-[#3c2626] mb-6"
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
            className="text-[#3c2626] text-lg sm:text-xl mb-8 max-w-md"
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
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroAvif480} 480w, ${heroAvif768} 768w, ${heroAvif813} 813w, ${heroAvif1024} 1024w`}
          />
          <source
            type="image/webp"
            srcSet={`${heroWebp480} 480w, ${heroWebp768} 768w, ${heroWebp813} 813w, ${heroWebp1024} 1024w`}
          />
          <img
            alt={nutritionstAlt}
            className="absolute inset-0 w-full h-full object-cover"
            src={heroJpg813}
            srcSet={`${heroJpg480} 480w, ${heroJpg768} 768w, ${heroJpg813} 813w, ${heroJpg1024} 1024w, ${heroJpg1440} 1440w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={813}
            height={1352}
            loading="eager"
            {...({ fetchpriority: "high" } as any)}
            decoding="async"
          />
        </picture>
      </motion.div>
    </div>
  );
}

export default HeroDesktop;
