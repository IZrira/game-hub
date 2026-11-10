// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrastRatio, readableTextColor, textOn } from '../common-hub/utils/colorContrast';
import { TIER_COLORS, getTierColor } from '../common-hub/utils/tierColors';

describe('readable text colors on dark surfaces', () => {
  it('lifts the HSR purple and dark data colors to at least 4.5:1 on #121212', () => {
    for (const color of ['#7E30E1', '#5F27CD', '#485460', '#2d3436', '#1e272e']) {
      expect(contrastRatio(readableTextColor(color))!, color).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('keeps colors that are already readable', () => {
    expect(readableTextColor('#FFFFFF')).toBe('#FFFFFF');
    expect(readableTextColor('#EAB308')).toBe('#EAB308');
  });

  it('returns non-hex values unchanged', () => {
    expect(readableTextColor('')).toBe('');
    expect(readableTextColor('red')).toBe('red');
    expect(readableTextColor('var(--x)')).toBe('var(--x)');
  });

  it('uses the chosen text purple token (#B794F6, 7.7:1)', () => {
    const css = readFileSync(new URL('../common-hub/index.css', import.meta.url), 'utf8');
    expect(css).toContain('--color-brand-primary-text: #B794F6;');
    expect(contrastRatio('#B794F6')!).toBeGreaterThan(7.5);
  });
});

describe('text on accent fills', () => {
  it('uses dark text on light element colors and white on dark ones', () => {
    expect(textOn('#D2A1FF')).toBe('#0a0a0a');
    expect(textOn('#7E30E1')).toBe('#ffffff');
    expect(contrastRatio(textOn('#A1D9FF'), '#A1D9FF')!).toBeGreaterThanOrEqual(4.5);
  });
});

describe('tier grade colors', () => {
  it('gives every grade its own color that reads at 6:1 on the tinted tier cell', () => {
    const colors = Object.values(TIER_COLORS);
    expect(new Set(colors.map(c => c.toLowerCase())).size).toBe(colors.length);
    for (const [tier, color] of Object.entries(TIER_COLORS)) {
      // The cell is the grade color at 10/255 alpha over #121212.
      const alpha = 0x10 / 255;
      const cell = `#${[1, 3, 5].map(i => Math.round(parseInt(color.slice(i, i + 2), 16) * alpha + 0x12 * (1 - alpha)).toString(16).padStart(2, '0')).join('')}`;
      expect(contrastRatio(color, cell)!, tier).toBeGreaterThanOrEqual(6);
    }
  });

  it('ignores old data colors for known grades and repairs unknown ones', () => {
    expect(getTierColor('E', '#2d3436')).toBe('#F783AC');
    expect(contrastRatio(getTierColor('?', '#1e272e'))!).toBeGreaterThanOrEqual(4.5);
  });
});
