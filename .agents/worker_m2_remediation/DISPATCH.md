## 2026-08-05T06:52:12Z
<USER_REQUEST>
You are Worker 2 (Remediation) for Milestone 2 (SynergyDeck & Team Synergy Integration).
Your working directory is `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m2_remediation`.

REQUIRED CONTEXT & FILE PATHS TO READ:
1. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md`
2. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md`
3. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m2\SCOPE.md`
4. Reviewer 2 Feedback: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\reviewer_m2_2_r2\handoff.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

REMEDIATION TASK:
1. Open `common-hub/components/SynergyDeck.tsx`.
2. Inspect `getRoleBadgeStyle` function (around line 79-90).
3. Fix the matching order: place `role.includes('서브 딜러')` OR `role.toLowerCase().includes('sub')` BEFORE `role.includes('딜러')` so that Sub-DPS roles are correctly assigned purple Sub-DPS badge styles instead of matching `'딜러'` and receiving red Main-DPS styles.
4. Verify all role styling options (Main DPS red, Sub DPS purple, Support blue/cyan, Sustain/Healer green/emerald, etc.).
5. Run build/type check (`npx tsc --noEmit` or `npm run lint`) using `run_command` to verify zero errors.
6. Record implementation and verification results in `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m2_remediation\handoff.md`.

</USER_REQUEST>
