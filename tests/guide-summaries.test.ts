import { expect, it } from 'vitest';
import { build } from 'esbuild';
import { GUIDE_ARTICLES, getPublishedGuide as getFullGuide, getPublishedGuides as getFullGuides } from '../common-hub/data/guideArticles';
import { GUIDE_SUMMARIES, getPublishedGuide, getPublishedGuides } from '../common-hub/data/guideSummaries';

it('preserves article order and every routing/list field without body or sources', () => {
  expect(GUIDE_SUMMARIES).toEqual(GUIDE_ARTICLES.map(({ content, sources, analysis, ...summary }) => summary));
  for (const article of GUIDE_SUMMARIES) {
    expect(article).not.toHaveProperty('content');
    expect(article).not.toHaveProperty('sources');
    expect(article).not.toHaveProperty('analysis');
    expect(getPublishedGuide(article.gameId, article.slug)).toEqual(article.status === 'published' ? article : undefined);
    expect(getFullGuide(article.gameId, article.slug)?.content).toEqual(article.status === 'published'
      ? GUIDE_ARTICLES.find(full => full.gameId === article.gameId && full.slug === article.slug)?.content : undefined);
  }
});

it.each(['hsr', 'ww', 'nte', 'aniimo', 'missing'])('keeps published links, NTE dispatch metadata and draft filtering unchanged: %s', game => {
  const stripBody = ({ content, sources, analysis, ...summary }: any) => summary;
  expect(getPublishedGuides(game)).toEqual(getFullGuides(game).map(stripBody));
  expect(getPublishedGuide(game, 'missing')).toBeUndefined();
});

it('does not import the full article module or authoring JSON at runtime', async () => {
  const result = await build({ entryPoints: ['common-hub/data/guideSummaries.ts'], bundle: true, write: false, metafile: true, format: 'esm', logLevel: 'silent' });
  expect(Object.keys(result.metafile!.inputs).some(file => /guideArticles\.(json|ts)$/.test(file))).toBe(false);
  expect(Object.keys(result.metafile!.inputs)).toContain('common-hub/data/generated/guide-summaries.json');
});
