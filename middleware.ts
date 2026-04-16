import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'preview-auth'
const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD || 'gmc2026!'

/**
 * Simple hash for cookie verification (Edge Runtime compatible).
 * Uses Web Crypto API available in Vercel Edge.
 */
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(COOKIE_NAME)
  if (!cookie?.value) return false

  const expectedHash = await sha256(PREVIEW_PASSWORD)
  return cookie.value === expectedHash
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow: auth API, preview-login page, static assets
  if (
    pathname === '/api/preview-auth' ||
    pathname === '/preview-login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/fonts') ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.png' ||
    pathname === '/apple-icon.png' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  // Check authentication
  if (!(await isAuthenticated(request))) {
    const loginUrl = new URL('/preview-login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Authenticated — add security headers
  const response = NextResponse.next()

  // Block indexing
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
