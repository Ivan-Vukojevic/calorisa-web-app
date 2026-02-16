import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation, useParams, Navigate } from 'react-router-dom';
import './App.css';
import useScrollAnimation from './hooks/useScrollAnimation';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import SkipToContent from './components/SkipToContent';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import SeoHead from './components/SeoHead';
import { DEFAULT_LOCALE, getResolvedLocale, SUPPORTED_LOCALES } from './utils/locale';
import { useTranslation } from 'react-i18next';

// Lazy load secondary route components for code-splitting
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const FAQ = lazy(() => import('./pages/FAQ'));

function LocaleGuard(): JSX.Element {
  const params = useParams();
  const lang = params.lang?.toLowerCase();

  if (!lang) {
    return <NotFound />;
  }

  if (lang === DEFAULT_LOCALE) {
    return <Navigate to="/" replace />;
  }

  if (!SUPPORTED_LOCALES.includes(lang)) {
    return <NotFound />;
  }

  return <Outlet />;
}

/**
 * Main application component with routing
 */
function App(): JSX.Element {
  useScrollAnimation();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const nextLocale = getResolvedLocale(location.pathname);
    if (i18n.language !== nextLocale) {
      i18n.changeLanguage(nextLocale);
    }
  }, [i18n, location.pathname]);
  
  return (
    <div className="App">
      <SkipToContent targetId="main-content" />
      <SeoHead />
      <SpeedInsights />
      <Analytics />
      <Header />
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <Suspense fallback={<div className="loading-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/:lang" element={<LocaleGuard />}>
            <Route index element={<Main />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
