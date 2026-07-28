# Project: Rira Game Hub - Advanced Community Comment System

## Architecture
- React 19 / TypeScript / Vite frontend codebase with React Router v8.
- Supabase Auth (`@supabase/supabase-js`) for OAuth authentication (Google, Discord).
- Centralized `AuthContext` (`common-hub/context/AuthContext.tsx`) providing user session, social OAuth sign-in triggers, and login modal state.
- Enhanced `CharacterReviewBoard` & `CommentCard` components supporting:
  - Auth guards triggering `LoginModal` on any interaction (create/edit/delete/upvote/report).
  - RLS policies & UI inline editing/deletion restricted to author (`auth.uid() = user_id`).
  - Lightweight rich text / markdown editor toolbar (bold, italic, blockquotes, spoiler tags).
  - Media attachments (image URLs / uploads) and link preview rendering.
  - Reddit-style infinite/multi-depth nested reply threads with visual connecting lines.
  - Sorting options: 'Newest' (최신순) and 'Best/Upvoted' (베스트/추천순).
  - Admin Pin feature (`is_pinned: boolean`) pinning useful comments to top.
  - Report & Auto-Hide (>= 3 reports blinds content with "유저들의 신고로 숨김 처리된 댓글입니다", duplicate report prevention).
- Complete SQL migration script (`supabase/migrations/`) with `id`, `user_id`, `parent_id`, `content`, `media_urls`, `like_count`, `report_count`, `is_pinned`, `created_at`, `updated_at`, and RLS policies.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Gap Exploration | Analyze codebase for R1-R5 requirement gaps | None | DONE |
| 2 | Implementation | Complete R1-R5 features (Auth/RLS, Rich Text/Media, Nested Threads/Sort, Admin/Report, SQL Migration) | M1 | DONE |
| 3 | Review & Challenge | Reviewer code review & Challenger empirical test verification | M2 | DONE (APPROVED) |
| 4 | Forensic Audit | Forensic Auditor integrity & compliance check | M3 | DONE (CLEAN) |





## Interface Contracts
### Auth Provider ↔ Comment UI
- `user`: `User | null`
- `session`: `Session | null`
- `loading`: boolean
- `signInWithProvider(provider: 'google' | 'discord')`: Initiates OAuth flow
- `signOut()`: Logs user out
- `isLoginModalOpen`: boolean
- `openLoginModal()`: Opens login modal
- `closeLoginModal()`: Closes login modal

### Comment Data Structure
- `id`: string
- `user_id`: string
- `parent_id`: string | null
- `content`: string
- `media_urls`: string[]
- `like_count`: number
- `report_count`: number
- `is_pinned`: boolean
- `created_at`: string
- `updated_at`: string
- `author`: { name: string; avatarUrl?: string; id: string }
- `userUpvoted`: boolean
- `userReported`: boolean
- `replies`: Comment[]

## Code Layout
- `common-hub/context/AuthContext.tsx`: Centralized Supabase Auth provider and `useAuth()` hook.
- `common-hub/components/LoginModal.tsx`: Google and Discord social login modal.
- `common-hub/components/CharacterReviewBoard.tsx`: Main comment board container with sorting, admin pin, and report state.
- `common-hub/components/CommentCard.tsx`: Individual comment item rendering with nested replies, visual connecting lines, inline editor, report button, auto-hide message.
- `common-hub/components/CommentForm.tsx`: Auth-guarded rich text comment editor toolbar (bold, italic, quote, spoiler, media URLs/uploads, link preview).
- `common-hub/components/UpvoteButton.tsx`: Interactive upvote/like button with count.
- `supabase/migrations/`: PostgreSQL SQL migration scripts containing full schema & RLS policies.
- `nte-hub/pages/CharacterDetail.tsx`: Integrated `CharacterReviewBoard`.

