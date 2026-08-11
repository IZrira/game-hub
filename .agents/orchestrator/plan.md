# Execution Plan: Rira Game Hub PageSpeed Insights Optimization

## Objective
Optimize Rira Game Hub for PageSpeed Insights (SEO 100, Performance 90+, Accessibility 100) by converting large PNG placeholders to compressed WebP, fixing color contrast across dark backgrounds, and resolving 404 resource errors.

## Phase 0: Survey & Map Codebase
- Spawn 3 parallel `teamwork_preview_explorer` agents:
  - **Explorer 1 (R1 - Image Size & WebP)**: Map `/public/assets/banners/hsr_placeholder.png` and `ww_placeholder.png`, inspect all `<img>` tags referencing banner placeholders across the app, check width/height/aspect-ratio attributes, and recommend compression & code update strategy.
  - **Explorer 2 (R2 - Color Contrast)**: Conduct codebase search for `text-gray-600` and `text-gray-700` on dark backgrounds (`#0a0a0a`, `#121212`, etc.), map all low-contrast instances, and recommend replacement with higher-contrast classes (`text-gray-400`, `text-gray-300`).
  - **Explorer 3 (R3 - 404 Resource Errors)**: Investigate path references and image fallback logic in components/utils that cause browser console 404 errors for `ww_main.webp` and `unknown.webp`, and propose fix strategy.

## Phase 1: Assess & Decompose
- Synthesize findings from 3 Explorers into `PROJECT.md` (Architecture, Feature Inventory, Milestones, Interface Contracts, Code Layout).
- Spawn E2E Testing Orchestrator to create opaque-box E2E test suite covering Tiers 1-4 for R1, R2, R3.

## Phase 2: Parallel Milestone Execution & Dual Track
- **Milestone 1 (R1)**: Convert banner PNGs to compressed WebP, update `<img>` tags with explicit width/height/aspect-ratio.
- **Milestone 2 (R2)**: Update low-contrast text classes (`text-gray-600`/`700` -> `text-gray-400`/`300`) globally on dark backgrounds.
- **Milestone 3 (R3)**: Fix image fallback logic and missing path references for `ww_main.webp` and `unknown.webp`.
- **Final Milestone**: Run full E2E test suite (Tiers 1-4) and Tier 5 Adversarial Coverage Hardening via Challenger -> Worker -> Reviewer -> Forensic Auditor loop.

## Phase 3: Final Verification & Sentinel Victory Report
- Verify clean build (`npm run build`), passing test suite, and clean forensic audit.
- Report project completion to parent / Sentinel.
