
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

  useEffect(() => {
    if (aiAnalysis?.filterCriteria) {
      const { category, emotion } = aiAnalysis.filterCriteria;
      if (category && category !== 'All') setSelectedCategory(category as FontCategory);
      if (emotion && emotion !== 'All') setSelectedEmotion(emotion as Emotion);
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
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      {/* Navigation */}
      <nav className="sticky top-0 z-[90] bg-white/80 backdrop-blur-3xl border-b border-[#e8dfd0]">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 h-[72px] sm:h-[84px] flex items-center justify-between">
          <div className="flex items-center gap-10 sm:gap-20">
            <h1 
              className="text-2xl sm:text-3xl font-black text-[#1a1612] flex items-center gap-2 cursor-pointer group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="serif-title text-3xl sm:text-4xl text-[#8e2e2c] tracking-tighter">타입</span>센스
            </h1>
            <div className="hidden md:flex items-center gap-12">
              <button onClick={() => setViewMode('all')} className={`text-[14px] font-black transition-all relative py-2 ${viewMode === 'all' ? 'text-[#8e2e2c]' : 'text-[#8a7e72] hover:text-[#1a1612]'}`}>
                Marketplace
                {viewMode === 'all' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#8e2e2c] rounded-full" />}
              </button>
              <button onClick={() => setViewMode('bookmarks')} className={`text-[14px] font-black transition-all relative py-2 flex items-center gap-2 ${viewMode === 'bookmarks' ? 'text-[#8e2e2c]' : 'text-[#8a7e72] hover:text-[#1a1612]'}`}>
                Saved {bookmarks.length > 0 && <span className="text-[10px] bg-[#8e2e2c] text-white px-2 py-0.5 rounded-full min-w-[20px] text-center">{bookmarks.length}</span>}
                {viewMode === 'bookmarks' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#8e2e2c] rounded-full" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="relative group hidden lg:block">
              <input 
                type="text" 
                placeholder="Search Fonts..."
                className="w-56 xl:w-80 py-3.5 pl-12 pr-6 bg-gray-50/50 border-2 border-[#e8dfd0] rounded-2xl text-[14px] font-bold focus:border-[#b08d57] outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b08d57]"><ICONS.Search /></div>
            </div>
            <div className="h-8 w-px bg-[#e8dfd0] hidden sm:block"></div>
            <DesignSystemModal onAnalysisComplete={setDsAnalysis} />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        {/* Hero */}
        <header className="py-24 sm:py-40 px-6 text-center border-b border-[#e8dfd0] bg-[#fdfbf7] blueprint-grid">
          <div className="max-w-5xl mx-auto relative z-10 text-reveal">
            <h2 className="serif-title text-5xl sm:text-7xl lg:text-9xl font-black text-[#1a1612] leading-[0.95] mb-10 text-balance tracking-tighter">
              The <span className="text-[#8e2e2c]">Architecture</span><br/> of Korean Typography.
            </h2>
            <p className="text-[#6a5f54] text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed font-medium text-balance opacity-80">
              눈누를 넘어선 차세대 폰트 쇼핑 경험. <br className="hidden sm:block"/> AI 컨설턴트와 함께 당신의 프로젝트에 최적화된 서체를 설계하세요.
            </p>
          </div>
        </header>

        {/* Dynamic Sticky Utility Bar */}
        <section className="sticky top-[72px] sm:top-[84px] z-[80] bg-white/90 backdrop-blur-3xl border-y border-[#e8dfd0] py-6 sm:py-10 px-6 sm:px-12">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="미리보기 텍스트를 입력해 보세요."
                className="w-full text-3xl sm:text-5xl lg:text-6xl serif-title font-medium placeholder:text-[#e8dfd0] outline-none border-none py-2 bg-transparent text-[#1a1612] tracking-tighter"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 custom-scrollbar scroll-smooth">
              <select 
                className="bg-[#fdfbf7] border-2 border-[#e8dfd0] rounded-2xl px-6 py-4 text-[13px] font-black text-[#4a3f35] cursor-pointer outline-none hover:border-[#b08d57] transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as FontCategory | 'All')}
              >
                <option value="All">All Categories</option>
                {Object.values(FontCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div className="h-10 w-px bg-[#e8dfd0] mx-4 flex-shrink-0"></div>
              <div className="flex items-center gap-3">
                {Object.values(Emotion).map(emo => (
                  <button
                    key={emo}
                    onClick={() => setSelectedEmotion(selectedEmotion === emo ? 'All' : emo)}
                    className={`whitespace-nowrap px-7 py-4 rounded-2xl text-[13px] font-black transition-all border-2 ${selectedEmotion === emo ? 'bg-[#8e2e2c] border-[#8e2e2c] text-white shadow-2xl' : 'bg-white border-[#e8dfd0] text-[#8a7e72] hover:border-[#b08d57]'}`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Grid */}
        <main className="flex-1 px-6 sm:px-12 py-16 sm:py-32 bg-[#fcfaf7] mobile-safe-bottom">
          <div className="max-w-screen-2xl mx-auto">
            
            {/* AI Result Box */}
            {aiAnalysis && (
              <div className="mb-20 sm:mb-32 bg-[#1a1612] text-white rounded-[64px] p-12 sm:p-20 shadow-2xl animate-in slide-in-from-top-12 duration-700 relative overflow-hidden group">
                <div className="absolute inset-0 blueprint-grid opacity-10"></div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16 relative z-10">
                  <div className="flex items-center gap-8">
                    <div className="p-6 bg-[#b08d57] rounded-[32px] shadow-2xl animate-pulse">
                      <ICONS.Magic />
                    </div>
                    <div>
                      <h3 className="serif-title text-4xl sm:text-5xl font-black">Curation Report</h3>
                      <p className="text-[13px] font-black uppercase text-[#b08d57] tracking-[0.3em] mt-4">VIBE ARCHITECTURE: {aiAnalysis.tone}</p>
                    </div>
                  </div>
                  <button onClick={() => setAiAnalysis(null)} className="px-8 py-3.5 bg-white/10 hover:bg-white/20 rounded-2xl text-[14px] font-black transition-all border border-white/10">Close Report</button>
                </div>
                <p className="text-gray-400 text-xl sm:text-3xl leading-snug max-w-5xl mb-16 italic font-medium relative z-10">"{aiAnalysis.summary}"</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {aiAnalysis.recommendations.map((rec, idx) => {
                    const f = MOCK_FONTS.find(font => font.id === rec.fontId);
                    return f ? (
                      <div key={idx} className="bg-white/5 border border-white/20 p-8 rounded-[40px] flex items-center gap-6 hover:bg-white/10 hover:border-[#b08d57] transition-all cursor-pointer group/item" onClick={() => setSelectedFont(f)}>
                        <span className="text-4xl font-black text-[#b08d57]">{idx + 1}</span>
                        <div>
                          <span className="text-lg font-black block">{f.name}</span>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{f.category}</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 sm:gap-16">
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
              <div className="py-60 text-center">
                <p className="text-[#8a7e72] serif-title text-5xl mb-12">No fonts match your architecture.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedEmotion('All'); setSelectedCategory('All'); setAiAnalysis(null);}}
                  className="px-16 py-6 bg-[#8e2e2c] text-white font-black rounded-[32px] hover:bg-black transition-all shadow-2xl text-lg"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Sidekick Assistant */}
      <SmartSearch fonts={MOCK_FONTS} onAnalysisComplete={setAiAnalysis} />

      {/* Footer */}
      <footer className="bg-[#1a1612] text-[#fdfbf7] py-32 px-6 lg:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24 relative">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#b08d57]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[200px] pointer-events-none"></div>
          <div className="max-w-lg relative z-10">
            <h4 className="serif-title text-6xl font-black mb-10 tracking-tighter">타입센스</h4>
            <p className="text-[#8a7e72] text-xl leading-relaxed mb-16 font-medium italic opacity-70">
              The premium destination for Korean typography. <br/>
              Powered by Gemini AI Intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-24 relative z-10">
             <div className="space-y-10">
               <h5 className="text-[14px] font-black uppercase text-[#b08d57] tracking-[0.4em]">Inventory</h5>
               <ul className="space-y-6 text-[16px] text-gray-500 font-bold">
                 <li><a href="https://noonnu.cc" target="_blank" className="hover:text-white transition-colors">Noonnu (눈누)</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Free Fonts</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Premium Fonts</a></li>
               </ul>
             </div>
             <div className="space-y-10">
               <h5 className="text-[14px] font-black uppercase text-[#b08d57] tracking-[0.4em]">Architect</h5>
               <ul className="space-y-6 text-[16px] text-gray-500 font-bold">
                 <li><a href="#" className="hover:text-white transition-colors">AI Sidekick</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Design Systems</a></li>
               </ul>
             </div>
          </div>
        </div>
      </footer>

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
