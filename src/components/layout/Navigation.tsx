import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import LanguageSwitcher from "../LanguageSwitcher";
import logo115 from "../../assets/images/calorisa-brown-logo-w115.png";
import logo230 from "../../assets/images/calorisa-brown-logo-w230.png";
import { useTranslation } from "react-i18next";

interface NavLink {
  key: string;
  label: string;
  href: string;
  additionalSections?: string[];
}

interface SectionData {
  key: string;
  top: number;
  bottom: number;
  height: number;
}

interface NavigationProps {
  isScrolled?: boolean;
  isPassedApproach?: boolean;
}

export function Navigation({ isScrolled = false, isPassedApproach = false }: NavigationProps): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("home");
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    { key: "home", label: t("header.home"), href: "#hero" },
    { key: "about", label: t("header.about"), href: "#about" },
    { key: "products", label: t("header.products"), href: "#products", additionalSections: ["reformer"] },
    { key: "recipes", label: t("header.recipes"), href: "#recipes" },
    { key: "contact", label: t("header.contact"), href: "#contact" },
  ];

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = (): void => {
      const sections = navLinks.map(link => {
        const id = link.href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const data: SectionData = {
            key: link.key,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          };
          
          // If this nav link has additional sections, include them
          if (link.additionalSections) {
            const additionalElements = link.additionalSections.map(secId => {
              const el = document.getElementById(secId);
              return el ? el.getBoundingClientRect() : null;
            }).filter((rect): rect is DOMRect => rect !== null);
            
            if (additionalElements.length > 0) {
              // Extend the bottom to include all additional sections
              const maxBottom = Math.max(data.bottom, ...additionalElements.map(r => r.bottom));
              data.bottom = maxBottom;
            }
          }
          
          return data;
        }
        return null;
      }).filter((section): section is SectionData => section !== null);

      // Find the section that is most visible in the viewport
      const middle = window.innerHeight / 2;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.top <= middle && section.bottom > middle) {
          setActiveLink(section.key);
          return;
        }
      }

      // Fallback: if no section is in the middle, find the closest one
      if (sections.length > 0) {
        const closestSection = sections.reduce((closest, section) => {
          const distance = Math.abs(section.top - middle);
          const closestDistance = Math.abs(closest.top - middle);
          return distance < closestDistance ? section : closest;
        });

        setActiveLink(closestSection.key);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navLinks]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink): void => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        setActiveLink(link.key);
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setActiveLink(link.key);
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isPassedApproach 
          ? 'bg-transparent lg:bg-white' 
          : isScrolled 
            ? 'bg-white' 
            : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className={`cursor-pointer group ${isPassedApproach ? 'lg:block hidden' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={logo115}
                srcSet={`${logo115} 115w, ${logo230} 230w`}
                sizes="(min-width: 640px) 115px, 96px"
                alt="CALORISA" 
                width="115"
                height="46"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li
                  key={link.key}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`font-['Anton',sans-serif] antialiased tracking-tight transition-all duration-300 relative group text-[var(--brand)] ${
                        activeLink === link.key ? "opacity-100" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--brand)] transition-all duration-300 ${
                          activeLink === link.key ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <LanguageSwitcher />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-1 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className={`text-[var(--brand)] transition-all duration-300 ${
                isPassedApproach 
                  ? 'bg-white rounded-full shadow-lg hover:shadow-xl' 
                  : ''
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-neutral-200 bg-white/95 backdrop-blur-sm">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`font-['Anton',sans-serif] antialiased tracking-tight text-[var(--brand)] text-lg block w-full text-left px-4 py-2 transition-all duration-300 ${
                      activeLink === link.key 
                        ? "opacity-100 bg-neutral-100 rounded-md" 
                        : "opacity-70 hover:opacity-100 hover:bg-neutral-50 rounded-md"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 px-4">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
