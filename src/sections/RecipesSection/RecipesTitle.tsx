import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function RecipesTitle(): JSX.Element {
  const { t } = useTranslation();

  return (
    <motion.h2 
      className="text-display-responsive text-white whitespace-normal px-0 md:px-3 mb-8 md:mb-12 lg:mb-16"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {t('main.recipes.title')}
    </motion.h2>
  );
}

export default RecipesTitle;
