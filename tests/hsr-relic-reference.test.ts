import { describe, expect, it } from 'vitest';
import { isValidHsrRelicReference } from '../scripts/lib/hsr-relic-reference.js';
import { RELIC_DATA } from '../hsr-hub/data/relics';

describe('HSR relic reference validation', () => {
  it('accepts indexed names and the supported speed two-plus-two description', () => {
    expect(isValidHsrRelicReference('천지를 재창조한 구세주', RELIC_DATA)).toBe(true);
    expect(isValidHsrRelicReference('속도 2세트 + 속도 2세트', RELIC_DATA)).toBe(true);
    expect(isValidHsrRelicReference('가상공간을 누비는 메신저 2세트 + 속도 2세트', RELIC_DATA)).toBe(true);
  });

  it.each([
    '속또 2세트 + 속도 2세트',
    '없는 유물',
    '없는 유물 2세트 + 속도 2세트',
    '속도 4세트 + 속도 2세트',
    '속도 2세트 + 속도 2세트 + 속도 2세트',
    '속도 2세트 +',
    '가상공간을 누비는 메신저 2세트 + 가상공간을 누비는 메신저 2세트',
  ])('continues rejecting invalid references: %s', name => {
    expect(isValidHsrRelicReference(name, RELIC_DATA)).toBe(false);
  });

  it('requires two distinct sets with the actual speed two-piece effect', () => {
    const oneSet = [{ name: 'A', '2piece': '속도 6% 증가' }];
    expect(isValidHsrRelicReference('속도 2세트 + 속도 2세트', oneSet)).toBe(false);
    expect(isValidHsrRelicReference('속도 2세트 + 속도 2세트', [...oneSet, { name: 'B', '4piece': '속도 6% 증가' }])).toBe(false);
    expect(isValidHsrRelicReference('속도 2세트 + 속도 2세트', [...oneSet, { name: 'B', '2piece': '속도 6% 증가' }])).toBe(true);
  });
});
