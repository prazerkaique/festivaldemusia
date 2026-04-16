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
        placeholder="Digite a senha de acesso"
        autoFocus
        style={{
          width: '100%',
          padding: '14px 20px',
          fontSize: 16,
          border: `2px solid ${error ? '#e9530d' : '#404040'}`,
          borderRadius: 12,
          background: '#171717',
          color: '#FFFFFF',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#a71580'
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#404040'
        }}
      />

      {error && (
        <p
          style={{
            color: '#e9530d',
            fontSize: 14,
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        style={{
          width: '100%',
          marginTop: 16,
          padding: '14px 20px',
          fontSize: 16,
          fontWeight: 700,
          border: 'none',
          borderRadius: 12,
          background: loading || !password ? '#525252' : '#a71580',
          color: '#FFFFFF',
          cursor: loading || !password ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {loading ? 'Verificando...' : 'Acessar'}
      </button>
    </form>
  )
}

export default function PreviewLoginPage() {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Preview — Festival de Musica</title>
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
            maxWidth: 400,
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#737373',
                marginBottom: 8,
              }}
            >
              Preview
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Festival de Musica
              <br />
              <span style={{ color: '#e9530d' }}>de Maringa</span>
            </h1>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>

          <p
            style={{
              marginTop: 32,
              fontSize: 12,
              color: '#525252',
            }}
          >
            Ambiente de preview — acesso restrito
          </p>
        </div>
      </body>
    </html>
  )
}
