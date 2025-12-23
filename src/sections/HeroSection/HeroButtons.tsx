import { Button } from '../../components/ui/button';

interface HeroButtonsProps {
  ctaPrimary: string;
  ctaSecondary: string;
  isMobile?: boolean;
}

function HeroButtons({ ctaPrimary, ctaSecondary, isMobile = false }: HeroButtonsProps): JSX.Element {
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-4 ${isMobile ? 'w-full' : ''}`}>
      <Button 
        size="lg"
        asChild
        className={`bg-[#6b4f4f] hover:bg-[#5a3f3f] text-white px-8 py-6 transition-all duration-300 hover:scale-105 ${isMobile ? 'w-full' : ''}`}
      >
        <a href="#contact-section">{ctaPrimary}</a>
      </Button>
      <Button 
        size="lg"
        variant="outline"
        asChild
        className={`border-2 border-[#6b4f4f] text-[#6b4f4f] hover:bg-[#6b4f4f] hover:text-white px-8 py-6 transition-all duration-300 ${isMobile ? 'w-full' : ''}`}
      >
        <a href="#approach">{ctaSecondary}</a>
      </Button>
    </div>
  );
}

export default HeroButtons;
