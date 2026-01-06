'use client'

import React, { useState, useRef } from 'react';
import { AnalysisResult } from '../types/ai';
import { ICONS } from './icons';
import { trackSignal } from '@/lib/paywall';
import { AIIntentSignal } from '@/lib/ai/intent';

// Extended type for response which includes intent
interface AIResponse extends AnalysisResult {
  aiIntent?: AIIntentSignal;
}

interface SmartSearchProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onAnalysisComplete }) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      
      // INTENT SIGNAL INJECTION
      if (result.aiIntent) {
        if (result.aiIntent.riskLevel === 'high' && result.aiIntent.confidence >= 0.7) {
          trackSignal('aiHighRiskDetected');
          console.log('[SenseTyping] High Risk Context Detected:', result.aiIntent.detectedContexts);
        }
      }

      onAnalysisComplete(result);
      setQuery('');
      setIsFocused(false);
      inputRef.current?.blur();
    } catch (error) {
      console.error("AI Search failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const prompts = [
    { label: "Fintech", text: "신뢰감 있고 모던한 핀테크 서비스", color: "#8e2e2c" },
    { label: "Branding", text: "감성적인 카페 브랜딩 및 메뉴판", color: "#b08d57" },
    { label: "Tech Blog", text: "힙하고 가독성 좋은 기술 블로그", color: "#1a1612" },
    { label: "E-commerce", text: "친근하고 귀여운 쇼핑몰 디자인", color: "#8e2e2c" }
  ];

  return (
    <>
      {isFocused && (
        <div 
          className="fixed inset-0 z-[95] bg-black/10 backdrop-blur-md transition-opacity duration-500"
          onClick={() => setIsFocused(false)}
        />
      )}

      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFocused ? 'bottom-1/2 translate-y-1/2 scale-105' : ''}`}>
        
        {/* Floating Prompt Bubbles */}
        {isFocused && !isAnalyzing && (
          <div className="absolute -top-32 sm:-top-24 left-0 w-full flex flex-wrap justify-center gap-4 px-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {prompts.map((p, idx) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSearch(p.text)}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className="group flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-xl border border-[#e8dfd0] rounded-full text-[13px] font-black text-[#1a1612] hover:border-[#b08d57] hover:bg-white transition-all shadow-xl animate-in fade-in slide-in-from-bottom-4"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                {p.label}
              </button>
            ))}
          </div>
        )}

        <div className={`bg-white/80 backdrop-blur-3xl border-2 border-[#e8dfd0] rounded-[40px] p-2.5 transition-all shadow-2xl ${isFocused ? 'ring-[12px] ring-[#b08d57]/10' : 'hover:border-[#b08d57]/40'}`}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="relative flex items-center"
          >
            <div className="flex-1 flex items-center">
              <div className={`pl-6 pr-4 transition-all duration-500 ${isAnalyzing ? 'text-[#8e2e2c] scale-125' : 'text-[#b08d57]'}`}>
                {isAnalyzing ? (
                  <div className="w-6 h-6 border-[3px] border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ICONS.Magic />
                )}
              </div>
              <input 
                ref={inputRef}
                type="text" 
                placeholder={isAnalyzing ? "AI가 문맥의 리스크를 분석 중입니다..." : "프로젝트의 바이브를 입력하세요."}
                className="w-full py-5 bg-transparent text-lg sm:text-xl font-bold outline-none placeholder:text-[#dcd0bc] text-[#1a1612]"
                value={query}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
            <button 
              type="submit"
              disabled={isAnalyzing || !query.trim()}
              className="mr-2 px-8 py-4 bg-[#1a1612] text-white text-[15px] font-black rounded-[28px] hover:bg-black transition-all active:scale-95 disabled:opacity-20 flex items-center gap-3 shadow-2xl"
            >
              <span>{isFocused ? '분석' : 'Ask'}</span>
              <ICONS.Search />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SmartSearch;