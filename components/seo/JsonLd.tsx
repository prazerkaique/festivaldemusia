import { getBaseUrl } from '@/lib/seo'

/* ─── Breadcrumb item type ─── */

export interface BreadcrumbItem {
  name: string
  href: string
}

/* ─── Generic JSON-LD renderer ─── */

function JsonLdScript({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ─── Organization Schema ─── */

interface OrganizationProps {
  name: string
  url?: string
  logo?: string
  sameAs?: string[]
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  sameAs,
}: OrganizationProps) {
  const baseUrl = url || getBaseUrl()

  const data: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: baseUrl,
  }

  if (logo) data.logo = logo
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs

  return <JsonLdScript data={data} />
}

/* ─── Event Schema ─── */

interface EventProps {
  name: string
  startDate: string
  endDate: string
  location: string
  description?: string
  organizerName?: string
  url?: string
  image?: string
}

export function EventJsonLd({
  name,
  startDate,
  endDate,
  location,
  description,
  organizerName,
  url,
  image,
}: EventProps) {
  const baseUrl = getBaseUrl()

  const data: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate,
    endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Maringa',
        addressRegion: 'PR',
        addressCountry: 'BR',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      description: '1kg de alimento nao perecivel = 1 ingresso',
    },
    url: url || baseUrl,
  }

  if (description) data.description = description
  if (image) data.image = image
  if (organizerName) {
    data.organizer = {
      '@type': 'Organization',
      name: organizerName,
      url: baseUrl,
    }
  }

  return <JsonLdScript data={data} />
}

/* ─── Article (NewsArticle) Schema ─── */

interface ArticleProps {
  headline: string
  datePublished: string
  dateModified?: string
  image?: string
  description?: string
  authorName?: string
  url?: string
}

export function ArticleJsonLd({
  headline,
  datePublished,
  dateModified,
  image,
  description,
  authorName,
  url,
}: ArticleProps) {
  const baseUrl = getBaseUrl()

  const data: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    datePublished,
    url: url || baseUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Festival de Musica de Maringa e Regiao',
      url: baseUrl,
    },
  }

  if (dateModified) data.dateModified = dateModified
  if (image) data.image = image
  if (description) data.description = description
  if (authorName) {
    data.author = { '@type': 'Organization', name: authorName }
  } else {
    data.author = {
      '@type': 'Organization',
      name: 'Festival de Musica de Maringa e Regiao',
    }
  }

  return <JsonLdScript data={data} />
}

/* ─── BreadcrumbList Schema ─── */

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
  const baseUrl = getBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`,
    })),
  }

  return <JsonLdScript data={data} />
}
