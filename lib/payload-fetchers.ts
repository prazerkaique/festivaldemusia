/* ─── Payload CMS Data Layer ─── */
/* Replaces the mock-* fetchers with Payload Local API calls.
   All functions export the same signatures and return the same
   types defined in lib/types.ts so UI components are unaffected. */

import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type {
  Venue,
  FestivalEvent,
  FestivalDay,
  Contest,
  NewsCategory,
  BlogPost,
  ExchangePoint,
} from './types'

/* ─── Payload client ─── */

async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

/* ─── Mapper helpers ─── */

function mapVenue(raw: any): Venue {
  return {
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    shortName: raw.shortName ?? '',
    color: raw.color ?? '#666',
  }
}

function mapEvent(raw: any): FestivalEvent {
  return {
    id: String(raw.id ?? ''),
    title: raw.title ?? '',
    timeDisplay: raw.timeDisplay ?? '',
    date: raw.date ?? '',
    sortKey: raw.sortKey ?? '',
    venue:
      raw.venue && typeof raw.venue === 'object'
        ? mapVenue(raw.venue)
        : { id: '', name: '', shortName: '', color: '#666' },
    note: raw.note || undefined,
    thumbnail:
      raw.thumbnail && typeof raw.thumbnail === 'object'
        ? raw.thumbnail.url
        : undefined,
    imageLayout: raw.imageLayout ?? false,
  }
}

function mapCategory(raw: any): NewsCategory {
  return {
    slug: raw.slug ?? '',
    label: raw.title ?? '',
    color: raw.color ?? '#666',
  }
}

function lexicalToStringArray(data: any): string[] {
  if (!data?.root?.children) return []
  return data.root.children
    .filter((node: any) => node.type === 'paragraph')
    .map((node: any) =>
      (node.children ?? []).map((child: any) => child.text ?? '').join('')
    )
    .filter((text: string) => text.length > 0)
}

function mapPost(raw: any): BlogPost {
  const rawDate: string = raw.date ?? ''
  const normalizedDate = rawDate.length >= 10 ? rawDate.slice(0, 10) : rawDate

  return {
    id: String(raw.id ?? ''),
    slug: raw.slug ?? '',
    title: raw.title ?? '',
    excerpt: raw.excerpt ?? '',
    thumbnail:
      raw.coverImage && typeof raw.coverImage === 'object'
        ? raw.coverImage.url ?? ''
        : '',
    category:
      raw.category && typeof raw.category === 'object'
        ? mapCategory(raw.category)
        : { slug: '', label: '', color: '#666' },
    author: raw.author ?? '',
    date: normalizedDate,
    featured: raw.featured ?? false,
    body: lexicalToStringArray(raw.body),
    audioUrl: raw.audioUrl || undefined,
    readingTime: raw.readingTime ?? undefined,
  }
}

function mapContest(raw: any): Contest {
  const prizes = (raw.prizes ?? []).map((p: any) => ({
    place: p.place ?? '',
    amount: p.amount ?? '',
    description: p.description ?? '',
  }))

  const criteria = (raw.criteria ?? []).map((c: any) => ({
    text: c.text ?? '',
  }))

  const timeline = (raw.timeline ?? []).map((t: any) => ({
    date: t.date ?? '',
    label: t.label ?? '',
  }))

  const formFields = raw.formFields
    ? (raw.formFields as any[]).map((f: any) => ({
        name: f.fieldName ?? f.name ?? '',
        label: f.label ?? '',
        type: (f.fieldType ?? f.type ?? 'text') as ContestFormFieldType,
        placeholder: f.placeholder ?? '',
        required: f.required ?? false,
        options: f.options
          ? (f.options as any[]).map((o: any) =>
              typeof o === 'string' ? o : (o.value ?? '')
            )
          : undefined,
      }))
    : undefined

  return {
    slug: raw.slug ?? '',
    title: raw.title ?? '',
    subtitle: raw.subtitle ?? '',
    date: raw.date ?? '',
    time: raw.time ?? '',
    location: raw.location ?? '',
    color: (raw.color ?? 'purple') as Contest['color'],
    status: (raw.status ?? 'em-breve') as Contest['status'],
    image:
      raw.heroImage && typeof raw.heroImage === 'object'
        ? raw.heroImage.url ?? ''
        : raw.cardImage && typeof raw.cardImage === 'object'
          ? raw.cardImage.url ?? ''
          : '',
    cardImage:
      raw.cardImage && typeof raw.cardImage === 'object'
        ? raw.cardImage.url ?? ''
        : '',
    description: raw.description ?? '',
    prizes,
    criteria,
    timeline,
    registrationUrl: raw.registrationUrl ?? '#',
    pdfUrl: raw.pdfUrl || undefined,
    formFields,
  }
}

