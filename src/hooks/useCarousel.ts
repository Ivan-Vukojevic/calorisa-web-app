import { useState, useCallback, useEffect } from 'react';
import useSwipeGesture from './useSwipeGesture';
import type { CarouselOptions, CarouselState } from '../types';

/**
 * Shared carousel logic with navigation, swipe gestures, and keyboard support
 * @param items - Array of items to display
 * @param options - Configuration options
 * @returns Carousel state and handlers
 */
function useCarousel<T = any>(items: T[] = [], options: CarouselOptions = {}): CarouselState<T> {
  const {
    autoPlay = false,
    autoPlayDelay = 5000,
    loop = false,
    keyboard = true,
  } = options;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const itemsLength = items.length;

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (loop) {
        return (prev + 1) % itemsLength;
      }
      return Math.min(prev + 1, itemsLength - 1);
    });
  }, [itemsLength, loop]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (loop) {
        return prev === 0 ? itemsLength - 1 : prev - 1;
      }
      return Math.max(prev - 1, 0);
    });
  }, [itemsLength, loop]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < itemsLength) {
      setCurrentIndex(index);
    }
  }, [itemsLength]);

  // Swipe gesture handlers
  const swipeHandlers = useSwipeGesture(goToNext, goToPrevious);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboard, goToNext, goToPrevious]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || itemsLength === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, isPaused, itemsLength, goToNext]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return {
    currentIndex,
    currentItem: items[currentIndex],
    goToNext,
    goToPrevious,
    goToIndex,
    canGoNext: loop || currentIndex < itemsLength - 1,
    canGoPrevious: loop || currentIndex > 0,
    swipeHandlers: swipeHandlers as {
      onTouchStart: (e: React.TouchEvent) => void;
      onTouchMove: (e: React.TouchEvent) => void;
      onTouchEnd: () => void;
    },
    pause,
    resume,
    isPaused,
    totalItems: itemsLength,
  };
}

export default useCarousel;
