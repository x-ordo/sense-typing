// src/components/FontCardV2.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, ShieldCheck, Eye, ArrowRight } from 'lucide-react';

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
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sense-archive');
    if (saved) {
      const archive = JSON.parse(saved);
      setIsArchived(archive.includes(font.id));
    }
  }, [font.id]);

  const toggleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = localStorage.getItem('sense-archive');
    let archive = saved ? JSON.parse(saved) : [];
    if (isArchived) archive = archive.filter((id: string) => id !== font.id);
    else archive.push(font.id);
    localStorage.setItem('sense-archive', JSON.stringify(archive));
    setIsArchived(!isArchived);
  };

  return (
    <Link href={`/fonts/${font.id}`} className="group block">
      <article className="relative bg-white border border-transparent group-hover:border-brand-beige transition-all duration-700 ease-out">
        
        {/* Specimen Area */}
        <div className="aspect-[4/5] bg-zinc-50 overflow-hidden relative transition-all duration-1000 ease-in-out group-hover:bg-white">
           {/* Technical Grid Overlay */}
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #b08d57 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
           </div>

           <div className="h-full flex items-center justify-center p-10 relative z-10">
              {previewText ? (
                <span className="text-4xl text-brand-black font-black break-all text-center leading-[0.9] tracking-tighter italic uppercase" style={{ fontFamily: 'serif' }}>
                  {previewText}
                </span>
              ) : font.preview_image ? (
                <Image 
                  src={font.preview_image} 
                  alt={font.name} 
                  fill
                  className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                  unoptimized
                />
              ) : (
                <span className="text-5xl font-black italic serif-display text-brand-black">{font.name}</span>
              )}
           </div>

           {/* Price & Badge */}
           <div className="absolute top-6 left-6 flex flex-col gap-2">
             <div className="flex items-center gap-2 bg-brand-black text-white px-3 py-1 rounded-sm shadow-xl">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isFree ? 'FREE' : `₩${font.price?.toLocaleString()}`}
                </span>
             </div>
             <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm border ${isFree ? 'border-emerald-500 text-emerald-600' : 'border-brand-gold text-brand-gold'} bg-white/80 backdrop-blur text-[8px] font-black uppercase tracking-tighter`}>
                <ShieldCheck className="w-2.5 h-2.5" /> 검증완료
             </div>
           </div>

           {/* Hover CTA */}
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-brand-black text-white px-8 py-3 rounded-full flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">상세 보기</span>
                 <ArrowRight className="w-3.5 h-3.5" />
              </div>
           </div>
        </div>

        {/* Product Info Area */}
        <div className="pt-10 pb-8 px-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-brand-black group-hover:text-brand-gold transition-colors duration-500">
                {font.name}
              </h3>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{font.foundry}</span>
            </div>
            <button 
              onClick={toggleArchive}
              className={`w-10 h-10 border border-zinc-100 flex items-center justify-center transition-all ${isArchived ? 'bg-brand-gold border-brand-gold text-white shadow-lg' : 'bg-white hover:bg-brand-black hover:text-white'}`}
            >
              <Bookmark className={`w-4 h-4 ${isArchived ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
             <div className="flex gap-4">
                {['인쇄', '웹', '영상'].map(tag => (
                  <span key={tag} className="text-[9px] font-bold text-zinc-300 uppercase tracking-tighter">#{tag}</span>
                ))}
             </div>
             <div className="flex items-center gap-2 text-zinc-400">
                <Eye className="w-3 h-3" />
                <span className="text-[9px] font-black">{font.views?.toLocaleString() || '1.2k'}</span>
             </div>
          </div>
        </div>
      </article>
    </Link>
  )
}