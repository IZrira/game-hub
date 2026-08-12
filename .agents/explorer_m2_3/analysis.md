# Explorer 3 Analysis: Page Mounting & Integration for SynergyDeck

## 1. Overview
This analysis defines the precise mounting requirements, layout structures, imports, prop passing contracts, and section numberings for integrating the reusable `SynergyDeck` component into the `CharacterDetail` pages across all three game hubs:
1. Honkai: Star Rail (`hsr-hub/pages/CharacterDetail.tsx`)
2. Wuthering Waves (`ww-hub/pages/CharacterDetail.tsx`)
3. Neverness to Everness (`nte-hub/pages/CharacterDetail.tsx`)

---

## 2. Character Detail Page Audit & Layout Structures

### A. Honkai: Star Rail (`hsr-hub/pages/CharacterDetail.tsx`)
- **File Location**: `hsr-hub/pages/CharacterDetail.tsx` (776 lines)
- **Current Layout & Section Hierarchy**:
  - `01` - Basic Stats (Profile Header Area: Lv 1..80 slider, HP, ATK, DEF, SPD, Taunt, Energy)
  - `02` - Profile / Story (Profile Header Area: Collapsible character introduction)
  - `03` - Metadata Card: Line 587 (`<SectionHeader num="03" title={t("캐릭터 프로필 & 성우 정보")} theme={theme} expanded={isMetadataExpanded} onToggle={...} />`)
  - `04` - Materials Card: Line 628 (`<SectionHeader num="04" title={t("육성 재료")} theme={theme} />`)
  - Sub-component: Line 659 (`<SkillAndEidolonSection char={char} gender={gender} setGender={setGender} theme={theme} renderContent={renderTextWithHighlights} setTooltip={setTooltip} />`)
    - Internal Sections: `05` (스킬 정보), `06` (기억 정령 - conditional), `06`/`07` (추가 능력 & 속성 보너스), `07`/`08` (성흔).
  - Authorship Note: Line 670 (`<section className="mt-12 pt-8 border-t border-white/5">`)
  - Review Board: Line 701 (`<CharacterReviewBoard characterId={char?.id || charName || ''} gameId={gameId || 'hsr'} onCommentsLoaded={setCommentsData} />`)
- **Target Synergy Deck Mounting Section**:
  - Target: **Section 05 - Recommended Synergy / Team Formations** (Top-level section after `SkillAndEidolonSection` and before E-E-A-T Authorship Note at line 670).
- **Import Needed**:
  ```tsx
  import SynergyDeck from '../../common-hub/components/SynergyDeck';
  ```
- **JSX Mounting Code**:
  ```tsx
  {/* Recommended Synergy / Team Formations */}
  <SynergyDeck 
    characterName={char?.id || charName || ''} 
    gameId={gameId || 'hsr'} 
    theme={theme} 
  />
  ```

---

### B. Wuthering Waves (`ww-hub/pages/CharacterDetail.tsx`)
- **File Location**: `ww-hub/pages/CharacterDetail.tsx` (901 lines)
- **Current Layout & Section Hierarchy**:
  - `01` - Basic Stats (Profile Header Area: Lv 1..90 slider, HP, ATK, DEF)
  - `02` - Profile / Story (Profile Header Area: Collapsible character introduction)
  - `03` - Metadata Card: Line 656 (`<SectionHeader num="03" title={t("캐릭터 프로필 & 성우 정보")} theme={theme} expanded={isMetadataExpanded} onToggle={...} />`)
  - `04` - Battle Roles: Line 725 (`<div className="w-12 h-12...">{num="04"}</div><h2>{t('전투 역할')}</h2>` - rendered conditionally when `char.roles` exists)
  - `05` - Materials Card: Line 756 (`<SectionHeader num="05" title={t("육성 재료")} theme={theme} />`)
  - Sub-components: 
    - Line 787 (`<WuwaSkillInput ... />`)
    - Line 794 (`<WuwaSkillSection ... />`)
    - Line 802 (`<WuwaResonanceChain ... />` - Internal Section `07` 공명 체인)
  - Authorship Note: Line 813 (`<section className="mt-12 pt-8 border-t border-white/5">`)
  - Review Board: Line 838 (`<CharacterReviewBoard characterId={char?.id || charName || ''} gameId={gameId || 'ww'} onCommentsLoaded={setCommentsData} />`)
- **Target Synergy Deck Mounting Section**:
  - Target: **Section 06 - Team Formations & Synergies** (Top-level section placed after `WuwaResonanceChain` and before E-E-A-T Authorship Note at line 813).
- **Import Needed**:
  ```tsx
  import SynergyDeck from '../../common-hub/components/SynergyDeck';
  ```
