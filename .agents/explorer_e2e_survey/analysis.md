# Analysis Report: E2E Testing Survey & Architecture for Rira Game Hub

## Executive Summary
This survey evaluates the codebase structure, test runner environment, build scripts, and the 6 inventory features identified in `PROJECT.md`. Currently, the codebase does not have an automated test runner configured in `package.json` nor any existing `*.test.ts` / `*.spec.ts` files in the repository. To enable automated opaque-box E2E testing across all 5 testing tiers, `vitest` should be added to `package.json` `devDependencies` with `"test": "vitest run"`.

---

## 1. Test Runner & Execution Setup Analysis

### 1.1 Current State of `package.json`
- **File Path**: `c:\Users\User\Desktop\rira game hub\game-hub\package.json`
- **Existing Scripts**:
  ```json
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/fetch-notion-data.js",
    "build": "node scripts/generate-sitemap.js && vite build && node scripts/prerender-meta.js",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  }
  ```
- **Dependencies**:
  - Installed dependencies include `@supabase/supabase-js`, `cheerio` (v1.2.0), `axios`, `react` (v19.2.4), `react-router` (v8.3.0).
  - `devDependencies` include `@tailwindcss/vite`, `@types/node`, `typescript` (v5.8.2), `vite` (v6.2.0).
  - Neither `vitest` nor `jest` is present in `package.json`.
  - `"test"` script is currently missing.

### 1.2 Automated Test Execution Strategy
- **Recommended Runner**: `vitest` (v3.x)
- **Rationale**:
  - The project is built on Vite (`vite.config.ts`, `"type": "module"`).
  - Vitest seamlessly inherits `vite.config.ts` alias resolutions (`@/` -> root) and React plugin configuration (`@vitejs/plugin-react`).
  - Supports ESM, TypeScript (`.ts`/`.tsx`), DOM simulation (JSOM/happy-dom), and native assertion utilities (`describe`, `it`, `expect`, `vi.fn()`).
- **Required Script Addition**:
  - In `package.json`: `"test": "vitest run"`
  - In `devDependencies`: `"vitest": "^3.0.0"`, `"happy-dom": "^17.0.0"` (or `@testing-library/react` if needed for React component mounting).

---

## 2. Feature Inventory Survey & Opaque-Box E2E Testing Strategy

The 6 inventory features from `PROJECT.md` have been surveyed for structure and opaque-box testability:

### Feature 1: `npm run prerender` Script Entry
- **Target File**: `package.json`
- **Current State**: Missing `"prerender": "node scripts/prerender-meta.js"` in `"scripts"`.
- **E2E Test Scope**:
  - Tier 1 check: Verify `package.json` contains `"prerender": "node scripts/prerender-meta.js"`.
  - Verify script execution via `npm run prerender` succeeds without fatal errors.

### Feature 2: Prerender Narrative Character Summary
- **Target File**: `scripts/prerender-meta.js` & static HTML files under `dist/gallery/`
- **Current State**:
  - `scripts/prerender-meta.js` currently injects rudimentary HTML (`generateWwCharacterHtml` and `generateHsrCharacterHtml`) containing raw localization strings.
  - Does not construct full narrative paragraphs covering character profile, stats, recommended relics/weapons, and team synergies.
- **E2E Test Scope**:
  - Tier 2 check: Run build + prerender script, parse static HTML files in `dist/gallery/hsr/character/*` and `dist/gallery/ww/character/*` using `cheerio`.
  - Verify `<div id="root">` contains valid `<article>` tags with narrative text covering profile, stats, relic/weapon recommendations, and party synergies.
  - Verify absence of unresolved template tags (`undefined`, `null`, `[object Object]`).

### Feature 3: SynergyDeck UI Component & Synergy Manager Utility
- **Target Files**: `common-hub/components/SynergyDeck.tsx` & `common-hub/utils/synergyManager.ts`
- **Current State**: Neither file exists in `common-hub/` yet.
- **E2E Test Scope**:
  - Tier 3 check:
    - Test `synergyManager.ts`: Verify function `getSynergies(characterName, gameId)` returns structured party data for HSR, WW, and NTE games.
    - Test `SynergyDeck.tsx`: Verify component renders dark mode / glassmorphism card layout, character roles, element badges, and synergy descriptions given valid props.

