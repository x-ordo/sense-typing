// src/components/FontCardV2.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, ShieldCheck, Eye, DownloadCloud } from 'lucide-react';

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
      <article className="relative bg-white border border-transparent group-hover:border-zinc-200 transition-all duration-700 ease-out p-1">
        
        {/* Specimen Area */}
        <div className="aspect-[4/5] bg-zinc-50 overflow-hidden relative transition-all duration-1000 ease-in-out group-hover:bg-white">
           {/* Artisan Overlay: Technical Grid */}
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
                <span className="text-5xl font-black italic serif-display">{font.name}</span>
              )}
           </div>

           {/* Hover Menu Action */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <div className="bg-brand-black text-white px-6 py-2 rounded-full flex items-center gap-3">
                 <span className="mono-label !text-white">View Spec</span>
                 <Eye className="w-3 h-3" />
              </div>
           </div>
        </div>

        {/* Info Content Area */}
        <div className="pt-10 pb-6 px-4">
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black uppercase italic tracking-tighter group-hover:text-brand-gold transition-colors duration-500">
                {font.name}
              </h3>
              <span className="mono-label text-zinc-400">By {font.foundry}</span>
            </div>
            <button 
              onClick={toggleArchive}
              className={`w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center transition-all ${isArchived ? 'bg-brand-gold border-brand-gold text-white' : 'hover:bg-brand-black hover:text-white'}`}
            >
              <Bookmark className={`w-3 h-3 ${isArchived ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <ShieldCheck className="w-3 h-3 text-brand-gold" />
                <span className="mono-label !text-zinc-300">{font.license_type}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="mono-label text-zinc-900">{isFree ? 'FREE' : `₩${font.price?.toLocaleString()}`}</span>
                <DownloadCloud className="w-3 h-3 text-zinc-300" />
             </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
