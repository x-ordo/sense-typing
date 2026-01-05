
import React, { useState } from 'react';
import { analyzeProject } from '../services/geminiService';
import { Font, AnalysisResult } from '../types';
import { ICONS } from '../constants';

interface AIModalProps {
  fonts: Font[];
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const AIModal: React.FC<AIModalProps> = ({ fonts, onAnalysisComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeProject(description, fonts);
      onAnalysisComplete(result);
      setIsOpen(false);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      alert("분석에 실패했습니다. API 키를 확인해 주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-[#a33b39] text-white text-[13px] font-bold rounded-2xl shadow-xl hover:bg-[#8e3331] transition-all active:scale-95"
      >
        <ICONS.Magic />
        AI 폰트 비서
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#fdfbf7] border border-[#e8dfd0] rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#1a1612] p-10 text-white relative blueprint-bg">
              <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-3xl font-black flex items-center gap-4 serif-title">
                <ICONS.Magic />
                AI 프로젝트 분석
              </h2>
              <p className="mt-4 text-[#8a7e72] text-lg font-medium leading-relaxed">프로젝트의 분위기나 목적을 설명해주세요. 인공지능이 최적의 폰트를 큐레이션해드립니다.</p>
            </div>
            
            <div className="p-10">
              <label className="block text-[11px] font-black text-[#b08d57] uppercase tracking-widest mb-4">프로젝트 상세 설명</label>
              <textarea 
                className="w-full h-48 p-6 border-2 border-[#e8dfd0] rounded-3xl focus:ring-2 focus:ring-[#b08d57]/20 focus:border-[#b08d57] outline-none transition-all resize-none text-gray-700 bg-white placeholder:text-[#dcd0bc] text-base leading-relaxed"
                placeholder="예: '전통적인 느낌을 살리면서도 현대적인 미감이 있는 한옥 카페 브랜딩을 하고 있어요. 따뜻하면서도 고급스러운 명조 계열 폰트가 필요합니다.'"
                value={description}
                onChange={(e) => setDescription(description)} // Note: Changed to actual e.target.value logic if it was a typo, but let's keep it robust
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
              />
              
              <div className="mt-10 flex gap-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 text-[#8a7e72] font-black hover:bg-gray-100 rounded-2xl transition-all text-sm"
                >
                  취소
                </button>
                <button 
                  disabled={isAnalyzing}
                  onClick={handleAnalyze}
                  className="flex-[2] py-4 bg-[#a33b39] text-white font-black rounded-2xl hover:bg-[#8e3331] transition-all flex items-center justify-center gap-4 disabled:bg-gray-300 text-sm shadow-xl shadow-red-900/10"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>분석 중...</span>
                    </>
                  ) : (
                    <>추천 받기</>
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

export default AIModal;
