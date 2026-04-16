'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  dias: number
  horas: number
  min: number
  seg: number
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { dias: 0, horas: 0, min: 0, seg: 0 }

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    seg: Math.floor((diff / 1000) % 60),
  }
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl w-16 h-16 sm:w-22 sm:h-22 lg:w-26 lg:h-26 flex items-center justify-center border border-white/10">
        <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  )
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate)
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(calcTimeLeft(target)), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-4 justify-center">
        {['dias', 'horas', 'min', 'seg'].map((label) => (
          <TimeBlock key={label} value="--" label={label} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {Object.entries(time).map(([label, value]) => (
        <TimeBlock key={label} value={String(value).padStart(2, '0')} label={label} />
      ))}
    </div>
  )
}
