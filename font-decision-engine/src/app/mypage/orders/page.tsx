'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Download,
  ChevronRight,
  Loader2,
  ShoppingBag,
  Calendar,
  CreditCard
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createAuthClient } from '@/lib/supabase/auth'
import { formatAmount } from '@/lib/payment/toss'
import type { OrderWithItems } from '@/types/order'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: '처리 중', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: '결제 완료', color: 'bg-emerald-100 text-emerald-700' },
  failed: { label: '결제 실패', color: 'bg-red-100 text-red-700' },
  refunded: { label: '환불됨', color: 'bg-zinc-100 text-zinc-700' },
  cancelled: { label: '취소됨', color: 'bg-zinc-100 text-zinc-700' },
}

const LICENSE_LABELS = {
  personal: '개인용',
  commercial: '상업용',
  enterprise: '기업용',
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/auth/login?redirect=/mypage/orders')
      return
    }

    const fetchOrders = async () => {
      const supabase = createAuthClient()

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (ordersError) {
        console.error('Error fetching orders:', ordersError)
        setIsLoading(false)
        return
      }

      // Fetch items for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)

          return {
            ...order,
            items: items || [],
          } as OrderWithItems
        })
      )

      setOrders(ordersWithItems)
      setIsLoading(false)
    }

    fetchOrders()
  }, [user, authLoading, router])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-brand-black mb-2">주문 내역</h1>
          <p className="text-zinc-500">구매한 폰트와 다운로드 링크를 확인하세요</p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-brand-beige p-12 text-center">
            <div className="w-20 h-20 bg-brand-beige/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-brand-black mb-2">
              아직 주문 내역이 없습니다
            </h2>
            <p className="text-zinc-500 mb-6">
              마음에 드는 폰트를 찾아 구매해보세요
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all"
            >
              폰트 둘러보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-brand-beige overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-6 py-4 bg-brand-beige/30 border-b border-brand-beige flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="text-sm">
                      <span className="text-zinc-400">주문번호: </span>
                      <span className="font-mono font-medium text-brand-black">
                        {order.order_number}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      STATUS_LABELS[order.status]?.color || 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {STATUS_LABELS[order.status]?.label || order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-brand-beige">
                  {order.items.map((item) => (
                    <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-beige/30 rounded-lg flex items-center justify-center text-lg font-bold text-zinc-300">
                          Aa
                        </div>
                        <div>
                          <p className="font-medium text-brand-black">{item.font_name}</p>
                          <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>{item.foundry}</span>
                            <span>•</span>
                            <span>{LICENSE_LABELS[item.license_type]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-brand-black">
                          {formatAmount(item.price)}
                        </span>
                        {order.status === 'paid' && (
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-black text-white text-sm font-medium rounded-lg hover:bg-brand-gold hover:text-brand-black transition-all">
                            <Download className="w-3.5 h-3.5" />
                            다운로드
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="px-6 py-4 bg-brand-beige/20 border-t border-brand-beige flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <CreditCard className="w-4 h-4" />
                    <span>{order.payment_method || '카드'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-zinc-500 mr-2">총 결제금액</span>
                    <span className="text-lg font-bold text-brand-black">
                      {formatAmount(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
