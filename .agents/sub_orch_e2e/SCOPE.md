# Scope: E2E Testing Track for Rira Game Hub

## Architecture
- Test Framework: `vitest` with `happy-dom` / React testing environment.
- Test Location: `tests/e2e/`
- Command: `npm test` or `npx vitest run`

## Feature Inventory & Test Mapping
| # | Feature | Scope | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) | Tier 4 (Real-World) |
|---|---------|-------|-------------------|-------------------|------------------------|---------------------|
| 1 | Prerender script entry | `package.json` `"prerender"` script | 5 test cases | 5 test cases | 1 pairwise | 1 scenario |
| 2 | Prerender Narrative Summary | `scripts/prerender-meta.js` & static HTML | 5 test cases | 5 test cases | 1 pairwise | 1 scenario |
| 3 | SynergyDeck UI & Utility | `SynergyDeck.tsx` & `synergyManager.ts` | 5 test cases | 5 test cases | 1 pairwise | 1 scenario |
| 4 | SynergyDeck Page Mounting | HSR, WW, NTE Detail Pages | 5 test cases | 5 test cases | 1 pairwise | 1 scenario |
| 5 | CharacterReviewBoard Callback | `onCommentsLoaded` in `CharacterReviewBoard.tsx` | 5 test cases | 5 test cases | 1 pairwise | 1 scenario |
| 6 | DiscussionForumPosting Schema | `SEO.tsx` & static `<head>` JSON-LD | 5 test cases | 5 test cases | 1 pairwise | 1 scenario |
| **Total** | | | **>=30 cases** | **>=30 cases** | **>=6 cases** | **>=5 cases** |

## Sub-Milestones
| # | Milestone Name | Scope | Dependencies | Status |
|---|----------------|-------|--------------|--------|
| M1 | Test Infrastructure & Runner Setup | Install `vitest`/`happy-dom` setup in `package.json`, test runner config | None | DONE |
| M2 | Tier 1 & Tier 2 Test Suites | Write `tests/e2e/tier1_feature_coverage.test.ts` & `tests/e2e/tier2_boundary_corner.test.ts` | M1 | DONE |
| M3 | Tier 3 & Tier 4 Test Suites | Write `tests/e2e/tier3_cross_feature.test.ts` & `tests/e2e/tier4_real_world.test.ts` | M2 | DONE |
| M4 | E2E Suite Verification & TEST_READY.md | Run full suite via `npm test`, verify 100% pass, publish `TEST_READY.md` | M3 | DONE |
