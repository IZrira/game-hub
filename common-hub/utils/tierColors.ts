import { readableTextColor } from './colorContrast';

/**
 * Tier label colors shared by the HSR, WW and NTE tier lists (user choice,
 * 2026-11-10). Each grade has its own hue and reaches at least 6:1 on the
 * tier cell background. Data and Supabase rows may still carry older colors;
 * those are only used for grades missing here.
 */
export const TIER_COLORS: Record<string, string> = {
  OP: '#FF6B6B',
  SS: '#FFA94D',
  'S+': '#38D9A9',
  S: '#4DABF7',
  A: '#DEE2E6',
  B: '#B197FC',
  C: '#91A7FF',
  D: '#E8A87C',
  E: '#F783AC',
  F: '#ADB5BD',
};

/** Display color for a tier grade: the shared palette, else a readable version of the data color. */
export function getTierColor(tier: string, fallback?: string): string {
  return TIER_COLORS[tier] ?? readableTextColor(fallback || '#ffffff');
}
