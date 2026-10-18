import { expect, it } from 'vitest';
import { normalizeRepositoryImage, repositoryImageCandidates, nextRepositoryImage } from '../common-hub/utils/imageSources';

const raw = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main';
const cdn = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
const fastly = 'https://fastly.jsdelivr.net/gh/IZrira/riragameinfo@main';
const path = '/ww%20images/Echo/%EC%95%85%EB%AA%BD%20%C2%B7%20%ED%97%A4%EC%B9%B4%ED%85%8C.webp?v=1';
it('bypasses package-size failures while preserving the exact encoded file and version', () => {
  expect(normalizeRepositoryImage(cdn + path)).toBe(raw + path);
  expect(repositoryImageCandidates(cdn + path)).toEqual([raw + path, fastly + path, '/assets/unknown.webp']);
});
it('terminates DOM retries without returning to the rejected provider', () => {
  expect(nextRepositoryImage(cdn + path)).toBe(raw + path);
  expect(nextRepositoryImage(raw + path)).toBe(fastly + path);
  expect(nextRepositoryImage(fastly + path)).toBe('/assets/unknown.webp');
  expect(nextRepositoryImage('https://riragamehub.com/assets/unknown.webp')).toBeUndefined();
});
it('leaves local thumbnails, official Aniimo images and unrelated repositories unchanged', () => {
  for (const src of ['/assets/test.webp', 'https://worldx-website-cdn.aniimo.com/image.png', cdn + '-other/image.webp']) {
    expect(normalizeRepositoryImage(src)).toBe(src);
    expect(nextRepositoryImage(src)).toBeUndefined();
  }
  expect(repositoryImageCandidates('/assets/unknown.webp')).toEqual(['/assets/unknown.webp']);
});
