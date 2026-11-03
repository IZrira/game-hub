import fs from 'node:fs';
import { expect, it } from 'vitest';
import { regionSummaryParagraphs, summarizeRegion } from '../aniimo-hub/utils/regionSummary.js';
import { ELEMENT_CHART } from '../aniimo-hub/data/elementChart';
import { elementMultiplier } from '../aniimo-hub/data/elementChartData.js';

const form = (label: string, elements: string[], positions: string[] = ['딜']) => ({ label, elements, positions });

it('keeps the app chart and the shared chart data identical', () => {
  for (const [attacker, row] of Object.entries(ELEMENT_CHART)) {
    for (const [defender, value] of Object.entries(row)) expect(elementMultiplier(attacker, defender)).toBe(value);
  }
});

it('summarizes elements, positions, favoured attacks and exclusive forms from the listed entries', () => {
  const appearances = [
    { entry: { name: 'A' }, forms: [form('기본 형태', ['얼음'])] },
    { entry: { name: 'B' }, forms: [form('기본 형태', ['얼음'], ['치유']), form('설원 형태', ['얼음', '물'])] },
    { entry: { name: 'C' }, forms: [form('기본 형태', ['풀'])] },
  ];
  const summary = summarizeRegion(appearances, f => f.label === '설원 형태');
  expect(summary).toMatchObject({ speciesCount: 3, formCount: 4, exclusiveForms: ['B(설원 형태)'] });
  expect(summary.elements[0]).toEqual(['얼음', 3]);
  // 불 beats 얼음 and 풀 but is resisted by 물, so the 얼음+물 form does not count.
  expect(summary.favoured[0]).toEqual(['불', 3]);

  const text = regionSummaryParagraphs(summary).join(' ');
  expect(text).toContain('애니모 3종(4개 형태)');
  expect(text).toContain('불 3');
  expect(text).toContain('이 지역에서만 확인되는 형태: B(설원 형태)');
});

it('shows the same overview on the location page and in its prerendered HTML', () => {
  expect(fs.readFileSync('aniimo-hub/pages/LocationDetail.tsx', 'utf8')).toContain('regionSummaryParagraphs(summarizeRegion(appearances, isFormExclusive))');
  expect(fs.readFileSync('scripts/prerender-meta.js', 'utf8')).toContain('<h2>지역 한눈에 보기</h2>');
  expect(regionSummaryParagraphs(summarizeRegion([]))).toEqual([]);
});
