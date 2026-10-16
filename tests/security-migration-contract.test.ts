// These source regression contracts do not execute SQL or prove operational RLS.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const sql = readFileSync('supabase/migrations/20261016085211_secure_storage_and_comment_fields.sql', 'utf8');
describe('pending security migration source contracts (not live DB verification)', () => {
  it('restricts Storage to server-managed metadata without adding grants or changing API exposure', () => {
    const storage = sql.slice(sql.indexOf('create policy "Admin Media Insert"'), sql.indexOf('-- Both historical'));
    expect(storage).toContain("'app_metadata'");
    expect(storage).not.toMatch(/user_metadata|email|auth\.uid\(\)/i);
    expect(sql).not.toMatch(/\bgrant\b|alter\s+default\s+privileges/i);
  });
  it('removes both permissive owner policies and guards moderation columns as invoker', () => {
    expect(sql).toContain('drop policy if exists "Allow users to update own reviews"');
    expect(sql).toContain('drop policy if exists "Author update own comments"');
    expect(sql).toMatch(/guard_review_client_fields\(\)[\s\S]*?security invoker set search_path = ''/);
    for (const column of ['author_is_admin', 'is_pinned', 'like_count', 'report_count']) expect(sql).toContain(`new.${column}`);
    expect(sql).not.toMatch(/pg_trigger_depth|user_metadata/);
  });
  it('preserves server count functions with a fixed search path and private report relation policy', () => {
    expect(sql).toContain('create policy "Reporters and admins read reports"');
    for (const name of ['update_comment_report_count', 'update_comment_upvote_count']) {
      expect(sql).toContain(`function public.${name}()`);
      expect(sql).toContain(`revoke all on function public.${name}() from public, anon, authenticated`);
    }
    expect(sql.match(/security definer set search_path = ''/g)).toHaveLength(2);
    expect(sql).toMatch(/^--[^\n]*\nbegin;/);
    expect(sql.trimEnd()).toMatch(/commit;$/);
  });
});
