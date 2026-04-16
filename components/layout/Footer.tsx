'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

const FOOTER_LINKS = [
  { label: 'Início', href: '#' },
  { label: 'O Festival', href: '#sobre' },
  { label: 'Programação', href: '/programacao' },
  { label: 'Local', href: '#local' },
  { label: 'Concursos', href: '/concursos' },
  { label: 'Apoie', href: '/apoie' },
  { label: 'Notícias', href: '/noticias' },
]

const SOCIAL_ICONS: Record<string, string> = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  spotify: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
}

const FALLBACK_SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/festivaldemusicademaringa', icon: SOCIAL_ICONS.instagram },
  { label: 'Facebook', href: 'https://facebook.com/festivaldemusicademaringa', icon: SOCIAL_ICONS.facebook },
  { label: 'YouTube', href: 'https://youtube.com/@festivaldemusicademaringa', icon: SOCIAL_ICONS.youtube },
]

export interface FooterSettings {
  phone?: string
  email?: string
  address?: string
  addressShort?: string
  city?: string
  cep?: string
  festivalDates?: string
  footerTagline?: string
  copyrightName?: string
  socialLinks?: Array<{ platform: string; url: string }>
}

export default function Footer({ settings }: { settings?: FooterSettings } = {}) {
  const [hoverStyles, setHoverStyles] = useState<Record<string, React.CSSProperties | null>>({})

  const handleEnter = useCallback((key: string) => {
    const bg = nextBrandColor()
    setHoverStyles((prev) => ({
      ...prev,
      [key]: { backgroundColor: bg, borderColor: bg, color: textColorFor(bg) },
    }))
  }, [])

  const handleLeave = useCallback((key: string) => {
    setHoverStyles((prev) => ({ ...prev, [key]: null }))
  }, [])

  const phone = settings?.phone || '(44) 3220-4003'
  const email = settings?.email || 'contato@festivaldemusicademaringa.com.br'
  const address = settings?.address || 'Av. Getúlio Vargas, 266 — Térreo'
  const city = settings?.city || 'Maringá, PR'
  const cep = settings?.cep || '87013-130'
  const festivalDates = settings?.festivalDates || '13 a 19 de Outubro de 2026'
  const footerTagline = settings?.footerTagline || 'Cidade Canção'
  const copyrightName = settings?.copyrightName || 'Festival de Música de Maringá e Região'

  const socialLinks = settings?.socialLinks && settings.socialLinks.length > 0
    ? settings.socialLinks
        .filter((s) => SOCIAL_ICONS[s.platform])
        .map((s) => ({ label: s.platform.charAt(0).toUpperCase() + s.platform.slice(1), href: s.url, icon: SOCIAL_ICONS[s.platform] }))
    : FALLBACK_SOCIAL_LINKS

  return (
    <footer className="bg-gray-950 text-white py-8 sm:py-14 lg:py-18">
      <div className="container-site px-4 sm:px-6 lg:px-8">
        {/* Mobile: compact layout */}
        <div className="md:hidden">
          {/* Row 1: Logo + social */}
          <div className="flex items-center justify-between mb-4">
            <Image
              src="/assets/logo-branco-horizontal.png"
              alt="Festival de Música de Maringá"
              width={220}
              height={60}
              className="h-20 w-auto"
              sizes="140px"
            />
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleEnter(`social-${social.label}`)}
                  onMouseLeave={() => handleLeave(`social-${social.label}`)}
                  style={hoverStyles[`social-${social.label}`] ?? undefined}
                  className="text-white/40 transition-all duration-200 p-1 rounded-full"
                  aria-label={social.label}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Row 2: Nav inline */}
          <nav className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
            {FOOTER_LINKS.map((link, i) => (
              <span key={link.href + link.label} className="flex items-center gap-3">
                <Link
                  href={link.href}
                  onMouseEnter={() => handleEnter(`nav-${link.label}`)}
                  onMouseLeave={() => handleLeave(`nav-${link.label}`)}
                  style={hoverStyles[`nav-${link.label}`] ?? undefined}
                  className="text-white/50 transition-all duration-200 text-[11px] py-0.5 rounded"
                >
                  {link.label}
                </Link>
                {i < FOOTER_LINKS.length - 1 && <span className="text-white/15">·</span>}
              </span>
            ))}
          </nav>

          {/* Row 3: Contact + bottom bar */}
          <div className="border-t border-white/10 pt-3 flex items-end justify-between">
            <div className="text-white/25 text-[10px] leading-relaxed">
              <p>{festivalDates} — {city}</p>
              <p>{phone}</p>
              <p className="mt-1.5">&copy; {new Date().getFullYear()} · <Link href="/privacidade" className="hover:text-white/50 transition-colors">Privacidade</Link> · <Link href="/cookies" className="hover:text-white/50 transition-colors">Cookies</Link></p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-white/20 text-[9px]">por</span>
              <Image
                src="/assets/nerau-logo-branco.png"
                alt="Nerau"
                width={80}
                height={24}
                className="h-3.5 w-auto opacity-40"
                sizes="60px"
              />
            </div>
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-10 lg:gap-16">
            {/* Logo + tagline */}
            <div>
              <div className="mb-4">
                <Image
                  src="/assets/logo-branco-horizontal.png"
                  alt="Festival de Música de Maringá"
                  width={220}
                  height={60}
                  className="h-40 w-auto"
                  sizes="200px"
                />
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                {festivalDates}
                <br />
                {city} — {footerTagline}
              </p>
              <div className="flex items-center gap-4 mt-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => handleEnter(`social-${social.label}`)}
                    onMouseLeave={() => handleLeave(`social-${social.label}`)}
                    style={hoverStyles[`social-${social.label}`] ?? undefined}
                    className="text-white/40 transition-all duration-200 p-1.5 rounded-full"
                    aria-label={social.label}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navegação */}
            <div className="flex flex-col items-center">
              <h6 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Navegação
              </h6>
              <nav className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onMouseEnter={() => handleEnter(`nav-${link.label}`)}
                    onMouseLeave={() => handleLeave(`nav-${link.label}`)}
                    style={hoverStyles[`nav-${link.label}`] ?? undefined}
                    className="text-white/60 transition-all duration-200 text-sm px-2 py-0.5 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contato */}
            <div>
              <h6 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Contato
              </h6>
              <div className="flex flex-col gap-2.5 text-sm text-white/60">
                <p>{phone}</p>
                <p>{email}</p>
                <p className="text-white/40 text-xs mt-2">
                  {address}
                  <br />
                  {city} — {cep}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-white/30 text-[11px]">
              <p>&copy; {new Date().getFullYear()} {copyrightName}</p>
              <span>·</span>
              <Link
                href="/privacidade"
                onMouseEnter={() => handleEnter('privacidade')}
                onMouseLeave={() => handleLeave('privacidade')}
                style={hoverStyles['privacidade'] ?? undefined}
                className="transition-all duration-200 px-1.5 py-0.5 rounded"
              >
                Política de Privacidade
              </Link>
              <span>·</span>
              <Link
                href="/cookies"
                onMouseEnter={() => handleEnter('cookies')}
                onMouseLeave={() => handleLeave('cookies')}
                style={hoverStyles['cookies'] ?? undefined}
                className="transition-all duration-200 px-1.5 py-0.5 rounded"
              >
                Cookies
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs">Desenvolvido por</span>
              <Image
                src="/assets/nerau-logo-branco.png"
                alt="Nerau"
                width={80}
                height={24}
                className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity"
                sizes="60px"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
