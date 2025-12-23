"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTimeLeft = () => {
    // Set target date to next Jan 10th
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(`${currentYear}-01-10T00:00:00`);

    // If Jan 10th has passed this year, set to next year
    if (now > targetDate) {
      targetDate = new Date(`${currentYear + 1}-01-10T00:00:00`);
    }

    const difference = +targetDate - +now;
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Time units mapped for display
  const units = [
    { label: t("countdown.days"), value: timeLeft.days },
    { label: t("countdown.hours"), value: timeLeft.hours },
    { label: t("countdown.minutes"), value: timeLeft.minutes },
    { label: t("countdown.seconds"), value: timeLeft.seconds },
  ];

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-12 animate-text-fade-in-up-delay-3">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
        
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

        <div className="text-center mb-4">
          <p className="text-hero-text/80 text-sm tracking-widest uppercase mb-1" style={{ fontWeight: 300 }}>{t("countdown.title")}</p>
          <p className="text-hero-text text-xl font-light">{t("countdown.date")}</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {units.map((unit, index) => (
            <div key={index} className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
              <div 
                className="text-2xl sm:text-4xl font-light text-hero-text tabular-nums"
                style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}
              >
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs text-hero-text/50 uppercase tracking-widest">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
