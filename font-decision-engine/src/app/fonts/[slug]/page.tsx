// src/app/fonts/[slug]/page.tsx
import Link from 'next/link';
import { ArrowLeft, Check, AlertTriangle, ExternalLink } from 'lucide-react';

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

export default function FontDetail({ params }: { params: { slug: string } }) {
  // const font = await fetchFont(params.slug);
  const font = MOCK_FONT; 

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 h-20 flex items-center border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
      </header>

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
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">{font.foundry}</span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{font.name}</h1>
            
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

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-8">
               <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">License Type</h3>
               <p className="font-bold text-gray-900">{font.license_type}</p>
               <p className="text-xs text-gray-500 mt-1">
                 * Always check the official license before use.
               </p>
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
