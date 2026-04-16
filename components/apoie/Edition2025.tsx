'use client'

import { useState, useEffect, useRef } from 'react'

interface Stat {
  value: number
  prefix: string
  suffix: string
  label: string
}

const FALLBACK_STATS: Stat[] = [
  { value: 35, prefix: '+', suffix: '', label: 'Horas de música' },
  { value: 2500, prefix: '+', suffix: '', label: 'Pessoas nos teatros' },
  { value: 20000, prefix: '+', suffix: '', label: 'Pessoas impactadas nas ruas' },
  { value: 100, prefix: '+', suffix: '', label: 'Profissionais da educação musical' },
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

function StatItem({ stat, started, delay }: { stat: Stat; started: boolean; delay: number }) {
  const [delayPassed, setDelayPassed] = useState(false)
  const count = useCountUp(stat.value, 1200, delayPassed)

  useEffect(() => {
    if (!started) return
    const timer = setTimeout(() => setDelayPassed(true), delay)
    return () => clearTimeout(timer)
  }, [started, delay])

  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-8">
      <p
        className="text-2xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] tabular-nums text-orange"
      >
        {stat.prefix}
        {count.toLocaleString('pt-BR')}
        {stat.suffix}
      </p>
      <p className="mt-1 sm:mt-2 text-gray-500 text-[10px] sm:text-sm uppercase tracking-[0.15em] font-medium">
        {stat.label}
      </p>
    </div>
  )
}

interface Edition2025Props {
  label?: string
  heading?: string
  paragraph?: string
  stats?: Array<{ value: number; prefix?: string; suffix?: string; label: string }>
}

export default function Edition2025({
  label = 'Resultados',
  heading = 'Edição 2025',
  paragraph = 'A edição 2025 reuniu a Orquestra Sinfônica do Paraná, grandes shows e intervenções em espaços inusitados como o aeroporto e a rodoviária de Maringá. Oficinas de formação musical, o concurso estudantil e programação descentralizada impactaram milhares de pessoas em uma semana de pura cultura.',
  stats,
}: Edition2025Props) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const resolvedStats: Stat[] = stats && stats.length > 0
    ? stats.map((s) => ({
        value: s.value,
        prefix: s.prefix ?? '',
        suffix: s.suffix ?? '',
        label: s.label,
      }))
    : FALLBACK_STATS

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
    <section className="bg-white py-10 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
          {label}
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-4 sm:mb-12">
          {heading}
        </h2>

        <div className="max-w-3xl mx-auto mb-6 sm:mb-16">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-lg text-center">
            {paragraph}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto"
        >
          {resolvedStats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-xl sm:rounded-2xl"
            >
              <StatItem stat={stat} started={started} delay={i * 150} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
