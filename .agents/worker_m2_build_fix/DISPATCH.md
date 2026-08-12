## 2026-08-05T06:54:45Z
<USER_REQUEST>
You are Worker 3 (Build Fix Worker) for Milestone 2 (SynergyDeck & Team Synergy Integration).
Your working directory is `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m2_build_fix`.

REQUIRED CONTEXT & FILE PATHS TO READ:
1. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md`
2. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md`
3. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m2\SCOPE.md`
4. Reviewer Findings: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\reviewer_m2_1_r2\handoff.md` and `c:\Users\User\Desktop\rira game hub\game-hub\.agents\reviewer_m2_2_r2\handoff.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

TASK & RESPONSIBILITIES:
1. Open `common-hub/utils/synergyManager.ts`.
2. Inspect line 2 import statement for `hsr-hub/data/characters`.
3. Fix the import: `hsr-hub/data/characters.ts` exports `CHARACTER_DATA`, so change line 2 to:
   `import { CHARACTER_DATA as HSR_CHARACTERS } from '../../hsr-hub/data/characters';` (or export alias `export const HSR_CHARACTERS = CHARACTER_DATA;` in `hsr-hub/data/characters.ts`).
4. Run `npm run build` using `run_command` to verify that Vite bundling and TypeScript compilation pass with 0 errors!
5. Record changes and build verification log in `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m2_build_fix\handoff.md`.

</USER_REQUEST>
