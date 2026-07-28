# Summary of Changes

## 1. Database Migration (`supabase/migrations/20260725030000_full_schema_and_moderation.sql`)
- Created migration adding columns to `character_reviews`: `media_urls text[] DEFAULT '{}'`, `like_count integer DEFAULT 0`, `report_count integer DEFAULT 0`, `is_pinned boolean DEFAULT false`, `updated_at timestamptz DEFAULT now()`, `content text`.
- Created `comment_reports` table with `id`, `comment_id`, `user_id`, `created_at` and `UNIQUE(comment_id, user_id)` constraint.
- Configured RLS policies for public select, authenticated insert/reporting, author update/delete, and admin update for `is_pinned`.

## 2. Rich Text & Media Form (`common-hub/components/CommentForm.tsx`)
- Added lightweight markdown toolbar buttons: Bold (`**`), Italic (`*`), Blockquote (`>`), Spoiler (`||`), Image attachment toggle.
- Added text selection helper to insert formatting around selected text in `<textarea>` ref.
- Added media URL array input state, thumbnail preview gallery, and deletion buttons.
- Updated `onSubmit` signature to pass `(text: string, rating: number, mediaUrls?: string[])`.

## 3. Markdown Parser & Spoilers (`common-hub/components/MarkdownRenderer.tsx`)
- Parsed bold (`**bold**`), italic (`*italic*`), blockquotes (`> quote`), clickable HTTP/HTTPS link previews (`<a target="_blank">`).
- Added interactive spoiler tags (`||spoiler text||`) with click-to-reveal toggle state (`<SpoilerSpan>`).

## 4. Comment Threading & Moderation Cards (`common-hub/components/CommentCard.tsx`)
- Updated `Review` interface with `media_urls`, `like_count`, `report_count`, `is_pinned`, `user_has_reported`.
- Added `"📌 고정된 댓글"` pinned badge and Admin Pin toggle button.
- Added Report button with duplicate report tracking (`user_has_reported`).
- Implemented auto-blind warning card if `report_count >= 3` with exact Korean string: `"유저들의 신고로 숨김 처리된 댓글입니다"`.
- Added image thumbnail gallery preview with full-size lightbox modal on click.
- Capped visual thread indentation at depth `level <= 4` and included `@Nickname` handles in reply placeholders.

## 5. Comment Board Sorting & State Sync (`common-hub/components/CharacterReviewBoard.tsx`)
- Added sorting options UI: 'Newest' (최신순) and 'Best/Upvoted' (베스트/추천순).
- Implemented sorting logic elevating `is_pinned === true` comments first, followed by upvotes/likes count for Best mode or `created_at` timestamp for Newest mode.
- Added handlers for `handleTogglePin`, `handleReport`, and media URL creation/editing.
- Fixed orphan reply handling so replies with missing/deleted parent IDs remain visible.
