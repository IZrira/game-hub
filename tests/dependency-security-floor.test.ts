import fs from 'node:fs';
import { expect, it } from 'vitest';

const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const floors: Record<string, number[]> = {
  dompurify: [3, 4, 17],
  'follow-redirects': [1, 16, 1],
  'happy-dom': [21, 0, 4],
  'markdown-it': [14, 3, 3],
  undici: [7, 30, 1],
  vite: [6, 4, 4],
};

// Floors cover the advisories fixed on 2026-10-24; live npm audit remains required.
it.each(Object.entries(floors))('locks every %s installation outside the known vulnerable versions', (name, floor) => {
  const entries = Object.entries(lock.packages).filter(([path]) => path.endsWith(`node_modules/${name}`));
  expect(entries.length).toBeGreaterThan(0);
  for (const [path, info] of entries) {
    const parts = (info as { version: string }).version.split('.').map(Number);
    const firstDifferent = floor.findIndex((value, index) => parts[index] !== value);
    expect(firstDifferent === -1 || parts[firstDifferent] > floor[firstDifferent], path).toBe(true);
  }
});
