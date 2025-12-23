"use client";

import { IdeaSubmissionForm } from "./IdeaSubmissionForm";
import { WaterdropCursor } from "./WaterdropCursor";
import { useState, useEffect, useRef } from "react";

import { useTheme } from "./ThemeProvider";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-bg transition-colors duration-500"
    >
      <WaterdropCursor 
        sectionRef={sectionRef} 
        theme={theme === "default" ? "light" : "dark"} 
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Minimal header */}
        <h1
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-hero-text leading-[0.9] mb-8 tracking-tight ${
            mounted ? "animate-text-fade-in-up-delay-1" : ""
          }`}
          style={{
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: "300",
            letterSpacing: "-0.04em",
          }}
        >
          Thank you for being here...
          <br />
        </h1>

        <p
          className={`text-base sm:text-lg text-gray-400 mb-16 max-w-xl mx-auto leading-relaxed tracking-wide ${
            mounted ? "animate-text-fade-in-up-delay-2" : ""
          }`}
          style={{
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: "300",
            letterSpacing: "0.02em",
          }}
        >
          Feel at home here, feel free to explore and get to know me.
        </p>

        <div className={mounted ? "animate-text-fade-in-up-delay-3" : ""}>
          <IdeaSubmissionForm />
        </div>
      </div>
    </section>
  );
}
