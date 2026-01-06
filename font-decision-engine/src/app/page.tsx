'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  const [loading, setLoading] = useState(true);
  const [recommendedFonts, setRecommendedFonts] = useState<Font[]>([]);
  const [newFonts, setNewFonts] = useState<Font[]>([]);

  useEffect(() => {
    // Mock data for different sections
    setTimeout(() => {
      setRecommendedFonts([
        { id: '1', name: 'Pretendard', foundry: '길형진 (orioncactus)', license_type: 'OFL', tags: ['고딕', 'UI', '본문'], description: '어디서나 잘 어울리는 본문용 표준 폰트.', preview_image: 'https://raw.githubusercontent.com/orioncactus/pretendard/master/images/cover.png', views: 3710000, source_url: '#' },
        { id: '2', name: 'Gmarket Sans', foundry: 'Gmarket', license_type: 'OFL', tags: ['고딕', '제목', '임팩트'], description: '강력한 제목용 산세리프.', views: 1200000, source_url: '#' },
        { id: '3', name: 'Nanum Myeongjo', foundry: 'Naver', license_type: 'OFL', tags: ['명조', '클래식', '본문'], description: '오랫동안 사랑받은 신뢰의 명조체.', views: 2500000, source_url: '#' },
      ]);
      setNewFonts([
        { id: 'n1', name: 'Hwayeon', foundry: 'Hwayeon', license_type: 'OFL', tags: ['손글씨', '감성'], description: '꽃처럼 피어나는 감성 손글씨', source_url: '#' },
        { id: 'n2', name: 'Dongsungro', foundry: '대구광역시', license_type: 'OFL', tags: ['장식체', '지역서체'], description: '대구 동성로의 활기를 담은 서체', source_url: '#' },
        { id: 'n3', name: 'School-Ansim', foundry: 'KERIS', license_type: 'OFL', tags: ['고딕', '안심'], description: '학교에서 안심하고 쓰는 폰트', source_url: '#' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans selection:bg-black selection:text-white pb-20">
      
      <main className="px-6 md:px-12 py-12 max-w-[1600px] mx-auto">
        
        {/* Search Hero */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1] text-zinc-900">
            당신의 의도를<br/>
            <span className="text-zinc-400">타이핑하십시오.</span>
          </h1>
          
          <form onSubmit={handleSearch} className="relative group mb-8">
            <input 
              type="text" 
              placeholder="어떤 프로젝트를 위한 폰트를 찾으시나요? (예: '신뢰감 있는 핀테크 브랜드')"
              className="w-full py-6 pl-8 pr-16 bg-white border-2 border-gray-100 rounded-2xl text-xl focus:outline-none focus:border-black transition-all shadow-xl shadow-zinc-200/50 group-hover:shadow-2xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black text-white rounded-xl hover:scale-105 transition-transform shadow-lg">
              <Search className="w-6 h-6" />
            </button>
          </form>

          {/* Noonnu-style Preview Input */}
          <div className="relative max-w-md mx-auto">
            <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 text-center">Global Preview</label>
            <input 
              type="text"
              placeholder="테스트 문구를 입력하여 모든 폰트를 비교해보세요"
              className="w-full px-4 py-3 bg-zinc-100/50 border-b border-zinc-200 focus:border-black outline-none text-center text-sm transition-colors rounded-t-lg"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
        </section>

        {/* 1. Recommended Section */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tighter mb-2">추천 폰트</h2>
              <p className="text-zinc-400 text-sm font-medium">가장 많은 사랑을 받는 검증된 폰트들입니다.</p>
            </div>
            <Link href="/index" className="text-xs font-black border-b-2 border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
              전체 보기 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? [1,2,3].map(i => <div key={i} className="aspect-video bg-zinc-100 animate-pulse rounded-xl" />) 
                     : recommendedFonts.map(font => <FontCardV2 key={font.id} font={font} previewText={previewText} />)}
          </div>
        </section>

        {/* 2. New Arrivals Section */}
        <section className="mb-24 bg-zinc-50 -mx-6 md:-mx-12 px-6 md:px-12 py-20 rounded-[3rem]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-black tracking-tighter mb-2">신규 폰트</h2>
                <p className="text-zinc-400 text-sm font-medium">최근에 새롭게 추가된 신선한 감각의 폰트들을 만나보세요.</p>
              </div>
              <Link href="/index?sort=new" className="text-xs font-black border-b-2 border-black pb-1 hover:text-zinc-500 transition-colors">
                더 보기 →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? [1,2,3].map(i => <div key={i} className="aspect-video bg-white animate-pulse rounded-xl" />) 
                       : newFonts.map(font => <FontCardV2 key={font.id} font={font} previewText={previewText} />)}
            </div>
          </div>
        </section>

        {/* 3. Market Highlight */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">Premium Marketplace</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                디자이너를 위한<br/> 특별한 선택, 눈누마켓
              </h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-xl leading-relaxed">
                무료 폰트 이상의 퀄리티와 라이선스 안전성을 보장합니다. 상업적 성공을 위한 완벽한 타이포그래피를 구매하세요.
              </p>
              <Link href="/market" className="inline-block px-8 py-4 bg-white text-indigo-600 font-black rounded-xl hover:scale-105 transition-transform shadow-xl">
                마켓 폰트 둘러보기
              </Link>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 flex items-center justify-center relative group overflow-hidden">
               <div className="text-8xl font-black select-none group-hover:scale-110 transition-transform duration-700">Aa</div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}