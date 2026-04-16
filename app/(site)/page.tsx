import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/FooterServer'
import { getHomePage, getSiteSettings, getFeaturedArtists, getSponsors } from '@/lib/payload-fetchers'
import { buildMetadata } from '@/lib/seo'
import { EventJsonLd } from '@/components/seo/JsonLd'

const Countdown = dynamic(() => import('@/components/ui/Countdown'))
const CounterStats = dynamic(() => import('@/components/ui/CounterStats'))
const PhotoCarousel = dynamic(() => import('@/components/ui/PhotoCarousel'))
const PillarWords = dynamic(() => import('@/components/ui/PillarWords'))
const ColorBadgeLink = dynamic(() => import('@/components/ui/ColorBadgeLink'))
const VideoParallax = dynamic(() => import('@/components/ui/VideoParallax'))
const VideoParallaxMobile = dynamic(() => import('@/components/ui/VideoParallaxMobile'))
const AboutVideo = dynamic(() => import('@/components/ui/AboutVideo'))
const ScrollReveal = dynamic(() => import('@/components/ui/ScrollReveal'))
const ConcursosCarousel = dynamic(() => import('@/components/ui/ConcursosCarousel'))

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()])
  const h = home as any
  const s = settings as any

  return buildMetadata({
    title: h.metaTitle || undefined,
    description: h.metaDescription || undefined,
    ogImage: h.ogImage,
    defaultOgImage: s.defaultOgImage,
    path: '/',
  })
}

function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

const COLOR_MAP: Record<string, string> = {
  purple: 'bg-purple',
  orange: 'bg-orange',
  cyan: 'bg-cyan',
}

