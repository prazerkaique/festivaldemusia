import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import NewsDetailHero from '@/components/noticias/NewsDetailHero'
import ShareBar from '@/components/noticias/ShareBar'
import NewsBody from '@/components/noticias/NewsBody'
import AdBanner from '@/components/noticias/AdBanner'
import RelatedPosts from '@/components/noticias/RelatedPosts'
import ApoieCTA from '@/components/noticias/ApoieCTA'
import {
  getPostBySlug,
  getAllNewsSlugs,
  getRelatedPosts,
  getSiteSettings,
} from '@/lib/payload-fetchers'
import { formatPostDate } from '@/lib/helpers'
import { buildMetadata } from '@/lib/seo'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])
  if (!post) return { title: 'Noticia nao encontrada' }

  const s = settings as any

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    ogImage: post.thumbnail || undefined,
    defaultOgImage: s.defaultOgImage,
    path: `/noticias/${slug}`,
    type: 'article',
  })
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post)

  const imageUrl = post.thumbnail || undefined

  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[
        { name: 'Inicio', href: '/' },
        { name: 'Noticias', href: '/noticias' },
        { name: post.title, href: `/noticias/${post.slug}` },
      ]} />
      <ArticleJsonLd
        headline={post.title}
        datePublished={post.date}
        image={imageUrl}
        description={post.excerpt}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://festivaldemusicademaringa.com.br'}/noticias/${post.slug}`}
      />
      <NewsDetailHero post={post} />
      <ShareBar audioUrl={post.audioUrl} />
      <NewsBody paragraphs={post.body} />

      {/* Tags / Category */}
      <div className="bg-white pb-8">
        <div className="container-site px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pb-8 border-b border-gray-200">
            <span
              className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.label}
            </span>
            <span className="text-sm text-gray-400">
              {formatPostDate(post.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="bg-white py-8">
        <div className="container-site px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <AdBanner />
        </div>
      </div>

      <RelatedPosts posts={related} />
      <ApoieCTA />
      <Footer />
    </>
  )
}
