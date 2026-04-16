import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import NewsHero from '@/components/noticias/NewsHero'
import NewsShell from '@/components/noticias/NewsShell'
import { getCategories, getPostsByCategory, getNoticiasPage, getSiteSettings } from '@/lib/payload-fetchers'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getNoticiasPage(), getSiteSettings()])
  const p = page as any
  const s = settings as any

  return buildMetadata({
    title: p.metaTitle || 'Noticias do Festival',
    description: p.metaDescription || 'Acompanhe as ultimas noticias do Festival de Musica de Maringa 2026 — programacao, bastidores, concursos e educacao musical.',
    ogImage: p.ogImage,
    defaultOgImage: s.defaultOgImage,
    path: '/noticias',
  })
}

export default async function NoticiasPage() {
  const [categories, posts, page] = await Promise.all([
    getCategories(),
    getPostsByCategory(),
    getNoticiasPage(),
  ])

  const p = page as any
  const heroImage = p.heroImage && typeof p.heroImage === 'object' ? p.heroImage.url : undefined

  return (
    <>
      <Header />
      <NewsHero
        heroImage={heroImage}
        badge={p.badge}
        heading={p.heading}
        subtitle={p.subtitle}
      />
      <NewsShell categories={categories} posts={posts} />
      <Footer />
    </>
  )
}
