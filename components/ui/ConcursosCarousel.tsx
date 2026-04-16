'use client'

import { useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ArrowIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

const CONCURSOS = [
  {
    slug: 'musica-estudantil',
    title: 'Música Estudantil',
    description: 'Jovens talentos competem por prêmios de até R$3.000.',
    image: '/assets/jovem.jpg',
    color: 'bg-purple',
    day: '15',
  },
  {
    slug: 'mega-concert',
    title: 'Mega Concert',
    description: 'Milhares reunidos em uma celebração musical coletiva.',
    image: '/assets/rock.jpg',
    color: 'bg-orange',
    day: '18',
  },
  {
    slug: 'hackathon',
    title: 'Hackathon',
    description: 'Maratona criativa de tecnologia e música.',
    image: '/assets/raka.jpg',
    color: 'bg-cyan',
    day: '16',
  },
]

export default function ConcursosCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Center on Mega Concert (index 1) on mount
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const cards = container.children
    if (cards.length < 2) return
    const card = cards[1] as HTMLElement
    const scrollLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2
    container.scrollTo({ left: scrollLeft, behavior: 'instant' })
  }, [])

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const cards = Array.from(container.children) as HTMLElement[]
    if (cards.length === 0) return

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    // Find the currently centered card
    let currentIndex = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const dist = Math.abs(cardCenter - containerCenter)
      if (dist < minDist) { minDist = dist; currentIndex = i }
    })

    let nextIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1
    // Loop: last → first, first → last
    if (nextIndex >= cards.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = cards.length - 1

    const target = cards[nextIndex]
    const scrollLeft = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }, [])

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[10%]"
      >
        {CONCURSOS.map((c) => (
          <Link
            key={c.slug}
            href={`/concursos/${c.slug}`}
            className="relative rounded-xl overflow-hidden aspect-[3/4] block shrink-0 w-[80%] snap-center"
          >
            <Image src={c.image} alt={c.title} fill className="object-cover" sizes="80vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div className="absolute top-3 left-3">
              <span className={`${c.color} text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>
                Inscrições Abertas
              </span>
            </div>
            <div className={`absolute top-3 right-3 w-9 h-9 rounded-full ${c.color} flex flex-col items-center justify-center text-white shadow-lg`}>
              <span className="text-xs font-black leading-none">{c.day}</span>
              <span className="text-[5px] uppercase tracking-wider font-bold">Out</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)] leading-tight drop-shadow-lg mb-1">
                {c.title}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-3">
                {c.description}
              </p>
              <span className={`inline-flex items-center gap-2 ${c.color} text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                Saiba Mais <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center z-10"
        aria-label="Anterior"
      >
        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center z-10"
        aria-label="Próximo"
      >
        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
