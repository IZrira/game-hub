# Analysis Report: R3 — DiscussionForumPosting Schema Integration for CharacterReviewBoard

**Author**: Survey Explorer 3  
**Date**: 2026-08-05  
**Working Directory**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_survey_3`  
**Target Requirement**: Requirement R3: DiscussionForumPosting Schema Integration for CharacterReviewBoard  

---

## 1. Executive Summary

Requirement R3 mandates updating `CharacterReviewBoard` (one-line user reviews and ratings) to inject Google's `DiscussionForumPosting` structured data (JSON-LD) into page `<head>` or body. This allows search engine crawlers (Googlebot, AdSense bot) to validate and index user-generated community reviews, enhancing SEO authority and resolving AdSense "Thin Content" warnings.

**Key Discovery**:
The codebase **already contains** the foundational schema generation logic inside `common-hub/components/SEO.tsx` (lines 239–262) and receives `commentsData` from parent `CharacterDetail.tsx` pages. Furthermore, `hsr-hub`, `ww-hub`, and `nte-hub` character detail pages pass `onCommentsLoaded={setCommentsData}` to `CharacterReviewBoard`. 

**The Root Cause of Missing Schema Rendering**:
Inside `common-hub/components/CharacterReviewBoard.tsx`, the prop `onCommentsLoaded?: (comments: any[]) => void;` is accepted in the component signature, **but is never invoked** when reviews are loaded (`fetchReviews`) or modified (`handleCreateReview`, `handleEdit`, `handleDelete`). Consequently, `commentsData` in the parent `CharacterDetail` pages remains an empty array (`[]`), causing `SEO.tsx` to skip rendering the `DiscussionForumPosting` schema. In addition, static prerendering via `scripts/prerender-meta.js` does not currently include static `DiscussionForumPosting` JSON-LD tags for pre-rendered character pages.

---

## 2. Codebase Architecture & Component Investigation

### 2.1 `CharacterReviewBoard.tsx` (`common-hub/components/CharacterReviewBoard.tsx`)
- **Role**: Main container for managing user-generated character reviews, fetching from Supabase (`character_reviews`, `comment_upvotes`, `comment_reports`) with LocalStorage fallback, sorting ('newest' vs 'best'), optimistic UI updates, and pinned comment elevation.
- **Props**:
  ```typescript
  interface Props {
    characterId: string;
    gameId: string;
    onCommentsLoaded?: (comments: any[]) => void;
  }
  ```
- **State**:
  - `reviews: Review[]`
  - `isLoading: boolean`
  - `sortMode: 'newest' | 'best'`
- **Data Fetching Flow** (Lines 36–186):
  1. Attempts to fetch from Supabase table `character_reviews` matching `game_id` and `character_id`.
  2. If Supabase fails or is unavailable, falls back to `localStorage` key `rira_local_reviews_${gameId}_${characterId}` or 2 default sample reviews ("Archive Explorer", "Tactical Analyst").
  3. Computes upvotes and reports.
  4. Calls `setReviews(processed)` and `setIsLoading(false)`.
  5. **Missing Step**: `onCommentsLoaded` is **never called**!

### 2.2 `SEO.tsx` (`common-hub/components/SEO.tsx`)
- **Role**: Integrates `react-helmet-async` to dynamically inject title, meta description, OpenGraph tags, canonical/alternate hreflang tags, and schema.org JSON-LD scripts into document `<head>`.
- **CommentData Interface** (Lines 10–15):
  ```typescript
  export interface CommentData {
    author: string;
    date: string;
    content: string;
    upvotes?: number;
  }
  ```
- **DiscussionForumPosting Schema Injection** (Lines 239–262):
  ```typescript
  // 커뮤니티 및 리뷰 댓글을 위한 DiscussionForumPosting 스키마 주입
  if (commentsData && commentsData.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      "headline": `${name || title} 유저 평가 및 리뷰`,
      "url": canonicalUrl,
      "datePublished": publishedTime || "2024-05-01T00:00:00Z",
      "author": {
        "@type": "Organization",
        "name": "RIRA ARCHIVE Community"
      },
      "comment": commentsData.map(comment => ({
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": comment.author
        },
        "datePublished": comment.date,
        "text": comment.content,
        "upvoteCount": comment.upvotes || 0
      }))
    });
  }
  ```

### 2.3 Character Detail Pages
1. **HSR**: `hsr-hub/pages/CharacterDetail.tsx` (Lines 86, 411, 704)
2. **WW**: `ww-hub/pages/CharacterDetail.tsx` (Lines 86, 499, 841)
3. **NTE**: `nte-hub/pages/CharacterDetail.tsx` (Lines 89, 580, 890)

All 3 pages initialize:
```typescript
const [commentsData, setCommentsData] = useState<CommentData[]>([]);
```
Pass to SEO:
```typescript
<SEO ... commentsData={commentsData} />
```
And render CharacterReviewBoard:
```typescript
<CharacterReviewBoard characterId={...} gameId={...} onCommentsLoaded={setCommentsData} />
```

### 2.4 Build & Prerender Script (`scripts/prerender-meta.js`)
- Executed during `npm run build`.
- Generates static `index.html` files for routes such as `/gallery/hsr/character/:id`, `/gallery/ww/character/:id`, `/gallery/nte/character/:id`.
- Replaces `<title>`, `<meta description>`, OpenGraph tags, and injects `<article>` inner DOM into `<div id="root">`.
- **Gap**: Currently does not generate `DiscussionForumPosting` JSON-LD into static pre-rendered HTML `<head>` files.

---

## 3. Review Data Model vs. Schema.org Standard Mapping

### 3.1 Review Data Model (`Review`)
From `common-hub/components/CommentCard.tsx` (Lines 8–27):
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
  media_urls?: string[];
  like_count?: number;
  report_count?: number;
  is_pinned?: boolean;
  user_has_reported?: boolean;
  updated_at?: string;
  author_is_admin?: boolean;
}
```

