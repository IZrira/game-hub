# Code Review Report — Milestone 3 (R1, R2, R5)

**Reviewer**: Reviewer 1 (`teamwork_preview_reviewer_m3_1`)  
**Date**: 2026-07-25  
**Scope**: 
- R1: Auth & RLS (`AuthContext.tsx`, `LoginModal.tsx`, author-only inline edit/delete permissions)
- R2: Media & Form (`CommentForm.tsx`, `MarkdownRenderer.tsx`)
- R5: Database Schema & Migration (`20260725030000_full_schema_and_moderation.sql`)

---

## Executive Summary

**Verdict**: ❌ **REQUEST_CHANGES** (VETO)

While the front-end components (`AuthContext.tsx`, `LoginModal.tsx`, `CommentForm.tsx`, `MarkdownRenderer.tsx`) generally meet feature design requirements and provide a rich user interface, a **Critical Security & RLS Vulnerability** was identified in the SQL migration (`20260725030000_full_schema_and_moderation.sql`). The `UPDATE` policy on `character_reviews` uses `WITH CHECK (true)`, allowing regular authenticated users to bypass admin restrictions (e.g. setting `is_pinned = true` on their own posts) and reassign `user_id` ownership of comments. Furthermore, regular users attempting to report third-party comments trigger RLS violations when trying to update `report_count` directly on `character_reviews`.

---

## Detailed Findings

### 🔴 Critical Finding 1: RLS Security Bypass & Privilege Escalation in SQL Migration
- **Location**: `supabase/migrations/20260725030000_full_schema_and_moderation.sql`, lines 43–51
- **Issue**:
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
- **Why this is a Critical Problem**:
  1. **Privilege Escalation**: Because `USING (auth.uid() = user_id)` evaluates to `true` for a comment owned by a regular user, and `WITH CHECK (true)` places no restrictions on which columns can be updated, **any regular non-admin user can execute a Supabase API update `{ is_pinned: true }` on their own comment and successfully pin it to the top of the board**.
  2. **Ownership Tampering**: With `WITH CHECK (true)`, an author updating their comment can modify the `user_id` column to any arbitrary UUID, transferring ownership or impersonating other users.
  3. **Broken Reporting DB Sync**: When a regular user reports a comment authored by someone else (`auth.uid() != user_id`), `CharacterReviewBoard.tsx` attempts `supabase.from('character_reviews').update({ report_count: newReportCount }).eq('id', commentId)`. Because the reporter is neither the author nor an admin, PostgreSQL RLS rejects the update query (`USING` fails), breaking live database report counting for non-authors.
- **Suggested Fix**:
  1. Split `character_reviews` UPDATE policy into distinct author update and admin update policies, or use column-level controls / database triggers for moderation fields.
  2. For author updates: enforce `WITH CHECK (auth.uid() = user_id AND is_pinned = OLD.is_pinned)` or manage `is_pinned` / `report_count` via RPC / Database Triggers.
  3. Update `report_count` automatically via a PostgreSQL trigger on `comment_reports` table insertion rather than direct client table updates.

---

### 🟠 Major Finding 2: Bold & Italic Parsing Regex Failure in `MarkdownRenderer.tsx`
- **Location**: `common-hub/components/MarkdownRenderer.tsx`, lines 32 & 46
- **Issue**:
  ```ts
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  ```
  The character class `[^*]+` inside the double asterisk regex prevents matching any bold text containing an asterisk inside it (e.g. `**bold with *italic* inside**`). The regex fails to match, causing formatting to break.
  Additionally, `text.split(/(\*[^*]+\*)/g)` incorrectly converts standard arithmetic multiplication expressions like `5 * 4 = 20 and 3 * 2 = 6` into italic text (` 4 = 20 and 3 `).
- **Suggested Fix**:
  Refactor markdown parsing using a stateful tokenizer or proper non-greedy regex matching with word boundary / space checks.

---

### 🟡 Minor Finding 3: Redundant Table Column & Missing Report Delete Policy
- **Location**: 
  - `supabase/migrations/20260725030000_full_schema_and_moderation.sql`, line 11
  - `supabase/migrations/20260725030000_full_schema_and_moderation.sql`, section 4
