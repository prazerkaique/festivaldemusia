import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import ContestHero from '@/components/concursos/ContestHero'
import ContestQuickFacts from '@/components/concursos/ContestQuickFacts'
import ContestPrizes from '@/components/concursos/ContestPrizes'
import ContestCriteria from '@/components/concursos/ContestCriteria'
import ContestTimeline from '@/components/concursos/ContestTimeline'
import ContestRegistrationForm from '@/components/concursos/ContestRegistrationForm'
import FloatingCTA from '@/components/ui/FloatingCTA'
import { getContestBySlug, getAllContestSlugs, getSiteSettings } from '@/lib/payload-fetchers'
import { COLOR_HEX } from '@/lib/helpers'
import { buildMetadata } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllContestSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [contest, settings] = await Promise.all([getContestBySlug(slug), getSiteSettings()])
  if (!contest) return { title: 'Concurso nao encontrado' }

  const s = settings as any

  return buildMetadata({
    title: contest.title,
    description: `${contest.subtitle} — ${contest.date}, ${contest.location}. Inscreva-se no Festival de Musica de Maringa 2026.`,
    ogImage: contest.image || undefined,
    defaultOgImage: s.defaultOgImage,
    path: `/concursos/${slug}`,
  })
}

export default async function ContestDetailPage({ params }: PageProps) {
  const { slug } = await params
  const contest = await getContestBySlug(slug)
  if (!contest) notFound()

  return (
    <>
      <Header />
      <BreadcrumbJsonLd items={[
        { name: 'Inicio', href: '/' },
        { name: 'Concursos', href: '/concursos' },
        { name: contest.title, href: `/concursos/${contest.slug}` },
      ]} />
      <ContestHero contest={contest} />
      <ContestQuickFacts contest={contest} />

      {/* Description */}
      <section className="bg-white py-8 sm:py-20">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-1.5 sm:mb-2">
              Sobre o Concurso
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-4 sm:mb-8">
              {contest.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-lg leading-relaxed text-center">
              {contest.description}
            </p>
          </div>
        </div>
      </section>

      <ContestPrizes contest={contest} />
      <ContestCriteria contest={contest} />
      <ContestTimeline contest={contest} />
      <ContestRegistrationForm contest={contest} />
      <FloatingCTA targetId="formulario" label="Inscreva-se" color={COLOR_HEX[contest.color]} />
      <Footer />
    </>
  )
}
