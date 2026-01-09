'use client'

import { useState, useCallback, type ReactNode, type MouseEvent } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'
import { trackClick } from '@/lib/affiliate/tracker'

interface AffiliateLinkProps {
  href: string
  fontId?: string
  partnerId?: string
  linkId?: string
  trackingCode?: string
  children: ReactNode
  className?: string
  showIcon?: boolean
  openInNewTab?: boolean
  onClickStart?: () => void
  onClickEnd?: () => void
}

export default function AffiliateLink({
  href,
  fontId,
  partnerId,
  linkId,
  children,
  className = '',
  showIcon = true,
  openInNewTab = true,
  onClickStart,
  onClickEnd,
}: AffiliateLinkProps) {
  const [isTracking, setIsTracking] = useState(false)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setIsTracking(true)
      onClickStart?.()

      try {
        // Track the click
        await trackClick({
          fontId,
          partnerId,
          linkId,
          targetUrl: href,
        })
      } catch (error) {
        console.error('Failed to track click:', error)
      } finally {
        setIsTracking(false)
        onClickEnd?.()

        // Navigate to the target URL
        if (openInNewTab) {
          window.open(href, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = href
        }
      }
    },
    [href, fontId, partnerId, linkId, openInNewTab, onClickStart, onClickEnd]
  )

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 ${className}`}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {isTracking ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        children
      )}
      {showIcon && !isTracking && (
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      )}
    </a>
  )
}

// Button variant for prominent CTAs
interface AffiliateButtonProps extends AffiliateLinkProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function AffiliateButton({
  href,
  fontId,
  partnerId,
  linkId,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  openInNewTab = true,
  onClickStart,
  onClickEnd,
}: AffiliateButtonProps) {
  const [isTracking, setIsTracking] = useState(false)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setIsTracking(true)
      onClickStart?.()

      try {
        await trackClick({
          fontId,
          partnerId,
          linkId,
          targetUrl: href,
        })
      } catch (error) {
        console.error('Failed to track click:', error)
      } finally {
        setIsTracking(false)
        onClickEnd?.()

        if (openInNewTab) {
          window.open(href, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = href
        }
      }
    },
    [href, fontId, partnerId, linkId, openInNewTab, onClickStart, onClickEnd]
  )

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all disabled:opacity-50'

  const variantStyles = {
    primary: 'bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black',
    secondary: 'bg-brand-gold text-brand-black hover:bg-brand-black hover:text-white',
    outline: 'bg-white border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {isTracking ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {children}
          <ExternalLink className="w-4 h-4" />
        </>
      )}
    </a>
  )
}
