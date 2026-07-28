# Execution Plan: Supabase Auth & Advanced Comments

## Objective
Integrate Supabase Social Auth (Google, Discord) for comment authentication and implement advanced comment features (nested replies, upvoting, auth guards, real-time sync / state) for Rira Game Hub.

## Milestones

### Milestone 1: Exploration & Codebase Analysis
- Spawn `teamwork_preview_explorer` (Explorer 1, 2, 3) to analyze:
  - Existing Supabase setup, `.env` file structure / variables, Supabase client initialization.
  - Current comment component implementation, router configuration, state management, and page integration.
  - Dependency status (`@supabase/supabase-js`, `@supabase/auth-helpers-react` or similar, UI icons, etc.).
- Deliverable: Analysis report outlining current architecture and proposed component & DB schema / mock state adjustments.

### Milestone 2: Implementation (Supabase Auth & Social Login)
- Spawn `teamwork_preview_worker` to:
  - Implement Supabase Auth setup with Google and Discord OAuth providers.
  - Create/enhance Auth Context / Hook and Login Modal / Buttons UI.
  - Restrict comment submission so unauthenticated users cannot submit comments, showing login prompt instead.
- Deliverable: Supabase Social Auth integrated, user session available, auth guard on comment submit form.

### Milestone 3: Implementation (Advanced Comment Features)
- Spawn `teamwork_preview_worker` to:
  - Add nested replies support (1-level or multi-level reply threads).
  - Add upvote/like functionality per comment with persistable or stateful counts and user reaction tracking.
  - Format relative timestamps, avatar display (from OAuth user metadata or default), and empty state handling.
  - Run `npm run build` to verify clean TypeScript compilation.
- Deliverable: Advanced comment feature set integrated cleanly into game detail pages / comment sections.

### Milestone 4: Code Review & Verification
- Spawn `teamwork_preview_reviewer` and `teamwork_preview_challenger` to:
  - Perform static & dynamic review of code quality, security rules (no hardcoded secrets, no path traversal/XSS), and edge cases.
  - Run build checks (`npm run build`) and test execution.
- Deliverable: Verification report confirming build & functionality.

### Milestone 5: Forensic Integrity Audit & Final Verification
- Spawn `teamwork_preview_auditor` to:
  - Verify zero cheating/facade code, genuine implementation of auth UI and comment logic.
  - Ensure security compliance with `.agents/AGENTS.md`.
- Deliverable: Auditor verdict report.
