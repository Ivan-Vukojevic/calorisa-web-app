import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

interface ProgramsListProps {
  programKeys: string[];
  fadeSlideVariants: {
    title: Variants;
    description: Variants;
    image: Variants;
    programsTitle: Variants;
  };
}

export function ProgramsList({ programKeys, fadeSlideVariants }: ProgramsListProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="text-left">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeSlideVariants.programsTitle}
        className="mb-6 text-white text-h6 md:text-h5"
      >
        {t('main.approach.programs.title')}
      </motion.h3>

      <div className="space-y-6">
        {programKeys.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ x: 10 }}
            className="flex items-start gap-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="mt-1"
            >
              <Check className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-left">
              <motion.h4 
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.75 + index * 0.1 }}
                className="text-white font-bold text-base md:text-lg mb-1"
              >
                {t(`main.approach.programs.${key}.title`)}
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.85 + index * 0.1 }}
                className="text-white/90 text-body leading-relaxed"
              >
                {t(`main.approach.programs.${key}.description`)}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
