import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './hooks/i18n';
import App from './App';
import { initPerformanceMonitoring } from './utils/performanceMonitoring';

// Initialize performance monitoring
initPerformanceMonitoring();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
