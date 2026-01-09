'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Archive, Menu, X } from 'lucide-react'
import SearchModal from './SearchModal'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navLinks = [
    { href: '/', label: '컬렉션' },
    { href: '/market', label: '프리미엄' },
    { href: '/enterprise', label: '기업 서비스' },
  ]

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
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

          {/* Desktop Navigation Links */}
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
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 h-10 px-3 rounded-full text-zinc-500 hover:text-brand-black hover:bg-zinc-100 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:flex items-center gap-1 text-xs text-zinc-400">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 rounded text-[10px] font-medium">⌘K</kbd>
              </span>
            </button>

            {/* Cart Button */}
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-black text-white hover:bg-brand-gold transition-colors relative">
              <Archive className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-red text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-zinc-500 hover:text-brand-black hover:bg-zinc-100 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-brand-beige shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Mobile Search */}
            <button
              onClick={() => {
                setIsMenuOpen(false)
                setIsSearchOpen(true)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 mb-2 bg-zinc-50 rounded-xl text-zinc-500"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">폰트 검색...</span>
            </button>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    pathname === link.href
                      ? 'text-brand-black bg-brand-beige/50'
                      : 'text-zinc-500 hover:text-brand-black hover:bg-zinc-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="mt-4 pt-4 border-t border-brand-beige">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>© 2026 Sense Typing</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-[-1]"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
