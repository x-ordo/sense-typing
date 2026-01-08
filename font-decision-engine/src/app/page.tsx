'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FontCardV2 from '@/components/FontCardV2';
import SmartSearch from '@/components/SmartSearch';
import { AnalysisResult } from '@/types/ai';
import { ChevronRight, Fingerprint, Activity, Layers } from 'lucide-react';

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
  const [metrics, setMetrics] = useState({ minimalism: 70, authority: 50, legibility: 85 });

  const handleAnalysisComplete = (result: AnalysisResult) => {
    console.log("Analysis Result:", result);
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
      { id: "694", name: "Pretendard", foundry: "Kil Hyeong-jin", license_type: "OFL", tags: ["Sans", "UI"], description: "The definitive UI standard.", views: 3710000, source_url: "#", preview_image: "https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png" },
      { id: "1456", name: "Paperlogy", foundry: "Lee Ju-im", license_type: "OFL", tags: ["Modern", "Work"], description: "Architectural precision in type.", views: 150000, source_url: "#" },
      { id: "366", name: "Gmarket Sans", foundry: "Gmarket", license_type: "OFL", tags: ["Bold", "Impact"], description: "Command attention.", views: 1200000, source_url: "#" },
      { id: "115", name: "Yeogi Well-done", foundry: "Yeogi-Eottae", license_type: "OFL", tags: ["Display", "Brand"], description: "Unique brand personality.", views: 950000, source_url: "#" },
      { id: "1663", name: "Mementeo", foundry: "Mementeo", license_type: "OFL", tags: ["Script", "Human"], description: "The warmth of human touch.", views: 80000, source_url: "#" },
      { id: "37", name: "Nanum Square", foundry: "Naver", license_type: "OFL", tags: ["Clean", "Gothic"], description: "Reliable clarity.", views: 1500000, source_url: "#" },
    ];
    setAllFreeFonts(crawledData);
  }, []);

  return (
    <div className="min-h-screen bg-brand-paper text-brand-black pt-48 pb-60 overflow-hidden">
      
      <main className="max-w-[1800px] mx-auto px-8 md:px-16">
        
        {/* Atelier Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-60 items-end">
           <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-12">
                 <Fingerprint className="w-6 h-6 text-brand-gold animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Intelligence Report / Vol. 26</span>
              </div>
              <h1 className="text-7xl md:text-[11vw] serif-title font-black tracking-[-0.04em] leading-[0.85] uppercase italic text-brand-black">
                 Deciding<br/>
                 <span className="text-brand-gold">Authority.</span>
              </h1>
           </div>
           <div className="lg:col-span-4 border-l border-brand-black pt-12 pl-12">
              <p className="text-lg font-medium text-brand-black/60 leading-relaxed mb-12">
                 우리는 단순한 폰트 저장소를 거부합니다. 디자인 의도와 기술적 정밀함을 합성하여 브랜드의 영속적인 가치를 결정하는 디지털 아틀리에입니다.
              </p>
              <Link href="/enterprise" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-brand-black group border-b border-brand-black pb-2">
                 GOVERNANCE SOLUTIONS <ChevronRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
        </section>

        {/* Intelligence Layer */}
        <section className="mb-60">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white border-thin p-12 rounded-[40px] shadow-2xl relative group">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold">Vibe Consultant</h3>
                    <Activity className="w-5 h-5 text-brand-black/20" />
                 </div>
                 <SmartSearch onAnalysisComplete={handleAnalysisComplete} />
              </div>
              
              <div className="bg-brand-black p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                 <div className="flex justify-between items-center mb-10 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold">Type Specimen</h3>
                    <div className="flex gap-6">
                       <div className="text-center">
                          <span className="block text-[8px] font-bold opacity-40 uppercase mb-1 tracking-tighter">Min</span>
                          <span className="text-sm font-mono text-brand-gold">{metrics.minimalism}%</span>
                       </div>
                       <div className="text-center">
                          <span className="block text-[8px] font-bold opacity-40 uppercase mb-1 tracking-tighter">Aut</span>
                          <span className="text-sm font-mono text-brand-gold">{metrics.authority}%</span>
                       </div>
                    </div>
                 </div>
                 <input 
                    type="text"
                    placeholder="Visualize your intent..."
                    className="w-full bg-transparent text-4xl md:text-6xl serif-title font-black focus:outline-none placeholder:text-white/10 italic relative z-10 tracking-tight"
                    value={previewText}
                    onChange={handlePreviewChange}
                 />
              </div>
           </div>
        </section>

        {/* The Exhibition (Product Grid) */}
        <section className="mb-60">
           <div className="flex justify-between items-end mb-24 border-b border-brand-black pb-12">
              <h2 className="text-5xl serif-title font-black tracking-tighter uppercase italic flex items-center gap-6">
                 Exhibition <Layers className="w-8 h-8 text-brand-gold" />
              </h2>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-brand-black/40">
                 <button className="text-brand-black border-b-2 border-brand-black pb-2">All Assets</button>
                 <button className="hover:text-brand-black transition-colors pb-2">Premium Only</button>
                 <button className="hover:text-brand-black transition-colors pb-2">Latest Arrivals</button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-40">
              {allFreeFonts.map((font, idx) => (
                <div key={font.id} className={`${idx % 3 === 1 ? 'lg:translate-y-32' : idx % 3 === 2 ? 'lg:translate-y-16' : ''}`}>
                   <FontCardV2 font={font} previewText={previewText} />
                </div>
              ))}
           </div>
        </section>

        {/* Premium Banner: The Masterpiece */}
        <section className="mt-80">
           <div className="relative h-[90vh] w-full border-thin overflow-hidden group bg-white">
              <Image 
                src="https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png" 
                alt="Banner" 
                fill 
                className="object-contain p-20 transition-transform duration-[3000ms] group-hover:scale-110 opacity-80"
                unoptimized
              />
              <div className="absolute inset-0 bg-brand-black/5 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                 <span className="text-xs font-black uppercase tracking-[0.6em] mb-12 text-brand-gold">The Modern Masterpiece</span>
                 <h2 className="text-8xl md:text-[14vw] serif-title font-black tracking-[-0.06em] uppercase italic leading-none text-brand-black mb-16">Pretendard</h2>
                 <div className="flex flex-col md:flex-row gap-10">
                    <Link href="/fonts/694" className="px-16 py-6 bg-brand-black text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-2xl">
                       Inquire Asset
                    </Link>
                    <Link href="/market" className="px-16 py-6 border-thin bg-white text-brand-black font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-black hover:text-white transition-all">
                       View Inventory
                    </Link>
                 </div>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}
