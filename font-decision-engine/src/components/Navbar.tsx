'use client'

import Link from 'next/link'
import { Search, Command, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-[100] w-full px-8 py-10 pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Atelier Logo */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-black flex items-center justify-center transition-all duration-700 group-hover:scale-95 group-hover:bg-brand-gold">
            <span className="text-white text-lg serif-title font-black italic">S.</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-[0.4em] uppercase text-brand-black">Sense Intelligence</span>
            <span className="text-[8px] font-bold tracking-[0.2em] text-brand-gold uppercase">Digital Atelier</span>
          </div>
        </Link>
        
        {/* Sophisticated Menu */}
        <div className="hidden lg:flex items-center gap-12 bg-white/80 backdrop-blur-2xl border-thin px-12 py-4 rounded-full shadow-sm">
          <Link href="/index" className="text-[9px] font-black text-brand-black/40 hover:text-brand-black transition-all uppercase tracking-[0.3em]">Curated Archive</Link>
          <div className="w-[1px] h-3 bg-brand-beige"></div>
          <Link href="/market" className="text-[9px] font-black text-brand-black/40 hover:text-brand-black transition-all uppercase tracking-[0.3em]">Premium Assets</Link>
          <div className="w-[1px] h-3 bg-brand-beige"></div>
          <Link href="/enterprise" className="text-[9px] font-black text-brand-black/40 hover:text-brand-black transition-all uppercase tracking-[0.3em]">Governance</Link>
        </div>

        {/* Global Utilities */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 bg-brand-black px-6 py-3 rounded-full text-white cursor-pointer hover:bg-brand-gold transition-all duration-500">
            <Search className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Consult AI</span>
          </div>
          <button className="relative p-2 text-brand-black hover:text-brand-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-red rounded-full"></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
