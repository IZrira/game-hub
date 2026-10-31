import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import articles from '../common-hub/data/guideArticles.json';
import records from '../nte-hub/data/guideAnalysis.json';
import { attachNteGuideAnalysis, renderNteGuideAnalysis } from '../scripts/lib/nte-guide-analysis.js';
import manifest from '../common-hub/data/generated/article-runtime-manifest.json';
import { parseNteCharacterGuide } from '../nte-hub/data/parseCharacterGuide';

describe('reviewed local NTE analysis publication', () => {
  it.each(Object.entries(records))('adds %s without changing synced setup, party, ranks or source', (slug, record) => {
    const source = articles.find(article => article.gameId === 'nte' && article.slug === slug)!;
    const before = JSON.stringify(source);
    const result = attachNteGuideAnalysis(source, records);
    expect(result.analysis).toEqual(record.analysis);
    expect(result.content).toBe(source.content);
    expect(parseNteCharacterGuide(result.content)).toEqual(parseNteCharacterGuide(source.content));
    expect(JSON.stringify(source)).toBe(before);
    expect(result.reviewedAt).toBe('2026-10-31');
    const url = (manifest as Record<string, string>)[`nte/${slug}`];
    const published = JSON.parse(fs.readFileSync(`public${url}`, 'utf8'));
    expect(published.analysis).toEqual(record.analysis);
    expect(published.content).toBe(source.content);
  });

  it('withholds a local review when the source character, version or edited date changes', () => {
    const source = articles.find(article => article.slug === '파디아-build-guide')!;
    for (const change of [{ characterId: 'different' }, { applicableVersion: '1.4' }, { reviewedAt: '2026-11-01' }, { content: source.content + '\n같은 날 수정' }, { status: 'draft' }]) {
      const changed = { ...source, ...change };
      expect(attachNteGuideAnalysis(changed, records)).toBe(changed);
      expect(attachNteGuideAnalysis(changed, records).analysis).toBeUndefined();
    }
    const drafts = { ...records, [source.slug]: { ...records['파디아-build-guide'], analysis: { ...records['파디아-build-guide'].analysis, status: 'review' } } };
    expect(attachNteGuideAnalysis(source, drafts)).toBe(source);
  });

  it('keeps unrelated articles untouched', () => {
    const original = articles.find(article => article.gameId !== 'nte')!;
    expect(attachNteGuideAnalysis(original, records)).toBe(original);
    const noReview = articles.find(article => article.slug === '감정사-build-guide')!;
    expect(attachNteGuideAnalysis(noReview, records)).toBe(noReview);
  });

  it('escapes every prerendered analysis field and omits unpublished analysis', () => {
    const analysis = structuredClone(records['파디아-build-guide'].analysis);
    analysis.summary = '<img src=x onerror=alert(1)>';
    analysis.gameplay.rotation[0] = '<script>bad()</script>';
    const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    const html = renderNteGuideAnalysis(analysis, escape);
    expect(html).toContain('RIRA 캐릭터 분석');
    expect(html).toContain('&lt;img');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('<script>');
    expect(renderNteGuideAnalysis({ ...analysis, status: 'review' }, escape)).toBe('');
  });
});
