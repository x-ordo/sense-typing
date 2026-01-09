'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart3,
  MousePointer,
  TrendingUp,
  DollarSign,
  Loader2,
  ArrowLeft,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createAuthClient } from '@/lib/supabase/auth'
import { formatAmount } from '@/lib/payment/toss'

interface AffiliateStats {
  totalClicks: number
  totalConversions: number
  totalRevenue: number
  conversionRate: number
  topFonts: { font_id: string; click_count: number }[]
  recentClicks: {
    id: string
    font_id: string | null
    target_url: string
    device_type: string | null
    browser: string | null
    created_at: string
    converted: boolean
  }[]
}

export default function AffiliateAdminPage() {
  const router = useRouter()
  const { user, profile, isLoading: authLoading } = useAuth()
  const [stats, setStats] = useState<AffiliateStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState(30)

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    const supabase = createAuthClient()

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - dateRange)

    try {
      // Fetch clicks
      const { data: clicks, count: clickCount } = await supabase
        .from('affiliate_clicks')
        .select('*', { count: 'exact' })
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(50)

      // Fetch conversions
      const { data: conversions } = await supabase
        .from('affiliate_conversions')
        .select('*')
        .gte('created_at', startDate.toISOString())

      // Calculate stats
      const totalClicks = clickCount || 0
      const totalConversions = conversions?.length || 0
      const totalRevenue = conversions?.reduce((sum, c) => sum + (c.order_total || 0), 0) || 0
      const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0

      // Group clicks by font
      const fontClicks: Record<string, number> = {}
      clicks?.forEach((click) => {
        if (click.font_id) {
          fontClicks[click.font_id] = (fontClicks[click.font_id] || 0) + 1
        }
      })

      const topFonts = Object.entries(fontClicks)
        .map(([font_id, click_count]) => ({ font_id, click_count }))
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 5)

      setStats({
        totalClicks,
        totalConversions,
        totalRevenue,
        conversionRate,
        topFonts,
        recentClicks: clicks || [],
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }, [dateRange])

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/auth/login?redirect=/admin/affiliate')
      return
    }

    if (profile?.user_type !== 'admin') {
      router.push('/')
      return
    }

    fetchStats()
  }, [user, profile, authLoading, router, fetchStats])

  if (authLoading || (user && profile?.user_type !== 'admin')) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 text-zinc-400 hover:text-brand-black hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-brand-black flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                어필리에이트 대시보드
              </h1>
              <p className="text-sm text-zinc-500">클릭 및 전환 추적 통계</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(parseInt(e.target.value))}
              className="px-4 py-2 bg-white border border-brand-beige rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
            >
              <option value={7}>최근 7일</option>
              <option value={30}>최근 30일</option>
              <option value={90}>최근 90일</option>
            </select>

            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="p-2 bg-white border border-brand-beige rounded-xl hover:bg-brand-beige/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : stats ? (
          <>
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-500">총 클릭수</span>
                  <MousePointer className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-brand-black">
                  {stats.totalClicks.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-500">전환수</span>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-brand-black">
                  {stats.totalConversions.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-500">전환율</span>
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-brand-black">
                  {stats.conversionRate.toFixed(1)}%
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-500">총 수익</span>
                  <DollarSign className="w-5 h-5 text-brand-gold" />
                </div>
                <p className="text-3xl font-bold text-brand-black">
                  {formatAmount(stats.totalRevenue)}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Top Fonts */}
              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                <h2 className="text-lg font-bold text-brand-black mb-4">
                  인기 폰트 (클릭 기준)
                </h2>
                {stats.topFonts.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topFonts.map((font, index) => (
                      <div
                        key={font.font_id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-brand-beige rounded-full flex items-center justify-center text-xs font-bold text-zinc-600">
                            {index + 1}
                          </span>
                          <span className="text-sm text-brand-black font-medium truncate max-w-[150px]">
                            {font.font_id}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-brand-gold">
                          {font.click_count}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 text-center py-4">
                    데이터가 없습니다
                  </p>
                )}
              </div>

              {/* Recent Clicks */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-beige p-6">
                <h2 className="text-lg font-bold text-brand-black mb-4">
                  최근 클릭
                </h2>
                {stats.recentClicks.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-brand-beige">
                          <th className="text-left py-2 text-zinc-500 font-medium">시간</th>
                          <th className="text-left py-2 text-zinc-500 font-medium">폰트</th>
                          <th className="text-left py-2 text-zinc-500 font-medium">디바이스</th>
                          <th className="text-left py-2 text-zinc-500 font-medium">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentClicks.slice(0, 10).map((click) => (
                          <tr key={click.id} className="border-b border-brand-beige/50">
                            <td className="py-3 text-zinc-500">
                              {new Date(click.created_at).toLocaleString('ko-KR', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-3 text-brand-black font-medium truncate max-w-[150px]">
                              {click.font_id || '-'}
                            </td>
                            <td className="py-3 text-zinc-500">
                              {click.device_type || '-'} / {click.browser || '-'}
                            </td>
                            <td className="py-3">
                              {click.converted ? (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                  전환됨
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                                  클릭만
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 text-center py-4">
                    클릭 데이터가 없습니다
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            데이터를 불러오는 중 오류가 발생했습니다
          </div>
        )}
      </div>
    </div>
  )
}
