import Image from 'next/image'
import type { FestivalEvent } from '@/lib/types'

function ImageCard({ event }: { event: FestivalEvent }) {
  return (
    <div className="group relative overflow-hidden rounded-xl cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 ease-out h-[120px] sm:h-[140px]">
      <Image
        src={event.thumbnail!}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 700px"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/50 to-transparent" />

      {/* Content — single row layout */}
      <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-5">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <p className="text-xl sm:text-2xl font-black text-white font-[family-name:var(--font-heading)] leading-none drop-shadow-lg shrink-0">
            {event.timeDisplay}
          </p>
          <div className="w-px h-8 bg-white/25 shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white font-[family-name:var(--font-heading)] leading-snug drop-shadow-lg truncate">
              {event.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="inline-flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: event.venue.color }}
              >
                {event.venue.shortName}
              </span>
              {event.note && (
                <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-orange px-2 py-0.5 rounded-full">
                  {event.note}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineCard({ event }: { event: FestivalEvent }) {
  return (
    <div className="group flex gap-4 sm:gap-6 items-start py-5 sm:py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200 -mx-2 px-2 rounded-xl">
      {/* Time */}
      <div className="shrink-0 w-[88px] sm:w-[100px] text-right pt-0.5">
        <p className="text-lg sm:text-xl font-black text-gray-900 font-[family-name:var(--font-heading)] leading-tight">
          {event.timeDisplay}
        </p>
      </div>

      {/* Dot + line */}
      <div className="shrink-0 flex flex-col items-center pt-1.5">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: event.venue.color }}
        />
        <div className="w-px flex-1 bg-gray-200 mt-1.5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 font-[family-name:var(--font-heading)] leading-snug">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="inline-flex items-center text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: event.venue.color }}
          >
            {event.venue.shortName}
          </span>
          {event.note && (
            <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange bg-orange/10 px-2.5 py-0.5 rounded-full">
              {event.note}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EventCard({ event }: { event: FestivalEvent }) {
  if (event.imageLayout && event.thumbnail) {
    return <ImageCard event={event} />
  }
  return <TimelineCard event={event} />
}
