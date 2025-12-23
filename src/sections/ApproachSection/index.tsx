import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import { ProgramsList } from './ProgramsList';
import { ProgramsCarousel } from './ProgramsCarousel';
import { SocialIcons } from './SocialIcons';
import { ApproachImage } from './ApproachImage';

function ApproachSection(): JSX.Element {
  const { t } = useTranslation();

  const programKeys = ['healthImprovement','weightLoss','sportsNutrition','nutritionEducation'];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const fadeSlideVariants = {
    title: {
      hidden: { opacity: 0, y: -30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] as const }
      }
    },
    description: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.6, delay: 0.3 }
      }
    },
    image: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, delay: 0.4, ease: [0.04, 0.62, 0.23, 0.98] as const }
      }
    },
    programsTitle: {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: 0.5 }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#6b4f4f] w-full text-white">
      <motion.section
        id="second-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="w-full flex flex-col items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlideVariants.title}
            className="text-display-responsive text-white whitespace-normal text-center mb-12 sm:mb-16 lg:mb-20"
          >
            {t('main.approach.details.heading')}
          </motion.h2>

          {/* Main paragraph */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlideVariants.description}
            className="text-white/90 text-body md:text-body-lg leading-relaxed text-center max-w-3xl mx-auto mb-12"
          >
            {t('main.approach.details.paragraph')}
          </motion.p>

          {/* Mobile Image - Shows only on mobile */}
          <div className="lg:hidden mb-12">
            <ApproachImage fadeSlideVariants={fadeSlideVariants} />
          </div>

          {/* Main Content Grid - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-12">
            <ApproachImage fadeSlideVariants={fadeSlideVariants} />
            <ProgramsList programKeys={programKeys} fadeSlideVariants={fadeSlideVariants} />
          </div>

          {/* Mobile Carousel */}
          <ProgramsCarousel programKeys={programKeys} />

          {/* Social Icons */}
          <SocialIcons />
        </div>
      </motion.section>
    </div>
  );
}

export default ApproachSection;
