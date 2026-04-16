/**
 * External asset URLs — videos hosted on CDN (too large for git/Vercel).
 * Configure via env vars or fallback to local paths for development.
 */

export const videoAssets = {
  festivalAbout: process.env.NEXT_PUBLIC_VIDEO_FESTIVAL || '/assets/festival-2025.mp4',
  catedralParallax: process.env.NEXT_PUBLIC_VIDEO_CATEDRAL || '/assets/catedral-parallax-web.mp4',
} as const
