'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const NAV_LINKS: NavLink[] = [
  { label: 'O Festival', href: '/#sobre' },
  { label: 'Programação', href: '/programacao' },
  { label: 'Local', href: '/#local' },
  {
    label: 'Concursos',
    href: '/concursos',
    children: [
      { label: 'Música Estudantil', href: '/concursos/musica-estudantil' },
      { label: 'Mega Concert', href: '/concursos/mega-concert' },
      { label: 'Hackathon Musical', href: '/concursos/hackathon' },
    ],
  },
  { label: 'Apoie', href: '/apoie' },
  { label: 'Notícias', href: '/noticias' },
]

import { nextBrandColor, textColorFor } from '@/lib/color-cycle'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoverColors, setHoverColors] = useState<Record<string, { bg: string; text: string } | null>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = useCallback((label: string) => {
    const bg = nextBrandColor()
    setHoverColors((prev) => ({ ...prev, [label]: { bg, text: textColorFor(bg) } }))
  }, [])

  const handleMouseLeave = useCallback((label: string) => {
    setHoverColors((prev) => ({ ...prev, [label]: null }))
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 lg:py-3">
        {/* Logo — switches between white and colorido on scroll */}
        <Link href="/" className="relative z-10 shrink-0">
          <Image
            src={scrolled ? '/assets/logo-colorido-horizontal.png' : '/assets/logo-branco-horizontal.png'}
            alt="Festival de Música de Maringá"
            width={300}
            height={80}
            className="h-[67px] w-auto sm:h-[77px] lg:h-24 transition-opacity duration-300"
            priority
            sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 200px"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={() => handleMouseLeave(link.label)}
              >
                <Link
                  href={link.href}
                  style={
                    hoverColors[link.label]
                      ? { backgroundColor: hoverColors[link.label]!.bg, color: hoverColors[link.label]!.text }
                      : undefined
                  }
                  className={`text-sm font-medium transition-all duration-200 uppercase tracking-wider px-3 py-1.5 rounded-full ${
                    scrolled
                      ? 'text-gray-900'
                      : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="rounded-lg py-2 min-w-[160px] shadow-lg bg-white">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors text-gray-700 hover:text-orange hover:bg-gray-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={() => handleMouseLeave(link.label)}
                style={
                  hoverColors[link.label]
                    ? { backgroundColor: hoverColors[link.label]!.bg, color: hoverColors[link.label]!.text }
                    : undefined
                }
                className={`text-sm font-medium transition-all duration-200 uppercase tracking-wider px-3 py-1.5 rounded-full ${
                  scrolled
                    ? 'text-gray-900'
                    : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Desktop */}
        <Link
          href="/garanta-sua-vaga"
          onMouseEnter={() => handleMouseEnter('cta')}
          onMouseLeave={() => handleMouseLeave('cta')}
          style={
            hoverColors['cta']
              ? { backgroundColor: hoverColors['cta']!.bg, color: hoverColors['cta']!.text }
              : undefined
          }
          className="hidden lg:inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 bg-orange text-white"
        >
          Garanta sua Vaga
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden relative z-10 flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen
                ? 'rotate-45 translate-y-2 bg-white'
                : scrolled
                  ? 'bg-gray-900'
                  : 'bg-white'
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen
                ? 'opacity-0 bg-white'
                : scrolled
                  ? 'bg-gray-900'
                  : 'bg-white'
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen
                ? '-rotate-45 -translate-y-2 bg-white'
                : scrolled
                  ? 'bg-gray-900'
                  : 'bg-white'
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-950/95 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center gap-8 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <div key={link.href} className="flex flex-col items-center gap-2">
            <Link
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-white uppercase tracking-wider hover:text-orange transition-colors font-[family-name:var(--font-heading)]"
            >
              {link.label}
            </Link>
            {link.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-white/60 uppercase tracking-wider hover:text-orange transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        ))}
        <Link
          href="/garanta-sua-vaga"
          onClick={() => setMenuOpen(false)}
          className="mt-4 bg-orange px-10 py-3.5 rounded-full text-lg font-bold text-white uppercase tracking-wider hover:bg-orange-dark transition-colors"
        >
          Garanta sua Vaga
        </Link>
      </div>
    </header>
  )
}
