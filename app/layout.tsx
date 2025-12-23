import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Performance Driven Development",
  description: "Engineered for peak performance across all disciplines. Built with precision, designed for results.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}>
        <LanguageProvider>
          <ThemeProvider>
            <LanguageSwitcher />
            <ThemeSwitcher />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


