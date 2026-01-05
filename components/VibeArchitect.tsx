
import React, { useState } from 'react';
import { analyzeDesignSense } from '../services/geminiService';
import { DesignAdvice } from '../types';
import { ICONS } from '../constants';

const VibeArchitect: React.FC = () => {
  const [vibe, setVibe] = useState('');
  const [advice, setAdvice] = useState<DesignAdvice | null>(null);
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    if (!vibe.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeDesignSense(vibe);
      setAdvice(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/40 border border-[#e8dfd0] rounded-[32px] p-8 vibe-glow mb-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="serif-title text-2xl font-black text-[#4a3f35] mb-2 flex items-center gap-2">
            <span className="text-[#b08d57]">◈</span> Vibe Design 아키텍트
          </h3>
          <p className="text-sm text-[#8a7e72] mb-6">"바이브 코딩은 되는데 디자인은 안 되나요?" 당신의 결과물에 디자인 감각을 입혀드립니다.</p>
          
          <div className="space-y-4">
            <textarea 
              className="w-full h-32 p-4 bg-white/50 border border-[#e8dfd0] rounded-2xl outline-none focus:ring-2 focus:ring-[#b08d57]/20 transition-all text-sm placeholder:text-[#dcd0bc]"
              placeholder="현재 프로젝트의 바이브를 설명해주세요. (예: 다크모드 대시보드인데 좀 더 힙하고 전문적인 느낌이 필요해요)"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
            />
            <button 
              disabled={loading}
              onClick={getAdvice}
              className="w-full py-4 bg-[#2a241e] text-[#fdfbf7] font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "바이브 설계하기"}
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-[200px]">
          {advice ? (
            <div className="bg-white/80 p-6 rounded-2xl border border-[#e8dfd0] animate-in fade-in slide-in-from-right-4 duration-500 h-full">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase text-[#b08d57] tracking-widest">Recommended Vibe</span>
                <span className="text-xs font-bold text-[#8e2e2c] bg-red-50 px-2 py-0.5 rounded">{advice.vibeLevel}</span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xs font-black text-[#4a3f35] uppercase mb-2">Layout Strategy</h4>
                <p className="text-sm text-[#5a4f44] leading-relaxed">{advice.layoutAdvice}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-black text-[#4a3f35] uppercase mb-2">Palette</h4>
                <div className="flex gap-2">
                  {advice.colorPalette.map(color => (
                    <div key={color} className="group relative">
                      <div className="w-8 h-8 rounded-full border border-black/5 shadow-sm" style={{ backgroundColor: color }} />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-[#4a3f35] uppercase mb-2">Essential Components</h4>
                <div className="flex flex-wrap gap-2">
                  {advice.suggestedComponents.map(comp => (
                    <span key={comp} className="px-2 py-1 bg-[#fdfbf7] border border-[#e8dfd0] text-[10px] font-bold text-[#8a7e72] rounded-md">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-center flex-col items-center justify-center border-2 border-dashed border-[#e8dfd0] rounded-2xl p-12 text-center text-[#dcd0bc]">
              <svg className="w-12 h-12 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.674a1 1 0 00.922-.617l2.108-4.742A1 1 0 0016.446 10h-2.11l1.11-3.33a1 1 0 00-1.897-.633L10.22 11.666a1 1 0 00.893 1.334h2.22l-1.11 3.33a1 1 0 00.923.67z" /></svg>
              <p className="text-sm font-medium">설계 결과를 기다리고 있습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeArchitect;
