import type { FestivalEvent } from '@/lib/types'
import EventCard from './EventCard'

export default function TimelineGroup({ events }: { events: FestivalEvent[] }) {
  const hasImageCards = events.some((e) => e.imageLayout)

  if (hasImageCards) {
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    )
  }

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
