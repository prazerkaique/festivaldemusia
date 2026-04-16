'use client'

import { useState, useMemo } from 'react'
import type { FestivalDay } from '@/lib/types'
import { getVenuesForDay, filterEvents } from '@/lib/helpers'
import DaySelector from './DaySelector'
import VenueFilter from './VenueFilter'
import TimelineGroup from './TimelineGroup'
import EmptyState from './EmptyState'

export default function ScheduleShell({ days }: { days: FestivalDay[] }) {
  const [selectedDate, setSelectedDate] = useState(days[0]?.date ?? '')
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null)

  const currentDay = days.find((d) => d.date === selectedDate) ?? days[0]
  const venues = useMemo(() => getVenuesForDay(currentDay?.events ?? []), [currentDay])
  const filtered = useMemo(() => filterEvents(currentDay?.events ?? [], selectedVenueId), [currentDay, selectedVenueId])

  function handleDayChange(date: string) {
    setSelectedDate(date)
    setSelectedVenueId(null)
  }

  return (
    <>
      <DaySelector days={days} selectedDate={selectedDate} onSelect={handleDayChange} />

      <section className="bg-white py-6 sm:py-8">
        <div className="container-site px-4 sm:px-6 lg:px-8">
          {/* Day title */}
          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase font-[family-name:var(--font-heading)]">
              {currentDay?.dayNumber} de Outubro
              <span className="text-gray-400 font-normal lowercase ml-2 text-lg sm:text-xl">
                {currentDay?.dayOfWeekFull}
              </span>
            </h2>
          </div>

          {venues.length > 1 && (
            <VenueFilter
              venues={venues}
              selectedVenueId={selectedVenueId}
              onSelect={setSelectedVenueId}
            />
          )}

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="mt-4">
              <TimelineGroup events={filtered} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