### 3.2 Mapping Table to Schema.org `DiscussionForumPosting` & `Comment`

| Review Object Property | `SEO.tsx` `CommentData` Field | Schema.org JSON-LD Property | Example Value |
|---|---|---|---|
| `nickname` | `author` | `comment[].author.name` | `"Archive Explorer"` |
| `created_at` | `date` | `comment[].datePublished` | `"2026-07-25T04:24:46Z"` |
| `comment_text` | `content` | `comment[].text` | `"Outstanding character design and synergy!"` |
| `upvotes_count` / `like_count` | `upvotes` | `comment[].upvoteCount` | `5` |
| `rating` | `rating` (new optional) | `comment[].reviewRating.ratingValue` | `5` |

### 3.3 Enhanced `DiscussionForumPosting` JSON-LD Schema Structure
To conform to Google Rich Results & schema.org specifications:
```json
{
  "@context": "https://schema.org",
  "@type": "DiscussionForumPosting",
  "headline": "아케론 유저 평가 및 리뷰",
  "url": "https://rira-game-hub.pages.dev/gallery/hsr/character/acheron",
  "datePublished": "2024-05-01T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "RIRA ARCHIVE Community"
  },
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/CommentAction",
    "userInteractionCount": 2
  },
  "comment": [
    {
      "@type": "Comment",
      "author": {
        "@type": "Person",
        "name": "Archive Explorer"
      },
      "datePublished": "2026-07-24T04:24:46.000Z",
      "text": "Outstanding character design and synergy! Highly recommended for end-game content.",
      "upvoteCount": 5,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5,
        "worstRating": 1
      }
    }
  ]
}
```

---

## 4. Proposed Implementation Solution

To achieve complete requirement compliance for Requirement R3, two complementary fixes should be implemented by the implementation agent:

### Solution Part 1: Real-time Runtime Schema Sync in `CharacterReviewBoard.tsx`
Add a `useEffect` inside `CharacterReviewBoard.tsx` that triggers `onCommentsLoaded` whenever `reviews` state changes:

```typescript
// Synchronize reviews to parent SEO component for DiscussionForumPosting JSON-LD schema
useEffect(() => {
  if (onCommentsLoaded) {
    const mappedComments = reviews.map((r) => ({
      author: r.nickname || 'User',
      date: r.created_at || new Date().toISOString(),
      content: r.comment_text,
      upvotes: r.upvotes_count ?? r.like_count ?? 0,
      rating: r.rating || 5,
    }));
    onCommentsLoaded(mappedComments);
  }
}, [reviews, onCommentsLoaded]);
```

### Solution Part 2: Schema Enhancements in `SEO.tsx`
Update `SEO.tsx` to handle optional ratings and include `interactionStatistic`:

```typescript
// Interface update in SEO.tsx
export interface CommentData {
  author: string;
  date: string;
  content: string;
  upvotes?: number;
  rating?: number;
}

// In SEO.tsx schema builder:
if (commentsData && commentsData.length > 0) {
  schemas.push({
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": `${name || title} 유저 평가 및 리뷰`,
    "url": canonicalUrl,
    "datePublished": publishedTime || "2024-05-01T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "RIRA ARCHIVE Community"
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/CommentAction",
      "userInteractionCount": commentsData.length
    },
    "comment": commentsData.map(comment => ({
      "@type": "Comment",
      "author": {
        "@type": "Person",
        "name": comment.author
      },
      "datePublished": comment.date,
      "text": comment.content,
      "upvoteCount": comment.upvotes || 0,
      ...(comment.rating ? {
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": comment.rating,
          "bestRating": 5,
          "worstRating": 1
        }
      } : {})
    }))
  });
}
```

### Solution Part 3: Static Prerender Injection in `scripts/prerender-meta.js`
In `scripts/prerender-meta.js`, when creating prerendered HTML for character detail pages, inject static `DiscussionForumPosting` JSON-LD schema into `<head>` so Googlebot indexes structured review data even prior to executing client JavaScript.

---

## 5. Verification Plan

1. **Type Checking**:
   Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
2. **Build & Prerender Verification**:
   Run `npm run build` to verify `generate-sitemap.js`, `vite build`, and `prerender-meta.js` complete without errors.
3. **Runtime DOM Verification**:
   Inspect pre-rendered `dist/gallery/hsr/character/*.html` files or launch preview server (`npm run preview`) to confirm `<script type="application/ld+json">` contains valid `DiscussionForumPosting` schema with `@type: "DiscussionForumPosting"`, `headline`, and `comment` array.
