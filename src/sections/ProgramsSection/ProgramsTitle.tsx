import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function ProgramsTitle(): JSX.Element {
  const { t } = useTranslation();

  return (
    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-12 sm:mb-16 lg:mb-20 text-white drop-shadow-md px-4 text-display-responsive"
    >
      {t('main.programs.title')}
    </motion.h2>
  );
}

export default ProgramsTitle;
