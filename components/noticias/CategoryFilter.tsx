'use client'

import { useRef, useEffect } from 'react'
import type { NewsCategory } from '@/lib/types'

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: NewsCategory[]
  selected: string | null
  onSelect: (slug: string | null) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const el = activeRef.current
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
      container.scrollTo({ left, behavior: 'smooth' })
    }
  }, [selected])

  return (
    <div className="sticky top-[67px] sm:top-[77px] lg:top-[96px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:justify-center"
        >
          {/* "Todas" button */}
          <button
            ref={selected === null ? activeRef : undefined}
            onClick={() => onSelect(null)}
            className={`shrink-0 snap-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              selected === null
                ? 'bg-purple text-white shadow-[0_4px_20px_rgba(167,21,128,0.35)]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>

          {/* Category buttons */}
          {categories.map((cat) => {
            const isActive = selected === cat.slug
            return (
              <button
                key={cat.slug}
                ref={isActive ? activeRef : undefined}
                onClick={() => onSelect(cat.slug)}
                className={`shrink-0 snap-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={isActive ? { backgroundColor: cat.color } : undefined}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
