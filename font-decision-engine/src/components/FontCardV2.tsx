// src/components/FontCardV2.tsx
'use client'

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface FontProps {
  id: string;
  name: string;
  foundry: string;
  preview_image?: string;
  license_type: string;
  tags?: string[];
  description?: string;
}

export default function FontCardV2({ font }: { font: FontProps }) {
  return (
    <Link href={`/fonts/${font.id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white border border-gray-100 transition-all duration-300 hover:border-gray-400 hover:shadow-lg rounded-sm overflow-hidden relative">
        
        {/* Preview Area - Larger & cleaner */}
        <div className="aspect-[16/9] w-full bg-gray-50 flex items-center justify-center p-6 overflow-hidden relative">
           {font.preview_image ? (
             <img 
               src={font.preview_image} 
               alt={`${font.name} preview`} 
               className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
             />
           ) : (
             <span className="text-4xl text-gray-800 font-medium whitespace-nowrap" style={{ fontFamily: 'sans-serif' }}>
               {font.name}
             </span>
           )}
           
           {/* License Badge (Subtle) */}
           <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-200 rounded-full">
             {font.license_type}
           </div>
        </div>

        {/* Info Area */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
              {font.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </div>
          
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">
            {font.foundry}
          </p>

          {font.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
              {font.description}
            </p>
          )}

          {/* Tags - Minimal */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {font.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded hover:bg-gray-200 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
