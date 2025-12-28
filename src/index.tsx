import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import i18n from './hooks/i18n';
import App from './App';
import { initPerformanceMonitoring } from './utils/performanceMonitoring';

// Initialize performance monitoring
initPerformanceMonitoring();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Wait for i18n to be initialized before rendering to prevent character encoding issues
i18n.on('initialized', () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});

// Fallback: if i18n is already initialized, render immediately
if (i18n.isInitialized) {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
