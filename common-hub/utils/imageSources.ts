export const REPOSITORY_IMAGE_BASE = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main';
const LEGACY_BASE = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
const FALLBACK_BASE = 'https://fastly.jsdelivr.net/gh/IZrira/riragameinfo@main';
export const IMAGE_PLACEHOLDER = '/assets/unknown.webp';

/** Only migrate this public repository; preserve path, query and unrelated origins. */
export function normalizeRepositoryImage(src: string): string {
  return src.startsWith(`${LEGACY_BASE}/`) ? `${REPOSITORY_IMAGE_BASE}${src.slice(LEGACY_BASE.length)}` : src;
}

export function repositoryImageCandidates(src: string): string[] {
  const primary = normalizeRepositoryImage(src);
  if (primary === IMAGE_PLACEHOLDER) return [primary];
  if (primary.startsWith(`${REPOSITORY_IMAGE_BASE}/`)) {
    return [primary, `${FALLBACK_BASE}${primary.slice(REPOSITORY_IMAGE_BASE.length)}`, IMAGE_PLACEHOLDER];
  }
  return [primary, IMAGE_PLACEHOLDER];
}

export function nextRepositoryImage(src: string): string | undefined {
  if (src.startsWith(`${LEGACY_BASE}/`)) return normalizeRepositoryImage(src);
  if (src.startsWith(`${REPOSITORY_IMAGE_BASE}/`)) return `${FALLBACK_BASE}${src.slice(REPOSITORY_IMAGE_BASE.length)}`;
  if (src.startsWith(`${FALLBACK_BASE}/`)) return IMAGE_PLACEHOLDER;
  return undefined;
}
