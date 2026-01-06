import FontGrid from '@/components/FontGrid'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 
        Design Requirement:
        - Outer Margin: >15% width, >10% height
        - Content Max Width: 1200px
      */}
      <main className="w-full min-h-screen flex flex-col items-center py-[10vh] px-[5vw] md:px-[10vw] lg:px-[15vw]">
        
        {/* Header Section */}
        <header className="w-full max-w-[1200px] mb-24 text-center md:text-left">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
            Font Decision Engine
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1] mb-8">
            Fonts are free.<br />
            <span className="text-gray-400">Decisions are premium.</span>
          </h1>
          <p className="max-w-xl text-lg text-gray-600 leading-relaxed">
            감으로 고르지 마세요. 틀리면 비용이 발생합니다.<br/>
            이 엔진은 <strong>리스크가 제거된 검증된 선택지</strong>만 보여줍니다.
          </p>
        </header>

        {/* Grid Section */}
        <section className="w-full max-w-[1200px]">
          <FontGrid />
        </section>

        {/* Footer */}
        <footer className="w-full max-w-[1200px] mt-32 border-t border-gray-100 pt-8 flex justify-between text-sm text-gray-400">
          <div>
            &copy; 2024 Font Decision Engine.
          </div>
          <div className="flex gap-6">
            <span>Terms</span>
            <span>Privacy</span>
            <span>B2B Inquiries</span>
          </div>
        </footer>

      </main>
    </div>
  )
}
