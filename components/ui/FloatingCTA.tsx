'use client'

import { useState, useEffect, useCallback } from 'react'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

interface FloatingCTAProps {
  targetId: string
  label: string
  color?: string
}

export default function FloatingCTA({ targetId, label, color = '#a71580' }: FloatingCTAProps) {
  const [visible, setVisible] = useState(true)
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties | undefined>(undefined)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetId])

  const handleClick = () => {
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEnter = useCallback(() => {
    const bg = nextBrandColor()
    setHoverStyle({ backgroundColor: bg, color: textColorFor(bg) })
  }, [])

  const handleLeave = useCallback(() => {
    setHoverStyle(undefined)
  }, [])

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full text-white text-[10px] sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: color, ...hoverStyle }}
      aria-label={label}
    >
      {label}
      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  )
}
