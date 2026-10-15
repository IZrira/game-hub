import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
const boot = vi.hoisted(() => ({ render: vi.fn(), createRoot: vi.fn(), language: vi.fn(), home: vi.fn() }));
vi.mock('../common-hub/pages/homeRuntime', () => ({ preloadHome: boot.home }));
vi.mock('react-dom/client', () => ({ default: { createRoot: boot.createRoot } }));
vi.mock('../common-hub/App', () => ({ default: () => null }));
vi.mock('../common-hub/i18n', () => ({ getInitialLanguage: () => 'ko', loadLanguageResources: boot.language, consumeLegacyLanguageQuery: vi.fn() }));
beforeEach(() => {
  vi.resetModules();
  boot.render.mockReset();
  boot.createRoot.mockReset().mockReturnValue({ render: boot.render });
  boot.language.mockReset();
  boot.home.mockReset().mockResolvedValue(undefined);
  window.history.replaceState(null, '', '/');
  document.body.innerHTML = '<div id="root"><div role="status">불러오는 중</div></div>';
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
it('keeps initial HTML until the home chunk is ready', async () => {
  let finish!: () => void;
  boot.language.mockResolvedValue(undefined);
  boot.home.mockReturnValue(new Promise<void>(resolve => { finish = resolve; }));
  await import('../common-hub/index');
  expect(boot.render).not.toHaveBeenCalled();
  expect(document.querySelector('[role="status"]')).not.toBeNull();
  finish();
  await waitFor(() => expect(boot.render).toHaveBeenCalledOnce());
});
it('does not preload home on a direct detail entry', async () => {
  window.history.replaceState(null, '', '/gallery/ww');
  boot.language.mockResolvedValue(undefined);
  await import('../common-hub/index');
  await waitFor(() => expect(boot.render).toHaveBeenCalledOnce());
  expect(boot.home).not.toHaveBeenCalled();
});
it('offers retry when the initial home chunk fails', async () => {
  boot.language.mockResolvedValue(undefined);
  boot.home.mockRejectedValue(new Error('chunk failure'));
  await import('../common-hub/index');
  await waitFor(() => expect(document.querySelector('button')?.textContent).toBe('다시 불러오기'));
  expect(boot.render).not.toHaveBeenCalled();
});
afterEach(() => { vi.restoreAllMocks(); document.body.innerHTML = ''; });
it('mounts the application even when initial translations fail to load', async () => {
  boot.language.mockRejectedValue(new Error('network failure'));
  await import('../common-hub/index');
  await waitFor(() => expect(boot.render).toHaveBeenCalledOnce());
  expect(boot.language).toHaveBeenCalledWith('ko', null);
});
it('replaces the boot spinner with a retry action when startup fails', async () => {
  boot.language.mockResolvedValue(undefined);
  boot.createRoot.mockImplementation(() => { throw new Error('startup failure'); });
  await import('../common-hub/index');
  await waitFor(() => expect(document.querySelector('button')?.textContent).toBe('다시 불러오기'));
  expect(document.querySelector('[role="status"]')).toBeNull();
});
