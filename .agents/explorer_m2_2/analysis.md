# Comprehensive Technical Analysis & Implementation Plan: Data Sourcing & Synergy Manager (Milestone 2 - Explorer 2)

## Executive Summary
This document outlines the technical specification and data sourcing strategy for **Milestone 2 (R2: Recommended Team Synergy UI Card)**. It details the existing team data structures across `hsr-hub`, `ww-hub`, and `nte-hub`, designs the new `nte-hub/data/parties.ts` module with dynamic fallback matching, and specifies the exact architecture, function signatures, and data lookup logic for `common-hub/utils/synergyManager.ts`.

---

## 1. Investigation of Existing Team Data Structures

### 1.1 `hsr-hub` Party Data Architecture
- **Location**: `hsr-hub/data/parties/index.ts`
- **Exported Symbol**: `HSR_PARTIES: PartyCombination[]`
- **Data Sub-modules**:
  - `hsr-hub/data/parties/follow_up.ts` (`followUpParties`)
  - `hsr-hub/data/parties/elation.ts` (`elationParties`)
  - `hsr-hub/data/parties/aoe.ts` (`aoeParties`)
  - `hsr-hub/data/parties/memory.ts` (`memoryParties`)
  - `hsr-hub/data/parties/single.ts` (`singleParties`)
  - `hsr-hub/data/parties/break.ts` (`breakParties`)
  - `hsr-hub/data/parties/dot.ts` (`dotParties`)
- **TypeScript Interfaces** (`hsr-hub/data/parties/index.ts:1-18`):
  ```typescript
  export interface PartyMember {
    id: string;
    name: string;
    role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러';
    folderName: string;
    isTrailblazer?: boolean;
    substitutes?: { 
      name: string; 
      folderName: string; 
      isTrailblazer?: boolean; 
      role?: string; 
    }[];
  }

  export interface PartyCombination {
    id: string;
    name: string;
    description: string;
    mainDPS: string;
    members: PartyMember[];
    tags: string[];
    category: '단일' | '범위' | '지속 피해' | '추가 공격' | '격파' | '기억' | '환락';
  }
  ```
- **Sorting Mechanism**: `HSR_PARTIES` ranks parties by character release version using `CHAR_VERSION_MAP` (`hsr-hub/data/parties/index.ts:28-116`).
- **Team Size**: 4 members per party.
- **Substitute Structure**: Detailed per-member substitute array (`substitutes`).

### 1.2 `ww-hub` Party & Guide Data Architecture
- **Location**: `ww-hub/data/parties.ts`
- **Exported Symbol**: `WW_PARTY_COMBINATIONS: PartyCombination[]`
- **TypeScript Interfaces** (`ww-hub/data/parties.ts:2-16`):
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
    members: PartyMember[];
    pros: string[];
    cons: string[];
  }
  ```
- **Complementary Guide Data**: `ww-hub/data/guides.ts` exports `WW_CHARACTER_GUIDES: WuwaCharacterGuide[]`, where each guide entry contains a `synergyCharacters: string[]` field (e.g., Jiyan synergy with Iuno, Linne, The Shorekeeper, Mortefi).
- **Character Metadata**: `ww-hub/data/characters.ts` exports `WW_CHARACTERS: WuwaCharacter[]` with attributes (`기류`, `전도`, `회절`, `인멸`, `용융`, `응결`) and weapon types.
- **Team Size**: 3 members per party.

### 1.3 `nte-hub` Character Data Architecture & Current Gap
- **Location**: `nte-hub/data/index.ts`
- **Exported Symbol**: `NTE_CHARACTERS: any[]` (6 initial characters):
  1. `구원` (nte-guwon, attribute: `령`, rarity: 5, briefInfo: `에이본 골동품점 소속`)
  2. `민트` (nte-mint, attribute: `령`, rarity: 4, briefInfo: `에이본 골동품점 소속`)
  3. `치즈` (nte-cheese, attribute: `빛`, rarity: 5, briefInfo: `초기 캐릭터`)
  4. `호토리` (nte-hotori, attribute: `빛`, rarity: 5, briefInfo: `초기 캐릭터`)
  5. `아들러` (nte-adler, attribute: `주`, rarity: 4, briefInfo: `초기 캐릭터`)
  6. `라크리모사` (nte-lacrimosa, attribute: `암`, rarity: 5, briefInfo: `초기 캐릭터`)
- **Gap Identified**: `nte-hub/data/parties.ts` does **not** currently exist. A dedicated party data structure with pre-defined party combinations and fallback role/attribute matching logic must be created.

---

## 2. Specification & Implementation Plan: `nte-hub/data/parties.ts`

### 2.1 File Creation Plan
Create `nte-hub/data/parties.ts` exporting `NTE_PARTY_COMBINATIONS` and fallback matching functions.

### 2.2 Interface Definitions
```typescript
export interface NTEPartyMember {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러' | string;
  folderName: string;
  attribute?: string;
  substitutes?: {
    id?: string;
    name: string;
    folderName: string;
    role?: string;
  }[];
}

