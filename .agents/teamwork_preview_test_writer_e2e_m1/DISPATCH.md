# Dispatch Assignment — E2E Test Writer

## Identity & Scope
- Working directory: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_test_writer_e2e_m1`
- Original request path: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md`
- Scope document: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_e2e_pagespeed\SCOPE.md`
- Project document: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md`

## Objective
Design and implement an opaque-box E2E test suite covering Tiers 1-4 for Rira Game Hub PageSpeed Insights Optimization, create test runner infrastructure, execute tests, and create/publish `TEST_READY.md`.

## Detailed Requirements

### 1. Test Infrastructure Setup
- Create test files in `tests/e2e/` or `e2e-tests/` directory (e.g. `tests/e2e/runner.js` or `tests/e2e/e2e.test.ts` or standalone Node.js test script using standard Node assertions/runners).
- Add script entry in `package.json` (e.g. `"test:e2e": "node tests/e2e/runner.js"` or similar) if needed, so running `npm run test:e2e` or executing the runner runs the full test suite.
- Ensure the test runner outputs clear pass/fail status per tier and exits with code 0 on success or non-zero on failure.

### 2. Tier 1: Feature Coverage Tests
- **WebP Banner Files Existence & Compression**: Verify `/public/assets/banners/hsr_placeholder.webp` and `/public/assets/banners/ww_placeholder.webp` exist and each file size is under 70KB.
- **Home Page WebP References**: Verify `common-hub/pages/Home.tsx` references `.webp` banner assets instead of legacy `.png`.
- **Global WCAG AA/AAA Color Contrast Optimization**: Verify zero instances of low-contrast text classes (`text-gray-500`, `text-gray-600`, `text-gray-700`, `text-gray-800`, `text-gray-900`, `placeholder:text-gray-600`, `placeholder:text-gray-800` on dark background surfaces) remain in `common-hub/`, `hsr-hub/`, `ww-hub/`, and `nte-hub/`, and verify higher-contrast replacements (`text-gray-400`, `text-gray-300`, `placeholder:text-gray-400`) are used.
- **404 Resource Paths & Fallback Configuration**: Verify `common-hub/data/games.ts` sets `bannerImage` paths to local valid WebP assets (`/assets/banners/hsr_placeholder.webp`, `/assets/banners/ww_placeholder.webp`) and fallback asset `/public/assets/unknown.webp` exists locally.

### 3. Tier 2: Boundary & Corner Cases Tests
- **Missing Asset Fallback Handling**: Verify `LazyImage.tsx`, `GameDashboard.tsx`, and `GalleryModals.tsx` fallback paths point to `/assets/unknown.webp`.
- **Layout Shift Prevention**: Verify `<LazyImage />` tag instances in `Home.tsx` specify explicit `width` and `height` attributes (e.g. `width={1024}` and `height={1024}`).
- **Image Error Fallback Loop Prevention**: Verify `LazyImage.tsx` contains `hasError` state protection to prevent double 404 error looping when fallback images fail or retry.

### 4. Tier 3: Cross-Feature Interactions Tests
- Verify navigation data structures across game cards, dashboard page rendering components for HSR, WW, NTE, and theme styling consistency.

### 5. Tier 4: Real-World Scenarios Tests
- **Full Build Verification**: Run `npm run build` and verify build succeeds with exit code 0.
- **Zero Browser 404 Console Errors**: Scan all source files, routing, asset references, and CDN URLs in the repository to ensure no broken asset URLs (such as `ww_main.webp` or missing GitHub CDN paths) exist that would trigger 404 errors during runtime.

### 6. Publish `TEST_READY.md`
Create `c:\Users\User\Desktop\rira game hub\game-hub\TEST_READY.md` with the exact format required:
- Test Philosophy and Architecture
- Test Execution Command (e.g. `npm run test:e2e` or `node tests/e2e/runner.js`)
- Full Coverage Summary by Tier (Tier 1, Tier 2, Tier 3, Tier 4) with test counts and pass status
- Feature Checklist mapping every feature to Tier 1-4 tests

## Output Requirements
Write handoff report to `c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_test_writer_e2e_m1\handoff.md` with:
- Summary of test files created and runner infrastructure configured
- Execution log and build/test results
- Link to published `TEST_READY.md`

## Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
