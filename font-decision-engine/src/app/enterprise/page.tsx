'use client'

export const runtime = 'edge';

import { ShieldCheck, BarChart3, ChevronRight, Lock, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">

      <main className="max-w-6xl mx-auto px-6">

        {/* Sales Hero */}
        <section className="mb-24">
          <span className="mono-label text-brand-gold mb-4 block">For Agencies & Enterprise</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-black mb-6 leading-tight">
            브랜드 아이덴티티를<br/>
            <span className="text-brand-gold">완벽하게 통제</span>하세요.
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed">
            조직의 모든 타이포그래피 라이선스 리스크를 제거하고,
            AI를 통해 브랜드 일관성을 완벽하게 통제하십시오.
          </p>
        </section>

        {/* The Pain Point */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white border border-brand-beige p-8 md:p-12 rounded-3xl">
            <h3 className="text-xl font-bold mb-8 text-brand-black">현재 상황</h3>
            <ul className="space-y-6">
              {[
                "디자이너마다 다른 폰트 사용으로 인한 브랜드 파편화",
                "상업적 이용 가능 여부 불확실성에 따른 법적 리스크",
                "파편화된 구매 영수증과 복잡한 라이선스 갱신 관리"
              ].map((text, i) => (
                <li key={i} className="flex gap-4 text-zinc-600 leading-snug">
                  <span className="text-brand-red font-bold">✕</span> {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-brand-black leading-tight">
              혼란을 멈추고<br/>인텔리전스를 시작하세요.
            </h2>
            <p className="text-zinc-500 mb-8">
              Sense Typing은 기업 전용 폰트 파이프라인을 통해
              전사적 디자인 품질을 보장합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all">
                데모 예약하기
              </button>
              <button className="px-6 py-3 bg-white border border-brand-beige text-brand-black font-bold rounded-xl hover:bg-brand-beige/50 transition-all">
                PDF 자료 받기
              </button>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="mono-label text-brand-gold">Core Infrastructure</span>
            <div className="h-px flex-1 bg-brand-beige"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "License Guard", desc: "AI가 실시간으로 라이선스 조항을 분석하여 법적 리스크를 사전에 차단합니다." },
              { icon: Lock, title: "Private Registry", desc: "우리 팀원들만 사용할 수 있는 승인된 폰트 라이브러리를 운영하세요." },
              { icon: BarChart3, title: "ROI Dashboard", desc: "폰트 사용량 및 라이선스 비용 절감 수치를 정교한 데이터로 시각화합니다." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-brand-beige p-8 rounded-2xl hover:shadow-card transition-all group">
                <div className="w-12 h-12 bg-brand-beige/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-brand-black">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-black rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Building2 className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              자신감 있게 확장하세요.
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Sense Typing은 단순한 폰트 스토어를 넘어,
              글로벌 기업의 시각적 언어를 통합하고 보호하는 전략적 파트너입니다.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/market" className="flex items-center gap-2 text-sm font-bold text-white border-b-2 border-white pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
                솔루션 둘러보기
              </Link>
              <Link href="/pricing" className="group flex items-center gap-2 text-sm font-bold text-white hover:text-brand-gold transition-all">
                가격 보기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
