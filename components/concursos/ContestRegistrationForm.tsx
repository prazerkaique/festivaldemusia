'use client'

import { useState, useCallback } from 'react'
import type { Contest } from '@/lib/types'
import { COLOR_HEX } from '@/lib/helpers'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

function CheckIcon() {
  return (
    <svg className="w-14 h-14 text-white/80 mx-auto mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

export default function ContestRegistrationForm({ contest }: { contest: Contest }) {
  const accentHex = COLOR_HEX[contest.color]
  const [form, setForm] = useState<Record<string, string>>({
    nome: '',
    email: '',
    telefone: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties | undefined>(undefined)

  const handleHoverEnter = useCallback(() => {
    const bg = nextBrandColor()
    setHoverStyle({ backgroundColor: bg, borderColor: bg, color: textColorFor(bg) })
  }, [])

  const handleHoverLeave = useCallback(() => {
    setHoverStyle(undefined)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email) return

    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  const inputClass =
    'w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-colors text-sm'

  const selectClass =
    'w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/60 transition-colors text-sm appearance-none'

  if (status === 'success') {
    return (
      <section id="formulario" className="py-16 sm:py-24" style={{ backgroundColor: accentHex }}>
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 sm:p-14">
              <CheckIcon />
              <p className="text-white font-bold text-2xl sm:text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">
                Inscricao Realizada!
              </p>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Sua inscricao no <span className="text-white font-bold">{contest.title}</span> foi
                recebida com sucesso. Enviamos um email de confirmacao para{' '}
                <span className="text-white font-bold">{form.email}</span>.
              </p>
              <p className="text-white/50 text-xs">
                Fique atento ao seu email para atualizacoes sobre o concurso.
              </p>

              {contest.pdfUrl && (
                <a
                  href={contest.pdfUrl}
                  className="inline-flex items-center gap-2 mt-6 text-white/90 text-sm font-medium hover:text-white transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white"
                >
                  <DownloadIcon />
                  Baixar Cartilha Completa (PDF)
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="formulario" className="py-10 sm:py-24" style={{ backgroundColor: accentHex }}>
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-white/60 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-1.5 sm:mb-2">
            Formulario de Inscricao
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white uppercase font-[family-name:var(--font-heading)] text-center mb-2 sm:mb-3">
            Inscreva-se Agora
          </h2>
          <p className="text-white/60 text-center text-xs sm:text-sm mb-6 sm:mb-12">
            Preencha os dados abaixo para se inscrever no {contest.title}. As vagas sao limitadas!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Fixed fields */}
            <input
              type="text"
              name="nome"
              value={form.nome || ''}
              onChange={handleChange}
              placeholder="Nome completo"
              required
              className={inputClass}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                placeholder="Email"
                required
                className={inputClass}
              />
              <input
                type="tel"
                name="telefone"
                value={form.telefone || ''}
                onChange={handleChange}
                placeholder="Telefone"
                required
                className={inputClass}
              />
            </div>

            {/* Dynamic fields from contest.formFields */}
            {contest.formFields && contest.formFields.length > 0 && (
              <div className="border-t border-white/10 pt-4 mt-1 flex flex-col gap-4">
                <p className="text-white/50 text-xs uppercase tracking-[0.15em] font-bold">
                  Dados do Concurso
                </p>
                {contest.formFields.map((field) => {
                  if (field.type === 'select' && field.options) {
                    return (
                      <div key={field.name} className="relative">
                        <label className="block text-white/70 text-xs font-medium mb-1.5">{field.label}</label>
                        <select
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          required={field.required}
                          className={selectClass}
                        >
                          <option value="" disabled className="text-gray-900">
                            {field.placeholder}
                          </option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt} className="text-gray-900">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  }

                  if (field.type === 'textarea') {
                    return (
                      <div key={field.name}>
                        <label className="block text-white/70 text-xs font-medium mb-1.5">{field.label}</label>
                        <textarea
                          name={field.name}
                          value={form[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    )
                  }

                  return (
                    <div key={field.name}>
                      <label className="block text-white/70 text-xs font-medium mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={inputClass}
                      />
                    </div>
                  )
                })}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
              className="mt-2 bg-white px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 mx-auto"
              style={{ color: accentHex, ...hoverStyle }}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Inscricao'}
            </button>

            {contest.pdfUrl && (
              <a
                href={contest.pdfUrl}
                className="inline-flex items-center justify-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
              >
                <DownloadIcon />
                Baixar Cartilha Completa (PDF)
              </a>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
