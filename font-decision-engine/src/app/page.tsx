'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FontCardV2 from '@/components/FontCardV2';
import { Search, ShoppingCart, Zap, Flame } from 'lucide-react';
import SmartSearch from '@/components/SmartSearch';
import { AnalysisResult } from '@/types/ai';

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

export default function Home() {
  const [previewText, setPreviewText] = useState('');
  const [allFreeFonts, setAllFreeFonts] = useState<Font[]>([]);
  const [aiResult, setAiResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAiResult(result);
  };

  useEffect(() => {
    const crawledData: Font[] = [
      { id: "694", name: "Pretendard", foundry: "길형진 (orioncactus)", license_type: "OFL", tags: ["고딕", "UI", "본문"], description: "가장 대중적인 본문용 고딕체", views: 3710000, source_url: "#", preview_image: "https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png" },
      { id: "366", name: "Gmarket Sans", foundry: "Gmarket", license_type: "OFL", tags: ["고딕", "제목", "임팩트"], description: "강력한 제목용 산세리프", views: 1200000, source_url: "#", price: 0 },
      { id: "115", name: "Yeogi-Eottae", foundry: "여기어때", license_type: "OFL", tags: ["장식체", "브랜드"], description: "쓰면 쓸수록 매력만점 잘난체", views: 950000, source_url: "#" },
      { id: "37", name: "Nanum Square", foundry: "Naver", license_type: "OFL", tags: ["고딕", "네이버"], description: "너도 떠나보면 나를 알게 될거야", views: 1500000, source_url: "#" },
      { id: "1456", name: "Paperlogy", foundry: "이주임 X 김도균", license_type: "OFL", tags: ["고딕", "협업"], description: "멋진 한글 폰트와 영문 폰트의 COLLABO", views: 150000, source_url: "#" },
      { id: "1663", name: "Mementeo", foundry: "메모먼트", license_type: "OFL", tags: ["손글씨", "귀여운"], description: "길바닥에 찍힌 귀여운 고양이 발바닥", views: 80000, source_url: "#" },
      { id: "33", name: "KoPub Dotum", foundry: "한국출판인회의", license_type: "OFL", tags: ["고딕", "본문"], description: "출판 업계 표준 고딕체", views: 800000, source_url: "#" },
      { id: "34", name: "Noto Sans KR", foundry: "Google", license_type: "OFL", tags: ["고딕", "글로벌"], description: "전 세계적으로 가장 널리 쓰이는 고딕", views: 2500000, source_url: "#" },
      { id: "1541", name: "Ongleip Park", foundry: "온글잎", license_type: "OFL", tags: ["손글씨", "감성"], description: "안녕 나의 작고 소중한 고양이", views: 628000, source_url: "#" },
    ];
    setAllFreeFonts(crawledData);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* 1. Market Header Utility */}
      <section className="bg-zinc-50 border-b border-zinc-100 py-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" /> FONT STORE
            </h1>
            <div className="w-full max-w-2xl">
              <SmartSearch onAnalysisComplete={handleAnalysisComplete} />
            </div>
          </div>

          {/* Global Preview Bar */}
          <div className="bg-white border-2 border-zinc-900 rounded-2xl p-1 flex items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="px-6 border-r border-zinc-100 flex items-center gap-3">
              <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Live Test</span>
            </div>
            <input 
              type="text"
              placeholder="쇼핑 중인 폰트에 입혀볼 문구를 입력하세요"
              className="flex-1 py-4 px-6 focus:outline-none text-lg font-bold placeholder:text-zinc-200"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
        
        {/* AI Result Section */}
        {aiResult && (
          <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">AI Top Picks</div>
              <div className="h-px flex-1 bg-indigo-100"></div>
              <button onClick={() => setAiResult(null)} className="text-zinc-400 text-xs font-bold hover:text-zinc-900">Close Result ×</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {aiResult.recommendations.map((rec, idx) => {
                const matchedFont = allFreeFonts.find(f => f.id === rec.fontId || f.name === rec.fontId);
                return matchedFont ? <FontCardV2 key={idx} font={matchedFont} previewText={previewText} /> : null;
              })}
            </div>
          </section>
        )}

        <div className="grid grid-cols-12 gap-12">
          {/* Sidebar Filters */}
          <aside className="col-span-12 lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> HOT LIST
              </h3>
              <ul className="space-y-5">
                {['All Fonts', 'Best Sellers', 'New Collection', 'Market Premium'].map((cat, i) => (
                  <li key={cat}>
                    <button className={`text-sm font-black uppercase tracking-tighter transition-all hover:translate-x-1 ${i === 0 ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-900'}`}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 bg-zinc-900 rounded-3xl text-white">
               <h4 className="text-lg font-black mb-4 italic leading-tight">Elite<br/>Membership</h4>
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6">Unlimited Access</p>
               <button className="w-full py-3 bg-white text-zinc-900 text-xs font-black rounded-xl hover:bg-indigo-500 hover:text-white transition-all">JOIN CLUB</button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-10">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-4xl font-black tracking-tighter italic">Featured Inventory</h2>
               <div className="flex gap-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <button className="text-zinc-900 underline underline-offset-8">Popularity</button>
                  <button className="hover:text-zinc-900 transition-colors">Alphabetical</button>
                  <button className="hover:text-zinc-900 transition-colors">Recent</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {allFreeFonts.map(font => (
                <FontCardV2 key={font.id} font={font} previewText={previewText} />
              ))}
            </div>

            <div className="mt-24 flex justify-center">
               <Link href="/index" className="px-20 py-6 bg-zinc-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all uppercase text-xs tracking-[0.3em] shadow-2xl">
                  Explore Full Catalog
               </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
