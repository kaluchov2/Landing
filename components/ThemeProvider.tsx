"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "pink-gray" | "red-blue";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    // Check local storage or system preference logic if desired
    // For now default to 'default'
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Remove all previous theme attributes
    root.removeAttribute("data-theme");
    
    // Apply new theme if not default (default uses :root vars directly)
    if (theme !== "default") {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Determine cursor theme based on main theme
  // Default (Black BG) -> Light Cursor
  // Pink-Gray (Light Pink BG) -> Dark Cursor
  // Red-Blue (Light Red BG) -> Dark Cursor
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
