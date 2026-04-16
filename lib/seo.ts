import type { Metadata } from 'next'

/* ─── Base URL ─── */

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://festivaldemusicademaringa.com.br'
  )
}

/* ─── OG Image helper ─── */

function resolveOgImage(
  ogImage?: any,
  defaultOgImage?: any
): string | undefined {
  // Direct Payload media object
  if (ogImage && typeof ogImage === 'object' && ogImage.url) {
    return ogImage.url.startsWith('http')
      ? ogImage.url
      : `${getBaseUrl()}${ogImage.url}`
  }
  // String URL
  if (typeof ogImage === 'string' && ogImage) {
    return ogImage.startsWith('http') ? ogImage : `${getBaseUrl()}${ogImage}`
  }
  // Fallback to default
  if (defaultOgImage && typeof defaultOgImage === 'object' && defaultOgImage.url) {
    return defaultOgImage.url.startsWith('http')
      ? defaultOgImage.url
      : `${getBaseUrl()}${defaultOgImage.url}`
  }
  return undefined
}

/* ─── Build Metadata ─── */

interface BuildMetadataOptions {
  title?: string
  description?: string
  ogImage?: any
  defaultOgImage?: any
  path?: string
  type?: 'website' | 'article'
}

export function buildMetadata({
  title,
  description,
  ogImage,
  defaultOgImage,
  path = '',
  type = 'website',
}: BuildMetadataOptions): Metadata {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}${path}`
  const imageUrl = resolveOgImage(ogImage, defaultOgImage)

  const metadata: Metadata = {}

  if (title) metadata.title = title
  if (description) metadata.description = description

  metadata.alternates = { canonical: url }

  metadata.openGraph = {
    title: title || undefined,
    description: description || undefined,
    url,
    siteName: 'Festival de Musica de Maringa e Regiao',
    locale: 'pt_BR',
    type: type === 'article' ? 'article' : 'website',
    ...(imageUrl
      ? {
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title || 'Festival de Musica de Maringa',
            },
          ],
        }
      : {}),
  }

  metadata.twitter = {
    card: 'summary_large_image',
    title: title || undefined,
    description: description || undefined,
    ...(imageUrl ? { images: [imageUrl] } : {}),
  }

  return metadata
}
