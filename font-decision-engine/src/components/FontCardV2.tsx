// src/components/FontCardV2.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
      <article className="bg-brand-paper border-thin transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(26,22,18,0.1)] relative">
        
        {/* Gallery Image Area */}
        <div className="aspect-[4/5] w-full bg-white overflow-hidden relative border-b border-brand-beige group-hover:bg-brand-paper transition-colors duration-700">
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.05)_0%,transparent_70%)]"></div>
           
           <div className="h-full flex items-center justify-center p-12">
              {previewText ? (
                <span className="text-3xl text-brand-black font-medium break-all text-center leading-tight tracking-tight italic" style={{ fontFamily: 'serif' }}>
                  {previewText}
                </span>
              ) : font.preview_image ? (
                <Image 
                  src={font.preview_image} 
                  alt={`${font.name} preview`} 
                  fill
                  className="object-contain p-12 opacity-90 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                  unoptimized
                />
              ) : (
                <span className="text-4xl text-brand-black serif-title font-black uppercase italic tracking-tighter">
                  {font.name}
                </span>
              )}
           </div>
           
           {/* Price & Risk Badge */}
           <div className="absolute top-8 left-8 flex flex-col gap-2">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">
               {isFree ? 'Acquisition: Free' : `Asset: ₩${font.price?.toLocaleString()}`}
             </span>
             <div className="flex items-center gap-1.5 text-[9px] font-bold text-brand-black/40 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3 text-brand-gold" /> Licensed
             </div>
           </div>

           {/* Top Right Action */}
           <button 
             onClick={toggleArchive}
             className={`absolute top-8 right-8 z-20 w-10 h-10 border-thin rounded-full flex items-center justify-center transition-all duration-500 ${isArchived ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-brand-black hover:bg-brand-black hover:text-white'}`}
           >
             <Bookmark className={`w-4 h-4 ${isArchived ? 'fill-current' : ''}`} />
           </button>
        </div>

        {/* Product Meta Area */}
        <div className="p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl serif-title font-black text-brand-black group-hover:text-brand-gold transition-colors duration-500 tracking-tighter">
                {font.name}
              </h3>
              <p className="text-[10px] text-brand-gold font-black uppercase tracking-[0.3em] mt-2">
                By {font.foundry}
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-beige group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
          </div>
          
          <div className="flex items-center justify-between pt-8 border-t border-brand-beige">
            <span className="text-[10px] font-black text-brand-black uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
               Implement Asset
            </span>
            <div className="flex gap-4">
               {['Print', 'Web', 'Motion'].map((label) => (
                 <span key={label} className="text-[8px] font-bold text-brand-black/30 uppercase tracking-tighter">{label}</span>
               ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}