function mapExchangePoint(raw: any): ExchangePoint {
  return {
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    address: raw.address ?? '',
    city: raw.city ?? '',
    cepPrefix: (raw.cepPrefix ?? []).map((p: any) => p.prefix ?? ''),
    hours: raw.hours ?? '',
    mapsUrl: raw.mapsUrl ?? '',
    mapsEmbed: raw.mapsEmbed ?? '',
  }
}

/* Internal type alias used only inside mapContest */
type ContestFormFieldType = 'text' | 'number' | 'select' | 'textarea'

/* ─── Global fetchers ─── */

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getHomePage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-page' })
}

export async function getProgramacaoPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'programacao-page' })
}

export async function getConcursosPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'concursos-page' })
}

export async function getNoticiasPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'noticias-page' })
}

export async function getApoiePage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'apoie-page' })
}

export async function getGarantaPage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'garanta-page' })
}

/* ─── Collection fetchers ─── */

export async function getSponsors(activeOnly = true) {
  const payload = await getPayloadClient()

  const query: Parameters<typeof payload.find>[0] = {
    collection: 'sponsors',
    limit: 100,
    depth: 1,
    sort: 'order',
  }

  if (activeOnly) {
    query.where = { active: { equals: true } }
  }

  const result = await payload.find(query)

  return result.docs.map((raw: any) => ({
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    logo:
      raw.logo && typeof raw.logo === 'object'
        ? { url: raw.logo.url ?? '', width: raw.logo.width ?? 0, height: raw.logo.height ?? 0 }
        : { url: '', width: 0, height: 0 },
    url: raw.url ?? '',
    tier: raw.tier ?? 'apoiador',
    order: raw.order ?? 0,
  }))
}

export async function getFeaturedArtists() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'artists',
    limit: 20,
    depth: 1,
    sort: 'order',
    where: { featured: { equals: true } },
  })

  return result.docs.map((raw: any) => ({
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    photo:
      raw.photo && typeof raw.photo === 'object'
        ? { url: raw.photo.url ?? '', width: raw.photo.width ?? 0, height: raw.photo.height ?? 0 }
        : { url: '', width: 0, height: 0 },
    dayNumber: raw.dayNumber ?? 0,
    date: raw.date ?? '',
    description: raw.description ?? '',
    color: raw.color ?? 'purple',
  }))
}

/* ─── Festival schedule ─── */

