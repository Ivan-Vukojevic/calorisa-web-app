import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "HR", name: "Croatian" },
  { code: "EN", name: "English" },
  { code: "DE", name: "German" },
  { code: "IT", name: "Italian" },
];

/**
 * Language switcher component with dropdown menu
 * Supports Croatian, English, German, and Italian
 */
export default function LanguageSwitcher(): JSX.Element {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language?.toUpperCase() || 'EN'
  );

  const handleLanguageChange = (language: string): void => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.toLowerCase());
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language?.toUpperCase() || 'EN');
  }, [i18n.language]);

  // Cast to a generic React component type so children prop is accepted until the original typing is fixed
  const DropdownMenuContentAny = DropdownMenuContent as unknown as React.ComponentType<any>;
  const DropdownMenuItemAny = DropdownMenuItem as unknown as React.ComponentType<any>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md text-[var(--brand)] hover:bg-neutral-100 transition-colors duration-200 font-['Anonymous_Pro:Regular',sans-serif]">
        <Globe className="w-4 h-4" />
        <span>{selectedLanguage}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContentAny align="end" className="w-40 bg-white text-[var(--brand)] shadow-md border">
        {languages.map((lang) => (
          <DropdownMenuItemAny
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`font-['Anonymous_Pro:Regular',sans-serif] cursor-pointer ${
              selectedLanguage === lang.code
                ? "bg-[var(--brand)] text-white"
                : "text-[var(--brand)]"
            }`}
          >
            <span className="mr-3">{lang.code}</span>
            <span className="text-sm opacity-70">{lang.name}</span>
          </DropdownMenuItemAny>
        ))}
      </DropdownMenuContentAny>
    </DropdownMenu>
  );
}
