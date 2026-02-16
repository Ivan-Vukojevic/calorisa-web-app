import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { DEFAULT_LOCALE, getLocaleFromPathname } from '../utils/locale';

// Get initial language from localStorage or default to Croatian
const getInitialLanguage = () => {
    const pathLocale = typeof window !== 'undefined'
        ? getLocaleFromPathname(window.location.pathname)
        : null;
    if (pathLocale) return pathLocale;
    try {
        const persisted = localStorage.getItem('calorisa_lang');
        if (persisted) return persisted;
    } catch (e) {
        // ignore localStorage errors (SSR)
    }
    // Default to Croatian
    return DEFAULT_LOCALE;
};

// Initialize i18next with HTTP backend to load translations from JSON files
i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: getInitialLanguage(),
        fallbackLng: 'hr',
        debug: false,
        
        // Backend configuration
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
            crossDomain: false,
        },
        
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        
        // Return empty objects/arrays while loading
        returnEmptyString: false,
        returnNull: false,
        returnObjects: true,
        
        // React i18next options
        react: {
            useSuspense: false,
        },
    });

// Helper function to change language
export function changeLanguage(lng) {
    i18n.changeLanguage(lng);
    try { 
        localStorage.setItem('calorisa_lang', lng); 
    } catch (e) {
        // ignore localStorage errors
    }
}

// Export translation function for convenience
export const t = (...args) => i18n.t(...args);

// Re-export hooks from react-i18next
export { useTranslation, Trans } from 'react-i18next';

export default i18n;

