'use client'

import { useState, useCallback } from 'react'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties | undefined>(undefined)

  const handleHoverEnter = useCallback(() => {
    const bg = nextBrandColor()
    setHoverStyle({ backgroundColor: bg, borderColor: bg, color: textColorFor(bg) })
  }, [])

  const handleHoverLeave = useCallback(() => {
    setHoverStyle(undefined)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    // TODO: Integrate with Resend or other email service
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  if (status === 'success') {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
        <p className="text-white font-bold text-lg font-[family-name:var(--font-heading)]">
          Inscrição confirmada!
        </p>
        <p className="text-white/70 mt-2 text-sm">
          Você receberá novidades do festival no seu email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu melhor email"
        required
        className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors text-base"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        style={hoverStyle}
        className="bg-orange px-8 py-3.5 rounded-full font-bold text-white uppercase tracking-wider text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 shrink-0"
      >
        {status === 'loading' ? 'Enviando...' : 'Quero Participar'}
      </button>
    </form>
  )
}
