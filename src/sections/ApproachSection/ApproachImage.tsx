import { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import approachAvif512 from '../../assets/images/calorisa-approach-osijek-personal-mindset-w512.avif';
import approachAvif767 from '../../assets/images/calorisa-approach-osijek-personal-mindset-w767.avif';
import approachWebp512 from '../../assets/images/calorisa-approach-osijek-personal-mindset-w512.webp';
import approachWebp767 from '../../assets/images/calorisa-approach-osijek-personal-mindset-w767.webp';
import approachJpg512 from '../../assets/images/calorisa-approach-osijek-personal-mindset-w512.jpg';
import approachJpg767 from '../../assets/images/calorisa-approach-osijek-personal-mindset-w767.jpg';

interface ApproachImageProps {
  fadeSlideVariants: {
    title: Variants;
    description: Variants;
    image: Variants;
    programsTitle: Variants;
  };
}

export const ApproachImage = memo<ApproachImageProps>(({ fadeSlideVariants }) => {
  const { t } = useTranslation();

  const parallaxImageVariants: Variants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeSlideVariants.image}
      className="flex justify-center"
    >
      <motion.div initial="rest" whileHover="hover" className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] overflow-hidden rounded-full">
        <motion.div variants={parallaxImageVariants} className="relative w-full h-full">
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <picture>
            <source type="image/avif" srcSet={`${approachAvif512} 512w, ${approachAvif767} 767w`} />
            <source type="image/webp" srcSet={`${approachWebp512} 512w, ${approachWebp767} 767w`} />
            <img
              src={approachJpg512}
              srcSet={`${approachJpg512} 512w, ${approachJpg767} 767w`}
              sizes="(min-width: 768px) 512px, 384px"
              alt={t('main.approach.imageAlt')}
              className="w-full h-full object-cover rounded-full shadow-2xl"
              style={{ transform: 'scale(1.3)', objectPosition: 'center top' }}
              loading="lazy"
              decoding="async"
            />
          </picture>
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#d4b5a0]"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ApproachImage.displayName = 'ApproachImage';
