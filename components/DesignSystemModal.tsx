
import React, { useState } from 'react';
import { analyzeDesignSystem } from '../services/geminiService';
import { DesignSystemAnalysis } from '../types';
import { ICONS } from '../constants';

interface DesignSystemModalProps {
  onAnalysisComplete: (result: DesignSystemAnalysis) => void;
}

const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ onAnalysisComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeDesignSystem(input);
      onAnalysisComplete(result);
      setIsOpen(false);
      setInput('');
    } catch (error) {
      console.error("Design System Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1612] text-white text-[12px] font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
      >
        <svg className="w-4 h-4 text-[#b08d57]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        <span className="hidden sm:inline">전문 컨설팅</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#fdfbf7] border border-[#e8dfd0] rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#1a1612] p-10 text-white relative blueprint-grid">
              <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-3xl font-black flex items-center gap-4 serif-title">
                전문 아키텍트 컨설팅
              </h2>
              <p className="mt-4 text-gray-400 text-lg font-medium leading-relaxed">프로젝트의 URL이나 상세 설명을 입력해주세요. 최적의 디자인 시스템과 기술 스택을 제안합니다.</p>
            </div>
            
            <div className="p-10">
              <textarea 
                className="w-full h-48 p-6 border-2 border-[#e8dfd0] rounded-[32px] focus:ring-4 focus:ring-[#b08d57]/10 focus:border-[#b08d57] outline-none transition-all resize-none text-[#1a1612] bg-white placeholder:text-[#dcd0bc] text-base leading-relaxed"
                placeholder="예: https://github.com/my-project 또는 '데이터 시각화가 많은 핀테크 대시보드 시스템을 설계 중입니다...'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              
              <div className="mt-10 flex gap-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 text-[#8a7e72] font-black hover:bg-gray-100 rounded-2xl transition-all"
                >
                  취소
                </button>
                <button 
                  disabled={isAnalyzing || !input.trim()}
                  onClick={handleAnalyze}
                  className="flex-[2] py-4 bg-[#8e2e2c] text-white font-black rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-4 disabled:opacity-30 shadow-xl"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>분석 중...</span>
                    </>
                  ) : (
                    <>컨설팅 리포트 생성</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignSystemModal;
