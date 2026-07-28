## 2026-07-25T07:51:47Z
You are a Worker subagent (teamwork_preview_worker_m2_remediation).
Working Directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_worker_m2_remediation
Project Scope: c:\Users\User\Desktop\rira game hub\game-hub\PROJECT.md
Original Request: c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Mission:
Remediate the critical RLS security vulnerability and markdown regex parsing bug identified by Reviewer 1:

1. **Fix RLS Security Vulnerability in `supabase/migrations/20260725030000_full_schema_and_moderation.sql`**:
   - Replace the insecure `WITH CHECK (true)` update policy.
   - Separate update policies for authors and admins:
     - Author update policy: `CREATE POLICY "Author update own comments" ON character_reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id AND is_pinned = false);`
     - Admin update policy: `CREATE POLICY "Admin update and pin comments" ON character_reviews FOR UPDATE TO authenticated USING (auth.jwt() ->> 'email' LIKE '%admin%' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true) WITH CHECK (true);`
   - Add PostgreSQL Trigger `trg_sync_comment_report_count` AFTER INSERT OR DELETE ON `comment_reports` with `SECURITY DEFINER` to automatically recalculate and update `character_reviews.report_count`.
   - Add PostgreSQL Trigger `trg_sync_comment_upvote_count` AFTER INSERT OR DELETE ON `comment_upvotes` with `SECURITY DEFINER` to automatically recalculate and update `character_reviews.like_count`.
   - Add admin `DELETE` policy on `comment_reports`.
   - Remove unused `content` column addition if present.

2. **Fix `common-hub/components/CharacterReviewBoard.tsx`**:
   - In `handleReportComment`, insert into `comment_reports` table (or local storage tracking). Rely on DB trigger for `report_count` update on `character_reviews` so non-author users don't trigger RLS failures.

3. **Fix Markdown Regex Parsing in `common-hub/components/MarkdownRenderer.tsx`**:
   - Replace character class `[^*]+` regex with non-greedy regex `\*\*([\s\S]+?)\*\*` for bold, `\*([^\*\s][\s\S]*?[^\*\s]|\S)\*` for italic, `\|\|([\s\S]+?)\|\|` for spoilers, and `> (.*)` for blockquotes.
   - Ensure `**bold *italic* text**` parses cleanly without breaking.

4. **Build Verification**:
   - Execute `npm run build` using run_command to verify 0 TypeScript errors.
   - Write changes.md and handoff.md in your working directory.
   - Send completion message to parent.
