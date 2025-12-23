import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ProductTabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProductTabButtons({ activeTab, setActiveTab }: ProductTabButtonsProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="flex justify-center gap-3 mb-8"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {['nutrition', 'training', 'pilates'].map((tab, index) => (
        <motion.button
          key={tab}
          onClick={() => setActiveTab(tab)}
          aria-pressed={activeTab === tab}
          className={`relative px-8 py-3.5 text-base font-semibold rounded-full overflow-hidden ${
            activeTab === tab
              ? 'bg-white text-[#6b4f4f] shadow-lg shadow-gray-200/50 border-2 border-[#6b4f4f]'
              : 'bg-[#6b4f4f] text-white hover:bg-[#5a3f3f]'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <span className="relative z-10">{t(`main.products.tabs.${tab}`)}</span>
          {/* active indicator removed */}
        </motion.button>
      ))}
    </motion.div>
  );
}

interface ProductTabButtonsMobileProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ProductTabButtonsMobile({ activeTab, setActiveTab }: ProductTabButtonsMobileProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2.5 mb-6 max-w-[400px] mx-auto"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {['nutrition', 'training', 'pilates'].map((tab, index) => (
        <motion.button
          key={tab}
          onClick={() => setActiveTab(tab)}
          aria-pressed={activeTab === tab}
          className={`relative px-4 py-2 text-sm font-semibold rounded-full overflow-hidden whitespace-nowrap ${
            activeTab === tab
              ? 'bg-white text-[#6b4f4f] shadow-lg shadow-gray-200/50 border-2 border-[#6b4f4f]'
              : 'bg-[#6b4f4f] text-white hover:bg-[#5a3f3f]'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <span className="relative z-10">{t(`main.products.tabs.${tab}`)}</span>
          {/* mobile active indicator removed */}
        </motion.button>
      ))}
    </motion.div>
  );
}
