'use client'

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import { ShoppingBag, TrendingUp, Sparkles, Store } from 'lucide-react';

interface Font {
  id: string;
  name: string;
  foundry: string;
  license_type: string;
  tags: string[];
  description: string;
  preview_image?: string;
  views?: number;
  source_url: string;
  price?: number;
}

export default function MarketPage() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFonts([
        { id: 'm1', name: 'Velut', foundry: '5am.type', license_type: 'Paid', tags: ['Display', 'Luxury'], description: '세련된 무드의 유료 폰트', views: 5000, source_url: '#', price: 22000 },
        { id: 'm2', name: 'Ok-Sticker', foundry: 'OkFont', license_type: 'Paid', tags: ['Handwriting', 'Cute'], description: '스티커를 붙인 듯한 느낌의 폰트', views: 8000, source_url: '#', price: 15000 },
        { id: 'm3', name: 'HCL-Kitchen', foundry: 'HCL', license_type: 'Paid', tags: ['Display', 'Bold'], description: '주방 도구를 모티브로 한 서체', views: 3000, source_url: '#', price: 20000 },
        { id: 'm4', name: 'GPZ-Video', foundry: 'Studio Gapazi', license_type: 'Paid', tags: ['Retro', 'Stencil'], description: '비디오테이프 노이즈 질감 서체', views: 12000, source_url: '#', price: 25000 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Market Hero */}
        <section className="bg-brand-black text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full text-xs font-medium mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-brand-gold" /> 프리미엄 마켓
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
              디자이너의 감각을<br/> 소유하십시오.
            </h1>
            <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
              무료 폰트로는 표현할 수 없는 독보적인 개성과 퀄리티.<br/>
              엄선한 유료 폰트 컬렉션입니다.
            </p>
            <button className="px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold/90 transition-all flex items-center gap-2">
              <Store className="w-4 h-4" /> 입점 신청하기
            </button>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none"></div>
        </section>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: TrendingUp, value: '150+', label: '독립 폰트', color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
            { icon: ShoppingBag, value: '2,400+', label: '구매자', color: 'text-brand-red', bg: 'bg-brand-red/10' },
            { icon: Sparkles, value: 'Daily', label: '신규 업데이트', color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white border border-brand-beige rounded-2xl flex items-center gap-4">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-brand-black">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-bold text-brand-black flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-gold" /> 프리미엄 컬렉션
          </h2>
          <div className="h-px flex-1 bg-brand-beige"></div>
        </div>

        {/* Font Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-[4/3] bg-white border border-brand-beige animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fonts.map(font => (
              <div key={font.id} className="relative group">
                <FontCardV2 font={font} />
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-brand-black text-white text-[10px] font-bold rounded-full">
                  ₩{font.price?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
