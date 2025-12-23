import { useState } from 'react';

interface SwipeGestureHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

/**
 * Custom hook for handling horizontal swipe gestures
 * @param onSwipeLeft - Callback when user swipes left (next)
 * @param onSwipeRight - Callback when user swipes right (previous)
 * @param threshold - Minimum swipe distance in pixels (default: 50)
 * @returns Touch event handlers
 */
function useSwipeGesture(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold: number = 50
): SwipeGestureHandlers {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (touchStartX === null || touchEndX === null) return;

    const delta = touchStartX - touchEndX;

    // Swipe left (next)
    if (delta > threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    // Swipe right (previous)
    else if (delta < -threshold && onSwipeRight) {
      onSwipeRight();
    }

    // Reset touch positions
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}

export default useSwipeGesture;
