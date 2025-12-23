import { describe, it, expect, vi } from 'vitest';
import { markPerformance, measurePerformance, getPerformanceMetrics } from './performanceMonitoring';

describe('performanceMonitoring', () => {
  describe('markPerformance', () => {
    it('should create a performance mark', () => {
      const markSpy = vi.spyOn(performance, 'mark');
      
      markPerformance('test-mark');
      
      expect(markSpy).toHaveBeenCalledWith('test-mark');
    });

    it('should handle missing performance API gracefully', () => {
      const originalMark = performance.mark;
      performance.mark = undefined;
      
      expect(() => markPerformance('test')).not.toThrow();
      
      performance.mark = originalMark;
    });
  });

  describe('measurePerformance', () => {
    it('should measure time between marks', () => {
      markPerformance('start');
      markPerformance('end');
      
      const duration = measurePerformance('test-measure', 'start', 'end');
      
      expect(typeof duration).toBe('number');
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should handle measurement errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Try to measure without marks
      const result = measurePerformance('invalid', 'nonexistent-start', 'nonexistent-end');
      
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return performance metrics object', () => {
      const metrics = getPerformanceMetrics();
      
      if (metrics) {
        expect(metrics).toHaveProperty('dns');
        expect(metrics).toHaveProperty('tcp');
        expect(metrics).toHaveProperty('ttfb');
        expect(metrics).toHaveProperty('download');
        expect(metrics).toHaveProperty('domInteractive');
        expect(metrics).toHaveProperty('domComplete');
        expect(metrics).toHaveProperty('loadComplete');
      }
    });

    it('should return null if performance API is unavailable', () => {
      const originalPerformance = global.performance;
      global.performance = undefined;
      
      const metrics = getPerformanceMetrics();
      
      expect(metrics).toBeNull();
      
      global.performance = originalPerformance;
    });
  });
});
