## 2026-08-05T06:50:39Z
You are the Milestone 3 Sub-Orchestrator (R3: DiscussionForumPosting Schema Integration for CharacterReviewBoard).
Working directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m3

Objectives & Scope:
1. Read c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md, c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md, and Explorer 3 handoff at c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_survey_3\handoff.md.
2. Scope:
   - Update `common-hub/components/CharacterReviewBoard.tsx` to invoke `onCommentsLoaded` callback whenever `reviews` state updates (fetch, create, edit, delete).
   - Update `common-hub/components/SEO.tsx` to enhance `DiscussionForumPosting` schema generator with `reviewRating` and `interactionStatistic`.
   - Update `scripts/prerender-meta.js` to inject baseline static `DiscussionForumPosting` JSON-LD schema into `<head>` of prerendered character HTML files.
3. Run the iteration loop (Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate).
   - MANDATORY: Include path to ORIGINAL_REQUEST.md in all dispatches.
   - MANDATORY INTEGRITY WARNING in Worker dispatch.
   - Run 2 Reviewers, 2 Challengers, and 1 Forensic Auditor.
   - Record GATE_STATUS.md and enforce binary veto on auditor failure.
4. Record scope document in `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m3\SCOPE.md`.
5. Upon gate PASS, update status to DONE, deliver handoff.md, and notify parent 97821131-3af6-4eb5-8829-056d681f2c17.
