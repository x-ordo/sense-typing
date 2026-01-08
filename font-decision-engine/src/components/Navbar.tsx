'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-12 flex justify-between items-start pointer-events-none">
        <Link href="/" className="pointer-events-auto group">
          <div className="flex flex-col gap-1">
            <span className="text-2xl serif-display font-black leading-none group-hover:text-brand-gold transition-colors">Sense.</span>
            <span className="mono-label text-zinc-400">Intelligence Bureau</span>
          </div>
        </Link>

        <div className="flex flex-col items-end gap-12 pointer-events-auto">
          <div className="flex items-center gap-10 bg-white/40 backdrop-blur-md border border-zinc-200/50 px-8 py-3 rounded-full shadow-2xl">
            <Link href="/index" className="mono-label hover:text-brand-gold transition-all">Archive</Link>
            <Link href="/market" className="mono-label hover:text-brand-gold transition-all">Market</Link>
            <Link href="/enterprise" className="mono-label hover:text-brand-gold transition-all">Studio</Link>
          </div>
          
          <div className="group cursor-pointer">
            <div className="w-12 h-12 bg-brand-black text-white flex items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-90 group-hover:bg-brand-gold">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative Frame Line */}
      <div className="fixed inset-10 border border-brand-gold/10 pointer-events-none z-[99]"></div>
    </>
  )
}