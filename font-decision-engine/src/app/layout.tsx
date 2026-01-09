import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Sense Typing - 폰트 의사결정 엔진",
  description: "AI 기반 감성 분석으로 브랜드에 최적화된 폰트를 추천합니다.",
  keywords: ["폰트", "타이포그래피", "브랜딩", "디자인", "AI"],
  openGraph: {
    title: "Sense Typing - 폰트 의사결정 엔진",
    description: "AI 기반 감성 분석으로 브랜드에 최적화된 폰트를 추천합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-brand-paper text-brand-black">
        <AuthProvider>
          <Navbar />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}
