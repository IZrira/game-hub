# Handoff Report: Milestone 1 (R1) - Automated Character Analysis Summary via `prerender-meta.js`

**Agent**: Explorer 1 (Milestone 1)  
**Working Directory**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_exp_1`  
**Target Recipient**: Sub-Orchestrator M1 / Implementer  
**Date**: 2026-08-05  

---

## 1. Observation

### 1.1 `package.json` Configuration (`package.json:6-12`)
- **Current State**:
  ```json
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/fetch-notion-data.js",
    "build": "node scripts/generate-sitemap.js && vite build && node scripts/prerender-meta.js",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  }
  ```
- **Finding**: The script `"prerender": "node scripts/prerender-meta.js"` is missing from `package.json`.

### 1.2 Current `scripts/prerender-meta.js` Script Behavior (`scripts/prerender-meta.js:203-244, 282-326`)
- `prerender-meta.js` is an ES module script (`"type": "module"` in `package.json`) run directly via Node.js (`node scripts/prerender-meta.js`).
- `generateWwCharacterHtml(id)` and `generateHsrCharacterHtml(id)` currently only extract character names and locale skill lines from `common-hub/locales/ww/ww_characters_ko.json` and `common-hub/locales/hsr/hsr_characters_ko.json`.
- **Deficiency**: Pre-rendered HTML inside `<div id="root">` does not include build guides (recommended relics/echoes, main/sub stats, target stats, recommended light cones/weapons) or team party synergies, and lacks a synthesized narrative paragraph (`Character Analysis Summary`).

### 1.3 Data Sources for Character Data, Guides, and Parties

| Game | Data Category | File Location / Path | Key Export / Data Structures |
|---|---|---|---|
| **HSR** | Character Metadata | `hsr-hub/data/characters/hsr/*.ts` (e.g. `acheron.ts`) | Default export `Character` (`id`, `name`, `attribute`, `path`, `rarity`, `briefInfo`) |
| **HSR** | Guide Recommendations | `hsr-hub/data/guides/*.ts` (e.g. `아케론.ts`) & `hsr-hub/data/guides/index.ts` | Exported `CharacterGuide` objects & `HSR_CHARACTER_GUIDES` array (`bestRelics`, `bestOrnaments`, `mainStats`, `subStats`, `targetStats`, `bestLightCones`, `skillPriority`, `recommendedEidolon`) |
| **HSR** | Team Party Data | `hsr-hub/data/parties/index.ts` & `follow_up.ts`, `dot.ts`, `break.ts`, `aoe.ts`, `single.ts`, `elation.ts`, `memory.ts` | Exported `HSR_PARTIES` array of `PartyCombination` (`name`, `description`, `mainDPS`, `members` with `name`, `role`, `substitutes`) |
| **WW** | Character Metadata | `ww-hub/data/characters/ww/*.ts` (e.g. `jiyan.ts`) | Default export `WuwaCharacter` (`id`, `name`, `folderName`, `attribute`, `weaponType`, `rarity`, `briefInfo`) |
| **WW** | Guide Recommendations | `ww-hub/data/guides.ts` | Exported `WW_CHARACTER_GUIDES` array of `WuwaCharacterGuide` (`id`, `weapons`, `echoSets`, `mainEchoes`, `targetStats`, `mainStats`, `subStats`, `skillPriority`, `synergyCharacters`) |
| **WW** | Team Party Data | `ww-hub/data/parties.ts` | Exported `WW_PARTY_COMBINATIONS` array of `PartyCombination` (`id`, `name`, `description`, `members`, `pros`, `cons`) |
| **NTE / Notion** | Character Metadata | `nte-hub/data/index.ts` & `common-hub/data/notion-data.json` | `NTE_CHARACTERS` array & JSON items (`type === '캐릭터'`, `name`, `briefInfo`, `content`) |

---

## 2. Logic Chain

1. **Problem Statement**: AdSense crawler flags character detail pages as "Thin Content" when pre-rendered static HTML inside `<div id="root">` contains only sparse raw skill titles without narrative analysis, gear recommendations, or team synergy details.
2. **`package.json` Requirement**: Adding `"prerender": "node scripts/prerender-meta.js"` enables running `npm run prerender` directly for local testing and CI/CD validation without requiring a full build chain.
3. **Data Assembly Strategy in Node.js ES Module (`prerender-meta.js`)**:
   - Because `prerender-meta.js` runs in pure Node.js (`"type": "module"`), loading `.ts` files directly via native ESM `import` may require TS loader flags or TS-to-JS parsing.
   - **Recommended Data Loading Approach**:
     - **Option A (Dynamic Regex / `fs.readFileSync` + `Function` Evaluator)**: `prerender-meta.js` already successfully uses `fs.readFileSync` and `Function` constructor evaluation to parse `common-hub/data/blogData.ts` (lines 126-142).
     - **Option B (Safe TS Literal Parser / Extractor)**: A helper function `parseTsExport(filePath, exportName)` can strip TS type declarations (`interface`, type annotations `: CharacterGuide`, etc.) using regex and evaluate the object literal using `new Function('return ' + strippedCode)()`.
     - **Option C (Localized JSON / Aggregated Data Map)**: Create or aggregate lightweight data maps directly inside `prerender-meta.js` by reading guide files (`hsr-hub/data/guides/*.ts` and `ww-hub/data/guides.ts`).
4. **Narrative Summary Paragraph Generation**:
   For each character, `generateWwCharacterHtml(id)` and `generateHsrCharacterHtml(id)` will build a multi-section HTML structure:
   - `<section class="narrative-summary">`:
     - **Overview**: Combining name, element/attribute, path/weapon, rarity, and brief background profile.
     - **Recommended Gear & Target Stats**: Best relics/echoes, main stats (body/boots/sphere/rope or 4-3-3-1-1 cost), sub stats, and key target stats (e.g. Crit Rate 80%+, Crit DMG 160%+).
     - **Recommended Light Cones / Weapons**: Top 5-star and 4-star weapons ranked in order.
     - **Team Synergies & Compositions**: Recommended party members and team synergies (e.g. Acheron DoT team, Jiyan Hypercarry).
5. **DOM HTML Injection**:
   Inject the synthesized HTML into `baseHtml` inside `<div id="root">...</div>` before writing `dist/gallery/<game>/character/<id>/index.html`.

---

## 3. Caveats

- **Read-Only Exploration**: No modifications have been made to source code files (`package.json`, `scripts/prerender-meta.js`, etc.).
- **TS Parsing Robustness**: `prerender-meta.js` must handle potential regex edge cases gracefully (e.g. fallback to locale data if a guide file is missing or contains complex TS syntax).
- **Encoding & Korean Characters**: File names under `hsr-hub/data/guides/` contain Korean character names (e.g. `아케론.ts`). File reading must ensure `utf8` encoding.

---

## 4. Conclusion & Recommended Implementation Strategy

### 4.1 Update `package.json`
Add `"prerender": "node scripts/prerender-meta.js"` under `"scripts"`:
```json
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/fetch-notion-data.js",
    "build": "node scripts/generate-sitemap.js && vite build && node scripts/prerender-meta.js",
    "prerender": "node scripts/prerender-meta.js",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  }
```

### 4.2 Enhance `scripts/prerender-meta.js`

1. **Add Guide & Party Loader Utilities**:
   - `loadHsrGuide(charName)`: Read `hsr-hub/data/guides/<charName>.ts`, strip TS type annotations, parse `CharacterGuide` object.
   - `loadWwGuide(charId)`: Read `ww-hub/data/guides.ts` and find matching guide object by `id`.
   - `loadHsrParties(charName)`: Find party combinations in `hsr-hub/data/parties/` where `mainDPS === charName` or `members` include `charName`.
   - `loadWwParties(charId)`: Find party combinations in `ww-hub/data/parties.ts` where character matches.

2. **Synthesize Narrative `Character Analysis Summary`**:
   Construct rich HTML snippet for each character:
   ```html
   <article>
     <h1>${name}</h1>
     <p class="brief">${briefInfo}</p>

     <section class="character-analysis-summary">
       <h2>캐릭터 종합 분석 및 육성 가이드</h2>
       <p>${name}은(는) ${attribute} 속성 ${pathOrWeapon} 운명의 길 캐릭터로... [조합 설명]</p>
       
       <h3>추천 유물 및 에코 세팅</h3>
       <p>최고의 세팅은 ${bestRelics}입니다. 주 옵션으로는 ${mainStats}을 권장하며, 추천 목표 스탯은 ${targetStats}입니다.</p>

       <h3>추천 광추 / 무기</h3>
       <p>추천 장비: ${bestWeapons}.</p>

       <h3>추천 파티 조합 및 시너지</h3>
       <p>추천 파티: ${partyNames} (${partyMembers}).</p>
     </section>

     <!-- Existing skill details -->
   </article>
   ```

3. **Inject HTML into `<div id="root">`**:
   Pass synthesized inner content to `createPrerenderedPage()`.

---

## 5. Verification Method

1. **Execute Prerender Script**:
   ```bash
   npm run prerender
   ```
2. **Inspect Pre-rendered HTML Files**:
   - `dist/gallery/hsr/character/acheron/index.html`
   - `dist/gallery/ww/character/jiyan/index.html`
3. **Invalidation Criteria**:
   Verification fails if `<div id="root">` in generated HTML files does NOT contain:
   - `<section class="character-analysis-summary">` or `Character Analysis Summary` / `캐릭터 종합 분석` text.
   - Specific relic/echo recommendations (e.g. `"사수에 잠수한 선구자"` or `"스쳐가는 바람 5세트"`).
   - Team synergy/party member names.
