# E2E Test Infra: Rira Game Hub

## Test Philosophy
- Opaque-box, requirement-driven testing. No dependency on private internal state.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.

## Feature Inventory & Test Coverage Goals
| # | Feature | Source | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) | Tier 4 (Real-World) |
|---|---------|--------|:-----------------:|:-----------------:|:----------------------:|:-------------------:|
| 1 | `npm run prerender` script entry | PROJECT.md F1 | >=5 | >=5 | ✓ | ✓ |
| 2 | Prerender Narrative Character Summary | PROJECT.md F2 | >=5 | >=5 | ✓ | ✓ |
| 3 | SynergyDeck UI Component & Utility | PROJECT.md F3 | >=5 | >=5 | ✓ | ✓ |
| 4 | SynergyDeck Mounting on Detail Pages | PROJECT.md F4 | >=5 | >=5 | ✓ | ✓ |
| 5 | CharacterReviewBoard `onCommentsLoaded` Fix | PROJECT.md F5 | >=5 | >=5 | ✓ | ✓ |
| 6 | DiscussionForumPosting JSON-LD Schema | PROJECT.md F6 | >=5 | >=5 | ✓ | ✓ |

## Test Architecture
- Test runner: `vitest` (executable via `npm test` or `npx vitest run`)
- Test directory: `tests/e2e/`
- Test files:
  - `tests/e2e/tier1_feature_coverage.test.ts` (>=30 cases)
  - `tests/e2e/tier2_boundary_corner.test.ts` (>=30 cases)
  - `tests/e2e/tier3_cross_feature.test.ts` (>=6 cases)
  - `tests/e2e/tier4_real_world.test.ts` (>=5 scenarios)

## Coverage Thresholds
- Tier 1: >=5 per feature (>=30 total)
- Tier 2: >=5 per feature (>=30 total)
- Tier 3: >=6 pairwise cross-feature interaction cases
- Tier 4: >=5 realistic real-world application scenarios
- **Total Minimum Test Cases**: >=71 test cases
