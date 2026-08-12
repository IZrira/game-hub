## 2026-08-05T17:10:08Z
You are teamwork_preview_worker for Milestone 3: R3 Resolve 404 Resource Errors.
Your working directory is: c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m3_r1
Original User Request: c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md
Scope Document: c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md
Explorer Handoff: c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_explorer_r3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Task:
1. Read ORIGINAL_REQUEST.md, PROJECT.md, and the Explorer Handoff report.
2. Implement Requirement R3:
   a. Update `common-hub/data/games.ts`:
      - Set `bannerImage` for game `ww` to `/assets/banners/ww_placeholder.webp`.
      - Set `bannerImage` for game `nte` to `/assets/banners/ww_placeholder.webp`.
      - Set `bannerImage` for game `hsr` to `/assets/banners/hsr_placeholder.webp`.
   b. Create a clean local placeholder asset at `/public/assets/unknown.webp` (a valid WebP image file).
   c. Update `common-hub/components/LazyImage.tsx`:
      - Set default `fallbackSrc = '/assets/unknown.webp'`.
      - Implement state-based error guard (`hasError`) so that if the fallback also fails or onError triggers, it does NOT loop endlessly.
   d. Update `common-hub/components/GameDashboard.tsx`:
      - Update fallback image paths in `onError` handlers (lines 221, 268) from the remote CDN URL to `/assets/unknown.webp`.
   e. Update `common-hub/components/GalleryModals.tsx`:
      - Update fallback image path in `onError` handler (line 150) from remote CDN URL to `/assets/unknown.webp`.
   f. Also check `common-hub/pages/Home.tsx` if it contains any outdated hardcoded banner paths, updating them to use `game.bannerImage`.
3. Build & Test Verification:
   - Run `npm run build` (or equivalent build command) to ensure the TypeScript build passes with zero errors.
   - Run any available tests.
4. Deliver your handoff report to `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m3_r1\handoff.md` and send a completion message to parent sub-orchestrator. Include command outputs and exact changes made.
