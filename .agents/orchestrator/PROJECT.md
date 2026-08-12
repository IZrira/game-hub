# Project: Rira Game Hub PageSpeed Insights Optimization

## Architecture
- Image Assets & Page Speed Optimization (`public/assets/banners/`, `common-hub/pages/Home.tsx`, `common-hub/components/LazyImage.tsx`).
- Global Color Contrast & Accessibility (`common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/`).
- Image Fallback Logic & Resource Error Resolution (`common-hub/data/games.ts`, `common-hub/components/LazyImage.tsx`, `common-hub/components/GameDashboard.tsx`, `common-hub/components/GalleryModals.tsx`, `public/assets/unknown.webp`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | WebP Banner Conversion | Convert `hsr_placeholder.png` and `ww_placeholder.png` (~900KB each) to compressed WebP format (`hsr_placeholder.webp`, `ww_placeholder.webp`) under ~30-70KB | M1 | Survey Explorer 1 |
| 2 | Home Page WebP References & CLS Prevention | Update `common-hub/pages/Home.tsx` to reference `.webp` banner assets and pass explicit `width={1024}` and `height={1024}` props to `<LazyImage />` | M1 | Survey Explorer 1 |
| 3 | Global WCAG AA/AAA Color Contrast Optimization | Update 357 low-contrast text instances (`text-gray-500` through `text-gray-900`, `placeholder:text-gray-600/800`) across 61 files in `common-hub`, `hsr-hub`, `ww-hub`, `nte-hub` to `text-gray-400`/`text-gray-300`/`placeholder:text-gray-400` | M2 | Survey Explorer 2 |
| 4 | Resolve `ww_main.webp` 404 Resource Error | Update `common-hub/data/games.ts` `bannerImage` properties for WW and NTE to local WebP assets, and simplify `Home.tsx` image `src` logic | M3 | Survey Explorer 3 |
| 5 | Resolve `unknown.webp` 404 Resource Error & Fallback Loop Safeguard | Create local fallback asset `/public/assets/unknown.webp`, update `LazyImage.tsx`, `GameDashboard.tsx`, and `GalleryModals.tsx` fallback paths to `/assets/unknown.webp`, and prevent double 404 error looping | M3 | Survey Explorer 3 |
| 6 | E2E Verification & Adversarial Hardening | Comprehensive test suite covering Tiers 1-5 for PageSpeed WebP assets, WCAG contrast compliance, and 404 fallback handling | Final Milestone | Orchestrator Dual Track |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: R1 WebP Image & CLS Optimization | `public/assets/banners/`, `common-hub/pages/Home.tsx` | None | PLANNED |
| 2 | M2: R2 Accessibility Color Contrast | `common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/` components & pages | None | PLANNED |
| 3 | M3: R3 404 Resource Error Resolution | `common-hub/data/games.ts`, `common-hub/components/LazyImage.tsx`, `GameDashboard.tsx`, `GalleryModals.tsx`, `public/assets/unknown.webp` | None | PLANNED |
| 4 | Final Milestone: E2E Verification & Hardening | Pass 100% E2E test suite (Tiers 1-4) & Adversarial Coverage Hardening (Tier 5) | M1, M2, M3, E2E Track | PLANNED |

## Interface Contracts
### Banner Assets & LazyImage
- Assets: `/public/assets/banners/hsr_placeholder.webp`, `/public/assets/banners/ww_placeholder.webp`
- Props: `<LazyImage src="/assets/banners/..." width={1024} height={1024} containerClassName="..." className="..." />`

### Fallback Image Asset
- Path: `/public/assets/unknown.webp`
- Fallback handler logic: `onError` switches to `/assets/unknown.webp` with single-failure state guard (`hasError`) to prevent infinite looping.

## Code Layout
- `public/assets/banners/hsr_placeholder.webp`: Converted WebP asset
- `public/assets/banners/ww_placeholder.webp`: Converted WebP asset
- `public/assets/unknown.webp`: New local fallback image asset
- `common-hub/pages/Home.tsx`: Image src updates, width/height props
- `common-hub/data/games.ts`: Local banner path references
- `common-hub/components/LazyImage.tsx`: Default fallback path & loop protection
- `common-hub/components/GameDashboard.tsx`: Local fallback error handler
- `common-hub/components/GalleryModals.tsx`: Local fallback error handler
- `common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/`: Contrast utility class updates
