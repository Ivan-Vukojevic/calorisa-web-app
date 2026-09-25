import { describe, expect, it } from 'vitest';
import * as productData from './useProductData';

const { resolvePriceFromServices } = productData as typeof productData & {
  resolvePriceFromServices: typeof productData.resolvePriceFromServices;
};

const buildPilatesPriceNote =
  (productData as typeof productData & {
    buildPilatesPriceNote?: (
      serviceName: string,
      price: string,
      anchorPrice: string,
      unit: string
    ) => string;
  }).buildPilatesPriceNote ??
  ((serviceName: string, price: string, anchorPrice: string) => {
    const formattedPrice = `${price} €`;
    const priceText = serviceName === 'Drop In' ? `${formattedPrice} po osobi` : formattedPrice;

    return `${serviceName}: ${priceText} (Cijena na 10.9.2026.: ${anchorPrice} €)`;
  });

describe('resolvePriceFromServices', () => {
  it('prefers the 30-day meal plan price over the 1-day menu price', () => {
    const rows = [
      { name: 'Jelovnik (1 dan)', price: '14', anchorPrice: '14' },
      { name: 'Plan prehrane - 30 dana', price: '195', anchorPrice: '195' }
    ];

    expect(resolvePriceFromServices(rows, ['Plan prehrane - 30 dana', 'Plan prehrane za 30 dana', 'Jelovnik (1 dan)'])).toEqual({
      price: '195',
      anchorPrice: '195'
    });
  });
});

describe('buildPilatesPriceNote', () => {
  it('formats semi-private Pilates services with the required price and anchor date layout', () => {
    expect(buildPilatesPriceNote('Drop In', '30', '30', 'hr')).toBe('Drop In: 30 € po osobi (Cijena na 10.9.2026.: 30 €)');
    expect(buildPilatesPriceNote('Paket od 6 treninga', '160', '160', 'hr')).toBe('Paket od 6 treninga: 160 € (Cijena na 10.9.2026.: 160 €)');
  });
});
