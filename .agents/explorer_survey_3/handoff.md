# Handoff Report: R3 DiscussionForumPosting Schema Integration

**Author**: Survey Explorer 3  
**Target Path**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_survey_3\handoff.md`  
**Parent Conversation ID**: `e1a93bc6-0148-4ad7-9b13-117b4c4cc4c0`  
**Milestone**: Requirement R3 Investigation & Analysis  

---

## 1. Observation

1. **Missing Callback Trigger in `CharacterReviewBoard.tsx`**:
   - File: `c:\Users\User\Desktop\rira game hub\game-hub\common-hub\components\CharacterReviewBoard.tsx`
   - Lines 12 & 15: `onCommentsLoaded?: (comments: any[]) => void;` is accepted as a prop in the component signature.
   - Lines 184–186 (`fetchReviews`), lines 246–272 (`handleCreateReview`), lines 367–371 (`handleEdit`), lines 381–401 (`handleDelete`): `setReviews(...)` updates the internal state, but `onCommentsLoaded` is **never called anywhere** in the component.

2. **Parent Component Setup in Character Detail Pages**:
   - Files:
     - `hsr-hub/pages/CharacterDetail.tsx` (Lines 86, 411, 704)
     - `ww-hub/pages/CharacterDetail.tsx` (Lines 86, 499, 841)
     - `nte-hub/pages/CharacterDetail.tsx` (Lines 89, 580, 890)
   - Code snippet across all detail pages:
     ```typescript
     const [commentsData, setCommentsData] = useState<CommentData[]>([]);
     ...
     <SEO ... commentsData={commentsData} />
     ...
     <CharacterReviewBoard characterId={...} gameId={...} onCommentsLoaded={setCommentsData} />
     ```

3. **DiscussionForumPosting Builder in `SEO.tsx`**:
   - File: `c:\Users\User\Desktop\rira game hub\game-hub\common-hub\components\SEO.tsx`
   - Lines 239–262:
     ```typescript
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

4. **Prerendering Script**:
   - File: `scripts/prerender-meta.js`
   - Generates static HTML for dynamic routes (`/gallery/hsr/character/:id`, `/gallery/ww/character/:id`, `/gallery/nte/character/:id`).
   - Does not currently inject static `DiscussionForumPosting` JSON-LD into `<head>`.

---

## 2. Logic Chain

1. **Observation 1 & 2** -> Parent character pages pass `setCommentsData` to `CharacterReviewBoard.onCommentsLoaded`. However, because `CharacterReviewBoard` never calls `onCommentsLoaded`, `commentsData` in React state remains an empty array (`[]`).
2. **Observation 2 & 3** -> When `commentsData` is `[]`, the condition `if (commentsData && commentsData.length > 0)` in `SEO.tsx` evaluates to `false`.
3. **Logic Step 3** -> Consequently, `SEO.tsx` never pushes the `DiscussionForumPosting` object into `schemas`, causing Helmet to render no JSON-LD for community reviews.
4. **Observation 4 & Requirement R3** -> To ensure Googlebot can index UGC reviews both dynamically (client hydration) and statically (build-time prerender), `onCommentsLoaded` must be called upon review state updates in `CharacterReviewBoard.tsx`, and static fallback JSON-LD should be injected in `prerender-meta.js`.

---

## 3. Caveats

- **Read-Only Investigation**: No source code files in `common-hub`, `hsr-hub`, `ww-hub`, `nte-hub`, or `scripts` were modified during this investigation.
- **Supabase Credentials**: Live Supabase network fetch falls back gracefully to `localStorage` or 2 sample reviews ("Archive Explorer", "Tactical Analyst") when offline.
- **Schema Extensibility**: `SEO.tsx` currently supports `author`, `date`, `content`, and `upvotes`. Adding `rating?: number` to `CommentData` will allow extending `DiscussionForumPosting` comments with `reviewRating`.

---

## 4. Conclusion

Requirement R3 can be completely resolved with targeted changes in 3 locations:

1. **`common-hub/components/CharacterReviewBoard.tsx`**:
   Add a `useEffect` hook to call `onCommentsLoaded` whenever `reviews` updates:
   ```typescript
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

2. **`common-hub/components/SEO.tsx`**:
   Enhance `CommentData` interface and `DiscussionForumPosting` schema builder to include `interactionStatistic` and `reviewRating`.

3. **`scripts/prerender-meta.js`**:
   Include baseline static `DiscussionForumPosting` JSON-LD schema injection in static character detail HTML generation.

---

## 5. Verification Method

To verify the fix after implementation:
1. **Type Safety**:
   Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
2. **Build Test**:
   Run `npm run build` to verify `scripts/generate-sitemap.js`, `vite build`, and `scripts/prerender-meta.js` run without errors.
3. **JSON-LD Schema Inspection**:
   Run `npm run preview` or inspect `dist/gallery/hsr/character/*.html` to confirm that `<script type="application/ld+json">` contains valid `@type: "DiscussionForumPosting"` JSON-LD containing the mapped reviews.
