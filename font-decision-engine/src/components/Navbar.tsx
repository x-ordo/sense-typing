'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Archive } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: '컬렉션' },
    { href: '/market', label: '프리미엄' },
    { href: '/enterprise', label: '기업 서비스' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-brand-beige">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-xl font-bold tracking-tight text-brand-black group-hover:text-brand-gold transition-colors">
            Sense.
          </span>
          <span className="hidden sm:block text-[10px] font-medium text-zinc-400 tracking-wide">
            Font Decision Engine
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === link.href
                  ? 'text-brand-black bg-zinc-100'
                  : 'text-zinc-500 hover:text-brand-black hover:bg-zinc-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-500 hover:text-brand-black hover:bg-zinc-100 transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-black text-white hover:bg-brand-gold transition-colors relative">
            <Archive className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-red text-[9px] font-bold text-white rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
