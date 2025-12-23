import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface AboutStatsProps {
  itemUp: Variants;
}

interface Stat {
  title: string;
  description: string;
}

/**
 * About section statistics with animated divider
 */
function AboutStats({ itemUp }: AboutStatsProps): JSX.Element {
  const { t } = useTranslation();

  const stats: Stat[] = [
    {
      title: t('main.about.stats.clients.title'),
      description: t('main.about.stats.clients.description')
    },
    {
      title: t('main.about.stats.experience.title'),
      description: t('main.about.stats.experience.description')
    },
    {
      title: t('main.about.stats.services.title'),
      description: t('main.about.stats.services.description')
    }
  ];

  return (
    <>
      {/* Divider */}
      <motion.div
        className="bg-[#6b4f4f]/20 h-[4px] w-full my-5"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
      />

      {/* Stats Grid */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
        }}
        className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-12 mt-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemUp}
            className="text-center"
          >
            <h3 className="text-display-sm md:text-display-md lg:text-display-lg text-[#6b4f4f] mb-1 md:mb-1.5 font-bold">
              {stat.title}
            </h3>
            <p className="text-xs md:text-h5 text-[#4f4f4f] uppercase font-semibold">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default AboutStats;
