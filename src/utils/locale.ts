export const SUPPORTED_LOCALES = ['hr', 'en', 'de', 'it'];
export const DEFAULT_LOCALE = 'hr';

export const getLocaleFromPathname = (pathname: string): string | null => {
  const segment = (pathname || '').split('/')[1];
  if (!segment) return null;
  const lower = segment.toLowerCase();
  return SUPPORTED_LOCALES.includes(lower) ? lower : null;
};

export const getResolvedLocale = (pathname: string): string => {
  return getLocaleFromPathname(pathname) || DEFAULT_LOCALE;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const safePath = pathname && pathname.startsWith('/') ? pathname : `/${pathname || ''}`;
  const locale = getLocaleFromPathname(safePath);
  if (!locale) {
    return safePath === '' ? '/' : safePath;
  }
  const stripped = safePath.replace(new RegExp(`^/${locale}(?=/|$)`), '');
  return stripped === '' ? '/' : stripped;
};

export const buildPathWithLocale = (locale: string, pathname: string): string => {
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const cleanPath = stripLocaleFromPathname(pathname);
  if (safeLocale === DEFAULT_LOCALE) {
    return cleanPath;
  }
  return `/${safeLocale}${cleanPath === '/' ? '' : cleanPath}`;
};
