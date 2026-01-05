
import React, { useState } from 'react';
import { Font } from '../types';
import { ICONS } from '../constants';

interface FontCardProps {
  font: Font;
  previewText: string;
  isRecommended?: boolean;
  isBookmarked: boolean;
  onBookmark: () => void;
  onClick: () => void;
}

const FontCard: React.FC<FontCardProps> = ({ font, previewText, isRecommended, isBookmarked, onBookmark, onClick }) => {
  const [copied, setCopied] = useState(false);

  const copyCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`font-family: ${font.fontFamily};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`group relative hanji-card rounded-[32px] p-8 transition-all duration-500 ${isRecommended ? 'ring-2 ring-[#d4a373] bg-white shadow-2xl' : ''}`}>
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-[#1a1612] group-hover:text-[#8e2e2c] transition-colors leading-tight">{font.name}</h3>
            {font.isPopular && <span className="text-[10px] bg-[#2a241e] text-white px-2 py-0.5 rounded-lg font-black uppercase tracking-wider">Hot</span>}
          </div>
          <p className="text-[12px] text-[#8a7e72] mt-1.5 font-medium tracking-tight opacity-70">{font.creator} • {font.category}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          className="p-2.5 rounded-2xl bg-white/40 hover:bg-white transition-all active:scale-90 shadow-sm"
        >
          <ICONS.Heart filled={isBookmarked} />
        </button>
      </div>

      <div 
        className="cursor-pointer min-h-[160px] flex items-center justify-center py-8 px-4 border-y border-[#f2e9e1] group-hover:bg-[#fdfbf7]/50 rounded-2xl transition-all"
        onClick={onClick}
      >
        <p 
          style={{ fontFamily: font.fontFamily }} 
          className="text-4xl md:text-5xl text-[#1a1612] text-center leading-relaxed break-words w-full"
        >
          {previewText || "다람쥐 헌 쳇바퀴에 타고파"}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {font.emotions.slice(0, 3).map((emo) => (
          <span key={emo} className="text-[10px] font-bold text-[#6a5f54] bg-[#f2e9e1] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors group-hover:bg-[#eaddca]">
            <ICONS.Tag /> {emo}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
        <button 
          onClick={copyCSS}
          className={`flex items-center justify-center gap-2 py-3.5 text-[12px] font-black rounded-2xl border transition-all ${copied ? 'bg-green-50 text-green-600 border-green-200 shadow-inner' : 'bg-white text-[#4a3f35] border-[#eaddca] hover:bg-[#fcfaf5] shadow-sm active:scale-95'}`}
        >
          <ICONS.Copy /> {copied ? 'Copied!' : 'Copy CSS'}
        </button>
        <button 
          onClick={() => window.open(font.sourceUrl, '_blank')}
          className="flex items-center justify-center gap-2 py-3.5 bg-[#1a1612] text-white text-[12px] font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
        >
          <ICONS.Download /> Download
        </button>
      </div>

      {isRecommended && (
        <div className="absolute -top-3 left-6 bg-[#d4a373] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg flex items-center gap-2 border border-white/20">
          <ICONS.Magic /> AI Picks
        </div>
      )}
    </div>
  );
};

export default FontCard;
