import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';
import type { PerformanceMetric } from '../types';

/**
 * Performance monitoring utility using Web Vitals
 * Tracks Core Web Vitals and sends to analytics
 */

// Send metrics to analytics endpoint (or console in development)
function sendToAnalytics(metric: PerformanceMetric): void {
  // In production, you would send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // Example: Send to custom analytics endpoint
    // navigator.sendBeacon('/api/analytics', body);
  } else {
    // Log in development
    console.log('📊 Web Vitals:', metric);
  }
}

/**
 * Initialize performance monitoring
 * Call this once in your app's entry point
 */
export function initPerformanceMonitoring(): void {
  // Cumulative Layout Shift (CLS) - measures visual stability
  // Good: < 0.1, Needs improvement: 0.1-0.25, Poor: > 0.25
  onCLS(sendToAnalytics);
  
  // First Input Delay (FID) - measures interactivity
  // Good: < 100ms, Needs improvement: 100-300ms, Poor: > 300ms
  onFID(sendToAnalytics);
  
  // First Contentful Paint (FCP) - measures perceived load speed
  // Good: < 1.8s, Needs improvement: 1.8-3.0s, Poor: > 3.0s
  onFCP(sendToAnalytics);
  
  // Largest Contentful Paint (LCP) - measures loading performance
  // Good: < 2.5s, Needs improvement: 2.5-4.0s, Poor: > 4.0s
  onLCP(sendToAnalytics);
  
  // Time to First Byte (TTFB) - measures connection speed
  // Good: < 800ms, Needs improvement: 800-1800ms, Poor: > 1800ms
  onTTFB(sendToAnalytics);
}

/**
 * Custom performance marker
 * Use this to track custom performance metrics
 */
export function markPerformance(name: string): void {
  if (performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measure time between two performance markers
 */
export function measurePerformance(name: string, startMark: string, endMark: string): number | undefined {
  if (performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0] as PerformanceMeasure;
      console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  }
}

interface PerformanceMetrics {
  dns?: number;
  tcp?: number;
  ttfb?: number;
  download?: number;
  domInteractive?: number;
  domComplete?: number;
  loadComplete?: number;
  fcp?: number;
}

/**
 * Get current performance metrics summary
 */
export function getPerformanceMetrics(): PerformanceMetrics | null {
  if (!performance || !performance.getEntriesByType) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
    tcp: navigation?.connectEnd - navigation?.connectStart,
    ttfb: navigation?.responseStart - navigation?.requestStart,
    download: navigation?.responseEnd - navigation?.responseStart,
    domInteractive: navigation?.domInteractive,
    domComplete: navigation?.domComplete,
    loadComplete: navigation?.loadEventEnd,
    fcp: paint?.find(entry => entry.name === 'first-contentful-paint')?.startTime,
  };
}

// Extend window.gtag type
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

export default {
  initPerformanceMonitoring,
  markPerformance,
  measurePerformance,
  getPerformanceMetrics,
};
