'use client'

import { useState, useEffect, useRef } from 'react'

interface Stat {
  value: number
  suffix: string
  label: string
  color: string
}

const FALLBACK_STATS: Stat[] = [
  { value: 35, suffix: 'h+', label: 'de música ao vivo', color: 'text-purple' },
  { value: 20, suffix: 'mil+', label: 'pessoas nas ruas', color: 'text-orange' },
  { value: 2500, suffix: '+', label: 'pessoas nos teatros', color: 'text-cyan' },
  { value: 2.3, suffix: 'M+', label: 'impactos na mídia', color: 'text-purple' },
]

const COLOR_CLASS: Record<string, string> = {
  purple: 'text-purple',
  orange: 'text-orange',
  cyan: 'text-cyan',
}

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return

    const isDecimal = target % 1 !== 0
    const steps = 60
    const increment = target / steps
    const stepTime = duration / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, target)

      if (isDecimal) {
        setCount(parseFloat(current.toFixed(1)))
      } else {
        setCount(Math.floor(current))
      }

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

  const display = stat.value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString('pt-BR')

  return (
    <div className="flex flex-col items-center text-center px-2 sm:px-8">
      <p
        className={`text-3xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] tabular-nums ${stat.color}`}
      >
        {display}
        <span className="text-xl sm:text-4xl lg:text-5xl">{stat.suffix}</span>
      </p>
      <p className="mt-1 sm:mt-2 text-gray-400 text-[10px] sm:text-sm uppercase tracking-[0.15em] font-medium">
        {stat.label}
      </p>
    </div>
  )
}

interface CounterStatsProps {
  stats?: Array<{ value: number; suffix?: string; label: string; color?: string }>
}

export default function CounterStats({ stats }: CounterStatsProps) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const resolvedStats: Stat[] = stats && stats.length > 0
    ? stats.map((s) => ({
        value: s.value,
        suffix: s.suffix ?? '',
        label: s.label,
        color: COLOR_CLASS[s.color ?? 'purple'] ?? 'text-purple',
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
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-0 sm:divide-x sm:divide-gray-200"
    >
      {resolvedStats.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} started={started} delay={i * 150} />
      ))}
    </div>
  )
}
