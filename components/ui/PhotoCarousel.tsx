'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

const IMAGES = [
  '/assets/carrossel/IMG_0368.JPG',
  '/assets/carrossel/IMG_0374.JPG',
  '/assets/carrossel/IMG_0554.JPG',
  '/assets/carrossel/IMG_0561.JPG',
  '/assets/carrossel/IMG_0574.JPG',
  '/assets/carrossel/IMG_0669.JPG',
  '/assets/carrossel/IMG_0697.JPG',
  '/assets/carrossel/IMG_0715.JPG',
  '/assets/carrossel/IMG_8798.JPG',
  '/assets/carrossel/IMG_8823.JPG',
  '/assets/carrossel/IMG_8927.JPG',
  '/assets/carrossel/sm_FESTMUSIC2025_0017.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0026.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0028.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0045.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0058.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0104.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0129.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0164.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0179.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0203.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0218.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0236.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0251.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0406.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0438.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0467.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0601.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0661.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0751.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0768.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0775.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0799.jpg',
]

// Duplicate for seamless infinite scroll
const LOOP_IMAGES = [...IMAGES, ...IMAGES]

export default function PhotoCarousel() {
  const [paused, setPaused] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const scrollPos = useRef(0)

  const animate = useCallback(() => {
    if (!scrollRef.current || paused) {
      animRef.current = requestAnimationFrame(animate)
      return
    }

    scrollPos.current += 0.8
    const el = scrollRef.current
    const halfWidth = el.scrollWidth / 2

    if (scrollPos.current >= halfWidth) {
      scrollPos.current -= halfWidth
    }

    el.scrollLeft = scrollPos.current
    animRef.current = requestAnimationFrame(animate)
  }, [paused])

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [animate])

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-[6px] overflow-hidden cursor-pointer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {LOOP_IMAGES.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="shrink-0 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] relative overflow-hidden"
            onClick={() => setLightbox(src)}
          >
            <Image
              src={src}
              alt={`Festival de Música ${i + 1}`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
              sizes="280px"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl font-light z-10"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >
            &times;
          </button>
          <Image
            src={lightbox}
            alt="Festival de Música"
            width={1200}
            height={1200}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