export interface NTEPartyCombination {
  id: string;
  name: string;
  description: string;
  mainDPS: string;
  members: NTEPartyMember[];
  tags: string[];
  category?: string;
}
```

### 2.3 Pre-defined `NTE_PARTY_COMBINATIONS` Dataset
```typescript
export const NTE_PARTY_COMBINATIONS: NTEPartyCombination[] = [
  {
    id: 'nte_guwon_spirit_hyper',
    name: '구원 령 속성 폭딜 파티',
    description: '구원의 강력한 령 속성 메인 딜링과 민트의 속성 시너지를 극대화하는 에이본 골동품점 대표 파티 조합입니다.',
    mainDPS: '구원',
    tags: ['구원', '령', '에이본 골동품점'],
    category: '령 속성 시너지',
    members: [
      { id: 'nte-guwon', name: '구원', role: '메인 딜러', folderName: '구원', attribute: '령' },
      { 
        id: 'nte-mint', 
        name: '민트', 
        role: '서브 딜러', 
        folderName: '민트', 
        attribute: '령',
        substitutes: [{ id: 'nte-adler', name: '아들러', folderName: '아들러', role: '서브 딜러' }]
      },
      { 
        id: 'nte-hotori', 
        name: '호토리', 
        role: '서포터', 
        folderName: '호토리', 
        attribute: '빛',
        substitutes: [{ id: 'nte-cheese', name: '치즈', folderName: '치즈', role: '서포터' }]
      }
    ]
  },
  {
    id: 'nte_cheese_light_synergy',
    name: '치즈 & 호토리 빛 속성 연계 파티',
    description: '빛 속성 캐릭터들의 유기적인 전술 연계 및 지속적인 화력 보조를 구현한 조합입니다.',
    mainDPS: '치즈',
    tags: ['치즈', '빛', '광휘'],
    category: '빛 속성 시너지',
    members: [
      { id: 'nte-cheese', name: '치즈', role: '메인 딜러', folderName: '치즈', attribute: '빛' },
      { 
        id: 'nte-hotori', 
        name: '호토리', 
        role: '서브 딜러', 
        folderName: '호토리', 
        attribute: '빛',
        substitutes: [{ id: 'nte-adler', name: '아들러', folderName: '아들러', role: '서브 딜러' }]
      },
      { 
        id: 'nte-mint', 
        name: '민트', 
        role: '서포터', 
        folderName: '민트', 
        attribute: '령',
        substitutes: [{ id: 'nte-lacrimosa', name: '라크리모사', folderName: '라크리모사', role: '서포터' }]
      }
    ]
  },
  {
    id: 'nte_lacrimosa_dark_control',
    name: '라크리모사 암속성 제어 파티',
    description: '라크리모사의 단일 암속성 딜링과 아들러의 주 속성 지원을 결합한 제어 특화 파티입니다.',
    mainDPS: '라크리모사',
    tags: ['라크리모사', '암', '제어'],
    category: '암/주 속성 시너지',
    members: [
      { id: 'nte-lacrimosa', name: '라크리모사', role: '메인 딜러', folderName: '라크리모사', attribute: '암' },
      { 
        id: 'nte-adler', 
        name: '아들러', 
        role: '서브 딜러', 
        folderName: '아들러', 
        attribute: '주',
        substitutes: [{ id: 'nte-mint', name: '민트', folderName: '민트', role: '서브 딜러' }]
      },
      { 
        id: 'nte-hotori', 
        name: '호토리', 
        role: '서포터', 
        folderName: '호토리', 
        attribute: '빛',
        substitutes: [{ id: 'nte-cheese', name: '치즈', folderName: '치즈', role: '서포터' }]
      }
    ]
  }
];
```

### 2.4 Dynamic Fallback Matching Algorithm
When a character is not present in `NTE_PARTY_COMBINATIONS`, `getNTEFallbackParty(characterName: string)` provides a dynamically constructed party:
1. Searches `NTE_CHARACTERS` for matching character.
2. Identifies character's `attribute` (`령`, `빛`, `주`, `암`).
3. Selects same-attribute characters as primary synergy partners.
4. Fills remaining slots with complementary support/dps characters.
5. Returns a structured `NTEPartyCombination` object.

---

## 3. Specification & Architecture: `common-hub/utils/synergyManager.ts`

### 3.1 Unified Interface Definitions
```typescript
export interface UnifiedPartyMember {
  id: string;
  name: string;
  role: string;
  folderName: string;
  isMainTarget?: boolean;
  attribute?: string;
  isTrailblazer?: boolean;
  substitutes?: {
    id?: string;
    name: string;
    folderName: string;
    role?: string;
    isTrailblazer?: boolean;
  }[];
}

