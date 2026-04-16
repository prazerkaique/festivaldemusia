'use client'

import { useState, useCallback } from 'react'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

interface FormData {
  nome: string
  empresa: string
  email: string
  telefone: string
  mensagem: string
}

interface SponsorFormProps {
  label?: string
  heading?: string
  subtitle?: string
  successTitle?: string
  successMessage?: string
}

export default function SponsorForm({
  label = 'Formulário',
  heading = 'Quero Apoiar o Festival',
  subtitle = 'Preencha o formulário e nossa equipe entrará em contato',
  successTitle = 'Mensagem Enviada!',
  successMessage = 'Obrigado pelo interesse em apoiar o Festival de Música de Maringá. Nossa equipe entrará em contato em breve.',
}: SponsorFormProps) {
  const [form, setForm] = useState<FormData>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    mensagem: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties | undefined>(undefined)

  const handleHoverEnter = useCallback(() => {
    const bg = nextBrandColor()
    setHoverStyle({ backgroundColor: bg, borderColor: bg, color: textColorFor(bg) })
  }, [])

  const handleHoverLeave = useCallback(() => {
    setHoverStyle(undefined)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email) return

    setStatus('loading')
    // TODO: Integrate with backend API / email service
    setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  if (status === 'success') {
    return (
      <section id="formulario" className="bg-purple py-16 sm:py-24 lg:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 sm:p-14">
              <svg className="w-14 h-14 text-peach mx-auto mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white font-bold text-2xl font-[family-name:var(--font-heading)] uppercase mb-3">
                {successTitle}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const inputClass =
    'w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-peach focus:ring-1 focus:ring-peach transition-colors text-sm'

  return (
    <section id="formulario" className="bg-purple py-10 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-peach font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
            {label}
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white uppercase font-[family-name:var(--font-heading)] text-center mb-2 sm:mb-3">
            {heading}
          </h2>
          <p className="text-white/60 text-center text-xs sm:text-sm mb-6 sm:mb-12">
            {subtitle}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome"
                required
                className={inputClass}
              />
              <input
                type="text"
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                placeholder="Empresa"
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
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                className={inputClass}
              />
            </div>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              placeholder="Mensagem (opcional)"
              rows={4}
              className={`${inputClass} resize-none`}
            />

            {status === 'error' && (
              <p className="text-red-300 text-sm text-center">
                Erro ao enviar. Tente novamente.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
              style={hoverStyle}
              className="mt-2 bg-white text-purple px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 mx-auto"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
