import { useTranslation, Trans } from 'react-i18next';
import ProgramsTitle from './ProgramsTitle';
import ProgramsCarousel from './ProgramsCarousel';
import ProgramsTimeline from './ProgramsTimeline';
import ProgramsFaqButton from './ProgramsFaqButton';
import bgImageJpg from '../../assets/images/calorisa-programs-osijek-health-workout-guide.jpg';

interface Section {
  id: string;
  number: number;
  heading: string;
  description: React.ReactNode;
  position: string;
}

function ProgramsSection(): JSX.Element {
  const { t } = useTranslation();

  const sections: Section[] = [
    {
      id: 'program-1',
      number: 1,
      heading: t('main.programs.section1.heading'),
      description: (
        <Trans i18nKey="main.programs.section1.description" components={{ strong: <strong className="font-bold" /> }} />
      ),
      position: 'left'
    },
    {
      id: 'program-2',
      number: 2,
      heading: t('main.programs.section2.heading'),
      description: (
        <Trans i18nKey="main.programs.section2.description" components={{ strong: <strong className="font-bold" /> }} />
      ),
      position: 'right'
    },
    {
      id: 'program-3',
      number: 3,
      heading: t('main.programs.section3.heading'),
      description: (
        <Trans i18nKey="main.programs.section3.description" components={{ strong: <strong className="font-bold" /> }} />
      ),
      position: 'left'
    }
  ];

  return (
    <div className="relative min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image with subtle overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={bgImageJpg}
          alt={t('main.programs.coverImageAlt', 'Programs background')}
          className="w-full h-full object-cover object-center md:object-bottom"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <ProgramsTitle />
        <ProgramsCarousel sections={sections} />
        <ProgramsTimeline sections={sections} />
      </div>

      <ProgramsFaqButton />
    </div>
  );
}

export default ProgramsSection;
