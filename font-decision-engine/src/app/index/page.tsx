'use client'

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import FontCardV2 from '@/components/FontCardV2';
import { Search, SlidersHorizontal, Grid, List as ListIcon } from 'lucide-react';

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

export default function FreeFontsPage() {
  const [query, setQuery] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [fonts, setFonts] = useState<Font[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setTimeout(() => {
      setFonts([
        { id: '1', name: 'Pretendard', foundry: '길형진 (orioncactus)', license_type: 'OFL', tags: ['고딕', 'UI', '본문'], description: '가장 대중적인 본문용 고딕체', views: 3710000, source_url: '#' },
        { id: '2', name: 'Gmarket Sans', foundry: 'Gmarket', license_type: 'OFL', tags: ['고딕', '제목', '임팩트'], description: '강력한 제목용 산세리프', views: 1200000, source_url: '#' },
        { id: '3', name: 'Nanum Myeongjo', foundry: 'Naver', license_type: 'OFL', tags: ['명조', '클래식', '정갈한'], description: '오랫동안 사랑받은 신뢰의 명조체', views: 2500000, source_url: '#' },
        { id: '4', name: 'Esquire Dream', foundry: 'S-Core', license_type: 'OFL', tags: ['고딕', '현대적', '다양한굵기'], description: '꽉 찬 사각형 구조의 세련된 고딕', views: 900000, source_url: '#' },
        { id: '5', name: 'Jua', foundry: 'Woowa Bros', license_type: 'OFL', tags: ['손글씨', '귀여운', '둥근'], description: '배달의민족 주아체', views: 1500000, source_url: '#' },
        { id: '6', name: 'KCC-Ganpan', foundry: 'KCC', license_type: 'OFL', tags: ['장식체', '레트로', '간판'], description: '복고풍 느낌의 간판 서체', views: 400000, source_url: '#' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-black mb-2">무료 폰트</h1>
        <p className="text-gray-500 text-sm">상업적으로 이용 가능한 다양한 무료 한글 폰트를 탐색해보세요.</p>
      </header>

      {/* Control Bar */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 mb-10 shadow-sm sticky top-24 z-30 backdrop-blur-sm bg-white/90">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex-1 w-full max-w-2xl flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="폰트 이름 또는 키워드 검색"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent focus:border-black focus:bg-white rounded-lg outline-none transition-all text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <input 
              type="text"
              placeholder="미리보기 문구 입력"
              className="flex-1 px-4 py-3 bg-gray-50 border border-transparent focus:border-black focus:bg-white rounded-lg outline-none transition-all text-sm"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
            
            <select className="bg-gray-100 border-none text-xs font-bold py-3 px-4 rounded-lg outline-none cursor-pointer">
              <option>인기순</option>
              <option>최신순</option>
              <option>조회순</option>
              <option>이름순</option>
            </select>

            <button className="flex items-center gap-2 bg-black text-white text-xs font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
              <SlidersHorizontal className="w-3 h-3" /> 필터
            </button>
          </div>
        </div>
      </section>

      {/* Font Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
          : "flex flex-col gap-4"
        }>
          {fonts.map(font => (
            <FontCardV2 key={font.id} font={font} previewText={previewText} />
          ))}
        </div>
      )}
    </div>
  );
}
