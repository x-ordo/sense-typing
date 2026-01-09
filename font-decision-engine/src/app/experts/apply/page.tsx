'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  UserPlus,
  CheckCircle,
  Loader2,
  Plus,
  X,
  Briefcase,
  Globe,
  FileText,
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createAuthClient } from '@/lib/supabase/auth'
import type { ExpertSpecialty, ExpertApplicationFormData } from '@/types/expert'

const SPECIALTY_OPTIONS: { value: ExpertSpecialty; label: string; description: string }[] = [
  {
    value: 'typography-consulting',
    label: '타이포그래피 컨설팅',
    description: '폰트 선택, 가독성 최적화, 타이포그래피 시스템 설계',
  },
  {
    value: 'brand-identity',
    label: '브랜드 아이덴티티',
    description: '브랜드 BI/CI 디자인, 비주얼 시스템 구축',
  },
  {
    value: 'catchphrase',
    label: '캐치프레이즈/슬로건',
    description: '브랜드 메시지, 카피라이팅, 슬로건 개발',
  },
  {
    value: 'logo-design',
    label: '로고 디자인',
    description: '로고 타입, 심볼 마크, 워드마크 디자인',
  },
  {
    value: 'font-pairing',
    label: '폰트 조합',
    description: '폰트 페어링, 웹/앱 타이포그래피 가이드',
  },
  {
    value: 'visual-identity',
    label: '비주얼 아이덴티티',
    description: '컬러, 그래픽 요소, 전체 비주얼 시스템',
  },
]

