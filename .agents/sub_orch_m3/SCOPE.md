# Scope: Milestone 3 (R3: DiscussionForumPosting Schema Integration for CharacterReviewBoard)

## Architecture
- Shared UI / SEO modules in `common-hub/`:
  - `common-hub/components/CharacterReviewBoard.tsx`
  - `common-hub/components/SEO.tsx`
- Static Prerender script:
  - `scripts/prerender-meta.js`

## Feature Inventory
| # | Feature | Description | Scope Target | Status |
|---|---------|-------------|--------------|--------|
| 5 | CharacterReviewBoard `onCommentsLoaded` Fix | Update `common-hub/components/CharacterReviewBoard.tsx` to invoke `onCommentsLoaded` callback on review updates (fetch, create, edit, delete) | M3 | IN_PROGRESS |
| 6 | DiscussionForumPosting JSON-LD Schema Enhancement | Enhance `common-hub/components/SEO.tsx` and `scripts/prerender-meta.js` to render valid `DiscussionForumPosting` JSON-LD schema dynamically and statically | M3 | IN_PROGRESS |

## Work Items & Scope Details
1. **`common-hub/components/CharacterReviewBoard.tsx`**:
   - Add/verify `useEffect` watching `reviews` and `onCommentsLoaded`.
   - Ensure mapped comment data contains `author`, `date`, `content`, `upvotes`, and `rating`.
   - Ensure callback is triggered whenever `reviews` updates via fetch, create, edit, or delete operations.

2. **`common-hub/components/SEO.tsx`**:
   - Update `CommentData` interface to include optional `rating?: number` and `upvotes?: number`.
   - Update `DiscussionForumPosting` JSON-LD schema builder to include:
     - `reviewRating`: `{ "@type": "Rating", "ratingValue": comment.rating || 5, "bestRating": "5", "worstRating": "1" }`
     - `interactionStatistic`: `{ "@type": "InteractionCounter", "interactionType": "https://schema.org/LikeAction", "userInteractionCount": comment.upvotes || 0 }`
     - Retain standard fields: `author`, `datePublished`, `text`, `upvoteCount`.

3. **`scripts/prerender-meta.js`**:
   - Inject baseline static `DiscussionForumPosting` JSON-LD schema into `<head>` of prerendered character HTML files during build/prerender.
   - Include sample/default community reviews for static indexing when pre-rendered offline.

## Interface Contracts
### `common-hub/components/CharacterReviewBoard.tsx` ↔ `common-hub/components/SEO.tsx`
- Callback signature: `onCommentsLoaded?: (comments: CommentData[]) => void`
- `CommentData` signature:
  ```typescript
  export interface CommentData {
    author: string;
    date: string;
    content: string;
    upvotes?: number;
    rating?: number;
  }
  ```

## Status
- Current Status: IN_PROGRESS
