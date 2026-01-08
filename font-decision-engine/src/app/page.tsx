'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FontCardV2 from '@/components/FontCardV2';
import { Search, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
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
  const [metrics, setMetrics] = useState({ minimalism: 70, authority: 50, legibility: 85 });

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAiResult(result);
    setMetrics({
      minimalism: Math.floor(Math.random() * 40) + 60,
      authority: Math.floor(Math.random() * 50) + 30,
      legibility: Math.floor(Math.random() * 20) + 80,
    });
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPreviewText(val);
    if (val.length > 0) {
      setMetrics({
        minimalism: Math.min(100, 60 + (val.length % 40)),
        authority: Math.min(100, 40 + (val.length % 60)),
        legibility: Math.min(100, 80 + (val.length % 20)),
      });
    }
  };

  useEffect(() => {
    const crawledData: Font[] = [
      { id: "694", name: "프리텐다드", foundry: "길형진 (orioncactus)", license_type: "OFL", tags: ["고딕", "UI", "본문"], description: "가장 대중적인 본문용 고딕체", views: 3710000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnud7ce0214808229b775cb05b9413bc40a1641514357" },
      { id: "1456", name: "페이퍼로지", foundry: "이주임 X 김도균", license_type: "OFL", tags: ["고딕", "협업", "디자인"], description: "멋진 한글 폰트와 영문 폰트의 COLLABO", views: 150000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202409/1726797211298465.png" },
      { id: "1663", name: "메모먼트 꾹꾹체", foundry: "메모먼트", license_type: "OFL", tags: ["손글씨", "귀여운"], description: "길바닥에 찍힌 귀여운 고양이 발바닥", views: 80000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202508/1756394784242439.png" },
      { id: "366", name: "G마켓 산스", foundry: "Gmarket", license_type: "OFL", tags: ["고딕", "제목", "임팩트"], description: "강력한 제목용 산세리프", views: 1200000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202408/1724813532340675.png" },
      { id: "115", name: "여기어때 잘난체", foundry: "여기어때컴퍼니", license_type: "OFL", tags: ["장식체", "브랜드"], description: "쓰면 쓸수록 매력만점 잘난체", views: 950000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu4dc2ea8ab1e84e1a38c5448a60857d151641513876" },
      { id: "33", name: "KoPub돋움", foundry: "한국출판인회의", license_type: "OFL", tags: ["고딕", "본문", "출판"], description: "출판 업계 표준 고딕체", views: 800000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu78c7cef2ca8093441d37d4e489bed9411641513809" },
      { id: "34", name: "본고딕 (Noto Sans)", foundry: "GoogleXAdobe", license_type: "OFL", tags: ["고딕", "글로벌", "표준"], description: "전 세계적으로 가장 널리 쓰이는 고딕", views: 2500000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnucc60cd339247a403022f6ca27cf526761659853435" },
      { id: "1541", name: "온글잎 박다현체", foundry: "온글잎", license_type: "OFL", tags: ["손글씨", "감성"], description: "안녕 나의 작고 소중한 고양이", views: 628000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202411/1732697382387472.png" },
      { id: "223", name: "에스코어드림", foundry: "S-Core", license_type: "OFL", tags: ["고딕", "현대적"], description: "샐러드를 먹으면 빨리 배고파져", views: 900000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnub26855466578e1e37bec0b9db03f32411659239805" },
      { id: "738", name: "어그로체", foundry: "(주)샌드박스네트워크", license_type: "OFL", tags: ["장식체", "유튜브"], description: "어그로가 필요한 순간엔 어그로체를", views: 450000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnu0e896377a72660d651c1a599397801321659231666" },
      { id: "37", name: "나눔스퀘어", foundry: "네이버", license_type: "OFL", tags: ["고딕", "네이버", "깔끔"], description: "너도 떠나보면 나를 알게 될거야", views: 1500000, source_url: "#", preview_image: "https://cdn.noonnu.cc/noonnubabac5e28bb4d2d64d075e76cd7528ac1641513813" },
      { id: "1084", name: "부크크 명조", foundry: "(주)부크크", license_type: "OFL", tags: ["명조", "책", "출판"], description: "책을 사랑하는 사람들을 위한 폰트", views: 120000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202302/1676810260012817.png" },
      { id: "1710", name: "학교안심 포스터", foundry: "Keris", license_type: "OFL", tags: ["장식체", "교육"], description: "포스터 제목으로 딱 쓰기 좋은 폰트", views: 50000, source_url: "#", preview_image: "https://cdn.noonnu.cc/fonts/thumbnails/1763369380638651.png" },
      { id: "1369", name: "프리젠테이션", foundry: "이주임", license_type: "OFL", tags: ["고딕", "PPT", "업무"], description: "PPT 작업에 든든한 폰트", views: 200000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202409/1726796789739563.png" },
      { id: "845", name: "수트", foundry: "SUNN YOUN", license_type: "OFL", tags: ["고딕", "다양한굵기"], description: "폰트 굵기가 진짜 다양하다", views: 300000, source_url: "#", preview_image: "https://cdn.noonnu.cc/202304/1681653284608985.png" }
    ];
    setAllFreeFonts(crawledData);
  }, []);

  return (
    <div className="min-h-screen text-zinc-900 font-sans selection:bg-indigo-500 selection:text-white pb-20 bg-[#F8F8F8]">
      <main className="px-6 md:px-12 max-w-[1600px] mx-auto pt-10">
        
        {/* Mall Header - Compact & Direct */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
           <div className="flex flex-col gap-1 items-center lg:items-start">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">Type Intelligence Store</h1>
              <p className="text-xs text-zinc-400 font-bold tracking-[0.2em]">CURATED BY SENSE TYPING</p>
           </div>
           
           <div className="flex-1 w-full max-w-2xl relative">
              <SmartSearch onAnalysisComplete={handleAnalysisComplete} />
           </div>
        </div>

        {/* Global Live Preview Bar - Mall Utility */}
        <div className="bg-zinc-900 rounded-2xl p-4 mb-16 flex flex-col md:flex-row items-center gap-6 shadow-xl">
           <div className="flex items-center gap-3 px-4 border-r border-zinc-800">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Test</span>
           </div>
           <input 
              type="text"
              placeholder="쇼핑 중인 폰트에 입혀볼 문구를 입력하세요"
              className="flex-1 bg-transparent text-white focus:outline-none text-sm font-medium placeholder:text-zinc-600"
              value={previewText}
              onChange={handlePreviewChange}
           />
           <div className="hidden lg:flex gap-4">
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-zinc-500 uppercase">Minimalism</span>
                 <div className="w-20 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${metrics.minimalism}%` }}></div>
                 </div>
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-zinc-500 uppercase">Authority</span>
                 <div className="w-20 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${metrics.authority}%` }}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* AI Result */}
        {aiResult && (
          <section className="mb-16 max-w-5xl mx-auto p-10 bg-white border border-indigo-100 rounded-3xl shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-indigo-600">Recommended for your project</h2>
              <button onClick={() => setAiResult(null)} className="text-zinc-300 hover:text-zinc-900 transition-colors">
                <Search className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiResult.recommendations.map((rec, idx) => {
                const matchedFont = allFreeFonts.find(f => f.id === rec.fontId || f.name === rec.fontId);
                return matchedFont ? <FontCardV2 key={idx} font={matchedFont} previewText={previewText} /> : null;
              })}
            </div>
          </section>
        )}

        {/* Mall Main Grid */}
        <div className="grid grid-cols-12 gap-10">
          
          {/* Category Sidebar */}
          <aside className="col-span-12 lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">Collections</h3>
              <ul className="flex flex-col gap-4">
                {['All Items', 'Best Sellers', 'New Arrivals', 'Free Trial', 'Premium'].map((cat, i) => (
                  <li key={cat}>
                    <button className={`text-xs font-black uppercase tracking-tighter hover:text-indigo-600 transition-colors ${i === 0 ? 'text-indigo-600' : 'text-zinc-500'}`}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
               <h4 className="text-sm font-black mb-3 italic">Sense.<br/>Membership</h4>
               <p className="text-[10px] opacity-80 leading-relaxed mb-4">구독 한 번으로 모든 유료 폰트를 무제한 라이선스로 사용하세요.</p>
               <button className="w-full py-2 bg-white text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-zinc-100">Join Now</button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="col-span-12 lg:col-span-10">
            
            {/* 1. Editor's Pick Banner (Mall style hero) */}
            <div className="w-full bg-zinc-200 rounded-3xl h-[300px] mb-12 overflow-hidden relative group cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
               <Image 
                 src="https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png" 
                 alt="Main Banner" 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-1000"
                 unoptimized
               />
               <div className="absolute inset-0 z-20 p-12 flex flex-col justify-center text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-indigo-400">Monthly Best Pick</span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Pretendard<br/>V1.3.9</h2>
                  <Link href="/fonts/694" className="text-xs font-black border-b-2 border-white pb-1 w-fit hover:text-indigo-400 hover:border-indigo-400 transition-all text-white">
                    SHOP THE COLLECTION →
                  </Link>
               </div>
            </div>

            <div className="flex justify-between items-end mb-8">
               <h2 className="text-xl font-black uppercase tracking-tighter italic">Recommended Inventory</h2>
               <div className="flex gap-4 text-[10px] font-black text-zinc-400 uppercase">
                  <button className="text-zinc-900 underline underline-offset-4">Popular</button>
                  <button className="hover:text-zinc-900">Recent</button>
                  <button className="hover:text-zinc-900">Price: Low to High</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {allFreeFonts.map(font => (
                <FontCardV2 key={font.id} font={font} previewText={previewText} />
              ))}
            </div>

            <div className="mt-20 flex justify-center">
               <Link href="/index" className="px-16 py-5 bg-white border border-zinc-200 text-zinc-900 font-black rounded-2xl hover:bg-zinc-900 hover:text-white transition-all uppercase text-xs tracking-widest shadow-sm">
                  Load More Products
               </Link>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}