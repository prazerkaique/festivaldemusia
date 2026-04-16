import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getBaseUrl } from '@/lib/seo'

export async function GET() {
  const baseUrl = getBaseUrl()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog-posts',
    limit: 50,
    depth: 1,
    sort: '-date',
  })

  const posts = result.docs

  const items = posts
    .map((post: any) => {
      const title = escapeXml(post.title ?? '')
      const slug = post.slug ?? ''
      const excerpt = escapeXml(post.excerpt ?? '')
      const date = post.date ? new Date(post.date).toUTCString() : ''
      const link = `${baseUrl}/noticias/${slug}`
      const image = post.coverImage?.url
        ? post.coverImage.url.startsWith('http')
          ? post.coverImage.url
          : `${baseUrl}${post.coverImage.url}`
        : ''

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${excerpt}</description>
      <pubDate>${date}</pubDate>${image ? `\n      <enclosure url="${escapeXml(image)}" type="image/jpeg" />` : ''}
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Festival de Musica de Maringa — Noticias</title>
    <link>${baseUrl}/noticias</link>
    <description>Noticias e novidades do Festival de Musica de Maringa e Regiao 2026.</description>
    <language>pt-BR</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
