import fs from 'node:fs';
import { expect, it } from 'vitest';
import hsrManifest from '../hsr-hub/data/generated/guide-runtime-manifest.json';
import wwManifest from '../ww-hub/data/generated/guide-runtime-manifest.json';

const dictionaries = (scope: 'hsr' | 'ww', language: string) => {
  const files = [`${scope}_characters`, scope === 'hsr' ? 'hsr_lightcones' : 'ww_weapons'];
  return Object.assign({}, ...files.map(pack => JSON.parse(fs.readFileSync(`common-hub/locales/${scope}/${pack}_${language}.json`, 'utf8')))) as Record<string, string>;
};

it('preserves every available name label and direct guide reference in both languages', () => {
  for (const scope of ['hsr', 'ww'] as const) {
    const urls = scope === 'hsr' ? Object.values(hsrManifest) : Object.values(wwManifest.aliases);
    const corpus = [...new Set(urls)].map(url => fs.readFileSync(`public${url}`, 'utf8')).join('\n');
    const identities = fs.readFileSync(`${scope}-hub/data/generated/character-summary.json`, 'utf8')
      + (scope === 'ww' ? fs.readFileSync('ww-hub/data/generated/guide-characters.json', 'utf8') : '');
    for (const language of ['ko', 'en']) {
      const original = dictionaries(scope, language);
      const actual = JSON.parse(fs.readFileSync(`common-hub/locales/${scope}/guide_labels_${language}.json`, 'utf8'));
      // Values in a generated pack must always come from its original dictionaries.
      for (const [key, value] of Object.entries(actual)) expect(value, `${scope}/${language}/${key}`).toEqual(original[key]);
      for (const [key, value] of Object.entries(original)) {
        const identity = /^character\.[^.]+\.(?:metadata\.)?name$/.test(key) || /^(?:lightcone|weapon)\..+\.name$/.test(key);
        if (identity || corpus.includes(key) || identities.includes(key)) {
          expect(actual[key], `${scope}/${language}/${key}`).toEqual(value);
        }
      }
      expect(Object.keys(actual).length).toBeLessThan(Object.keys(original).length);
    }
  }
});

it('loads guide labels without unrelated descriptions and still loads full details afterward', async () => {
  const { default: i18n, loadGameLanguageResources } = await import('../common-hub/i18n');
  for (const language of ['ko', 'en'] as const) {
    await loadGameLanguageResources(language, 'ww', '/gallery/ww/character/camellya/guide', '');
    const originalWw = dictionaries('ww', language);
    expect(i18n.getResource(language, 'translation', 'character.camellya.name')).toBe(originalWw['character.camellya.name']);
    expect(i18n.getResource(language, 'translation', 'character.camellya.briefInfo')).toBeUndefined();
    const weaponDescription = Object.keys(originalWw).find(key => key.startsWith('weapon.') && key.endsWith('.description'))!;
    expect(i18n.getResource(language, 'translation', weaponDescription)).toBeUndefined();

    await loadGameLanguageResources(language, 'hsr', '/gallery/hsr/character/cyrene/guide', '');
    const originalHsr = dictionaries('hsr', language);
    const lightconeName = Object.keys(originalHsr).find(key => /^lightcone\.[^.]+\.name$/.test(key))!;
    const lightconeStory = Object.keys(originalHsr).find(key => key.startsWith('lightcone.') && key.endsWith('.story'))!;
    expect(i18n.getResource(language, 'translation', lightconeName)).toBe(originalHsr[lightconeName]);
    expect(i18n.getResource(language, 'translation', lightconeStory)).toBeUndefined();

    await loadGameLanguageResources(language, 'ww', '/gallery/ww/character/camellya', '');
    expect(i18n.getResource(language, 'translation', 'character.camellya.briefInfo')).toBe(originalWw['character.camellya.briefInfo']);
    await loadGameLanguageResources(language, 'ww', '/gallery/ww/weapon/example', '');
    expect(i18n.getResource(language, 'translation', weaponDescription)).toBe(originalWw[weaponDescription]);
    await loadGameLanguageResources(language, 'hsr', '/gallery/hsr/lightcone/example', '');
    expect(i18n.getResource(language, 'translation', lightconeStory)).toBe(originalHsr[lightconeStory]);
  }
});
