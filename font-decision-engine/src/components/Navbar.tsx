// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Search, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-100">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-black tracking-tighter text-zinc-900 uppercase italic">
            Sense<span className="text-indigo-600">.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/index" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]">Discovery</Link>
            <Link href="/market" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]">Market</Link>
            <Link href="/kanban" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]">Workflow</Link>
            <Link href="/questions" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]">Identity</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-zinc-100 rounded-xl px-4 py-2 group focus-within:bg-zinc-50 transition-all border border-transparent focus-within:border-zinc-200">
            <input 
              type="text" 
              placeholder="Explore Type..." 
              className="bg-transparent outline-none text-[10px] font-bold w-32 placeholder:text-zinc-400 uppercase tracking-widest"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 group-focus-within:text-zinc-900" />
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