export interface UnifiedParty {
  id: string;
  name: string;
  description: string;
  category?: string;
  mainDPS?: string;
  members: UnifiedPartyMember[];
  tags?: string[];
  pros?: string[];
  cons?: string[];
}

export interface ElementGlowMapping {
  primary: string;      // Main hex accent color
  secondary: string;    // Gradient secondary color
  glowColor: string;    // CSS shadow glow (rgba string or hex)
  badgeBg: string;      // Background fill color for badges
  borderGlow: string;   // Border highlight color
}
```

### 3.2 Core Function Signatures & Data Lookup Logic

#### Function 1: `getRecommendedParties`
```typescript
export function getRecommendedParties(
  gameId: 'hsr' | 'ww' | 'nte', 
  characterNameOrId: string
): UnifiedParty[];
```
- **Lookup Logic**:
  - **`hsr`**:
    1. Import `HSR_PARTIES` from `hsr-hub/data/parties/index.ts`.
    2. Filter entries where `party.mainDPS === characterNameOrId`, `party.members.some(m => m.name === characterNameOrId || m.id === characterNameOrId || m.substitutes?.some(s => s.name === characterNameOrId))`, or `party.tags.includes(characterNameOrId)`.
    3. Normalize `members` and nested `substitutes` into `UnifiedPartyMember[]`.
    4. Mark target character with `isMainTarget: true`.
  - **`ww`**:
    1. Import `WW_PARTY_COMBINATIONS` from `ww-hub/data/parties.ts`.
    2. Search matching party entries where character is present in `members`.
    3. If matching party is found, map to `UnifiedParty[]`.
    4. If no direct `PartyCombination` exists, query `WW_CHARACTER_GUIDES` in `ww-hub/data/guides.ts` for `synergyCharacters`.
    5. Construct dynamic `UnifiedParty` combining target character with their listed synergy characters from `WW_CHARACTERS`.
  - **`nte`**:
    1. Import `NTE_PARTY_COMBINATIONS` from `nte-hub/data/parties.ts`.
    2. Filter entries where character is member or main DPS.
    3. If empty, invoke `getNTEFallbackParty(characterNameOrId)`.

#### Function 2: `getElementGlowMapping`
```typescript
export function getElementGlowMapping(
  gameId: 'hsr' | 'ww' | 'nte', 
  attributeOrElement?: string
): ElementGlowMapping;
```
- **Lookup Mapping Table**:
  - **HSR Attributes**:
    - `화염` / `Fire`: primary `#FF4D4F`, secondary `#FF7A45`, glowColor `rgba(255, 77, 79, 0.4)`
    - `얼음` / `Ice`: primary `#40A9FF`, secondary `#69C0FF`, glowColor `rgba(64, 169, 255, 0.4)`
    - `바람` / `Wind`: primary `#52C41A`, secondary `#73D13D`, glowColor `rgba(82, 196, 26, 0.4)`
    - `번개` / `Lightning`: primary `#FADB14`, secondary `#FFEC3D`, glowColor `rgba(250, 219, 20, 0.4)`
    - `물리` / `Physical`: primary `#D9D9D9`, secondary `#F0F0F0`, glowColor `rgba(217, 217, 217, 0.4)`
    - `양자` / `Quantum`: primary `#9254DE`, secondary `#B37FEB`, glowColor `rgba(146, 84, 222, 0.4)`
    - `허수` / `Imaginary`: primary `#FFC53D`, secondary `#FFE58F`, glowColor `rgba(255, 197, 61, 0.4)`
  - **WW Attributes**:
    - `기류` / `Aero`: primary `#10B981`, secondary `#34D399`, glowColor `rgba(16, 185, 129, 0.4)`
    - `전도` / `Electro`: primary `#A855F7`, secondary `#C084FC`, glowColor `rgba(168, 85, 247, 0.4)`
    - `회절` / `Spectro`: primary `#F59E0B`, secondary `#FBBF24`, glowColor `rgba(245, 158, 11, 0.4)`
    - `인멸` / `Havoc`: primary `#EF4444`, secondary `#F87171`, glowColor `rgba(239, 68, 68, 0.4)`
    - `용융` / `Fusion`: primary `#F97316`, secondary `#FB923C`, glowColor `rgba(249, 115, 22, 0.4)`
    - `응결` / `Glacio`: primary `#06B6D4`, secondary `#22D3EE`, glowColor `rgba(6, 182, 212, 0.4)`
  - **NTE Attributes**:
    - `령` (Spirit): primary `#00D287`, secondary `#00F29D`, glowColor `rgba(0, 210, 135, 0.4)`
    - `빛` (Light): primary `#FFD700`, secondary `#FFF176`, glowColor `rgba(255, 215, 0, 0.4)`
    - `주` (Curse): primary `#9C27B0`, secondary `#E040FB`, glowColor `rgba(156, 39, 176, 0.4)`
    - `암` (Dark): primary `#3F51B5`, secondary `#5C6BC0`, glowColor `rgba(63, 81, 181, 0.4)`
  - **Default Fallback**: Game theme defaults (HSR: `#7E30E1`, WW: `#EAB308`, NTE: `#00D287`).

