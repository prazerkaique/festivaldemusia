'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface SpotifyBarProps {
  url: string
}

function extractPlaylistId(url: string): string | null {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

/* ── Drag hook ── */

const DRAG_THRESHOLD = 5

function useDraggable(initialPos: { x: number; y: number }, skipButtons = true) {
  const [pos, setPos] = useState(initialPos)
  const dragging = useRef(false)
  const wasDragged = useRef(false)
  const startPoint = useRef({ x: 0, y: 0 })
  const offset = useRef({ x: 0, y: 0 })
  const elRef = useRef<HTMLDivElement>(null)
  const onTap = useRef<(() => void) | null>(null)

  const clamp = useCallback((x: number, y: number) => {
    const el = elRef.current
    if (!el) return { x, y }
    const rect = el.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (skipButtons) {
      const tag = (e.target as HTMLElement).closest('button, iframe')
      if (tag) return
    }

    dragging.current = true
    wasDragged.current = false
    startPoint.current = { x: e.clientX, y: e.clientY }
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    el.setPointerCapture(e.pointerId)
    e.preventDefault()
  }, [skipButtons])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startPoint.current.x
    const dy = e.clientY - startPoint.current.y
    if (!wasDragged.current && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return
    wasDragged.current = true
    const newX = e.clientX - offset.current.x
    const newY = e.clientY - offset.current.y
    setPos(clamp(newX, newY))
  }, [clamp])

  const onPointerUp = useCallback(() => {
    const didDrag = wasDragged.current
    dragging.current = false
    if (!didDrag && onTap.current) onTap.current()
  }, [])

  return { pos, setPos, elRef, wasDragged, onTap, onPointerDown, onPointerMove, onPointerUp }
}

/* ── Component ── */

export default function SpotifyBar({ url }: SpotifyBarProps) {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [glass, setGlass] = useState(false)
  const [hovered, setHovered] = useState(false)
  const glassTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pill = useDraggable({ x: 16, y: 700 }, false)
  const player = useDraggable({ x: 100, y: 500 }, true)

  // Wire tap handler to open player
  pill.onTap.current = () => setOpen(true)

  // Set correct initial positions on mount
  useEffect(() => {
    pill.setPos({ x: 16, y: window.innerHeight - 60 })
    player.setPos({
      x: Math.max(16, (window.innerWidth - 672) / 2),
      y: window.innerHeight - 200,
    })
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Glass timer: activate 3s after pill is shown (not open)
  useEffect(() => {
    if (!open && ready) {
      setGlass(false)
      glassTimer.current = setTimeout(() => setGlass(true), 3000)
    } else {
      setGlass(false)
      if (glassTimer.current) clearTimeout(glassTimer.current)
    }
    return () => {
      if (glassTimer.current) clearTimeout(glassTimer.current)
    }
  }, [open, ready])

  const playlistId = extractPlaylistId(url)

  if (!ready || !playlistId) return null

  const isGlassActive = glass && !hovered

  return (
    <>
      {/* ── Collapsed: draggable floating pill ── */}
      <div
        ref={pill.elRef}
        onPointerDown={pill.onPointerDown}
        onPointerMove={pill.onPointerMove}
        onPointerUp={pill.onPointerUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed z-40 animate-slide-up touch-none select-none transition-opacity duration-300 ${
          open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ left: pill.pos.x, top: pill.pos.y }}
      >
        <div
          className={`group flex items-center rounded-full p-3 shadow-lg cursor-grab active:cursor-grabbing transition-all duration-700 ease-out ${
            isGlassActive
              ? 'bg-[#1DB954]/20 backdrop-blur-xl border border-[#1DB954]/40 text-[#1DB954] shadow-none'
              : 'bg-[#1DB954] text-white border border-transparent hover:shadow-xl hover:pr-4'
          }`}
          role="button"
          tabIndex={open ? -1 : 0}
          aria-label="Abrir player Spotify"
          onKeyDown={(e) => { if (e.key === 'Enter') setOpen(true) }}
        >
          <svg className={`h-5 w-5 shrink-0 transition-opacity duration-700 ${isGlassActive ? 'opacity-50' : 'opacity-100'}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className={`text-sm font-bold tracking-wide max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-48 group-hover:ml-2 ${isGlassActive ? 'opacity-40' : 'opacity-100'}`}>
            Ouça nossa playlist
          </span>
        </div>
      </div>

      {/* ── Expanded: draggable player (always mounted, hidden when closed) ── */}
      <div
        ref={player.elRef}
        onPointerDown={player.onPointerDown}
        onPointerMove={player.onPointerMove}
        onPointerUp={player.onPointerUp}
        className={`fixed z-40 touch-none w-[calc(100vw-24px)] sm:w-full max-w-2xl transition-all duration-300 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ left: player.pos.x, top: player.pos.y }}
      >
        {/* Drag handle */}
        <div className="flex items-center justify-center py-1.5 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1 rounded-full bg-neutral-500/60" />
        </div>

        <div className="relative">
          {/* Minimize button */}
          <div className="absolute -top-1 right-1 sm:right-1 z-50">
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 shadow-lg transition-colors hover:bg-neutral-700 hover:text-white"
              aria-label="Minimizar player"
              tabIndex={open ? 0 : -1}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl shadow-2xl pointer-events-auto"
            title="Playlist do Festival de Musica de Maringa"
          />
        </div>
      </div>
    </>
  )
}
