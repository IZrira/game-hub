## 2026-08-05T06:53:19Z
You are m3_implementer_1 for Milestone 3 (R3: DiscussionForumPosting Schema Integration for CharacterReviewBoard).
Working directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_implementer_1

MANDATORY CONTEXT FILE: Read c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md.
Also read reference reports:
- c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_explorer_1\handoff.md
- c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_explorer_2\handoff.md
- c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_explorer_3\handoff.md
- c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m3\SCOPE.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. `common-hub/components/CharacterReviewBoard.tsx`:
   - Import `CommentData` from `./SEO`.
   - Update `Props` interface so `onCommentsLoaded?: (comments: CommentData[]) => void;`.
   - Add `useEffect` watching `[reviews, onCommentsLoaded]` to automatically sync mapped `CommentData[]` whenever `reviews` state updates (fetch, create, edit, delete, upvote, pin, report).
   - Ensure mapping handles fallbacks: `author: r.nickname?.trim() || 'Anonymous'`, `date: r.created_at || new Date().toISOString()`, `content: r.comment_text || ''`, `upvotes: typeof r.upvotes_count === 'number' ? r.upvotes_count : (typeof r.like_count === 'number' ? r.like_count : 0)`, `rating: typeof r.rating === 'number' && !isNaN(r.rating) && r.rating >= 1 && r.rating <= 5 ? r.rating : 5`.
   - Fix inline `schemaData` field names in `CharacterReviewBoard.tsx` (lines 524-555) from `r.content` -> `r.comment_text` and `r.author_name` -> `r.nickname`.

2. `common-hub/components/SEO.tsx`:
   - Export update `CommentData` interface with `rating?: number;`.
   - Update `DiscussionForumPosting` schema builder inside `SEO.tsx` to include `reviewRating` (`Rating` schema with ratingValue, bestRating "5", worstRating "1") and `interactionStatistic` (`InteractionCounter` schema with LikeAction) for each comment, while retaining `upvoteCount: comment.upvotes || 0`.

3. `scripts/prerender-meta.js`:
   - Add `generateDiscussionForumPostingSchema(charName, routePath)` helper function containing baseline community reviews.
   - Update `injectMetaAndContent` and `createPrerenderedPage` signatures to accept optional `jsonLdSchema = null` parameter and inject `<script type="application/ld+json">` tag into `<head>`.
   - Pass `generateDiscussionForumPostingSchema(...)` into `createPrerenderedPage(...)` calls for WW, HSR, and NTE character detail pages in `runPrerender()`.

4. Verification:
   - Run `npx tsc --noEmit` and `npm run build` to verify zero build or compilation errors.
   - Verify static output files (e.g. `dist/gallery/hsr/character/acheron/index.html`) contain valid `DiscussionForumPosting` JSON-LD schema in `<head>`.

Write complete handoff report with verification logs to `c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_implementer_1\handoff.md` and report back when finished.
