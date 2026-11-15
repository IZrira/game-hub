// @vitest-environment node
import { expect, it, vi } from 'vitest';
import images from '../nte-hub/data/itemImages.json';
import { onRequest } from '../functions/_middleware';

it('serves all registered 1.5 item detail URLs through the production edge without indexing them', async () => {
  for (const name of Object.keys(images)) {
    const next = vi.fn(async () => new Response('<main>아이템 상세</main>', { headers: { 'Content-Type': 'text/html' } }));
    const response = await onRequest({ request: new Request('https://riragamehub.com/gallery/nte/item/' + encodeURIComponent(name)), next });
    expect(response.status, name).toBe(200);
    expect(next, name).toHaveBeenCalledOnce();
    expect(response.headers.get('X-Robots-Tag'), name).toBe('noindex, follow');
  }
});

it('keeps unknown item URLs as real 404 responses', async () => {
  const next = vi.fn(async () => new Response('should not be served'));
  const response = await onRequest({ request: new Request('https://riragamehub.com/gallery/nte/item/__missing_nte15_item__'), next });
  expect(response.status).toBe(404);
  expect(next).not.toHaveBeenCalled();
});
