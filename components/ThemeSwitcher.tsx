"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Paintbrush, X } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "default", label: "Classic", bg: "bg-black", border: "border-white" },
    { name: "pink-gray", label: "Soft", bg: "bg-pink-100", border: "border-gray-400" },
    { name: "red-blue", label: "Bold", bg: "bg-red-100", border: "border-blue-400" },
  ] as const;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isOpen ? "bg-white text-black rotate-90" : "bg-black/80 text-white backdrop-blur-sm"
          }`}
        >
          {isOpen ? <X size={24} strokeWidth={1} /> : <Paintbrush size={24} strokeWidth={1} />}
        </button>

        {/* Circular Menu */}
        <div
          className={`absolute top-14 right-0 flex flex-col items-end gap-3 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                setTheme(color.name);
                setIsOpen(false);
              }}
              className={`group flex items-center gap-3`}
            >
              <span className="text-sm font-medium bg-black/80 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {color.label}
              </span>
              <div
                className={`w-10 h-10 rounded-full border-2 shadow-md transition-transform hover:scale-110 ${
                  color.bg
                } ${color.border} ${
                  theme === color.name ? "ring-1 ring-offset-2 ring-black" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
