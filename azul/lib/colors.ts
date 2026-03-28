/**
 * AZUL Brand Palette
 * Signature color: #0000CC (Royal Blue) — used on every product
 */
export const COLORS = {
  /** Signature royal blue — the one color everything is made in */
  royal: '#0000CC',
  /** Deep ocean blue — for text, dark sections, footer */
  deepBlue: '#0A1A5C',
  /** Off-white sand — primary background */
  offWhite: '#F5F5F0',
  /** Pure white — cards, contrast surfaces */
  white: '#FFFFFF',
  /** Pure black — rarely used */
  black: '#000000',
} as const

export type ColorKey = keyof typeof COLORS
