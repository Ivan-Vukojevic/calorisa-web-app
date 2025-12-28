import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function FeedbackTitle(): JSX.Element {
  const { t } = useTranslation();

  return (
    <motion.h2 
      className="text-display-responsive text-[#6b4f4f] whitespace-normal px-0 md:px-3 mb-4 md:mb-8 lg:mb-12 relative z-10 text-center"
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {t('main.feedback.title')}
    </motion.h2>
  );
}

export default FeedbackTitle;
