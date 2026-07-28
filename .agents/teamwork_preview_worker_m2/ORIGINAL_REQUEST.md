## 2026-07-25T07:45:18Z
You are a Worker subagent (teamwork_preview_worker_m2).
Working Directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_worker_m2
Project Scope: c:\Users\User\Desktop\rira game hub\game-hub\PROJECT.md
Original Request: c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Mission:
Implement all detailed requirements (R1 - R5) for Rira Game Hub Advanced Community Comment System:

1. **R5: SQL Migration**:
   - Create `supabase/migrations/20260725030000_full_schema_and_moderation.sql`.
   - Add columns to `character_reviews`: `media_urls text[] DEFAULT '{}'`, `like_count integer DEFAULT 0`, `report_count integer DEFAULT 0`, `is_pinned boolean DEFAULT false`, `updated_at timestamptz DEFAULT now()`, `content text`.
   - Create `comment_reports` table (`id uuid DEFAULT gen_random_uuid() PRIMARY KEY`, `comment_id uuid REFERENCES character_reviews(id) ON DELETE CASCADE`, `user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE`, `created_at timestamptz DEFAULT now()`, `UNIQUE(comment_id, user_id)`).
   - Add RLS policies allowing public select, authenticated insert/report, author update/delete, and admin update for `is_pinned`.

2. **R2: Media & Form (Rich Text & Attachments)**:
   - Update `common-hub/components/CommentForm.tsx`:
     - Add lightweight markdown toolbar buttons: Bold (`**`), Italic (`*`), Blockquote (`>`), Spoiler (`||`), Image attachment toggle.
     - Add text selection helper to insert formatting around selected text in `<textarea>`.
     - Add media URL input array state + thumbnail previews + deletion buttons.
     - Update `onSubmit` signature to pass `(text: string, rating: number, mediaUrls?: string[])`.
   - Update `common-hub/components/MarkdownRenderer.tsx` and `common-hub/components/CommentCard.tsx`:
     - Parse bold, italic, blockquotes, clickable link previews, image attachments (`media_urls`), and spoiler tags (`||spoiler text||` with toggle reveal state).

3. **R1 & R3: Threads, Inline Editor, & Sorting**:
   - Update `common-hub/components/CommentCard.tsx`:
     - Update `Review` interface with `media_urls`, `like_count`, `report_count`, `is_pinned`, `user_has_reported`.
     - Thread visual lines, depth capping (`level <= 4`), and `@Nickname` handle for nested replies.
     - Inline editor & deletion restricted to author (`user.id === review.user_id`). Unauthenticated actions trigger `LoginModal`.
   - Update `common-hub/components/CharacterReviewBoard.tsx`:
     - Add sorting options UI: 'Newest' (최신순) and 'Best/Upvoted' (베스트/추천순).
     - Sort root comments elevating `is_pinned === true` first, then by upvotes/likes for Best mode or created_at for Newest mode.

4. **R4: Admin Pin & Report Auto-Hide**:
   - Admin Pin button (`is_pinned: boolean`) and "📌 고정된 댓글" badge.
   - Report button per comment with duplicate report prevention (`user_has_reported` tracking).
   - Auto-blind comment content if `report_count >= 3` with exact Korean message: "유저들의 신고로 숨김 처리된 댓글입니다".

5. **Build Verification**:
   - Run `npm run build` using run_command to verify TypeScript compilation passes with zero errors.
   - Document commands, build output, and write changes.md and handoff.md in your working directory.
   - Send completion message to parent.
