// Text colors that stay readable on the site's dark surfaces (WCAG AA 4.5:1).
// Accent and data colors (element, path, tier) are often too dark for text on
// #121212, so text uses a lighter mix of the same hue instead of the raw value.

export const SURFACE = '#121212';
export const AA_TEXT_RATIO = 4.5;

type Rgb = [number, number, number];

function parseHex(value: string): Rgb | null {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return null;
  const hex = match[1].length === 3 ? match[1].split('').map(c => c + c).join('') : match[1];
  return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
}

function luminance([r, g, b]: Rgb): number {
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

const toHex = (rgb: Rgb) => `#${rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

/** WCAG contrast ratio of two hex colors, or null when either is not a hex color. */
export function contrastRatio(foreground: string, background: string = SURFACE): number | null {
  const a = parseHex(foreground);
  const b = parseHex(background);
  if (!a || !b) return null;
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const cache = new Map<string, string>();

/**
 * The given color if it already reaches `minRatio` on `background`; otherwise
 * the first mix toward white (5% steps) that does. Non-hex input is returned
 * unchanged so CSS variables and named colors keep working.
 */
export function readableTextColor(color: string, background: string = SURFACE, minRatio: number = AA_TEXT_RATIO): string {
  const key = `${color}|${background}|${minRatio}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const rgb = parseHex(color);
  const ratio = contrastRatio(color, background);
  let result = color;
  if (rgb && ratio !== null && ratio < minRatio) {
    result = '#ffffff';
    for (let step = 1; step <= 20; step++) {
      const t = step / 20;
      const mixed = toHex(rgb.map(v => v + (255 - v) * t) as Rgb);
      if ((contrastRatio(mixed, background) ?? 0) >= minRatio) { result = mixed; break; }
    }
  }
  cache.set(key, result);
  return result;
}

/** White or near-black text, whichever reads better on a filled background color. */
export function textOn(background: string): string {
  const white = contrastRatio('#ffffff', background);
  if (white === null) return '#ffffff';
  return white >= AA_TEXT_RATIO ? '#ffffff' : '#0a0a0a';
}
