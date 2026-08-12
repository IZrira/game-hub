# Handoff Report — Milestone 2: SynergyDeck & Team Synergy Integration (Reviewer 2)

## 1. Observation

### Verified Files & Code Locations
- `common-hub/components/SynergyDeck.tsx`:
  - Component interface `SynergyDeckProps` accepts `characterName`, `gameId`, `theme`, `sectionNum`, and `className`.
  - Implements dark-mode glassmorphism surface (`bg-[#0f0f0f]/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[35px]`).
  - Lines 79–90: Role badge styling function `getRoleBadgeStyle`:
    ```ts
    const getRoleBadgeStyle = (role: string) => {
      if (role.includes('메인 딜러') || role.includes('딜러')) {
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      }
      if (role.includes('서브 딜러')) {
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      }
      if (role.includes('서포터') || role.includes('버퍼')) {
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      }
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    };
    ```
  - Lines 94–102: Fallback container rendered when `!parties || parties.length === 0`.
- `common-hub/utils/synergyManager.ts`:
  - Line 2: `import { HSR_CHARACTERS } from '../../hsr-hub/data/characters';`
  - Normalizes party structures across HSR (`HSR_PARTIES`), WW (`WW_PARTY_COMBINATIONS` / `WW_CHARACTER_GUIDES`), and NTE (`NTE_PARTY_COMBINATIONS` + `getNTEFallbackParty`).
  - Handles element glow mapping (`getElementGlowMapping`) for HSR, WW, and NTE elements.
  - Implements substitute calculation (`calculateSubstitutes`).
- `hsr-hub/data/characters.ts`:
  - Line 95: `export const CHARACTER_DATA: Character[] = [...]` (does NOT export `HSR_CHARACTERS`).
- `nte-hub/data/parties.ts`:
  - Contains `NTE_PARTY_COMBINATIONS` (6 predefined 4-member teams) and `getNTEFallbackParty` dynamic fallback helper.
- CharacterDetail pages:
  - `hsr-hub/pages/CharacterDetail.tsx` (line ~670): Mounted after `SkillAndEidolonSection` (Section 05).
  - `ww-hub/pages/CharacterDetail.tsx` (line ~811): Mounted after `WuwaResonanceChain` (Section 06).
  - `nte-hub/pages/CharacterDetail.tsx` (line ~857): Mounted after `NTESkillAndAwakeningSection` (Section 05).

### Build & Execution Log Evidence
- `npm run build` failed with Rollup module error:
  `common-hub/utils/synergyManager.ts (2:9): "HSR_CHARACTERS" is not exported by "hsr-hub/data/characters.ts", imported by "common-hub/utils/synergyManager.ts".`

---

## 2. Logic Chain

1. *Observation*: `common-hub/utils/synergyManager.ts` imports `HSR_CHARACTERS` from `hsr-hub/data/characters`. However, `hsr-hub/data/characters.ts` exports `CHARACTER_DATA`.
2. *Reasoning*: During production Vite build (`npm run build`), Rollup attempts to resolve `HSR_CHARACTERS` from `hsr-hub/data/characters.ts`, fails, and halts the build process with a fatal module resolution error.
3. *Observation*: In `SynergyDeck.tsx` (lines 79–90), `getRoleBadgeStyle` evaluates `if (role.includes('메인 딜러') || role.includes('딜러'))` before `if (role.includes('서브 딜러'))`.
4. *Reasoning*: The string `'서브 딜러'` contains the substring `'딜러'`. Thus, `'서브 딜러'.includes('딜러')` evaluates to `true`.
5. *Impact*: When a character's role is `'서브 딜러'`, `getRoleBadgeStyle` matches the first `if` branch and immediately returns `'bg-rose-500/15 text-rose-300 border-rose-500/30'` (the red Main DPS style). The second `if` statement checking `'서브 딜러'` is unreachable dead code. All Sub-DPS characters in the UI display red Main DPS badges instead of purple Sub-DPS badges.

---

## 3. Caveats

- No caveats. Both findings are reproducible with direct code inspection and build command outputs.

---

## 4. Conclusion & Verdict

**Verdict**: **REQUEST_CHANGES**

### Findings Summary

#### Critical Finding 1 (Build Error): Missing Named Export `HSR_CHARACTERS`
- **Location**: `common-hub/utils/synergyManager.ts` (Line 2) vs `hsr-hub/data/characters.ts` (Line 95)
- **Problem**: `synergyManager.ts` imports `HSR_CHARACTERS`, but `hsr-hub/data/characters.ts` exports `CHARACTER_DATA`. This breaks `npm run build`.
- **Suggested Fix**: Update `common-hub/utils/synergyManager.ts`:
  ```ts
  import { CHARACTER_DATA as HSR_CHARACTERS } from '../../hsr-hub/data/characters';
  ```

#### Major Finding 2 (UI Bug): Sub-DPS Role Badge Miscolored as Main DPS
- **Location**: `common-hub/components/SynergyDeck.tsx` (lines 79–86)
- **Problem**: `role.includes('딜러')` matches before `role.includes('서브 딜러')`, causing Sub-DPS roles to be styled with red Main-DPS badges instead of purple Sub-DPS badges.
- **Suggested Fix**: Re-order `role.includes('서브 딜러')` check BEFORE `role.includes('딜러')`:
  ```ts
  const getRoleBadgeStyle = (role: string) => {
    if (role.includes('서브 딜러')) {
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    }
    if (role.includes('메인 딜러') || role.includes('딜러')) {
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    }
    if (role.includes('서포터') || role.includes('버퍼')) {
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
    return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
  };
  ```

---

## 5. Verification Method

1. **Verify Build Fix**:
   - In `common-hub/utils/synergyManager.ts`, change import to `import { CHARACTER_DATA as HSR_CHARACTERS } from '../../hsr-hub/data/characters';`.
   - Run `npm run build` — confirm Vite build succeeds.
2. **Verify Role Badge Fix**:
   - Inspect `common-hub/components/SynergyDeck.tsx` lines 79–90.
   - Swap condition order so `role.includes('서브 딜러')` comes first.
   - Confirm `getRoleBadgeStyle('서브 딜러')` evaluates to purple badge styling.
