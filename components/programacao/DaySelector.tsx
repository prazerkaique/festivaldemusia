'use client'

import { useRef, useEffect } from 'react'
import type { FestivalDay } from '@/lib/types'

export default function DaySelector({
  days,
  selectedDate,
  onSelect,
}: {
  days: FestivalDay[]
  selectedDate: string
  onSelect: (date: string) => void
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
  }, [selectedDate])

  return (
    <div className="sticky top-[67px] sm:top-[77px] lg:top-[96px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:justify-center"
        >
          {days.map((day) => {
            const isActive = day.date === selectedDate
            return (
              <button
                key={day.date}
                ref={isActive ? activeRef : undefined}
                onClick={() => onSelect(day.date)}
                className={`shrink-0 snap-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-purple text-white shadow-[0_4px_20px_rgba(167,21,128,0.35)]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="block leading-tight">{day.dayOfWeek}</span>
                <span className={`block text-lg sm:text-xl leading-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {day.dayNumber}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
