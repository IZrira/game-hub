# Original User Request

## 2026-07-25T04:24:46Z

Enhance the comment feature in the Rira Game Hub project by integrating Supabase Social Auth (Google, Discord) and letting the agent team decide on appropriate advanced comment features (e.g., replies, upvotes) suitable for a production environment.

Working directory: c:\Users\User\Desktop\rira game hub\game-hub
Integrity mode: development

## Requirements

### R1. Supabase Auth Integration
Implement social login (Google, Discord) using Supabase Auth so that users must authenticate to leave comments.

### R2. Advanced Comment Features
Design and implement production-ready comment enhancements. The exact features (e.g., nested replies, upvoting, real-time syncing) are left to the agent team's discretion, provided they improve user engagement and fit within a production environment.

## Acceptance Criteria

### Verification (Agent-as-Judge)
- [ ] An independent agent can launch the local dev server and successfully render the comment UI.
- [ ] An independent agent verifies that the Supabase Social Auth UI (Login buttons for Google/Discord) is present and functional in the code logic.
- [ ] An independent agent verifies that unauthenticated users cannot submit comments.
- [ ] An independent agent verifies that at least one advanced comment feature (e.g., nested replies, upvoting) is implemented and functional without errors.
- [ ] The codebase passes TypeScript build checks (`npm run build`) with no fatal errors.

## Follow-up — 2026-07-25T07:40:46Z

# Teamwork Project Prompt — Draft

> Status: Ready for launch — awaiting user approval
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Build an advanced, production-ready community comment system for Rira Game Hub, featuring rich text, media support, Reddit-style nested threads, and admin moderation tools.

Working directory: c:\Users\User\Desktop\rira game hub\game-hub
Integrity mode: development

## Requirements

### R1. Auth & RLS (소셜 로그인 및 권한 제어)
- Integrate Supabase Auth for Google and Discord login.
- Unauthenticated users can only view comments. Actions like create/edit/delete/upvote/report must trigger the `LoginModal`.
- Apply RLS policies and UI inline editors so only the author (`auth.uid() = user_id`) can edit/delete their comment.

### R2. Media & Form (미디어 및 리치 텍스트 지원)
- Implement a lightweight rich text/markdown editor toolbar supporting bold, italic, blockquotes, and spoiler tags.
- Support media attachments (image URL inputs/uploads) and link previews.

### R3. Threads & Sorting (계층형 댓글 및 정렬)
- Implement Reddit-style infinite/multi-depth nested replies with visual connecting lines.
- Provide advanced sorting options: 'Newest' (최신순) and 'Best/Upvoted' (베스트/추천순).

### R4. Admin & Moderation (관리자 및 클린 커뮤니티 기능)
- **Admin Pin:** Admins can pin useful comments to the top (`is_pinned: boolean`).
- **Report & Auto-Hide:** Provide a 'Report' button per comment (with duplicate report prevention). If a comment receives 3 or more reports, automatically blind its content with a message ("유저들의 신고로 숨김 처리된 댓글입니다").

### R5. Database Schema (Supabase)
- Create a SQL migration script for the comments table containing: `id`, `user_id`, `parent_id`, `content`, `media_urls`, `like_count`, `report_count`, `is_pinned`, `created_at`, `updated_at`, along with all necessary RLS policies.

## Acceptance Criteria

### Verification (Agent-as-Judge & Programmatic)
- [ ] An independent agent verifies that the rich text editor, Reddit-style nested UI, sorting, and reporting functionalities render correctly.
- [ ] An independent agent verifies that an unauthenticated user is prompted with a login modal when attempting to interact.
- [ ] The SQL migration script is fully generated and outputted for the user to run manually in the Supabase SQL Editor.
- [ ] The codebase passes TypeScript build checks (`npm run build`) with no fatal errors.

## 2026-08-05T02:01:45Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Enhance SEO value and resolve AdSense "Thin Content" issues by generating automated narrative summaries, adding team synergy UI cards, and integrating structured data (schema.org) for existing UGC comments. (Do NOT build a long-form community guide board).

Working directory: c:\Users\User\Desktop\rira game hub\game-hub
Integrity mode: development

## Requirements

### R1. Automated Character Analysis Summary
Create a system that automatically generates a descriptive, narrative analysis paragraph (`Character Analysis Summary`) for each character based on their stats, recommended relics, weapons, and team synergy. This summary must be injected into the static HTML via the `prerender-meta.js` script to ensure Googlebot can index it as rich text.

### R2. Synergy Deck UI Component
Design and implement an intuitive 'Recommended Team Synergy (Synergy Deck)' UI card on the character detail pages (for HSR, WW, NTE) that visually displays the best team compositions.

### R3. DiscussionForumPosting Schema Integration
Update the existing `CharacterReviewBoard` (one-line reviews and ratings) to inject Google's `DiscussionForumPosting` structured data (JSON-LD) into the page `<head>` or body. This allows Google to recognize the UGC as a valuable forum/review discussion.

## Acceptance Criteria

### Automated Summaries
- [ ] `prerender-meta.js` is updated to generate and inject a narrative summary paragraph for each character.
- [ ] Running `npm run prerender` produces HTML files containing this summary in the `<div id="root">`.

### Synergy UI
- [ ] A new `SynergyDeck` component is created and mounted on character detail pages.
- [ ] The component matches the site's dark mode and glassmorphism aesthetics.

### Structured Data (SEO)
- [ ] Character pages with reviews render valid `DiscussionForumPosting` JSON-LD schema.
- [ ] The schema correctly maps the existing reviews (author, rating, text) to the structured data format.

## 2026-08-05T17:06:39Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Optimize the site based on PageSpeed Insights to achieve SEO 100, Performance 90+, and Accessibility 100 scores by improving image formats, fixing contrast issues, and resolving 404 errors.

Working directory: c:\Users\User\Desktop\rira game hub\game-hub
Integrity mode: development

## Requirements

### R1. Image Size & Format Optimization (LCP)
Convert `/public/assets/banners/hsr_placeholder.png` and `ww_placeholder.png` (currently ~900KB each) to compressed WebP format. Update the respective `<img>` tags across the application to point to the new WebP files and explicitly set aspect-ratio/width/height to prevent layout shifts.

### R2. Accessibility (Color Contrast) Improvement
Improve text readability on dark backgrounds (`#0a0a0a`, `#121212`) by globally updating low-contrast text utility classes like `text-gray-600` and `text-gray-700` to higher-contrast alternatives like `text-gray-400` or `text-gray-300`.

### R3. Resolve 404 Resource Errors
Identify and fix the image fallback logic or path references that trigger 404 Not Found errors in the browser console for `ww_main.webp` and `unknown.webp`.

## Acceptance Criteria

### Performance
- [ ] `hsr_placeholder.png` and `ww_placeholder.png` are replaced by `.webp` versions with significantly reduced file sizes.
- [ ] Image tags for these banners include width/height attributes to prevent Cumulative Layout Shift (CLS).

### Accessibility
- [ ] A codebase search confirms that `text-gray-600` and `text-gray-700` are no longer used on dark backgrounds, replaced by lighter variants.

### Error Handling & Build
- [ ] The browser console no longer throws 404 errors for `ww_main.webp` or `unknown.webp`.
- [ ] Running `npm run build` completes successfully without errors.

