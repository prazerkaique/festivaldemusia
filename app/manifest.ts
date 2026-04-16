import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Festival de Música de Maringá e Região',
    short_name: 'Festival Maringá',
    description:
      'De 13 a 19 de outubro de 2026, a música toma conta de Maringá. Cultura, educação e entretenimento em sete dias de programação.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#a71580',
    icons: [
      {
        src: '/assets/favicons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/favicons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/favicons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
