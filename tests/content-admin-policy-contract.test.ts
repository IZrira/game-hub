// Source regression only. Actual RLS verification is recorded separately.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const sql = readFileSync('supabase/migrations/20261016141014_restrict_content_writes_and_internal_function.sql', 'utf8');

describe('content administrator policy source contract', () => {
  it('limits policy replacement to the three content tables and never drops SELECT policies', () => {
    expect(sql).toContain("array['characters', 'notices', 'tier_lists']");
    expect(sql).toContain("cmd in ('ALL', 'INSERT', 'UPDATE', 'DELETE')");
    expect(sql).toContain("and cmd = 'SELECT'");
    expect(sql).toContain("and permissive <> 'PERMISSIVE'");
    expect(sql).not.toMatch(/(?:insert\s+into|update\s+public\.|delete\s+from|truncate\s+table|drop\s+table)/i);
  });
  it('uses the approved administrator identities or trusted app metadata, not user claims', () => {
    expect(sql).toContain('9ba8bfc5-f680-444d-8720-192f471610d3');
    expect(sql).toContain('48cfe362-20d7-4d13-b4bf-4400f6a2bba2');
    expect(sql).toContain("'app_metadata' ->> 'role'");
    expect(sql).not.toMatch(/user_metadata|->>\s*'email'/i);
    expect(sql.match(/to authenticated/g)).toHaveLength(3);
    expect(sql).toContain('using (%s) with check (%s)');
  });
  it('revokes only client function invocation while preserving existing service maintenance access', () => {
    expect(sql).toContain('revoke execute on function public.rls_auto_enable() from public, anon, authenticated');
    expect(sql).toContain("if has_function_privilege('service_role', 'public.rls_auto_enable()', 'EXECUTE') then");
    expect(sql).toContain('grant execute on function public.rls_auto_enable() to service_role');
    expect(sql).not.toMatch(/drop\s+(?:event\s+trigger|function)|grant\s+(?:all|select|insert|update|delete)/i);
  });
  it('requires RLS and the expected internal event function and uses bounded transactions', () => {
    expect(sql).toContain('c.relrowsecurity');
    expect(sql).toContain("p.prorettype = 'event_trigger'::regtype");
    expect(sql).toContain("pg_get_userbyid(p.proowner) = 'postgres'");
    expect(sql).toContain("set local lock_timeout = '2s'");
    expect(sql.trimEnd()).toMatch(/commit;$/);
  });
});
