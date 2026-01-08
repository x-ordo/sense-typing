'use client'

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import FontCardSkeleton from '@/components/FontCardSkeleton';
import SmartSearch from '@/components/SmartSearch';
import { createSupabaseBrowser } from '@/lib/supabase/fonts';
import { TrendingUp, Sparkles, SlidersHorizontal } from 'lucide-react';
import type { FontCardProps } from '@/types/font';

export default function Home() {
  const [previewText, setPreviewText] = useState('');
  const [allFreeFonts, setAllFreeFonts] = useState<FontCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({ minimalism: 75, authority: 50, legibility: 90 });

  useEffect(() => {
    const fetchFonts = async () => {
      setIsLoading(true);
      try {
        const supabase = createSupabaseBrowser();
        const { data, error } = await supabase
          .from('fonts')
          .select('*')
          .order('views', { ascending: false });

        if (!error && data) {
          setAllFreeFonts(data);
        }
      } catch (err) {
        console.error('Failed to fetch fonts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFonts();
  }, []);

  const handleAnalysisComplete = () => {
    setMetrics({
      minimalism: Math.floor(Math.random() * 40) + 60,
      authority: Math.floor(Math.random() * 50) + 30,
      legibility: Math.floor(Math.random() * 20) + 80,
    });
  };

  return (
    <div className="min-h-screen bg-brand-paper">
      
      {/* Dynamic Background Text (Artisan Touch) */}
      <div className="fixed top-[20%] left-[-5%] text-[30vw] font-black text-zinc-950/[0.02] select-none pointer-events-none z-0 serif-display italic leading-none">
        COLLECTION
      </div>

      <main className="max-w-[1800px] mx-auto px-8 md:px-16 pt-40 pb-40 relative z-10">
        
        {/* Market Header Utility */}
        <section className="mb-24">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter serif-display italic mb-6">Store.</h1>
                 <p className="text-zinc-400 font-medium max-w-xs leading-relaxed text-sm mb-10">
                    프로젝트의 가치를 결정하는 최상의 타이포그래피 자산을 실시간으로 탐색하십시오.
                 </p>
                 <div className="flex gap-4">
                    <div className="px-4 py-2 border border-zinc-200 rounded-full flex items-center gap-2">
                       <TrendingUp className="w-3 h-3 text-brand-gold" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">인기 급상승</span>
                    </div>
                    <div className="px-4 py-2 border border-zinc-200 rounded-full flex items-center gap-2">
                       <Sparkles className="w-3 h-3 text-indigo-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">신규 도입</span>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-6">
                 {/* Live Search & Test Integration */}
                 <div className="bg-white border border-brand-beige p-3 rounded-[32px] shadow-2xl hover:shadow-indigo-500/5 transition-all duration-700">
                    <SmartSearch onAnalysisComplete={() => handleAnalysisComplete()} />
                 </div>
                 
                 <div className="bg-brand-black rounded-[24px] p-6 text-white flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 w-full">
                       <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-gold mb-3 block">Live Preview Tool</span>
                       <input 
                          type="text"
                          placeholder="테스트할 문구를 입력하세요 (예: Sense Typing)"
                          className="w-full bg-transparent text-2xl md:text-3xl font-bold focus:outline-none placeholder:text-zinc-800"
                          value={previewText}
                          onChange={(e) => setPreviewText(e.target.value)}
                       />
                    </div>
                    <div className="flex gap-8 border-l border-zinc-800 pl-10 h-full py-2">
                       <div className="text-center">
                          <span className="block text-[8px] font-bold text-zinc-500 uppercase mb-1 tracking-tighter">Minimalism</span>
                          <span className="text-lg font-mono text-brand-gold font-black">{metrics.minimalism}%</span>
                       </div>
                       <div className="text-center">
                          <span className="block text-[8px] font-bold text-zinc-500 uppercase mb-1 tracking-tighter">Authority</span>
                          <span className="text-lg font-mono text-white font-black">{metrics.authority}%</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Product Grid: Inventory Exhibition */}
        <section>
           <div className="flex justify-between items-end mb-16 border-b border-zinc-200 pb-10">
              <div className="flex items-center gap-6">
                 <h2 className="text-4xl font-black serif-display italic uppercase">Inventory</h2>
                 <div className="h-8 w-[1px] bg-zinc-200 hidden md:block"></div>
                 <div className="hidden md:flex gap-10">
                    {['전체', '산세리프', '세리프', '장식체'].map(cat => (
                      <button key={cat} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-black transition-colors">{cat}</button>
                    ))}
                 </div>
              </div>
              <button className="flex items-center gap-3 px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-full hover:bg-brand-black hover:text-white transition-all">
                 <SlidersHorizontal className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">상세 필터</span>
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-32">
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className={`${idx % 3 === 1 ? 'lg:translate-y-24' : idx % 3 === 2 ? 'lg:translate-y-12' : ''}`}>
                    <div className="relative">
                      <div className="absolute -left-10 top-0 text-[10px] font-black text-zinc-200">0{idx + 1}</div>
                      <FontCardSkeleton />
                    </div>
                  </div>
                ))
              ) : allFreeFonts.length > 0 ? (
                allFreeFonts.map((font, idx) => (
                  <div key={font.id} className={`${idx % 3 === 1 ? 'lg:translate-y-24' : idx % 3 === 2 ? 'lg:translate-y-12' : ''}`}>
                     <div className="relative group">
                        <div className="absolute -left-10 top-0 text-[10px] font-black text-zinc-200 group-hover:text-brand-gold transition-colors duration-500">0{idx + 1}</div>
                        <FontCardV2 font={font} previewText={previewText} />
                     </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-40 flex flex-col items-center">
                   <p className="text-zinc-400 text-sm">데이터베이스에 연결할 수 없습니다.</p>
                </div>
              )}
           </div>
        </section>

      </main>

      {/* Artisan Status Bar (Localized) */}
      <footer className="fixed bottom-0 left-0 w-full px-10 py-6 border-t border-brand-beige bg-white/80 backdrop-blur-sm z-[100] flex justify-between items-center text-brand-black">
         <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
               <span className="text-[9px] font-black uppercase tracking-widest">시스템 정상 가동 중</span>
            </div>
            <div className="hidden sm:flex gap-10 border-l border-zinc-100 pl-10">
               <div className="flex items-center gap-2"><span className="text-[8px] font-bold text-zinc-300 uppercase">분석엔진</span> <span className="text-[9px] font-black text-brand-gold">GEMINI-1.5-FLASH</span></div>
               <div className="flex items-center gap-2"><span className="text-[8px] font-bold text-zinc-300 uppercase">데이터</span> <span className="text-[9px] font-black">SUPABASE REAL-TIME</span></div>
            </div>
         </div>
         <div className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300">© 2026 SENSE TYPING. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}