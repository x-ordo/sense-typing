'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  Globe,
  Briefcase,
  MessageSquare,
  Loader2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createAuthClient } from '@/lib/supabase/auth'
import { BookingForm, ServiceCardCompact } from '@/components/experts'
import type { Expert, ExpertService, ExpertPortfolio, ExpertReview, BookingFormData } from '@/types/expert'

const specialtyLabels: Record<string, string> = {
  'typography-consulting': '타이포그래피 컨설팅',
  'brand-identity': '브랜드 아이덴티티',
  'catchphrase': '캐치프레이즈/슬로건',
  'logo-design': '로고 디자인',
  'font-pairing': '폰트 조합',
  'visual-identity': '비주얼 아이덴티티',
}

export default function ExpertProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const slug = params.slug as string

  const [expert, setExpert] = useState<Expert | null>(null)
  const [services, setServices] = useState<ExpertService[]>([])
  const [portfolio, setPortfolio] = useState<ExpertPortfolio[]>([])
  const [reviews, setReviews] = useState<ExpertReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'reviews'>('services')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const fetchExpert = useCallback(async () => {
    const supabase = createAuthClient()

    try {
      // Fetch expert
      const { data: expertData, error: expertError } = await supabase
        .from('experts')
        .select('*')
        .eq('slug', slug)
        .single()

      if (expertError) throw expertError
      setExpert(expertData)

      // Fetch services
      const { data: servicesData } = await supabase
        .from('expert_services')
        .select('*')
        .eq('expert_id', expertData.id)
        .eq('is_active', true)
        .order('display_order')

      setServices(servicesData || [])

      // Fetch portfolio
      const { data: portfolioData } = await supabase
        .from('expert_portfolio')
        .select('*')
        .eq('expert_id', expertData.id)
        .order('display_order')

      setPortfolio(portfolioData || [])

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('expert_reviews')
        .select('*')
        .eq('expert_id', expertData.id)
        .eq('is_verified', true)
        .order('created_at', { ascending: false })

      setReviews(reviewsData || [])
    } catch (error) {
      console.error('Error fetching expert:', error)
      router.push('/experts')
    } finally {
      setIsLoading(false)
    }
  }, [slug, router])

  useEffect(() => {
    fetchExpert()
  }, [fetchExpert])

  const handleBookingSubmit = async (data: BookingFormData) => {
    if (!user || !expert) return

    const supabase = createAuthClient()

    const { error } = await supabase.from('bookings').insert({
      expert_id: expert.id,
      client_id: user.id,
      service_id: data.service_id || null,
      project_brief: data.project_brief,
      budget_range: data.budget_range || null,
      deadline: data.deadline || null,
      client_message: data.client_message || null,
      status: 'inquiry',
    })

    if (error) throw error

    setBookingSuccess(true)
    setShowBookingForm(false)
  }

  const handleLoginRequired = () => {
    router.push(`/auth/login?redirect=/experts/${slug}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    )
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-black mb-2">전문가를 찾을 수 없습니다</h1>
          <Link href="/experts" className="text-brand-gold hover:underline">
            전문가 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/experts"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전문가 목록
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-brand-beige overflow-hidden">
              {/* Cover */}
              <div className="h-32 bg-gradient-to-br from-brand-gold/30 to-brand-beige" />

              {/* Profile Info */}
              <div className="px-6 pb-6">
                <div className="flex items-end gap-4 -mt-12 mb-4">
                  {/* Avatar */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                    {expert.profile_image_url ? (
                      <Image
                        src={expert.profile_image_url}
                        alt={expert.display_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-beige flex items-center justify-center">
                        <span className="text-3xl font-bold text-brand-black">
                          {expert.display_name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 mb-2">
                    {expert.is_verified && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-brand-gold/10 text-brand-gold text-sm font-medium rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        인증됨
                      </span>
                    )}
                    {expert.is_available && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                        상담 가능
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & Title */}
                <h1 className="text-2xl font-bold text-brand-black">{expert.display_name}</h1>
                <p className="text-zinc-600 mt-1">{expert.title}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-500">
                  {expert.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {expert.location}
                    </span>
                  )}
                  {expert.years_experience > 0 && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      경력 {expert.years_experience}년
                    </span>
                  )}
                  {expert.response_time_hours && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {expert.response_time_hours}시간 내 응답
                    </span>
                  )}
                  {expert.website_url && (
                    <a
                      href={expert.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-brand-gold hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      웹사이트
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-brand-beige">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                      <span className="text-xl font-bold text-brand-black">
                        {expert.rating_avg > 0 ? expert.rating_avg.toFixed(1) : '-'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">평점</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-brand-black">{expert.review_count}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">리뷰</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-brand-black">{expert.completed_projects}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">프로젝트</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {expert.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1.5 bg-brand-paper text-sm text-zinc-600 rounded-full"
                    >
                      {specialtyLabels[specialty] || specialty}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                {expert.bio && (
                  <div className="mt-6 pt-6 border-t border-brand-beige">
                    <h3 className="font-bold text-brand-black mb-2">소개</h3>
                    <p className="text-zinc-600 whitespace-pre-line">{expert.bio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-brand-beige overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-brand-beige">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'services'
                      ? 'text-brand-gold border-b-2 border-brand-gold'
                      : 'text-zinc-500 hover:text-brand-black'
                  }`}
                >
                  서비스 ({services.length})
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'portfolio'
                      ? 'text-brand-gold border-b-2 border-brand-gold'
                      : 'text-zinc-500 hover:text-brand-black'
                  }`}
                >
                  포트폴리오 ({portfolio.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-brand-gold border-b-2 border-brand-gold'
                      : 'text-zinc-500 hover:text-brand-black'
                  }`}
                >
                  리뷰 ({reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-3">
                    {services.length > 0 ? (
                      services.map((service) => (
                        <ServiceCardCompact key={service.id} service={service} />
                      ))
                    ) : (
                      <p className="text-center text-zinc-500 py-8">
                        등록된 서비스가 없습니다.
                      </p>
                    )}
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.length > 0 ? (
                      portfolio.map((item) => (
                        <a
                          key={item.id}
                          href={item.project_url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative aspect-square rounded-xl overflow-hidden bg-brand-beige"
                        >
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-3 left-3 right-3">
                              <p className="text-white font-medium text-sm truncate">
                                {item.title}
                              </p>
                              {item.client_name && (
                                <p className="text-white/70 text-xs truncate">
                                  {item.client_name}
                                </p>
                              )}
                            </div>
                            {item.project_url && (
                              <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white" />
                            )}
                          </div>
                        </a>
                      ))
                    ) : (
                      <p className="col-span-full text-center text-zinc-500 py-8">
                        등록된 포트폴리오가 없습니다.
                      </p>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 bg-brand-paper rounded-xl"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'text-brand-gold fill-brand-gold'
                                      : 'text-zinc-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-zinc-500">
                              {new Date(review.created_at).toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                          {review.review_text && (
                            <p className="text-zinc-600">{review.review_text}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-zinc-500 py-8">
                        아직 리뷰가 없습니다.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl border border-brand-beige p-6">
                {bookingSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-black mb-2">
                      상담 신청 완료!
                    </h3>
                    <p className="text-sm text-zinc-500 mb-4">
                      {expert.display_name} 전문가에게 상담 신청이 전송되었습니다.
                      <br />
                      빠른 시일 내에 답변을 받으실 수 있습니다.
                    </p>
                    <Link
                      href="/mypage/bookings"
                      className="inline-flex items-center gap-1 text-brand-gold hover:underline text-sm"
                    >
                      내 상담 내역 보기
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : showBookingForm ? (
                  <>
                    <h3 className="font-bold text-brand-black mb-4">상담 신청</h3>
                    <BookingForm
                      expertId={expert.id}
                      expertName={expert.display_name}
                      services={services}
                      onSubmit={handleBookingSubmit}
                      isLoggedIn={!!user}
                      onLoginRequired={handleLoginRequired}
                    />
                    <button
                      onClick={() => setShowBookingForm(false)}
                      className="w-full mt-3 py-2 text-zinc-500 hover:text-brand-black text-sm transition-colors"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    {/* Price Info */}
                    {(expert.hourly_rate || expert.minimum_project_rate) && (
                      <div className="mb-6">
                        {expert.minimum_project_rate && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-brand-black">
                              {expert.minimum_project_rate.toLocaleString()}원
                            </span>
                            <span className="text-zinc-500">~</span>
                          </div>
                        )}
                        {expert.hourly_rate && (
                          <p className="text-sm text-zinc-500 mt-1">
                            시간당 {expert.hourly_rate.toLocaleString()}원
                          </p>
                        )}
                      </div>
                    )}

                    {/* CTA Button */}
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full py-3.5 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      상담 신청하기
                    </button>

                    <p className="text-center text-xs text-zinc-400 mt-3">
                      무료 상담 · 부담 없이 문의하세요
                    </p>
                  </>
                )}
              </div>

              {/* Languages */}
              {expert.languages && expert.languages.length > 0 && (
                <div className="bg-white rounded-2xl border border-brand-beige p-6">
                  <h3 className="font-bold text-brand-black mb-3">사용 언어</h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-brand-paper text-sm text-zinc-600 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
