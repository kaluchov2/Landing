"use client";

import { IdeaSubmissionForm } from "./IdeaSubmissionForm";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className={`relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Minimal header */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-8 tracking-tight" style={{
          fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
          fontWeight: "300",
          letterSpacing: "-0.04em",
        }}>
          Performance
          <br />
          Driven
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 mb-16 max-w-xl mx-auto leading-relaxed tracking-wide" style={{
          fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
          fontWeight: "300",
          letterSpacing: "0.02em",
        }}>
          Engineered for peak performance across all disciplines. Built with precision, designed for results.
        </p>

        <IdeaSubmissionForm />
      </div>
    </section>
  );
}

