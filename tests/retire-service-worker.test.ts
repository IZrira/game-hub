import { afterEach, expect, it, vi } from 'vitest';
import { retireServiceWorker } from '../common-hub/utils/retireServiceWorker';
afterEach(() => vi.unstubAllGlobals());
it('retires only the root worker without registering a new worker', async () => {
  const unregister = vi.fn().mockResolvedValue(true);
  const otherUnregister = vi.fn();
  const register = vi.fn();
  vi.stubGlobal('navigator', { serviceWorker: { register, getRegistrations: vi.fn().mockResolvedValue([
    { scope: new URL('/', window.location.origin).href, unregister },
    { scope: new URL('/other-app/', window.location.origin).href, unregister: otherUnregister },
  ]) } });
  await retireServiceWorker();
  expect(unregister).toHaveBeenCalledOnce();
  expect(otherUnregister).not.toHaveBeenCalled();
  expect(register).not.toHaveBeenCalled();
});
it('supports browsers without service workers', async () => {
  vi.stubGlobal('navigator', {});
  await expect(retireServiceWorker()).resolves.toBeUndefined();
});
