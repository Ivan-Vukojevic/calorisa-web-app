import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Youtube, Mail, Home, Info, Package, Utensils, LucideIcon } from 'lucide-react';
import imgLogo from '../../assets/images/calorisa-logo.png';
import { buildPathWithLocale, getResolvedLocale } from '../../utils/locale';

interface NavLink {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

// Legal link interface for type safety
interface LegalLink {
  key: string;
  label: string;
  to: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

function Footer(): JSX.Element {
  const { t } = useTranslation(); 
  const currentYear = new Date().getFullYear();
  const [activeLink, setActiveLink] = useState<string>('');

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();
  const navigate = useNavigate();
  const locale = getResolvedLocale(location.pathname);
  const homePath = buildPathWithLocale(locale, '/');
  const faqPath = buildPathWithLocale(locale, '/faq');
  const privacyPath = buildPathWithLocale(locale, '/privacy');
  const termsPath = buildPathWithLocale(locale, '/terms');

  const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink): void => {
    e.preventDefault();
    setActiveLink(link.key);

    const scrollToElement = (): void => {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setTimeout(scrollToElement, 50);
      }
    };

    if (location.pathname !== homePath) {
      navigate(homePath);
      setTimeout(scrollToElement, 200);
    } else {
      scrollToElement();
    }
  };

  const navLinks: NavLink[] = [
    { key: 'home', label: t('footer.home'), href: '#hero', icon: Home },
    { key: 'about', label: t('footer.about'), href: '#about', icon: Info },
    { key: 'products', label: t('footer.products'), href: '#products', icon: Package },
    { key: 'recipes', label: t('footer.recipes'), href: '#recipes', icon: Utensils },
    { key: 'contact', label: t('footer.contact'), href: '#contact', icon: Mail },
  ];

  const socialLinks: SocialLink[] = [
    { icon: Instagram, href: 'https://www.instagram.com/calorisanutrition?igsh=MTczMGJvMXdqbjg5Mg%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@calorisa?si=Cc3on3GyzkW6sJjJ', label: 'YouTube' },
    { icon: Mail, href: 'mailto:calorisanutrition@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[var(--brand)] border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-20 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={imgLogo} 
              alt="Calorisa" 
              width="400"
              height="160"
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-sm text-white/90 text-center md:text-left leading-relaxed max-w-xs">
              {t('footer.brandDescription')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-['Anton',sans-serif] text-lg text-white mb-4 tracking-tight">
              {t('footer.quickLinks')}
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 w-full">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterNavClick(e, link)}
                    className={`block text-sm transition-all duration-300 py-2 px-1 flex items-center justify-center md:justify-start pl-2 ${
                      activeLink === link.key 
                        ? 'text-white font-semibold border-l-2 border-white bg-white/5' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 text-white/90">
                      <link.icon className="text-sm" />
                    </span>
                    <span className="truncate">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-['Anton',sans-serif] text-lg text-white mb-4 tracking-tight">
              {t('footer.getInTouch')}
            </h3>
            <div className="space-y-3 text-sm text-white/80 text-center md:text-left">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="text-white" />
                <a href="mailto:calorisanutrition@gmail.com" className="text-xs hover:text-white transition-colors">
                  calorisanutrition@gmail.com
                </a>
              </p>
              <p className="leading-relaxed text-xs">
                Ul. Franje Kuhača 8<br />
                Osijek, Croatia
              </p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-['Anton',sans-serif] text-lg text-white mb-4 tracking-tight">
              {t('footer.followUs')}
            </h3>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--brand)] hover:bg-[var(--cream)] hover:text-[var(--brand)] transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-white/70 text-center md:text-left">
              {t('footer.stayUpdated')}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-white/70 text-center md:text-left">
            &copy; {currentYear} Calorisa. {t('footer.allRightsReserved')}
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <Link to={faqPath} className="hover:text-white transition-colors">
              {t('footer.faq', 'FAQ')}
            </Link>
            <Link to={privacyPath} className="hover:text-white transition-colors">
              {t('footer.privacyPolicy', 'Privacy Policy')}
            </Link>
            <Link to={termsPath} className="hover:text-white transition-colors">
              {t('footer.termsOfService', 'Terms of Service')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button 
        onClick={scrollToTop}
        className="fixed right-6 bottom-6 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] hover:from-[var(--brand-dark)] hover:to-[var(--brand-darker)] text-white p-4 rounded-full shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="text-xl" />
      </motion.button>
    </footer>
  );
}

export default Footer;
