import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'
import { getAllNewsSlugs, getAllContestSlugs } from '@/lib/payload-fetchers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()

  /* ─── Static routes ─── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/programacao`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/concursos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/noticias`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/apoie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/garanta-sua-vaga`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  /* ─── Dynamic: blog posts ─── */
  const postSlugs = await getAllNewsSlugs()
  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${baseUrl}/noticias/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  /* ─── Dynamic: contests ─── */
  const contestSlugs = await getAllContestSlugs()
  const contestRoutes: MetadataRoute.Sitemap = contestSlugs.map((slug) => ({
    url: `${baseUrl}/concursos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...contestRoutes]
}
