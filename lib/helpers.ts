/* ─── Pure Helpers ─── */
/* These are pure functions with no Payload/server dependencies.
   Safe to import from 'use client' components. */

import type { FestivalEvent, Venue, Contest, ExchangePoint } from './types'

/* ─── Color constants ─── */

export const COLOR_MAP: Record<
  Contest['color'],
  { bg: string; text: string; badge: string; border: string; ring: string }
> = {
  purple: {
    bg: 'bg-purple',
    text: 'text-purple',
    badge: 'bg-purple',
    border: 'border-purple',
    ring: 'ring-purple',
  },
  orange: {
    bg: 'bg-orange',
    text: 'text-orange',
    badge: 'bg-orange',
    border: 'border-orange',
    ring: 'ring-orange',
  },
  cyan: {
    bg: 'bg-cyan',
    text: 'text-cyan',
    badge: 'bg-cyan',
    border: 'border-cyan',
    ring: 'ring-cyan',
  },
}

export const COLOR_HEX: Record<Contest['color'], string> = {
  purple: '#a71580',
  orange: '#e9530d',
  cyan: '#00b4c5',
}

/* ─── Schedule helpers ─── */

export function getVenuesForDay(events: FestivalEvent[]): Venue[] {
  const seen = new Set<string>()
  const venues: Venue[] = []

  for (const ev of events) {
    if (!seen.has(ev.venue.id)) {
      seen.add(ev.venue.id)
      venues.push(ev.venue)
    }
  }

  return venues
}

export function filterEvents(
  events: FestivalEvent[],
  venueId: string | null,
): FestivalEvent[] {
  if (!venueId) return events
  return events.filter((ev) => ev.venue.id === venueId)
}

/* ─── Exchange points ─── */

export function findNearestPoint(
  points: ExchangePoint[],
  cep: string,
): ExchangePoint {
  const cleaned = cep.replace(/\D/g, '').slice(0, 5)

  if (cleaned.length === 5) {
    const match = points.find((p) => p.cepPrefix.includes(cleaned))
    if (match) return match
  }

  return points[0]
}

/* ─── News helpers ─── */

export function formatPostDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* ─── Contest helpers ─── */

export function getTotalPrize(contest: Contest): string {
  const total = contest.prizes.reduce((acc, p) => {
    const num = parseFloat(
      p.amount.replace(/[^\d.,]/g, '').replace('.', '').replace(',', '.'),
    )
    return acc + (isNaN(num) ? 0 : num)
  }, 0)
  return `R$ ${total.toLocaleString('pt-BR')}`
}

export function getStatusLabel(status: Contest['status']): string {
  const labels: Record<Contest['status'], string> = {
    aberto: 'Inscrições Abertas',
    encerrado: 'Encerrado',
    'em-breve': 'Em Breve',
  }
  return labels[status]
}

export function getStatusColor(status: Contest['status']): string {
  const colors: Record<Contest['status'], string> = {
    aberto: 'bg-green-500',
    encerrado: 'bg-red-500',
    'em-breve': 'bg-gray-500',
  }
  return colors[status]
}