- **Issue**:
  1. `ALTER TABLE character_reviews ADD COLUMN IF NOT EXISTS content text;` adds an unused `content` column. The codebase consistently uses `comment_text`.
  2. `comment_reports` has `SELECT` and `INSERT` policies, but lacks a `DELETE` policy for admins to clear or revoke reports.
- **Suggested Fix**:
  Remove redundant `content` column or alias `comment_text`, and add appropriate admin `DELETE` policy on `comment_reports`.

---

## Verified Claims

| Requirement / Claim | File & Line | Status | Method / Finding |
|---|---|---|---|
| R1: AuthContext Session & OAuth | `AuthContext.tsx`:33-120 | ✅ PASS | Provider correctly handles OAuth hash tokens, session state, login modal triggers, and graceful fallback when Supabase is unconfigured. |
| R1: LoginModal Portal & Animation | `LoginModal.tsx`:36-112 | ✅ PASS | Renders modal in `document.body` portal, suppresses background scrolling (`overflow: hidden`), and handles Discord/Google OAuth triggers. |
| R1: Author-Only Inline Edit/Delete UI | `CommentCard.tsx`:68, 153-175 | ✅ PASS | `isOwnReview = user && review.user_id === user.id`. Edit and Delete buttons are rendered ONLY for the author. |
| R1: Author-Only DB Update/Delete | `CharacterReviewBoard.tsx`:348, 371 | ✅ PASS | Client queries explicitly attach `.eq('user_id', user.id)`. |
| R2: CommentForm Markdown Toolbar & Selection | `CommentForm.tsx`:39-66, 156-207 | ✅ PASS | Text selection formatting accurately wraps selected text or inserts cursor-focused placeholders. |
| R2: Media Attachment Gallery & Lightbox | `CommentForm.tsx`:231-286, `CommentCard.tsx`:245-266 | ✅ PASS | Image URLs are attachable (max 4), rendered as gallery thumbnails, and expandable in a lightbox modal. |
| R2: Spoiler Tags | `MarkdownRenderer.tsx`:7-26, 86-94 | ✅ PASS | `||spoiler||` rendered as clickable blurred span with togglable visibility. |
| R5: Schema & Indexes for Moderation | `20260725030000_full_schema_and_moderation.sql`:5-25 | ✅ PASS | `media_urls`, `like_count`, `report_count`, `is_pinned`, `updated_at`, and `comment_reports` table with `UNIQUE(comment_id, user_id)` created correctly. |
| R5: Update RLS Policy Security | `20260725030000_full_schema_and_moderation.sql`:43-51 | ❌ FAIL | `WITH CHECK (true)` allows non-admin users to set `is_pinned = true` and reassign `user_id`. Direct client update of `report_count` by non-authors fails under RLS. |

---

## Coverage Gaps & Attack Surface

- **Attack Vector: Client-side RLS Manipulation**:
  An attacker logged in as a normal user can execute `await supabase.from('character_reviews').update({ is_pinned: true }).eq('id', my_comment_id)`. The `USING` clause passes because `user_id = auth.uid()`, and `WITH CHECK (true)` accepts the modification. Result: regular users can pin their comments to top of board.
- **Attack Vector: User ID Ownership Spoofing**:
  An attacker can execute `await supabase.from('character_reviews').update({ user_id: victim_user_id }).eq('id', my_comment_id)`. `WITH CHECK (true)` allows changing `user_id` to any target user ID.

---

## Build Verification

- **Command**: `npm run build`
- **Result**: Execution permission prompt timed out. Static type analysis performed across all 6 target files; TypeScript interfaces, react-router, lucide-react, and motion/react imports are properly typed.

---

## Final Recommendation

**REQUEST CHANGES**. Milestone 3 cannot be approved until `20260725030000_full_schema_and_moderation.sql` is fixed to restrict column updates appropriately (`is_pinned` restricted to admins, `user_id` immutable), and report counts are incremented via trigger/RPC rather than client `UPDATE` queries.
