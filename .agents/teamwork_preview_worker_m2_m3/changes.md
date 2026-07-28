# Summary of Changes

## Milestone 2 & Milestone 3 Implementation

### 1. Centralized AuthContext & App Wrapping
- **`common-hub/context/AuthContext.tsx`**: Created a centralized React Context (`AuthProvider` and `useAuth` hook) providing `user`, `session`, `loading`, `signInWithProvider('google' | 'discord')`, `signOut()`, `isLoginModalOpen`, `openLoginModal()`, and `closeLoginModal()`. Added automatic OAuth hash token recovery (`access_token`/`refresh_token`) and subscription to Supabase `onAuthStateChange`.
- **`common-hub/App.tsx`**: Wrapped `<RouterProvider>` with `<AuthProvider>` so authentication context is globally accessible.
- **`common-hub/components/LoginModal.tsx`**: Refactored to consume `signInWithProvider` and modal state from `useAuth()`.
- **`common-hub/components/Navbar.tsx`**: Updated to consume `user`, `signOut()`, and `openLoginModal()` from `useAuth()`.

### 2. Database Schema & SQL Migration
- **`supabase/migrations/20260725020000_add_nested_replies_and_upvotes.sql`**:
  - Added `parent_id uuid REFERENCES character_reviews(id) ON DELETE CASCADE` column and index on `character_reviews`.
  - Created `comment_upvotes` table (`id`, `comment_id`, `user_id`, `created_at`) with a `UNIQUE(comment_id, user_id)` constraint.
  - Configured RLS policies for `comment_upvotes`: public SELECT, authenticated INSERT (own `user_id`), and authenticated DELETE (own `user_id`).

### 3. Comment UI Auth Guard, Nested Replies & Upvoting
- **`common-hub/components/UpvoteButton.tsx`**: Created an interactive upvote button component with count display, active styling, and click handler.
- **`common-hub/components/CommentForm.tsx`**: Created a modular comment/reply form featuring star ratings, character limit counter, and Auth Guard checks.
- **`common-hub/components/CommentCard.tsx`**: Built a modular comment card supporting recursive nested reply tree rendering, thread collapse/expand, inline reply inputs, inline editing, and deletion.
- **`common-hub/components/CharacterReviewBoard.tsx`**: Updated main review board component integrating `useAuth()`, Auth Guard modal triggers for unauthenticated user actions, tree structure mapping (`parent_id`), upvote toggles with optimistic state updates, and seamless offline `localStorage` fallback with initial sample data when Supabase connection is offline.

### 4. NTE Game Detail Integration
- **`nte-hub/pages/CharacterDetail.tsx`**: Integrated `<CharacterReviewBoard>` at the bottom of NTE character detail pages, unifying comment features across HSR, WW, and NTE.
