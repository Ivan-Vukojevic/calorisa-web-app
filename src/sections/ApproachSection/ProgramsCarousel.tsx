import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

interface ProgramsCarouselProps {
  programKeys: string[];
}

export function ProgramsCarousel({ programKeys }: ProgramsCarouselProps): JSX.Element {
  const { t } = useTranslation();
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    const threshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (diff > threshold && currentProgramIndex < programKeys.length - 1) {
      setCurrentProgramIndex((i) => i + 1); // Swipe left - go to next
    } else if (diff < -threshold && currentProgramIndex > 0) {
      setCurrentProgramIndex((i) => i - 1); // Swipe right - go to previous
    }
  };

  return (
    <div className="lg:hidden w-full px-4 mb-12">
      <h3 className="mb-8 text-center text-white text-xl font-bold">
        {t('main.approach.programs.title')}
      </h3>

      <div className="relative w-full max-w-[420px] mx-auto">
        {/* eslint-disable-next-line react/forbid-dom-props */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait">
            {programKeys[currentProgramIndex] && (
              <motion.div
                key={`mobile-program-${currentProgramIndex}`}
                className="bg-white rounded-2xl shadow-xl p-6 min-h-[280px] flex flex-col"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Counter badge */}
                <div className="absolute top-4 right-4 bg-[#f7f0ec] rounded-full px-3 py-1 text-xs font-semibold text-[#6b4f4f]">
                  {currentProgramIndex + 1} / {programKeys.length}
                </div>

              {/* Check icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6b4f4f] to-[#5a3f3f] flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h4 className="text-[#6b4f4f] font-bold text-xl mb-3 leading-tight">
                {t(`main.approach.programs.${programKeys[currentProgramIndex]}.title`)}
              </h4>

              {/* Description */}
              <p className="text-[#4f4f4f] text-base leading-relaxed flex-grow">
                {t(`main.approach.programs.${programKeys[currentProgramIndex]}.description`)}
              </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation controls at bottom of card */}
        <div className="flex items-center justify-between mt-6 px-2">
          {/* Prev button */}
          <motion.button
            aria-label="Previous program"
            onClick={() => setCurrentProgramIndex((i) => Math.max(i - 1, 0))}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentProgramIndex === 0}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>

          {/* Dot indicators */}
          <div className="flex gap-2 justify-center">
            {programKeys.map((_, i) => (
              <motion.button
                key={`dot-${i}`}
                onClick={() => setCurrentProgramIndex(i)}
                aria-label={`Go to program ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentProgramIndex 
                    ? 'w-8 bg-[#6b4f4f]' 
                    : 'w-2 bg-[#d9d9d9] hover:bg-[#6b4f4f]'
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Next button */}
          <motion.button
            aria-label="Next program"
            onClick={() => setCurrentProgramIndex((i) => Math.min(i + 1, programKeys.length - 1))}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentProgramIndex === programKeys.length - 1}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>
      </div>
    </div>
  );
}
