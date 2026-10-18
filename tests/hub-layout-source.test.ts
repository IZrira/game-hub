import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('hub home content is not duplicated by layout reordering', () => {
  for (const game of ['hsr', 'ww', 'nte']) {
    it(`${game} keeps exactly one intro and one reviewed guide section`, () => {
      const source = readFileSync(`${process.cwd()}/${game}-hub/pages/Gallery.tsx`, 'utf8');
      expect(source.match(/<HubIntro\s/g)).toHaveLength(1);
      expect(source.match(/<ReviewedGuideHighlights\s/g)).toHaveLength(1);
      expect(source).not.toContain('Archive v1.0');
    });
  }
});
