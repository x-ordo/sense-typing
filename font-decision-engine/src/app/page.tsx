'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FontCardV2 from '@/components/FontCardV2';
import SmartSearch from '@/components/SmartSearch';
import { AnalysisResult } from '@/types/ai';
import { Plus, Maximize2, Zap } from 'lucide-react';

import { createSupabaseBrowser } from '@/lib/supabase/fonts';

interface FontAsset {
  id: string;
  name: string;
  foundry: string;
  license_type: string;
  tags?: string[];
  description?: string;
  preview_image?: string;
  views?: number;
  source_url?: string;
  price?: number;
}

export default function Home() {
  const [previewText, setPreviewText] = useState('UNLIMITED');
  const [metrics, setMetrics] = useState({ minimalism: 88, authority: 42, legibility: 95 });
  const [allFreeFonts, setAllFreeFonts] = useState<FontAsset[]>([]);

  useEffect(() => {
    const fetchFonts = async () => {
      const supabase = createSupabaseBrowser();
      const { data, error } = await supabase
        .from('fonts')
        .select('*')
        .limit(6);
      
      if (error) {
        console.error("Supabase Error:", error);
        return;
      }
      if (data) setAllFreeFonts(data);
    };

    fetchFonts();
  }, []);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    console.log("Artisan Analysis:", result.tone);
    setMetrics({
      minimalism: Math.floor(Math.random() * 40) + 60,
      authority: Math.floor(Math.random() * 50) + 30,
      legibility: Math.floor(Math.random() * 20) + 80,
    });
  };

  return (
    <div className="relative min-h-screen pt-60 pb-80">
      
      {/* Background Hero Text */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-[0.02] mix-blend-multiply transition-all duration-1000 overflow-hidden whitespace-nowrap">
         <span className="text-[40vw] font-black italic serif-display leading-none tracking-tighter text-brand-black">TYPOGRAPHY</span>
      </div>

      <main className="max-w-[1800px] mx-auto px-10 md:px-20 relative z-10">
        
        {/* Hero */}
        <section className="mb-80">
           <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-12 h-[1px] bg-brand-gold"></div>
                 <span className="mono-label text-brand-gold">Crafting the visual decision</span>
              </div>
              <h1 className="text-8xl md:text-[14vw] serif-display font-black leading-[0.8] tracking-[-0.08em] mb-20 uppercase reveal-up text-brand-black">
                 Form<br/>
                 <span className="text-brand-gold flex items-center gap-10 italic">Follows <Plus className="w-[8vw] h-[8vw] stroke-[0.5] animate-spin-slow" /></span>
                 Intent.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                 <p className="text-lg font-medium text-zinc-500 leading-relaxed max-w-sm">
                    우리는 폰트를 나열하지 않습니다. 당신의 의도를 분석하여 브랜드의 영속적인 가치를 결정하는 시스템을 설계합니다.
                 </p>
                 <div className="flex flex-col justify-end items-end gap-4">
                    <span className="mono-label text-zinc-300">Operational Stats v2.6</span>
                    <div className="flex gap-10">
                       <div className="text-right">
                          <span className="mono-label block text-zinc-400">Assets</span>
                          <span className="text-3xl font-black text-brand-black">50+</span>
                       </div>
                       <div className="text-right">
                          <span className="mono-label block text-zinc-400">Confidence</span>
                          <span className="text-3xl font-black text-brand-black">90.2%</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Search */}
        <section className="mb-80">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-y border-brand-beige py-24">
              <div className="lg:col-span-5">
                 <h3 className="text-2xl font-black serif-display mb-8 text-brand-black">Consult with AI Intelligence</h3>
                 <div className="bg-white p-2 rounded-[32px] border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-700">
                    <SmartSearch onAnalysisComplete={handleAnalysisComplete} />
                 </div>
              </div>
              <div className="lg:col-span-7 bg-brand-black rounded-[40px] p-12 text-white relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-20 relative z-10">
                    <div className="flex flex-col gap-2">
                       <span className="mono-label text-brand-gold">Interactive Specimen</span>
                       <h4 className="text-4xl font-black serif-display italic">{previewText}</h4>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => setPreviewText('DECISION')} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"><Maximize2 className="w-4 h-4" /></button>
                       <button className="w-10 h-10 bg-brand-gold text-white rounded-full flex items-center justify-center"><Zap className="w-4 h-4 fill-current" /></button>
                    </div>
                 </div>
                 
                 <input 
                    type="text"
                    placeholder="ENTER INTENT..."
                    className="w-full bg-transparent text-6xl md:text-[10vw] font-black focus:outline-none placeholder:text-white/5 reveal-up tracking-tighter uppercase italic"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                 />

                 <div className="mt-20 flex gap-12 relative z-10 border-t border-white/10 pt-8">
                    <div className="flex items-center gap-4">
                       <span className="mono-label opacity-40">MIN</span>
                       <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-gold transition-all duration-1000" style={{ width: `${metrics.minimalism}%` }}></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="mono-label opacity-40">AUT</span>
                       <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white transition-all duration-1000" style={{ width: `${metrics.authority}%` }}></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Gallery */}
        <section>
           <div className="flex justify-between items-end mb-32">
              <div>
                 <h2 className="text-6xl font-black serif-display tracking-tighter uppercase italic mb-4 text-brand-black">The Archive</h2>
                 <p className="mono-label text-zinc-400">Section 01: Commercial Assets</p>
              </div>
              <Link href="/index" className="mono-label text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-black hover:border-brand-black transition-all">View Index [01-50]</Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-60">
              {allFreeFonts.map((font, idx) => (
                <div key={font.id} className={`${idx % 2 === 1 ? 'md:translate-y-40' : ''}`}>
                   <div className="relative group">
                      <div className="absolute -left-12 top-0 mono-label text-zinc-200 group-hover:text-brand-gold transition-colors duration-500">0{idx + 1}</div>
                      <FontCardV2 font={font} previewText={previewText} />
                   </div>
                </div>
              ))}
           </div>
        </section>

      </main>

      <footer className="fixed bottom-0 left-0 w-full px-10 py-6 border-t border-brand-beige bg-brand-paper/80 backdrop-blur-sm z-[100] flex justify-between items-center select-none text-brand-black">
         <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="mono-label">System Active</span>
            </div>
            <div className="hidden sm:flex gap-10">
               <div className="flex items-center gap-2"><span className="mono-label opacity-30">GPU</span> <span className="mono-label">READY</span></div>
               <div className="flex items-center gap-2"><span className="mono-label opacity-30">ENC</span> <span className="mono-label text-brand-gold">GEMINI-1.5-FLASH</span></div>
            </div>
         </div>
         <div className="mono-label">© 2026 SENSE INTELLIGENCE. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}
