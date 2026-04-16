import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getBaseUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const payload = await getPayload({ config: configPromise })

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
  const postsResult = await payload.find({
    collection: 'blog-posts',
    limit: 500,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })

  const postRoutes: MetadataRoute.Sitemap = postsResult.docs.map((doc: any) => ({
    url: `${baseUrl}/noticias/${doc.slug}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  /* ─── Dynamic: contests ─── */
  const contestsResult = await payload.find({
    collection: 'contests',
    limit: 100,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })

  const contestRoutes: MetadataRoute.Sitemap = contestsResult.docs.map((doc: any) => ({
    url: `${baseUrl}/concursos/${doc.slug}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes, ...contestRoutes]
}
