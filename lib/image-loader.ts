/**
 * Custom image loader — wsrv.nl CDN proxy for all images.
 *
 * In production: external URLs → wsrv.nl with WebP output + resize
 * Local assets → wsrv.nl proxied via the public site URL (Vercel CDN)
 * In development: local assets → Next.js /_next/image (wsrv.nl can't reach localhost)
 */

interface ImageLoaderParams {
  src: string
  width: number
  quality?: number
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

export default function imageLoader({ src, width, quality }: ImageLoaderParams): string {
  const q = quality || 80

  // Development: use Next.js built-in optimization
  if (process.env.NODE_ENV !== 'production') {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`
  }

  // Production: proxy everything through wsrv.nl
  const fullUrl = src.startsWith('http') ? src : `${siteUrl}${src}`

  const params = new URLSearchParams({
    url: fullUrl,
    w: String(width),
    q: String(q),
    output: 'webp',
    n: '-1', // no upscaling
  })

  return `https://wsrv.nl/?${params.toString()}`
}
