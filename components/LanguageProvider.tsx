"use client";

import { createContext, useContext, useState } from "react";

type Language = "en" | "es" | "alien";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "hero.title": "Thank you for being here...",
    "hero.subtitle": "Feel at home here, feel free to explore and get to know me.",
    "form.button": "I have an idea...",
    "form.modal.title": "Project Proposal",
    "form.modal.desc": "Submit your project concept",
    "form.email": "Email",
    "form.idea": "Your Idea",
    "form.submit": "Submit Idea",
    "form.submitting": "Submitting...",
    "form.success.title": "Thank you!",
    "form.success.desc": "Your idea has been submitted successfully. I'll get back to you soon!",
    "examples.title": "Everything you need.",
    "examples.subtitle": "From personal portfolios to full-scale e-commerce solutions, I build digital experiences that matter.",
    "card.portfolios": "Portfolios",
    "card.portfolios.desc": "Showcase your work with stunning, minimalist designs that put your creativity front and center.",
    "card.websites": "Websites",
    "card.websites.desc": "Custom built websites that tell your story and connect with your audience in meaningful ways.",
    "card.reservations": "Reservations",
    "card.reservations.desc": "Seamless booking systems for restaurants, hotels, and service-based businesses.",
    "card.ecommerce": "E-commerce",
    "card.ecommerce.desc": "Powerful online stores designed to convert visitors into customers with smooth checkout experiences.",
    "card.landing": "Landing Pages",
    "card.landing.desc": "High-conversion landing pages optimized for marketing campaigns and product launches.",
    "card.automation": "Automation",
    "card.automation.desc": "Streamline your workflows with smart automation tools that save time and reduce errors.",
    "card.other": "Any other project",
    "card.other.desc": "Have a unique idea? Let's bring it to life with custom solutions tailored to your specific needs.",
    "countdown.title": "Applications close on",
    "countdown.date": "January 10th",
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.minutes": "Minutes",
    "countdown.seconds": "Seconds",
  },
  es: {
    "hero.title": "Gracias por estar aquí...",
    "hero.subtitle": "Siéntete como en casa, explora libremente y conóceme mejor.",
    "form.button": "Tengo una idea...",
    "form.modal.title": "Propuesta de Proyecto",
    "form.modal.desc": "Envía tu concepto de proyecto",
    "form.email": "Correo electrónico",
    "form.idea": "Tu Idea",
    "form.submit": "Enviar Idea",
    "form.submitting": "Enviando...",
    "form.success.title": "¡Gracias!",
    "form.success.desc": "Tu idea ha sido enviada con éxito. ¡Te contactaré pronto!",
    "examples.title": "Todo lo que necesitas.",
    "examples.subtitle": "Desde portafolios personales hasta soluciones de comercio electrónico a gran escala, construyo experiencias digitales que importan.",
    "card.portfolios": "Portafolios",
    "card.portfolios.desc": "Muestra tu trabajo con diseños minimalistas impresionantes que ponen tu creatividad en el centro.",
    "card.websites": "Sitios Web",
    "card.websites.desc": "Sitios web personalizados que cuentan tu historia y conectan con tu audiencia de manera significativa.",
    "card.reservations": "Reservaciones",
    "card.reservations.desc": "Sistemas de reserva fluidos para restaurantes, hoteles y negocios basados en servicios.",
    "card.ecommerce": "Comercio Electrónico",
    "card.ecommerce.desc": "Tiendas en línea poderosas diseñadas para convertir visitantes en clientes con experiencias de pago fluidas.",
    "card.landing": "Páginas de Aterrizaje",
    "card.landing.desc": "Páginas de alta conversión optimizadas para campañas de marketing y lanzamientos de productos.",
    "card.automation": "Automatización",
    "card.automation.desc": "Optimiza tus flujos de trabajo con herramientas de automatización inteligentes que ahorran tiempo y reducen errores.",
    "card.other": "Cualquier otro proyecto",
    "card.other.desc": "¿Tienes una idea única? Démosle vida con soluciones personalizadas adaptadas a tus necesidades específicas.",
    "countdown.title": "Las solicitudes cierran el",
    "countdown.date": "10 de Enero",
    "countdown.days": "Días",
    "countdown.hours": "Horas",
    "countdown.minutes": "Minutos",
    "countdown.seconds": "Segundos",
  },
  alien: {
    "hero.title": "⍙⟒⌰☊⍜⋔⟒ ⊑⎍⋔⏃⋏...",
    "hero.subtitle": "⟒⌖⌿⌰⍜⍀⟒ ⋔⊬ ⎅⟟☌⟟⏁⏃⌰ ⍀⟒⏃⌰⋔. ⎅⍜ ⋏⍜⏁ ⏚⟒ ⏃⎎⍀⏃⟟⎅.",
    "form.button": "⟟ ⊑⏃⎐⟒ ⏃⋏ ⟟⎅⟒⏃...",
    "form.modal.title": "⌿⍀⍜⟒☊⏁ ⎅⏃⏁⏃",
    "form.modal.desc": "⏁⍀⏃⋏⌇⋔⟟⏁ ⊬⍜⎍⍀ ☊⍜⋏☊⟒⌿⏁",
    "form.email": "☊⍜⋔⋔-⌰⟟⋏☲",
    "form.idea": "⊬⍜⎍⍀ ⏁⊑⍜⎍☌⊑⏁⌇",
    "form.submit": "⏁⍀⏃⋏⌇⋔⟟⏁",
    "form.submitting": "⏁⍀⏃⋏⌇⋔⟟⏁⏁⟟⋏☌...",
    "form.success.title": "⏃☊☗⋏⍜⍙⌰⟒⎅☌⟒⎅!",
    "form.success.desc": "⎅⏃⏁⏃ ⍀⟒☊⟒⟟⎐⟒⎅. ⟟ ⍙⟟⌰⌰ ☊⍜⋏⏁⏃☊⏁ ⊬⍜⎍.",
    "examples.title": "⎍⋏⟟⎐⟒⍀⌇⏃⌰ ⏁⍜⍜⌰⌇.",
    "examples.subtitle": "⎎⍀⍜⋔ ⋔⟟☊⍀⍜-⌇⟟⏁⟒⌇ ⏁⍜ ☌⏃⌰⏃☊⏁⟟☊ ⋔⏃⍀☗⟒⏁⌇, ⟟ ⏚⎍⟟⌰⎅.",
    "card.portfolios": "⎅⏃⏁⏃-⌰⍜☌⌇",
    "card.portfolios.desc": "⎅⟟⌇⌿⌰⏃⊬ ⊬⍜⎍⍀ ⏃☊⊑⟟⟒⎐⟒⋔⟒⋏⏁⌇ ⏁⍜ ⏁⊑⟒ ☊⍜⌇⋔⍜⌇.",
    "card.websites": "⋔⟟⋏⎅-⋔⟒⌇⊑",
    "card.websites.desc": "☊⍜⋏⋏⟒☊⏁ ⋔⟟⋏⎅⌇ ⏃☊⍀⍜⌇⌇ ⏁⊑⟒ ⎐⍜⟟⎅.",
    "card.reservations": "⏁⟟⋔⟒-⌰⍜☊☗⌇",
    "card.reservations.desc": "⌇⟒☊⎍⍀⟒ ⊬⍜⎍⍀ ⋔⍜⋔⟒⋏⏁ ⟟⋏ ⌇⌿⏃☊⟒-⏁⟟⋔⟒.",
    "card.ecommerce": "⏁⍀⏃⎅⟒-⋏⟒⏁",
    "card.ecommerce.desc": "⟒⌖☊⊑⏃⋏☌⟒ ☌⍜⍜⎅⌇ ⏃☊⍀⍜⌇⌇ ⌇⟒☊⏁⍜⍀⌇.",
    "card.landing": "⎅⍀⍜⌿-⋉⍜⋏⟒",
    "card.landing.desc": "⍜⌿⏁⟟⋔⟟⋉⟒⎅ ⟒⋏⏁⍀⊬ ⌿⍜⟟⋏⏁⌇ ⎎⍜⍀ ⋏⟒⍙ ⌇⌿⟒☊⟟⟒⌇.",
    "card.automation": "⏃⎍⏁⍜-⏚⍜⏁",
    "card.automation.desc": "⌰⟒⏁ ⏁⊑⟒ ⋔⏃☊⊑⟟⋏⟒⌇ ⎅⍜ ⏁⊑⟒ ⍙⍜⍀☗.",
    "card.other": "⎍⋏☗⋏⍜⍙⋏",
    "card.other.desc": "⟟⎅⟒⋏⏁⟟⎎⊬ ⋏⟒⍙ ⌿⏃⍀⏃⋔⟒⏁⟒⍀⌇ ⎎⍜⍀ ⟒⌖⟒☊⎍⏁⟟⍜⋏.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
