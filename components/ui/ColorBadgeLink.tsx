'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

interface ColorBadgeLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  'aria-label'?: string
}

export default function ColorBadgeLink({
  href,
  children,
  className = '',
  target,
  rel,
  'aria-label': ariaLabel,
}: ColorBadgeLinkProps) {
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined)

  const handleEnter = useCallback(() => {
    const bg = nextBrandColor()
    setStyle({ backgroundColor: bg, borderColor: bg, color: textColorFor(bg) })
  }, [])

  const handleLeave = useCallback(() => {
    setStyle(undefined)
  }, [])

  const shared = {
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    style,
    className: `transition-all duration-200 ${className}`,
    'aria-label': ariaLabel,
  }

  if (target) {
    return (
      <a href={href} target={target} rel={rel} {...shared}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...shared}>
      {children}
    </Link>
  )
}
