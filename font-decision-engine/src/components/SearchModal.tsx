'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Search, X, ArrowRight, Command } from 'lucide-react'
import Link from 'next/link'
import { MOCK_FONTS } from '@/lib/mock-data'
import type { FontCardProps } from '@/types/font'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FontCardProps[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Search logic
  const searchFonts = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const q = searchQuery.toLowerCase()
    const filtered = MOCK_FONTS.filter(font => {
      const nameMatch = font.name.toLowerCase().includes(q)
      const foundryMatch = font.foundry?.toLowerCase().includes(q)
      const descMatch = font.description?.toLowerCase().includes(q)
      const tagMatch = font.tags?.some(tag => tag.toLowerCase().includes(q))
      return nameMatch || foundryMatch || descMatch || tagMatch
    })

    setResults(filtered.slice(0, 8))
    setSelectedIndex(0)
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchFonts(query)
    }, 150)
    return () => clearTimeout(timer)
  }, [query, searchFonts])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = `/fonts/${results[selectedIndex].id}`
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-beige">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="폰트 이름, 태그, 제작사로 검색..."
            className="flex-1 text-base outline-none placeholder:text-zinc-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query.trim() === '' ? (
            // Empty state with suggestions
            <div className="p-5">
              <p className="text-xs font-medium text-zinc-400 mb-3">추천 검색어</p>
              <div className="flex flex-wrap gap-2">
                {['산세리프', '손글씨', '세리프', '고딕', '명조', '귀여운'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 text-xs font-medium text-zinc-600 bg-zinc-100 rounded-full hover:bg-brand-gold/10 hover:text-brand-gold transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            // No results
            <div className="p-8 text-center">
              <p className="text-zinc-400 text-sm">
                &apos;{query}&apos;에 대한 검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            // Results list
            <div className="py-2">
              {results.map((font, index) => (
                <Link
                  key={font.id}
                  href={`/fonts/${font.id}`}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                    index === selectedIndex
                      ? 'bg-brand-gold/10'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  {/* Font Preview */}
                  <div className="w-12 h-12 bg-brand-beige/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-brand-black">
                      {font.name.charAt(0)}
                    </span>
                  </div>

                  {/* Font Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-black truncate">
                        {font.name}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        font.license_type === 'ofl' || font.license_type === 'free'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-brand-gold/10 text-brand-gold'
                      }`}>
                        {font.license_type === 'ofl' || font.license_type === 'free' ? 'FREE' : 'PAID'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {font.foundry} · {font.tags?.slice(0, 2).join(', ')}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className={`w-4 h-4 transition-colors ${
                    index === selectedIndex ? 'text-brand-gold' : 'text-zinc-300'
                  }`} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-brand-beige bg-zinc-50 flex items-center justify-between text-[10px] text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-[9px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-[9px]">↓</kbd>
              <span className="ml-1">이동</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-[9px]">Enter</kbd>
              <span className="ml-1">선택</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-[9px]">Esc</kbd>
              <span className="ml-1">닫기</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>K로 열기</span>
          </span>
        </div>
      </div>
    </div>
  )
}
