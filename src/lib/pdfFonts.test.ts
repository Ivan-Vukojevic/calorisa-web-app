import { describe, expect, it, vi } from 'vitest';
import { getEmbeddedPdfFontSources } from './pdfFonts';

describe('getEmbeddedPdfFontSources', () => {
  it('returns embedded font payloads for regular and bold fonts without relying on a network request', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('network should not be accessed'));

    try {
      const fonts = getEmbeddedPdfFontSources();

      expect(fonts.regular).toMatch(/^[A-Za-z0-9+/=]+$/);
      expect(fonts.bold).toMatch(/^[A-Za-z0-9+/=]+$/);
      expect(fonts.regular.length).toBeGreaterThan(1000);
      expect(fonts.bold.length).toBeGreaterThan(1000);
      expect(global.fetch).not.toHaveBeenCalled();
    } finally {
      global.fetch = originalFetch;
    }
  });
});
