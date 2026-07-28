# Original User Request

## 2026-07-25T13:25:03+09:00

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

## Follow-up — 2026-07-25T16:41:00Z

### Detailed Requirements:
1. **R1. Auth & RLS (소셜 로그인 및 권한 제어)**:
   - Integrate Supabase Auth for Google and Discord login.
   - Unauthenticated users can view comments, but actions like create/edit/delete/upvote/report must trigger `LoginModal`.
   - Apply RLS policies & UI inline editors so only author (`auth.uid() = user_id`) can edit/delete their comment.

2. **R2. Media & Form (미디어 및 리치 텍스트 지원)**:
   - Implement lightweight rich text/markdown editor toolbar (bold, italic, blockquotes, spoiler tags).
   - Support media attachments (image URL inputs/uploads) and link previews.

3. **R3. Threads & Sorting (계층형 댓글 및 정렬)**:
   - Implement Reddit-style infinite/multi-depth nested replies with visual connecting lines.
   - Provide sorting options: 'Newest' (최신순) and 'Best/Upvoted' (베스트/추천순).

4. **R4. Admin & Moderation (관리자 및 클린 커뮤니티 기능)**:
   - Admin Pin: Admins can pin useful comments to the top (`is_pinned: boolean`).
   - Report & Auto-Hide: 'Report' button per comment with duplicate report prevention. Auto-blind content if comment receives >= 3 reports with message "유저들의 신고로 숨김 처리된 댓글입니다".

5. **R5. Database Schema (Supabase)**:
   - Create SQL migration script containing `id`, `user_id`, `parent_id`, `content`, `media_urls`, `like_count`, `report_count`, `is_pinned`, `created_at`, `updated_at`, along with RLS policies.

6. **Acceptance Criteria**:
   - Independent verification of rich text editor, Reddit-style nested UI, sorting, and reporting functionalities.
   - Independent verification that unauthenticated user triggers login modal on interaction.
   - SQL migration script generated.
   - TypeScript build check (`npm run build`) passes with zero fatal errors.

