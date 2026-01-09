'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  User,
  LogOut,
  Settings,
  Heart,
  ShoppingBag,
  ChevronDown,
  Loader2
} from 'lucide-react'
import { useAuth } from './AuthProvider'

export default function UserMenu() {
  const router = useRouter()
  const { user, profile, isLoading, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut()
    setIsOpen(false)
    router.push('/')
    router.refresh()
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-brand-beige/50 flex items-center justify-center">
        <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
      </div>
    )
  }

  // Not logged in - show login button
  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-2 px-4 py-2 bg-brand-black text-white text-sm font-medium rounded-full hover:bg-brand-gold hover:text-brand-black transition-all"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">로그인</span>
      </Link>
    )
  }

  // Get display name or fallback
  const displayName = profile?.display_name || user.email?.split('@')[0] || '사용자'
  const avatarUrl = profile?.avatar_url
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-brand-beige/50 transition-all"
      >
        {/* Avatar */}
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border border-brand-beige"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-sm font-bold text-brand-black">
            {initials}
          </div>
        )}
        <span className="hidden sm:block text-sm font-medium text-brand-black max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-brand-beige overflow-hidden z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 bg-brand-beige/30 border-b border-brand-beige">
            <p className="text-sm font-medium text-brand-black truncate">{displayName}</p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/mypage"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-brand-black hover:bg-brand-beige/30 transition-colors"
            >
              <User className="w-4 h-4 text-zinc-400" />
              마이페이지
            </Link>
            <Link
              href="/mypage/archives"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-brand-black hover:bg-brand-beige/30 transition-colors"
            >
              <Heart className="w-4 h-4 text-zinc-400" />
              저장한 폰트
            </Link>
            <Link
              href="/mypage/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-brand-black hover:bg-brand-beige/30 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-400" />
              주문 내역
            </Link>
            <Link
              href="/mypage/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-brand-black hover:bg-brand-beige/30 transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              설정
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-brand-beige py-2">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {isSigningOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
