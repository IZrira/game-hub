// A page opened before a deploy still points at the previous deploy's chunks.
// When one of them can no longer be loaded, reload once to get the current
// HTML and chunk names instead of showing the error screen. A short guard
// window stops a reload loop when the failure is not caused by a deploy.

const STORAGE_KEY = 'rira_chunk_reload_at';
export const CHUNK_RELOAD_GUARD_MS = 60_000;

export function shouldReloadForChunkError(now: number, lastReloadAt: number | null): boolean {
  return lastReloadAt === null || !(now - lastReloadAt < CHUNK_RELOAD_GUARD_MS);
}

interface ChunkReloadTarget {
  addEventListener: (type: string, listener: (event: Event) => void) => void;
  location: { reload: () => void };
  sessionStorage: Pick<Storage, 'getItem' | 'setItem'>;
}

export function installChunkReloadHandler(target: ChunkReloadTarget = window): void {
  target.addEventListener('vite:preloadError', event => {
    const now = Date.now();
    try {
      const stored = Number(target.sessionStorage.getItem(STORAGE_KEY));
      if (!shouldReloadForChunkError(now, stored > 0 ? stored : null)) return;
      target.sessionStorage.setItem(STORAGE_KEY, String(now));
    } catch {
      // Without storage a reload could repeat forever; let the error boundary show.
      return;
    }
    event.preventDefault();
    target.location.reload();
  });
}
