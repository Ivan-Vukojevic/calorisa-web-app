import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCarousel from '../hooks/useCarousel';

interface MobileCardCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  className?: string;
  minHeight?: string;
}

export default function MobileCardCarousel<T>({
  items,
  renderItem,
  className = '',
  minHeight = 'min-h-[280px]',
}: MobileCardCarouselProps<T>): JSX.Element {
  const {
    currentIndex,
    currentItem,
    goToNext,
    goToPrevious,
    goToIndex,
    canGoNext,
    canGoPrevious,
    swipeHandlers,
    totalItems,
  } = useCarousel(items, { keyboard: true, loop: false });

  return (
    <div className={`lg:hidden w-full px-4 mb-12 ${className}`}>
      <div className="relative w-full max-w-[420px] mx-auto">
        <div
          onTouchStart={swipeHandlers.onTouchStart}
          onTouchMove={swipeHandlers.onTouchMove}
          onTouchEnd={swipeHandlers.onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait">
            {currentItem && (
              <motion.div
                key={`mobile-item-${currentIndex}`}
                className={`bg-white rounded-2xl shadow-xl p-6 ${minHeight} flex flex-col relative`}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {renderItem(currentItem as T, currentIndex)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6 px-2">
          <motion.button
            aria-label="Previous"
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canGoPrevious}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>

          <div className="flex gap-2 justify-center">
            {items.map((_, i) => (
              <motion.button
                key={`dot-${i}`}
                onClick={() => goToIndex(i)}
                aria-label={`Go to item ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-[var(--brand)]' : 'w-2 bg-[var(--brand)]/20 hover:bg-[var(--brand)]'
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            aria-label="Next"
            onClick={goToNext}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canGoNext}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>
      </div>
    </div>
  );
}