export default function ExpertApplyPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()

  const [formData, setFormData] = useState<ExpertApplicationFormData>({
    display_name: '',
    title: '',
    bio: '',
    specialties: [],
    years_experience: 0,
    portfolio_url: '',
    website_url: '',
    sample_work_urls: [''],
    why_join: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingApplication, setExistingApplication] = useState<string | null>(null)

  // Check for existing application
  useEffect(() => {
    if (!user) return

    const checkExisting = async () => {
      const supabase = createAuthClient()
      const { data } = await supabase
        .from('expert_applications')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (data) {
        setExistingApplication(data.status)
      }
    }

    checkExisting()
  }, [user])

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/experts/apply')
    }
  }, [user, authLoading, router])

  const handleSpecialtyToggle = (specialty: ExpertSpecialty) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleAddSampleUrl = () => {
    setFormData((prev) => ({
      ...prev,
      sample_work_urls: [...prev.sample_work_urls, ''],
    }))
  }

  const handleRemoveSampleUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sample_work_urls: prev.sample_work_urls.filter((_, i) => i !== index),
    }))
  }

  const handleSampleUrlChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sample_work_urls: prev.sample_work_urls.map((url, i) =>
        i === index ? value : url
      ),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!user) {
      router.push('/auth/login?redirect=/experts/apply')
      return
    }

    // Validation
    if (!formData.display_name.trim()) {
      setError('이름을 입력해주세요.')
      return
    }
    if (!formData.title.trim()) {
      setError('전문 분야/직함을 입력해주세요.')
      return
    }
    if (!formData.bio.trim() || formData.bio.length < 50) {
      setError('소개를 50자 이상 입력해주세요.')
      return
    }
    if (formData.specialties.length === 0) {
      setError('최소 1개 이상의 전문 분야를 선택해주세요.')
      return
    }
    if (formData.years_experience < 1) {
      setError('경력을 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createAuthClient()

      // Filter out empty URLs
      const cleanedUrls = formData.sample_work_urls.filter((url) => url.trim())

      const { error: insertError } = await supabase.from('expert_applications').insert({
        user_id: user.id,
        display_name: formData.display_name.trim(),
        title: formData.title.trim(),
        bio: formData.bio.trim(),
        specialties: formData.specialties,
        years_experience: formData.years_experience,
        portfolio_url: formData.portfolio_url?.trim() || null,
        website_url: formData.website_url?.trim() || null,
        sample_work_urls: cleanedUrls,
        why_join: formData.why_join?.trim() || null,
        status: 'pending',
      })

      if (insertError) throw insertError

      setSubmitSuccess(true)
    } catch (err) {
      console.error('Application error:', err)
      setError('신청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    )
  }

  // Already submitted
  if (existingApplication) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-brand-beige p-8 text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-brand-gold" />
            </div>
            <h1 className="text-2xl font-bold text-brand-black mb-2">
              이미 신청하셨습니다
            </h1>
            <p className="text-zinc-500 mb-6">
              현재 신청 상태:{' '}
              <span className="font-medium text-brand-black">
                {existingApplication === 'pending' && '검토 대기중'}
                {existingApplication === 'reviewing' && '검토 중'}
                {existingApplication === 'approved' && '승인됨'}
                {existingApplication === 'rejected' && '거절됨'}
              </span>
            </p>
            <Link
              href="/experts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              전문가 목록 보기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-brand-paper pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-brand-beige p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-brand-black mb-2">
              신청이 완료되었습니다!
            </h1>
            <p className="text-zinc-500 mb-6">
              신청서가 성공적으로 제출되었습니다.
              <br />
              검토 후 이메일로 결과를 알려드리겠습니다.
            </p>
            <Link
              href="/experts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              전문가 목록 보기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/experts"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전문가 목록
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium mb-4">
            <UserPlus className="w-4 h-4" />
            전문가 신청
          </div>
          <h1 className="text-3xl font-bold text-brand-black mb-3">
            센스타이핑 전문가로 활동하세요
          </h1>
          <p className="text-zinc-600">
            타이포그래피, 브랜딩, 캐치프레이즈 분야의 전문가를 찾고 있습니다.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-brand-beige p-6">
            <h2 className="text-lg font-bold text-brand-black mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              기본 정보
            </h2>

            <div className="space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  이름 / 활동명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.display_name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, display_name: e.target.value }))
                  }
                  placeholder="홍길동"
                  className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  전문 분야 / 직함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="타이포그래피 컨설턴트, 브랜드 디자이너 등"
                  className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  소개 <span className="text-red-500">*</span>
                  <span className="text-zinc-400 font-normal ml-1">(최소 50자)</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="본인의 경력, 전문성, 작업 스타일 등을 소개해주세요."
                  rows={5}
                  className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                  required
                />
                <p className="text-xs text-zinc-400 mt-1">{formData.bio.length}/50자</p>
              </div>

              {/* Years Experience */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  경력 (년) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={formData.years_experience || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      years_experience: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder="3"
                  className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-2xl border border-brand-beige p-6">
            <h2 className="text-lg font-bold text-brand-black mb-2">
              전문 분야 <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              본인의 전문 분야를 선택해주세요 (복수 선택 가능)
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              {SPECIALTY_OPTIONS.map((specialty) => (
                <button
                  key={specialty.value}
                  type="button"
                  onClick={() => handleSpecialtyToggle(specialty.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.specialties.includes(specialty.value)
                      ? 'border-brand-gold bg-brand-gold/5'
                      : 'border-brand-beige hover:border-brand-gold/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        formData.specialties.includes(specialty.value)
                          ? 'border-brand-gold bg-brand-gold'
                          : 'border-zinc-300'
                      }`}
                    >
                      {formData.specialties.includes(specialty.value) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-brand-black">{specialty.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {specialty.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-white rounded-2xl border border-brand-beige p-6">
            <h2 className="text-lg font-bold text-brand-black mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              링크 & 포트폴리오
            </h2>

            <div className="space-y-4">
              {/* Portfolio URL */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  포트폴리오 URL
                </label>
                <input
                  type="url"
                  value={formData.portfolio_url || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, portfolio_url: e.target.value }))
                  }
                  placeholder="https://behance.net/..."
                  className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  웹사이트 URL
                </label>
                <input
                  type="url"
                  value={formData.website_url || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, website_url: e.target.value }))
                  }
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                />
              </div>

              {/* Sample Work URLs */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-2">
                  샘플 작업물 URL
                </label>
                <div className="space-y-2">
                  {formData.sample_work_urls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleSampleUrlChange(index, e.target.value)}
                        placeholder="https://..."
                        className="flex-1 px-4 py-3 bg-brand-paper border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                      />
                      {formData.sample_work_urls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSampleUrl(index)}
                          className="p-3 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {formData.sample_work_urls.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddSampleUrl}
                    className="mt-2 flex items-center gap-1 text-sm text-brand-gold hover:underline"
                  >
                    <Plus className="w-4 h-4" />
                    URL 추가
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Why Join */}
          <div className="bg-white rounded-2xl border border-brand-beige p-6">
            <h2 className="text-lg font-bold text-brand-black mb-2">
              지원 동기 <span className="text-zinc-400 font-normal">(선택)</span>
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              센스타이핑 전문가로 활동하고 싶은 이유를 알려주세요.
            </p>
            <textarea
              value={formData.why_join || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, why_join: e.target.value }))
              }
              placeholder="지원 동기를 자유롭게 작성해주세요."
              rows={4}
              className="w-full px-4 py-3 bg-brand-paper border-0 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-gold text-white font-bold rounded-xl hover:bg-brand-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                신청 중...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                전문가 신청하기
              </>
            )}
          </button>

          <p className="text-center text-sm text-zinc-500">
            신청서 검토 후 영업일 기준 3-5일 내에 이메일로 결과를 알려드립니다.
          </p>
        </form>
      </div>
    </div>
  )
}
