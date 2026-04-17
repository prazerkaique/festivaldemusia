'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface SponsorItem {
  name: string
  logo: { url: string; width: number; height: number }
  url?: string
}

const FALLBACK_SPONSORS: SponsorItem[] = [
  { name: 'Lei de Incentivo à Cultura', logo: { url: '/assets/sponsors/lei-rouanet.png', width: 808, height: 516 } },
  { name: 'Governo do Paraná', logo: { url: '/assets/sponsors/governo-parana.png', width: 2850, height: 835 } },
  { name: 'Prefeitura de Maringá', logo: { url: '/assets/sponsors/prefeitura-maringa.png', width: 352, height: 408 } },
  { name: 'Grupo Maringá de Comunicação', logo: { url: '/assets/sponsors/gmc.png', width: 616, height: 375 } },
  { name: 'Universidade Estadual de Maringá', logo: { url: '/assets/sponsors/uem.png', width: 3291, height: 1588 } },
  { name: 'Teatro Luzamor', logo: { url: '/assets/sponsors/luzamor.png', width: 240, height: 240 } },
  { name: 'Nerau CX', logo: { url: '/assets/sponsors/nerau.png', width: 1822, height: 500 } },
]

interface SponsorCarouselProps {
  label?: string
  heading?: string
  sponsors?: SponsorItem[]
}

export default function SponsorCarousel({
  label = 'Parceiros',
  heading = 'Quem Já Apoia',
  sponsors,
}: SponsorCarouselProps) {
  const items = sponsors && sponsors.length > 0 ? sponsors : FALLBACK_SPONSORS
  // Duplicate for seamless infinite scroll
  const loopItems = [...items, ...items]

  const [paused, setPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const scrollPos = useRef(0)

  const animate = useCallback(() => {
    if (!scrollRef.current || paused) {
      animRef.current = requestAnimationFrame(animate)
      return
    }

    scrollPos.current += 2.2
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

  return (
    <section className="bg-white py-10 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8 mb-6 sm:mb-14">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
          {label}
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center">
          {heading}
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-10 sm:gap-14 lg:gap-16 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {loopItems.map((sponsor, i) => (
          <div
            key={`${sponsor.name}-${i}`}
            className="shrink-0 flex items-center justify-center h-16 w-32 sm:h-20 sm:w-40 lg:h-24 lg:w-48"
          >
            <Image
              src={sponsor.logo.url}
              alt={sponsor.name}
              width={sponsor.logo.width || 200}
              height={sponsor.logo.height || 100}
              className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
              sizes="200px"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
