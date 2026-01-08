'use client'

import Link from 'next/link'
import { Search, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-8 flex justify-between items-start pointer-events-none">
        <Link href="/" className="pointer-events-auto group">
          <div className="flex flex-col gap-1">
            <span className="text-2xl serif-display font-black leading-none group-hover:text-brand-gold transition-colors text-brand-black">Sense.</span>
            <span className="mono-label text-zinc-400">지능형 폰트 결제 플랫폼</span>
          </div>
        </Link>

        <div className="flex flex-col items-end gap-8 pointer-events-auto">
          <div className="flex items-center gap-8 bg-white/60 backdrop-blur-xl border border-zinc-200/50 px-8 py-3 rounded-full shadow-2xl">
            <Link href="/index" className="text-[10px] font-black hover:text-brand-gold transition-all uppercase tracking-widest text-brand-black/60">폰트 탐색</Link>
            <Link href="/market" className="text-[10px] font-black hover:text-brand-gold transition-all uppercase tracking-widest text-brand-black/60">유료 자산</Link>
            <Link href="/enterprise" className="text-[10px] font-black hover:text-brand-gold transition-all uppercase tracking-widest text-brand-black/60">기업용 서비스</Link>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white border border-zinc-200 text-brand-black flex items-center justify-center rounded-full transition-all hover:bg-brand-black hover:text-white cursor-pointer shadow-lg">
              <Search className="w-4 h-4" />
            </div>
            <div className="w-12 h-12 bg-brand-black text-white flex items-center justify-center rounded-full transition-all hover:bg-brand-gold cursor-pointer shadow-lg relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-[8px] font-black rounded-full flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Frame Border for Premium Feel */}
      <div className="fixed inset-6 border border-brand-gold/5 pointer-events-none z-[99]"></div>
    </>
  )
}
