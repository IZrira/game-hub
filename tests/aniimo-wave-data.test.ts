import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import legacy from '../aniimo-hub/data/aniimo.json';
import waveData from '../aniimo-hub/data/wave-archipelago.json';
import type { AniimoEntry } from '../aniimo-hub/types';
import { loadAniimoCatalog } from '../scripts/lib/aniimo-catalog.js';
import { parseWaveRoster } from '../scripts/lib/aniimo-wave-parser.js';
const wave = waveData as AniimoEntry[];

describe('official Wave Archipelago addition', () => {
  it('preserves the original 86 entries byte for byte and keeps duplicate official numbers separate', () => {
    const hash = createHash('sha256').update(fs.readFileSync(path.resolve('aniimo-hub/data/aniimo.json'))).digest('hex');
    expect(hash).toBe('a0d257b7dc68db76fa3a532668be565288ef576f5e767ba72e9d96effab0cb93');
    const catalog = loadAniimoCatalog(process.cwd());
    expect(legacy).toHaveLength(86);
    expect(catalog).toHaveLength(115);
    expect(catalog.filter((entry: { number: string }) => entry.number === '001').map((entry: { name: string }) => entry.name)).toEqual(['탄멍멍', '쉘코랄']);
    expect(new Set(catalog.map((entry: { id?: string; number: string }) => entry.id || entry.number)).size).toBe(115);
  });

  it('imports all 29 numbered species and 42 official forms without using the region code as a form key', () => {
    expect(wave).toHaveLength(29);
    expect(wave.map(entry => entry.number)).toEqual(Array.from({ length: 29 }, (_, i) => String(i + 1).padStart(3, '0')));
    expect(wave.flatMap(entry => entry.forms)).toHaveLength(42);
    for (const entry of wave) {
      expect(entry.id).toBe(`wave-archipelago-${entry.number}`);
      expect(entry.regionName).toBe('웨이브 군도');
      for (const form of entry.forms) {
        expect(form.key).not.toBe('300301');
        expect(form.sourceUrl).toBe(`https://wiki.aniimo.com/ko/item/${entry.number}/${form.key}/300301`);
        expect(form.imageUrl).toMatch(/^https:\/\/worldx-website-cdn\.aniimo\.com\//);
        expect(Object.values(form.stats).every(value => typeof value === 'number')).toBe(true);
        expect(form.combatSkills.length).toBeGreaterThan(0);
      }
    }
  });

  it('preserves official locations, exploration labels and base stats independently of legacy aliases', () => {
    const shell = wave[0];
    expect(shell.elements).toEqual(['땅', '물']);
    expect(shell.stats).toEqual({ total: 453, hp: 83, break: 50, attack: 82, magicDefense: 79, physicalDefense: 75, energyRecovery: 84 });
    expect(shell.forms[0].locations).toEqual(['초승달 만', '스칼렛보우 습지']);
    expect(shell.forms[0].explorationSkills[0].name).toBe('수영 Lv.1');
    expect(shell.forms[0].evolutionRoutes![0].map(node => node.name)).toEqual(['쉘코랄', '코랄드래곤']);
  });

  it('keeps missing official evolution nodes unresolved rather than guessing a target', () => {
    const tempest = wave.find(entry => entry.name === '웨이비핀')!.forms.find(form => form.key === 'tempest-form')!;
    const unknown = tempest.evolution.find(node => node.stage === '성장기')!;
    expect(unknown.imageUrl).toBeNull();
    expect(unknown.name).toBeNull();
    expect(unknown.formKey).toBeNull();
    // A visible official icon without a catalogued form also stays unresolved.
    expect(wave.find(entry => entry.name === '부엉파')!.evolution.some(node => node.name === null && node.imageUrl?.endsWith('10574.png'))).toBe(true);
  });

  it('rejects an incomplete or changed official index before collection can replace the additions file', () => {
    expect(() => parseWaveRoster('<html><p>Unavailable</p></html>')).toThrow(/roster changed/);
    expect(() => parseWaveRoster('<a href="/ko/item/001/basic-form/300301"><span>NO.001</span></a>')).toThrow(/Incomplete official index/);
  });
});
