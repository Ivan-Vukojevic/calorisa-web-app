import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import MobileCardCarousel from '../../components/MobileCardCarousel';

interface ProgramsCarouselProps {
  programKeys: string[];
}

export function ProgramsCarousel({ programKeys }: ProgramsCarouselProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="lg:hidden w-full px-4 mb-12">
      <h3 className="mb-8 text-center text-white text-xl font-bold">
        {t('main.approach.programs.title')}
      </h3>

      <div className="relative w-full max-w-[420px] mx-auto">
        {/* eslint-disable-next-line react/forbid-dom-props */}
        <MobileCardCarousel
          items={programKeys}
          minHeight="min-h-[280px]"
          renderItem={(key, i) => (
            <>
              <div className="absolute top-4 right-4 bg-[#f7f0ec] rounded-full px-3 py-1 text-xs font-semibold text-[#6b4f4f]">{i + 1} / {programKeys.length}</div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6b4f4f] to-[#5a3f3f] flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>

              <h4 className="text-[#6b4f4f] font-bold text-xl mb-3 leading-tight">{t(`main.approach.programs.${key}.title`)}</h4>

              <p className="text-[#4f4f4f] text-base leading-relaxed flex-grow">{t(`main.approach.programs.${key}.description`)}</p>
            </>
          )}
        />
      </div>
    </div>
  );
}
