import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Activity, Heart, Zap, Target } from 'lucide-react';
import reformerImageJpg from '../../assets/images/calorisa-pilates-osijek-reformer-hero.jpg';
import g1jpg from '../../assets/images/calorisa-pilates-osijek-reformer-01.jpg';
import g2jpg from '../../assets/images/calorisa-pilates-osijek-reformer-02.jpg';
import g3jpg from '../../assets/images/calorisa-pilates-osijek-reformer-03.jpg';
import g4jpg from '../../assets/images/calorisa-pilates-osijek-reformer-04.jpg';
import g5jpg from '../../assets/images/calorisa-pilates-osijek-reformer-05.jpg';
import g6jpg from '../../assets/images/calorisa-pilates-osijek-reformer-06.jpg';
import g7jpg from '../../assets/images/calorisa-pilates-osijek-reformer-07.jpg';
import g8jpg from '../../assets/images/calorisa-pilates-osijek-reformer-08.jpg';
import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface GalleryImage {

  jpg: string;
  caption: string;
}

function ReformerSection(): JSX.Element {
  const { t } = useTranslation();
  
  const features = t('main.reformer.features', { returnObjects: true }) as string[];
  
  const benefits: Benefit[] = useMemo(() => [
    {
      icon: Activity,
      title: t('main.reformer.benefit1Title', 'Full Body Workout'),
      description: t('main.reformer.benefit1Desc', 'Engage every muscle group with precision and control')
    },
    {
      icon: Heart,
      title: t('main.reformer.benefit2Title', 'Low Impact'),
      description: t('main.reformer.benefit2Desc', 'Gentle on joints while building strength and flexibility')
    },
    {
      icon: Zap,
      title: t('main.reformer.benefit3Title', 'Increased Energy'),
      description: t('main.reformer.benefit3Desc', 'Boost your metabolism and feel energized throughout the day')
    },
    {
      icon: Target,
      title: t('main.reformer.benefit4Title', 'Core Strength'),
      description: t('main.reformer.benefit4Desc', 'Develop a powerful core foundation for everyday movement')
    }
  ], [t]);
  
  const galleryImages: GalleryImage[] = useMemo(() => [
    { jpg: g1jpg, caption: t('main.reformer.galleryCaption1') },
    { jpg: g2jpg, caption: t('main.reformer.galleryCaption2') },
    { jpg: g3jpg, caption: t('main.reformer.galleryCaption3') },
    { jpg: g4jpg, caption: t('main.reformer.galleryCaption4') },
    { jpg: g5jpg, caption: t('main.reformer.galleryCaption1') },
    { jpg: g6jpg, caption: t('main.reformer.galleryCaption2') },
    { jpg: g7jpg, caption: t('main.reformer.galleryCaption3') },
    { jpg: g8jpg, caption: t('main.reformer.galleryCaption4') },
  ], [t]);

  return (
    <section
      id="reformer-section"
      className="w-full bg-gradient-to-b from-[var(--cream)] to-[var(--cream-light)] flex flex-col items-center justify-start relative overflow-hidden"
    >
      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[400px] md:h-[600px] lg:h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src={reformerImageJpg}
          alt={t('main.reformer.title')}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Title */}
        <motion.h1
          className="relative z-10 text-white uppercase tracking-wide text-center px-4 md:px-6 lg:px-8 text-display-responsive font-playfair"
          style={{ 
            textShadow: '2px 4px 8px rgba(0,0,0,0.7)' 
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('main.reformer.title')}
        </motion.h1>
      </motion.div>

      {/* Benefits Section */}
      <div className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-responsive mb-4 text-[var(--brand)]">
              {t('main.reformer.benefitsTitle', 'Why Choose Reformer Pilates?')}
            </h2>
            <p className="text-body max-w-2xl mx-auto text-[var(--brand)]">
              {t('main.reformer.benefitsSubtitle', 'Discover the unique benefits that make reformer Pilates one of the most effective full-body workouts available.')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-[var(--brand)]/10">
                  <benefit.icon className="w-8 h-8 text-[var(--brand)]" />
                </div>
                <h3 className="text-h5 mb-2 text-[var(--brand)]">{benefit.title}</h3>
                <p className="text-body text-[var(--brand)]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-h2-responsive mb-4 text-[var(--brand)]">
              {t('main.reformer.galleryTitle', 'Our Studio Gallery')}
            </h2>
            <p className="text-body text-[#4f4f4f] max-w-2xl mx-auto">
              {t('main.reformer.gallerySubtitle', 'Take a glimpse into our state-of-the-art Pilates studio and see where transformation happens.')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index} 
                className={
                  `relative overflow-hidden rounded-lg group cursor-pointer ${
                    index === 0 ? 'aspect-[4/5] col-span-2 md:col-span-1 md:aspect-[3/4]' : 'aspect-[3/4]'
                  }`
                }
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={image.jpg}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReformerSection;
