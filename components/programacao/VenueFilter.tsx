'use client'

import type { Venue } from '@/lib/types'

export default function VenueFilter({
  venues,
  selectedVenueId,
  onSelect,
}: {
  venues: Venue[]
  selectedVenueId: string | null
  onSelect: (venueId: string | null) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-4 sm:py-5">
      <button
        onClick={() => onSelect(null)}
        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
          selectedVenueId === null
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Todos os Palcos
      </button>

      {venues.map((venue) => {
        const isActive = selectedVenueId === venue.id
        return (
          <button
            key={venue.id}
            onClick={() => onSelect(venue.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={isActive ? { backgroundColor: venue.color } : undefined}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: isActive ? '#fff' : venue.color }}
            />
            {venue.shortName}
          </button>
        )
      })}
    </div>
  )
}
