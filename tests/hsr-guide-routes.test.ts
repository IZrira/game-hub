import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { getHsrGuideRegistry, findRegisteredHsrGuide } from '../scripts/lib/hsr-guide-routes.js';
import { onRequest } from '../functions/_middleware';

const guideDirectory = path.resolve('hsr-hub/data/guides');
const characterDirectory = path.resolve('hsr-hub/data/characters/hsr');
const registry = getHsrGuideRegistry(
  fs.readFileSync(path.join(guideDirectory, 'index.ts'), 'utf8'),
  filename => fs.readFileSync(path.join(guideDirectory, `${filename}.ts`), 'utf8'),
);
const readCharacterNames = (id: string) => {
  const source = fs.readFileSync(path.join(characterDirectory, `${id}.ts`), 'utf8');
  return {
    name: source.match(/name:\s*["'](.*?)["']/)?.[1],
    folderName: source.match(/folderName:\s*["'](.*?)["']/)?.[1],
  };
};

describe('registered HSR guide routes', () => {
  it.each([
    ['black_swan', '블랙스완'],
    ['rin_tohsaka', '토오사카린'],
    ['the_herta', '더헤르타'],
    ['dr_ratio', '닥터레이시오'],
    ['trailblazer_elation', '개척자환락'],
    ['silver_wolf_999', '은랑LV999'],
  ])('matches %s to its actual registered source file', (id, basename) => {
    const matched = findRegisteredHsrGuide(readCharacterNames(id), registry);
    expect(matched).toBe(basename);
    expect(fs.statSync(path.join(guideDirectory, `${matched}.ts`)).isFile()).toBe(true);
    // Route IDs are not guide filenames and cannot supply the guide's lastmod.
    expect(fs.existsSync(path.join(guideDirectory, `${id}.ts`))).toBe(false);
  });

  it('matches all 93 registrations to real character guides without omissions', () => {
    const matched = fs.readdirSync(characterDirectory)
      .filter(filename => filename.endsWith('.ts') && filename !== 'index.ts')
      .map(filename => findRegisteredHsrGuide(readCharacterNames(filename.slice(0, -3)), registry))
      .filter(Boolean);
    expect(registry.size).toBe(93);
    expect(matched).toHaveLength(93);
    expect(new Set(matched)).toEqual(new Set(registry.values()));
  });

  it('normalizes Unicode and whitespace while retaining the actual import filename', () => {
    const imported = '블랙스완'.normalize('NFD');
    const decomposedRegistry = getHsrGuideRegistry(`import guide from './${imported}';`,
      () => `characterName: '${imported}'`);
    expect(findRegisteredHsrGuide({ name: '블랙\t 스완' }, decomposedRegistry)).toBe(imported);
  });

  it('does not guess an unregistered guide or silently resolve ambiguous filenames', () => {
    expect(findRegisteredHsrGuide({ name: '블랙 스완 신규', folderName: 'black_swan' }, registry)).toBeUndefined();
    expect(() => getHsrGuideRegistry("import a from './블랙스완';\nimport b from './블랙 스완';",
      () => "characterName: '블랙스완'"))
      .toThrow('Ambiguous HSR guide registration');
  });

  it.each(['black_swan', 'rin_tohsaka', 'the_herta'])('allows the generated %s guide route', async id => {
    const next = vi.fn(async () => new Response('guide', { status: 200 }));
    const response = await onRequest({
      request: new Request(`https://riragamehub.com/gallery/hsr/character/${id}/guide`),
      next,
    });
    expect(response.status).toBe(200);
    expect(next).toHaveBeenCalledOnce();
  });

  it('continues rejecting unknown guide routes instead of serving the SPA fallback', async () => {
    const next = vi.fn(async () => new Response('SPA fallback', { status: 200 }));
    const response = await onRequest({
      request: new Request('https://riragamehub.com/gallery/hsr/character/__unregistered__/guide'),
      next,
    });
    expect(response.status).toBe(404);
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(next).not.toHaveBeenCalled();
  });
});
