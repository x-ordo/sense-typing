'use client'

import { useEffect, useState } from 'react'
import TagChip from './TagChip'
import PremiumLock from './PremiumLock'
import { isPremiumTag } from '@/lib/access'
import { trackSignal } from '@/lib/paywall'

// Mock Use Cases for the Filter (simulating the "Intent Detection")
const USE_CASES = [
  { id: 'all', name: '전체 보기', risk: 0 },
  { id: 'ir', name: '투자 IR (High Risk)', risk: 5 },
  { id: 'gov', name: '정부/공공 (High Risk)', risk: 5 },
  { id: 'contract', name: '계약서 (High Risk)', risk: 5 },
  { id: 'landing', name: '랜딩페이지', risk: 3 },
]

export default function FontGrid() {
  const [fonts, setFonts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUseCase, setSelectedUseCase] = useState('all')

  useEffect(() => {
    // Initial fetch
    fetchFonts('권위적_압도감')
  }, [])

  const fetchFonts = (tag: string) => {
    setLoading(true)
    fetch(`/api/search?tag=${tag}`)
      .then(res => res.json())
      .catch(err => {
        console.error('Failed to fetch fonts:', err)
        return []
      })
      .then(data => {
        if (!data || !Array.isArray(data)) {
           setFonts([]);
           setLoading(false);
           return;
        }

        const formatted = data.map((item: any) => ({
          ...item.fonts,
          tags: [item.emotion_tags], 
          hasPremium: isPremiumTag(item.emotion_tags)
        }))
        
        setFonts(formatted)
        setLoading(false)
      })
  }

  const handleUseCaseClick = (uc: any) => {
      setSelectedUseCase(uc.id)
      if (uc.risk >= 4) {
          trackSignal('useCaseSelected')
      }
      // For MVP demo, we just re-fetch or filter. 
      // Here we just keep the current list but the signal is tracked.
  }

  const handleFontClick = () => {
      trackSignal('detailViewed')
      // In a real app, this would open a modal or navigate
  }

  return (
    <div className="w-full">
        {/* Intent Filter Bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {USE_CASES.map(uc => (
                <button
                    key={uc.id}
                    onClick={() => handleUseCaseClick(uc)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                        ${selectedUseCase === uc.id 
                            ? 'bg-black text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    `}
                >
                    {uc.name}
                </button>
            ))}
        </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-gray-50 animate-pulse border border-gray-100 p-8"></div>
            ))}
        </div>
      ) : fonts.length === 0 ? (
          <div className="w-full text-center py-20 text-gray-500">
              <p>연결된 데이터가 없습니다. (Supabase 연결 확인 필요)</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fonts.map((font: any, i: number) => (
            <div 
                key={i} 
                className="group relative bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 p-8 flex flex-col items-start h-full shadow-sm hover:shadow-md cursor-pointer"
                onClick={handleFontClick}
            >
              {/* Header */}
              <div className="w-full flex justify-between items-baseline mb-6">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {font.name}
                </h3>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  {font.foundry}
                </span>
              </div>

              {/* Preview */}
              <div className="w-full h-32 mb-6 flex items-center text-4xl text-gray-800 break-keep leading-tight font-[family-name:var(--font-geist-sans)]">
                 {font.preview_url ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={font.preview_url} alt={font.name} className="max-w-full max-h-full object-contain" />
                ) : (
                   <span style={{ fontFamily: "sans-serif" }}>다람쥐 헌 쳇바퀴에 타고파</span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 mt-auto" onClick={(e) => e.stopPropagation()}>
                {font.tags.map((tag: any) => (
                  <TagChip key={tag.id} tag={tag} />
                ))}
              </div>

              {/* Premium Lock - Reacts to global state */}
              <div className="w-full" onClick={(e) => e.stopPropagation()}>
                <PremiumLock />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
