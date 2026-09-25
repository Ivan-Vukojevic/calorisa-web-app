import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const GAS_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

type ProductTab = 'nutrition' | 'training' | 'pilates';

interface CijenaRow {
  name?: string;
  naziv?: string;
  price: string;
  anchorPrice: string;
}

const FALLBACK_CIJENE = { price: '0.00', anchorPrice: '0.00' };

export const normalizeServiceKey = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bza\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const resolvePriceFromServices = (
  rows: CijenaRow[],
  serviceNames: string[]
): { price: string; anchorPrice: string } => {
  for (const serviceName of serviceNames) {
    const normalizedTarget = normalizeServiceKey(serviceName);
    const match = rows.find((row) => {
      const rowKey = normalizeServiceKey(row.naziv ?? row.name ?? '');
      return rowKey === normalizedTarget || rowKey.includes(normalizedTarget) || normalizedTarget.includes(rowKey);
    });

    if (match) {
      return {
        price: match.price || '0.00',
        anchorPrice: match.anchorPrice || '0.00'
      };
    }
  }

  return { ...FALLBACK_CIJENE };
};

const NUTRITION_CARD_KEYS: Record<string, string[]> = {
  'Izrada jelovnika': [
    'Plan prehrane - 30 dana',
    'Plan prehrane za 30 dana',
    'Jelovnik (1 dan)'
  ],
  'Vaganje i analiza': [
    'Analiza sastava tijela',
    'Weighing & Analysis',
    'Vaganje i analiza'
  ],
  'Nutricionističke konzultacije': [
    'Nutricionističke konzultacije (1 sat)',
    'Nutrition Consultation',
    'Nutricionisticke konzultacije'
  ],
  'Menu Creation': [
    'Plan prehrane - 30 dana',
    'Plan prehrane za 30 dana',
    'Jelovnik (1 dan)'
  ],
  'Weighing & Analysis': [
    'Analiza sastava tijela',
    'Weighing & Analysis',
    'Vaganje i analiza'
  ],
  'Nutrition Consultation': [
    'Nutricionističke konzultacije (1 sat)',
    'Nutrition Consultation',
    'Nutricionisticke konzultacije'
  ]
};

const TRAINING_KEYS = [
  'Individualni trening (1 sat)',
  'Online live trening (mjesečno)'
];

const PILATES_POPULAR_KEY = 'Reformer Pilates - paket od 8 treninga';

const PILATES_PACKAGE_NAMES = [
  'Reformer Pilates - Drop In',
  'Reformer Pilates - paket od 6 treninga',
  'Reformer Pilates - paket od 8 treninga',
  'Reformer Pilates - paket od 12 treninga'
] as const;

type SupportedLanguage = 'hr' | 'en' | 'de' | 'it';

const PILATES_NOTE_PREFIXES: Record<SupportedLanguage, Record<(typeof PILATES_PACKAGE_NAMES)[number], string>> = {
  hr: {
    'Reformer Pilates - Drop In': 'Drop In',
    'Reformer Pilates - paket od 6 treninga': 'Paket od 6 treninga',
    'Reformer Pilates - paket od 8 treninga': 'Paket od 8 treninga',
    'Reformer Pilates - paket od 12 treninga': 'Paket od 12 treninga'
  },
  en: {
    'Reformer Pilates - Drop In': 'Drop-in session',
    'Reformer Pilates - paket od 6 treninga': '6-session package',
    'Reformer Pilates - paket od 8 treninga': '8-session package',
    'Reformer Pilates - paket od 12 treninga': '12-session package'
  },
  de: {
    'Reformer Pilates - Drop In': 'Drop-in Einheit',
    'Reformer Pilates - paket od 6 treninga': '6er-Paket',
    'Reformer Pilates - paket od 8 treninga': '8er-Paket',
    'Reformer Pilates - paket od 12 treninga': '12er-Paket'
  },
  it: {
    'Reformer Pilates - Drop In': 'Ingresso singolo',
    'Reformer Pilates - paket od 6 treninga': 'Pacchetto da 6 sessioni',
    'Reformer Pilates - paket od 8 treninga': 'Pacchetto da 8 sessioni',
    'Reformer Pilates - paket od 12 treninga': 'Pacchetto da 12 sessioni'
  }
};

const PILATES_ANCHOR_LABEL: Record<SupportedLanguage, string> = {
  hr: 'Cijena na 10.9.2026.',
  en: 'Price on 10.9.2026.',
  de: 'Preis am 10.9.2026.',
  it: 'Prezzo al 10.9.2026.'
};

export interface ProductCard {
  title: string;
  description: string;
  price?: string;
  button: string;
  notes?: string[];
  cijene?: { price: string; anchorPrice: string };
  sveCijene?: Array<{ name: string; price: string; anchorPrice: string }>;
}

interface ProductDataReturn {
  nutritionCards: ProductCard[];
  trainingCards: ProductCard[];
  pilatesCards: ProductCard[];
  getCurrentCards: (activeTab: string) => ProductCard[];
}

const parseJsonpPayload = (text: string): unknown => {
  const trimmed = text.trim();
  const openParenIndex = trimmed.indexOf('(');
  const closeParenIndex = trimmed.lastIndexOf(')');

  if (openParenIndex === -1 || closeParenIndex === -1 || closeParenIndex <= openParenIndex) {
    throw new Error('Invalid JSONP format.');
  }

  const jsonPart = trimmed.slice(openParenIndex + 1, closeParenIndex).trim();
  return JSON.parse(jsonPart);
};

