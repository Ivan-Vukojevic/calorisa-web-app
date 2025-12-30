# Calorisa — Personalized Health & Nutrition Platform

Modern React + Vite web application for personalized nutrition counseling, fitness programs, and Pilates Reformer training in Osijek, Croatia. Built with TypeScript, Tailwind CSS, Framer Motion, and multi-language support (Croatian, English, German, Italian).

🌐 **Live Site:** [calorisa.hr](https://calorisa.hr) | **Deployment:** Vercel

## Features
- 🌍 **Multi-language support** (hr, en, de, it) with i18next
- 🎨 **Custom typography** with self-hosted Anton font (Croatian character support)
- 📱 **Fully responsive** design optimized for mobile, tablet, and desktop
- ⚡ **Optimized images** with AVIF/WebP formats and lazy loading
- 🎭 **Smooth animations** powered by Framer Motion
- ♿ **Accessible** with skip-to-content navigation and ARIA landmarks
- 📊 **Analytics** via Vercel Analytics + Speed Insights

## Tech Stack
- **Framework:** React 18, Vite 5, TypeScript
- **Styling:** Tailwind CSS (utility-first)
- **Typography:** Self-hosted Anton (headings), Google Fonts Anonymous Pro (body)
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **i18n:** i18next + react-i18next
- **UI/Icons:** Radix UI, Lucide React
- **Analytics:** Vercel Analytics + Speed Insights
- **Testing:** Vitest, @testing-library/react, happy-dom

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm 9 or newer

### Install
```bash
npm install
```

### Develop
```bash
npm run dev
```
- Opens the dev server (default port configured in Vite: 5174) and auto-opens the browser.

### Build & Preview
```bash
npm run build
npm run preview
```
- `build` outputs production assets to `dist/`.
- `preview` serves the built app locally for validation.

## Scripts
- **`npm run dev`**: Start Vite dev server.
- **`npm start`**: Alias for Vite dev server.
- **`npm run build`**: Production build.
- **`npm run preview`**: Preview built `dist`.
- **`npm test`**: Run Vitest in watch mode.
- **`npm run test:ui`**: Vitest UI.
- **`npm run test:coverage`**: Coverage report.

## Testing
- Configuration: see [vitest.config.ts](vitest.config.ts).
	- **Environment:** `happy-dom` (avoids jsdom/parse5 ESM issues).
	- **Setup file:** [src/test/setup.js](src/test/setup.js) (jest-dom, cleanup, DOM mocks).

Run tests:
```bash
npm test
```

One-off run:
```bash
npm test -- --run
```

Key suites:
- [src/App.test.tsx](src/App.test.tsx): layout, section IDs, skip link.
- [src/components/SkipToContent.test.tsx](src/components/SkipToContent.test.tsx): accessibility of skip link.
- [src/hooks/useCarousel.test.js](src/hooks/useCarousel.test.js): carousel navigation, looping, autoplay.
- [src/sections/RecipesSection/RecipeCard.test.tsx](src/sections/RecipesSection/RecipeCard.test.tsx): recipe card rendering/accessibility.
- [src/utils/performanceMonitoring.test.js](src/utils/performanceMonitoring.test.js): perf measurement.

## Project Structure
```
src/
	assets/           # Fonts & images
	components/       # Reusable UI & layout components
	hooks/            # Custom hooks (i18n, carousel, gestures)
	pages/            # Static pages (FAQ, Privacy, Terms)
	sections/         # Homepage sections (Hero, Programs, Products, Recipes, etc.)
	test/             # Test setup
	types/            # Shared TypeScript types
	utils/            # Utilities & performance helpers
```

Important files:
- Vite config: [vite.config.js](vite.config.js) (port, code-splitting, aliases)
- Path alias `@` → `./src`: see [vite.config.js](vite.config.js) and [vitest.config.ts](vitest.config.ts)
- Tailwind config: [tailwind.config.js](tailwind.config.js)

## Internationalization (i18n)
- **Supported languages:** Croatian (hr), English (en), German (de), Italian (it)
- Translations via `useTranslation()` and `<Trans />` from react-i18next
- Translation files located in [public/locales](public/locales)
- Initialization lives under [src/hooks/i18n.jsx](src/hooks/i18n.jsx)
- Example usage: [src/sections/ProgramsSection/index.tsx](src/sections/ProgramsSection/index.tsx)

## Typography & Fonts
- **Headings:** Self-hosted Anton font with full Croatian character support (ć, č, đ, š, ž)
  - Font file: [public/fonts/anton-v27-latin_latin-ext-regular.woff2](public/fonts/anton-v27-latin_latin-ext-regular.woff2)
  - @font-face declaration: [src/index.css](src/index.css)
  - Uses `font-display: block` for consistent rendering on first load
- **Body text:** Anonymous Pro from Google Fonts (monospace)
- **Why self-hosted?** Ensures Croatian diacritics render consistently across all browsers and devices, especially on iOS Safari

## Images & Optimization
- Static assets under [src/assets/images](src/assets/images).
- Optimization scripts:
	- [scripts/check-dims.js](scripts/check-dims.js)
	- [scripts/optimize-images.js](scripts/optimize-images.js)
	- [scripts/optimize-hero-images.js](scripts/optimize-hero-images.js)
	- [scripts/optimize-recipe-images.js](scripts/optimize-recipe-images.js)

Run with Node (Sharp is included):
```bash
node scripts/optimize-images.js
```

## Accessibility
- Skip-to-content link: [src/components/SkipToContent.tsx](src/components/SkipToContent.tsx) ensures keyboard users can jump to main content.
- Tests enforce header/main/footer presence and the skip link target.

## Performance
- Lightweight performance helpers: [src/utils/performanceMonitoring.ts](src/utils/performanceMonitoring.ts).
- Example test prints a timing sample.

## Troubleshooting
- Path alias errors (e.g., `@/lib/utils`) in tests: ensure alias exists in both [vite.config.js](vite.config.js) and [vitest.config.ts](vitest.config.ts).
- External scripts/analytics in tests: they’re harmless; environment blocks network script loading (messages may appear but tests pass).
- If you switch test environment to `jsdom`, you may need to align versions to avoid parse5/ESM compatibility issues.

## Deployment
- **Production:** [calorisa.hr](https://calorisa.hr)
- **Platform:** Vercel (automatic deployments from GitHub)
- **Build command:** `npm run build`
- **Output directory:** `dist/`

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to `main` branch

### Custom Domain Setup
- Configure DNS A records to point to Vercel
- Add domain in Vercel project settings
- SSL certificates are auto-provisioned

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Proprietary — © 2025 Calorisa / Sarah Vukojević
