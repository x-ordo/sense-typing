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
      <article className="h-full flex flex-col bg-white border border-zinc-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-xl overflow-hidden relative">
        
        {/* Product Image Area */}
        <div className="aspect-[4/3] w-full bg-zinc-50 flex items-center justify-center overflow-hidden relative border-b border-zinc-50">
           {previewText ? (
             <span className="text-2xl text-zinc-900 font-medium break-all text-center px-6 relative z-10" style={{ fontFamily: 'sans-serif' }}>
               {previewText}
             </span>
           ) : font.preview_image ? (
             <Image 
               src={font.preview_image} 
               alt={`${font.name} preview`} 
               fill
               className="object-cover opacity-90 group-hover:scale-110 transition-all duration-700"
               unoptimized
             />
           ) : (
             <span className="text-3xl text-zinc-800 font-bold tracking-tight" style={{ fontFamily: 'sans-serif' }}>
               {font.name}
             </span>
           )}
           
           {/* Price Tag Overlay */}
           <div className="absolute top-4 left-4 z-10">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${isFree ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-white'}`}>
               {isFree ? 'FREE' : `₩${font.price?.toLocaleString()}`}
             </span>
           </div>

           {/* Quick Add Action (Mall style) */}
           <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl">
                 <Plus className="w-5 h-5" />
              </div>
           </div>
        </div>

        {/* Product Info Area */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors truncate">
              {font.name}
            </h3>
            <span className="text-[10px] text-zinc-400 font-medium">{font.license_type}</span>
          </div>
          
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-4">
            {font.foundry}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-50">
            <div className="flex gap-1">
               {[Printer, Globe, Video].map((Icon, idx) => (
                 <Icon key={idx} className="w-3 h-3 text-zinc-300" />
               ))}
            </div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:underline">View Detail</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
