import { describe, expect, it } from 'vitest';
import { getHsrCharacterArtUrl } from '../common-hub/utils/assetManager';

describe('HSR character image paths', () => {
  it.each(['더 헤르타', '선데이'])(
    'encodes the canonical CDN path for %s',
    folderName => {
      const url = getHsrCharacterArtUrl(folderName);

      expect(url).toContain('/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/');
      expect(url).toContain(`/${encodeURIComponent(folderName)}/art01.webp`);
      expect(url).not.toMatch(/[가-힣\s]/);
    }
  );

  it('uses the dedicated Trailblazer artwork filename', () => {
    expect(getHsrCharacterArtUrl('개척자 (환락)', true)).toMatch(/\/art01-01\.webp$/);
  });
});
