import type { Metadata } from "next";
import {
  Manrope,
  Cormorant_Garamond,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Foodio",
  description: "Find the best food around you with Foodio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased font-sans",
          manrope.variable,
          cormorantGaramond.variable,
          playfairDisplay.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
