
import React, { useState } from 'react';
import { analyzeProject } from '../services/geminiService';
import { Font, AnalysisResult } from '../types';
import { ICONS } from '../constants';

interface SmartSearchProps {
  fonts: Font[];
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ fonts, onAnalysisComplete }) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeProject(query, fonts);
      onAnalysisComplete(result);
    } catch (error) {
      console.error("AI Search failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative group flex items-center">
        <div className="absolute left-6 text-[#b08d57]">
          {isAnalyzing ? (
            <div className="w-5 h-5 border-2 border-[#b08d57]/20 border-t-[#b08d57] rounded-full animate-spin" />
          ) : (
            <ICONS.Magic />
          )}
        </div>
        <input 
          type="text" 
          placeholder="어떤 프로젝트를 하시나요? (예: 핀테크 앱, 감성적인 카페 브랜딩...)"
          className="w-full py-5 pl-14 pr-32 bg-white/70 backdrop-blur-md border-2 border-[#e8dfd0] rounded-[24px] text-base focus:ring-4 focus:ring-[#b08d57]/10 focus:border-[#b08d57] outline-none transition-all placeholder:text-[#dcd0bc] shadow-xl group-hover:border-[#b08d57]/50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit"
          disabled={isAnalyzing || !query.trim()}
          className="absolute right-4 px-6 py-2.5 bg-[#1a1612] text-white text-[13px] font-bold rounded-xl hover:bg-black transition-all active:scale-95 disabled:opacity-30"
        >
          AI 추천
        </button>
      </div>
      <div className="mt-3 flex gap-4 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <span className="text-[11px] font-black text-[#b08d57] uppercase tracking-widest">Hot Prompts:</span>
        <button type="button" onClick={() => setQuery("세련된 IT 기업 웹사이트")} className="text-[11px] font-bold text-[#8a7e72] hover:text-[#1a1612]">#IT기업</button>
        <button type="button" onClick={() => setQuery("귀여운 반려동물 쇼핑몰")} className="text-[11px] font-bold text-[#8a7e72] hover:text-[#1a1612]">#반려동물</button>
        <button type="button" onClick={() => setQuery("고급스러운 호텔 브로슈어")} className="text-[11px] font-bold text-[#8a7e72] hover:text-[#1a1612]">#럭셔리</button>
      </div>
    </form>
  );
};

export default SmartSearch;
