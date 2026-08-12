# Analysis Report: Requirement R1 - Automated Character Analysis Summary via `prerender-meta.js`

**Author**: Survey Explorer 1  
**Target Milestone**: Survey & Requirement R1 Analysis  
**Working Directory**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_survey_1`  
**Date**: 2026-08-05  

---

## 1. Executive Summary

Requirement R1 aims to eliminate AdSense "Thin Content" issues and maximize SEO indexation by automatically generating a rich, descriptive narrative analysis paragraph (`Character Analysis Summary`) for every game character (Honkai: Star Rail, Wuthering Waves, and Neverness to Everness/Notion entries) based on their stats, recommended relics/echoes, weapons/light cones, and team synergies. This summary must be injected directly into `<div id="root">` of static HTML files during the build process via `scripts/prerender-meta.js`.

---

## 2. Codebase Investigation & File Mapping

### 2.1 Build & Prerender Scripts
- **`package.json`**:
  - `build` script: `"node scripts/generate-sitemap.js && vite build && node scripts/prerender-meta.js"`
  - *Gap Identified*: Currently `package.json` does not have a standalone `"prerender": "node scripts/prerender-meta.js"` script entry. Adding this script allows `npm run prerender` to execute the prerendering phase independently.
- **`scripts/prerender-meta.js`**:
  - ES module script (`"type": "module"`) executed post `vite build`.
  - Reads `dist/index.html` as `baseHtml`.
  - Iterates dynamic character routes for WW (`/gallery/ww/character/:id`), HSR (`/gallery/hsr/character/:id`), weapons, Notion items, SEO policy pages, and blog posts.
  - Replaces `<div id="root"></div>` with `<div id="root">${innerContent}</div>` and writes static `index.html` files under `dist/`.

### 2.2 Character Data Structures & Locations

#### A. Honkai: Star Rail (HSR)
1. **Character Basic Info & Skills**: `hsr-hub/data/characters/hsr/${id}.ts`
   - Data structure: `Character` interface (`id`, `name`, `folderName`, `attribute`, `path`, `rarity`, `briefInfo`, `baseStats`, `skills`, `additionalAbilities`, `eidolons`).
2. **Build Guides & Stats**: `hsr-hub/data/guides/*.ts` (exported in `hsr-hub/data/guides/index.ts`)
   - Data structure: `CharacterGuide` interface (`characterName`, `bestRelics`, `bestOrnaments`, `bestLightCones`, `mainStats`, `subStats`, `targetStats`, `skillPriority`, `recommendedEidolon`, `eidolonEfficiency`).
3. **Team Synergies & Parties**: `hsr-hub/data/parties/index.ts` (`allParties`)
   - Modules: `follow_up.ts`, `dot.ts`, `aoe.ts`, `break.ts`, `single.ts`, `memory.ts`, `elation.ts`.
   - Data structure: `PartyCombination` interface (`id`, `name`, `description`, `mainDPS`, `members`, `tags`, `category`).

#### B. Wuthering Waves (WW)
1. **Character Basic Info & Skills**: `ww-hub/data/characters/ww/${id}.ts`
   - Data structure: `Character` interface (`id`, `name`, `folderName`, `attribute`, `weaponType`, `rarity`, `briefInfo`).
2. **Build Guides & Stats**: `ww-hub/data/guides.ts` (`WW_CHARACTER_GUIDES`)
   - Data structure: `WuwaCharacterGuide` interface (`id`, `weapons`, `echoSets`, `mainEchoes`, `mainStats`, `subStats`, `targetStats`, `skillPriority`, `synergyCharacters`).
3. **Team Synergies & Parties**: `ww-hub/data/parties.ts` (`WW_PARTY_COMBINATIONS`)
   - Data structure: `PartyCombination` interface (`id`, `name`, `description`, `members`, `pros`, `cons`).

#### C. Neverness to Everness (NTE) & Notion Data
1. **Character Info**: `common-hub/data/notion-data.json`
   - Filter: `type === '캐릭터'` (`gameId === 'nte'` / `dbSource === 'nte_characters'`).
   - Fields: `name`, `briefInfo`, `combatRoles`, `weapon`, `abilityAttribute`, `content`.

---

## 3. Gap Analysis: Current vs. Required HTML Output

| Component | Current `prerender-meta.js` Output | Required R1 Output |
|---|---|---|
| `<title>` & `<meta>` | Replaces title, description, og:*, twitter:* | Retain current meta injection |
| `<div id="root">` | Basic `<h1>` name and raw skill descriptions | Injected `<article>` with structured `Character Analysis Summary` narrative block + full guide breakdown |
| Narrative Summary | None | Dynamically generated paragraph synthesizing Profile + Stats + Relics/Echoes + Weapons + Synergies |
| Relic / Echo Specs | Not rendered in static HTML | Rendered in narrative summary & static list |
| Weapon Recommendations | Not rendered in static HTML | Rendered in narrative summary & static list |
| Team Synergy Info | Not rendered in static HTML | Rendered in narrative summary & static list |

---

## 4. Proposed Narrative Analysis Summary Generation Logic

For each character during `runPrerender()`, `prerender-meta.js` will generate a structured narrative text block.

### 4.1 Narrative Template Architecture
The generated summary paragraph follows a 4-part logical flow:

1. **포지션 및 메커니즘 개요 (Overview & Role)**:
   > "{name}은(는) {gameName}의 {rarity}성 {attribute} 속성 {pathOrWeapon} 캐릭터로, {briefInfo}의 특성을 지닌 메인/서브 딜러(또는 서포터)입니다."
2. **추천 유물/에코 및 스탯 세팅 (Relics/Echoes & Stats)**:
   > "종결 유물(에코) 세팅으로는 '{bestRelic}' 세트와 '{bestOrnament}'을(를) 추천하며, 주 옵션은 {mainStatsString}, 부 옵션은 {subStatsString} 순으로 우수합니다. 목표 스탯으로는 {targetStatsString}을 달성하는 것이 권장됩니다."
3. **추천 무기/광추 (Weapons & Light Cones)**:
   > "최적의 무기(광추)로는 전용 무기인 '{signatureWeapon}'와(과) 효율적인 대안인 '{altWeapon}'이(가) 강력히 추천됩니다."
4. **추천 파티 시너지 (Team Synergy)**:
   > "파티 조합 시 {synergyCharactersString} 캐릭터와의 시너지가 뛰어나며, {partyName}({partyDesc}) 파티 구성 시 최대 화력을 발휘할 수 있습니다."

### 4.2 Static HTML Output Injection Structure
In `generateWwCharacterHtml(id)` and `generateHsrCharacterHtml(id)` inside `prerender-meta.js`:

```html
<article class="character-static-guide">
  <h1>${name} 상세 가이드 및 캐릭터 분석</h1>
  <section class="narrative-analysis-summary">
    <h2>캐릭터 종합 분석 요약 (Character Analysis Summary)</h2>
    <p>${generatedNarrativeParagraph}</p>
  </section>
  <section class="guide-details">
    <h3>추천 유물 / 에코 세팅</h3>
    <p>${relicDetails}</p>
    <h3>추천 무기 / 광추</h3>
    <p>${weaponDetails}</p>
    <h3>추천 파티 시너지</h3>
    <p>${synergyDetails}</p>
  </section>
  <section class="skills-info">
    <!-- Existing skill details -->
  </section>
</article>
```

---

## 5. Verification Plan for R1

1. **Package Script Check**: Verify `npm run prerender` can be executed from terminal (`package.json` `"prerender": "node scripts/prerender-meta.js"`).
2. **Build Execution**: Run `npm run build` or `npm run prerender`.
3. **Static File Inspection**:
   - Check `dist/gallery/hsr/character/acheron/index.html` for `<div id="root">` content.
   - Confirm presence of `<section class="narrative-analysis-summary">` and `<p>` containing rich narrative summary text for Acheron (relics, light cones, stats, synergies).
   - Check `dist/gallery/ww/character/jiyan/index.html` for Jiyan's narrative summary text (echoes, weapons, stats, synergies).

---

## 6. Next Steps for Implementation Team

1. Add `"prerender": "node scripts/prerender-meta.js"` to `package.json`.
2. Enhance `scripts/prerender-meta.js` with guide data parsing helpers (for HSR guides, WW guides, HSR parties, and WW parties).
3. Implement narrative text generator function `generateNarrativeSummary(char, guide, parties)` in `scripts/prerender-meta.js`.
4. Update `generateWwCharacterHtml` and `generateHsrCharacterHtml` to inject the generated summary into static HTML.
5. Verify build output in `dist/`.
