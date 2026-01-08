// src/components/FontCardV2.tsx
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Printer, Globe, Video, Plus } from 'lucide-react';

interface FontProps {
  id: string;
  name: string;
  foundry: string;
  preview_image?: string;
  license_type: string;
  tags?: string[];
  description?: string;
  views?: number;
  price?: number;
}

export default function FontCardV2({ font, previewText }: { font: FontProps, previewText?: string }) {
  const isFree = !font.price || font.price === 0;

  return (
    <Link href={`/fonts/${font.id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white border border-zinc-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 rounded-2xl overflow-hidden relative">
        
        {/* Product Image Area */}
        <div className="aspect-[4/3] w-full bg-zinc-50 flex items-center justify-center overflow-hidden relative group-hover:bg-white transition-colors duration-500">
           {previewText ? (
             <span className="text-2xl text-zinc-900 font-bold break-all text-center px-8 relative z-10" style={{ fontFamily: 'sans-serif' }}>
               {previewText}
             </span>
           ) : font.preview_image ? (
             <Image 
               src={font.preview_image} 
               alt={`${font.name} preview`} 
               fill
               className="object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
               unoptimized
             />
           ) : (
             <span className="text-3xl text-zinc-800 font-black tracking-tighter uppercase italic" style={{ fontFamily: 'sans-serif' }}>
               {font.name}
             </span>
           )}
           
           {/* Price Tag Overlay */}
           <div className="absolute top-5 left-5 z-10">
             <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${isFree ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-white'}`}>
               {isFree ? 'FREE' : `₩${font.price?.toLocaleString()}`}
             </span>
           </div>

           {/* Quick Action Overlay */}
           <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors pointer-events-none"></div>
        </div>

        {/* Product Info Area */}
        <div className="p-6 flex flex-col flex-grow relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-black text-zinc-900 group-hover:text-indigo-600 transition-colors truncate tracking-tighter">
              {font.name}
            </h3>
            <div className="w-8 h-8 bg-zinc-50 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
               <Plus className="w-4 h-4" />
            </div>
          </div>
          
          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-6">
            {font.foundry}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-2">
               {[Printer, Globe, Video].map((Icon, idx) => (
                 <div key={idx} className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-50 text-zinc-300">
                    <Icon className="w-3.5 h-3.5" />
                 </div>
               ))}
            </div>
            <span className="text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
               Buy Now
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
