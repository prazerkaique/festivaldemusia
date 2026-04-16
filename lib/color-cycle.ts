export const BRAND_COLORS = ['#a71580', '#e9530d', '#00b4c5', '#facaab'] as const
export type BrandColor = (typeof BRAND_COLORS)[number]

// Global counter shared across ALL components
let _index = 0

export function nextBrandColor(): BrandColor {
  const color = BRAND_COLORS[_index % BRAND_COLORS.length]
  _index++
  return color
}

/** peach is light → black text; rest are dark → white text */
export function textColorFor(bg: string): string {
  return bg === '#facaab' ? '#1a1a2e' : '#ffffff'
}
