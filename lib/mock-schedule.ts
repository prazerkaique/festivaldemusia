/* ─── Schedule Data Layer ─── */

export interface Venue {
  id: string
  name: string
  shortName: string
  color: string
}

export interface FestivalEvent {
  id: string
  title: string
  timeDisplay: string
  date: string
  sortKey: string
  venue: Venue
  note?: string
  thumbnail?: string
  imageLayout?: boolean
}

export interface FestivalDay {
  date: string
  dayOfWeek: string
  dayOfWeekFull: string
  dayNumber: number
  label: string
  events: FestivalEvent[]
}

/* ─── Venues ─── */

export const VENUES: Venue[] = [
  { id: 'marista', name: 'Teatro Marista', shortName: 'Teatro Marista', color: '#e9530d' },
  { id: 'aeroporto', name: 'Aeroporto de Maringá', shortName: 'Aeroporto', color: '#dc2626' },
  { id: 'prefeitura', name: 'Prefeitura de Maringá', shortName: 'Prefeitura', color: '#a71580' },
  { id: 'saude', name: 'Secretaria de Saúde', shortName: 'Sec. Saúde', color: '#16a34a' },
  { id: 'calil', name: 'Teatro Calil Haddad', shortName: 'Calil Haddad', color: '#7c3aed' },
  { id: 'luzamor', name: 'Teatro Luzamor', shortName: 'Teatro Luzamor', color: '#00b4c5' },
  { id: 'terminal', name: 'Terminal Urbano de Maringá', shortName: 'Terminal Urbano', color: '#d97706' },
  { id: 'barracao', name: 'Teatro Barracão', shortName: 'Teatro Barracão', color: '#2563eb' },
  { id: 'alvorada', name: 'Salão Comunitário Jardim Alvorada', shortName: 'Jd. Alvorada', color: '#059669' },
  { id: 'rodoviaria', name: 'Rodoviária de Maringá', shortName: 'Rodoviária', color: '#b45309' },
  { id: 'willie', name: 'Feira do Produtor — Estádio Willie Davids', shortName: 'Estádio Willie Davids', color: '#0891b2' },
  { id: 'inga', name: 'Parque do Ingá', shortName: 'Parque do Ingá', color: '#16a34a' },
  { id: 'jorge', name: 'Travessa Jorge Amado', shortName: 'Travessa Jorge Amado', color: '#e9530d' },
]

const v = Object.fromEntries(VENUES.map((venue) => [venue.id, venue]))

/* ─── Carousel images for optional thumbnails ─── */

const THUMBS = [
  '/assets/carrossel/sm_FESTMUSIC2025_0017.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0026.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0028.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0045.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0058.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0104.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0129.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0164.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0179.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0203.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0218.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0236.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0251.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0406.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0438.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0467.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0601.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0661.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0751.jpg',
  '/assets/carrossel/sm_FESTMUSIC2025_0768.jpg',
]

function thumb(i: number) {
  return THUMBS[i % THUMBS.length]
}

/* ─── Real Events ─── */

