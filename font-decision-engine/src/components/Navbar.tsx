'use client'

import Link from 'next/link'
import { Search, Command } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-[100] w-full px-6 py-8 pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center group-hover:rotate-[180deg] transition-transform duration-700">
            <span className="text-white text-xs font-black italic">S.</span>
          </div>
          <span className="text-sm font-black tracking-[0.3em] uppercase hidden sm:block">Sense Intelligence</span>
        </Link>
        
        {/* Minimal Nav Center */}
        <div className="glass px-8 py-3 rounded-full hidden md:flex items-center gap-10">
          <Link href="/index" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-all uppercase tracking-[0.2em]">Discovery</Link>
          <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
          <Link href="/market" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-all uppercase tracking-[0.2em]">Archive</Link>
          <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
          <Link href="/kanban" className="text-[10px] font-black text-zinc-400 hover:text-zinc-900 transition-all uppercase tracking-[0.2em]">Workflow</Link>
        </div>

        {/* Action Right */}
        <div className="flex items-center gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 text-zinc-400 hover:border-zinc-400 transition-all cursor-pointer group">
            <Search className="w-3.5 h-3.5 group-hover:text-zinc-900" />
            <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-3">
               <Command className="w-3 h-3" />
               <span className="text-[10px] font-bold">K</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}