'use client'

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import { Search } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [fonts, setFonts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data loader for MVP demo (replace with Supabase fetch later)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFonts([
        { 
          id: '1', name: 'Pretendard', foundry: 'Kil Hyeong-jin', license_type: 'OFL', 
          tags: ['sans-serif', 'clean', 'ui'], 
          description: '어디서나 잘 어울리는 본문용 표준 폰트.',
          preview_image: 'https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png' // Example
        },
        { 
          id: '2', name: 'Gmarket Sans', foundry: 'Gmarket', license_type: 'OFL', 
          tags: ['bold', 'display', 'impact'], 
          description: '강력한 제목용 산세리프. 배너와 이벤트 페이지에 최적.',
        },
        {
          id: '3', name: 'Nanum Myeongjo', foundry: 'Naver', license_type: 'OFL',
          tags: ['serif', 'classic', 'body'],
          description: '오랫동안 사랑받은 신뢰의 명조체.'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to /api/search with query
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans selection:bg-black selection:text-white">
      
      {/* Header / Nav */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between border-b border-gray-200 bg-white/50 backdrop-blur sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tighter">SENSE TYPING</div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
          <a href="/fonts" className="hover:text-black transition-colors">All Fonts</a>
          <a href="/about" className="hover:text-black transition-colors">About</a>
        </nav>
      </header>

      <main className="px-6 md:px-12 py-12 max-w-[1600px] mx-auto">
        
        {/* Search Hero */}
        <section className="mb-20 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Find the font that fits.<br/>
            <span className="text-gray-400 font-medium">Not just the one that looks good.</span>
          </h1>
          
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text" 
              placeholder="Describe your project (e.g. 'Trustworthy Fintech Logo')"
              className="w-full py-4 pl-6 pr-14 bg-white border-2 border-gray-200 rounded-full text-lg focus:outline-none focus:border-black transition-all shadow-sm group-hover:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {['Logo', 'Body Text', 'Cute', 'Serious', 'Modern'].map(tag => (
              <button 
                key={tag} 
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 hover:border-black hover:text-black transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>

        {/* Filters (Visual only for MVP) */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b border-gray-200 sticky top-20 bg-[#FDFBF7] z-40 py-4">
           {['All', 'Sans Serif', 'Serif', 'Display', 'Handwriting', 'Mono'].map((cat, i) => (
             <button key={cat} className={`whitespace-nowrap px-4 py-2 rounded text-sm font-medium transition-colors ${i === 0 ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
               {cat}
             </button>
           ))}
        </div>

        {/* Font Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {fonts.map(font => (
              <FontCardV2 key={font.id} font={font} />
            ))}
          </div>
        )}

      </main>

    </div>
  )
}