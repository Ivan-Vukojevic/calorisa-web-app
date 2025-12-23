import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCarousel from './useCarousel';

describe('useCarousel', () => {
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should initialize with first item', () => {
    const { result } = renderHook(() => useCarousel(mockItems));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentItem).toEqual(mockItems[0]);
    expect(result.current.totalItems).toBe(3);
  });

  it('should navigate to next item', () => {
    const { result } = renderHook(() => useCarousel(mockItems));
    
    act(() => {
      result.current.goToNext();
    });
    
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentItem).toEqual(mockItems[1]);
  });

  it('should navigate to previous item', () => {
    const { result } = renderHook(() => useCarousel(mockItems));
    
    // Go to second item first
    act(() => {
      result.current.goToNext();
    });
    
    // Then go back
    act(() => {
      result.current.goToPrevious();
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  it('should not go below 0 without loop', () => {
    const { result } = renderHook(() => useCarousel(mockItems, { loop: false }));
    
    act(() => {
      result.current.goToPrevious();
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  it('should not exceed max index without loop', () => {
    const { result } = renderHook(() => useCarousel(mockItems, { loop: false }));
    
    act(() => {
      result.current.goToNext();
      result.current.goToNext();
      result.current.goToNext(); // Should stay at index 2
    });
    
    expect(result.current.currentIndex).toBe(2);
  });

  it('should loop from last to first with loop enabled', () => {
    const { result } = renderHook(() => useCarousel(mockItems, { loop: true }));
    
    act(() => {
      result.current.goToNext();
      result.current.goToNext();
      result.current.goToNext(); // Should wrap to 0
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  it('should loop from first to last when going previous', () => {
    const { result } = renderHook(() => useCarousel(mockItems, { loop: true }));
    
    act(() => {
      result.current.goToPrevious(); // Should wrap to last item
    });
    
    expect(result.current.currentIndex).toBe(2);
  });

  it('should go to specific index', () => {
    const { result } = renderHook(() => useCarousel(mockItems));
    
    act(() => {
      result.current.goToIndex(2);
    });
    
    expect(result.current.currentIndex).toBe(2);
  });

  it('should report correct canGoNext/canGoPrevious', () => {
    const { result } = renderHook(() => useCarousel(mockItems, { loop: false }));
    
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrevious).toBe(false);
    
    act(() => {
      result.current.goToNext();
    });
    
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrevious).toBe(true);
    
    act(() => {
      result.current.goToNext();
    });
    
    expect(result.current.canGoNext).toBe(false);
    expect(result.current.canGoPrevious).toBe(true);
  });

  it('should auto-advance when autoPlay is enabled', () => {
    const { result } = renderHook(() => 
      useCarousel(mockItems, { autoPlay: true, autoPlayDelay: 1000 })
    );
    
    expect(result.current.currentIndex).toBe(0);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(1);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.currentIndex).toBe(2);
  });

  it('should pause and resume auto-play', () => {
    const { result } = renderHook(() => 
      useCarousel(mockItems, { autoPlay: true, autoPlayDelay: 1000 })
    );
    
    act(() => {
      result.current.pause();
    });
    
    expect(result.current.isPaused).toBe(true);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    // Should not advance when paused
    expect(result.current.currentIndex).toBe(0);
    
    act(() => {
      result.current.resume();
    });
    
    expect(result.current.isPaused).toBe(false);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    // Should advance after resume
    expect(result.current.currentIndex).toBe(1);
  });
});
