import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnimatedBackgroundWrapper from "../components/AnimatedBackgroundWrapper";
import MotionProvider from "../components/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Atlas Synapse | Trust Engine for AI Systems",
  description:
    "Atlas Synapse is the trust layer for agentic AI — governance, verification, and auditability at the boundaries of your AI systems.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans text-slate-100 antialiased`}
      >
        <AnimatedBackgroundWrapper />
        <MotionProvider>
          <main className="relative z-10">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}

