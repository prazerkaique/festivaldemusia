import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import { getContests, getConcursosPage, getSiteSettings } from '@/lib/payload-fetchers'
import { COLOR_MAP, getStatusLabel, getStatusColor } from '@/lib/helpers'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getConcursosPage(), getSiteSettings()])
  const p = page as any
  const s = settings as any

  return buildMetadata({
    title: p.metaTitle || 'Concursos',
    description: p.metaDescription || 'Participe dos concursos do Festival de Musica de Maringa 2026 — Concurso de Musica Estudantil, Mega Concert e Hackathon Musical. Inscreva-se e mostre seu talento.',
    ogImage: p.ogImage,
    defaultOgImage: s.defaultOgImage,
    path: '/concursos',
  })
}

function ArrowIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

export default async function ConcursosPage() {
  const [contests, page] = await Promise.all([
    getContests(),
    getConcursosPage(),
  ])

  const p = page as any
  const heroImage = p.heroImage && typeof p.heroImage === 'object' ? p.heroImage.url : '/assets/carrossel/sm_FESTMUSIC2025_0438.jpg'
  const badge = p.badge || 'Participe'
  const heading = p.heading || 'Concursos'
  const subtitle = p.subtitle || 'Mostre seu talento e concorra a prêmios em dinheiro, troféus e oportunidades únicas no maior festival de música de Maringá.'

  return (
    <>
      <Header />

      {/* Hero com foto */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-end">
        <Image
          src={heroImage}
          alt="Concursos do Festival de Música de Maringá"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/30" />
        <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 text-center w-full">
          <span className="inline-block bg-orange text-white font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs px-4 py-1.5 rounded-full mb-5">
            {badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase font-[family-name:var(--font-heading)]">
            {heading}
          </h1>
          <p className="mt-4 text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Grid de cards */}
      <section className="bg-white py-10 sm:py-20 lg:py-24">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          {/* Mobile: cards horizontais compactos */}
          <div className="sm:hidden flex flex-col gap-4">
            {contests.map((contest) => {
              const colors = COLOR_MAP[contest.color]
              return (
                <Link
                  key={contest.slug}
                  href={`/concursos/${contest.slug}`}
                  className="relative rounded-xl overflow-hidden flex h-36"
                >
                  {/* Imagem */}
                  <div className="relative w-[40%] shrink-0">
                    <Image
                      src={contest.cardImage}
                      alt={contest.title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-2.5 left-2.5 w-9 h-9 rounded-full ${colors.badge} flex flex-col items-center justify-center text-white shadow-lg`}>
                      <span className="text-xs font-black leading-none">
                        {contest.date.match(/\d+/)?.[0]}
                      </span>
                      <span className="text-[5px] uppercase tracking-wider font-bold">Out</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 bg-gray-50 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`${getStatusColor(contest.status)} text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}>
                          {getStatusLabel(contest.status)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 font-[family-name:var(--font-heading)] leading-tight mb-1">
                        {contest.title}
                      </h3>
                      <p className="text-gray-500 text-[11px] leading-snug line-clamp-2">
                        {contest.subtitle}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 ${colors.badge} text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit`}>
                      Saiba Mais <ArrowIcon className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Desktop: cards verticais 3 colunas */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {contests.map((contest) => {
              const colors = COLOR_MAP[contest.color]
              return (
                <Link
                  key={contest.slug}
                  href={`/concursos/${contest.slug}`}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/4] block hover:-translate-y-2 transition-transform duration-300 ease-out"
                >
                  <Image
                    src={contest.cardImage}
                    alt={contest.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className={`${getStatusColor(contest.status)} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm`}>
                      {getStatusLabel(contest.status)}
                    </span>
                  </div>

                  <div className={`absolute top-5 right-5 w-11 h-11 rounded-full ${colors.badge} flex flex-col items-center justify-center text-white shadow-lg backdrop-blur-sm`}>
                    <span className="text-sm font-black leading-none">
                      {contest.date.match(/\d+/)?.[0]}
                    </span>
                    <span className="text-[7px] uppercase tracking-wider font-bold">Out</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight drop-shadow-lg mb-2">
                      {contest.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-3">
                      {contest.subtitle}
                    </p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium mb-4">
                      {contest.location} — {contest.time}
                    </p>
                    <span className={`inline-flex items-center gap-2 ${colors.badge} text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit`}>
                      Saiba Mais <ArrowIcon />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
