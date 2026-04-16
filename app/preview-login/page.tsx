'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/preview-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        const redirectTo = searchParams.get('from') || '/'
        router.push(redirectTo)
        router.refresh()
      } else {
        setError('Senha incorreta')
        setPassword('')
      }
    } catch {
      setError('Erro ao verificar senha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha de acesso"
        autoFocus
        style={{
          width: '100%',
          padding: '14px 20px',
          fontSize: 15,
          border: `1.5px solid ${error ? '#DC2626' : '#2A2A2A'}`,
          borderRadius: 8,
          background: '#141414',
          color: '#FFFFFF',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
          letterSpacing: '0.02em',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#DC2626'
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#2A2A2A'
        }}
      />

      {error && (
        <p style={{ color: '#DC2626', fontSize: 13, marginTop: 8, marginBottom: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        style={{
          width: '100%',
          marginTop: 14,
          padding: '13px 20px',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          border: 'none',
          borderRadius: 8,
          background: loading || !password ? '#333' : '#DC2626',
          color: '#FFFFFF',
          cursor: loading || !password ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseEnter={(e) => {
          if (!loading && password) e.currentTarget.style.background = '#B91C1C'
        }}
        onMouseLeave={(e) => {
          if (!loading && password) e.currentTarget.style.background = '#DC2626'
        }}
      >
        {loading ? 'Verificando...' : 'Acessar Projeto'}
      </button>
    </form>
  )
}

export default function PreviewLoginPage() {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Preview — Nerau</title>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 360,
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          {/* Nerau Logo */}
          <div style={{ marginBottom: 48 }}>
            <img
              src="/assets/nerau-logo-branco.png"
              alt="Nerau"
              style={{
                height: 32,
                width: 'auto',
                marginBottom: 24,
                opacity: 0.9,
              }}
            />
            <div
              style={{
                width: 40,
                height: 1,
                background: '#2A2A2A',
                margin: '0 auto 20px',
              }}
            />
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#555',
                margin: 0,
              }}
            >
              Ambiente de Preview
            </p>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>

          <p
            style={{
              marginTop: 40,
              fontSize: 11,
              color: '#333',
              letterSpacing: '0.05em',
            }}
          >
            nerau.com.br
          </p>
        </div>
      </body>
    </html>
  )
}
