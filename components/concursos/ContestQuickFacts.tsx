import type { Contest } from '@/lib/types'
import { getStatusLabel, getTotalPrize, COLOR_HEX } from '@/lib/helpers'

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14M9 3v2a3 3 0 006 0V3M5 3a2 2 0 00-2 2v2a5 5 0 005 5h0a5 5 0 005-5V5a2 2 0 00-2-2M12 12v4m-3 4h6" />
    </svg>
  )
}

function StatusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

const FACTS = [
  { key: 'date', icon: CalendarIcon, getLabel: () => 'Data', getValue: (c: Contest) => `${c.date} — ${c.time}` },
  { key: 'location', icon: MapPinIcon, getLabel: () => 'Local', getValue: (c: Contest) => c.location },
  { key: 'prize', icon: TrophyIcon, getLabel: () => 'Premiação Total', getValue: (c: Contest) => getTotalPrize(c) },
  { key: 'status', icon: StatusIcon, getLabel: () => 'Status', getValue: (c: Contest) => getStatusLabel(c.status) },
] as const

export default function ContestQuickFacts({ contest }: { contest: Contest }) {
  const accentColor = COLOR_HEX[contest.color]

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container-site px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {FACTS.map(({ key, icon: Icon, getLabel, getValue }) => (
            <div key={key} className="flex items-start gap-2 sm:gap-3">
              <div
                className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5"
                style={{ backgroundColor: accentColor }}
              >
                <Icon />
              </div>
              <div>
                <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {getLabel()}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
                  {getValue(contest)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
