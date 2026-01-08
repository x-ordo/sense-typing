export const runtime = 'edge';

import { Check, AlertTriangle, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';

// In a real app, fetch data based on slug
const MOCK_FONT = {
  id: '1',
  name: 'Pretendard',
  foundry: 'Kil Hyeong-jin',
  license_type: 'OFL (Open Font License)',
  description: 'Apple의 시스템 폰트와 유사한 가독성을 가지면서도, 한글에 최적화된 오픈소스 산세리프 폰트입니다. 웹, 앱, 인쇄물 어디에나 안전하게 사용할 수 있는 "Default" 선택지입니다.',
  tags: ['sans-serif', 'clean', 'modern', 'ui', 'body'],
  pros: ['압도적인 가독성', '다양한 굵기(9 weights)', '시스템 폰트 대체 가능'],
  cons: ['너무 흔해서 개성이 부족할 수 있음'],
  usage: ['UI 디자인', '본문 텍스트', '정부/공공기관 문서'],
  source_url: 'https://github.com/orioncactus/pretendard',
  preview_text: '모든 사람은 태어날 때부터 자유로우며 그 존엄과 권리에 있어 동등하다.'
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  // const font = await fetchFont(slug);
  const font = MOCK_FONT; // Placeholder

  return {
    title: `${font.name} - Sense Typing Font Store`,
    description: font.description,
    openGraph: {
      title: font.name,
      description: font.description,
      type: 'article',
    }
  };
}

export default async function FontDetail({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  // const font = await fetchFont(slug);
  const font = MOCK_FONT; 

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Left: Preview & Visuals */}
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-12 min-h-[400px] flex items-center justify-center mb-8">
             <p className="text-4xl md:text-5xl font-medium leading-tight text-gray-900 break-keep text-center" style={{ fontFamily: 'sans-serif' }}>
               {font.preview_text}
             </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-900 text-white p-6 rounded flex items-center justify-center text-xl">Bold Title</div>
             <div className="border border-gray-200 p-6 rounded flex items-center justify-center text-base text-gray-600">Regular Body text example.</div>
          </div>
        </div>

        {/* Right: Decision Engine Data */}
        <div className="w-full md:w-[400px] flex-shrink-0">
          <div className="sticky top-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{font.foundry}</span>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                조회수 1.2k
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{font.name}</h1>
            
            {/* Same Foundry Fonts (Noonnu-style) */}
            <div className="mb-8 p-4 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-tighter">More from {font.foundry}</h3>
               <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-shrink-0 w-20 h-12 bg-white border border-gray-100 rounded flex items-center justify-center text-[8px] font-bold text-gray-300 hover:border-gray-300 cursor-pointer transition-colors">
                      FONT {i}
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {font.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">#{tag}</span>
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {font.description}
            </p>

            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Why this font?
                </h3>
                <ul className="space-y-2">
                  {font.pros.map(pro => (
                    <li key={pro} className="flex gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                 <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Considerations
                </h3>
                <ul className="space-y-2">
                  {font.cons.map(con => (
                    <li key={con} className="flex gap-2 text-sm text-gray-600">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg mb-8 shadow-sm">
               <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Technical Specs</h3>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">지원 형식</span>
                    <span className="font-medium">OTF, TTF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">한글 글자수</span>
                    <span className="font-medium">11,172자 (전체)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">제작자</span>
                    <span className="font-medium">{font.foundry}</span>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg mb-8">
               <h3 className="text-xs font-bold text-blue-600 uppercase mb-4">Market Simulator</h3>
               <div className="mb-4">
                  <label className="block text-[10px] text-blue-400 font-bold mb-2">구매 옵션 선택</label>
                  <select className="w-full bg-white border border-blue-200 text-sm p-2 rounded outline-none">
                    <option>기본 라이선스 (₩20,000)</option>
                    <option>영상/임베딩 포함 (₩50,000)</option>
                    <option>전체 용도 프리미엄 (₩120,000)</option>
                  </select>
               </div>
               <div className="pt-4 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-blue-800">예상 비용</span>
                  <span className="text-lg font-black text-blue-900">₩20,000 ~</span>
               </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-8">
               <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">License Summary</h3>
               <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '인쇄', allowed: true },
                    { label: '웹사이트', allowed: true },
                    { label: '영상', allowed: true },
                    { label: '임베딩', allowed: true },
                    { label: '포장지', allowed: true },
                    { label: 'BI/CI', allowed: true },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center p-2 bg-white rounded border border-gray-100">
                      <span className="text-[10px] text-gray-400 mb-1">{item.label}</span>
                      <span className={`text-xs font-bold ${item.allowed ? 'text-green-600' : 'text-red-600'}`}>
                        {item.allowed ? '허용' : '불가'}
                      </span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Full License Text</h4>
                  <div className="text-[10px] text-gray-500 bg-white/50 p-3 rounded h-24 overflow-y-auto leading-relaxed border border-gray-100">
                    본 폰트 소프트웨어는 SIL OPEN FONT LICENSE Version 1.1에 따라 라이선스가 부여됩니다. 
                    폰트 소프트웨어를 사용하는 것은 본 라이선스의 모든 조건에 동의함을 의미합니다.
                    폰트 소프트웨어는 단독으로 판매될 수 없으며, 다른 소프트웨어와 함께 번들로 제공되거나 재배포될 수 있습니다.
                  </div>
               </div>
            </div>

            <div className="p-6 bg-zinc-900 rounded-lg mb-8">
               <h3 className="text-xs font-bold text-zinc-500 uppercase mb-3">Webfont Snippet</h3>
               <pre className="text-[10px] text-zinc-300 overflow-x-auto p-2 bg-black/30 rounded font-mono">
{`@font-face {
  font-family: '${font.name}';
  src: url('https://cdn.jsdelivr.net/...');
  font-weight: 400;
  font-display: swap;
}`}
               </pre>
               <button className="w-full mt-3 py-2 bg-zinc-800 text-white text-xs font-bold rounded hover:bg-zinc-700 transition-colors">
                 Copy CSS
               </button>
            </div>

            <a 
              href={font.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-4 bg-black text-white text-center font-bold rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Get Font <ExternalLink className="w-4 h-4" />
            </a>

          </div>
        </div>

      </main>
    </div>
  )
}
