
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
    const cssText = `font-family: ${font.fontFamily};`;
    navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className={`group relative hanji-card rounded-[48px] overflow-hidden flex flex-col h-full ${isRecommended ? 'ring-[4px] ring-[#d4a373] bg-white' : ''}`}>
      {/* Decorative Labels */}
      <div className="absolute top-6 left-6 z-10 flex gap-2">
        {isRecommended && (
          <span className="bg-[#d4a373] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
            <ICONS.Magic /> AI Pick
          </span>
        )}
        {font.isPopular && (
          <span className="bg-[#1a1612] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Hot</span>
        )}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onBookmark(); }}
        className="absolute top-6 right-6 z-10 p-4 rounded-3xl bg-white/50 backdrop-blur-md border border-gray-100/50 hover:bg-white transition-all active:scale-90"
      >
        <ICONS.Heart filled={isBookmarked} />
      </button>

      {/* Hero Preview Section */}
      <div 
        className="flex-1 cursor-pointer min-h-[200px] sm:min-h-[260px] flex items-center justify-center pt-24 pb-12 px-8 group-hover:bg-[#fdfbf7] transition-colors relative overflow-hidden"
        onClick={onClick}
      >
        <div className="absolute inset-0 blueprint-grid opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 text-center w-full">
          <p 
            style={{ fontFamily: font.fontFamily }} 
            className="text-5xl sm:text-6xl lg:text-7xl text-[#1a1612] leading-[1.1] transition-transform duration-700 group-hover:scale-110"
          >
            {previewText || "가나다라마바사"}
          </p>
        </div>
      </div>

      {/* Meta & Actions */}
      <div className="p-8 pt-4 border-t border-[#f2e9e1]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-black text-[#1a1612] group-hover:text-[#8e2e2c] transition-colors">{font.name}</h3>
            <p className="text-[13px] text-[#8a7e72] font-bold uppercase tracking-widest opacity-60 mt-1">{font.creator} • {font.category}</p>
          </div>
          <div className="flex gap-2">
            {font.emotions.slice(0, 1).map(emo => (
              <span key={emo} className="text-[10px] font-black text-[#6a5f54] bg-[#f2e9e1] px-3 py-1.5 rounded-xl">#{emo}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={copyCSS}
            className={`flex items-center justify-center gap-3 py-5 text-[14px] font-black rounded-[28px] border-2 transition-all ${copied ? 'bg-green-600 text-white border-green-600' : 'bg-white text-[#4a3f35] border-[#e8dfd0] hover:border-[#b08d57] active:scale-95'}`}
          >
            {copied ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                <span>복사완료</span>
              </>
            ) : (
              <>
                <ICONS.Copy />
                <span>CSS 복사</span>
              </>
            )}
          </button>
          <button 
            onClick={() => window.open(font.sourceUrl, '_blank')}
            className="flex items-center justify-center gap-3 py-5 bg-[#1a1612] text-white text-[14px] font-black rounded-[28px] hover:bg-black transition-all shadow-xl active:scale-95"
          >
            <ICONS.Download />
            <span>다운로드</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontCard;
