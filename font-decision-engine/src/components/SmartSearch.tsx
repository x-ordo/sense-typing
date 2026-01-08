'use client'

import React, { useState } from 'react';
import { AnalysisResult } from '../types/ai';
import { ICONS } from './icons';
import { trackSignal } from '@/lib/paywall';
import { AIIntentSignal } from '@/lib/ai/intent';

interface AIResponse extends AnalysisResult {
  aiIntent?: AIIntentSignal;
}

interface SmartSearchProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onAnalysisComplete }) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = async (textToSearch?: string) => {
    const finalQuery = textToSearch || query;
    if (!finalQuery.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: finalQuery })
      });

      if (!res.ok) throw new Error('Analysis failed');
      const result: AIResponse = await res.json();
      
      if (result.aiIntent && result.aiIntent.riskLevel === 'high') {
        trackSignal('aiHighRiskDetected');
      }

      onAnalysisComplete(result);
      setQuery('');
    } catch (error) {
      console.error("AI Search failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-zinc-100 rounded-2xl p-1.5 flex items-center gap-2 border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all shadow-inner">
        <div className="pl-4 text-indigo-500">
          {isAnalyzing ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <ICONS.Magic />}
        </div>
        <input 
          type="text" 
          placeholder="프로젝트의 분위기를 입력해 AI 추천을 받으세요 (예: 힙한 카페)"
          className="flex-1 bg-transparent py-3 text-sm font-bold outline-none placeholder:text-zinc-400 text-zinc-900"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={() => handleSearch()}
          disabled={isAnalyzing || !query.trim()}
          className="px-6 py-3 bg-zinc-900 text-white text-xs font-black rounded-xl hover:bg-indigo-600 transition-all disabled:opacity-20 uppercase tracking-widest"
        >
          {isAnalyzing ? 'Analyzing' : 'Search'}
        </button>
      </div>
      
      {/* Quick Suggestions */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
        {["핀테크 브랜드", "감성 브이로그", "미니멀 포트폴리오", "공공기관 보고서"].map(txt => (
          <button 
            key={txt}
            onClick={() => handleSearch(txt)}
            className="whitespace-nowrap px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 hover:border-indigo-500 hover:text-indigo-600 transition-all"
          >
            # {txt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmartSearch;
