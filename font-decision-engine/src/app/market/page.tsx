'use client'

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import { ShoppingBag, TrendingUp, Sparkles } from 'lucide-react';

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
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
      {/* Market Hero */}
      <section className="bg-zinc-900 text-white rounded-3xl p-12 md:p-20 mb-16 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold mb-6 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-yellow-400" /> NEW MARKET ARRIVALS
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
            디자이너의 감각을<br/> 소유하십시오.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
            무료 폰트로는 표현할 수 없는 독보적인 개성과 퀄리티.<br/>
            눈누마켓에서 엄선한 유료 폰트 컬렉션입니다.
          </p>
          <button className="px-8 py-4 bg-white text-black font-black rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" /> 입점 신청하기
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none"></div>
      </section>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black">150+</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Independent Fonts</div>
          </div>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black">2,400+</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Happy Buyers</div>
          </div>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black">Daily</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">New Updates</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
        <ShoppingBag className="w-6 h-6" /> 모든 마켓 폰트
      </h2>

      {/* Font Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {fonts.map(font => (
            <div key={font.id} className="relative group">
              <FontCardV2 font={font} />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black text-white text-[10px] font-black rounded-full shadow-lg">
                ₩{font.price?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
