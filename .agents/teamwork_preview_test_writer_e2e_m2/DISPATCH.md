# Dispatch Assignment — E2E Test Writer (Remediation Round 2)

## Identity & Scope
- Working directory: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_test_writer_e2e_m2`
- Original request path: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md`
- Scope document: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_e2e_pagespeed\SCOPE.md`
- Previous reviewer handoff: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_reviewer_e2e_r1\handoff.md`

## Required Fixes

### 1. Fix `npm run test:e2e` Execution Failure
- **Issue**: `runner.js` previously spawned `npx vitest` which fetched Vitest 4.1.10. Vitest 4.1.10 requires Node v20.12+ (`node:util` `styleText`) and crashed on system Node v20.9.0 with `SyntaxError`.
- **Fix**: Update `runner.js` so that `npm run test:e2e` (or `node tests/e2e/runner.js`) executes cleanly on Node v20.9.0 without crashing. You can build `runner.js` using Node's native test runner (`node --test`), or a pure Node runner script that imports/executes the test suites, or `npx vitest@3.0.5 run`, or `tsx`/`ts-node` test execution, ensuring 0 external version incompatibility.

### 2. Fix Facade Build Assertions in Tier 4
- **Issue**: `tier4_real_world.test.ts` only asserted `fs.existsSync` on `vite.config.ts` and `tsconfig.json` instead of running the build. Reviewer flagged this as a facade build assertion.
- **Fix**: Update `tier4_real_world.test.ts` to actually run `execSync('npm run build', { stdio: 'inherit' })` or `execSync('npx vite build')` / `npx tsc --noEmit` and assert exit code 0.

### 3. Maintain All 34 Opaque-Box Test Assertions
- Tier 1: WebP banner files exist & <70KB, RIFF/WEBP magic headers, Home.tsx WebP references, WCAG contrast class elimination (`text-gray-500`~`900`), `games.ts` local WebP banner paths.
- Tier 2: `/assets/unknown.webp` fallback paths, explicit `width={1024}` and `height={1024}` props on `LazyImage`, `hasError` state infinite loop guard.
- Tier 3: Cross-module navigation data structures, dark mode glassmorphism contrast synergy, `LazyImage` integration.
- Tier 4: Actual `npm run build` execution, repository-wide zero browser 404 URL static audit.

### 4. Update `TEST_READY.md`
- Reflect the updated test runner execution commands, real build execution test cases, and coverage summary.

## Verification Checklist
1. Run `npm run test:e2e` and verify exit code 0.
2. Run `node tests/e2e/runner.js` and verify exit code 0.
3. Write handoff report to `c:\Users\User\Desktop\rira game hub\game-hub\.agents\teamwork_preview_test_writer_e2e_m2\handoff.md` and send message to parent.

## Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-08-05T17:15:44Z Parent Update
**Context**: E2E Test Suite Remediation (Round 2)

**Content**: Challenger 1 identified an additional bug in `tests/e2e/tier4_real_world.test.ts`:
In `getAllSourceFiles(dir)`, the directory exclusion array `['node_modules', 'dist', '.git', '.vscode', '.agents']` does NOT exclude the `'tests'` directory itself.
This causes tests 4.4 and 4.5 to scan `tests/e2e/*.test.ts` and match the search pattern string literals inside the test files, resulting in false-positive test failures!

**Action**: Please add `'tests'` (or `tests/e2e`) to the directory exclusion list in `getAllSourceFiles` in `tier4_real_world.test.ts` so that test files do not match their own assertion target string literals. Ensure `npm run test:e2e` runs cleanly with exit code 0.


## 2026-08-05T17:15:52Z Parent Update
**Context**: E2E Test Suite Remediation (Round 2) — Additional Audit Finding

**Content**: Forensic Auditor 1 reported an additional edge-case finding in `tests/e2e/tier4_real_world.test.ts`:
In `getAllSourceFiles(dir)` directory traversal, encountering folders/paths with special/unicode characters (such as `10_Wiki/👥 Characters` or non-standard directory entries) caused an uncaught `ENOENT` stat error in `fs.statSync`.

**Action**: Please wrap `fs.statSync` inside a `try ... catch` block in `getAllSourceFiles` (or handle special directory paths gracefully) so directory traversal never throws `ENOENT`. Ensure `npm run test:e2e` and `node tests/e2e/runner.js` run smoothly.
