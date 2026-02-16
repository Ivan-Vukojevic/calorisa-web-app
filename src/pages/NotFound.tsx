import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { buildPathWithLocale, getResolvedLocale } from '../utils/locale';

/**
 * 404 Not Found page component
 */
function NotFound(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getResolvedLocale(location.pathname);
  const homePath = buildPathWithLocale(locale, '/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f6] px-4">
      <motion.div 
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* 404 Number */}
        <motion.h1 
          className="text-[150px] md:text-[200px] font-bold text-[var(--brand)] leading-none mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2 
          className="text-h3 md:text-h2 text-[var(--brand)] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('notFound.title')}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-body-lg text-[var(--brand)]/70 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t('notFound.description')}
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            to={homePath}
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--brand)] text-white font-['Anton',sans-serif] text-lg rounded-lg hover:bg-[var(--brand-dark)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('notFound.backToHome')}
          </Link>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          className="mt-12 text-[var(--brand)]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <svg className="w-32 h-32 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;
