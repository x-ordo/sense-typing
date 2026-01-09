'use client'

import { Suspense, useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Users,
  Search,
  Filter,
  Star,
  ChevronDown,
  Loader2,
  UserPlus,
} from 'lucide-react'
import { createAuthClient } from '@/lib/supabase/auth'
import { ExpertCard } from '@/components/experts'
import type { Expert, ExpertSpecialty } from '@/types/expert'

const SPECIALTY_OPTIONS: { value: ExpertSpecialty; label: string }[] = [
  { value: 'typography-consulting', label: '타이포그래피 컨설팅' },
  { value: 'brand-identity', label: '브랜드 아이덴티티' },
  { value: 'catchphrase', label: '캐치프레이즈/슬로건' },
  { value: 'logo-design', label: '로고 디자인' },
  { value: 'font-pairing', label: '폰트 조합' },
  { value: 'visual-identity', label: '비주얼 아이덴티티' },
]

const SORT_OPTIONS = [
  { value: 'rating', label: '평점순' },
  { value: 'reviews', label: '리뷰 많은순' },
  { value: 'projects', label: '프로젝트순' },
  { value: 'price_low', label: '가격 낮은순' },
  { value: 'price_high', label: '가격 높은순' },
]

function ExpertsContent() {
  const searchParams = useSearchParams()
  const [experts, setExperts] = useState<Expert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const fetchExperts = useCallback(async () => {
    setIsLoading(true)
    const supabase = createAuthClient()

    try {
      let query = supabase
        .from('experts')
        .select('*')
        .eq('is_available', true)

      // Apply specialty filter
      if (selectedSpecialty) {
        query = query.contains('specialties', [selectedSpecialty])
      }

      // Apply search
      if (searchQuery) {
        query = query.or(`display_name.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`)
      }

      // Apply sorting
      switch (sortBy) {
        case 'rating':
          query = query.order('rating_avg', { ascending: false })
          break
        case 'reviews':
          query = query.order('review_count', { ascending: false })
          break
        case 'projects':
          query = query.order('completed_projects', { ascending: false })
          break
        case 'price_low':
          query = query.order('minimum_project_rate', { ascending: true, nullsFirst: false })
          break
        case 'price_high':
          query = query.order('minimum_project_rate', { ascending: false })
          break
      }

      const { data, error } = await query

      if (error) throw error
      setExperts(data || [])
    } catch (error) {
      console.error('Error fetching experts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedSpecialty, searchQuery, sortBy])

  useEffect(() => {
    // Check for specialty in URL params
    const specialty = searchParams.get('specialty')
    if (specialty && SPECIALTY_OPTIONS.some(s => s.value === specialty)) {
      setSelectedSpecialty(specialty)
    }
  }, [searchParams])

  useEffect(() => {
    fetchExperts()
  }, [fetchExperts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchExperts()
  }

  return (
    <>
      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-brand-beige p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="전문가 이름, 전문 분야로 검색..."
              className="w-full pl-12 pr-4 py-3 bg-brand-paper rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
            />
          </div>

          {/* Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
              showFilters
                ? 'bg-brand-gold text-white'
                : 'bg-brand-paper text-zinc-600 hover:bg-brand-beige'
            }`}
          >
            <Filter className="w-5 h-5" />
            필터
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-brand-paper rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </form>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-brand-beige">
            <p className="text-sm font-medium text-zinc-500 mb-3">전문 분야</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSpecialty('')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  !selectedSpecialty
                    ? 'bg-brand-gold text-white'
                    : 'bg-brand-paper text-zinc-600 hover:bg-brand-beige'
                }`}
              >
                전체
              </button>
              {SPECIALTY_OPTIONS.map((specialty) => (
                <button
                  key={specialty.value}
                  onClick={() => setSelectedSpecialty(specialty.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedSpecialty === specialty.value
                      ? 'bg-brand-gold text-white'
                      : 'bg-brand-paper text-zinc-600 hover:bg-brand-beige'
                  }`}
                >
                  {specialty.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expert List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
        </div>
      ) : experts.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-zinc-500">
              <span className="font-bold text-brand-black">{experts.length}</span>명의 전문가
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <Users className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-brand-black mb-2">
            전문가를 찾지 못했습니다
          </h3>
          <p className="text-zinc-500 mb-6">
            다른 검색어나 필터를 사용해보세요.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedSpecialty('')
            }}
            className="px-6 py-2 bg-brand-gold text-white rounded-xl hover:bg-brand-gold/90 transition-colors"
          >
            필터 초기화
          </button>
        </div>
      )}
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
    </div>
  )
}

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            전문가 마켓플레이스
          </div>
          <h1 className="text-4xl font-bold text-brand-black mb-4">
            폰트 & 브랜딩 전문가를 만나보세요
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            타이포그래피, 브랜드 아이덴티티, 캐치프레이즈 등
            <br />
            각 분야 최고의 전문가들이 여러분의 프로젝트를 도와드립니다.
          </p>
        </div>

        {/* Content with Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          <ExpertsContent />
        </Suspense>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-br from-brand-gold to-brand-gold/80 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              전문가로 활동하고 싶으신가요?
            </h2>
            <p className="text-white/80 mb-8">
              타이포그래피, 브랜딩, 캐치프레이즈 분야의 전문가라면
              <br />
              센스타이핑 전문가로 활동해보세요.
            </p>
            <Link
              href="/experts/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-gold font-bold rounded-xl hover:bg-white/90 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              전문가 신청하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
