interface ScheduleHeroProps {
  badge?: string
  heading?: string
  subtitle?: string
}

export default function ScheduleHero({
  badge = 'Programação 2026',
  heading = 'Programação',
  subtitle = '7 dias de música em 7 palcos pela cidade — 13 a 19 de Outubro',
}: ScheduleHeroProps) {
  return (
    <section className="relative bg-gray-950 grain overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple/10 via-transparent to-gray-950/50" />

      <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 text-center">
        <span className="inline-block bg-orange text-white font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs px-4 py-1.5 rounded-full mb-5">
          {badge}
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-none">
          {heading}
        </h1>
        <p className="mt-4 text-white/60 text-base sm:text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
