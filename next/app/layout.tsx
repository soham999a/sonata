import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sonata — The global music reference system",
  description:
    "Sonata is the global music reference system for curious listeners, educators, and researchers who need culture-aware knowledge, not flattened definitions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <body className="sonata-app">
        <div id="sonata-top" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
