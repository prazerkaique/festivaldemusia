import { getSiteSettings } from '@/lib/payload-fetchers'
import Footer from './Footer'
import type { FooterSettings } from './Footer'

export default async function FooterServer() {
  let settings: FooterSettings | undefined
  try {
    const s = await getSiteSettings() as any
    settings = {
      phone: s.phone,
      email: s.email,
      address: s.address,
      addressShort: s.addressShort,
      city: s.city,
      cep: s.cep,
      festivalDates: s.festivalDates,
      footerTagline: s.footerTagline,
      copyrightName: s.copyrightName,
      socialLinks: s.socialLinks,
    }
  } catch {
    // Falls back to hardcoded defaults inside Footer
  }

  return <Footer settings={settings} />
}
