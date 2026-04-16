/* ─── Shared Types ─── */
/* These types are the contract between the data layer and all UI components.
   The fetchers map CMS responses to these types. */

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

export interface Prize {
  place: string
  amount: string
  description: string
}

export interface Criterion {
  text: string
}

export interface TimelineStep {
  date: string
  label: string
}

export interface ContestFormField {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'textarea'
  placeholder: string
  required: boolean
  options?: string[]
}

export interface Contest {
  slug: string
  title: string
  subtitle: string
  date: string
  time: string
  location: string
  color: 'purple' | 'orange' | 'cyan'
  status: 'aberto' | 'encerrado' | 'em-breve'
  image: string
  cardImage: string
  description: string
  prizes: Prize[]
  criteria: Criterion[]
  timeline: TimelineStep[]
  registrationUrl: string
  pdfUrl?: string
  formFields?: ContestFormField[]
}

export interface NewsCategory {
  slug: string
  label: string
  color: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  category: NewsCategory
  author: string
  date: string
  featured?: boolean
  body: string[]
  audioUrl?: string
  readingTime?: number
}

export interface ExchangePoint {
  id: string
  name: string
  address: string
  city: string
  cepPrefix: string[]
  hours: string
  mapsUrl: string
  mapsEmbed: string
}
