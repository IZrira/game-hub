# Analysis Report: Requirement R2 - Synergy Deck UI Component

## Executive Summary
This report presents a thorough investigation of Requirement R2 (Synergy Deck UI Component / Recommended Team Synergy UI Card for HSR, WW, and NTE) in the Rira Game Hub codebase. The goal is to provide a comprehensive architectural blueprint, component specification, data model mapping, and exact mounting locations to guide the implementation phase without modifying any existing source code.

---

## 1. Codebase Architecture & Routing Map

### 1.1 Application Entry & Routing
- **Main Entry Point**: `index.html` → `common-hub/index.tsx` → `common-hub/App.tsx` → `common-hub/router.tsx`
- **Router Pattern**: Config-based React Router v7/v8 (`createBrowserRouter`) with path `/gallery/:gameId/character/:charName`.
- **Character Detail Dispatcher** (`common-hub/router.tsx:62-67`):
  ```tsx
  const CharacterDetailDispatcher = () => {
    const { gameId } = useParams<{ gameId: string }>();
    if (gameId === 'ww') return <CharacterDetailWW />;
    if (gameId === 'nte') return <CharacterDetailNTE />;
    return <CharacterDetailHSR />;
  };
  ```

### 1.2 Target Pages Map
| Game | Page Component | File Path | Current Status of Synergy Deck |
|---|---|---|---|
| **Honkai: Star Rail (HSR)** | `<CharacterDetailHSR />` | `hsr-hub/pages/CharacterDetail.tsx` | Not present (has `SkillAndEidolonSection` & `CharacterReviewBoard`) |
| **Wuthering Waves (WW)** | `<CharacterDetailWW />` | `ww-hub/pages/CharacterDetail.tsx` | Not present (has `WuwaSkillSection`, `WuwaResonanceChain` & `CharacterReviewBoard`) |
| **Neverness to Everness (NTE)** | `<CharacterDetailNTE />` | `nte-hub/pages/CharacterDetail.tsx` | Not present (has `NTESkillAndAwakeningSection` & `CharacterReviewBoard`) |

---

## 2. Character Detail Pages Structure Analysis

### 2.1 HSR Character Detail Page (`hsr-hub/pages/CharacterDetail.tsx`)
- **Layout Grid**: `lg:grid-cols-[500px_1fr]`
- **Sections**:
  1. Profile Header & Left Poster Card (`aspect-[3/4.5]`)
  2. Section `01`: Level Slider & Basic Stats Card
  3. Section `02`: Character Profile/Story (`isProfileExpanded` toggle)
  4. Section `03`: Profile Metadata & Voice Actors Grid (`isMetadataExpanded` toggle)
  5. Section `04`: Materials (`ascension` & `traces` item icons)
  6. `<SkillAndEidolonSection />` (Skills, Traces, Eidolons)
  7. E-E-A-T Authorship Note & Feedback Modal trigger
  8. `<CharacterReviewBoard />` (UGC Comments)

### 2.2 WW Character Detail Page (`ww-hub/pages/CharacterDetail.tsx`)
- **Layout Grid**: `lg:grid-cols-[500px_1fr]`
- **Sections**:
  1. Profile Header & Left Poster Card (`aspect-[3/4.5]`)
  2. Section `01`: Level Slider & Basic Stats Card
  3. Section `02`: Character Profile/Story (`isProfileExpanded` toggle)
  4. Section `03`: Profile Metadata & Voice Actors / Locales Grid
  5. Section `04`: Battle Roles Grid (`char.roles`)
  6. Section `05`: Materials (`ascension` & `traces`)
  7. `<WuwaSkillInput />`
  8. `<WuwaSkillSection />`
  9. `<WuwaResonanceChain />`
  10. E-E-A-T Authorship Note
  11. `<CharacterReviewBoard />`

### 2.3 NTE Character Detail Page (`nte-hub/pages/CharacterDetail.tsx`)
- **Layout Grid**: `lg:grid-cols-[500px_1fr]`
- **Sections**:
  1. Profile Header & Left Poster Card (`aspect-[3/4.5]`)
  2. Section `01`: Level Slider & Basic Stats Card (including Crit Rate & Crit DMG)
  3. Section `02`: Character Profile/Story (`isProfileExpanded` toggle)
  4. Section `03`: Metadata & Voice Actors Grid
  5. Section `04`: Materials (`ascension` & `traces`)
  6. `<NTESkillAndAwakeningSection />`
  7. E-E-A-T Authorship Note & Feedback Modal trigger
  8. `<CharacterReviewBoard />`

---

## 3. Data Structure Analysis & Mapping for Team Synergy

