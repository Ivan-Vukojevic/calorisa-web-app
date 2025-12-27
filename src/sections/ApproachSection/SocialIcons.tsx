import { Mail, Instagram, Youtube } from 'lucide-react';

export function SocialIcons(): JSX.Element {
  return (
    <div className="icons flex justify-center gap-5 mt-8 md:mt-12">
      <a 
        href="mailto:calorisanutrition@gmail.com" 
        title="email" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[2.5rem] text-white no-underline transition-all duration-300 hover:text-[#f7f0ec] hover:scale-110"
      >
        <Mail />
      </a>
      <a 
        href="https://www.instagram.com/calorisanutrition?igsh=MTczMGJvMXdqbjg5Mg%3D%3D&utm_source=qr" 
        title="instagram" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[2.5rem] text-white no-underline transition-all duration-300 hover:text-[#f7f0ec] hover:scale-110"
      >
        <Instagram />
      </a>
      <a 
        href="https://youtube.com/@calorisa?si=Cc3on3GyzkW6sJjJ" 
        title="youtube" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[2.5rem] text-white no-underline transition-all duration-300 hover:text-[#f7f0ec] hover:scale-110"
      >
        <Youtube />
      </a>
    </div>
  );
}
