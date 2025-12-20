import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Performance Driven Development",
  description: "Engineered for peak performance across all disciplines. Built with precision, designed for results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}>{children}</body>
    </html>
  );
}