### Feature 4: SynergyDeck Mounting on Detail Pages
- **Target Files**:
  - HSR: `hsr-hub/pages/CharacterDetail.tsx` (Section 05)
  - WW: `ww-hub/pages/CharacterDetail.tsx` (Section 06)
  - NTE: `nte-hub/pages/CharacterDetail.tsx` (Section 05)
- **Current State**: CharacterDetail pages do not yet import or mount `SynergyDeck`.
- **E2E Test Scope**:
  - Tier 3/4 check:
    - Verify `SynergyDeck` is imported and mounted inside the correct section in all 3 detail page components.
    - Inspect DOM or JSX AST to verify props `characterName`/`characterId` and `gameId` are correctly bound.

### Feature 5: CharacterReviewBoard `onCommentsLoaded` Fix
- **Target File**: `common-hub/components/CharacterReviewBoard.tsx`
- **Current State**:
  - Interface `Props` in `CharacterReviewBoard.tsx` defines `onCommentsLoaded?: (comments: any[]) => void;` (line 12).
  - However, `onCommentsLoaded` is **never called** anywhere in `CharacterReviewBoard.tsx` during `fetchReviews` (line 36) or mutation handlers (`handleCreateReview`, `handleToggleUpvote`, `handleEdit`, `handleDelete`).
  - As a result, parent React state `commentsData` in `CharacterDetail` pages remains empty (`[]`).
- **E2E Test Scope**:
  - Tier 4 check:
    - Mount `CharacterReviewBoard` with mock callback `onCommentsLoaded = vi.fn()`.
    - Verify callback is called with parsed `CommentData[]` array upon loading comments.
    - Verify callback is re-invoked when comments are created, edited, upvoted, or deleted.

### Feature 6: DiscussionForumPosting JSON-LD Schema Enhancement
- **Target Files**: `common-hub/components/SEO.tsx` & `scripts/prerender-meta.js`
- **Current State**:
  - `SEO.tsx` lines 239–262 contains dynamic `DiscussionForumPosting` schema generator, but `CommentData` interface lacks `rating?: number` property.
  - `scripts/prerender-meta.js` does not statically inject `DiscussionForumPosting` JSON-LD schema into pre-rendered static HTML head.
- **E2E Test Scope**:
  - Tier 4 check:
    - Test `SEO.tsx`: Render `<SEO commentsData={[...]} />` and parse generated `<script type="application/ld+json">`.
    - Verify JSON-LD complies with schema.org `DiscussionForumPosting` specifications (`headline`, `author`, `comment` array with `author`, `datePublished`, `text`, `upvoteCount`, `reviewRating`).
  - Tier 2 check:
    - Inspect `dist/gallery/*/index.html` static head to ensure static `DiscussionForumPosting` JSON-LD tag is injected.

---

## 3. Tiered E2E Test Suite Structure & Adversarial Hardening (Tier 5)

To ensure complete coverage across all 6 features, the test suite in `tests/e2e/` will be structured into 5 Tiers:

| Tier | Category | Scope & Objective |
|------|----------|-------------------|
| **Tier 1** | Configuration & Scripts | `package.json` script entry (`prerender`), build command compliance |
| **Tier 2** | Static Prerender & HTML | `prerender-meta.js` execution, HTML output in `dist/gallery/`, narrative summaries, static JSON-LD in `<head>` |
| **Tier 3** | SynergyDeck UI & Utility | `synergyManager.ts` lookup logic, `SynergyDeck.tsx` rendering & styling, detail page mounting (HSR, WW, NTE) |
| **Tier 4** | Dynamic Review Board & SEO | `CharacterReviewBoard.tsx` `onCommentsLoaded` callback execution, React state sync, `SEO.tsx` dynamic JSON-LD injection |
| **Tier 5** | Adversarial Hardening | Edge cases: empty reviews, special character names, missing party data fallbacks, rating boundaries (1–5), malformed JSON-LD |

---

## 4. Recommendations & Next Steps

1. Update `package.json` to include `"vitest"` in `devDependencies` and `"test": "vitest run"` in `"scripts"`.
2. Create test directory structure: `tests/e2e/` containing modular test files:
   - `tests/e2e/tier1_config.test.ts`
   - `tests/e2e/tier2_prerender.test.ts`
   - `tests/e2e/tier3_synergy.test.ts`
   - `tests/e2e/tier4_review_seo.test.ts`
   - `tests/e2e/tier5_adversarial.test.ts`
3. Implement tests using opaque-box assertions (validating external inputs, outputs, HTML files, DOM structure, and exported interfaces without relying on internal private state).
