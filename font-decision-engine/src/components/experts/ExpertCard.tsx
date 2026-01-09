'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, CheckCircle, Clock, MapPin } from 'lucide-react'
import type { Expert } from '@/types/expert'

interface ExpertCardProps {
  expert: Expert
  variant?: 'default' | 'compact'
}

const specialtyLabels: Record<string, string> = {
  'typography-consulting': '타이포그래피 컨설팅',
  'brand-identity': '브랜드 아이덴티티',
  'catchphrase': '캐치프레이즈/슬로건',
  'logo-design': '로고 디자인',
  'font-pairing': '폰트 조합',
  'visual-identity': '비주얼 아이덴티티',
}

export default function ExpertCard({ expert, variant = 'default' }: ExpertCardProps) {
  const displaySpecialties = expert.specialties.slice(0, 3)
  const remainingCount = expert.specialties.length - 3

  if (variant === 'compact') {
    return (
      <Link
        href={`/experts/${expert.slug}`}
        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-brand-beige hover:border-brand-gold/50 hover:shadow-md transition-all group"
      >
        {/* Profile Image */}
        <div className="relative w-14 h-14 flex-shrink-0">
          {expert.profile_image_url ? (
            <Image
              src={expert.profile_image_url}
              alt={expert.display_name}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-brand-beige rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-brand-black">
                {expert.display_name.charAt(0)}
              </span>
            </div>
          )}
          {expert.is_verified && (
            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-brand-gold fill-white" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-brand-black group-hover:text-brand-gold transition-colors truncate">
            {expert.display_name}
          </h3>
          <p className="text-sm text-zinc-500 truncate">{expert.title}</p>
        </div>

        {/* Rating */}
        {expert.review_count > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
            <span className="font-medium text-brand-black">{expert.rating_avg.toFixed(1)}</span>
          </div>
        )}
      </Link>
    )
  }

  return (
    <Link
      href={`/experts/${expert.slug}`}
      className="block bg-white rounded-2xl border border-brand-beige overflow-hidden hover:border-brand-gold/50 hover:shadow-lg transition-all group"
    >
      {/* Header with gradient background */}
      <div className="relative h-24 bg-gradient-to-br from-brand-gold/20 to-brand-beige">
        {/* Profile Image */}
        <div className="absolute -bottom-10 left-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md">
            {expert.profile_image_url ? (
              <Image
                src={expert.profile_image_url}
                alt={expert.display_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brand-beige flex items-center justify-center">
                <span className="text-2xl font-bold text-brand-black">
                  {expert.display_name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {expert.is_verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Availability Badge */}
        {expert.is_available && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
            상담 가능
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-12 px-6 pb-6">
        {/* Name & Title */}
        <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-gold transition-colors">
          {expert.display_name}
        </h3>
        <p className="text-sm text-zinc-500 mt-0.5">{expert.title}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mt-3 text-xs text-zinc-400">
          {expert.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {expert.location}
            </span>
          )}
          {expert.response_time_hours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {expert.response_time_hours}시간 내 응답
            </span>
          )}
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {displaySpecialties.map((specialty) => (
            <span
              key={specialty}
              className="px-2.5 py-1 bg-brand-beige/50 text-xs text-zinc-600 rounded-full"
            >
              {specialtyLabels[specialty] || specialty}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="px-2.5 py-1 bg-brand-beige/50 text-xs text-zinc-400 rounded-full">
              +{remainingCount}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-brand-beige">
          <div className="flex items-center gap-4">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
              <span className="font-bold text-brand-black">
                {expert.rating_avg > 0 ? expert.rating_avg.toFixed(1) : '-'}
              </span>
              <span className="text-xs text-zinc-400">
                ({expert.review_count})
              </span>
            </div>

            {/* Projects */}
            <div className="text-sm text-zinc-500">
              <span className="font-medium text-brand-black">{expert.completed_projects}</span>
              <span className="ml-1">프로젝트</span>
            </div>
          </div>

          {/* Price */}
          {expert.minimum_project_rate && (
            <div className="text-right">
              <p className="text-xs text-zinc-400">프로젝트</p>
              <p className="font-bold text-brand-black">
                {expert.minimum_project_rate.toLocaleString()}원~
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
