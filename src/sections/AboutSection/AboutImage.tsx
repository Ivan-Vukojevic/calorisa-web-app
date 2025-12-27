import { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import aboutAvif570 from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer-w570.avif';
import aboutAvif855 from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer-w855.avif';
import aboutWebp570 from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer-w570.webp';
import aboutWebp855 from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer-w855.webp';
import aboutJpg570 from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer-w570.jpg';
import aboutJpg855 from '../../assets/images/calorisa-about-osijek-nutricionist-trener-reformer-w855.jpg';

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
        <motion.picture initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={imageReveal}>
          <source type="image/avif" srcSet={`${aboutAvif570} 570w, ${aboutAvif855} 855w`} />
          <source type="image/webp" srcSet={`${aboutWebp570} 570w, ${aboutWebp855} 855w`} />
          <img
            className="w-full h-full object-cover scale-120"
            src={aboutJpg570}
            srcSet={`${aboutJpg570} 570w, ${aboutJpg855} 855w`}
            sizes="(min-width: 1024px) 570px, (min-width: 768px) 500px, 100vw"
            alt={t('about.image.imageAlt', 'Nutritionist portrait')}
            loading="lazy"
            decoding="async"
          />
        </motion.picture>
      </div>
    </motion.div>
  );
});

AboutImage.displayName = 'AboutImage';

export default AboutImage;
