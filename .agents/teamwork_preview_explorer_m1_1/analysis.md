# Requirements R1 & R5 Exploration & Gap Analysis Report

## Summary of Findings

- **Requirement R1 (Auth & RLS)**: **Fully Implemented in UI/Context & Core RLS**.
  - `common-hub/context/AuthContext.tsx` handles Supabase Google and Discord OAuth sign-in (`signInWithOAuth`), session restoration via hash URL parameter parsing (`access_token`, `refresh_token`), and auth state subscription (`onAuthStateChange`).
  - `common-hub/components/LoginModal.tsx` provides Discord and Google login modal triggers, rendered via React Portal.
  - Auth guards in `CommentForm.tsx`, `CommentCard.tsx`, and `CharacterReviewBoard.tsx` reliably intercept unauthenticated user actions (commenting, replying, upvoting, editing, deleting) and open `LoginModal`.
  - Author ownership checks (`auth.uid() = user_id`) are enforced both in UI (`isOwnReview = user && review.user_id === user.id`) and in Supabase RLS policies (`20260725010000_update_reviews_auth.sql`).

- **Requirement R5 (Database Schema & RLS)**: **Partially Implemented (Schema Migration Gaps Identified)**.
  - Existing migration files (`20260725000000_create_character_reviews.sql`, `20260725010000_update_reviews_auth.sql`, `20260725020000_add_nested_replies_and_upvotes.sql`) contain core fields (`id`, `user_id`, `parent_id`, `game_id`, `character_id`, `nickname`, `rating`, `comment_text`, `created_at`) and `comment_upvotes` table.
  - **Gaps Identified for R5**:
    1. Field Naming & Missing Columns:
       - Specification calls for `content` (currently named `comment_text` in migration).
       - Missing columns in `character_reviews`: `media_urls` (text[]), `like_count` (integer DEFAULT 0), `report_count` (integer DEFAULT 0), `is_pinned` (boolean DEFAULT false), `updated_at` (timestamptz DEFAULT now()).
    2. Duplicate Report Moderation Table:
       - Missing `comment_reports` table for R4 duplicate report tracking (`UNIQUE(comment_id, user_id)`).
    3. Consolidated SQL Migration:
       - A comprehensive migration script `20260725030000_full_schema_and_moderation.sql` is needed to finalize the database schema and RLS policies.

---

## Detailed Evidence & Analysis

### 1. Requirement R1: Auth & RLS Integration

#### 1.1 Supabase Social Auth Flow (Google, Discord)
- **Source**: `common-hub/context/AuthContext.tsx`
  - **Lines 9-13, 94-108**: Exposes `signInWithProvider(provider: 'google' | 'discord')` calling `supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } })`.
  - **Lines 37-68**: Recovers session tokens from URL hash when returning from OAuth redirects (`access_token` and `refresh_token`).
  - **Lines 78-91**: Listens to auth state changes using `supabase.auth.onAuthStateChange`.
- **Source**: `common-hub/components/LoginModal.tsx`
  - **Lines 78-97**: Renders branded buttons for Discord (`signInWithProvider('discord')`) and Google (`signInWithProvider('google')`).
  - **Lines 112**: Appends modal to body via React Portal (`createPortal(modalContent, document.body)`).

#### 1.2 Auth Guard Triggering `LoginModal` on Unauthenticated Action
- **Comment Creation**: `common-hub/components/CommentForm.tsx` (lines 35-38, 115-121, 143-148)
  - Unauthenticated users can view comments, but clicking the textarea overlay or form submit triggers `onRequireAuth()` -> `openLoginModal()`.
- **Replying to Comments**: `common-hub/components/CommentCard.tsx` (lines 76-82)
  - `handleReplyClick` checks `if (!user) { onRequireAuth(); return; }`.
- **Upvoting Comments**: `common-hub/components/CharacterReviewBoard.tsx` (lines 200-204)
  - `handleToggleUpvote` checks `if (!user) { openLoginModal(); return; }`.
- **Editing / Deleting Comments**: `common-hub/components/CharacterReviewBoard.tsx` (lines 260-264, 285-289)
  - `handleEdit` and `handleDelete` check `if (!user) { openLoginModal(); return; }`.

#### 1.3 Author-Only Ownership Checks (`auth.uid() = user_id`)
- **UI Guard**: `common-hub/components/CommentCard.tsx` (lines 53, 91-112)
  - `const isOwnReview = user && review.user_id === user.id;`
  - Edit (`<Edit3>`) and Delete (`<Trash2>`) controls are rendered **only** when `isOwnReview` is true.
