'use client'

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import { Search } from 'lucide-react';

interface Font {
  id: string;
  name: string;
  foundry: string;
  license_type: string;
  tags: string[];
  description: string;
  preview_image?: string;
  views?: number;
  source_url: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [fonts, setFonts] = useState<Font[]>([]);
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
          preview_image: 'https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png',
          views: 3710000,
          source_url: 'https://cactus.tistory.com/306'
        },
        { 
          id: '2', name: 'Gmarket Sans', foundry: 'Gmarket', license_type: 'OFL', 
          tags: ['bold', 'display', 'impact'], 
          description: '강력한 제목용 산세리프. 배너와 이벤트 페이지에 최적.',
          views: 1200000,
          source_url: 'https://company.gmarket.co.kr/company/about/company/company--font.asp'
        },
        {
          id: '3', name: 'Nanum Myeongjo', foundry: 'Naver', license_type: 'OFL',
          tags: ['serif', 'classic', 'body'],
          description: '오랫동안 사랑받은 신뢰의 명조체.',
          views: 2500000,
          source_url: 'https://hangeul.naver.com/2014/nanum'
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
    <div className="min-h-screen text-gray-900 font-sans selection:bg-black selection:text-white">
      
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

          {/* Noonnu-style Preview Input */}
          <div className="relative max-w-md mx-auto mb-10">
            <input 
              type="text"
              placeholder="테스트 문구를 입력해보세요"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-300 focus:border-black outline-none text-center text-sm transition-colors"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
          
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
              <FontCardV2 key={font.id} font={font} previewText={previewText} />
            ))}
          </div>
        )}

      </main>

    </div>
  )
}