import Image from 'next/image'

interface NewsHeroProps {
  heroImage?: string
  badge?: string
  heading?: string
  subtitle?: string
}

export default function NewsHero({
  heroImage,
  badge = 'Blog',
  heading = 'Notícias do Festival',
  subtitle = 'Fique por dentro de tudo que acontece no Festival de Música de Maringá — programação, bastidores, concursos e muito mais.',
}: NewsHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={heroImage || '/assets/carrossel/sm_FESTMUSIC2025_0236.jpg'}
        alt="Público assistindo apresentação no Festival de Música de Maringá"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/30 to-gray-950/80 z-[1]" />

      <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
        <span className="hero-stagger-1 inline-block bg-cyan text-white font-bold uppercase tracking-[0.25em] text-xs sm:text-sm px-5 py-1.5 rounded-full mb-6">
          {badge}
        </span>
        <h1 className="hero-stagger-2 text-4xl sm:text-5xl lg:text-7xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-tight mb-5">
          {heading}
        </h1>
        <p className="hero-stagger-3 text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