export async function getFestivalDays(): Promise<FestivalDay[]> {
  const payload = await getPayloadClient()

  const [eventsResult, programacaoPage] = await Promise.all([
    payload.find({
      collection: 'festival-events',
      limit: 100,
      depth: 1,
    }),
    payload.findGlobal({ slug: 'programacao-page' }),
  ])

  const events: FestivalEvent[] = eventsResult.docs.map(mapEvent)

  const dayMap = new Map<string, FestivalEvent[]>()
  for (const ev of events) {
    const existing = dayMap.get(ev.date) ?? []
    existing.push(ev)
    dayMap.set(ev.date, existing)
  }

  /* Use festivalDays from global if available, else fallback to hardcoded */
  const daysConfig = (programacaoPage as any).festivalDays
  if (daysConfig && Array.isArray(daysConfig) && daysConfig.length > 0) {
    return daysConfig.map((d: any) => ({
      date: d.date ?? '',
      dayOfWeek: d.dayOfWeek ?? '',
      dayOfWeekFull: d.dayOfWeekFull ?? '',
      dayNumber: d.dayNumber ?? 0,
      label: `${d.dayOfWeek ?? ''} ${d.dayNumber ?? ''}`,
      events: (dayMap.get(d.date ?? '') ?? []).sort((a, b) =>
        a.sortKey.localeCompare(b.sortKey)
      ),
    }))
  }

  /* Fallback: hardcoded schedule */
  const SCHEDULE_FALLBACK: [string, string, string, number][] = [
    ['2026-10-13', 'Seg', 'Segunda-feira', 13],
    ['2026-10-14', 'Ter', 'Terça-feira', 14],
    ['2026-10-15', 'Qua', 'Quarta-feira', 15],
    ['2026-10-16', 'Qui', 'Quinta-feira', 16],
    ['2026-10-17', 'Sex', 'Sexta-feira', 17],
    ['2026-10-18', 'Sáb', 'Sábado', 18],
    ['2026-10-19', 'Dom', 'Domingo', 19],
  ]

  return SCHEDULE_FALLBACK.map(([date, dayOfWeek, dayOfWeekFull, dayNumber]) => ({
    date,
    dayOfWeek,
    dayOfWeekFull,
    dayNumber,
    label: `${dayOfWeek} ${dayNumber}`,
    events: (dayMap.get(date) ?? []).sort((a, b) =>
      a.sortKey.localeCompare(b.sortKey)
    ),
  }))
}

export async function getContests(): Promise<Contest[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'contests',
    limit: 100,
    depth: 1,
  })

  return result.docs.map(mapContest)
}

export async function getContestBySlug(
  slug: string
): Promise<Contest | undefined> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'contests',
    limit: 1,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const doc = result.docs[0]
  return doc ? mapContest(doc) : undefined
}

export async function getAllContestSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'contests',
    limit: 100,
    depth: 0,
  })

  return result.docs.map((doc: any) => doc.slug ?? '')
}

export async function getCategories(): Promise<NewsCategory[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'news-categories',
    limit: 100,
    depth: 0,
  })

  return result.docs.map(mapCategory)
}

export async function getPostsByCategory(
  category?: string | null
): Promise<BlogPost[]> {
  const payload = await getPayloadClient()

  const query: Parameters<typeof payload.find>[0] = {
    collection: 'blog-posts',
    limit: 100,
    depth: 1,
    sort: '-date',
  }

  if (category) {
    query.where = {
      'category.slug': {
        equals: category,
      },
    }
  }

  const result = await payload.find(query)

  return result.docs.map(mapPost)
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'blog-posts',
    limit: 1,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const doc = result.docs[0]
  return doc ? mapPost(doc) : undefined
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'blog-posts',
    limit: 100,
    depth: 0,
  })

  return result.docs.map((doc: any) => doc.slug ?? '')
}

export async function getRelatedPosts(
  post: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  const payload = await getPayloadClient()

  /* First fetch posts in the same category, excluding current post */
  const sameCategoryResult = await payload.find({
    collection: 'blog-posts',
    limit: limit + 1, // fetch one extra in case we need to skip current
    depth: 1,
    sort: '-date',
    where: {
      and: [
        {
          'category.slug': {
            equals: post.category.slug,
          },
        },
        {
          slug: {
            not_equals: post.slug,
          },
        },
      ],
    },
  })

  const sameCategoryPosts = sameCategoryResult.docs.map(mapPost).slice(0, limit)

  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts
  }

  /* Fill remaining slots with posts from other categories */
  const needed = limit - sameCategoryPosts.length
  const excludedSlugs = [post.slug, ...sameCategoryPosts.map((p) => p.slug)]

  const othersResult = await payload.find({
    collection: 'blog-posts',
    limit: needed + excludedSlugs.length, // fetch with buffer
    depth: 1,
    sort: '-date',
    where: {
      and: [
        {
          'category.slug': {
            not_equals: post.category.slug,
          },
        },
        {
          slug: {
            not_in: excludedSlugs,
          },
        },
      ],
    },
  })

  const otherPosts = othersResult.docs.map(mapPost).slice(0, needed)

  return [...sameCategoryPosts, ...otherPosts]
}

export async function getExchangePoints(): Promise<ExchangePoint[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'exchange-points',
    limit: 100,
    depth: 0,
  })

  return result.docs.map(mapExchangePoint)
}
