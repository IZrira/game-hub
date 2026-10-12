import { afterEach, describe, expect, it, vi } from 'vitest';

import { consumeLegacyLanguageQuery, getInitialLanguage } from '../common-hub/i18n';
import { getLanguageCanonicalUrl } from '../functions/_middleware';

describe('language URL canonicalization', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('uses a legacy language query once and removes it from the visible URL', () => {
    window.history.replaceState({}, '', '/gallery/hsr/character/feixiao/guide?lng=en&ref=test');

    expect(getInitialLanguage()).toBe('en');
    consumeLegacyLanguageQuery();

    expect(window.localStorage.getItem('rira_lang')).toBe('en');
    expect(window.location.pathname + window.location.search).toBe('/gallery/hsr/character/feixiao/guide?ref=test');
  });

  it('builds a clean production canonical while preserving unrelated query parameters', () => {
    expect(getLanguageCanonicalUrl('https://preview.example.dev/gallery/ww/character/chisa?z=2&lng=ko&a=1')).toBe(
      'https://riragamehub.com/gallery/ww/character/chisa?a=1&z=2',
    );
  });

  it('does not add a canonical header target when no language query exists', () => {
    expect(getLanguageCanonicalUrl('https://riragamehub.com/gallery/ww/character/chisa')).toBeNull();
  });
});