const EVENTS: FestivalEvent[] = [
  // ── 13/10 Segunda-feira (com imagem) ──
  { id: 'e01', title: 'Oficina de Percussão Corporal com o Grupo Barbatuques', timeDisplay: '10h às 12h', date: '2026-10-13', sortKey: '10:00', venue: v.marista, note: 'Inscrições Esgotadas', thumbnail: thumb(0), imageLayout: true },
  { id: 'e02', title: 'Oficina de Percussão Corporal com o Grupo Barbatuques', timeDisplay: '15h às 17h', date: '2026-10-13', sortKey: '15:00', venue: v.marista, note: 'Inscrições Esgotadas', thumbnail: thumb(1), imageLayout: true },
  { id: 'e03', title: 'Apresentação musical com Ronaldo Gravino', timeDisplay: '16h30', date: '2026-10-13', sortKey: '16:30', venue: v.aeroporto, thumbnail: thumb(2), imageLayout: true },
  { id: 'e04', title: 'Roda de Conversa com Grupo Barbatuques', timeDisplay: '19h às 20h', date: '2026-10-13', sortKey: '19:00', venue: v.marista, thumbnail: thumb(3), imageLayout: true },

  // ── 14/10 Terça-feira ──
  { id: 'e05', title: 'Apresentação musical com Ronaldo Gravino', timeDisplay: '07h30', date: '2026-10-14', sortKey: '07:30', venue: v.prefeitura, thumbnail: thumb(4) },
  { id: 'e06', title: 'Show Barbatuques', timeDisplay: '20h', date: '2026-10-14', sortKey: '20:00', venue: v.marista, thumbnail: thumb(5) },

  // ── 15/10 Quarta-feira ──
  { id: 'e07', title: 'Apresentação musical com Naipe de Copas', timeDisplay: '07h30', date: '2026-10-15', sortKey: '07:30', venue: v.saude, thumbnail: thumb(6) },
  { id: 'e08', title: 'Concerto da Orquestra Sinfônica do Paraná', timeDisplay: '20h', date: '2026-10-15', sortKey: '20:00', venue: v.calil, thumbnail: thumb(7) },
  { id: 'e09', title: 'Convite à Música', timeDisplay: '20h', date: '2026-10-15', sortKey: '20:00', venue: v.luzamor, thumbnail: thumb(8) },

  // ── 16/10 Quinta-feira ──
  { id: 'e10', title: 'Apresentação musical com Escola ADM Academia de Música', timeDisplay: '17h', date: '2026-10-16', sortKey: '17:00', venue: v.terminal, thumbnail: thumb(9) },
  { id: 'e11', title: 'Convite à Música com Pé de Laranjeira', timeDisplay: '20h', date: '2026-10-16', sortKey: '20:00', venue: v.barracao, thumbnail: thumb(10) },

  // ── 17/10 Sexta-feira ──
  { id: 'e12', title: 'Baile da Longevidade com show de Tercilio Men', timeDisplay: '14h', date: '2026-10-17', sortKey: '14:00', venue: v.alvorada, thumbnail: thumb(11) },
  { id: 'e13', title: 'Concurso de Música Estudantil', timeDisplay: '19h', date: '2026-10-17', sortKey: '19:00', venue: v.marista, thumbnail: thumb(12) },
  { id: 'e14', title: 'Apresentação Musical Nalva Máximo', timeDisplay: '20h', date: '2026-10-17', sortKey: '20:00', venue: v.rodoviaria, thumbnail: thumb(13) },

  // ── 18/10 Sábado ──
  { id: 'e15', title: 'Apresentação musical Jean & Caue', timeDisplay: '09h', date: '2026-10-18', sortKey: '09:00', venue: v.willie, thumbnail: thumb(14) },

  // ── 19/10 Domingo ──
  { id: 'e16', title: 'Shows musicais e Feira de Artesanato', timeDisplay: '09h', date: '2026-10-19', sortKey: '09:00', venue: v.inga, thumbnail: thumb(15) },
  { id: 'e17', title: 'Mega Concert', timeDisplay: '16h', date: '2026-10-19', sortKey: '16:00', venue: v.jorge, thumbnail: thumb(16) },
]

/* ─── Helpers ─── */

export function getFestivalDays(): FestivalDay[] {
  const dayMap = new Map<string, FestivalEvent[]>()

  for (const ev of EVENTS) {
    const existing = dayMap.get(ev.date) ?? []
    existing.push(ev)
    dayMap.set(ev.date, existing)
  }

  const schedule: [string, string, string, number][] = [
    ['2026-10-13', 'Seg', 'Segunda-feira', 13],
    ['2026-10-14', 'Ter', 'Terça-feira', 14],
    ['2026-10-15', 'Qua', 'Quarta-feira', 15],
    ['2026-10-16', 'Qui', 'Quinta-feira', 16],
    ['2026-10-17', 'Sex', 'Sexta-feira', 17],
    ['2026-10-18', 'Sáb', 'Sábado', 18],
    ['2026-10-19', 'Dom', 'Domingo', 19],
  ]

  return schedule.map(([date, dayOfWeek, dayOfWeekFull, dayNumber]) => ({
    date,
    dayOfWeek,
    dayOfWeekFull,
    dayNumber,
    label: `${dayOfWeek} ${dayNumber}`,
    events: (dayMap.get(date) ?? []).sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
  }))
}

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

export function filterEvents(events: FestivalEvent[], venueId: string | null): FestivalEvent[] {
  if (!venueId) return events
  return events.filter((ev) => ev.venue.id === venueId)
}
