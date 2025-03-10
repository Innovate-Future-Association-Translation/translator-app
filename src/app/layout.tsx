/**
 * src/app/layout.tsx
 * Root Layout Component
 * Defines the global layout structure and metadata for the application
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Define Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Define Geist Mono font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Application metadata
export const metadata: Metadata = {
  title: "IFA Translator",
  description: "IFA Multilingual Translation Application",
};

/**
 * Root Layout Component
 * Contains global styles, fonts and providers
 * 
 * @param children - Child components
 * @returns Root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
