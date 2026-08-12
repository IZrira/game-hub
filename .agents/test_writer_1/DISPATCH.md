## 2026-08-05T02:06:58Z
You are test_writer_1 for the E2E Testing Track of Rira Game Hub.
Working directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\test_writer_1

MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context Files (READ THESE FIRST):
- `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md`
- `c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md`
- `c:\Users\User\Desktop\rira game hub\game-hub\TEST_INFRA.md`
- `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_e2e\SCOPE.md`
- `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_e2e_survey\analysis.md`

Objective: Setup automated test runner configuration in `package.json` and build the full 4-tier E2E test suite in `tests/e2e/` covering all 6 inventory features.

Detailed Requirements:
1. Update `package.json` to include `"test": "vitest run"` script and devDependencies (`vitest`, `happy-dom`, etc.). Ensure npm package dependencies are properly configured.
2. Build opaque-box E2E test files in `tests/e2e/`:
   a. `tests/e2e/tier1_feature_coverage.test.ts`:
      - Feature 1 (`prerender` script entry): >=5 test cases checking script existence, command configuration, package.json JSON structure, script invocation target.
      - Feature 2 (Prerender Narrative Character Summary): >=5 test cases verifying profile, stats, relics, weapons, team synergies HTML structure and content in pre-rendered static HTML outputs (`dist/gallery/*`).
      - Feature 3 (SynergyDeck UI & Utility): >=5 test cases verifying `synergyManager.ts` data lookup and `SynergyDeck.tsx` props, dark mode glassmorphism styles, and rendered UI elements.
      - Feature 4 (SynergyDeck Mounting): >=5 test cases verifying `SynergyDeck` mounting on detail pages (HSR, WW, NTE).
      - Feature 5 (CharacterReviewBoard `onCommentsLoaded` Fix): >=5 test cases verifying `onCommentsLoaded` prop execution on fetch, create, edit, upvote, delete.
      - Feature 6 (DiscussionForumPosting Schema): >=5 test cases verifying dynamic (`SEO.tsx`) and static (`prerender-meta.js`) `DiscussionForumPosting` JSON-LD schema generation with author, rating, text, and date.
      - Total Tier 1 test cases: >=30.
   b. `tests/e2e/tier2_boundary_corner.test.ts`:
      - Feature 1: >=5 boundary test cases (malformed scripts, empty package.json fields, custom environment flags).
      - Feature 2: >=5 boundary test cases (missing character stats, empty relic arrays, undefined team members, special character names).
      - Feature 3: >=5 boundary test cases (unknown gameId, missing party data fallback, invalid theme props, null character names).
      - Feature 4: >=5 boundary test cases (missing detail section IDs, undefined props, unmounted route states).
      - Feature 5: >=5 boundary test cases (null/undefined comment lists, empty comment text, boundary upvote counts, 0/5 rating limits).
      - Feature 6: >=5 boundary test cases (empty comment arrays, special characters in reviews, missing ratings, malformed dates).
      - Total Tier 2 test cases: >=30.
   c. `tests/e2e/tier3_cross_feature.test.ts`:
      - Pairwise cross-feature interactions: >=6 test cases (e.g. Prerender + JSON-LD static injection, ReviewBoard callback + dynamic SEO update, SynergyManager lookup + SynergyDeck detail page render, etc.).
   d. `tests/e2e/tier4_real_world.test.ts`:
      - Real-world application scenarios: >=5 scenario test cases (e.g. End-to-end user review posting triggering schema update and prerender meta summary generation, multi-game synergy card browsing scenario, etc.).
3. Execute the full test suite via `npm test` or `npx vitest run`. Ensure all test cases pass without errors.
4. Write your execution summary to `c:\Users\User\Desktop\rira game hub\game-hub\.agents\test_writer_1\handoff.md`.
5. Send a message to parent with the test execution status and results.
