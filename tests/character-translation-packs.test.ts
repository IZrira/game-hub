import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from '../common-hub/data/search/character-translations.json';
import { getRouteTranslationPacks } from '../common-hub/utils/routeTranslations';

describe('generated detail translation packs', () => {
  for (const scope of ['hsr', 'ww'] as const) {
    const directory = path.resolve('common-hub/locales', scope);
    for (const [language, owners] of Object.entries(manifest[scope].packs)) {
      it(`preserves every original ${scope}/${language} key and value`, () => {
        const original = JSON.parse(fs.readFileSync(path.join(directory, `${scope}_characters_${language}.json`), 'utf8'));
        const combined = Object.assign({}, ...owners.map(owner => JSON.parse(fs.readFileSync(path.join(directory, 'characters', `${owner}_${language}.json`), 'utf8'))));
        expect(combined).toEqual(original);
      });
    }
  }

  it('includes every translated key referenced by each WW character', () => {
    const characters = JSON.parse(fs.readFileSync('ww-hub/data/generated/characters.json', 'utf8'));
    for (const language of Object.keys(manifest.ww.packs)) {
      const original = JSON.parse(fs.readFileSync(`common-hub/locales/ww/ww_characters_${language}.json`, 'utf8'));
      for (const character of characters) {
        const packs = getRouteTranslationPacks('ww', `/gallery/ww/character/${encodeURIComponent(character.id)}`);
        const selected = Object.assign({}, ...packs.map(pack => {
          const file = `common-hub/locales/ww/${pack}_${language}.json`;
          return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
        }));
        const strings: string[] = [];
        const collect = (value: unknown) => {
          if (typeof value === 'string') strings.push(value);
          else if (value && typeof value === 'object') Object.values(value).forEach(collect);
        };
        collect(character);
        for (const key of strings.filter(value => Object.hasOwn(original, value))) {
          expect(selected[key], `${character.id}/${language}/${key}`).toEqual(original[key]);
        }
      }
    }
  });

  it('registers selected translations without loading unrelated character descriptions', async () => {
    const { default: i18n, loadGameLanguageResources } = await import('../common-hub/i18n');
    await loadGameLanguageResources('en', 'ww', '/gallery/ww/character/camellya', '');
    expect(i18n.getResource('en', 'translation', 'character.camellya.name')).toBe('Camellya');
    expect(i18n.getResource('en', 'translation', 'character.mortefi.briefInfo')).toBeUndefined();
    await loadGameLanguageResources('en', 'ww', '/gallery/ww/character/mortefi', '');
    expect(i18n.getResource('en', 'translation', 'character.mortefi.name')).toBe('Mortefi');
    expect(i18n.getResource('en', 'translation', 'character.camellya.name')).toBe('Camellya');
    await loadGameLanguageResources('ko', 'ww', '/gallery/ww/character/camellya', '');
    expect(i18n.getResource('ko', 'translation', 'character.camellya.name')).toBe('카멜리아');
  });

  it('includes every literal translation key referenced in HSR character sources', () => {
    for (const language of Object.keys(manifest.hsr.packs)) {
      const original = JSON.parse(fs.readFileSync(`common-hub/locales/hsr/hsr_characters_${language}.json`, 'utf8'));
      for (const file of fs.readdirSync('hsr-hub/data/characters/hsr').filter(file => file.endsWith('.ts'))) {
        const source = fs.readFileSync(`hsr-hub/data/characters/hsr/${file}`, 'utf8');
        const id = source.match(/\bid\s*:\s*["']([^"']+)["']/)?.[1];
        if (!id) continue;
        const packs = getRouteTranslationPacks('hsr', `/gallery/hsr/character/${id}`);
        const selected = Object.assign({}, ...packs.map(pack => {
          const packFile = `common-hub/locales/hsr/${pack}_${language}.json`;
          return fs.existsSync(packFile) ? JSON.parse(fs.readFileSync(packFile, 'utf8')) : {};
        }));
        for (const key of Object.keys(original).filter(key => source.includes(`'${key}'`) || source.includes(`"${key}"`))) {
          expect(selected[key], `${id}/${language}/${key}`).toEqual(original[key]);
        }
      }
    }
  });
});
