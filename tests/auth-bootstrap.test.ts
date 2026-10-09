import { describe, expect, it } from 'vitest';
import { shouldInitializeAuth } from '../common-hub/context/AuthContext';

describe('auth bootstrap', () => {
  it('does not load Supabase for an anonymous page visit', () => {
    expect(shouldInitializeAuth({ hash: '', search: '' }, [])).toBe(false);
  });

  it('loads Supabase when a persisted session exists', () => {
    expect(
      shouldInitializeAuth(
        { hash: '', search: '' },
        ['theme', 'sb-xwhtfrbrykedxgbdclyg-auth-token']
      )
    ).toBe(true);
  });

  it.each([
    { hash: '#access_token=token', search: '' },
    { hash: '', search: '?code=oauth-code' },
  ])('loads Supabase for an OAuth callback', location => {
    expect(shouldInitializeAuth(location, [])).toBe(true);
  });
});
