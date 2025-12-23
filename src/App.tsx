import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import useScrollAnimation from './hooks/useScrollAnimation';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import SkipToContent from './components/SkipToContent';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Lazy load secondary route components for code-splitting
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const FAQ = lazy(() => import('./pages/FAQ'));

/**
 * Main application component with routing
 */
function App(): JSX.Element {
  useScrollAnimation();
  
  return (
    <div className="App">
      <SkipToContent targetId="main-content" />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
