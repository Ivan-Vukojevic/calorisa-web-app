/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        'brand-dark': 'var(--brand-dark)',
        'brand-darker': 'var(--brand-darker)',
        'brand-contrast': 'var(--brand-contrast)',
        cream: 'var(--cream)',
        'cream-light': 'var(--cream-light)',
        'gray-light': 'var(--gray-light)',
        'gray-medium': 'var(--gray-medium)',
      },
      fontFamily: {
        'heading': ['Anton', 'sans-serif'],
        'body': ['Anonymous Pro', 'monospace'],
      },
      fontSize: {
        // Display sizes (for hero/large headings)
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '0.02em' }], // 56px
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '0.02em' }],   // 48px
        'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0.02em' }], // 40px
        
        // Heading sizes (h1-h6)
        'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.02em' }], // 36px
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],    // 32px
        'h3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '0.01em' }], // 28px
        'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],  // 24px
        'h5': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.01em' }], // 20px
        'h6': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],     // 18px
        
        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.7' }], // 18px
        'body': ['1rem', { lineHeight: '1.7' }],        // 16px - default
        'body-sm': ['0.875rem', { lineHeight: '1.6' }], // 14px
        
        // Small text
        'caption': ['0.75rem', { lineHeight: '1.5' }],  // 12px
        'overline': ['0.625rem', { lineHeight: '1.5', letterSpacing: '0.1em' }], // 10px
      },
    },
  },
  plugins: [],
}
