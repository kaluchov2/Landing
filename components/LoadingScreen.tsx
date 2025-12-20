"use client";

import { useEffect, useState } from "react";
import { RunningLoader } from "./RunningLoader";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const duration = 3000; // 3.0 seconds total
    const interval = 100; // Update every 100ms
    const increment = 100 / (duration / interval);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          // Wait a moment at 100% before hiding
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          return 100;
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, []);

  if (!isLoading) return null;

  return <RunningLoader progress={progress} />;
}
