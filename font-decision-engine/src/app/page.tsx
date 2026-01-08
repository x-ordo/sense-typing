'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FontCardV2 from '@/components/FontCardV2';
import SmartSearch from '@/components/SmartSearch';
import { AnalysisResult } from '@/types/ai';
import { ChevronRight, Activity } from 'lucide-react';

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
    // Optionally use result.tone or other data to update UI
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
      { id: "694", name: "Pretendard", foundry: "Kil Hyeong-jin", license_type: "OFL", tags: ["Sans", "UI"], description: "Standard for modern interfaces", views: 3710000, source_url: "#", preview_image: "https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png" },
      { id: "366", name: "Gmarket Sans", foundry: "Gmarket", license_type: "OFL", tags: ["Bold", "Display"], description: "Impactful headlines", views: 1200000, source_url: "#", price: 0 },
      { id: "115", name: "Yeogi-Eottae", foundry: "Yeogi-Eottae", license_type: "OFL", tags: ["Display", "Brand"], description: "Unique and characteristic", views: 950000, source_url: "#" },
      { id: "37", name: "Nanum Square", foundry: "Naver", license_type: "OFL", tags: ["Sans", "Clean"], description: "Timeless classic", views: 1500000, source_url: "#" },
      { id: "1456", name: "Paperlogy", foundry: "Lee Ju-im", license_type: "OFL", tags: ["Modern", "Work"], description: "Collaboration focus", views: 150000, source_url: "#" },
      { id: "1663", name: "Mementeo", foundry: "Mementeo", license_type: "OFL", tags: ["Script", "Soft"], description: "Emotional handwriting", views: 80000, source_url: "#" },
    ];
    setAllFreeFonts(crawledData);
  }, []);

  return (
    <div className="min-h-screen text-zinc-950 font-sans selection:bg-indigo-600 selection:text-white pt-32 pb-40 overflow-hidden">
      
      {/* Dynamic Background Element */}
      <div className="fixed top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-50 rounded-full blur-[120px] opacity-40 pointer-events-none -z-10 animate-pulse"></div>

      <main className="max-w-[1800px] mx-auto px-6 md:px-12">
        
        {/* Editorial Section Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-end">
           <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-8 block">Issue No. 01 / Type & Sense</span>
              <h1 className="text-7xl md:text-[160px] font-black tracking-[-0.06em] leading-[0.8] uppercase italic break-tighter">
                 Typographic<br/>Intelligence.
              </h1>
           </div>
           <div className="lg:col-span-5 max-w-sm ml-auto">
              <p className="text-sm font-medium text-zinc-500 leading-relaxed border-l-2 border-zinc-900 pl-8">
                 We transcend the traditional font repository. By synthesizing design intent with algorithmic precision, we define the future of visual identity.
              </p>
           </div>
        </section>

        {/* Intelligence Interaction Layer */}
        <section className="mb-48 relative">
           <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="w-full lg:w-1/2 group">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Search Intent</div>
                 <div className="glass rounded-[40px] p-2 hover:shadow-[0_20px_80px_-20px_rgba(79,70,229,0.15)] transition-all duration-700 border border-zinc-100/50">
                    <SmartSearch onAnalysisComplete={handleAnalysisComplete} />
                 </div>
              </div>
              <div className="w-full lg:w-1/2">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Interactive Canvas</div>
                 <div className="bg-zinc-950 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <input 
                       type="text"
                       placeholder="Type to visualize..."
                       className="w-full bg-transparent text-4xl md:text-6xl font-black focus:outline-none placeholder:text-zinc-800 relative z-10 italic"
                       value={previewText}
                       onChange={handlePreviewChange}
                    />
                    <div className="mt-12 flex justify-between items-end relative z-10">
                       <div className="flex gap-8">
                          <div className="flex flex-col gap-2">
                             <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Minimalism</span>
                             <div className="text-xl font-bold font-mono">{metrics.minimalism}%</div>
                          </div>
                          <div className="flex flex-col gap-2">
                             <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Authority</span>
                             <div className="text-xl font-bold font-mono">{metrics.authority}%</div>
                          </div>
                       </div>
                       <Activity className="w-8 h-8 text-indigo-500 animate-pulse" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Curated Collection Grid - The 'Lookbook' */}
        <section className="mb-48">
           <div className="flex justify-between items-end mb-20">
              <h2 className="text-5xl font-black tracking-tighter uppercase italic">Curated Archive</h2>
              <Link href="/index" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-indigo-600 transition-all">
                 Full Catalog <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
              {allFreeFonts.map((font, idx) => (
                <div key={font.id} className={`${idx % 3 === 1 ? 'lg:translate-y-24' : idx % 3 === 2 ? 'lg:translate-y-12' : ''}`}>
                   <FontCardV2 font={font} previewText={previewText} />
                </div>
              ))}
           </div>
        </section>

        {/* Feature: The Alpha Banner */}
        <section className="mb-20">
           <div className="relative h-[80vh] w-full rounded-[60px] overflow-hidden group">
              <Image 
                src="https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png" 
                alt="Banner" 
                fill 
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-1000"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/30">Masterpiece of the Year</span>
                 <h2 className="text-7xl md:text-[12vw] font-black tracking-[-0.08em] uppercase italic leading-none mb-12">Pretendard</h2>
                 <Link href="/fonts/694" className="px-12 py-6 bg-white text-zinc-950 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl">
                    Explore the Standard
                 </Link>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}