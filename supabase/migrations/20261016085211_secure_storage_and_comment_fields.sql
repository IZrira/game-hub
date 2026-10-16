-- Review the deployment checklist before applying to an existing project.
begin;

drop policy if exists "Admin Media Insert" on storage.objects;
drop policy if exists "Admin Media Update" on storage.objects;
drop policy if exists "Admin Media Delete" on storage.objects;

create policy "Admin Media Insert" on storage.objects for insert to authenticated
with check (bucket_id = 'admin-media' and (
  coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
));
create policy "Admin Media Update" on storage.objects for update to authenticated
using (bucket_id = 'admin-media' and (
  coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
))
with check (bucket_id = 'admin-media' and (
  coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
));
create policy "Admin Media Delete" on storage.objects for delete to authenticated
using (bucket_id = 'admin-media' and (
  coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
));

-- Both historical permissive policies must be removed: they combine with OR.
drop policy if exists "Allow users to update own reviews" on public.character_reviews;
drop policy if exists "Author update own comments" on public.character_reviews;
create policy "Author update own comments" on public.character_reviews
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- RLS chooses rows; an invoker trigger protects columns without blocking
-- the existing editor or the SECURITY DEFINER count synchronization triggers.
create or replace function public.guard_review_client_fields()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  request_is_admin boolean := auth.uid() in (
    '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
    '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
  ) or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
begin
  -- Trusted maintenance/count functions execute as their database owner.
  -- Never use JWT role or trigger nesting depth as the bypass condition.
  if current_user not in ('anon', 'authenticated') then return new; end if;
  if tg_op = 'INSERT' then
    new.author_is_admin := coalesce(request_is_admin, false);
    new.is_pinned := false;
    new.like_count := 0;
    new.report_count := 0;
  else
    if row(new.id, new.user_id, new.game_id, new.character_id, new.parent_id,
           new.nickname, new.created_at, new.author_is_admin, new.like_count, new.report_count)
       is distinct from
       row(old.id, old.user_id, old.game_id, old.character_id, old.parent_id,
           old.nickname, old.created_at, old.author_is_admin, old.like_count, old.report_count) then
      raise exception 'Review identity and moderation counters are server managed' using errcode = '42501';
    end if;
    if new.is_pinned is distinct from old.is_pinned and not coalesce(request_is_admin, false) then
      raise exception 'Only administrators can pin reviews' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_review_client_fields() from public, anon, authenticated;
create trigger guard_review_client_fields before insert or update on public.character_reviews
for each row execute function public.guard_review_client_fields();

drop policy if exists "Allow public read access to comment_reports" on public.comment_reports;
create policy "Reporters and admins read reports" on public.comment_reports
for select to authenticated using (
  (select auth.uid()) = user_id
  or (select auth.uid()) in ('9ba8bfc5-f680-444d-8720-192f471610d3'::uuid, '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid)
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
);

-- Harden existing count functions, preserving their owner and trigger behavior.
create or replace function public.update_comment_report_count()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    update public.character_reviews set report_count = (
      select count(*) from public.comment_reports where comment_id = new.comment_id
    ) where id = new.comment_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.character_reviews set report_count = (
      select count(*) from public.comment_reports where comment_id = old.comment_id
    ) where id = old.comment_id;
    return old;
  end if;
  return null;
end;
$$;
create or replace function public.update_comment_upvote_count()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    update public.character_reviews set like_count = (
      select count(*) from public.comment_upvotes where comment_id = new.comment_id
    ) where id = new.comment_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.character_reviews set like_count = (
      select count(*) from public.comment_upvotes where comment_id = old.comment_id
    ) where id = old.comment_id;
    return old;
  end if;
  return null;
end;
$$;
revoke all on function public.update_comment_report_count() from public, anon, authenticated;
revoke all on function public.update_comment_upvote_count() from public, anon, authenticated;
commit;
