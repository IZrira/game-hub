# Handoff Report — Milestone 3 Review (R1, R2, R5)

## 1. Observation
- `supabase/migrations/20260725030000_full_schema_and_moderation.sql` line 44–51 defines:
  ```sql
  CREATE POLICY "Allow users to update own reviews or admin pin"
    ON character_reviews FOR UPDATE
    TO authenticated
    USING (
      auth.uid() = user_id 
      OR (auth.jwt() ->> 'email' LIKE '%admin%' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    )
    WITH CHECK (true);
  ```
- `common-hub/components/CharacterReviewBoard.tsx` line 438–441 attempts:
  ```ts
  await supabase
    .from('character_reviews')
    .update({ report_count: newReportCount })
    .eq('id', commentId);
  ```
  when a non-author user clicks report on a comment.
- `common-hub/components/MarkdownRenderer.tsx` line 46 uses `text.split(/(\*\*[^*]+\*\*)/g)` to parse bold text.
- `common-hub/components/CommentCard.tsx` line 68 & line 153 properly restricts inline edit and delete button rendering to `isOwnReview` (`auth.uid() === user_id`).
- `common-hub/context/AuthContext.tsx` and `common-hub/components/LoginModal.tsx` implement OAuth session management and Google/Discord modal triggers.

## 2. Logic Chain
1. In `20260725030000_full_schema_and_moderation.sql`, the RLS UPDATE policy uses `USING (auth.uid() = user_id OR admin)` with `WITH CHECK (true)`.
2. `USING` determines which existing rows an authenticated user can select for update. For comments owned by the current user (`auth.uid() = user_id`), `USING` evaluates to `true`.
3. `WITH CHECK` determines what column values the modified row may take. Because `WITH CHECK (true)` is used, PostgreSQL performs NO validation on column changes during UPDATE.
4. Therefore, any authenticated regular user can execute `.update({ is_pinned: true })` on their own comment, which passes `USING` (since `user_id = auth.uid()`) and passes `WITH CHECK (true)`. This allows regular users to pin their own comments, bypassing admin restrictions.
5. Similarly, an author can execute `.update({ user_id: other_user_id })` to reassign ownership of a post, creating an impersonation/integrity flaw.
6. When a non-author user reports a comment, `CharacterReviewBoard.tsx` tries to execute `.update({ report_count: newReportCount })` on `character_reviews`. Because the reporter's ID does not match `user_id` of the comment and the reporter is not an admin, PostgreSQL RLS rejects the update, causing DB report sync to fail.
7. In `MarkdownRenderer.tsx`, `[^*]+` inside `\*\*[^*]+\*\*` rejects any string containing an asterisk inside bold text, breaking nested formatting (`**text *italic* text**`).

## 3. Caveats
- Build command execution (`npm run build`) timed out waiting for user approval in terminal. Full static type checking and code inspection was conducted across all scope files.
- Local offline mode (`isOfflineMode = true` in `CharacterReviewBoard.tsx`) masks RLS failure during local testing because errors caught from Supabase fallback to `localStorage`.

## 4. Conclusion
The codebase achieves the UI requirements for R1 (Auth & author-only permissions UI), R2 (Rich text, media attachment, spoiler tags), and schema definitions for R5. However, due to a **Critical Security & RLS Vulnerability** in `20260725030000_full_schema_and_moderation.sql` that allows non-admin users to elevate privileges (pin own comments) and modify comment ownership (`user_id`), the verdict is **REQUEST_CHANGES** (VETO).

## 5. Verification Method
1. Inspect RLS update policy in `supabase/migrations/20260725030000_full_schema_and_moderation.sql`:
   - Verify `WITH CHECK (true)` is used.
   - In Supabase SQL Editor / CLI, attempt updating `is_pinned = true` as a non-admin user on a comment where `user_id = auth.uid()`. Observe update succeeds.
2. Log in as regular user A and report comment written by user B:
   - Observe Supabase client throws RLS permission error on `character_reviews` table update.
3. Render markdown string `**Hello *world* test**` in `MarkdownRenderer.tsx`:
   - Observe string fails bold rendering due to `[^*]+` regex restriction.
