import type { Metadata } from "next";
import {
  Manrope,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import { PageTransition } from "@/components/PageTransition";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const particle = Syne({
  variable: "--font-particle",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Decentrix Africa — Steady buys on-chain",
  description:
    "Decentrix Africa web3 experience for dollar-cost averaging. Connect a wallet and arm a demo schedule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${particle.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <PageTransition />
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
