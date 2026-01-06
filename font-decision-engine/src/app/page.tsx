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
    }, 500);
  }, []);

  return (
    <div className="min-h-screen text-zinc-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      <main className="px-6 md:px-12 py-24 max-w-[1600px] mx-auto">
        
        {/* Editorial Hero */}
        <section className="mb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black mb-10 tracking-widest uppercase border border-indigo-100 shadow-sm animate-bounce">
            Next-Gen Type Intelligence
          </div>
          <h1 className="text-6xl md:text-[120px] font-black mb-12 tracking-tighter leading-[0.85] text-zinc-900 uppercase italic">
            Sense<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Decision.</span>
          </h1>
          
          <div className="w-full max-w-4xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <form className="relative bg-white border border-zinc-200 rounded-3xl flex items-center p-2 shadow-2xl overflow-hidden">
              <input 
                type="text" 
                placeholder="Describe your design vibe..."
                className="flex-1 py-6 pl-8 pr-4 bg-transparent text-xl font-medium focus:outline-none placeholder:text-zinc-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="px-10 py-6 bg-zinc-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all flex items-center gap-3">
                <Search className="w-6 h-6" /> <span className="hidden md:inline">Analyze Intent</span>
              </button>
            </form>
          </div>

          <div className="mt-16 w-full max-w-lg">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Real-time Global Preview</p>
            <input 
              type="text"
              placeholder="타이핑하여 모든 폰트의 감각을 테스트하세요"
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 outline-none text-center text-lg font-medium transition-all rounded-2xl shadow-inner"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
        </section>

        {/* Dynamic Sections with Grid Variation */}
        <div className="grid grid-cols-12 gap-12">
          
          {/* Featured Sidebar (Sense Metrics) */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-32 p-8 bg-zinc-900 text-white rounded-[2rem] shadow-2xl">
              <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4 tracking-tighter italic">TYPE SENSE<br/>METRICS</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">Minimalism</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">Authority</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[60%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">Legibility</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[95%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs leading-relaxed text-zinc-400">
                  Sense Typing의 AI는 단순 매칭을 넘어 귀하의 의도에 가장 부합하는 <span className="text-white font-bold">결정적 폰트</span>를 선별합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9 space-y-32">
            
            {/* Recommended */}
            <section>
              <div className="flex items-baseline gap-4 mb-12">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">Editor&apos;s Picks</h2>
                <div className="h-px flex-1 bg-zinc-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendedFonts.map(font => <FontCardV2 key={font.id} font={font} previewText={previewText} />)}
              </div>
            </section>

            {/* New Arrivals with a horizontal list style */}
            <section>
              <div className="flex items-baseline gap-4 mb-12">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">Fresh Intelligence</h2>
                <div className="h-px flex-1 bg-zinc-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newFonts.map(font => <FontCardV2 key={font.id} font={font} previewText={previewText} />)}
              </div>
            </section>

          </div>
        </div>

      </main>

    </div>
  )
}