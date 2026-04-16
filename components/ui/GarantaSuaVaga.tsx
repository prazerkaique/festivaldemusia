'use client'

import { useState, useCallback } from 'react'
import type { ExchangePoint } from '@/lib/types'
import { findNearestPoint } from '@/lib/helpers'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

function formatCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

function MapPinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
    </svg>
  )
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-14 h-14 text-purple mx-auto mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

interface GarantaSuaVagaProps {
  exchangePoints: ExchangePoint[]
  eyebrow?: string
  heading?: string
  subtitle?: string
  donationNotice?: string
  successHeading?: string
  nearestPointLabel?: string
}

export default function GarantaSuaVaga({
  exchangePoints,
  eyebrow = 'Entrada Gratuita',
  heading = 'Garanta sua Vaga',
  subtitle = 'Preencha seus dados e descubra o ponto de troca mais próximo de você',
  donationNotice = 'Leve 1kg de alimento não perecível para trocar pelo seu ingresso. Limite de 3 ingressos por pessoa.',
  successHeading = 'Vaga Garantida!',
  nearestPointLabel = 'Ponto de Troca Mais Próximo',
}: GarantaSuaVagaProps) {
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', cep: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [point, setPoint] = useState<ExchangePoint | null>(null)
  const [showAllPoints, setShowAllPoints] = useState(false)
  const [hoverStyles, setHoverStyles] = useState<Record<string, React.CSSProperties | null>>({})
  const ALL_POINTS = exchangePoints

  const handleEnter = useCallback((key: string) => {
    const bg = nextBrandColor()
    setHoverStyles((prev) => ({ ...prev, [key]: { backgroundColor: bg, borderColor: bg, color: textColorFor(bg) } }))
  }, [])

  const handleLeave = useCallback((key: string) => {
    setHoverStyles((prev) => ({ ...prev, [key]: null }))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'cep' ? formatCep(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email || !form.cep) return

    setStatus('loading')
    const nearest = findNearestPoint(exchangePoints, form.cep)
    setTimeout(() => {
      setPoint(nearest)
      setStatus('success')
    }, 1000)
  }

  const inputClass =
    'w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-colors text-sm'

  if (status === 'success' && point) {
    return (
      <section className="bg-orange min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-28">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <CheckIcon />
              <p className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] uppercase mb-2">
                {successHeading}
              </p>
              <p className="text-white/70 text-sm">
                Nos vemos no festival, <span className="text-white font-bold">{form.nome}</span>!
              </p>
            </div>

            {/* Food donation notice — purple accent */}
            <div className="bg-purple rounded-xl p-4 mb-6 text-center">
              <p className="text-white font-bold text-sm leading-relaxed">
                {donationNotice}
              </p>
            </div>

            {/* Exchange point card — glass morphism */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8">
              <p className="text-white font-bold uppercase tracking-[0.15em] text-xs mb-3">
                {nearestPointLabel}
              </p>
              <p className="text-white font-bold text-xl mb-4">{point.name}</p>
              <div className="flex items-start gap-3 text-white text-sm mb-2">
                <MapPinIcon className="w-5 h-5 text-purple" />
                <span>{point.address} — {point.city}</span>
              </div>
              <div className="flex items-start gap-3 text-white text-sm mb-6">
                <ClockIcon className="w-5 h-5 text-purple" />
                <span>{point.hours}</span>
              </div>

              {/* Embedded Google Maps */}
              <div className="rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={point.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* CTA — ver outros pontos */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllPoints(true)}
                onMouseEnter={() => handleEnter('allPoints')}
                onMouseLeave={() => handleLeave('allPoints')}
                style={hoverStyles['allPoints'] ?? undefined}
                className="inline-flex items-center gap-2 bg-purple text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200"
              >
                Ver Todos os Pontos de Troca
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* All points list */}
            {showAllPoints && (
              <div className="mt-6 flex flex-col gap-4">
                {ALL_POINTS.filter((p) => p.id !== point.id).map((p) => (
                  <div key={p.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-white font-bold text-base mb-1">{p.name}</p>
                      <div className="flex items-start gap-2 text-white/80 text-xs mb-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{p.address} — {p.city}</span>
                      </div>
                      <div className="flex items-start gap-2 text-white/80 text-xs">
                        <ClockIcon className="w-4 h-4" />
                        <span>{p.hours}</span>
                      </div>
                    </div>
                    <a
                      href={p.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => handleEnter(`map-${p.id}`)}
                      onMouseLeave={() => handleLeave(`map-${p.id}`)}
                      style={hoverStyles[`map-${p.id}`] ?? undefined}
                      className="shrink-0 inline-flex items-center gap-2 bg-purple text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200"
                    >
                      Ver no Mapa
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-orange min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-white/70 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase font-[family-name:var(--font-heading)] text-center mb-3">
            {heading}
          </h1>
          <p className="text-white/70 text-center text-sm sm:text-base mb-10 sm:mb-12 max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome completo"
                required
                className={inputClass}
              />
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                required
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={inputClass}
              />
              <input
                type="text"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                placeholder="CEP (ex: 87010-000)"
                required
                inputMode="numeric"
                maxLength={9}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              onMouseEnter={() => handleEnter('submit')}
              onMouseLeave={() => handleLeave('submit')}
              style={hoverStyles['submit'] ?? undefined}
              className="mt-2 bg-purple text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 mx-auto"
            >
              {status === 'loading' ? 'Buscando...' : 'Garantir Minha Vaga'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
