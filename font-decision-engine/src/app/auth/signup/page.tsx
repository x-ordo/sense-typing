'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export default function SignupPage() {
  const { signUp, signInWithOAuth } = useAuth()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  }

  const isPasswordStrong = Object.values(passwordChecks).filter(Boolean).length >= 3

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signUp(email, password, displayName)

      if (error) {
        if (error.message.includes('already registered')) {
          setError('이미 등록된 이메일입니다.')
        } else {
          setError(error.message)
        }
        return
      }

      setSuccess(true)
    } catch {
      setError('회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setError(null)
    const { error } = await signInWithOAuth(provider)
    if (error) {
      setError(error.message)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md px-6 text-center">
          <div className="bg-white border border-brand-beige rounded-2xl p-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-brand-black mb-3">
              확인 이메일을 보냈습니다
            </h1>
            <p className="text-zinc-500 mb-6">
              <span className="font-medium text-brand-black">{email}</span>로 확인 링크를 보냈습니다.
              이메일을 확인하고 링크를 클릭하여 계정을 활성화하세요.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-brand-gold font-medium hover:underline"
            >
              로그인 페이지로 이동
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold tracking-tight text-brand-black">
              Sense.
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-brand-black mb-2">
            계정 만들기
          </h1>
          <p className="text-zinc-500 text-sm">
            무료로 시작하고 완벽한 폰트를 찾아보세요
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white border border-brand-beige rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display Name Input */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-brand-black mb-2">
                이름
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="홍길동"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-brand-beige/30 border border-brand-beige rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-brand-beige/30 border border-brand-beige rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-black mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3 bg-brand-beige/30 border border-brand-beige rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-brand-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicators */}
              {password.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          Object.values(passwordChecks).filter(Boolean).length >= i
                            ? isPasswordStrong
                              ? 'bg-emerald-500'
                              : 'bg-amber-500'
                            : 'bg-brand-beige'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-zinc-400 flex flex-wrap gap-x-3">
                    <span className={passwordChecks.length ? 'text-emerald-600' : ''}>
                      8자 이상
                    </span>
                    <span className={passwordChecks.uppercase ? 'text-emerald-600' : ''}>
                      대문자
                    </span>
                    <span className={passwordChecks.lowercase ? 'text-emerald-600' : ''}>
                      소문자
                    </span>
                    <span className={passwordChecks.number ? 'text-emerald-600' : ''}>
                      숫자
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-black mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className={`w-full pl-11 pr-4 py-3 bg-brand-beige/30 border rounded-xl text-brand-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-brand-beige focus:border-brand-gold'
                  }`}
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">비밀번호가 일치하지 않습니다</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (confirmPassword.length > 0 && password !== confirmPassword)}
              className="w-full py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  회원가입
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-beige"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-zinc-400">또는</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full py-3 bg-white border border-brand-beige rounded-xl font-medium text-brand-black hover:bg-brand-beige/30 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </button>

            <button
              onClick={() => handleOAuthLogin('kakao')}
              className="w-full py-3 bg-[#FEE500] rounded-xl font-medium text-[#391B1B] hover:bg-[#FDD835] transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#391B1B">
                <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.88 5.34 4.7 6.76-.15.54-.97 3.48-1 3.62 0 .08.03.16.09.21.07.06.16.08.24.05.33-.05 3.85-2.53 4.45-2.96.5.08 1.01.12 1.52.12 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
              </svg>
              카카오로 계속하기
            </button>
          </div>

          {/* Terms */}
          <p className="mt-6 text-[11px] text-zinc-400 text-center leading-relaxed">
            가입하면{' '}
            <Link href="/terms" className="text-brand-gold hover:underline">
              이용약관
            </Link>
            과{' '}
            <Link href="/privacy" className="text-brand-gold hover:underline">
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-sm text-zinc-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/login" className="text-brand-gold font-medium hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
