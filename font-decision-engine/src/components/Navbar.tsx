// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Search, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-black tracking-tighter text-black">
            SENSE TYPING
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">추천 폰트</Link>
            <Link href="/index" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">무료 폰트</Link>
            <Link href="/market" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">마켓</Link>
            <Link href="/questions" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">무슨 폰트?</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-black focus-within:bg-white transition-all">
            <input 
              type="text" 
              placeholder="폰트 검색" 
              className="bg-transparent outline-none text-xs w-40"
            />
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-5 h-5 text-gray-700" />
          </button>
          
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          <Link href="/" className="text-sm font-bold text-gray-900">추천 폰트</Link>
          <Link href="/index" className="text-sm font-bold text-gray-900">무료 폰트</Link>
          <Link href="/market" className="text-sm font-bold text-gray-900">마켓</Link>
          <Link href="/questions" className="text-sm font-bold text-gray-900">무슨 폰트?</Link>
        </div>
      )}
    </nav>
  )
}
