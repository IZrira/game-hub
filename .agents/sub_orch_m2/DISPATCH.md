# DISPATCH

## 2026-08-05T02:04:38Z
You are the Milestone 2 Sub-Orchestrator (R2: Recommended Team Synergy UI Card / SynergyDeck for HSR, WW, NTE).
Working directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m2

Objectives & Scope:
1. Read c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md, c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md, and Explorer 2 handoff at c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_survey_2\handoff.md.
2. Scope:
   - Create `common-hub/components/SynergyDeck.tsx` (dark mode, glassmorphism aesthetics, member portraits/roles, substitute cards, element glows).
   - Create `common-hub/utils/synergyManager.ts` and `nte-hub/data/parties.ts` to source team compositions for HSR (`HSR_PARTIES`), WW (`WW_PARTY_COMBINATIONS`), and NTE (`NTE_PARTY_COMBINATIONS` + role/attribute fallback).
   - Mount `SynergyDeck` on `hsr-hub/pages/CharacterDetail.tsx` (Sec 05), `ww-hub/pages/CharacterDetail.tsx` (Sec 06), and `nte-hub/pages/CharacterDetail.tsx` (Sec 05).
3. Run the iteration loop (Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate).
   - MANDATORY: Include path to ORIGINAL_REQUEST.md in all dispatches.
   - MANDATORY INTEGRITY WARNING in Worker dispatch.
   - Run 2 Reviewers, 2 Challengers, and 1 Forensic Auditor.
   - Record GATE_STATUS.md and enforce binary veto on auditor failure.
4. Record scope document in `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m2\SCOPE.md`.
5. Upon gate PASS, update status to DONE, deliver handoff.md, and notify parent 97821131-3af6-4eb5-8829-056d681f2c17.
