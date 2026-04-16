'use client'

import { useRef, useEffect, useCallback } from 'react'
import ColorBadgeLink from '@/components/ui/ColorBadgeLink'
import { videoAssets } from '@/lib/assets'

function ArrowIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

export default function VideoParallaxMobile() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  // Phase: 'before' (waiting for forward), 'locked', 'after' (waiting for reverse)
  const phaseRef = useRef<'before' | 'locked' | 'after'>('before')
  const cooldownRef = useRef(false)

  const SCROLL_RANGE = 400

  const updateVisuals = useCallback(() => {
    const video = videoRef.current
    const title = titleRef.current
    const p = progressRef.current

    if (video?.duration) {
      video.currentTime = p * video.duration
    }
    if (title) {
      title.style.opacity = String(1 - Math.min(1, p / 0.15))
    }
  }, [])

  const lock = useCallback((startProgress: number) => {
    phaseRef.current = 'locked'
    progressRef.current = startProgress
    document.body.style.overflow = 'hidden'
    updateVisuals()
  }, [updateVisuals])

  const unlock = useCallback((exitPhase: 'before' | 'after') => {
    phaseRef.current = exitPhase
    document.body.style.overflow = ''
    // Cooldown to prevent immediate re-lock
    cooldownRef.current = true
    setTimeout(() => { cooldownRef.current = false }, 150)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let lastScrollY = window.scrollY

    const onScroll = () => {
      if (phaseRef.current === 'locked' || cooldownRef.current) return

      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY
      const scrollingUp = currentScrollY < lastScrollY
      lastScrollY = currentScrollY

      const rect = section.getBoundingClientRect()
      const viewH = window.innerHeight

      // Forward trigger: scrolling down, section top at header
      if (phaseRef.current === 'before' && scrollingDown) {
        if (rect.top <= 64 && rect.bottom > viewH * 0.4) {
          lock(0)
        }
      }

      // Reverse trigger: scrolling up, entire video visible on screen
      if (phaseRef.current === 'after' && scrollingUp) {
        const videoRect = video.getBoundingClientRect()
        if (videoRect.top >= 110 && videoRect.bottom <= viewH) {
          lock(1)
        }
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== 'locked') return
      e.preventDefault()

      const delta = e.deltaY / SCROLL_RANGE
      progressRef.current = Math.max(0, Math.min(1, progressRef.current + delta))
      updateVisuals()

      if (progressRef.current >= 1) {
        unlock('after')
      } else if (progressRef.current <= 0) {
        unlock('before')
      }
    }

    let touchStartY = 0

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== 'locked') return

      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY // positive = scrolling down
      touchStartY = currentY

      const delta = deltaY / SCROLL_RANGE
      const newProgress = Math.max(0, Math.min(1, progressRef.current + delta))

      // Only prevent default if we're actively driving the parallax
      if (newProgress > 0 && newProgress < 1) {
        e.preventDefault()
      }

      progressRef.current = newProgress
      updateVisuals()

      if (progressRef.current >= 1) {
        unlock('after')
      } else if (progressRef.current <= 0) {
        unlock('before')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      document.body.style.overflow = ''
    }
  }, [lock, unlock, updateVisuals])

  return (
    <div ref={sectionRef} className="px-4 pb-8 pt-6">
      {/* Video with title overlay */}
      <div className="relative rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster="/assets/catedral-parallax-poster.jpg"
          className="w-full h-auto block"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          <source src={videoAssets.catedralParallax} type="video/mp4" />
        </video>

        {/* Title overlay — fades when parallax starts */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex items-start justify-center pt-[8%] pointer-events-none"
        >
          <h2 className="text-2xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-[1.1] text-center px-4">
            Maringá,
            <br />
            <span className="inline-block bg-purple text-white px-3 py-1 rounded-md mt-1">Cidade Canção</span>
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <span className="inline-block bg-purple text-white font-bold uppercase tracking-[0.25em] text-xs px-3 py-1 rounded-full mb-3">
          O Local
        </span>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          O festival acontece em diversos pontos da cidade — teatros, praças, ruas,
          parques, escolas, aeroporto e rodoviária. Uma semana inteira de música
          espalhada por Maringá.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-purple/10 border border-purple/20 text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Maringá, PR
          </span>
          <span className="inline-flex items-center gap-1.5 bg-purple/10 border border-purple/20 text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            13 a 19 de Outubro
          </span>
          <span className="inline-flex items-center gap-1.5 bg-purple/10 border border-purple/20 text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (44) 3220-4003
          </span>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <ColorBadgeLink
            href="/programacao"
            className="inline-flex items-center justify-center gap-2 bg-purple text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105"
          >
            Programação <ArrowIcon />
          </ColorBadgeLink>
          <ColorBadgeLink
            href="/garanta-sua-vaga"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105"
          >
            Sua Vaga <ArrowIcon />
          </ColorBadgeLink>
        </div>
      </div>
    </div>
  )
}
