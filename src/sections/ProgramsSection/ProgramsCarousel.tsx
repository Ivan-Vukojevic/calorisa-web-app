import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  number: number;
  heading: string;
  description: React.ReactNode;
  position: string;
}

interface ProgramsCarouselProps {
  sections: Section[];
}

function ProgramsCarousel({ sections }: ProgramsCarouselProps): JSX.Element {
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
    
    if (diff > threshold && currentProgramIndex < sections.length - 1) {
      setCurrentProgramIndex((i) => i + 1); // Swipe left - go to next
    } else if (diff < -threshold && currentProgramIndex > 0) {
      setCurrentProgramIndex((i) => i - 1); // Swipe right - go to previous
    }
  };

  return (
    <div className="lg:hidden w-full px-4 mb-12">
      <div
        className="relative w-full max-w-[420px] mx-auto touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {sections[currentProgramIndex] && (
            <motion.div
              key={`mobile-program-${currentProgramIndex}`}
              className="bg-white rounded-2xl shadow-xl p-6 min-h-[320px] flex flex-col relative"
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Counter badge */}
              <div className="absolute top-4 right-4 bg-[var(--cream)] rounded-full px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                {currentProgramIndex + 1} / {sections.length}
              </div>

              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full border-2 border-[var(--brand)] bg-gradient-to-br from-white to-[var(--cream)] flex items-center justify-center mb-4 shadow-lg">
                <span className="text-[var(--brand)] text-3xl font-bold">
                  {sections[currentProgramIndex].number}
                </span>
              </div>

              {/* Step Label */}
              <div className="text-[#8a7a72] text-xs tracking-wider mb-3 font-semibold">
                STEP {sections[currentProgramIndex].number}
              </div>

              {/* Title */}
              <h3 className="text-[#3a3a3a] font-bold text-xl mb-3 leading-tight">
                {sections[currentProgramIndex].heading}
              </h3>

              {/* Description */}
              <p className="text-[#6a6a6a] text-base leading-relaxed flex-grow">
                {sections[currentProgramIndex].description}
              </p>

              {/* Navigation controls at bottom of card */}
              <div className="flex items-center justify-between mt-6 px-2">
                {/* Prev button */}
                <motion.button
                  aria-label="Previous program"
                  onClick={() => setCurrentProgramIndex((i) => Math.max(i - 1, 0))}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--brand)] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={currentProgramIndex === 0}
                  whileTap={{ scale: 0.95 }}
                >
                  ‹
                </motion.button>

                {/* Dot indicators */}
                <div className="flex gap-2 justify-center">
                  {sections.map((_, i) => (
                    <motion.button
                      key={`dot-${i}`}
                      onClick={() => setCurrentProgramIndex(i)}
                      aria-label={`Go to step ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentProgramIndex 
                          ? 'w-8 bg-[var(--brand)]' 
                          : 'w-2 bg-[var(--brand)]/20 hover:bg-[var(--brand)]'
                      }`}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                {/* Next button */}
                <motion.button
                  aria-label="Next program"
                  onClick={() => setCurrentProgramIndex((i) => Math.min(i + 1, sections.length - 1))}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={currentProgramIndex === sections.length - 1}
                  whileTap={{ scale: 0.95 }}
                >
                  ›
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProgramsCarousel;
