# Requirements R4 & Build/Security Readiness Analysis Report

**Explorer**: `teamwork_preview_explorer_m1_3`  
**Date**: 2026-07-25  
**Target Scope**: Requirement R4 (Admin Pin & Moderation) & Build/Security Readiness  
**Target Files Inspected**:
- `common-hub/components/CharacterReviewBoard.tsx`
- `common-hub/components/CommentCard.tsx`
- `common-hub/components/CommentForm.tsx`
- `common-hub/lib/supabase.ts`
- `package.json`
- `tsconfig.json`
- `.agents/AGENTS.md`
- `PROJECT.md`
- `supabase/migrations/*.sql`

---

## 1. Requirement R4 Analysis: Admin & Moderation

### 1.1 Admin Pin (`is_pinned: boolean`)

#### Current Implementation State
- **Data Model**: `is_pinned` is **missing** from the `Review` interface defined in `common-hub/components/CommentCard.tsx`.
- **Sorting Logic**: In `common-hub/components/CharacterReviewBoard.tsx`, root comments are retrieved and filtered into `rootReviews` ordered solely by `created_at` descending. There is no sorting logic prioritizing pinned comments (`is_pinned === true`).
- **UI Component**: `CommentCard.tsx` has no Pin button, badge, or visual indicator for pinned comments.
- **State & Backend Sync**: `CharacterReviewBoard.tsx` has no handler to toggle pin status (`handleTogglePin`), nor is there any Supabase call or LocalStorage fallback handling `is_pinned`.
- **Database Schema**: No `is_pinned` column exists in the initial SQL migrations in `supabase/migrations/`.

#### Required Modifications
1. **Interface Contract Update (`CommentCard.tsx`)**:
   Add `is_pinned?: boolean` to `Review` interface.
2. **Sorting Logic Update (`CharacterReviewBoard.tsx`)**:
   Update `rootReviews` calculation to place pinned comments at top:
   ```typescript
   const rootReviews = useMemo(() => {
     const roots = reviews.filter((r) => !r.parent_id);
     return roots.sort((a, b) => {
       if (a.is_pinned && !b.is_pinned) return -1;
       if (!a.is_pinned && b.is_pinned) return 1;
       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
     });
   }, [reviews]);
   ```
3. **UI Badge & Pin Toggle Action (`CommentCard.tsx`)**:
   - Render a Pin icon / "Pinned by Admin" badge for comments where `review.is_pinned` is true.
   - Provide an Admin Pin toggle button for authorized user/admin roles.
4. **State Management & Supabase / LocalStorage Handler (`CharacterReviewBoard.tsx`)**:
   - Implement `handleTogglePin(commentId: string)`:
     - Update Supabase: `supabase.from('character_reviews').update({ is_pinned: !current }).eq('id', commentId)`
     - Update LocalStorage fallback array.
5. **Database Migration (`supabase/migrations/`)**:
   - Include `ALTER TABLE character_reviews ADD COLUMN IF NOT EXISTS is_pinned boolean DEFAULT false;` in the unified migration script.

---

### 1.2 Report & Auto-Hide (`report_count`, Duplicate Prevention, Content Blinding)

#### Current Implementation State
- **Data Model**: `report_count` and `user_has_reported` fields are **missing** from `Review` interface in `CommentCard.tsx`.
- **Content Blinding**: No blinding logic exists. Comments display raw `comment_text` unconditionally.
- **Blinding String Requirement**: The exact Korean requirement string `"유저들의 신고로 숨김 처리된 댓글입니다"` is **NOT** implemented anywhere in the codebase.
- **Duplicate Prevention**: No mechanisms or user tracking tables exist to prevent a single user from reporting the same comment multiple times.
- **UI Component**: `CommentCard.tsx` lacks a Report button and reported state indicator.
- **Database Schema**: No `report_count` column or `comment_reports` table exists in `supabase/migrations/`.

#### Required Modifications
1. **Interface Contract Update (`CommentCard.tsx`)**:
   Add `report_count?: number` and `user_has_reported?: boolean` to `Review` interface.
2. **Content Blinding Logic (`CommentCard.tsx`)**:
   Replace comment text with blinded message when `(review.report_count || 0) >= 3`:
   ```tsx
   {(review.report_count || 0) >= 3 ? (
     <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs italic font-medium my-2">
       유저들의 신고로 숨김 처리된 댓글입니다
     </div>
   ) : (
     <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm pl-1 my-2">
       {review.comment_text}
     </p>
   )}
   ```
3. **Report Button & Auth Guard (`CommentCard.tsx`)**:
   - Add a Report button (using `Flag` or `AlertTriangle` icon from `lucide-react`).
   - Trigger `onRequireAuth()` if user is not logged in.
   - Disable or change appearance if `review.user_has_reported` is `true`.
