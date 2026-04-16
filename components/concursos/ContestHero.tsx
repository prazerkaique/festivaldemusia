import Image from 'next/image'
import type { Contest } from '@/lib/types'
import { getStatusLabel, getStatusColor, COLOR_MAP } from '@/lib/helpers'

export default function ContestHero({ contest }: { contest: Contest }) {
  const colors = COLOR_MAP[contest.color]

  return (
    <section className="relative h-[240px] sm:h-[400px] overflow-hidden">
      <Image
        src={contest.image}
        alt={contest.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end container-site px-4 sm:px-6 lg:px-8 pb-6 sm:pb-14">
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <span className={`${getStatusColor(contest.status)} text-white text-[8px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full`}>
            {getStatusLabel(contest.status)}
          </span>
          <span className={`${colors.badge} text-white text-[8px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full`}>
            {contest.date}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white uppercase font-[family-name:var(--font-heading)] leading-tight max-w-3xl">
          {contest.title}
        </h1>
        <p className="mt-1.5 sm:mt-3 text-white/70 text-sm sm:text-lg max-w-2xl">
          {contest.subtitle}
        </p>
      </div>
    </section>
  )
}
