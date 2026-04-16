import { getBaseUrl } from '@/lib/seo'
import { getPostsByCategory } from '@/lib/payload-fetchers'

export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = getBaseUrl()
  const posts = await getPostsByCategory()

  const items = posts
    .slice(0, 50)
    .map((post) => {
      const title = escapeXml(post.title)
      const link = `${baseUrl}/noticias/${post.slug}`
      const excerpt = escapeXml(post.excerpt)
      const date = post.date ? new Date(post.date).toUTCString() : ''
      const image = post.thumbnail
        ? post.thumbnail.startsWith('http')
          ? post.thumbnail
          : `${baseUrl}${post.thumbnail}`
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