export default async function Home() {
  const [home, settings, artists, sponsors] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getFeaturedArtists(),
    getSponsors(),
  ])

  const h = home as any
  const s = settings as any

  const countdownDate = h.countdownTargetDate || '2026-10-13T18:00:00-03:00'
  const heroSubtitle = h.heroSubtitle || 'A cidade se torna instrumento, o povo se torna platéia e a música é a protagonista.'
  const countdownLabel = h.heroCountdownLabel || 'Falta pouco para o festival'
  const cta1Label = h.heroCta1Label || 'Garanta sua vaga'
  const cta1Href = h.heroCta1Href || '/garanta-sua-vaga'
  const cta2Label = h.heroCta2Label || 'Ver Programação'
  const cta2Href = h.heroCta2Href || '#programacao'

  const aboutBadge = h.aboutBadge || 'O Festival'
  const aboutHeading = h.aboutHeading || 'Transformar Maringá na'
  const aboutHeadingAccent = h.aboutHeadingAccent || 'Capital da Música'
  const aboutP1 = h.aboutParagraph1 || 'Em 2026, o festival propõe unir cultura, educação e entretenimento, fortalecendo a identidade artística local. De 13 a 19 de outubro, a música toma conta das ruas, praças, escolas, teatros e espaços públicos.'
  const aboutP2 = h.aboutParagraph2 || 'Inspirado no Festival de Dança de Joinville e no Festival de Música de Viena, o projeto nasceu com a missão de posicionar Maringá — a Cidade Canção — como polo musical de referência nacional.'

  const statsLabel = h.statsLabel || 'Edição 2025 em Números'
  const statsFooter = h.statsFooter || 'em 2026 esperamos ainda mais'
  const statsArray = h.stats && Array.isArray(h.stats) && h.stats.length > 0
    ? h.stats.map((stat: any) => ({
        value: stat.value ?? 0,
        suffix: stat.suffix ?? '',
        label: stat.label ?? '',
        color: stat.color ?? 'purple',
      }))
    : undefined

  const atracoesBadge = h.atracoesBadge || 'Confirmados'
  const atracoesHeading = h.atracoesHeading || 'Principais Atrações'

  const locationBadge = h.locationBadge || 'O Local'
  const locationHeading = h.locationHeading || 'Maringá,'
  const locationHeadingAccent = h.locationHeadingAccent || 'Cidade Canção'
  const locationDescription = h.locationDescription || 'O festival acontece em diversos pontos da cidade — teatros, praças, ruas, parques, escolas, aeroporto e rodoviária. Uma semana inteira de música espalhada por Maringá.'

  const pillarWords = s.pillarWords && Array.isArray(s.pillarWords) && s.pillarWords.length > 0
    ? s.pillarWords.map((pw: any) => pw.word ?? '')
    : undefined

  const festivalDates = s.festivalDates || '13 a 19 de Outubro de 2026'
  const festivalLocation = s.festivalLocation || 'Maringá, Paraná'
  const phone = s.phone || '(44) 3220-4003'
  const address = s.address || 'Av. Getúlio Vargas, 266 — Térreo (Maringá FM)'
  const ingressoRule = s.ingressoRule || '1KG de Alimento = 1 Ingresso'
  const ingressoLimit = s.ingressoLimit || 'limitado a 3 por pessoa'
  const ingressoStartDate = s.ingressoStartDate || '13/10'
  const ingressoHours = s.ingressoHours || '9h às 18h'

  const festivalName = s.festivalName || 'Festival de Musica de Maringa e Regiao'

  return (
    <>
      <Header />
      <EventJsonLd
        name={festivalName}
        startDate="2026-10-13"
        endDate="2026-10-19"
        location={festivalLocation}
        description={`${festivalName} — ${festivalDates}. Cultura, educacao e entretenimento em sete dias de programacao. Ingresso solidario.`}
        organizerName={festivalName}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden grain">
        <Image
          src="/assets/hero-concert.jpg"
          alt="Público no Festival de Música de Maringá"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/40 to-gray-950/95 z-[1]" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-22 sm:pt-24 lg:pt-22 pb-10 sm:pb-12 lg:pb-10">
          <p className="hero-stagger-1 text-orange font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6">
            {festivalDates} — {festivalLocation?.split(',')[0]?.trim()}, PR
          </p>

          <h1 className="hero-stagger-2">
            <Image
              src="/assets/wordmark-festival.png"
              alt="Festival de Música de Maringá"
              width={800}
              height={400}
              className="mx-auto w-[260px] sm:w-[360px] lg:w-[460px] xl:w-[520px] h-auto brightness-0 invert"
              priority
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 520px"
            />
          </h1>

          <p className="hero-stagger-3 mt-4 sm:mt-5 text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="hero-stagger-4 mt-6 sm:mt-7">
            <p className="text-white text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-4">
              {countdownLabel}
            </p>
            <Countdown targetDate={countdownDate} />
          </div>

          <div className="hero-stagger-5 mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <ColorBadgeLink
              href={cta1Href}
              className="bg-orange px-10 py-3.5 rounded-full font-bold text-white uppercase tracking-wider text-sm hover:scale-105"
            >
              {cta1Label}
            </ColorBadgeLink>
            <ColorBadgeLink
              href={cta2Href}
              className="border border-white/30 px-10 py-3.5 rounded-full font-bold text-white uppercase tracking-wider text-sm hover:scale-105"
            >
              {cta2Label}
            </ColorBadgeLink>
          </div>
        </div>
      </section>

      {/* ═══════════ INGRESSO SOLIDÁRIO — STRIP ═══════════ */}
      <section className="bg-orange py-2.5 sm:py-5">
        {/* Desktop */}
        <div className="hidden sm:block container-site px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 text-white">
            <p className="font-bold uppercase tracking-wider text-base">
              Troca de Ingressos: a partir de {ingressoStartDate} — {ingressoHours}
            </p>
            <span className="text-white/40">|</span>
            <p className="text-white/90 text-sm">
              {address}
            </p>
            <span className="text-white/40">|</span>
            <p className="font-bold text-sm">
              {ingressoRule} <span className="text-white/70 font-normal">({ingressoLimit})</span>
            </p>
          </div>
        </div>
        {/* Mobile — marquee */}
        <div className="sm:hidden overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-flex text-white text-xs font-bold uppercase tracking-wider">
            <span className="inline-block px-8">Troca de Ingressos: {ingressoStartDate} — {ingressoHours} &nbsp;&middot;&nbsp; {address?.split('—')[0]?.trim()} &nbsp;&middot;&nbsp; {ingressoRule} (max 3)</span>
            <span className="inline-block px-8">Troca de Ingressos: {ingressoStartDate} — {ingressoHours} &nbsp;&middot;&nbsp; {address?.split('—')[0]?.trim()} &nbsp;&middot;&nbsp; {ingressoRule} (max 3)</span>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 relative">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-10">
              {statsLabel}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <CounterStats stats={statsArray} />
          </ScrollReveal>
          <p className="text-center text-gray-400 text-sm sm:text-base mt-10 font-medium tracking-wide">
            {statsFooter}
          </p>
          <div className="flex justify-center mt-4">
            <svg
              className="animate-bounce-down"
              width="28"
              height="16"
              viewBox="0 0 28 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 16L0 0h28L14 16z" fill="#e9530d" />
            </svg>
          </div>
        </div>

      </section>

      {/* ═══════════ ABOUT — COMBINED ═══════════ */}
      <section id="sobre" className="bg-peach pt-8 lg:pt-16 pb-12 sm:pb-28 lg:pb-32 relative overflow-visible">
        <div className="container-site px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
            {/* Video — first on mobile */}
            <ScrollReveal direction="none" className="order-1 lg:order-2">
              <AboutVideo />
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <span className="hidden lg:inline-block bg-orange text-white font-bold uppercase tracking-[0.25em] text-xs sm:text-sm px-4 py-1.5 rounded-full mb-6">
                {aboutBadge}
              </span>
              <h2 className="hidden lg:block text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-[family-name:var(--font-heading)] leading-tight">
                {aboutHeading}{' '}
                <span className="text-orange">{aboutHeadingAccent}</span>
              </h2>
              <p className="mt-4 lg:mt-6 text-gray-800 leading-relaxed text-sm lg:text-lg">
                {aboutP1}
              </p>
              <p className="mt-3 lg:mt-4 text-gray-700 leading-relaxed text-sm lg:text-base">
                {aboutP2}
              </p>
              <div className="mt-6 lg:mt-10 flex gap-3 lg:gap-4">
                <ColorBadgeLink
                  href="#pilares"
                  className="inline-flex items-center gap-2 bg-orange text-white px-5 lg:px-8 py-3 lg:py-4 rounded-full text-xs lg:text-sm font-bold uppercase tracking-wider hover:scale-105"
                >
                  Pilares
                </ColorBadgeLink>
                <ColorBadgeLink
                  href="#programacao"
                  className="inline-flex items-center gap-2 border-2 border-gray-900 px-5 lg:px-8 py-3 lg:py-4 rounded-full text-xs lg:text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-white"
                >
                  <span>→</span> Programação
                </ColorBadgeLink>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ PRINCIPAIS ATRAÇÕES ═══════════ */}
      <section id="atracoes" className="bg-white pt-10 sm:pt-12 lg:pt-14 pb-14 sm:pb-18 lg:pb-20 relative overflow-hidden">
        {/* Decorative dots — desktop only */}
        <div className="hidden sm:block absolute top-6 left-6 w-64 h-64 opacity-[0.30]" style={{ backgroundImage: 'radial-gradient(circle, #a71580 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
        <div className="hidden sm:block absolute bottom-6 right-6 w-72 h-72 opacity-[0.30]" style={{ backgroundImage: 'radial-gradient(circle, #e9530d 2px, transparent 2px)', backgroundSize: '20px 20px' }} />

        <div className="container-site px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-3">
              {atracoesBadge}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-3">
              {atracoesHeading}
            </h2>
          </ScrollReveal>
          <div className="flex justify-center mb-10 sm:mb-14">
            <ColorBadgeLink
              href="#programacao"
              className="inline-flex items-center gap-3 border-2 border-gray-900 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-white"
            >
              Ver Programação Completa <span>→</span>
            </ColorBadgeLink>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-10 max-w-4xl mx-auto">
            {artists.length > 0 ? (
              artists.map((artist, i) => (
                <ScrollReveal key={artist.id} delay={100 + i * 150}>
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] sm:aspect-[4/5]">
                    <Image
                      src={artist.photo.url}
                      alt={artist.name}
                      width={artist.photo.width || 768}
                      height={artist.photo.height || 1024}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                    <div className={`absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 sm:w-20 sm:h-20 rounded-full ${COLOR_MAP[artist.color] ?? 'bg-purple'} flex flex-col items-center justify-center text-white shadow-[0_4px_20px_rgba(167,21,128,0.5)]`}>
                      <span className="text-sm sm:text-2xl font-black leading-none">{artist.dayNumber}</span>
                      <span className="text-[7px] sm:text-xs uppercase tracking-wider font-bold">Out</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-8">
                      <p className="hidden sm:block text-white/60 text-sm uppercase tracking-wider font-medium mb-1">{artist.date}</p>
                      <h3 className="text-base sm:text-3xl lg:text-4xl font-black text-white uppercase font-[family-name:var(--font-heading)]">
                        {artist.name}
                      </h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <>
                {/* Fallback — hardcoded cards */}
                <ScrollReveal delay={100}>
                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] sm:aspect-[4/5]">
                  <Image src="/assets/atracoes/pedro-emilio.webp" alt="Pedro Emílio" width={768} height={1024} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-purple flex flex-col items-center justify-center text-white shadow-[0_4px_20px_rgba(167,21,128,0.5)]">
                    <span className="text-sm sm:text-2xl font-black leading-none">14</span>
                    <span className="text-[7px] sm:text-xs uppercase tracking-wider font-bold">Out</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-8">
                    <p className="hidden sm:block text-white/60 text-sm uppercase tracking-wider font-medium mb-1">Dia 14 de Outubro</p>
                    <h3 className="text-base sm:text-3xl lg:text-4xl font-black text-white uppercase font-[family-name:var(--font-heading)]">Pedro Emílio</h3>
                  </div>
                </div>
                </ScrollReveal>
                <ScrollReveal delay={250}>
                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] sm:aspect-[4/5]">
                  <Image src="/assets/atracoes/pedro-paulo-alex.jpg" alt="Pedro Paulo & Alex" width={480} height={480} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-purple flex flex-col items-center justify-center text-white shadow-[0_4px_20px_rgba(167,21,128,0.5)]">
                    <span className="text-sm sm:text-2xl font-black leading-none">17</span>
                    <span className="text-[7px] sm:text-xs uppercase tracking-wider font-bold">Out</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-8">
                    <p className="hidden sm:block text-white/60 text-sm uppercase tracking-wider font-medium mb-1">Dia 17 de Outubro</p>
                    <h3 className="text-base sm:text-3xl lg:text-4xl font-black text-white uppercase font-[family-name:var(--font-heading)]">Pedro Paulo & Alex</h3>
                  </div>
                </div>
                </ScrollReveal>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ PILLARS — CAROUSEL + PHRASES ═══════════ */}
      <section id="pilares" className="bg-cyan pt-8 sm:pt-10 pb-8 sm:pb-10 overflow-hidden">
        {/* Phrases */}
        <div className="container-site px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <PillarWords words={pillarWords} />
        </div>

        {/* Auto-scrolling photo carousel */}
        <PhotoCarousel />
      </section>

      {/* ═══════════ CONCURSOS ═══════════ */}
      <section id="concursos" className="bg-white py-16 sm:py-24 lg:py-28 overflow-hidden">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-2">
              Participe
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-12 sm:mb-16">
              Concursos
            </h2>
          </ScrollReveal>

          {/* Mobile — carousel with arrows */}
          <div className="sm:hidden">
            <ConcursosCarousel />
          </div>

          {/* Mobile CTA */}
          <div className="sm:hidden flex justify-center mt-6">
            <ColorBadgeLink
              href="/concursos"
              className="inline-flex items-center gap-2 border-2 border-gray-900 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 hover:text-white"
            >
              Ver Todos os Concursos <ArrowIcon className="w-3 h-3" />
            </ColorBadgeLink>
          </div>

          {/* Desktop — grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            <ScrollReveal delay={100}>
            <Link href="/concursos/musica-estudantil" className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/4] block hover:-translate-y-2 transition-transform duration-300 ease-out">
              <Image src="/assets/jovem.jpg" alt="Concurso de Música Estudantil" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 1024px) 30vw, 350px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="bg-purple text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Inscrições Abertas
                </span>
              </div>
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-purple flex flex-col items-center justify-center text-white shadow-lg backdrop-blur-sm">
                <span className="text-sm font-black leading-none">15</span>
                <span className="text-[7px] uppercase tracking-wider font-bold">Out</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight drop-shadow-lg mb-2">
                  Concurso de Música Estudantil
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  Jovens talentos competem por prêmios de até R$3.000. O palco da próxima geração musical.
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium mb-4">
                  Local e horário a definir
                </p>
                <span className="inline-flex items-center gap-2 bg-purple text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-purple-dark transition-colors w-fit">
                  Saiba Mais <ArrowIcon className="w-3 h-3" />
                </span>
              </div>
            </Link>
            </ScrollReveal>

            <ScrollReveal delay={200}>
            <Link href="/concursos/mega-concert" className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/4] block hover:-translate-y-2 transition-transform duration-300 ease-out">
              <Image src="/assets/rock.jpg" alt="Mega Concert" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 1024px) 30vw, 350px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="bg-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Inscrições Abertas
                </span>
              </div>
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-orange flex flex-col items-center justify-center text-white shadow-lg backdrop-blur-sm">
                <span className="text-sm font-black leading-none">18</span>
                <span className="text-[7px] uppercase tracking-wider font-bold">Out</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight drop-shadow-lg mb-2">
                  Mega Concert
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  O grande encerramento: milhares de pessoas reunidas em uma celebração musical coletiva.
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium mb-4">
                  Local e horário a definir
                </p>
                <span className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-orange-dark transition-colors w-fit">
                  Saiba Mais <ArrowIcon className="w-3 h-3" />
                </span>
              </div>
            </Link>
            </ScrollReveal>

            <ScrollReveal delay={300}>
            <Link href="/concursos/hackathon" className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/4] block hover:-translate-y-2 transition-transform duration-300 ease-out">
              <Image src="/assets/raka.jpg" alt="Hackathon" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 1024px) 30vw, 350px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="bg-cyan text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Inscrições Abertas
                </span>
              </div>
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-cyan flex flex-col items-center justify-center text-white shadow-lg backdrop-blur-sm">
                <span className="text-sm font-black leading-none">16</span>
                <span className="text-[7px] uppercase tracking-wider font-bold">Out</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight drop-shadow-lg mb-2">
                  Hackathon
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  Maratona criativa de tecnologia e música — soluções inovadoras para o cenário musical.
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium mb-4">
                  Local e horário a definir
                </p>
                <span className="inline-flex items-center gap-2 bg-cyan text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-cyan-dark transition-colors w-fit">
                  Saiba Mais <ArrowIcon className="w-3 h-3" />
                </span>
              </div>
            </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ LOCATION — MOBILE (parallax + content) ═══════════ */}
      <section id="local" className="lg:hidden bg-white relative">
        <VideoParallaxMobile />
      </section>

      {/* ═══════════ LOCATION + PARALLAX — DESKTOP ═══════════ */}
      <section className="hidden lg:block bg-white relative" style={{ height: '250vh' }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container-site px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-2 gap-16 items-center">
              {/* Text — left */}
              <ScrollReveal direction="left">
              <div>
                <span className="inline-block bg-purple text-white font-bold uppercase tracking-[0.25em] text-sm px-4 py-1.5 rounded-full mb-6">
                  {locationBadge}
                </span>
                <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] leading-[0.95] mb-6">
                  {locationHeading}
                  <br />
                  <span className="text-purple">{locationHeadingAccent}</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-8">
                  {locationDescription}
                </p>

                {/* Info pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 bg-purple/10 border border-purple/20 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {festivalLocation}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-purple/10 border border-purple/20 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {festivalDates}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-purple/10 border border-purple/20 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {phone}
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex gap-4">
                  <ColorBadgeLink
                    href="/programacao"
                    className="inline-flex items-center justify-center gap-3 bg-purple text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105"
                  >
                    Ver Programação
                    <ArrowIcon />
                  </ColorBadgeLink>
                  <ColorBadgeLink
                    href="/garanta-sua-vaga"
                    className="inline-flex items-center justify-center gap-3 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105"
                  >
                    Garanta sua Vaga
                    <ArrowIcon />
                  </ColorBadgeLink>
                </div>
              </div>
              </ScrollReveal>

              {/* Parallax video — right */}
              <VideoParallax />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SPONSORS ═══════════ */}
      <section className="bg-white border-t border-gray-900 py-10 sm:py-24 lg:py-28">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)] text-center mb-6 sm:mb-10">
            Parceiros & Apoiadores
          </h2>

          {sponsors.length > 0 ? (
            <>
              {/* Mobile — auto-scrolling carousel */}
              <div className="sm:hidden overflow-hidden">
                <div className="animate-marquee-sponsors inline-flex items-center gap-10">
                  {[...sponsors, ...sponsors].map((sp, i) => (
                    <Image key={`${sp.id}-${i}`} src={sp.logo.url} alt={i >= sponsors.length ? '' : sp.name} width={sp.logo.width || 200} height={sp.logo.height || 100} className="h-14 w-auto shrink-0" aria-hidden={i >= sponsors.length} sizes="150px" />
                  ))}
                </div>
              </div>
              {/* Desktop — static layout */}
              <div className="hidden sm:flex flex-col items-center gap-8">
                {sponsors.filter(sp => sp.tier === 'master').map(sp => (
                  <Image key={sp.id} src={sp.logo.url} alt={sp.name} width={sp.logo.width || 200} height={sp.logo.height || 100} className="h-32 lg:h-40 w-auto" sizes="300px" />
                ))}
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {sponsors.filter(sp => sp.tier !== 'master').map(sp => (
                    <Image key={sp.id} src={sp.logo.url} alt={sp.name} width={sp.logo.width || 200} height={sp.logo.height || 100} className="h-20 w-auto" sizes="200px" />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Fallback — hardcoded sponsors */}
              <div className="sm:hidden overflow-hidden">
                <div className="animate-marquee-sponsors inline-flex items-center gap-10">
                  <Image src="/assets/sponsors/lei-rouanet.png" alt="Lei de Incentivo à Cultura" width={808} height={516} className="h-16 w-auto shrink-0" sizes="150px" />
                  <Image src="/assets/sponsors/prefeitura-maringa.png" alt="Prefeitura de Maringá" width={352} height={408} className="h-14 w-auto shrink-0" sizes="150px" />
                  <Image src="/assets/sponsors/gmc.png" alt="Grupo Maringá de Comunicação" width={616} height={375} className="h-11 w-auto shrink-0" sizes="150px" />
                  <Image src="/assets/sponsors/uem.png" alt="Universidade Estadual de Maringá" width={3291} height={1588} className="h-11 w-auto shrink-0" sizes="150px" />
                  <Image src="/assets/sponsors/luzamor.png" alt="Teatro Luzamor" width={240} height={240} className="h-14 w-auto shrink-0" sizes="150px" />
                  <Image src="/assets/sponsors/nerau.png" alt="Nerau CX" width={1822} height={500} className="h-11 w-auto shrink-0" sizes="150px" />
                  <Image src="/assets/sponsors/lei-rouanet.png" alt="" width={808} height={516} className="h-16 w-auto shrink-0" aria-hidden="true" sizes="150px" />
                  <Image src="/assets/sponsors/prefeitura-maringa.png" alt="" width={352} height={408} className="h-14 w-auto shrink-0" aria-hidden="true" sizes="150px" />
                  <Image src="/assets/sponsors/gmc.png" alt="" width={616} height={375} className="h-11 w-auto shrink-0" aria-hidden="true" sizes="150px" />
                  <Image src="/assets/sponsors/uem.png" alt="" width={3291} height={1588} className="h-11 w-auto shrink-0" aria-hidden="true" sizes="150px" />
                  <Image src="/assets/sponsors/luzamor.png" alt="" width={240} height={240} className="h-14 w-auto shrink-0" aria-hidden="true" sizes="150px" />
                  <Image src="/assets/sponsors/nerau.png" alt="" width={1822} height={500} className="h-11 w-auto shrink-0" aria-hidden="true" sizes="150px" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-center gap-8">
                <Image src="/assets/sponsors/lei-rouanet.png" alt="Lei de Incentivo à Cultura" width={808} height={516} className="h-32 lg:h-40 w-auto" sizes="300px" />
                <div className="flex flex-wrap items-center justify-center gap-10">
                  <Image src="/assets/sponsors/prefeitura-maringa.png" alt="Prefeitura de Maringá" width={352} height={408} className="h-[5.5rem] w-auto" sizes="200px" />
                  <Image src="/assets/sponsors/gmc.png" alt="Grupo Maringá de Comunicação" width={616} height={375} className="h-20 w-auto" sizes="200px" />
                  <Image src="/assets/sponsors/uem.png" alt="Universidade Estadual de Maringá" width={3291} height={1588} className="h-20 w-auto" sizes="200px" />
                  <Image src="/assets/sponsors/luzamor.png" alt="Teatro Luzamor" width={240} height={240} className="h-[5.5rem] w-auto" sizes="200px" />
                  <Image src="/assets/sponsors/nerau.png" alt="Nerau CX" width={1822} height={500} className="h-16 w-auto" sizes="200px" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
