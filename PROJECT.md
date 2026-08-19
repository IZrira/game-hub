# Project: Rira Game Hub Architecture & Milestone Tracking

## Architecture
- **Admin Visual Party Builder**: `common-hub/components/AdminPartyManager.tsx`, `common-hub/types/party.ts`, `common-hub/pages/AdminDashboard.tsx`.
- **Public Party Recommendation Pages**: `hsr-hub/pages/PartyRecommendations.tsx`, `ww-hub/pages/PartyRecommendations.tsx`.
- **3-Tier Sync & Offline Resilience Engine**: Supabase Cloud ➡️ localStorage 0ms Cache ➡️ TypeScript Code Exporter.
- **Breakthrough & Eidolon Recommendation Engine**: Slot and substitute character breakthrough levels (`명함`, `1돌+`, `2돌+`, `2돌 필수`, `풀돌`).
- **Image Assets & Page Speed Optimization**: `public/assets/banners/`, `common-hub/pages/Home.tsx`, `common-hub/components/LazyImage.tsx`.
- **Global Color Contrast & Accessibility**: `common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/`.
- **Image Fallback Logic & Resource Error Resolution**: `common-hub/data/games.ts`, `common-hub/components/LazyImage.tsx`, `common-hub/components/GameDashboard.tsx`, `common-hub/components/GalleryModals.tsx`, `public/assets/unknown.webp`.

## Feature Inventory
| # | Feature | Description | Milestone | Status |
|---|---------|-------------|-----------|--------|
| 1 | WebP Banner Conversion | Convert banner images to compressed WebP format (`hsr_placeholder.webp`, `ww_placeholder.webp`) | M1 | DONE |
| 2 | Home Page WebP References & CLS Prevention | Reference `.webp` banner assets and pass explicit `width={1024}` and `height={1024}` props | M1 | DONE |
| 3 | Global WCAG AA/AAA Color Contrast Optimization | Update low-contrast text instances across all hubs to `text-gray-400`/`text-gray-300` | M2 | DONE |
| 4 | Resolve 404 Resource Errors & Fallback Loop Safeguard | Local fallback asset `/public/assets/unknown.webp` with single-failure state guard (`hasError`) | M3 | DONE |
| 5 | NTE UI Enhancement & CDN Fixes | Theme text contrast, Skin dropdown toggle, missing CDN image logic | M4 | DONE |
| 6 | Multi-Game Admin Party Recommendation Visual Builder | Interactive party creator supporting HSR/NTE (4 slots) & WW (3 slots), 1-Click Duplicate, substitute selector | M5 | DONE |
| 7 | Streamlined Slot-First Modal Workflow | Place slot characters first ➡️ filter Main DPS exclusively to placed characters with toggle highlight | M6 | DONE |
| 8 | Character Breakthrough Recommendation Engine | Slot & substitute breakthrough selectors (`명함`, `1돌+`, `2돌+`, `2돌 필수`, `풀돌`) + golden badge rendering | M7 | DONE |
| 9 | 3-Tier Resilient Data Sync Architecture | Supabase Realtime + localStorage 0ms synchronous cache + TypeScript code serialization export | M8 | DONE |
| 10 | Quick Special Character Name Insertion & Auto-Namer | Special symbols (`•`, `·`), slot character name insertion chips (`[+ 캐릭터명]`), auto party naming button | M9 | DONE |
| 11 | Fixed Height Character Picker UX | Rock-solid `h-[650px]` modal container preventing layout jumping during fast search | M10 | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: WebP Image & CLS Optimization | `public/assets/banners/`, `common-hub/pages/Home.tsx` | None | DONE |
| 2 | M2: Accessibility Color Contrast | `common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/` components & pages | None | DONE |
| 3 | M3: 404 Resource Error Resolution | `common-hub/data/games.ts`, `common-hub/components/LazyImage.tsx`, fallback handlers | None | DONE |
| 4 | M4: NTE UI Enhancement & CDN Fixes | `nte-hub/`, `common-hub/data/dataManager.ts` | None | DONE |
| 5 | M5: Multi-Game Admin Party Builder | `common-hub/components/AdminPartyManager.tsx`, `common-hub/types/party.ts` | None | DONE |
| 6 | M6: Streamlined Modal Workflow | `AdminPartyManager.tsx` (Slot-First ➡️ Placed Main DPS toggle) | M5 | DONE |
| 7 | M7: Breakthrough Recommendation System | `types/party.ts`, `AdminPartyManager.tsx`, `PartyRecommendations.tsx` | M5, M6 | DONE |
| 8 | M8: 3-Tier Resilient Sync Pipeline | Supabase integration, localStorage 0ms load, TS serializer | M5, M7 | DONE |
| 9 | M9: Quick Name Tools & Fixed Picker UX | Special symbols (`•`, `·`), name chips, auto-namer, fixed height search | M5, M6 | DONE |

## Interface Contracts
### Unified Party Data Interface (`common-hub/types/party.ts`)
```typescript
export interface PartySlot {
  characterId: string;
  characterName: string;
  folderName?: string;
  role?: string;
  breakthrough?: string; // '명함', '1돌+', '2돌+', '2돌 필수', '풀돌'
  description?: string;
  substitutes?: Array<{
    characterId: string;
    characterName: string;
    folderName?: string;
    description?: string;
    role?: string;
    breakthrough?: string;
  }>;
}

export interface BasePartyData {
  id: string;
  game: 'HSR' | 'WW' | 'NTE';
  name: string;
  description: string;
  tags: string[];
  mainDPS?: string;
  pros?: string[];
  cons?: string[];
  order: number;
  updatedAt: string;
}

export interface HSRPartyData extends BasePartyData {
  game: 'HSR';
  category: string;
  slots: [PartySlot, PartySlot, PartySlot, PartySlot]; // 4 slots
}

export interface WWPartyData extends BasePartyData {
  game: 'WW';
  slots: [PartySlot, PartySlot, PartySlot]; // 3 slots
}

export interface NTEPartyData extends BasePartyData {
  game: 'NTE';
  elementSynergy: string;
  slots: [PartySlot, PartySlot, PartySlot, PartySlot]; // 4 slots
}

export type UnifiedPartyData = HSRPartyData | WWPartyData | NTEPartyData;
```
