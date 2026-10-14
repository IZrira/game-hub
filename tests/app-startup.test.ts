import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
const boot = vi.hoisted(() => ({ render: vi.fn(), createRoot: vi.fn(), language: vi.fn() }));
vi.mock('react-dom/client', () => ({ default: { createRoot: boot.createRoot } }));
vi.mock('../common-hub/App', () => ({ default: () => null }));
vi.mock('../common-hub/i18n', () => ({ getInitialLanguage: () => 'ko', loadLanguageResources: boot.language, consumeLegacyLanguageQuery: vi.fn() }));
beforeEach(() => {
  vi.resetModules();
  boot.render.mockReset();
  boot.createRoot.mockReset().mockReturnValue({ render: boot.render });
  boot.language.mockReset();
  document.body.innerHTML = '<div id="root"><div role="status">불러오는 중</div></div>';
  vi.spyOn(console, 'error').mockImplementation(() => {});
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
