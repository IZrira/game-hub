# Scope: E2E Testing Track — PageSpeed Insights Optimization

## Architecture
- Opaque-box E2E Test Suite for Rira Game Hub PageSpeed Insights Optimization.
- Test runner infra: Standalone automated test suite runner (`e2e-tests/` directory with Node.js / Playwright / Vitest runner).
- Coverage across Tiers 1 to 4:
  - Tier 1: Feature Coverage (WebP banner asset existence & size checks, contrast class replacement checks, 404 image fallback configuration).
  - Tier 2: Boundary & Corner Cases (missing asset handling, layout shift width/height attributes, fallback loop guard prevention).
  - Tier 3: Cross-Feature Interactions (navigation across game cards, dashboard rendering, theme styling).
  - Tier 4: Real-World Scenarios (`npm run build` build verification, zero browser 404 console error simulation/check).

## Feature Inventory & Test Mapping
| # | Feature / Area | Description | Tier | Test File |
|---|----------------|-------------|------|-----------|
| 1 | WebP Banner Existence & Compression | Verify `hsr_placeholder.webp` and `ww_placeholder.webp` exist in `public/assets/banners/` and are < 70KB | Tier 1 | `e2e-tests/tier1_feature_coverage.test.ts` |
| 2 | Home Page WebP & CLS Attributes | Verify `Home.tsx` references `.webp` banner assets and `<LazyImage />` includes `width` and `height` attributes | Tier 1 & 2 | `e2e-tests/tier1_feature_coverage.test.ts`, `e2e-tests/tier2_boundary_corner.test.ts` |
| 3 | Accessibility Color Contrast | Verify removal of low-contrast `text-gray-500`~`900` and replacement with `text-gray-300`/`400` across all hub modules | Tier 1 | `e2e-tests/tier1_feature_coverage.test.ts` |
| 4 | Fallback Asset & Path Configuration | Verify `/public/assets/unknown.webp` exists and `games.ts` banner paths point to local WebP assets | Tier 1 | `e2e-tests/tier1_feature_coverage.test.ts` |
| 5 | Fallback Error Loop Safeguard | Verify `LazyImage.tsx`, `GameDashboard.tsx`, `GalleryModals.tsx` use `/assets/unknown.webp` and `hasError` state prevents infinite loops | Tier 2 | `e2e-tests/tier2_boundary_corner.test.ts` |
| 6 | Cross-Feature Navigation & Rendering | Verify game card routes, dashboard components, and theme styling render valid structure | Tier 3 | `e2e-tests/tier3_cross_feature.test.ts` |
| 7 | Full Build & Zero 404 Console Errors | Verify `npm run build` succeeds and zero 404 URLs remain in codebase or asset references | Tier 4 | `e2e-tests/tier4_real_world.test.ts` |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Test Infra & Tier 1 Feature Coverage Tests | Test harness setup & Tier 1 tests | None | IN_PROGRESS |
| 2 | M2: Tier 2 Boundary & Corner Cases Tests | Tier 2 test suite implementation | M1 | PLANNED |
| 3 | M3: Tier 3 Cross-Feature & Tier 4 Real-World Tests | Tier 3 & Tier 4 test suite implementation | M1, M2 | PLANNED |
| 4 | M4: Execution, Verification & TEST_READY.md Publication | Full test execution, verification, and TEST_READY.md creation | M1, M2, M3 | PLANNED |

## Interface Contracts
- Test Runner Command: `npm run test:e2e` or `node e2e-tests/runner.js`
- Test Output: Exit code 0 on all tests passing, non-zero on failure. Structured summary printed to console.
- Output Signal File: `TEST_READY.md` published at project root.
