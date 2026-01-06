// src/app/about/page.tsx
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="px-6 md:px-12 h-20 flex items-center border-b border-gray-100">
        <Link href="/" className="font-bold tracking-tighter text-xl">SENSE TYPING</Link>
      </header>
      
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold mb-8">About Sense Typing</h1>
        
        <div className="prose prose-lg text-gray-600">
          <p>
            폰트를 고르는 일은 단순히 예쁜 모양을 찾는 것이 아닙니다.<br/>
            <strong>&quot;이 폰트가 내 프로젝트의 목적을 달성해줄 수 있는가?&quot;</strong>를 결정하는 일입니다.
          </p>
          <p>
            Sense Typing은 수천 개의 폰트 목록(List)이 아닌,<br/>
            당신의 의도에 맞는 최적의 <strong>결정(Decision)</strong>을 돕기 위해 만들어졌습니다.
          </p>
          
          <h3 className="text-gray-900 font-bold mt-12 mb-4">Our Philosophy</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Intent First:</strong> 이름이 아닌 &apos;사용 목적&apos;으로 찾습니다.</li>
            <li><strong>Safety First:</strong> 라이선스 리스크를 명확히 표시합니다.</li>
            <li><strong>Quality over Quantity:</strong> 검증된 폰트만 큐레이션합니다.</li>
          </ul>

          <div className="mt-12 p-8 bg-gray-50 rounded border border-gray-200">
             <h4 className="font-bold text-gray-900 mb-2">For Enterprise</h4>
             <p className="text-sm mb-4">조직의 문서 리스크 관리가 필요하신가요?</p>
             <Link href="/enterprise" className="text-black font-bold underline">
               Enterprise 솔루션 알아보기 →
             </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
