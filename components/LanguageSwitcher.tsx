"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Globe, Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇲🇽" },
    { code: "alien", label: "Alien", flag: "👽" },
  ] as const;

  return (
    <div className="fixed top-6 right-20 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isOpen ? "bg-white text-black" : "bg-black/80 text-white backdrop-blur-sm"
          }`}
        >
          <Languages size={24} strokeWidth={1.5} />
        </button>

        {/* Menu */}
        <div
          className={`absolute top-14 right-0 flex flex-col items-end gap-2 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm transition-all hover:scale-105 ${
                 language === lang.code 
                   ? "bg-white text-black font-semibold shadow-md" 
                   : "bg-black/60 text-white/90 hover:bg-black/80"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
