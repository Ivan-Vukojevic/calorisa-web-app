import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Drumstick, Flame } from 'lucide-react';
import useSwipeGesture from '../../hooks/useSwipeGesture';

interface Recipe {
  id?: string | number;
  name: string;
  image: string;
  description?: string;
  time?: string;
  protein?: string;
  calories?: string;
}

interface RecipesCarouselProps {
  recipesData: Recipe[];
  getImageUrl: (imageName: string) => string;
}

function RecipesCarousel({ recipesData, getImageUrl }: RecipesCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeHandlers = useSwipeGesture(
    () => setCurrentIndex((i) => Math.min(i + 1, recipesData.length - 1)), // onSwipeLeft
    () => setCurrentIndex((i) => Math.max(i - 1, 0)) // onSwipeRight
  );

  return (
    <div className="w-full md:hidden flex-1 flex items-center justify-center px-4 pb-8">
      <div
        className="relative w-full max-w-[420px]"
        {...swipeHandlers}
      >
        <AnimatePresence mode="wait">
          {recipesData[currentIndex] && (
            <motion.div
              key={`mobile-recipe-${currentIndex}`}
              className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Image with fixed aspect ratio and gradient overlay */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img 
                  src={getImageUrl(recipesData[currentIndex].image)} 
                  alt={recipesData[currentIndex].name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Recipe counter badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                  {currentIndex + 1} / {recipesData.length}
                </div>
              </div>

              {/* Content area with improved spacing */}
              <div className="p-5">
                {/* Title with better sizing */}
                <h3 className="text-xl font-bold text-[var(--brand)] mb-3 leading-tight">
                  {recipesData[currentIndex].name}
                </h3>
                
                {/* Description with improved readability */}
                <p className="text-[0.9rem] text-[#4f4f4f] leading-relaxed mb-5">
                  {recipesData[currentIndex].description}
                </p>
                
                {/* Stats with improved design */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center bg-[var(--cream)] rounded-lg p-3">
                    <Clock className="text-[1.75rem] text-[var(--brand)] mb-1.5" />
                    <span className="text-xs font-medium text-[var(--brand)]">{recipesData[currentIndex].time}</span>
                  </div>
                  <div className="flex flex-col items-center bg-[var(--cream)] rounded-lg p-3">
                    <Drumstick className="text-[1.75rem] text-[var(--brand)] mb-1.5" />
                    <span className="text-xs font-medium text-[var(--brand)]">{recipesData[currentIndex].protein}</span>
                  </div>
                  <div className="flex flex-col items-center bg-[var(--cream)] rounded-lg p-3">
                    <Flame className="text-[1.75rem] text-[var(--brand)] mb-1.5" />
                    <span className="text-xs font-medium text-[var(--brand)]">{recipesData[currentIndex].calories}</span>
                  </div>
                </div>

                {/* Navigation controls at bottom of card */}
                <div className="flex items-center justify-between mt-5 px-2">
                  {/* Prev button */}
                  <motion.button
                    aria-label="Previous recipe"
                    onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                    className="w-10 h-10 rounded-full bg-[var(--cream)] shadow-md flex items-center justify-center text-[var(--brand)] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={currentIndex === 0}
                    whileTap={{ scale: 0.95 }}
                  >
                    ‹
                  </motion.button>

                  {/* Dot indicators */}
                  <div className="flex gap-2 justify-center">
                    {recipesData.map((_, i) => (
                      <motion.button
                        key={`dot-${i}`}
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to recipe ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentIndex 
                            ? 'w-8 bg-[var(--brand)]' 
                            : 'w-2 bg-[var(--brand)]/20 hover:bg-[var(--brand)]'
                        }`}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  {/* Next button */}
                  <motion.button
                    aria-label="Next recipe"
                    onClick={() => setCurrentIndex((i) => Math.min(i + 1, recipesData.length - 1))}
                    className="w-10 h-10 rounded-full bg-[var(--cream)] shadow-md flex items-center justify-center text-[var(--brand)] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={currentIndex === recipesData.length - 1}
                    whileTap={{ scale: 0.95 }}
                  >
                    ›
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RecipesCarousel;
