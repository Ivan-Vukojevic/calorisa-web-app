import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSwipeGesture from '../../hooks/useSwipeGesture';

interface Feedback {
  name: string;
  feedback: string;
}

interface FeedbackCarouselProps {
  feedbackData: Feedback[];
}

function FeedbackCarousel({ feedbackData }: FeedbackCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeHandlers = useSwipeGesture(
    () => setCurrentIndex((i) => Math.min(i + 1, feedbackData.length - 1)), // onSwipeLeft
    () => setCurrentIndex((i) => Math.max(i - 1, 0)) // onSwipeRight
  );

  return (
    <div className="w-full md:hidden mb-6 flex-1 flex items-center justify-center px-4">
      <div
        className="relative w-full max-w-[420px]"
        {...swipeHandlers}
      >
        <AnimatePresence mode="wait">
          {feedbackData[currentIndex] && (
            <motion.div
              key={`mobile-feedback-${currentIndex}`}
              className="mx-auto bg-white rounded-2xl shadow-xl p-6 text-center flex flex-col justify-between relative overflow-hidden"
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Testimonial counter badge */}
              <div className="absolute top-3 right-3 bg-[#f7f0ec] rounded-full px-3 py-1 text-xs font-semibold text-[#6b4f4f]">
                {currentIndex + 1} / {feedbackData.length}
              </div>

              {/* Quote mark - smaller and better positioned */}
              <div className="flex justify-center items-center text-[4rem] font-bold text-[#6b4f4f] leading-none mb-2">
                "
              </div>

              {/* Feedback text with better spacing */}
              <p className="text-[0.95rem] text-[#4f4f4f] leading-relaxed mb-6 italic px-2">
                {feedbackData[currentIndex].feedback}
              </p>

              {/* Name with underline */}
              <div className="relative mt-auto">
                <h3 className="text-[#6b4f4f] text-sm font-bold tracking-wider uppercase">
                  — {feedbackData[currentIndex].name}
                </h3>
                <div className="h-0.5 bg-[#6b4f4f] mx-auto mt-2.5 w-16" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation controls at bottom of card */}
        <div className="flex items-center justify-between mt-6 px-2">
          {/* Prev button */}
          <motion.button
            aria-label="Previous testimonial"
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
            whileTap={{ scale: 0.95 }}
          >
            ‹
          </motion.button>

          {/* Dot indicators */}
          <div className="flex gap-2 justify-center">
            {feedbackData.map((_, i) => (
              <motion.button
                key={`dot-${i}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'w-8 bg-[#6b4f4f]' 
                    : 'w-2 bg-[#6b4f4f]/20 hover:bg-[#6b4f4f]'
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Next button */}
          <motion.button
            aria-label="Next testimonial"
            onClick={() => setCurrentIndex((i) => Math.min(i + 1, feedbackData.length - 1))}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6b4f4f] text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentIndex === feedbackData.length - 1}
            whileTap={{ scale: 0.95 }}
          >
            ›
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCarousel;
