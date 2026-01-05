
import React, { useState, useMemo, useEffect } from 'react';
import { Font, Emotion, FontCategory, AnalysisResult, DesignSystemAnalysis } from './types';
import { MOCK_FONTS, ICONS } from './constants';
import FontCard from './components/FontCard';
import DesignSystemModal from './components/DesignSystemModal';
import FontDetailModal from './components/FontDetailModal';
import DesignMCP from './components/DesignMCP';
import DesignSkills from './components/DesignSkills';
import SmartSearch from './components/SmartSearch';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<FontCategory | 'All'>('All');
  const [aiAnalysis, setAiAnalysis] = useState<AnalysisResult | null>(null);
  const [dsAnalysis, setDsAnalysis] = useState<DesignSystemAnalysis | null>(null);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('typesense_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewMode, setViewMode] = useState<'all' | 'bookmarks'>('all');

  useEffect(() => {
    localStorage.setItem('typesense_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Handle AI analysis results and apply filters automatically
  useEffect(() => {
    if (aiAnalysis?.filterCriteria) {
      const { category, emotion } = aiAnalysis.filterCriteria;
      if (category) setSelectedCategory(category as FontCategory);
      if (emotion) setSelectedEmotion(emotion as Emotion);
    }
  }, [aiAnalysis]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const filteredFonts = useMemo(() => {
    return MOCK_FONTS.filter(font => {
      const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           font.creator.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEmotion = selectedEmotion === 'All' || font.emotions.includes(selectedEmotion as Emotion);
      const matchesCategory = selectedCategory === 'All' || font.category === selectedCategory;
      const matchesView = viewMode === 'all' || bookmarks.includes(font.id);
      return matchesSearch && matchesEmotion && matchesCategory && matchesView;
    });
  }, [searchTerm, selectedEmotion, selectedCategory, viewMode, bookmarks]);

  const recommendedFontIds = useMemo(() => {
    return aiAnalysis?.recommendations.map(r => r.fontId) || [];
  }, [aiAnalysis]);

  const sortedFonts = useMemo(() => {
    return [...filteredFonts].sort((a, b) => {
      const aRec = recommendedFontIds.includes(a.id);
      const bRec = recommendedFontIds.includes(b.id);
      if (aRec && !bRec) return -1;
      if (!aRec && bRec) return 1;
      return 0;
    });
  }, [filteredFonts, recommendedFontIds]);

  return (
    <div className="min-h-screen flex flex-col antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-xl border-b border-[#e8dfd0]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-black text-[#1a1612] flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
              <span className="serif-title text-3xl text-[#8e2e2c] tracking-tighter group-hover:scale-105 transition-transform">타입</span>센스
            </h1>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setViewMode('all')}
                className={`text-[13px] font-bold tracking-tight transition-all relative py-1 ${viewMode === 'all' ? 'text-[#8e2e2c]' : 'text-[#8a7e72] hover:text-[#2a241e]'}`}
              >
                마켓플레이스
                {viewMode === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8e2e2c] rounded-full" />}
              </button>
              <button 
                onClick={() => setViewMode('bookmarks')}
                className={`text-[13px] font-bold tracking-tight transition-all relative py-1 flex items-center gap-1.5 ${viewMode === 'bookmarks' ? 'text-[#8e2e2c]' : 'text-[#8a7e72] hover:text-[#2a241e]'}`}
              >
                보관함 {bookmarks.length > 0 && <span className="text-[10px] bg-[#8e2e2c] text-white px-1.5 rounded-full font-black min-w-[18px] text-center">{bookmarks.length}</span>}
                {viewMode === 'bookmarks' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8e2e2c] rounded-full" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="relative group hidden sm:block">
              <input 
                type="text" 
                placeholder="폰트 이름 검색"
                className="w-40 lg:w-56 py-2.5 pl-10 pr-4 bg-white/60 border border-[#e8dfd0] rounded-2xl text-[13px] focus:ring-1 focus:ring-[#b08d57] outline-none transition-all placeholder:text-[#dcd0bc]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#dcd0bc]">
                <ICONS.Search />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with AI Search Integrated */}
      <header className="py-20 lg:py-28 px-6 text-center border-b border-[#e8dfd0] bg-[#fdfbf7] relative overflow-hidden blueprint-bg">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="serif-title text-4xl md:text-6xl font-black text-[#1a1612] leading-[1.1] mb-8 text-balance">
            복잡한 필터 대신,<br/>
            프로젝트의 <span className="text-[#8e2e2c]">바이브</span>를 말해보세요.
          </h2>
          <SmartSearch fonts={MOCK_FONTS} onAnalysisComplete={setAiAnalysis} />
        </div>
      </header>

      {/* Quick Preview & Basic Filter Bar */}
      <section className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-y border-[#e8dfd0] py-6 px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:items-center gap-10">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="미리보기 문구를 입력하세요..."
              className="w-full text-2xl md:text-3xl serif-title font-medium placeholder:text-[#e8dfd0] outline-none border-none py-1 bg-transparent text-[#1a1612] tracking-tight"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
            <select 
              className="bg-[#fdfbf7] border border-[#e8dfd0] rounded-2xl px-5 py-2.5 text-[12px] font-bold text-[#4a3f35] cursor-pointer outline-none hover:border-[#b08d57]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as FontCategory | 'All')}
            >
              <option value="All">전체 스타일</option>
              {Object.values(FontCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <div className="h-6 w-px bg-[#e8dfd0] mx-3"></div>
            <div className="flex items-center gap-2">
              {Object.values(Emotion).map(emo => (
                <button
                  key={emo}
                  onClick={() => setSelectedEmotion(selectedEmotion === emo ? 'All' : emo)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-[12px] font-bold transition-all border ${selectedEmotion === emo ? 'bg-[#8e2e2c] border-[#8e2e2c] text-[#fdfbf7]' : 'bg-white border-[#e8dfd0] text-[#8a7e72] hover:border-[#b08d57]'}`}
                >
                  {emo}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <main className="flex-1 px-6 lg:px-12 py-12 lg:py-20 bg-[#fcfaf7]">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* AI Insights Card (Floating/Top style) */}
          {aiAnalysis && (
            <div className="mb-16 bg-[#1a1612] text-white rounded-[40px] p-10 shadow-2xl animate-in slide-in-from-top-4">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#b08d57] rounded-2xl">
                    <ICONS.Magic />
                  </div>
                  <div>
                    <h3 className="serif-title text-2xl font-black">AI 큐레이션 가이드</h3>
                    <p className="text-[11px] font-black uppercase text-[#b08d57] tracking-widest mt-1">Applying filters for: {aiAnalysis.tone}</p>
                  </div>
                </div>
                <button onClick={() => setAiAnalysis(null)} className="text-gray-500 hover:text-white transition-colors">✕ 닫기</button>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-3xl mb-8">"{aiAnalysis.summary}"</p>
              <div className="flex flex-wrap gap-4">
                {aiAnalysis.recommendations.map((rec, idx) => {
                  const f = MOCK_FONTS.find(font => font.id === rec.fontId);
                  return f ? (
                    <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:border-[#b08d57] transition-all cursor-pointer" onClick={() => setSelectedFont(f)}>
                      <span className="text-xl font-black text-[#b08d57]">{idx + 1}</span>
                      <span className="text-xs font-bold">{f.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {sortedFonts.map(font => (
              <FontCard 
                key={font.id} 
                font={font} 
                previewText={previewText} 
                isRecommended={recommendedFontIds.includes(font.id)}
                isBookmarked={bookmarks.includes(font.id)}
                onBookmark={() => toggleBookmark(font.id)}
                onClick={() => setSelectedFont(font)}
              />
            ))}
          </div>

          {sortedFonts.length === 0 && (
            <div className="py-40 text-center">
              <p className="text-[#8a7e72] serif-title text-3xl mb-8">필터링된 결과가 없습니다.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedEmotion('All'); setSelectedCategory('All'); setViewMode('all'); setAiAnalysis(null);}}
                className="px-10 py-4 bg-[#8e2e2c] text-white font-black rounded-2xl hover:bg-black transition-all"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Auxiliary Tools Section (Reduced prominence) */}
      <section className="py-24 px-6 bg-white border-t border-[#e8dfd0]">
        <div className="max-w-screen-2xl mx-auto lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h3 className="serif-title text-3xl font-black text-[#1a1612] mb-4">부가 기능</h3>
              <p className="text-[#8a7e72] font-medium">폰트 선택 그 이상의 도움이 필요할 때, 전문가 컨설턴트를 호출하세요.</p>
            </div>
            <DesignSystemModal onAnalysisComplete={setDsAnalysis} />
          </div>

          {dsAnalysis && (
            <div className="mb-20 bg-[#fdfbf7] border-2 border-[#1a1612] rounded-[40px] p-10 animate-in zoom-in">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="serif-title text-2xl font-black">디자인 시스템 추천 리포트</h3>
                 <button onClick={() => setDsAnalysis(null)} className="text-gray-400">✕</button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {dsAnalysis.top3.map(ds => (
                   <div key={ds.rank} className="bg-white p-6 rounded-3xl border border-[#e8dfd0] shadow-sm">
                     <h4 className="font-bold text-lg mb-2">{ds.name}</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">{ds.reason}</p>
                   </div>
                 ))}
              </div>
            </div>
          )}

          <div id="consultant" className="opacity-80 hover:opacity-100 transition-opacity">
            <DesignMCP />
            <DesignSkills />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1612] text-[#fdfbf7] py-20 px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <h4 className="serif-title text-3xl font-black tracking-tighter">타입센스</h4>
          <div className="flex gap-10 text-[13px] font-bold text-gray-500">
            <a href="https://noonnu.cc" target="_blank" className="hover:text-white transition-colors">눈누 (noonnu)</a>
            <a href="#" className="hover:text-white transition-colors">라이선스 가이드</a>
            <a href="#" className="hover:text-white transition-colors">이용 약관</a>
          </div>
          <p className="text-[11px] text-gray-700 uppercase font-black tracking-widest">© 2024 TypeSense AI Architecture</p>
        </div>
      </footer>

      {/* Overlays */}
      {selectedFont && (
        <FontDetailModal 
          font={selectedFont} 
          onClose={() => setSelectedFont(null)} 
          previewText={previewText} 
        />
      )}
    </div>
  );
};

export default App;
