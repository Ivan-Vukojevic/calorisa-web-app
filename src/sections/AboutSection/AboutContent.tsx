import { useState, RefObject } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

interface AboutContentProps {
  container: Variants;
  itemUp: Variants;
  sectionRef: RefObject<HTMLElement | null>;
}

/**
 * About section content with text and show more/less button
 */
function AboutContent({ container, itemUp, sectionRef }: AboutContentProps): JSX.Element {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = (): void => {
    setShowMore(prev => {
      const next = !prev;
      if (prev) {
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      return next;
    });
  };

  return (
    <>
      {/* Mobile Title */}
      <motion.div
        variants={container}
        className="lg:hidden text-center space-y-2 mb-8"
      >
        <motion.h3 variants={itemUp} className="text-display-responsive px-0 md:px-3">
          {t('main.about.intro.greeting')}
        </motion.h3>
        <motion.h2 variants={itemUp} className="text-h4 md:text-h1 whitespace-normal">
          {t('main.about.intro.name')}
        </motion.h2>
      </motion.div>

      {/* Content Text */}
      <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
        {/* Desktop Title */}
        <div className="hidden lg:block space-y-2">
          <motion.h3 variants={itemUp} className="text-display-responsive px-0 md:px-3">
            {t('main.about.intro.greeting')}
          </motion.h3>
          <motion.h2 variants={itemUp} className="text-h4 md:text-h1 whitespace-normal md:whitespace-nowrap">
            {t('main.about.intro.name')}
          </motion.h2>
        </div>

        {/* Description */}
        <div className="text-body md:text-body-lg leading-relaxed text-justify space-y-4">
          <motion.p variants={itemUp} className={`${!showMore ? 'line-clamp-4 md:line-clamp-none' : ''}`}>
            <Trans i18nKey="main.about.intro.descriptionPart1" components={{ strong: <strong className="font-bold" /> }} />
          </motion.p>
          <motion.p variants={itemUp} className={`${!showMore ? 'hidden md:block' : ''}`}>
            <Trans i18nKey="main.about.intro.descriptionPart2" components={{ strong: <strong className="font-bold" /> }} />
          </motion.p>
          <motion.p variants={itemUp} className={`${!showMore ? 'hidden md:block' : ''}`}>
            <Trans i18nKey="main.about.intro.descriptionPart3" components={{ strong: <strong className="font-bold" /> }} />
          </motion.p>
          <motion.button
            variants={itemUp}
            onClick={handleToggleShowMore}
            className="md:hidden mt-4 mx-auto inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#6b4f4f] bg-white text-[#6b4f4f] text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[#6b4f4f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6b4f4f]/40 active:scale-95"
          >
            {showMore ? t('main.about.intro.showLess', 'Show less') : t('main.about.intro.readMore', 'Read more')}
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default AboutContent;
