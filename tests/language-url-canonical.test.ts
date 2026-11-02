import { afterEach, describe, expect, it, vi } from 'vitest';

import { consumeLegacyLanguageQuery, getInitialLanguage } from '../common-hub/i18n';
import { getLanguageCanonicalUrl, getLegacyLanguageRedirect, onRequest } from '../functions/_middleware';

describe('language URL canonicalization', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
    window.localStorage.clear();
    document.cookie = 'rira_lang=; Max-Age=0; Path=/';
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

  it('does not build a canonical target when no language query exists', () => {
    expect(getLanguageCanonicalUrl('https://riragamehub.com/gallery/ww/character/chisa')).toBeNull();
  });

  it('redirects legacy language URLs to the clean URL and keeps a non-default language as a cookie', () => {
    expect(getLegacyLanguageRedirect('https://riragamehub.com/gallery/hsr/character/feixiao/guide?lng=en&ref=test')).toEqual({
      location: '/gallery/hsr/character/feixiao/guide?ref=test',
      cookie: 'rira_lang=en; Path=/; Max-Age=31536000; SameSite=Lax; Secure',
    });
    expect(getLegacyLanguageRedirect('https://riragamehub.com/gallery/hsr/character/castorice?lng=ko')).toEqual({
      location: '/gallery/hsr/character/castorice',
      cookie: null,
    });
    expect(getLegacyLanguageRedirect('https://riragamehub.com/gallery/hsr/lightcone/x?lng=xx')?.cookie).toBeNull();
    expect(getLegacyLanguageRedirect('https://riragamehub.com/gallery/ww/character/chisa')).toBeNull();
  });

  it('answers a legacy language URL at the edge before serving the page', async () => {
    const next = vi.fn(async () => new Response('page'));
    const response = await onRequest({ request: new Request('https://riragamehub.com/gallery/ww/character/rover_aero?lng=ko'), next });
    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe('/gallery/ww/character/rover_aero');
    expect(next).not.toHaveBeenCalled();
  });

  it('applies the redirected language cookie when nothing is saved locally', () => {
    document.cookie = 'rira_lang=ja; Path=/';
    expect(getInitialLanguage()).toBe('ja');
    window.localStorage.setItem('rira_lang', 'ko');
    expect(getInitialLanguage()).toBe('ko');
  });
});
