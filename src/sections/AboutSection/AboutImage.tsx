import { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import image3jpg from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer.jpg';

interface AboutImageProps {
  imageReveal: Variants;
}

/**
 * About section image with responsive picture element
 */
const AboutImage = memo<AboutImageProps>(({ imageReveal }) => {
  const { t } = useTranslation();

  return (
    <motion.div variants={imageReveal} className="order-1 lg:order-2 h-full">
      <div className="w-full h-[400px] md:h-[500px] lg:h-full min-h-[520px] overflow-hidden rounded-[10px]">
        <motion.img
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageReveal}
          className="w-full h-full object-cover scale-120"
          src={image3jpg}
          alt={t('about.image.imageAlt', 'Nutritionist portrait')}
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  );
});

AboutImage.displayName = 'AboutImage';

export default AboutImage;
