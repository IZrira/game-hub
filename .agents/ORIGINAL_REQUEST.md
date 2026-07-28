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
