import { describe, expect, it, vi } from 'vitest';
import { onRequest } from '../functions/_middleware';

describe('production pages.dev domain migration', () => {
  it.each(['/', '/gallery/hsr/character/phainon/guide?lng=ko', '/gallery/nte/guides/%EA%B5%AC%EC%9B%90-build-guide', '/assets/example.js', '/not-a-real-route'])('redirects %s to the same HTTPS custom-domain URL', async path => {
    const next = vi.fn(async () => new Response('content'));
    const response = await onRequest({ request: new Request(`https://rira-game-hub.pages.dev${path}`), next });
    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe(`https://riragamehub.com${path}`);
    expect(next).not.toHaveBeenCalled();
  });

  it.each(['riragamehub.com', 'preview.rira-game-hub.pages.dev', 'localhost'])('keeps %s requests in the existing pipeline', async host => {
    const next = vi.fn(async () => new Response('content'));
    const response = await onRequest({ request: new Request(`https://${host}/`), next });
    expect(response.status).toBe(200);
    expect(next).toHaveBeenCalledOnce();
  });
});
