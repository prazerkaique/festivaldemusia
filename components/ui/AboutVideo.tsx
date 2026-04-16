'use client'

import { useState, useRef, useEffect } from 'react'
import { videoAssets } from '@/lib/assets'

export default function AboutVideo() {
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Lazy load: only set video src when entering viewport
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    video.play()
  }

  return (
    <div ref={containerRef} className="rounded-2xl overflow-hidden aspect-[4/3] relative shadow-none">
      {loaded ? (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          poster="/assets/festival-2025-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={videoAssets.festivalAbout} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gray-200 rounded-2xl" />
      )}

      {/* Mobile-only overlay — disappears on play */}
      <div
        className={`lg:hidden absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/20 to-gray-950/40 flex flex-col justify-between p-5 transition-opacity duration-500 ${
          playing ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Title — top */}
        <div>
          <span className="inline-block bg-orange text-white font-bold uppercase tracking-[0.25em] text-[10px] px-3 py-1 rounded-full mb-2 w-fit">
            O Festival
          </span>
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight">
            Transformar Maringá na{' '}
            <span className="text-orange">Capital da Música</span>
          </h2>
        </div>

        {/* Play button — center */}
        <button
          onClick={handlePlayClick}
          className="self-center"
          aria-label="Reproduzir vídeo"
        >
          <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>

        <div />
      </div>
    </div>
  )
}
