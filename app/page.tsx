"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HeroSection } from "@/components/HeroSection";
import { ExamplesSection } from "@/components/ExamplesSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen on first render
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setIsLoading(false);
    } else {
      // Show loading for at least 2.5 seconds (handled in LoadingScreen)
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasSeenLoader", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <>
          <HeroSection />
          <ExamplesSection />
        </>
      )}
    </main>
  );
}

