// Type definitions for the application

export interface Recipe {
  id: string | number;
  name: string;
  image: string;
  description: string;
  time: string;
  protein: string;
  calories: string;
}

export interface ProductCard {
  title: string;
  description: string;
  price?: string;
  button: string;
  notes?: string[];
}

export interface GalleryImage {
  avif: string;
  webp: string;
  jpg: string;
  caption: string;
}

export interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface CarouselOptions {
  autoPlay?: boolean;
  autoPlayDelay?: number;
  loop?: boolean;
  keyboard?: boolean;
}

export interface CarouselState<T = any> {
  currentIndex: number;
  currentItem: T | undefined;
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  swipeHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  pause: () => void;
  resume: () => void;
  isPaused: boolean;
  totalItems: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  id: string;
  delta?: number;
  entries?: PerformanceEntry[];
}

export interface AnimationVariants {
  hidden?: any;
  show?: any;
  visible?: any;
  exit?: any;
  [key: string]: any;
}
