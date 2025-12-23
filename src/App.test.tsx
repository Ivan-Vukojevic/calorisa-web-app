import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock image imports
vi.mock('./assets/images', () => ({}));

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.returnObjects) {
        // Return empty arrays for returnObjects calls
        return [];
      }
      return key;
    },
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('./hooks/i18n', () => ({}));

describe('App', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  it('should render without crashing', () => {
    const { container } = renderApp();
    expect(container).toBeInTheDocument();
  });

  it('should render Skip to Content link', () => {
    renderApp();
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  it('should have proper document structure', () => {
    const { container } = renderApp();
    
    // Should have Header
    expect(container.querySelector('header')).toBeInTheDocument();
    
    // Should have Main content area
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('role', 'main');
    
    // Should have Footer
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('should render all main sections', () => {
    renderApp();
    
    // Check for section IDs
    expect(document.getElementById('hero')).toBeInTheDocument();
    expect(document.getElementById('approach')).toBeInTheDocument();
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(document.getElementById('programs')).toBeInTheDocument();
    expect(document.getElementById('products')).toBeInTheDocument();
    expect(document.getElementById('reformer')).toBeInTheDocument();
    expect(document.getElementById('recipes')).toBeInTheDocument();
    expect(document.getElementById('feedback')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
    expect(document.getElementById('gallery')).toBeInTheDocument();
  });

  it('should have skip link that points to main content', () => {
    renderApp();
    
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