#### Function 3: `calculateSubstitutes`
```typescript
export function calculateSubstitutes(
  member: UnifiedPartyMember, 
  gameId: 'hsr' | 'ww' | 'nte'
): { id?: string; name: string; folderName: string; role?: string }[];
```
- Returns `member.substitutes` if non-empty.
- If empty, searches character database for characters matching `member.role` or `member.attribute` to suggest up to 3 substitutes.

---

## 4. Evidence Chain Summary

| Claim / Requirement | Source File & Location | Verification Method |
|---------------------|------------------------|---------------------|
| HSR Party Structure | `hsr-hub/data/parties/index.ts:1-18, 111-116` | `view_file` verified `HSR_PARTIES` export & member substitute schema |
| WW Party Structure | `ww-hub/data/parties.ts:2-16, 18-31` | `view_file` verified `WW_PARTY_COMBINATIONS` 3-member schema |
| WW Guide Synergy | `ww-hub/data/guides.ts:37, 86, 225...` | `grep_search` confirmed `synergyCharacters` field across character guides |
| NTE Character Data | `nte-hub/data/index.ts:3-94` | `view_file` verified 6 NTE characters & attributes (`령`, `빛`, `주`, `암`) |
| Absence of NTE Parties | `nte-hub/data/parties.ts` | `find_by_name` confirmed non-existence; specified creation plan |
| Glassmorphism Token | `DESIGN.md:14-20`, `CharacterDetail.tsx` | Verified `glass-card`, italic indices, and theme glow styling rules |

---

## 5. Next Steps for Implementer
1. Create `nte-hub/data/parties.ts` with `NTE_PARTY_COMBINATIONS` and `getNTEFallbackParty`.
2. Implement `common-hub/utils/synergyManager.ts` exporting `getRecommendedParties`, `getElementGlowMapping`, and `calculateSubstitutes`.
3. Verify TypeScript build integrity via `npm run build`.
