import type { Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import { getApoiePage, getSponsors, getSiteSettings } from '@/lib/payload-fetchers'
import { buildMetadata } from '@/lib/seo'

const BenefitsGrid = dynamic(() => import('@/components/apoie/BenefitsGrid'))
const Edition2025 = dynamic(() => import('@/components/apoie/Edition2025'))
const MediaStats = dynamic(() => import('@/components/apoie/MediaStats'))
const SponsorCarousel = dynamic(() => import('@/components/apoie/SponsorCarousel'))
const SponsorForm = dynamic(() => import('@/components/apoie/SponsorForm'))
const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA'))

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getApoiePage(), getSiteSettings()])
  const p = page as any
  const s = settings as any

  return buildMetadata({
    title: p.metaTitle || 'Apoie o Festival',
    description: p.metaDescription || 'Seja um apoiador do Festival de Musica de Maringa. Conecte sua marca a cultura, educacao e entretenimento com visibilidade para milhares de pessoas.',
    ogImage: p.ogImage,
    defaultOgImage: s.defaultOgImage,
    path: '/apoie',
  })
}

export default async function ApoiePage() {
  const [page, sponsors] = await Promise.all([
    getApoiePage(),
    getSponsors(),
  ])

  const p = page as any
  const heroImage = p.heroImage && typeof p.heroImage === 'object' ? p.heroImage.url : '/assets/hero-apoie.jpg'
  const badge = p.badge || 'Apoie o Festival'
  const heading = p.heading || 'Sua Marca no Evento'
  const subtitle = p.subtitle || 'Conecte sua marca a um festival que une cultura, educação e entretenimento, impactando milhares de pessoas em toda a região de Maringá.'

  const benefits = p.benefits && Array.isArray(p.benefits) && p.benefits.length > 0
    ? p.benefits.map((b: any) => ({
        title: b.title ?? '',
        description: b.description ?? '',
        iconType: b.iconType ?? 'audience',
        color: b.color ?? 'purple',
      }))
    : undefined

  const editionStats = p.editionStats && Array.isArray(p.editionStats) && p.editionStats.length > 0
    ? p.editionStats.map((s: any) => ({
        value: s.value ?? 0,
        prefix: s.prefix ?? '',
        suffix: s.suffix ?? '',
        label: s.label ?? '',
      }))
    : undefined

  const mediaStats = p.mediaStats && Array.isArray(p.mediaStats) && p.mediaStats.length > 0
    ? p.mediaStats.map((s: any) => ({
        category: s.category ?? '',
        metric: s.metric ?? '',
        value: s.value ?? 0,
        suffix: s.suffix ?? '',
        iconType: s.iconType ?? 'radio',
      }))
    : undefined

  const sponsorItems = sponsors.length > 0
    ? sponsors.map((sp: any) => ({
        name: sp.name,
        logo: sp.logo,
        url: sp.url,
      }))
    : undefined

  return (
    <>
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <Image
          src={heroImage}
          alt="Músico tocando violão no Festival de Música de Maringá"
          fill
          className="object-cover object-top"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/30 to-gray-950/80 z-[1]" />

        <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-20 lg:pb-24">
          <span className="hero-stagger-1 inline-block bg-purple text-white font-bold uppercase tracking-[0.25em] text-[10px] sm:text-sm px-4 sm:px-5 py-1.5 rounded-full mb-4 sm:mb-6">
            {badge}
          </span>
          <h1 className="hero-stagger-2 text-3xl sm:text-5xl lg:text-7xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-tight mb-3 sm:mb-5">
            {heading}
          </h1>
          <p className="hero-stagger-3 text-white/80 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      <BenefitsGrid
        label={p.benefitsLabel}
        heading={p.benefitsHeading}
        benefits={benefits}
      />
      <Edition2025
        label={p.editionLabel}
        heading={p.editionHeading}
        paragraph={p.editionParagraph}
        stats={editionStats}
      />
      <MediaStats
        label={p.mediaLabel}
        heading={p.mediaHeading}
        stats={mediaStats}
      />
      <SponsorCarousel sponsors={sponsorItems} />
      <SponsorForm
        label={p.formLabel}
        heading={p.formHeading}
        subtitle={p.formSubtitle}
        successTitle={p.formSuccessTitle}
        successMessage={p.formSuccessMessage}
      />
      <FloatingCTA targetId="formulario" label="Quero Apoiar" color="#a71580" />

      <Footer />
    </>
  )
}
