"use client";

import { RunningSprite } from "./RunningSprite";

interface RunningLoaderProps {
  progress: number;
}

export function RunningLoader({ progress }: RunningLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Canvas Running Animation */}
      <div className="w-full h-2/3 max-w-2xl mb-12 flex items-center justify-center relative">
        <RunningSprite />
      </div>

      {/* Minimal progress bar */}
      <div className="w-full max-w-md px-4 relative">
        <div className="h-px bg-white/10 mb-4">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center">
          <span
            className="text-sm text-white/60 tracking-widest uppercase"
            style={{
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
              fontWeight: "300",
              letterSpacing: "0.2em",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
