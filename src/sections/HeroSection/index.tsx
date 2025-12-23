import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import HeroMobile from './HeroMobile';
import HeroDesktop from './HeroDesktop';

function HeroSection(): JSX.Element {
  const { t } = useTranslation();

  const handleScrollClick = (): void => {
    const target = document.querySelector('#approach') || document.querySelector('#second-section') || document.querySelector('#about');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      <HeroMobile
        nutritionstAlt={t('main.hero.nutritionstAlt')}
        title={t('main.hero.title')}
        description={t('main.hero.description')}
        ctaPrimary={t('main.hero.ctaPrimary')}
        ctaSecondary={t('main.hero.ctaSecondary')}
      />

      <HeroDesktop
        nutritionstAlt={t('main.hero.nutritionstAlt')}
        title={t('main.hero.title')}
        description={t('main.hero.description')}
        ctaPrimary={t('main.hero.ctaPrimary')}
        ctaSecondary={t('main.hero.ctaSecondary')}
      />

      {/* Scroll Indicator (static, no animation) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer"
        role="button"
        aria-label="Scroll to next section"
        onClick={handleScrollClick}
      >
        <span className="text-[var(--brand)] text-sm">Scroll</span>
        <ChevronDown className="text-[var(--brand)] w-5 h-5" />
      </div>
    </section>
  );
}

export default HeroSection;
