'use client'

import { useState, useEffect, useRef } from 'react'

const ICON_MAP: Record<string, React.ReactNode> = {
  radio: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.006zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.007-.003.003.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.006-2.51l-.006.004-.004-.007.006-.003.004.006zM12 9.75v.008h-.008V9.75H12zm0 2.252v.007h-.008v-.007H12z" />
    </svg>
  ),
  social: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  web: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  press: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  ),
}

const COLOR_VARIANTS: Record<string, { color: string; bgColor: string }> = {
  radio: { color: 'text-purple', bgColor: 'bg-purple/10' },
  social: { color: 'text-orange', bgColor: 'bg-orange/10' },
  web: { color: 'text-cyan', bgColor: 'bg-cyan/10' },
  press: { color: 'text-purple', bgColor: 'bg-purple/10' },
}

interface MediaStatItem {
  category: string
  metric: string
  value: number
  suffix?: string
  iconType: string
}

const FALLBACK_STATS: MediaStatItem[] = [
  { category: 'Rádio', metric: '535 spots', value: 2332469, suffix: ' impactos', iconType: 'radio' },
  { category: 'Redes Sociais', metric: 'Alcance orgânico', value: 130, suffix: ' mil visualizações', iconType: 'social' },
  { category: 'Portal', metric: 'Conteúdo patrocinado', value: 657, suffix: ' mil impressões', iconType: 'web' },
  { category: 'Imprensa', metric: 'Cobertura editorial', value: 30, suffix: '+ publicações', iconType: 'press' },
]

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return

    const steps = 60
    const increment = target / steps
    const stepTime = duration / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, target)
      setCount(Math.floor(current))

      if (step >= steps) {
        clearInterval(timer)
        setCount(target)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [target, duration, started])

  return count
}

function MediaCard({ stat, started, delay }: { stat: MediaStatItem; started: boolean; delay: number }) {
  const [delayPassed, setDelayPassed] = useState(false)
  const count = useCountUp(stat.value, 1400, delayPassed)
  const variant = COLOR_VARIANTS[stat.iconType] ?? COLOR_VARIANTS.radio
  const icon = ICON_MAP[stat.iconType] ?? ICON_MAP.radio

  useEffect(() => {
    if (!started) return
    const timer = setTimeout(() => setDelayPassed(true), delay)
    return () => clearTimeout(timer)
  }, [started, delay])

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm border border-gray-100">
      <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${variant.bgColor} flex items-center justify-center ${variant.color} mb-2 sm:mb-4 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6`}>
        {icon}
      </div>
      <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5 sm:mb-1">{stat.category}</p>
      <p className={`text-lg sm:text-3xl font-bold font-[family-name:var(--font-heading)] tabular-nums ${variant.color} leading-tight`}>
        {count.toLocaleString('pt-BR')}
        <span className="block text-[10px] sm:text-lg sm:inline font-medium text-gray-500">{stat.suffix ?? ''}</span>
      </p>
      <p className="text-gray-500 text-[10px] sm:text-sm mt-0.5 sm:mt-1">{stat.metric}</p>
    </div>
  )
}

interface MediaStatsProps {
  label?: string
  heading?: string
  stats?: MediaStatItem[]
}

export default function MediaStats({
  label = 'Cobertura',
  heading = 'Na Mídia',
  stats,
}: MediaStatsProps) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const items = stats && stats.length > 0 ? stats : FALLBACK_STATS

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-gray-50 py-10 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
          {label}
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-6 sm:mb-16">
          {heading}
        </h2>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
          {items.map((stat, i) => (
            <MediaCard key={stat.category} stat={stat} started={started} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}
