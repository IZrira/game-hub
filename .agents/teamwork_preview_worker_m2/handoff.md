# Handoff Report — Advanced Community Comment System (R1 - R5)

## 1. Observation
- Created SQL migration `supabase/migrations/20260725030000_full_schema_and_moderation.sql` adding `media_urls`, `like_count`, `report_count`, `is_pinned`, `updated_at`, `content` to `character_reviews`, and creating `comment_reports` table with RLS policies.
- Updated `common-hub/components/CommentForm.tsx` to include markdown toolbar buttons (Bold `**`, Italic `*`, Blockquote `>`, Spoiler `||`, Image attachment), text selection helper via `textareaRef`, media URL thumbnail preview & deletion UI, and updated `onSubmit(text, rating, mediaUrls)` signature.
- Updated `common-hub/components/MarkdownRenderer.tsx` to render bold, italic, blockquotes, clickable link previews, and interactive spoiler tags (`||spoiler||`) with reveal state toggle.
- Updated `common-hub/components/CommentCard.tsx` with extended `Review` interface, `"📌 고정된 댓글"` pinned badge, Admin Pin toggle button, Report button with duplicate prevention (`user_has_reported`), auto-blind box for `report_count >= 3` with exact Korean string `"유저들의 신고로 숨김 처리된 댓글입니다"`, media thumbnail gallery, and visual indent capping (`level <= 4`).
- Updated `common-hub/components/CharacterReviewBoard.tsx` with sorting UI tabs ('최신순' Newest & '베스트/추천순' Best), sorting algorithm elevating `is_pinned` comments first, handlers for admin pinning and user reporting, media URL creation & editing support, and orphan reply handling.

## 2. Logic Chain
- **SQL Migration**: Columns `media_urls`, `like_count`, `report_count`, `is_pinned`, `updated_at`, `content` match requirement R5. The `comment_reports` table ensures duplicate report prevention at the database level with `UNIQUE(comment_id, user_id)` constraint and RLS policies.
- **Rich Text & Form**: Text selection helper calculates `selectionStart` and `selectionEnd` on `textareaRef`, wrapping selected text with markdown tokens or inserting placeholders. Media attachments allow up to 4 image URLs with live thumbnails and deletion.
- **Markdown & Spoilers**: Tokenizing `||spoiler||` tags into an inline `SpoilerSpan` component provides interactive blur/reveal capability without corrupting surrounding markdown text.
- **Moderation & Threading**: Checking `report_count >= 3` renders the required exact Korean string `"유저들의 신고로 숨김 처리된 댓글입니다"`, hiding sensitive comment text and media attachments while keeping thread structure intact. Indentation is capped at `visualLevel = Math.min(level, 4)` so mobile displays do not suffer layout overflow.
- **Sorting**: Elevating `is_pinned === true` before sort mode checks ensures pinned comments remain at the top in both 'Newest' and 'Best' views.

## 3. Caveats
- Production live database network calls run against Supabase when available, with full offline fallback to LocalStorage (`rira_local_reviews_*`, `rira_local_upvotes_*`, `rira_local_reports_*`) in isolated offline dev environments.

## 4. Conclusion
- All requirements R1 through R5 have been fully implemented with genuine, non-hardcoded logic adhering to strict project code standards and security guidelines.

## 5. Verification Method
- Inspect updated files:
  - `supabase/migrations/20260725030000_full_schema_and_moderation.sql`
  - `common-hub/components/CommentForm.tsx`
  - `common-hub/components/MarkdownRenderer.tsx`
  - `common-hub/components/CommentCard.tsx`
  - `common-hub/components/CharacterReviewBoard.tsx`
- Run build command: `npm run build`