4. **Report Handler & Duplicate Report Prevention (`CharacterReviewBoard.tsx`)**:
   - Implement `handleReportComment(commentId: string)`:
     - Auth check: require `user`.
     - Check if user already reported `commentId`.
     - If Supabase: insert into `comment_reports (comment_id, user_id)` (with UNIQUE constraint) and increment `report_count` on `character_reviews`.
     - If offline/local fallback: store reported set in `localStorage` (`rira_local_reports_${gameId}_${characterId}`), increment local `report_count`.
5. **Database Migration (`supabase/migrations/`)**:
   - Column addition: `ALTER TABLE character_reviews ADD COLUMN IF NOT EXISTS report_count integer DEFAULT 0;`
   - Table creation for duplicate prevention:
     ```sql
     CREATE TABLE IF NOT EXISTS comment_reports (
       id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
       comment_id uuid NOT NULL REFERENCES character_reviews(id) ON DELETE CASCADE,
       user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
       created_at timestamptz DEFAULT now(),
       UNIQUE (comment_id, user_id)
     );
     ```
   - RLS Policies for `comment_reports`:
     - Public SELECT access
     - Authenticated INSERT (`auth.uid() = user_id`)

---

## 2. Build & Security Readiness Analysis

### 2.1 Dependency & Script Audit (`package.json`)
- **Framework & Libraries**:
  - React `^19.2.4` and React DOM `^19.2.4`
  - React Router `^8.3.0`
  - `@supabase/supabase-js` `^2.106.2`
  - `lucide-react` `^0.564.0`
  - `tailwindcss` `^4.2.2` & `@tailwindcss/vite` `^4.2.2`
  - `typescript` `~5.8.2`
- **Build Scripts**:
  - `dev`: `vite`
  - `build`: `node scripts/generate-sitemap.js && vite build && node scripts/prerender-meta.js`
  - `lint`: `tsc --noEmit`
- **Audit Findings**: Dependencies are modern and compatible with React 19. All scripts are intact.

### 2.2 TypeScript Configuration (`tsconfig.json`)
- **Key Options**:
  - `target`: `ES2022`
  - `moduleResolution`: `bundler`
  - `noEmit`: `true`
  - `jsx`: `react-jsx`
  - `paths`: `@/* -> ./*`
- **Audit Findings**: Clean, standard TypeScript configuration. No compiler error risks observed.

### 2.3 Security Compliance Mapping (`.agents/AGENTS.md`)

| Role | Security Responsibility | Codebase Finding & Compliance Status |
|---|---|---|
| **Product Manager (@pm)** | Filter PII & external API abuse; no code modifications | Compliant. Review structures store public nicknames (`nickname`) and auth UUID (`user_id`). |
| **Developer Engineer (@engineer)** | Secure coding; no XSS/Injection/Path Traversal; NO hardcoded secrets; use `.env` | Compliant. `common-hub/lib/supabase.ts` reads `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` via `import.meta.env`. No hardcoded API keys found. React JSX prevents XSS. |
| **QA Engineer (@qa)** | Dependency security audit (`npm audit`); React Router v8 manual testing rule | Must enforce: Before committing React Router v8 changes, developer/QA must run `npm run dev` and perform manual route validation. |
| **DevOps Master (@devops)** | Prevent unauthorized privileges (`sudo`) and exfiltration (`curl`, `wget`); git commit checks | Compliant. `.env` is listed in `.gitignore`. No sensitive tokens tracked in git. |

---

## 3. Summary Gap Matrix

| Feature / Requirement | Current Status | Missing / Required Changes | Affected Files |
|---|---|---|---|
| **Admin Pin (`is_pinned`)** | Not Implemented | Interface prop `is_pinned?: boolean`, sorting priority in `rootReviews`, Pin UI badge & toggle button, `handleTogglePin` handler, DB column `is_pinned` | `CommentCard.tsx`, `CharacterReviewBoard.tsx`, `supabase/migrations/` |
| **Report Button & Count** | Not Implemented | Interface props `report_count?: number` & `user_has_reported?: boolean`, Report UI button with auth guard, `handleReportComment` handler | `CommentCard.tsx`, `CharacterReviewBoard.tsx` |
| **Content Blinding** | Not Implemented | Blinding condition `(report_count >= 3)`, Korean text `"유저들의 신고로 숨김 처리된 댓글입니다"` | `CommentCard.tsx` |
| **Duplicate Report Prevention** | Not Implemented | Tracking per user (`comment_reports` table & LocalStorage reported set) | `CharacterReviewBoard.tsx`, `supabase/migrations/` |
| **Database Migration** | Partial | Needs updated SQL migration containing `is_pinned`, `report_count`, `comment_reports` table & RLS policies | `supabase/migrations/` |
| **Build & Security Readiness** | Ready / Compliant | `package.json` & `tsconfig.json` are valid. Environment variables strictly use `import.meta.env` | `common-hub/lib/supabase.ts`, `.gitignore` |
