import { NextResponse } from 'next/server'

const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD || 'gmc2026!'
const COOKIE_NAME = 'preview-auth'

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST(request: Request) {
  const body = await request.json()
  const { password } = body

  if (!password || password !== PREVIEW_PASSWORD) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  const hash = await sha256(password)
  const response = NextResponse.json({ success: true })

  response.cookies.set(COOKIE_NAME, hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return response
}
