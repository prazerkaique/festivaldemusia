'use client'

import { useState, useCallback } from 'react'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

type PersonType = 'pf' | 'pj'

interface FormData {
  nome: string
  email: string
  telefone: string
  tipo: PersonType
  documento: string
  mensagem: string
}

export default function IncentivadorForm() {
  const [form, setForm] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'pf',
    documento: '',
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

  const setTipo = (tipo: PersonType) => {
    setForm((prev) => ({ ...prev, tipo, documento: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email) return

    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  if (status === 'success') {
    return (
      <section id="quero-incentivar" className="bg-orange py-16 sm:py-24 lg:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 sm:p-14">
              <svg
                className="w-14 h-14 text-white mx-auto mb-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-white font-bold text-2xl font-[family-name:var(--font-heading)] uppercase mb-3">
                Interesse registrado!
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                Obrigado por querer incentivar o Festival de Música de Maringá. Nossa equipe vai te
                enviar em até 2 dias úteis o dossiê do projeto e o passo a passo para destinar seu
                imposto.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const inputClass =
    'w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm'

  const tabBase =
    'flex-1 py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200'
  const tabActive = 'bg-white text-orange shadow-md'
  const tabIdle = 'bg-white/10 text-white/70 hover:bg-white/20'

  return (
    <section id="quero-incentivar" className="bg-orange py-12 sm:py-24 lg:py-28">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-white/80 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-3">
            Pré-cadastro
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white uppercase font-[family-name:var(--font-heading)] text-center mb-2 sm:mb-3 leading-tight">
            Quero ser um
            <br />
            incentivador
          </h2>
          <p className="text-white/80 text-center text-xs sm:text-sm mb-6 sm:mb-10 max-w-md mx-auto">
            Deixa seu contato e a gente te manda o dossiê com o PRONAC, conta captadora e passo a
            passo pro seu caso (PF ou PJ).
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* PF / PJ toggle */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/20">
              <button
                type="button"
                onClick={() => setTipo('pf')}
                className={`${tabBase} ${form.tipo === 'pf' ? tabActive : tabIdle}`}
              >
                Pessoa Física
              </button>
              <button
                type="button"
                onClick={() => setTipo('pj')}
                className={`${tabBase} ${form.tipo === 'pj' ? tabActive : tabIdle}`}
              >
                Pessoa Jurídica
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder={form.tipo === 'pf' ? 'Nome completo' : 'Nome do responsável'}
                required
                className={inputClass}
              />
              <input
                type="text"
                name="documento"
                value={form.documento}
                onChange={handleChange}
                placeholder={form.tipo === 'pf' ? 'CPF (opcional)' : 'CNPJ (opcional)'}
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
                placeholder="Telefone / WhatsApp"
                className={inputClass}
              />
            </div>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              placeholder="Valor estimado ou dúvida (opcional)"
              rows={3}
              className={`${inputClass} resize-none`}
            />

            {status === 'error' && (
              <p className="text-white text-sm text-center bg-red-900/40 rounded-lg py-2">
                Erro ao enviar. Tente novamente.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
              style={hoverStyle}
              className="mt-2 bg-white text-orange px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 mx-auto"
            >
              {status === 'loading' ? 'Enviando...' : 'Quero ser um incentivador →'}
            </button>

            <p className="text-white/60 text-xs text-center mt-2">
              Seus dados são usados só para contato sobre o incentivo. Nada de spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
