import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductData } from './useProductData';
import { ProductTabButtons, ProductTabButtonsMobile } from './ProductTabButtons';
import { ProductCard as ProductCardComponent, ProductCardMobile } from './ProductCard';

function ProductsSection(): JSX.Element {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('nutrition');
  const { getCurrentCards } = useProductData();

  const cardsForTab = getCurrentCards(activeTab);
  const currentCards = Array.isArray(cardsForTab) ? cardsForTab : [];

  return (
    <section className="w-full box-border bg-gradient-to-b from-[var(--cream)] to-[var(--cream-light)] relative overflow-hidden">
      
      {/* Desktop Version */}
      <div className="hidden md:block w-full min-h-screen relative">
        <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-display-responsive text-[var(--brand)] text-center mb-8"
          >
            {t('main.products.heading', 'Our Services')}
          </motion.h2>

          <ProductTabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className={`flex flex-wrap justify-center items-stretch gap-10 w-full max-w-[1400px] ${
                currentCards.length === 3 ? 'gap-x-10 gap-y-8' : ''
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCards.length > 0 ? (
                currentCards.map((card, index) => (
                  <div 
                    key={`product-wrapper-${card.title}-${index}`}
                    className={`flex ${currentCards.length === 3 && index === 2 ? 'lg:basis-full lg:max-w-[520px] justify-center' : ''}`}
                  >
                    <ProductCardComponent card={card} index={index} />
                  </div>
                ))
              ) : (
                <p className="text-white">No products available at the moment.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden flex flex-col px-5 py-5">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-display-responsive text-[var(--brand)] whitespace-normal px-0 md:px-3 mb-4 md:mb-8 lg:mb-12 text-center"
        >
          {t('main.products.heading', 'Our Services')}
        </motion.h2>

        <ProductTabButtonsMobile activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentCards.length > 0 ? (
              currentCards.map((card, index) => (
                <ProductCardMobile key={`mobile-${card.title}-${index}`} card={card} index={index} />
              ))
            ) : (
              <p className="text-[var(--brand)] text-center">No products available at the moment.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ProductsSection;
