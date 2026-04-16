'use client'

import { useState, useCallback, useRef } from 'react'

const FALLBACK_WORDS = ['Cultura', 'Entretenimento', 'Educação']
const BRAND_COLORS_CYCLE = ['#a71580', '#e9530d', '#00b4c5', '#facaab']

interface PillarWordsProps {
  words?: string[]
}

export default function PillarWords({ words }: PillarWordsProps) {
  const resolvedWords = words && words.length > 0 ? words : FALLBACK_WORDS
  const [badges, setBadges] = useState<Record<string, string | null>>({})
  const counters = useRef<Record<string, number>>({})

  const handleEnter = useCallback((word: string) => {
    const count = counters.current[word] ?? 0
    const color = BRAND_COLORS_CYCLE[count % BRAND_COLORS_CYCLE.length]
    counters.current[word] = count + 1
    setBadges((prev) => ({ ...prev, [word]: color }))
  }, [])

  const handleLeave = useCallback((word: string) => {
    setBadges((prev) => ({ ...prev, [word]: null }))
  }, [])

  return (
    <div className="flex flex-row justify-center gap-3 sm:gap-12 text-center">
      {resolvedWords.map((word) => (
        <p
          key={word}
          onMouseEnter={() => handleEnter(word)}
          onMouseLeave={() => handleLeave(word)}
          style={badges[word] ? { backgroundColor: badges[word]! } : undefined}
          className="text-white text-sm sm:text-3xl lg:text-4xl font-bold uppercase tracking-wider font-[family-name:var(--font-heading)] cursor-default transition-all duration-200 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full"
        >
          {word}
        </p>
      ))}
    </div>
  )
}