### 3.1 HSR Party Data (`hsr-hub/data/parties/index.ts`)
- **Exported Dataset**: `HSR_PARTIES: PartyCombination[]`
- **Data Models**:
  ```typescript
  export interface PartyMember {
    id: string;
    name: string;
    role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러';
    folderName: string;
    isTrailblazer?: boolean;
    substitutes?: { name: string; folderName: string; isTrailblazer?: boolean; role?: string; }[];
  }

  export interface PartyCombination {
    id: string;
    name: string;
    description: string;
    mainDPS: string;
    members: PartyMember[]; // 4 members
    tags: string[];
    category: '단일' | '범위' | '지속 피해' | '추가 공격' | '격파' | '기억' | '환락';
  }
  ```
- **Category Files**: `aoe.ts`, `break.ts`, `dot.ts`, `elation.ts`, `follow_up.ts`, `memory.ts`, `single.ts`.

### 3.2 WW Party Data (`ww-hub/data/parties.ts` & `ww-hub/data/guides.ts`)
- **Exported Dataset**: `WW_PARTY_COMBINATIONS: PartyCombination[]`
- **Data Models**:
  ```typescript
  export interface PartyMember {
    id: string;
    name: string;
    folderName: string;
    role: string;
  }

  export interface PartyCombination {
    id: string;
    name: string;
    description: string;
    members: PartyMember[]; // 3 members (Main DPS, Sub DPS, Support)
    pros: string[];
    cons: string[];
  }
  ```
- **Additional Data Source**: `WW_DATA_ALL.GUIDES` / `ww-hub/data/guides.ts` includes `synergyCharacters: string[]` for character guide detail pages.

### 3.3 NTE Party Data (`nte-hub/data/index.ts`)
- **Current State**: `nte-hub` contains `NTE_CHARACTERS` (구원, 민트, 치즈, 호토리, 아들러, 라크리모사). Explicit team combination dataset (`NTE_PARTY_COMBINATIONS`) does not yet exist.
- **Requirement**: `SynergyDeck` must gracefully handle NTE by reading a new `NTE_PARTY_COMBINATIONS` array or providing a dynamic fallback matching attributes/roles.

---

## 4. Visual Aesthetics & Design System Guidelines

Adhering strictly to `DESIGN.md`:

### 4.1 Theme Tokens & Colors
- **Global Background**: `#0a0a0a` (Solid), `#121212` / `#0f0f0f` (Surface cards)
- **Game Primary Colors**:
  - HSR: `#7E30E1` (Primary), `#E26EE5` (Secondary), `#FFD600` (Accent)
  - WW: `#EAB308` (Primary), `#FDE047` (Secondary), `#00E676` (Success/Aero)
  - NTE: `#00D287` (Primary), `#34D399` (Secondary), `#b892ff` (Accent)
- **Glassmorphism CSS Rules**:
  ```css
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  ```

### 4.2 Section Header Specification
- **Index Box**: `w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl`
- **Title**: `text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1`

### 4.3 Image Resolution Utilities
- Use `getCharacterArtPath(gameId, folderName, artNum)` from `common-hub/utils/imageHelper.ts` and `safeEncodeURIComponent` from `common-hub/utils/assetManager.ts`.

---

## 5. Implementation Specification for `SynergyDeck`

### 5.1 Component File Location
- Create centralized reusable component: `common-hub/components/SynergyDeck.tsx`
- Create helper data manager: `common-hub/data/synergyManager.ts`

### 5.2 Component Interface (Props)
```typescript
export interface SynergyDeckProps {
  characterId: string;
  characterName: string;
  gameId: 'hsr' | 'ww' | 'nte' | string;
  theme?: {
    primary: string;
    secondary: string;
    shadow: string;
  };
}
```

### 5.3 Mounting Points on Detail Pages
1. **HSR Detail Page (`hsr-hub/pages/CharacterDetail.tsx`)**:
   - Mount after `<SkillAndEidolonSection />` and before Authorship Note.
   - Section Number: `05` (`num="05" title="추천 파티 시너지 (Synergy Deck)"`)
2. **WW Detail Page (`ww-hub/pages/CharacterDetail.tsx`)**:
   - Mount after `<WuwaResonanceChain />` and before Authorship Note.
   - Section Number: `06` (`num="06" title="추천 파티 시너지 (Synergy Deck)"`)
3. **NTE Detail Page (`nte-hub/pages/CharacterDetail.tsx`)**:
   - Mount after `<NTESkillAndAwakeningSection />` and before Authorship Note.
   - Section Number: `05` (`num="05" title="추천 파티 시너지 (Synergy Deck)"`)

---

## 6. Verification Plan
1. **Build Check**: Run `npm run lint` (TypeScript check `tsc --noEmit`) to ensure types compile cleanly.
2. **Route Verification**: Test rendering for representative characters across games:
   - HSR: `/gallery/hsr/character/acheron` (or `아케론`)
   - WW: `/gallery/ww/character/jiyan` (or `기염`)
   - NTE: `/gallery/nte/character/nte-guwon` (or `구원`)
