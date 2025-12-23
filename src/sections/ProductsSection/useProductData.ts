import { useTranslation } from 'react-i18next';

export interface ProductCard {
  title: string;
  description: string;
  price?: string;
  button: string;
  notes?: string[];
}

interface ProductDataReturn {
  nutritionCards: ProductCard[];
  trainingCards: ProductCard[];
  pilatesCards: ProductCard[];
  getCurrentCards: (activeTab: string) => ProductCard[];
}

export const useProductData = (): ProductDataReturn => {
  const { t } = useTranslation();

  const nutritionCards = Array.isArray(t('main.products.nutrition.cards', { returnObjects: true }))
    ? (t('main.products.nutrition.cards', { returnObjects: true }) as ProductCard[])
    : [];

  const trainingCards = Array.isArray(t('main.products.training.cards', { returnObjects: true }))
    ? (t('main.products.training.cards', { returnObjects: true }) as ProductCard[])
    : [];

  const pilatesCards = Array.isArray(t('main.products.pilates.cards', { returnObjects: true }))
    ? (t('main.products.pilates.cards', { returnObjects: true }) as ProductCard[])
    : [];

  const getCurrentCards = (activeTab: string): ProductCard[] => {
    switch(activeTab) {
      case 'nutrition':
        return nutritionCards;
      case 'training':
        return trainingCards;
      case 'pilates':
        return pilatesCards;
      default:
        return nutritionCards;
    }
  };

  return {
    nutritionCards,
    trainingCards,
    pilatesCards,
    getCurrentCards
  };
};
