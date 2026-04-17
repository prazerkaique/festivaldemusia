'use client'

import { useRef, useEffect } from 'react'
import { videoAssets } from '@/lib/assets'

export default function VideoParallax() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const update = () => {
      const section = video.closest('section')
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))

      if (video.duration) {
        video.currentTime = progress * video.duration
      }

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden">
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
    </div>
  )
}