- **JSX Mounting Code**:
  ```tsx
  {/* Team Formations & Synergies */}
  <SynergyDeck 
    characterName={char?.id || charName || ''} 
    gameId={gameId || 'ww'} 
    theme={theme} 
  />
  ```

---

### C. Neverness to Everness (`nte-hub/pages/CharacterDetail.tsx`)
- **File Location**: `nte-hub/pages/CharacterDetail.tsx` (962 lines)
- **Current Layout & Section Hierarchy**:
  - `01` - Basic Stats (Profile Header Area: Lv 1..80 slider, HP, ATK, DEF, CRIT Rate, CRIT DMG)
  - `02` - Profile / Story (Profile Header Area: Collapsible character introduction)
  - `03` - Metadata Card: Line 771 (`<SectionHeader num="03" title={t("캐릭터 프로필 & 성우 정보")} theme={theme} expanded={isMetadataExpanded} onToggle={...} />`)
  - `04` - Materials Card: Line 814 (`<SectionHeader num="04" title={t("육성 재료")} theme={theme} />`)
  - Sub-component: Line 845 (`<NTESkillAndAwakeningSection char={char} gender={gender} setGender={setGender} theme={theme} renderContent={renderTextWithHighlights} setTooltip={setTooltip} />`)
    - Internal Sections: 스킬, 각성, 공명.
  - Authorship Note: Line 856 (`<section className="mt-12 pt-8 border-t border-white/5">`)
  - Review Board: Line 887 (`<CharacterReviewBoard characterId={char?.id || charName || ''} gameId={gameId || 'nte'} onCommentsLoaded={setCommentsData} />`)
- **Target Synergy Deck Mounting Section**:
  - Target: **Section 05 - Recommended Team Formations** (Top-level section placed after `NTESkillAndAwakeningSection` and before E-E-A-T Authorship Note at line 856).
- **Import Needed**:
  ```tsx
  import SynergyDeck from '../../common-hub/components/SynergyDeck';
  ```
- **JSX Mounting Code**:
  ```tsx
  {/* Recommended Team Formations */}
  <SynergyDeck 
    characterName={char?.id || charName || ''} 
    gameId="nte" 
    theme={theme} 
  />
  ```

---

## 3. Interface & Prop Passing Contract

The `SynergyDeck` component interface definition (agreed with Explorer 1 & 2) is:

```tsx
export interface SynergyDeckProps {
  characterName: string; // Accepts character ID (e.g. 'jiyan', 'firefly', 'nte-guwon') or character name
  gameId: 'hsr' | 'ww' | 'nte';
  theme?: {
    primary: string;
    secondary: string;
    shadow?: string;
  };
}
```

### Data Flow Chain:
1. `useParams<{ gameId?: string; charName: string }>()` extracts route params.
2. `CHARACTER_DB` lookup resolves `char` object (`char.id`, `char.name`, `char.attribute`, etc.).
3. `theme` is calculated dynamically via `useMemo` in each detail page based on element attribute (`char.attribute`).
4. `SynergyDeck` receives `characterName={char?.id || charName || ''}`, `gameId`, and `theme`.
5. Inside `SynergyDeck`, `synergyManager.getPartyCombinations(gameId, characterName)` queries game-specific party datasets (`HSR_PARTIES`, `WW_PARTY_COMBINATIONS`, `NTE_PARTY_COMBINATIONS` or dynamic fallbacks).

---

## 4. Implementation Step Plan for Implementer

1. **Import `SynergyDeck` Component**:
   - In `hsr-hub/pages/CharacterDetail.tsx`: Add `import SynergyDeck from '../../common-hub/components/SynergyDeck';`
   - In `ww-hub/pages/CharacterDetail.tsx`: Add `import SynergyDeck from '../../common-hub/components/SynergyDeck';`
   - In `nte-hub/pages/CharacterDetail.tsx`: Add `import SynergyDeck from '../../common-hub/components/SynergyDeck';`

2. **Mount `<SynergyDeck />` Component**:
   - In `hsr-hub/pages/CharacterDetail.tsx`: Place right after line 666 (`<SkillAndEidolonSection ... />`) before line 670.
   - In `ww-hub/pages/CharacterDetail.tsx`: Place right after line 807 (`<WuwaResonanceChain ... />`) before line 813.
   - In `nte-hub/pages/CharacterDetail.tsx`: Place right after line 852 (`<NTESkillAndAwakeningSection ... />`) before line 856.

3. **Verify Build Integrity**:
   - Run `npm run lint` and `npm run build` to confirm zero TypeScript compilation errors or missing import errors.
