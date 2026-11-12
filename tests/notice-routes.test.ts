import { afterEach, describe, expect, it, vi } from 'vitest';
import { isNoticePostedAfterBuild } from '../functions/_middleware';
import { INDEXABLE_AND_APP_PATHS } from '../functions/generated-routes';
import { loadAllNotices, noticeFromRow } from '../scripts/lib/notices.js';
import { toKstDate } from '../common-hub/utils/kstDate';

const env = { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'anon' };

describe('notice routes', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('publishes every DB notice from the snapshot as an edge route', () => {
    const notices = loadAllNotices(process.cwd());
    expect(notices.length).toBeGreaterThan(4);
    notices.forEach(notice => expect(INDEXABLE_AND_APP_PATHS.has(`/notices/${notice.id}`)).toBe(true));
  });

  it('maps a Supabase row to the app notice shape', () => {
    expect(noticeFromRow({ id: 'n1', category: 'Update', title: 't', content: '- a', created_at: '2026-11-12T09:00:00Z', game_id: 'ww' }))
      .toMatchObject({ id: 'n1', createdAt: '2026-11-12', gameId: 'ww' });
  });

  it('dates notices in Korea time, so one posted after midnight KST is not a day early', () => {
    expect(noticeFromRow({ id: 'n2', created_at: '2026-11-12T15:47:00+00:00' }).createdAt).toBe('2026-11-13');
    expect(toKstDate('2026-11-12T14:59:59Z')).toBe('2026-11-12');
    expect(toKstDate('')).toBe('');
  });

  it('lets a notice posted after the build through only when Supabase has it', async () => {
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => new Response(JSON.stringify([{ id: 'notice-new' }]), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(isNoticePostedAfterBuild('/notices/notice-new', env)).resolves.toBe(true);
    expect(String(fetchMock.mock.calls[0][0])).toContain('id=eq.notice-new');

    vi.stubGlobal('fetch', vi.fn(async () => new Response('[]', { status: 200 })));
    await expect(isNoticePostedAfterBuild('/notices/missing', env)).resolves.toBe(false);
  });

  it('never asks Supabase for other paths or without the Pages variables', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(isNoticePostedAfterBuild('/gallery/unknown', env)).resolves.toBe(false);
    await expect(isNoticePostedAfterBuild('/notices/notice-new', {})).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
