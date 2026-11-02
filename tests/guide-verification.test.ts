import fs from 'node:fs';
import { expect, it } from 'vitest';
import { formatGuideBasis, GUIDE_REVIEW_POLICY } from '../common-hub/utils/guideVerification.js';
import { getPublishedGuides } from '../common-hub/data/guideSummaries';

it('labels bare version numbers with the game and keeps descriptive bases as written', () => {
  expect(formatGuideBasis('nte', '1.0')).toBe('이환 1.0 버전 기준');
  expect(formatGuideBasis('hsr', '붕괴: 스타레일 4.6 전투 시스템')).toBe('붕괴: 스타레일 4.6 전투 시스템');
  expect(formatGuideBasis('ww', '')).toBe('적용 기준 확인 중');
});

it('only claims what every published guide records: an applied basis and a review date', () => {
  for (const gameId of ['hsr', 'ww', 'nte', 'aniimo']) {
    for (const guide of getPublishedGuides(gameId)) {
      expect(guide.applicableVersion, guide.slug).toBeTruthy();
      expect(guide.reviewedAt, guide.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  }
  expect(GUIDE_REVIEW_POLICY).not.toContain('출처');
  for (const file of ['common-hub/pages/GuideList.tsx', 'scripts/prerender-meta.js']) {
    const source = fs.readFileSync(file, 'utf8');
    expect(source).not.toContain('출처를 확인한 글만');
    expect(source).toContain('GUIDE_REVIEW_POLICY');
  }
});
