export const runtime = 'edge';

import { Check, AlertTriangle, ExternalLink, ArrowLeft, Shield, BarChart3, Eye, FileText } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getFontBySlug } from '@/lib/supabase/server-fonts';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const font = await getFontBySlug(slug);

  if (!font) return { title: 'Font Not Found - Sense Typing' };

  return {
    title: `${font.name} - 폰트 분석 리포트 | Sense Typing`,
    description: font.description || `${font.name} 폰트의 상세 분석 및 도입 가이드`,
    openGraph: {
      title: font.name,
      description: font.description,
      type: 'article',
    }
  };
}

export default async function FontDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let font = null;

  try {
    font = await getFontBySlug(slug);
  } catch (err) {
    console.error("Failed to fetch font data:", err);
  }

  if (!font) {
    return (
      <div className="min-h-screen bg-brand-paper flex flex-col items-center justify-center p-10 text-center">
        <p className="text-[11px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-4">Error 404</p>
        <h1 className="font-serif text-4xl text-brand-black mb-4 italic">자산을 찾을 수 없습니다</h1>
        <p className="text-zinc-400 mb-10 text-sm">데이터베이스 연결을 확인하거나 유효한 자산 ID인지 확인하세요.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white text-xs font-medium rounded-full hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          컬렉션으로 돌아가기
        </Link>
      </div>
    );
  }

  const displayFont = {
    ...font,
    pros: font.pros || ['높은 가독성과 전문성', '다양한 굵기 지원', '한글 완성형 11,172자'],
    cons: font.cons || ['라이선스 범위 확인 필요'],
    usage: font.usage || ['브랜드 아이덴티티', '웹/앱 UI', '인쇄물'],
    preview_text: font.preview_text || '좋은 타이포그래피는 읽히지 않는다.'
  };

  // Mock analysis scores (in production, these would come from AI analysis)
  const analysisScores = {
    legibility: 92,
    authority: 78,
    modernity: 85,
    versatility: 88,
  };

  return (
    <div className="min-h-screen bg-brand-paper">

      {/* Header */}
      <header className="border-b border-brand-beige bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>컬렉션</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-zinc-600">라이선스 검증됨</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-3">
                {displayFont.foundry}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-black leading-tight">
                {displayFont.name}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${
                !displayFont.price || displayFont.price === 0
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
              }`}>
                {!displayFont.price || displayFont.price === 0 ? 'Free License' : `₩${displayFont.price.toLocaleString()}`}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {displayFont.views?.toLocaleString() || 0} views
              </span>
            </div>
          </div>

          <p className="text-zinc-500 leading-relaxed max-w-2xl">
            {displayFont.description}
          </p>
        </section>

        {/* Specimen Preview */}
        <section className="mb-16">
          <div className="bg-white border border-brand-beige rounded-xl p-12 md:p-16">
            <p className="font-serif text-3xl md:text-5xl text-brand-black leading-relaxed text-center italic">
              {displayFont.preview_text}
            </p>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: Analysis */}
          <div className="lg:col-span-2 space-y-12">

            {/* AI Analysis Scores */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-4 h-4 text-brand-gold" />
                <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
                  AI 감성 분석
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analysisScores).map(([key, value]) => (
                  <div key={key} className="bg-white border border-brand-beige rounded-lg p-4">
                    <div className="text-2xl font-bold text-brand-black mb-1">{value}%</div>
                    <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                      {key === 'legibility' && '가독성'}
                      {key === 'authority' && '권위감'}
                      {key === 'modernity' && '현대성'}
                      {key === 'versatility' && '범용성'}
                    </div>
                    <div className="mt-2 h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Strengths & Considerations */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  도입 시 강점
                </h3>
                <ul className="space-y-3">
                  {displayFont.pros.map((pro: string) => (
                    <li key={pro} className="flex items-start gap-3 text-sm text-zinc-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  검토 사항
                </h3>
                <ul className="space-y-3">
                  {displayFont.cons.map((con: string) => (
                    <li key={con} className="flex items-start gap-3 text-sm text-zinc-600">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Recommended Use Cases */}
            <section>
              <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4">
                추천 활용 분야
              </h3>
              <div className="flex flex-wrap gap-2">
                {displayFont.usage.map((use: string) => (
                  <span
                    key={use}
                    className="px-4 py-2 bg-zinc-100 text-sm text-zinc-600 rounded-full"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Technical Info & CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Technical Specs */}
              <div className="bg-white border border-brand-beige rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-4 h-4 text-brand-gold" />
                  <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider">
                    기술 사양
                  </h3>
                </div>
                <dl className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <dt className="text-zinc-400">포맷</dt>
                    <dd className="font-medium text-brand-black">OTF / TTF / WOFF2</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-zinc-400">글리프</dt>
                    <dd className="font-medium text-brand-black">11,172+</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-zinc-400">라이선스</dt>
                    <dd className="font-medium text-brand-gold uppercase">{displayFont.license_type}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-zinc-400">제작사</dt>
                    <dd className="font-medium text-brand-black">{displayFont.foundry}</dd>
                  </div>
                </dl>
              </div>

              {/* Tags */}
              {displayFont.tags && displayFont.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {displayFont.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-zinc-500 bg-zinc-100 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <a
                href={displayFont.source_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-brand-black text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
              >
                폰트 도입하기
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-zinc-400 text-center">
                외부 사이트로 이동합니다. 라이선스 조건을 반드시 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-beige mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-400">
          <span>© 2026 Sense Typing</span>
          <Link href="/" className="hover:text-brand-black transition-colors">
            컬렉션으로 돌아가기
          </Link>
        </div>
      </footer>
    </div>
  );
}
