-- Remove user-editable metadata and email-pattern checks from authorization.
-- Keep the two existing application administrators working via their signed auth.uid(),
-- while allowing future server-managed admins through app_metadata.role.

begin;

drop policy if exists "Admin delete comment_reports"
  on public.comment_reports;

create policy "Admin delete comment_reports"
  on public.comment_reports
  for delete
  to authenticated
  using (
    (select auth.uid()) in (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
    or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  );

drop policy if exists "Admin update and pin comments"
  on public.character_reviews;

create policy "Admin update and pin comments"
  on public.character_reviews
  for update
  to authenticated
  using (
    (select auth.uid()) in (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
    or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  )
  with check (
    (select auth.uid()) in (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
    or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  );

commit;
