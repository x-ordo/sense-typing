'use client'

export const runtime = 'edge';

import { ShieldCheck, Globe, BarChart3, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-600 selection:text-white pt-32 pb-40">
      
      <main className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Sales Hero */}
        <section className="mb-40">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white rounded-full text-[10px] font-black mb-10 tracking-[0.3em] uppercase">
             For Agencies & Enterprise
           </div>
           <h1 className="text-6xl md:text-[120px] font-black tracking-[-0.06em] leading-[0.85] uppercase italic mb-12">
             Govern Your<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Identity.</span>
           </h1>
           <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl leading-relaxed">
             조직의 모든 타이포그래피 라이선스 리스크를 제거하고, AI를 통해 브랜드 일관성을 완벽하게 통제하십시오.
           </p>
        </section>

        {/* The Pain Point (High Contrast Section) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-60">
           <div className="bg-zinc-50 p-12 md:p-20 rounded-[60px] border border-zinc-100">
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase italic">The License Anarchy</h3>
              <ul className="space-y-8">
                 {[
                   "디자이너마다 다른 폰트 사용으로 인한 브랜드 파편화",
                   "상업적 이용 가능 여부 불확실성에 따른 법적 리스크",
                   "파편화된 구매 영수증과 복잡한 라이선스 갱신 관리"
                 ].map((text, i) => (
                   <li key={i} className="flex gap-4 text-zinc-500 font-bold leading-snug italic">
                      <span className="text-red-500">✕</span> {text}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">Stop the Chaos.<br/> Start Intelligence.</h2>
              <p className="text-zinc-500 mb-12 font-medium">Sense Typing은 기업 전용 폰트 파이프라인을 통해 전사적 디자인 품질을 보장합니다.</p>
              <div className="flex gap-4">
                 <button className="px-10 py-5 bg-zinc-900 text-white font-black rounded-full text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">Book a Demo</button>
                 <button className="px-10 py-5 bg-white border-2 border-zinc-900 text-zinc-900 font-black rounded-full text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all">Get PDF Deck</button>
              </div>
           </div>
        </section>

        {/* Feature Grid: Enterprise Grade */}
        <section className="mb-60">
           <div className="flex items-center gap-4 mb-20">
              <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-100">Core Infrastructure</div>
              <div className="h-px flex-1 bg-zinc-100"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: ShieldCheck, title: "License Guard", desc: "AI가 실시간으로 라이선스 조항을 분석하여 법적 리스크를 사전에 차단합니다." },
                { icon: Lock, title: "Private Registry", desc: "우리 팀원들만 사용할 수 있는 승인된 폰트 라이브러리를 운영하세요." },
                { icon: BarChart3, title: "ROI Dashboard", desc: "폰트 사용량 및 라이선스 비용 절감 수치를 정교한 데이터로 시각화합니다." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white border border-zinc-100 rounded-[40px] hover:shadow-2xl transition-all group">
                   <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                   </div>
                   <h4 className="text-xl font-black mb-4 tracking-tight uppercase italic">{item.title}</h4>
                   <p className="text-zinc-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Final CTA: Global Scale */}
        <section className="bg-zinc-900 rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
           <div className="relative z-10 text-center max-w-4xl mx-auto">
              <Globe className="w-16 h-16 text-indigo-500 mx-auto mb-12 animate-spin-slow" />
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-none uppercase italic">Scale with Confidence.</h2>
              <p className="text-zinc-400 text-lg md:text-xl mb-16 font-medium leading-relaxed italic">
                &quot;Sense Typing은 단순한 폰트 스토어를 넘어, 글로벌 기업의 시각적 언어를 통합하고 보호하는 전략적 파트너입니다.&quot;
              </p>
              <div className="inline-flex items-center gap-10">
                 <Link href="/market" className="text-xs font-black border-b-2 border-white pb-1 tracking-widest uppercase hover:text-indigo-400 hover:border-indigo-400 transition-all text-white">
                    Explore Solutions
                 </Link>
                 <Link href="/pricing" className="group flex items-center gap-3 text-xs font-black tracking-widest uppercase hover:text-indigo-400 transition-all text-white">
                    View Pricing <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}