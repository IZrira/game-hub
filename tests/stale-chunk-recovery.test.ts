// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isShellServedForMissingFile, onRequest } from '../functions/_middleware';
import { CHUNK_RELOAD_GUARD_MS, installChunkReloadHandler, shouldReloadForChunkError } from '../common-hub/utils/chunkReload';
import {
  MANIFEST_NAME, findAssetReferences, retainPreviousAssets, selectRetained,
} from '../scripts/retain-previous-assets.js';

const shell = () => new Response('<!DOCTYPE html><html></html>', {
  status: 200,
  headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=31536000, immutable' },
});

describe('missing files are not answered with the app shell', () => {
  it.each([
    ['/assets/module-OldHash1.js', true],
    ['/assets/index-OldHash.css', true],
    ['/assets/data/hsr/lightcones/0123456789abcdef.json', true],
    ['/images/missing.webp', true],
    ['/google92275b89a51149d4.html', false],
    ['/gallery/hsr/character/acheron', false],
  ])('%s -> %s', (pathname, expected) => {
    expect(isShellServedForMissingFile(pathname, 200, 'text/html; charset=utf-8')).toBe(expected);
  });

  it('keeps real files and non-200 responses as they are', () => {
    expect(isShellServedForMissingFile('/assets/module-a.js', 200, 'text/javascript')).toBe(false);
    expect(isShellServedForMissingFile('/assets/module-a.js', 304, null)).toBe(false);
  });

  it('returns an uncached 404 for an old chunk', async () => {
    const response = await onRequest({ request: new Request('https://riragamehub.com/assets/module-OldHash1.js'), next: async () => shell() });
    expect(response.status).toBe(404);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(response.headers.get('Content-Type')).toContain('text/plain');
  });

  it('still serves an existing chunk as immutable JavaScript', async () => {
    const next = async () => new Response('export{}', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript', 'Cache-Control': 'public, max-age=31536000, immutable' },
    });
    const response = await onRequest({ request: new Request('https://riragamehub.com/assets/module-New.js'), next });
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
  });
});

describe('reload once when a chunk from an earlier deploy fails', () => {
  it('reloads unless it already reloaded within the guard window', () => {
    expect(shouldReloadForChunkError(1_000_000, null)).toBe(true);
    expect(shouldReloadForChunkError(1_000_000, 1_000_000 - 1000)).toBe(false);
    expect(shouldReloadForChunkError(1_000_000, 1_000_000 - CHUNK_RELOAD_GUARD_MS - 1)).toBe(true);
  });

  it('prevents the error and reloads, then lets a repeated failure through', () => {
    const storage = new Map<string, string>();
    let listener: ((event: Event) => void) | undefined;
    const reload = vi.fn();
    installChunkReloadHandler({
      addEventListener: (_type, fn) => { listener = fn; },
      location: { reload },
      sessionStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => { storage.set(key, value); } },
    });
    const first = new Event('vite:preloadError', { cancelable: true });
    listener!(first);
    expect(first.defaultPrevented).toBe(true);
    expect(reload).toHaveBeenCalledOnce();

    const second = new Event('vite:preloadError', { cancelable: true });
    listener!(second);
    expect(second.defaultPrevented).toBe(false);
    expect(reload).toHaveBeenCalledOnce();
  });
});

describe('previous deploy assets are retained', () => {
  const now = '2026-11-09T00:00:00.000Z';

  it('keeps the previous live files and recent retained files only', () => {
    const previous = {
      current: ['index-old.js', 'module-shared.js', '../escape.js'],
      retained: {
        'module-recent.js': '2026-11-05T00:00:00.000Z',
        'module-expired.js': '2026-10-30T00:00:00.000Z',
        'module-shared.js': '2026-11-01T00:00:00.000Z',
      },
    };
    expect(selectRetained(previous, ['module-shared.js', 'index-new.js'], now)).toEqual([
      ['index-old.js', now],
      ['module-recent.js', '2026-11-05T00:00:00.000Z'],
    ]);
    expect(selectRetained(previous, [], now, { max: 1 })).toHaveLength(1);
    expect(selectRetained(null, [], now)).toEqual([]);
  });

  it('finds hashed chunk references in HTML and JS', () => {
    const text = '<script src="/assets/index-Ab_1.js"></script>import("./module-x-Y2.js");"assets/x.png"';
    expect(findAssetReferences(text)).toEqual(['index-Ab_1.js', 'module-x-Y2.js']);
  });

  describe('build step', () => {
    let dir: string;
    afterEach(() => {
      vi.unstubAllGlobals();
      fs.rmSync(dir, { recursive: true, force: true });
    });

    it('downloads previous files listed in the live manifest and writes a new manifest', async () => {
      dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retain-'));
      fs.writeFileSync(path.join(dir, 'index-new.js'), 'new');
      const files: Record<string, Response> = {
        [`/assets/${MANIFEST_NAME}`]: Response.json({ version: 1, current: ['index-old.js', 'module-gone.js'], retained: {} }),
        '/assets/index-old.js': new Response('old', { headers: { 'content-type': 'application/javascript' } }),
        '/assets/module-gone.js': shell(),
      };
      vi.stubGlobal('fetch', vi.fn(async (url: string) => files[new URL(url).pathname] ?? new Response('', { status: 404 })));
      const manifest = await retainPreviousAssets({ assetsDir: dir, origin: 'https://example.test', download: true, now, log: () => {} });
      expect(fs.readFileSync(path.join(dir, 'index-old.js'), 'utf8')).toBe('old');
      expect(fs.existsSync(path.join(dir, 'module-gone.js'))).toBe(false);
      expect(manifest).toEqual({ version: 1, generatedAt: now, current: ['index-new.js'], retained: { 'index-old.js': now } });
      expect(JSON.parse(fs.readFileSync(path.join(dir, MANIFEST_NAME), 'utf8'))).toEqual(manifest);
    });

    it('stops downloading when the time budget is spent', async () => {
      dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retain-'));
      vi.stubGlobal('fetch', vi.fn(async (url: string) => (new URL(url).pathname.endsWith(MANIFEST_NAME)
        ? Response.json({ version: 1, current: ['index-old.js'], retained: {} })
        : new Response('old', { headers: { 'content-type': 'application/javascript' } }))));
      const manifest = await retainPreviousAssets({ assetsDir: dir, origin: 'https://example.test', download: true, now, log: () => {}, timeBudgetMs: -1 });
      expect(manifest.retained).toEqual({});
    });

    it('only writes the manifest outside production builds', async () => {
      dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retain-'));
      fs.writeFileSync(path.join(dir, 'index-new.js'), 'new');
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      const manifest = await retainPreviousAssets({ assetsDir: dir, origin: 'https://example.test', download: false, now, log: () => {} });
      expect(fetchMock).not.toHaveBeenCalled();
      expect(manifest.retained).toEqual({});
    });
  });
});
