'use client'

import { useState, useCallback } from 'react'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

interface ColorBadgeButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
}

export default function ColorBadgeButton({
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: ColorBadgeButtonProps) {
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined)

  const handleEnter = useCallback(() => {
    if (disabled) return
    const bg = nextBrandColor()
    setStyle({ backgroundColor: bg, borderColor: bg, color: textColorFor(bg) })
  }, [disabled])

  const handleLeave = useCallback(() => {
    setStyle(undefined)
  }, [])

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={style}
      className={`transition-all duration-200 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
