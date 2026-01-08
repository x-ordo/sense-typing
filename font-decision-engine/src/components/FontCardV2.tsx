// src/components/FontCardV2.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, CheckCircle, Eye } from 'lucide-react';
import type { FontCardProps } from '@/types/font';

export default function FontCardV2({ font, previewText }: { font: FontCardProps, previewText?: string }) {
  const isFree = !font.price || font.price === 0;
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sense-archive');
      if (saved) {
        const archive = JSON.parse(saved) as string[];
        setIsArchived(archive.includes(font.id));
      }
    } catch {
      // localStorage may be unavailable in private browsing
    }
  }, [font.id]);

  const toggleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('sense-archive');
      let archive: string[] = saved ? JSON.parse(saved) : [];
      if (isArchived) {
        archive = archive.filter((id) => id !== font.id);
      } else {
        archive.push(font.id);
      }
      localStorage.setItem('sense-archive', JSON.stringify(archive));
      setIsArchived(!isArchived);
    } catch {
      // localStorage may be unavailable in private browsing
    }
  };

  return (
    <Link href={`/fonts/${font.id}`} className="group block">
      <article className="relative bg-white border border-brand-beige hover:border-brand-gold/30 transition-all duration-300 rounded-lg overflow-hidden">

        {/* Specimen Area */}
        <div className="aspect-[4/3] bg-zinc-50 relative overflow-hidden">

          {/* Font Preview */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {previewText ? (
              <span className="text-xl text-brand-black font-semibold text-center leading-tight">
                {previewText}
              </span>
            ) : font.preview_image ? (
              <Image
                src={font.preview_image}
                alt={font.name}
                fill
                className="object-contain p-6"
                unoptimized
              />
            ) : (
              <span className="font-serif text-2xl text-brand-black italic">
                {font.name}
              </span>
            )}
          </div>

          {/* Top Badge Row */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              {/* License Badge */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide rounded ${
                isFree
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
              }`}>
                {isFree ? 'Free License' : `₩${font.price?.toLocaleString()}`}
              </span>

              {/* Verified Badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] font-medium text-zinc-500 bg-white/80 backdrop-blur rounded border border-zinc-200">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                검증완료
              </span>
            </div>

            {/* Archive Button */}
            <button
              onClick={toggleArchive}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${
                isArchived
                  ? 'bg-brand-gold text-white'
                  : 'bg-white/80 backdrop-blur text-zinc-400 hover:text-brand-black border border-zinc-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isArchived ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-brand-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-medium tracking-wide uppercase">
              상세 분석 보기
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-brand-black truncate group-hover:text-brand-gold transition-colors">
                {font.name}
              </h3>
              <p className="text-[10px] text-zinc-400 truncate">
                {font.foundry}
              </p>
            </div>
            <div className="flex items-center gap-1 text-zinc-400 shrink-0">
              <Eye className="w-3 h-3" />
              <span className="text-[10px] font-medium">
                {font.views?.toLocaleString() || '0'}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {(font.tags?.slice(0, 3) || []).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] text-zinc-500 bg-zinc-100 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
