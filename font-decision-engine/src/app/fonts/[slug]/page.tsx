export const runtime = 'edge';

import { Check, AlertTriangle, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getFontBySlug } from '@/lib/supabase/server-fonts';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const font = await getFontBySlug(slug);

  if (!font) return { title: 'Font Not Found - Sense Typing' };

  return {
    title: `${font.name} - Sense Typing Asset`,
    description: font.description || `Explore ${font.name} font on Sense Typing.`,
    openGraph: {
      title: font.name,
      description: font.description,
      type: 'article',
    }
  };
}

export default async function FontDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let font = null;
  
  try {
    font = await getFontBySlug(slug);
  } catch (err) {
    console.error("Failed to fetch font data:", err);
  }

  if (!font) {
    return (
      <div className="min-h-screen bg-brand-paper flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-4xl font-black text-brand-black mb-4 serif-display italic">ASSET UNAVAILABLE.</h1>
        <p className="text-zinc-400 mb-10">데이터베이스 연결 확인 또는 유효하지 않은 자산 ID입니다.</p>
        <Link href="/" className="px-10 py-4 bg-brand-black text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-brand-gold transition-all">
           Return to Inventory
        </Link>
      </div>
    );
  }

  const displayFont = {
    ...font,
    pros: font.pros || ['Professional Grade', 'Modern Architecture'],
    cons: font.cons || ['Requires License verification'],
    usage: font.usage || ['Global Identity', 'High-end UI'],
    preview_text: font.preview_text || 'Authority follows intent.'
  };

  return (
    <div className="min-h-screen bg-brand-paper pt-32">
      <main className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-20">
        
        {/* Left: Specimen */}
        <div className="flex-1">
          <div className="bg-white border-thin p-20 min-h-[500px] flex items-center justify-center mb-12 relative overflow-hidden group">
             <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-1000" style={{ backgroundImage: 'radial-gradient(circle, #b08d57 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             <p className="text-5xl md:text-7xl font-medium leading-tight text-brand-black break-keep text-center relative z-10 italic serif-display">
               {displayFont.preview_text}
             </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
             <div className="bg-brand-black text-white p-10 rounded-2xl flex items-center justify-center text-3xl serif-display italic">Authority</div>
             <div className="border-thin bg-white p-10 rounded-2xl flex items-center justify-center text-lg text-brand-black/60 font-medium">Responsive Narrative.</div>
          </div>
        </div>

        {/* Right: Technical Ledger */}
        <div className="w-full md:w-[450px] flex-shrink-0">
          <div className="sticky top-32">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">{displayFont.foundry}</span>
              <span className="mono-label text-zinc-300">Vault ID: {displayFont.id.slice(0,8)}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-brand-black mb-8 tracking-tighter serif-display italic">{displayFont.name}</h1>
            
            <p className="text-brand-black/60 leading-relaxed mb-12 text-lg font-medium">
              {displayFont.description}
            </p>

            <div className="space-y-10 mb-16">
              <div>
                <h3 className="mono-label text-brand-black mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Strategic Advantage
                </h3>
                <ul className="space-y-4">
                  {displayFont.pros.map((pro: string) => (
                    <li key={pro} className="flex gap-3 text-sm font-bold italic text-brand-black/80">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                 <h3 className="mono-label text-brand-black mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full"></div> Governance Notes
                </h3>
                <ul className="space-y-4">
                  {displayFont.cons.map((con: string) => (
                    <li key={con} className="flex gap-3 text-sm font-bold italic text-brand-black/80">
                      <AlertTriangle className="w-4 h-4 text-brand-red flex-shrink-0" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 bg-white border-thin rounded-3xl mb-12 shadow-sm">
               <h3 className="mono-label text-brand-gold mb-6">Technical Ledger</h3>
               <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-black/40 font-bold uppercase tracking-widest text-[9px]">Format</span>
                    <span className="font-black italic uppercase">OTF / TTF / WOFF2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-black/40 font-bold uppercase tracking-widest text-[9px]">Glyphs</span>
                    <span className="font-black italic uppercase">11,172+ (Global)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-black/40 font-bold uppercase tracking-widest text-[9px]">License</span>
                    <span className="font-black italic uppercase text-brand-gold">{displayFont.license_type}</span>
                  </div>
               </div>
            </div>

            <a 
              href={displayFont.source_url || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-6 bg-brand-black text-white text-center font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-gold transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              Acquire Asset <ExternalLink className="w-4 h-4" />
            </a>

          </div>
        </div>

      </main>
    </div>
  )
}