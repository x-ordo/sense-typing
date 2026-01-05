
import React, { useState } from 'react';
import { analyzeDesignSense } from '../services/geminiService';
import { DesignAdvice } from '../types';

const DesignMCP: React.FC = () => {
  const [vibe, setVibe] = useState('');
  const [advice, setAdvice] = useState<DesignAdvice | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
    if (!vibe.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeDesignSense(vibe);
      setAdvice(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hanji-card rounded-[48px] p-10 lg:p-16 mb-32 border-2 border-[#b08d57]/30 relative overflow-hidden group blueprint-bg">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-1000 rotate-12">
        <svg className="w-80 h-80 text-[#b08d57]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#8e2e2c] text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] shadow-lg shadow-red-900/10">Architecture Module</span>
              <div className="h-px w-12 bg-[#b08d57]/30"></div>
            </div>
            <h3 className="serif-title text-4xl lg:text-5xl font-black text-[#1a1612] mb-6 leading-tight">디자인 아키텍처 컨설턴트</h3>
            <p className="text-[#6a5f54] text-lg lg:text-xl font-medium leading-relaxed text-balance">모호한 요구사항을 선명한 디자인 시스템으로 변환합니다. 개발자의 '바이브'를 디자인의 '논리'로 시각화하세요.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
              <textarea 
                className="w-full h-64 p-8 bg-white/60 backdrop-blur border border-[#e8dfd0] rounded-[32px] outline-none focus:ring-2 focus:ring-[#b08d57]/20 transition-all text-base placeholder:text-[#dcd0bc] leading-relaxed shadow-inner"
                placeholder="예: '개발자 도구처럼 데이터가 많으면서도, 애플 웹사이트처럼 세련되고 여백이 느껴지는 다크모드 관리자 페이지를 만들고 싶어요. 바이브코딩으로 구현할 건데 디자인 방향성을 잡아주세요.'"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
              />
              <div className="absolute bottom-6 right-8 text-[11px] font-bold text-[#dcd0bc]">Ambiguity Level: High</div>
            </div>
            <button 
              onClick={handleAnalysis}
              disabled={loading}
              className="w-full py-6 bg-[#1a1612] text-white font-black rounded-[24px] hover:bg-black transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] disabled:opacity-50 group/btn"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="tracking-tight">아키텍처 시각화 중...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  <span className="tracking-tight">디자인 시스템 설계 시작</span>
                </>
              )}
            </button>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-5">
            {advice ? (
              <div className="bg-white rounded-[32px] p-8 lg:p-10 border border-[#e8dfd0] shadow-2xl h-full animate-in zoom-in slide-in-from-right-8 duration-700">
                <div className="flex items-center justify-between mb-10 border-b border-[#f2e9e1] pb-6">
                  <div>
                    <div className="text-[10px] font-black text-[#b08d57] uppercase tracking-[0.2em] mb-2">Design Result</div>
                    <div className="text-3xl font-black text-[#8e2e2c] serif-title tracking-tight">{advice.vibeLevel}</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-2xl">
                    <svg className="w-6 h-6 text-[#8e2e2c]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h4 className="text-[11px] font-black text-[#4a3f35] uppercase tracking-widest mb-3 opacity-60">Layout Blueprint</h4>
                    <p className="text-sm text-[#4a3f35] leading-relaxed font-medium">{advice.layoutAdvice}</p>
                  </section>
                  
                  <section>
                    <h4 className="text-[11px] font-black text-[#4a3f35] uppercase tracking-widest mb-4 opacity-60">Visual Palette</h4>
                    <div className="flex gap-2.5">
                      {advice.colorPalette.map(c => (
                        <div key={c} className="group relative">
                          <div className="w-12 h-12 rounded-2xl border border-black/5 shadow-sm transform transition-transform hover:scale-110 cursor-pointer" style={{ backgroundColor: c }} />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase">{c}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[11px] font-black text-[#4a3f35] uppercase tracking-widest mb-4 opacity-60">Core Components</h4>
                    <div className="flex flex-wrap gap-2">
                      {advice.suggestedComponents.map(comp => (
                        <span key={comp} className="text-[11px] font-black bg-[#fdfbf7] border border-[#e8dfd0] px-4 py-2 rounded-xl text-[#6a5f54] shadow-sm hover:border-[#b08d57] transition-all cursor-default">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-[#e8dfd0] rounded-[32px] flex flex-col items-center justify-center p-12 text-center bg-white/30 backdrop-blur-sm group/empty transition-all">
                <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover/empty:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-[#dcd0bc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <p className="text-sm text-[#dcd0bc] font-black leading-relaxed tracking-tight">
                  바이브가 분석되면<br/>
                  전문적인 디자인 설계도가<br/>
                  여기에 시각화됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignMCP;
