'use client'

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import FontCardSkeleton from '@/components/FontCardSkeleton';
import SmartSearch from '@/components/SmartSearch';
import { createSupabaseBrowser } from '@/lib/supabase/fonts';
import { MOCK_FONTS, shouldUseMockData } from '@/lib/mock-data';
import { ArrowRight, Shield, TrendingUp, Users, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { FontCardProps } from '@/types/font';

export default function Home() {
  const [previewText, setPreviewText] = useState('');
  const [allFreeFonts, setAllFreeFonts] = useState<FontCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockData, setIsMockData] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = ['전체', '산세리프', '세리프', '장식체', '손글씨'];

  useEffect(() => {
    const fetchFonts = async () => {
      setIsLoading(true);

      if (shouldUseMockData()) {
        setAllFreeFonts(MOCK_FONTS);
        setIsMockData(true);
        setIsLoading(false);
        return;
      }

      try {
        const supabase = createSupabaseBrowser();
        const { data, error } = await supabase
          .from('fonts')
          .select('*')
          .order('views', { ascending: false });

        if (!error && data && data.length > 0) {
          setAllFreeFonts(data);
        } else {
          setAllFreeFonts(MOCK_FONTS);
          setIsMockData(true);
        }
      } catch (err) {
        console.error('Failed to fetch fonts:', err);
        setAllFreeFonts(MOCK_FONTS);
        setIsMockData(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFonts();
  }, []);

  const filteredFonts = activeCategory === '전체'
    ? allFreeFonts
    : allFreeFonts.filter(font => font.tags?.some(tag => tag.includes(activeCategory)));

  return (
    <div className="min-h-screen bg-brand-paper">

      {/* Hero Section - Editorial Style */}
      <section className="border-b border-brand-beige">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

            {/* Left: Brand Statement */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-6">
                Font Decision Engine
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-black leading-[0.95] tracking-tight mb-8">
                실패하지 않을<br />
                <span className="italic">결정</span>을 위한<br />
                타이포그래피
              </h1>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-md mb-10">
                AI 기반 감성 분석으로 브랜드에 최적화된 폰트를 추천합니다.
                더 이상 감에 의존하지 마세요. 데이터로 증명된 선택을 하십시오.
              </p>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-medium text-zinc-600">라이선스 검증 완료</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-medium text-zinc-600">전환율 분석 제공</span>
                </div>
              </div>
            </div>

            {/* Right: Smart Search */}
            <div className="space-y-6">
              <div className="bg-white border border-brand-beige p-1 rounded-2xl shadow-sm">
                <SmartSearch onAnalysisComplete={() => {}} />
              </div>

              {/* Live Preview */}
              <div className="bg-brand-black rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase">
                    Live Preview
                  </span>
                  <span className="text-[9px] text-zinc-500">
                    입력하여 실시간 미리보기
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="테스트할 문구 입력..."
                  className="w-full bg-transparent text-white text-xl font-medium focus:outline-none placeholder:text-zinc-700"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-3xl text-brand-black mb-2">
              Curated Collection
            </h2>
            <p className="text-sm text-zinc-400">
              전문가가 검증한 {allFreeFonts.length}개의 폰트 자산
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-brand-black shadow-sm'
                    : 'text-zinc-500 hover:text-brand-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Font Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <FontCardSkeleton key={idx} />
            ))
          ) : filteredFonts.length > 0 ? (
            filteredFonts.map((font) => (
              <FontCardV2 key={font.id} font={font} previewText={previewText} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-zinc-400 text-sm">해당 카테고리에 폰트가 없습니다.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        {!isLoading && filteredFonts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-brand-beige text-center">
            <p className="text-sm text-zinc-500 mb-6">
              원하는 폰트를 찾지 못하셨나요?
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-brand-black text-white rounded-full hover:bg-zinc-800 transition-colors group">
              <span className="text-sm font-medium">맞춤 분석 요청하기</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </main>

      {/* Expert Section */}
      <section className="bg-white border-t border-brand-beige">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-medium mb-4">
                <Users className="w-3.5 h-3.5" />
                Expert Marketplace
              </div>
              <h2 className="font-serif text-3xl text-brand-black mb-2">
                전문가의 도움이 필요하신가요?
              </h2>
              <p className="text-sm text-zinc-500 max-w-lg">
                타이포그래피, 브랜드 아이덴티티, 캐치프레이즈 분야의 검증된 전문가들이
                여러분의 프로젝트를 성공으로 이끌어드립니다.
              </p>
            </div>
            <Link
              href="/experts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors group"
            >
              전문가 둘러보기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Expert Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Typography Consulting */}
            <Link
              href="/experts?specialty=typography-consulting"
              className="group p-6 bg-brand-paper rounded-2xl border border-brand-beige hover:border-brand-gold/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors">
                <span className="text-2xl">Aa</span>
              </div>
              <h3 className="font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                타이포그래피 컨설팅
              </h3>
              <p className="text-sm text-zinc-500 mb-4">
                폰트 선택, 가독성 최적화, 타이포그래피 시스템 설계까지 전문적인 조언을 받아보세요.
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  4.9 평점
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  검증된 전문가
                </span>
              </div>
            </Link>

            {/* Brand Identity */}
            <Link
              href="/experts?specialty=brand-identity"
              className="group p-6 bg-brand-paper rounded-2xl border border-brand-beige hover:border-brand-gold/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">✦</span>
              </div>
              <h3 className="font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                브랜드 아이덴티티
              </h3>
              <p className="text-sm text-zinc-500 mb-4">
                로고, BI/CI 디자인, 브랜드 비주얼 시스템까지 일관된 브랜드 경험을 만들어드립니다.
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  4.8 평점
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  검증된 전문가
                </span>
              </div>
            </Link>

            {/* Catchphrase */}
            <Link
              href="/experts?specialty=catchphrase"
              className="group p-6 bg-brand-paper rounded-2xl border border-brand-beige hover:border-brand-gold/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                캐치프레이즈 & 슬로건
              </h3>
              <p className="text-sm text-zinc-500 mb-4">
                브랜드의 핵심 가치를 담은 강력한 메시지와 카피라이팅을 제작해드립니다.
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  4.9 평점
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  검증된 전문가
                </span>
              </div>
            </Link>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-brand-gold/10 to-brand-beige/50 rounded-2xl text-center">
            <p className="text-zinc-600 mb-4">
              전문가로 활동하고 싶으신가요?
            </p>
            <Link
              href="/experts/apply"
              className="inline-flex items-center gap-2 text-brand-gold font-medium hover:underline"
            >
              전문가 신청하기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Status Footer */}
      <footer className="fixed bottom-0 left-0 w-full px-6 md:px-12 py-4 border-t border-brand-beige bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                System Online
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-[10px] text-zinc-400">
              <span>Engine: <strong className="text-brand-gold">GEMINI-1.5</strong></span>
              <span>Data: <strong className={isMockData ? 'text-amber-500' : 'text-zinc-600'}>
                {isMockData ? 'DEMO' : 'LIVE'}
              </strong></span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-300 tracking-wider">
            © 2026 Sense Typing
          </span>
        </div>
      </footer>
    </div>
  );
}