- **Client Query Guard**: `common-hub/components/CharacterReviewBoard.tsx` (lines 271-272, 296-297)
  - `.update(...).eq('id', id).eq('user_id', user.id)`
  - `.delete().eq('id', id).eq('user_id', user.id)`
- **RLS Policies**: `supabase/migrations/20260725010000_update_reviews_auth.sql` (lines 17-33)
  - INSERT: `CREATE POLICY "Allow authenticated insert" ON character_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);`
  - UPDATE: `CREATE POLICY "Allow users to update own reviews" ON character_reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`
  - DELETE: `CREATE POLICY "Allow users to delete own reviews" ON character_reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);`

---

### 2. Requirement R5: Database Schema & Migration Analysis

#### 2.1 Current Migration Files Audit
- `supabase/migrations/20260425154702_create_characters_table.sql`: Empty placeholder (0 bytes).
- `supabase/migrations/20260725000000_create_character_reviews.sql`:
  ```sql
  CREATE TABLE IF NOT EXISTS character_reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    game_id text NOT NULL,
    character_id text NOT NULL,
    nickname text NOT NULL,
    rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment_text text NOT NULL
  );
  ```
- `supabase/migrations/20260725010000_update_reviews_auth.sql`:
  Adds `user_id uuid REFERENCES auth.users(id)` and RLS policies.
- `supabase/migrations/20260725020000_add_nested_replies_and_upvotes.sql`:
  Adds `parent_id uuid REFERENCES character_reviews(id) ON DELETE CASCADE` and `comment_upvotes` table.

#### 2.2 Schema Gap Analysis against R5 Specification

| Requirement R5 Specified Field / Feature | Current Status in `supabase/migrations/*.sql` | Gap Description & Action Item |
|------------------------------------------|-----------------------------------------------|-------------------------------|
| `id` (uuid) | Present (`id uuid PRIMARY KEY DEFAULT gen_random_uuid()`) | Fully compliant |
| `user_id` (uuid) | Present (`REFERENCES auth.users(id)`) | Fully compliant |
| `parent_id` (uuid) | Present (`REFERENCES character_reviews(id) ON DELETE CASCADE`) | Fully compliant |
| `content` / `comment_text` | Named `comment_text` in migration | Add column alias or migration update for `content` compatibility |
| `media_urls` (text[]) | **Missing** | Add `media_urls text[] DEFAULT '{}'` to `character_reviews` |
| `like_count` (integer) | Computed via `comment_upvotes` count | Add `like_count integer DEFAULT 0` column & sync trigger |
| `report_count` (integer) | **Missing** | Add `report_count integer DEFAULT 0` to `character_reviews` |
| `is_pinned` (boolean) | **Missing** | Add `is_pinned boolean DEFAULT false` to `character_reviews` |
| `created_at` (timestamptz) | Present (`DEFAULT now()`) | Fully compliant |
| `updated_at` (timestamptz) | **Missing** | Add `updated_at timestamptz DEFAULT now()` & update trigger |
| `comment_reports` table & RLS | **Missing** | Create `comment_reports` table (`comment_id`, `user_id`, UNIQUE) for R4 duplicate prevention |

---

## Recommended SQL Migration Patch (Proposed Creation)

Below is the proposed SQL patch `proposed_20260725030000_full_schema_and_moderation.sql` to be created by the implementation worker in `supabase/migrations/`:

```sql
-- Migration: Add media_urls, like_count, report_count, is_pinned, updated_at, content column sync & comment_reports table

-- 1. Add missing columns to character_reviews
ALTER TABLE character_reviews
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS media_urls text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS like_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS report_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_pinned boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Sync comment_text to content if content is null
UPDATE character_reviews SET content = comment_text WHERE content IS NULL;

-- 2. Create comment_reports table for duplicate report prevention
CREATE TABLE IF NOT EXISTS comment_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid NOT NULL REFERENCES character_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason text DEFAULT 'inappropriate',
  created_at timestamptz DEFAULT now(),
  UNIQUE (comment_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_comment_reports_comment_id ON comment_reports(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_reports_user_id ON comment_reports(user_id);

-- 3. Enable RLS on comment_reports
ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for comment_reports
DROP POLICY IF EXISTS "Allow authenticated users to insert reports" ON comment_reports;
CREATE POLICY "Allow authenticated users to insert reports"
  ON comment_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow users to read own reports" ON comment_reports;
CREATE POLICY "Allow users to read own reports"
  ON comment_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```
