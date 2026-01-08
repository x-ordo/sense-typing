import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sense Typing - Decide Your Font",
  description: "Beyond listing fonts, we help you decide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}
      >
        {/* Subtle grid pattern background */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #18181b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <Navbar />
        <main className="min-h-screen relative">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
      </body>
    </html>
  );
}