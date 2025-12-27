import MobileCardCarousel from '../../components/MobileCardCarousel';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  number: number;
  heading: string;
  description: React.ReactNode;
  position: string;
}

interface ProgramsCarouselProps {
  sections: Section[];
}

function ProgramsCarousel({ sections }: ProgramsCarouselProps): JSX.Element {
  return (
    <MobileCardCarousel
      items={sections}
      renderItem={(item, i) => (
        <>
          <div className="absolute top-4 right-4 bg-[var(--cream)] rounded-full px-3 py-1 text-xs font-semibold text-[var(--brand)]">
            {i + 1} / {sections.length}
          </div>

          <div className="w-16 h-16 rounded-full border-2 border-[var(--brand)] bg-gradient-to-br from-white to-[var(--cream)] flex items-center justify-center mb-4 shadow-lg">
            <span className="text-[var(--brand)] text-3xl font-bold">{item.number}</span>
          </div>

          <div className="text-[#8a7a72] text-xs tracking-wider mb-3 font-semibold">STEP {item.number}</div>

          <h3 className="text-[#3a3a3a] font-bold text-xl mb-3 leading-tight">{item.heading}</h3>

          <p className="text-[#6a6a6a] text-base leading-relaxed flex-grow">{item.description}</p>
        </>
      )}
    />
  );
}

export default ProgramsCarousel;
