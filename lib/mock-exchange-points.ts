/* ─── Exchange Points Data Layer ─── */

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

export const EXCHANGE_POINTS: ExchangePoint[] = [
  {
    id: 'maringa-fm',
    name: 'Maringa FM (Sede Principal)',
    address: 'Av. Getulio Vargas, 266 — Terreo, Centro',
    city: 'Maringa',
    cepPrefix: ['87010', '87011', '87012', '87013', '87014', '87015', '87020', '87030', '87040', '87050', '87060', '87070', '87080'],
    hours: '13 a 19 de Outubro — 9h as 18h',
    mapsUrl: 'https://maps.google.com/?q=Av+Getulio+Vargas+266+Maringa+PR',
    mapsEmbed: 'https://maps.google.com/maps?q=Av+Getulio+Vargas+266+Maringa+PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  {
    id: 'teatro-calil',
    name: 'Teatro Calil Haddad',
    address: 'Av. Carneiro Leao, 60 — Zona 01',
    city: 'Maringa',
    cepPrefix: ['87016', '87017', '87018', '87019'],
    hours: '13 a 19 de Outubro — 10h as 17h',
    mapsUrl: 'https://maps.google.com/?q=Teatro+Calil+Haddad+Maringa+PR',
    mapsEmbed: 'https://maps.google.com/maps?q=Teatro+Calil+Haddad+Maringa+PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  {
    id: 'uem',
    name: 'UEM — Bloco C67',
    address: 'Av. Colombo, 5790 — Jardim Universitario',
    city: 'Maringa',
    cepPrefix: ['87020', '87083', '87084', '87085'],
    hours: '14 a 18 de Outubro — 8h as 16h',
    mapsUrl: 'https://maps.google.com/?q=UEM+Universidade+Estadual+de+Maringa',
    mapsEmbed: 'https://maps.google.com/maps?q=UEM+Universidade+Estadual+de+Maringa&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  {
    id: 'sarandi',
    name: 'Casa da Cultura de Sarandi',
    address: 'Rua Maringa, 890 — Centro',
    city: 'Sarandi',
    cepPrefix: ['87110', '87111', '87112', '87113', '87114', '87115'],
    hours: '15 a 18 de Outubro — 9h as 15h',
    mapsUrl: 'https://maps.google.com/?q=Casa+da+Cultura+Sarandi+PR',
    mapsEmbed: 'https://maps.google.com/maps?q=Casa+da+Cultura+Sarandi+PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
]

/* ─── Helpers ─── */

export function findNearestPoint(cep: string): ExchangePoint {
  const cleaned = cep.replace(/\D/g, '').slice(0, 5)

  if (cleaned.length === 5) {
    const match = EXCHANGE_POINTS.find((p) => p.cepPrefix.includes(cleaned))
    if (match) return match
  }

  // Fallback: sede principal (Maringa FM)
  return EXCHANGE_POINTS[0]
}
