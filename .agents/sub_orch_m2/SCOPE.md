# Scope: Milestone 2 (R2: Recommended Team Synergy UI Card / SynergyDeck for HSR, WW, NTE)

## Objective
Implement reusable `SynergyDeck` UI component in `common-hub/components/SynergyDeck.tsx` and synergy helper `common-hub/utils/synergyManager.ts` along with `nte-hub/data/parties.ts`. Mount `SynergyDeck` onto CharacterDetail pages for HSR, WW, and NTE.

## Scope & Components
1. `common-hub/components/SynergyDeck.tsx`:
   - Reusable dark mode glassmorphism UI card for team synergies.
   - Member portraits/images, role badges, substitute recommendations/cards, element glow accents.
2. `common-hub/utils/synergyManager.ts`:
   - Data sourcing & formatting helper for team compositions for HSR (`HSR_PARTIES`), WW (`WW_PARTY_COMBINATIONS`), and NTE (`NTE_PARTY_COMBINATIONS` + role/attribute fallback).
3. `nte-hub/data/parties.ts`:
   - NTE team compositions (`NTE_PARTY_COMBINATIONS`) with fallback mechanisms based on role and attribute match.
4. Mount Points:
   - `hsr-hub/pages/CharacterDetail.tsx` (Section 05: Recommended Synergy / Team Formations)
   - `ww-hub/pages/CharacterDetail.tsx` (Section 06: Team Formations & Synergies)
   - `nte-hub/pages/CharacterDetail.tsx` (Section 05: Recommended Team Formations)

## Status
- Status: IN_PROGRESS
