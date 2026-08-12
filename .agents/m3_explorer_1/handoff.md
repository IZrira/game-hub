# Handoff Report: CharacterReviewBoard `onCommentsLoaded` & DiscussionForumPosting Schema Integration

**Author**: `m3_explorer_1` (Milestone 3 Explorer)  
**Target File**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_explorer_1\handoff.md`  
**Parent Agent**: `sub_orch_m3` (`c72d60a7-b23d-4fdf-9dad-93959e2bdb7f`)  
**Milestone**: M3 — R3 DiscussionForumPosting Schema Integration  

---

## 1. Observation

### 1.1 Prop Signature & Missing Callback Invocation in `CharacterReviewBoard.tsx`
- **File**: `common-hub/components/CharacterReviewBoard.tsx`
- **Lines 9–15**: The component interface `Props` and component definition accept `onCommentsLoaded`:
  ```typescript
  interface Props {
    characterId: string;
    gameId: string;
    onCommentsLoaded?: (comments: any[]) => void;
  }

  export const CharacterReviewBoard: React.FC<Props> = ({ characterId, gameId, onCommentsLoaded }) => {
  ```
- **Line 17**: State declaration for reviews:
  ```typescript
  const [reviews, setReviews] = useState<Review[]>([]);
  ```
- **State Update Locations** (7 separate functions):
  1. `fetchReviews` (Line 184): `setReviews(processed);` — Initial fetch from Supabase / localStorage / default samples.
  2. `handleCreateReview` (Lines 246, 261, 267): `setReviews(updated);`, `setReviews((current) => ...);`, `setReviews(prevReviews);` (rollback).
  3. `handleToggleUpvote` (Lines 295, 316): `setReviews(updatedReviews);`, `setReviews(reviews);` (rollback).
  4. `handleEdit` (Line 370): `setReviews(updated);`
  5. `handleDelete` (Lines 383, 396): `setReviews(updated);`, `setReviews(prevReviews);` (rollback).
  6. `handleTogglePin` (Line 426): `setReviews(updated);`
  7. `handleReport` (Line 447): `setReviews(updatedReviews);`
- **Direct Observation**: Despite destructuring `onCommentsLoaded` in line 15, `onCommentsLoaded` is **never invoked anywhere** in `CharacterReviewBoard.tsx`.

### 1.2 Parent Component Context in Character Detail Pages
- **Files**:
  - `hsr-hub/pages/CharacterDetail.tsx` (Lines 86, 704)
  - `ww-hub/pages/CharacterDetail.tsx` (Lines 86, 841)
  - `nte-hub/pages/CharacterDetail.tsx` (Lines 89, 890)
- **Code Pattern**:
  ```typescript
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
  ...
  <SEO ... commentsData={commentsData} />
  ...
  <CharacterReviewBoard characterId={...} gameId={...} onCommentsLoaded={setCommentsData} />
  ```
- **Direct Observation**: The parent pages set up state `commentsData` and pass `setCommentsData` as the `onCommentsLoaded` callback to `CharacterReviewBoard`, and pass `commentsData` to `<SEO />`. Because `onCommentsLoaded` is never called, `commentsData` remains permanently empty (`[]`).

### 1.3 `SEO.tsx` Schema Guard
- **File**: `common-hub/components/SEO.tsx` (Lines 239–262)
- **Code Pattern**:
  ```typescript
  if (commentsData && commentsData.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      ...
    });
  }
  ```
- **Direct Observation**: Because `commentsData` is `[]`, `commentsData.length > 0` evaluates to `false`, preventing `<SEO />` from pushing `DiscussionForumPosting` JSON-LD schema into `<head>`.

### 1.4 Inline Schema Bug in `CharacterReviewBoard.tsx`
- **File**: `common-hub/components/CharacterReviewBoard.tsx` (Lines 524–555)
- **Code Pattern**:
  ```typescript
  "comment": rootReviews.map(r => ({
    "@type": "Comment",
    "text": r.content, // Bug: Review object uses r.comment_text! r.content is undefined.
    "dateCreated": r.created_at,
    "author": {
      "@type": "Person",
      "name": r.author_name || "Anonymous" // Bug: Review object uses r.nickname! r.author_name is undefined.
    },
    ...
  }))
  ```
- **Direct Observation**: The existing inline `schemaData` calculation inside `CharacterReviewBoard.tsx` attempts to read `r.content` and `r.author_name`, which do not exist on the `Review` interface (`comment_text` and `nickname`).

---

## 2. Logic Chain

1. **Prop & State Disconnect** -> `CharacterReviewBoard` receives `onCommentsLoaded` prop, but never invokes it when `reviews` state is updated (`fetchReviews`, `handleCreateReview`, `handleEdit`, `handleDelete`, `handleToggleUpvote`, `handleTogglePin`, `handleReport`).
2. **Parent State Staleness** -> Parent `CharacterDetail` pages (`HSR`, `WW`, `NTE`) initialize `commentsData = []` and pass `setCommentsData` to `onCommentsLoaded`. Because `onCommentsLoaded` is never called, `commentsData` remains `[]`.
3. **SEO Schema Omission** -> `SEO.tsx` checks `if (commentsData && commentsData.length > 0)`. With `commentsData = []`, no `DiscussionForumPosting` schema is rendered dynamically in page `<head>`.
4. **Declarative Solution** -> Instead of adding imperative `onCommentsLoaded` calls into 7+ separate handler functions, a single React `useEffect` hook listening to `[reviews, onCommentsLoaded]` automatically syncs mapped `CommentData[]` whenever `reviews` updates for any reason (fetch, create, edit, delete, optimistic updates, or rollbacks).
5. **Inline Schema Harmonization** -> Fixing line 539 (`r.comment_text`) and line 543 (`r.nickname`) in `CharacterReviewBoard.tsx`'s inline `schemaData` guarantees valid JSON-LD structure regardless of rendering strategy.

---

## 3. Edge Cases & Safeguards

| Edge Case | Scenario | Handling / Safeguard |
|---|---|---|
| **Undefined Callback** | Parent component mounts `CharacterReviewBoard` without `onCommentsLoaded` prop. | Guarded with `if (onCommentsLoaded) { ... }`. Prevents runtime `TypeError: onCommentsLoaded is not a function`. |
| **Empty Reviews (`[]`)** | Character has zero reviews, or reviews are in loading state. | `reviews.map(...)` produces `[]`. `onCommentsLoaded([])` is called. `SEO.tsx` condition `commentsData.length > 0` evaluates to `false` and cleanly avoids rendering empty schema. |
| **Missing Author/Nickname** | `r.nickname` is `null`, `undefined`, or whitespace only. | Fallback: `r.nickname?.trim() || 'Anonymous'` (or `'User'`). |
| **Missing/Invalid Date** | `r.created_at` is missing or unparseable. | Fallback: `r.created_at || new Date().toISOString()`. |
| **Missing Content** | `r.comment_text` is `null` or `undefined`. | Fallback: `r.comment_text || ''`. |
| **Upvotes Mapping** | Field name varies between `upvotes_count` and `like_count`. | Fallback hierarchy: `typeof r.upvotes_count === 'number' ? r.upvotes_count : (typeof r.like_count === 'number' ? r.like_count : 0)`. |
| **Rating Mapping** | Replies or legacy reviews might lack `rating` or have out-of-bounds value. | Fallback check: `typeof r.rating === 'number' && !isNaN(r.rating) && r.rating >= 1 && r.rating <= 5 ? r.rating : 5`. |

---

## 4. Conclusion & Proposed Implementation Plan

To resolve Requirement R3 in `CharacterReviewBoard.tsx`, the implementer should perform the following precise code updates:

### Proposed Code Changes for `common-hub/components/CharacterReviewBoard.tsx`:

1. **Import `CommentData` from `./SEO`**:
   ```typescript
   import { CommentData } from './SEO';
   ```

2. **Update `Props` Interface**:
   ```typescript
   interface Props {
     characterId: string;
     gameId: string;
     onCommentsLoaded?: (comments: CommentData[]) => void;
   }
   ```

3. **Add `useEffect` Hook (Sync `reviews` -> `onCommentsLoaded`)**:
   Add this `useEffect` directly after state declarations:
   ```typescript
   useEffect(() => {
     if (onCommentsLoaded) {
       const mappedComments: CommentData[] = reviews.map((r) => ({
         author: r.nickname?.trim() || 'Anonymous',
         date: r.created_at || new Date().toISOString(),
         content: r.comment_text || '',
         upvotes:
           typeof r.upvotes_count === 'number'
             ? r.upvotes_count
             : typeof r.like_count === 'number'
             ? r.like_count
             : 0,
         rating:
           typeof r.rating === 'number' && !isNaN(r.rating) && r.rating >= 1 && r.rating <= 5
             ? r.rating
             : 5,
       }));
       onCommentsLoaded(mappedComments);
     }
   }, [reviews, onCommentsLoaded]);
   ```

4. **Fix Inline `schemaData` Fields** (Lines 524–555):
   ```typescript
   const schemaData = useMemo(() => {
     if (rootReviews.length === 0) return null;

     return {
       "@context": "https://schema.org",
       "@type": "DiscussionForumPosting",
       "headline": `${gameId.toUpperCase()} Character/Weapon Discussion and Reviews`,
       "articleSection": "Community Reviews",
       "interactionStatistic": {
         "@type": "InteractionCounter",
         "interactionType": "https://schema.org/CommentAction",
         "userInteractionCount": reviews.length
       },
       "comment": rootReviews.map((r) => ({
         "@type": "Comment",
         "text": r.comment_text || "",
         "dateCreated": r.created_at || new Date().toISOString(),
         "author": {
           "@type": "Person",
           "name": r.nickname?.trim() || "Anonymous"
         },
         ...(r.rating ? {
           "reviewRating": {
             "@type": "Rating",
             "ratingValue": r.rating,
             "bestRating": 5,
             "worstRating": 1
           }
         } : {})
       }))
     };
   }, [rootReviews, reviews.length, gameId]);
   ```

---

## 5. Verification Method

The implementation can be verified using the following steps:

1. **TypeScript Build Verification**:
   ```bash
   npx tsc --noEmit
   ```
   *Expected Result*: Zero type errors in `common-hub/components/CharacterReviewBoard.tsx`.

2. **Component Integration Test**:
   - Render `<CharacterReviewBoard characterId="test" gameId="hsr" onCommentsLoaded={mockCallback} />`.
   - Verify `mockCallback` is called with an array of `CommentData` objects containing `{ author, date, content, upvotes, rating }`.
   - Test review creation, edit, and deletion; verify `mockCallback` fires with updated `CommentData[]` each time.

3. **Full Production Build & Prerender Test**:
   ```bash
   npm run build
   ```
   *Expected Result*: Build completes successfully with 0 errors.

4. **SEO Schema Verification**:
   - Inspect rendered DOM `<head>` or HTML under `dist/gallery/hsr/character/*.html`.
   - Verify `<script type="application/ld+json">` contains valid `@type: "DiscussionForumPosting"` JSON-LD schema populated with comment author, text, rating, and date.
