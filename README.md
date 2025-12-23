# Calorisa — Fitness & Nutrition Web App

Modern React + Vite application featuring programs, products, recipes, reformer info, and more. It uses TypeScript, Tailwind CSS, Framer Motion, and i18next for translations.

**Live development** runs on Vite, and **tests** are powered by Vitest + Testing Library.

## Tech Stack
- **Framework:** React 18, Vite 5, TypeScript
- **Styling:** Tailwind CSS (utility-first)
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
- Translations via `useTranslation()` and `<Trans />`.
- Initialization lives under [src/hooks/i18n.jsx](src/hooks/i18n.jsx).
- Example usage: [src/sections/ProgramsSection/index.tsx](src/sections/ProgramsSection/index.tsx) (headings/descriptions via i18n).

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
- Build with `npm run build` and deploy the `dist/` folder to your hosting platform.
- For Vercel/Netlify/Static hosting, set the project to use Vite’s build output.

---
Want a contributing section or environment variable docs added? Share details and I’ll extend this README.
