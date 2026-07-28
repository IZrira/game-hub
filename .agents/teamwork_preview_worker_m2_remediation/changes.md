# Changes Summary - M2 Remediation

## Modified Files

1. `supabase/migrations/20260725030000_full_schema_and_moderation.sql`
   - **Changes**:
     - Removed insecure `WITH CHECK (true)` update policy.
     - Created separate update policies for authors (`Author update own comments`) and admins (`Admin update and pin comments`).
     - Added PostgreSQL trigger function `update_comment_report_count` with `SECURITY DEFINER` and trigger `trg_sync_comment_report_count` on `comment_reports`.
     - Added PostgreSQL trigger function `update_comment_upvote_count` with `SECURITY DEFINER` and trigger `trg_sync_comment_upvote_count` on `comment_upvotes`.
     - Added admin `DELETE` RLS policy `Admin delete comment_reports` on `comment_reports`.
     - Removed redundant `content` column addition from `character_reviews` ALTER TABLE statement.
   - **Rationale**:
     - Prevent unauthorized non-authors from modifying arbitrary columns on `character_reviews` table.
     - Ensure count columns (`report_count`, `like_count`) are securely synchronized by DB triggers executing with elevated privileges (`SECURITY DEFINER`).

2. `common-hub/components/CharacterReviewBoard.tsx`
   - **Changes**:
     - Removed direct `.update({ report_count: ... })` call on `character_reviews` in `handleReport`.
     - Kept insertion into `comment_reports` table and local state/storage tracking.
   - **Rationale**:
     - Non-author users attempting to update `character_reviews` directly were failing RLS policy checks. Relying on the DB trigger `trg_sync_comment_report_count` automatically updates `report_count` upon insertion to `comment_reports`.

3. `common-hub/components/MarkdownRenderer.tsx`
   - **Changes**:
     - Replaced greedy/character class `[^*]+` regexes with non-greedy regex `\*\*([\s\S]+?)\*\*` for bold, `\*([^\*\s][\s\S]*?[^\*\s]|\S)\*` for italic, `\|\|([\s\S]+?)\|\|` for spoilers, and `> (.*)` for blockquote matching.
   - **Rationale**:
     - Fixes parsing breakage when handling nested markdown constructs such as `**bold *italic* text**`.
