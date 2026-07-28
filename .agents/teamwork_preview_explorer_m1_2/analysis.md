# Technical Analysis: Requirements R2 (Media & Form) & R3 (Threads & Sorting)

## Executive Summary
This report presents a comprehensive codebase analysis of `common-hub/components/CommentForm.tsx`, `CommentCard.tsx`, `CharacterReviewBoard.tsx`, `MarkdownRenderer.tsx`, and associated data types to evaluate readiness and identify implementation gaps for:
- **Requirement R2 (Media & Form)**: Lightweight rich text/markdown editor toolbar (bold, italic, blockquote, spoiler tags), media attachments (image URLs/uploads), and link previews.
- **Requirement R3 (Threads & Sorting)**: Reddit-style multi-depth nested reply UI with visual connecting lines, and comment sorting options ('Newest' / 최신순 and 'Best/Upvoted' / 베스트/추천순).

---

## 1. Requirement R2: Media & Form (미디어 및 리치 텍스트 지원)

### 1.1 Existing Implementation Inspection
- **`CommentForm.tsx`**:
  - Implements basic user identity preview, rating selection (1-5 stars), single standard `<textarea>` (maxLength 500), character counter, and submit button.
  - **Deficit**: Has no toolbar UI, formatting buttons, selection helper, media URL input, or preview section.
- **`CommentCard.tsx`**:
  - Renders comment text inside plain `<p className="text-gray-300 whitespace-pre-wrap">{review.comment_text}</p>`.
  - **Deficit**: Does not render markdown, spoiler tags, media image attachments, or link preview cards.
- **`MarkdownRenderer.tsx`**:
  - Supports basic `**bold**`, headers (`#`, `##`, `###`), and bullet lists (`- `, `* `).
  - **Deficit**: Missing support for *italic*, blockquotes (`>`), spoiler tags (`||spoiler||`), embedded image media, or clickable external links.
- **Data Model (`Review` interface in `CommentCard.tsx`)**:
  - Currently lacks `media_urls?: string[]` parameter.

### 1.2 Detailed Implementation Gaps for R2

| Feature | Current State | Missing Requirements / Modifications Needed |
|---|---|---|
| **Editor Toolbar** | None | Add toolbar in `CommentForm.tsx` with icons for Bold (`**`), Italic (`*`), Quote (`>`), Spoiler (`||`), Image attachment (`Image`), and Link (`Link`). |
| **Selection Helper** | None | Attach `useRef<HTMLTextAreaElement>` to track selection range (`selectionStart`, `selectionEnd`) and insert/wrap markdown syntax around text. |
| **Media Attachments** | None | Add `mediaUrls: string[]` state in `CommentForm.tsx` with input field and preview list (with remove button). Update `onSubmit` signature to include `mediaUrls`. |
| **Media Rendering** | None | Render grid/gallery of image attachments in `CommentCard.tsx` from `review.media_urls` with image click-to-expand preview modal. |
| **Link Previews** | Raw text only | Parse URLs in comment text using regex and render styled link preview cards with domain icon & clickable anchor. |
| **Spoiler Tags** | None | Implement `||spoiler text||` parsing in `MarkdownRenderer.tsx` / `CommentCard.tsx` with blur styling and toggle state (`isRevealed`). |

---

## 2. Requirement R3: Threads & Sorting (계층형 댓글 및 정렬)

### 2.1 Existing Implementation Inspection
- **`CommentCard.tsx`**:
  - Supports nested reply rendering via `level` prop (`level > 0 ? 'ml-4 md:ml-8 pl-3 md:pl-5 border-l-2 border-brand-primary/20' : ''`).
  - Features an inline reply form trigger (`isReplying`) and expand/collapse toggle for child replies (`isThreadExpanded`).
  - **Deficit**: Visual connecting line is a simple static border; nesting depth is uncapped (can cause narrow layout on mobile); parent target nickname is not indicated in replies.
- **`CharacterReviewBoard.tsx`**:
  - Builds tree structure using `rootReviews` (`!parent_id`) and `repliesMap` (`parent_id -> Review[]`).
  - Fetches comments ordered by `created_at` descending.
  - **Deficit**: Has **no UI dropdown or sorting toggle buttons**, and root comments are fixed to chronological order only.

### 2.2 Detailed Implementation Gaps for R3

| Feature | Current State | Missing Requirements / Modifications Needed |
|---|---|---|
| **Sorting UI** | Missing | Add sort control toolbar in `CharacterReviewBoard.tsx` with options for `'Newest'` (최신순) and `'Best/Upvoted'` (베스트/추천순). |
| **Sorting Logic** | Fixed to `created_at` | Implement `sortBy` state (`'best' | 'newest'`). Sort `rootReviews` by `upvotes_count` descending (with `created_at` tie-breaker) when `'best'` is selected. |
| **Visual Connecting Lines** | Static `border-l-2` | Enhance thread vertical lines in `CommentCard.tsx` with glowing hover effects, multi-level color accents, and Reddit-style vertical connectors. |
| **Depth Cap** | Uncapped | Cap indentation margin at level 4 (`Math.min(level, 4)`) to maintain readable width on mobile viewports. |
| **Reply Target Context** | No parent reference | Show `Replying to @Nickname` tag in nested reply headers. |

---

## 3. Data Contract & Interface Alignment

Update the `Review` interface across `CommentCard.tsx`, `CharacterReviewBoard.tsx`, and related files:

```typescript
export interface Review {
  id: string;
  created_at: string;
  game_id: string;
  character_id: string;
  nickname: string;
  rating: number;
  comment_text: string;
  user_id?: string;
  parent_id?: string | null;
  upvotes_count?: number;
  user_has_upvoted?: boolean;
  media_urls?: string[];       // R2: Media URLs attachment array
  is_pinned?: boolean;        // R4 compatibility: Admin pin
  report_count?: number;      // R4 compatibility: Auto-hide threshold
  user_has_reported?: boolean;// R4 compatibility: Duplicate report guard
}
```

---

## 4. Summary of Code Changes Required

1. **`common-hub/components/CommentForm.tsx`**:
   - Add markdown toolbar buttons (Bold, Italic, Quote, Spoiler, Image attachment toggle).
   - Add `useRef<HTMLTextAreaElement>` and text insertion handler.
   - Add media URL list state & thumbnail previews.
   - Update `onSubmit` signature to pass `mediaUrls`.

2. **`common-hub/components/CommentCard.tsx`**:
   - Update `Review` interface with `media_urls`.
   - Render markdown content & spoiler tags using updated `MarkdownRenderer`.
   - Render attached media images with thumbnail modal.
   - Render link previews for detected URLs.
   - Enhance visual connecting lines and cap visual indent depth at level 4.
   - Show `Replying to @Nickname` badge on nested replies.

3. **`common-hub/components/CharacterReviewBoard.tsx`**:
   - Add `sortBy` state (`'best' | 'newest'`).
   - Add UI sort bar with buttons for '베스트/추천순' (Best) and '최신순' (Newest).
   - Update `rootReviews` memoization to sort based on `sortBy`.
   - Update `handleCreateReview` to accept and persist `media_urls`.

4. **`common-hub/components/MarkdownRenderer.tsx`**:
   - Add parsing and JSX elements for *italic*, blockquotes (`>`), spoiler tags (`||text||` with reveal state), and embedded media links.
