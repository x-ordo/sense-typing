// src/components/FontCardV2.tsx
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Printer, Globe, Video, Laptop, Package, Briefcase } from 'lucide-react';

interface FontProps {
  id: string;
  name: string;
  foundry: string;
  preview_image?: string;
  license_type: string;
  tags?: string[];
  description?: string;
  views?: number;
}

export default function FontCardV2({ font, previewText }: { font: FontProps, previewText?: string }) {
  const licenseIcons = [
    { icon: Printer, label: '인쇄' },
    { icon: Globe, label: '웹' },
    { icon: Video, label: '영상' },
    { icon: Laptop, label: '임베딩' },
    { icon: Package, label: '포장지' },
    { icon: Briefcase, label: 'BI/CI' },
  ];

  return (
    <Link href={`/fonts/${font.id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-zinc-50/50 border border-zinc-200/60 transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] rounded-3xl overflow-hidden relative">
        
        {/* Preview Area - Abstract background on hover */}
        <div className="aspect-[16/10] w-full bg-white flex items-center justify-center p-8 overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           
           {previewText ? (
             <span className="text-3xl text-zinc-900 font-medium break-all text-center px-4 relative z-10" style={{ fontFamily: 'sans-serif' }}>
               {previewText}
             </span>
           ) : font.preview_image ? (
             <Image 
               src={font.preview_image} 
               alt={`${font.name} preview`} 
               fill
               className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
               unoptimized
             />
           ) : (
             <span className="text-4xl text-zinc-800 font-bold tracking-tight relative z-10" style={{ fontFamily: 'sans-serif' }}>
               {font.name}
             </span>
           )}
           
           <div className="absolute top-4 left-4 z-10">
             <span className="px-2 py-1 bg-zinc-900 text-white text-[8px] font-black uppercase tracking-widest rounded-md">
               {font.license_type}
             </span>
           </div>
        </div>

        {/* Info Area */}
        <div className="p-6 flex flex-col flex-grow bg-white/40 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-black text-zinc-900 group-hover:text-indigo-600 transition-colors tracking-tighter">
              {font.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-indigo-500 transition-colors" />
          </div>
          
          <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-4">
            {font.foundry}
          </p>

          <div className="flex gap-2 mb-6">
             {licenseIcons.map((item, idx) => (
               <div key={idx} className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all duration-300" title={item.label}>
                 <item.icon className="w-3.5 h-3.5" />
               </div>
             ))}
          </div>

          {/* Tags - Pill style */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {font.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="inline-block px-2.5 py-1 bg-zinc-100 text-zinc-500 text-[9px] font-bold rounded-full group-hover:bg-zinc-900 group-hover:text-white transition-colors uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
