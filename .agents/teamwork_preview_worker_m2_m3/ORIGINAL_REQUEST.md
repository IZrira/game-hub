## 2026-07-25T04:28:25Z
You are the Worker assigned to implement Milestone 2 (Supabase Social Auth & Auth Guard) and Milestone 3 (Advanced Comment Features: Nested Replies & Upvoting) for Rira Game Hub (c:\Users\User\Desktop\rira game hub\game-hub).

Working directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_worker_m2_m3
Please write progress.md and BRIEFING.md inside your working directory.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Tasks:
1. **Centralized AuthContext**:
   - Create `common-hub/context/AuthContext.tsx` providing `user`, `session`, `loading`, `signInWithProvider('google' | 'discord')`, `signOut()`, `isLoginModalOpen`, `openLoginModal()`, `closeLoginModal()`.
   - Wrap app root in `<AuthProvider>` (in `common-hub/App.tsx` or `router.tsx` layout).
   - Update `LoginModal.tsx` and `Navbar.tsx` to use `useAuth()`.

2. **Comment UI Auth Guard & Advanced Features**:
   - Update `CharacterReviewBoard.tsx` (and modularize into `CommentCard.tsx`, `CommentForm.tsx`, `UpvoteButton.tsx` if appropriate):
   - **Auth Guard**: Unauthenticated users CANNOT submit comments or replies. If an unauthenticated user attempts to comment/reply, display a clear prompt / open `LoginModal` asking them to sign in with Google or Discord.
   - **Nested Replies**: Allow users to reply to specific comments. Maintain a tree structure (`parentId`), indented nested rendering, reply button, and collapse/expand threads if needed.
   - **Upvotes / Reactions**: Implement an interactive upvote button for every comment. Track upvote count and whether the user has upvoted.
   - **Offline / Local Dev Fallback**: Ensure `CharacterReviewBoard` works smoothly in local state when Supabase connection is offline or in mock mode, while syncing with Supabase when online.

3. **Database Schema & SQL Migration**:
   - Create `supabase/migrations/20260725020000_add_nested_replies_and_upvotes.sql`:
     - Add `parent_id uuid REFERENCES character_reviews(id) ON DELETE CASCADE` to `character_reviews`.
     - Create table `comment_upvotes` (`id uuid PRIMARY KEY`, `comment_id uuid REFERENCES character_reviews(id)`, `user_id uuid REFERENCES auth.users(id)`, `created_at timestamptz`).
     - Add RLS policies for `comment_upvotes`.

4. **NTE Game Detail Integration**:
   - Integrate `<CharacterReviewBoard>` into `nte-hub/pages/CharacterDetail.tsx` matching `hsr-hub` and `ww-hub` character detail pages.

5. **Build Verification**:
   - Run `npm run build` (and `npm run lint`) using `run_command` to verify that there are zero TypeScript compiler or build errors.

6. **Documentation & Handoff**:
   - Write `changes.md` and `handoff.md` in `c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_worker_m2_m3\`.
   - Include build logs and verification results in your handoff report.
   - Send a message to parent when completed.
