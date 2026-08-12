# Handoff Report: Milestone 2 (Explorer 2 - Data Sourcing & Synergy Manager)

## 1. Observation
- **Required Context & Files Read**:
  - `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md:86-87`
  - `c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md:16-17, 45-47`
  - `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m2\SCOPE.md:1-18`
  - `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_survey_2\handoff.md:25-28, 54-59`

- **HSR Party Structure**:
  - `hsr-hub/data/parties/index.ts:1-18` defines `PartyMember` and `PartyCombination` (4 members per party with `substitutes` array).
  - `hsr-hub/data/parties/index.ts:111-116` exports `HSR_PARTIES` combining party arrays from `follow_up`, `elation`, `aoe`, `memory`, `single`, `break`, and `dot`.

- **WW Party & Guide Structure**:
  - `ww-hub/data/parties.ts:2-16, 18-31` defines `PartyMember` and `PartyCombination` (3 members per party), exporting `WW_PARTY_COMBINATIONS`.
  - `ww-hub/data/guides.ts:37` defines `WuwaCharacterGuide` containing `synergyCharacters: string[]` (e.g. Jiyan synergy with Iuno, Linne, The Shorekeeper, Mortefi).
  - `ww-hub/data/characters.ts:59-118` exports `WW_CHARACTERS` with attribute classifications.

- **NTE Data Structure & Gap**:
  - `nte-hub/data/index.ts:3-94` exports `NTE_CHARACTERS` containing 6 characters (`구원`, `민트`, `치즈`, `호토리`, `아들러`, `라크리모사`) with attributes (`령`, `빛`, `주`, `암`).
  - Search via `find_by_name` confirmed `nte-hub/data/parties.ts` does **not** exist yet.

- **Synergy Manager Utility Specification**:
  - Target file: `common-hub/utils/synergyManager.ts` (currently non-existent, ready for implementation).

---

## 2. Logic Chain
1. **Observation**: HSR (`HSR_PARTIES`) and WW (`WW_PARTY_COMBINATIONS` + `WW_CHARACTER_GUIDES`) have structured datasets for party recommendations, while NTE lacks a party data file.
2. **Reasoning**: A new dataset file `nte-hub/data/parties.ts` must be created containing `NTE_PARTY_COMBINATIONS` (defining 3-member combinations for the 6 NTE characters) along with an attribute/role fallback matching algorithm (`getNTEFallbackParty`).
3. **Observation**: HSR uses 4-member teams with nested substitute lists, WW uses 3-member teams with guide synergies, and NTE uses 3-member teams.
4. **Reasoning**: `common-hub/utils/synergyManager.ts` should normalize game-specific structures into `UnifiedParty` and `UnifiedPartyMember` interfaces, providing a unified lookup function `getRecommendedParties(gameId, characterNameOrId)` that handles HSR, WW, and NTE seamlessly.
5. **Observation**: Character detail pages require visual feedback based on element attributes (e.g. Fire red glow, Quantum purple glow, Spirit mint glow).
6. **Reasoning**: `synergyManager.ts` should expose `getElementGlowMapping(gameId, attribute)` returning color codes, glow shadows, and badge background styles for HSR, WW, and NTE attributes.
7. **Observation**: Users viewing a party recommendation may not own every character in that party.
8. **Reasoning**: `synergyManager.ts` should expose `calculateSubstitutes(member, gameId)` returning explicit substitutes or dynamically calculated role/attribute substitutes.

---

## 3. Caveats
- NTE is an upcoming title with 6 initial character definitions (`nte-hub/data/index.ts`); pre-defined parties cover all 6 characters, and the fallback algorithm handles future additions.
- This investigation was read-only; no source files outside `.agents/explorer_m2_2/` were created or modified.

---

## 4. Conclusion
Data structures and requirements for Milestone 2 are fully analyzed and documented:
1. `nte-hub/data/parties.ts` is planned with `NTE_PARTY_COMBINATIONS` and `getNTEFallbackParty`.
2. `common-hub/utils/synergyManager.ts` function signatures and lookup logic are fully specified (`getRecommendedParties`, `getElementGlowMapping`, `calculateSubstitutes`).
3. Comprehensive technical analysis is recorded in `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_2\analysis.md`.

---

## 5. Verification Method
1. Inspect analysis report: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_2\analysis.md`.
2. Verify source data files referenced:
   - `hsr-hub/data/parties/index.ts`
   - `ww-hub/data/parties.ts`
   - `ww-hub/data/guides.ts`
   - `nte-hub/data/index.ts`
3. Upon implementation, run build verification:
   ```bash
   npm run build
   ```
