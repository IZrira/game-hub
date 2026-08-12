## 2026-08-05T02:06:16Z
You are Worker 1 for Milestone 2 (SynergyDeck & Team Synergy Integration).
Your working directory is `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m2`.

REQUIRED CONTEXT & FILE PATHS TO READ:
1. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md`
2. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md`
3. `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m2\SCOPE.md`
4. Explorer 1 Handoff & Analysis: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_1\handoff.md` and `analysis.md`
5. Explorer 2 Handoff & Analysis: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_2\handoff.md` and `analysis.md`
6. Explorer 3 Handoff & Analysis: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_3\handoff.md` and `analysis.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

TASK & RESPONSIBILITIES:
1. Create `nte-hub/data/parties.ts`:
   - Define `NTE_PARTY_COMBINATIONS` for NTE characters (`구원`, `민트`, `치즈`, `호토리`, `아들러`, `라크리모사`).
   - Implement role/attribute fallback matching helper (`getNTEFallbackParty`).
2. Create `common-hub/utils/synergyManager.ts`:
   - Implement `getRecommendedParties(gameId, characterNameOrId)` normalizing HSR (`HSR_PARTIES`), WW (`WW_PARTY_COMBINATIONS`), and NTE (`NTE_PARTY_COMBINATIONS` + fallback).
   - Implement `getElementGlowMapping(gameId, attribute)` for dynamic element glow styles and colors.
   - Implement `calculateSubstitutes(member, gameId)` for substitute recommendations.
3. Create `common-hub/components/SynergyDeck.tsx`:
   - Dark mode glassmorphism UI (`bg-[#0f0f0f]/40 backdrop-blur-xl border-white/10 shadow-2xl rounded-[35px]`).
   - Integration with `SectionHeader`.
   - Tab-based party selection when multiple recommended parties exist.
   - 4-member (HSR/NTE) / 3-member (WW) grid portraits, LazyImage loading with `getCharacterArtPath`, role badges.
   - Substitute recommendation toggle card/drawer (`+ 대체 N명`).
   - Dynamic element glow background accent.
4. Mount `SynergyDeck` on CharacterDetail pages:
   - `hsr-hub/pages/CharacterDetail.tsx` (Section 05: Recommended Synergy / Team Formations)
   - `ww-hub/pages/CharacterDetail.tsx` (Section 06: Team Formations & Synergies)
   - `nte-hub/pages/CharacterDetail.tsx` (Section 05: Recommended Team Formations)
5. Run build and type check (e.g. `npm run build` or `npx tsc --noEmit` or `npm run lint`) using `run_command` tool to verify zero errors.
6. Write a complete handoff report to `c:\Users\User\Desktop\rira game hub\game-hub\.agents\worker_m2\handoff.md` detailing all implemented files, code changes, and build/test verification results.
