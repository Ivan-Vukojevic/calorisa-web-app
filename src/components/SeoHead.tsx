import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  buildPathWithLocale,
  DEFAULT_LOCALE,
  getResolvedLocale,
  stripLocaleFromPathname,
  SUPPORTED_LOCALES,
} from '../utils/locale';

const BASE_URL = 'https://www.calorisa.hr';

const LANGUAGE_NAMES: Record<string, string> = {
  hr: 'Croatian',
  en: 'English',
  de: 'German',
  it: 'Italian',
};

const OG_LOCALES: Record<string, string> = {
  hr: 'hr_HR',
  en: 'en_US',
  de: 'de_DE',
  it: 'it_IT',
};

const upsertLink = (selector: string, attrs: Record<string, string>): void => {
  let link = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    document.head.appendChild(link);
  }
  Object.entries(attrs).forEach(([key, value]) => link!.setAttribute(key, value));
};

const upsertMeta = (selector: string, attrs: Record<string, string>): void => {
  let meta = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    document.head.appendChild(meta);
  }
  Object.entries(attrs).forEach(([key, value]) => meta!.setAttribute(key, value));
};

export default function SeoHead(): null {
  const location = useLocation();

  useEffect(() => {
    const locale = getResolvedLocale(location.pathname);
    const cleanPath = stripLocaleFromPathname(location.pathname);
    const canonicalPath = buildPathWithLocale(locale, cleanPath);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;

    document.documentElement.lang = locale;

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    SUPPORTED_LOCALES.forEach((lang) => {
      const href = `${BASE_URL}${buildPathWithLocale(lang, cleanPath)}`;
      upsertLink(`link[rel="alternate"][hreflang="${lang}"]`, {
        rel: 'alternate',
        hreflang: lang,
        href,
      });
    });

    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${BASE_URL}${buildPathWithLocale(DEFAULT_LOCALE, cleanPath)}`,
    });

    upsertMeta('meta[name="language"]', {
      name: 'language',
      content: LANGUAGE_NAMES[locale] || LANGUAGE_NAMES[DEFAULT_LOCALE],
    });

    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });

    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: OG_LOCALES[locale] || OG_LOCALES[DEFAULT_LOCALE],
    });

    upsertMeta('meta[property="twitter:url"]', {
      property: 'twitter:url',
      content: canonicalUrl,
    });
  }, [location.pathname]);

  return null;
}
