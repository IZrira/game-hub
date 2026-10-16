-- Preserve public reads; replace every permissive write/ALL policy on these
-- content tables so an old OR policy cannot bypass administrator checks.
begin;
set local lock_timeout = '2s';
set local statement_timeout = '15s';

do $migration$
declare
  relation_name text;
  existing_policy record;
  admin_predicate constant text := $predicate$(
    (select auth.uid()) in (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    ) or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  )$predicate$;
begin
  foreach relation_name in array array['characters', 'notices', 'tier_lists'] loop
    if not exists (
      select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = relation_name and c.relrowsecurity
    ) or not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = relation_name and cmd = 'SELECT'
    ) then
      raise exception 'Expected RLS and a separate read policy on public.%', relation_name;
    end if;

    if exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = relation_name
        and cmd in ('ALL', 'INSERT', 'UPDATE', 'DELETE')
        and permissive <> 'PERMISSIVE'
    ) then
      raise exception 'Unexpected restrictive write policy on public.%', relation_name;
    end if;

    for existing_policy in
      select policyname from pg_policies
      where schemaname = 'public' and tablename = relation_name
        and cmd in ('ALL', 'INSERT', 'UPDATE', 'DELETE')
    loop
      execute format('drop policy %I on public.%I', existing_policy.policyname, relation_name);
    end loop;

    execute format('create policy "Rira admin insert" on public.%I for insert to authenticated with check (%s)', relation_name, admin_predicate);
    execute format('create policy "Rira admin update" on public.%I for update to authenticated using (%s) with check (%s)', relation_name, admin_predicate, admin_predicate);
    execute format('create policy "Rira admin delete" on public.%I for delete to authenticated using (%s)', relation_name, admin_predicate);
  end loop;

  if not exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'rls_auto_enable'
      and p.pronargs = 0 and p.prorettype = 'event_trigger'::regtype
      and pg_get_userbyid(p.proowner) = 'postgres'
  ) then
    raise exception 'Expected the existing postgres-owned RLS event-trigger function';
  end if;

  -- Preserve an already-effective trusted maintenance privilege before
  -- removing PUBLIC inheritance. Do not grant it if it was absent.
  if has_function_privilege('service_role', 'public.rls_auto_enable()', 'EXECUTE') then
    grant execute on function public.rls_auto_enable() to service_role;
  end if;
end;
$migration$;

revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
-- Keep the function definition, owner, search_path and event-trigger binding.
commit;