export const useProductData = (): ProductDataReturn => {
  const { t, i18n } = useTranslation();
  const [cijeneIzTablice, setCijeneIzTablice] = useState<CijenaRow[]>([]);
  const [isLoadingCijene, setIsLoadingCijene] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCijeneIzTablice = async (): Promise<void> => {
      try {
        if (!GAS_URL) {
          console.error('Missing VITE_GOOGLE_SCRIPT_URL for GAS pricing endpoint.');
          setCijeneIzTablice([]);
          return;
        }

        const response = await fetch(GAS_URL, { signal: controller.signal, method: 'GET', mode: 'cors', redirect: 'follow' });

        if (!response.ok) {
          throw new Error(`Failed to fetch GAS data: ${response.status}`);
        }

        let payload: unknown;
        const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
        const responseText = await response.text();

        try {
          if (contentType.includes('application/json')) {
            payload = JSON.parse(responseText);
          } else if (contentType.includes('javascript') || contentType.includes('text/plain')) {
            payload = parseJsonpPayload(responseText);
            console.warn('GAS endpoint returned JSONP/text response; parsed payload with JSONP fallback.');
          } else {
            throw new Error(`Unsupported content type: ${contentType}`);
          }
        } catch (err) {
          console.error('Failed to parse GAS response payload.', err);
          console.error('GAS Content-Type:', contentType);
          console.error('GAS response preview:', responseText.slice(0, 1000));
          setCijeneIzTablice([]);
          return;
        }

        const rawRows = Array.isArray(payload)
          ? payload
          : Array.isArray((payload as { data?: unknown[] }).data)
            ? (payload as { data: unknown[] }).data
            : Array.isArray((payload as { usluge?: unknown[] }).usluge)
              ? (payload as { usluge: unknown[] }).usluge
              : [];

        const normalizedRows: CijenaRow[] = rawRows
          .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
          .map((row) => ({
            name: typeof row.name === 'string' ? row.name : undefined,
            naziv: typeof row.naziv === 'string' ? row.naziv : undefined,
            price: String(row.price ?? row.trenutnaCijena ?? '0.00'),
            anchorPrice: String(row.anchorPrice ?? row.cijenaNaDatum ?? '0.00')
          }));

        setCijeneIzTablice(normalizedRows);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to load pricing data from GAS endpoint.', error);
          setCijeneIzTablice([]);
        }
      } finally {
        setIsLoadingCijene(false);
      }
    };

    void fetchCijeneIzTablice();

    return () => {
      controller.abort();
    };
  }, []);

  const getCijeneForCard = (keys: string[], index: number): { price: string; anchorPrice: string } => {
    if (isLoadingCijene) {
      return FALLBACK_CIJENE;
    }

    const nazivUsluge = keys[index];
    if (!nazivUsluge) {
      return FALLBACK_CIJENE;
    }

    return resolvePriceFromServices(cijeneIzTablice, [nazivUsluge]);
  };

  const getSupportedLanguage = (): SupportedLanguage => {
    const languageCode = (i18n.language ?? 'hr').toLowerCase().split('-')[0];

    if (languageCode === 'en' || languageCode === 'de' || languageCode === 'it') {
      return languageCode;
    }

    return 'hr';
  };

  const getCijeneByServiceName = (serviceName: string): { price: string; anchorPrice: string } => {
    if (isLoadingCijene) {
      return FALLBACK_CIJENE;
    }

    return resolvePriceFromServices(cijeneIzTablice, [serviceName]);
  };

  const rawNutrition = Array.isArray(t('main.products.nutrition.cards', { returnObjects: true }))
    ? (t('main.products.nutrition.cards', { returnObjects: true }) as ProductCard[])
    : [];

  const rawTraining = Array.isArray(t('main.products.training.cards', { returnObjects: true }))
    ? (t('main.products.training.cards', { returnObjects: true }) as ProductCard[])
    : [];

  const rawPilates = Array.isArray(t('main.products.pilates.cards', { returnObjects: true }))
    ? (t('main.products.pilates.cards', { returnObjects: true }) as ProductCard[])
    : [];

  const nutritionCards = rawNutrition.map((card) => {
    const keys = NUTRITION_CARD_KEYS[card.title] ?? [];
    const resolved = keys.length > 0 ? resolvePriceFromServices(cijeneIzTablice, keys) : FALLBACK_CIJENE;

    return {
      ...card,
      cijene: resolved
    };
  });

  const trainingCards = rawTraining.map((card, index) => ({
    ...card,
    cijene: getCijeneForCard(TRAINING_KEYS, index)
  }));

  const pilatesCards = rawPilates.map((card) => {
    const activeLanguage = getSupportedLanguage();
    const localizedPrefixes = PILATES_NOTE_PREFIXES[activeLanguage];
    const anchorLabel = PILATES_ANCHOR_LABEL[activeLanguage];

    const packageCijene = PILATES_PACKAGE_NAMES.map((serviceName) => ({
      serviceName,
      cijene: getCijeneByServiceName(serviceName)
    }));

    const popularPackage = packageCijene.find(({ serviceName }) => serviceName === PILATES_POPULAR_KEY);

    return {
      ...card,
      notes: packageCijene.map(({ serviceName, cijene }) => {
        const prefix = localizedPrefixes[serviceName];
        return `${prefix}: ${cijene.price} € (${anchorLabel}: ${cijene.anchorPrice} €)`;
      }),
      cijene: popularPackage?.cijene ?? FALLBACK_CIJENE
    };
  });

  const getCurrentCards = (activeTab: string): ProductCard[] => {
    switch (activeTab as ProductTab) {
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
