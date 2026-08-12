# Handoff Report: Requirement R1 Character Analysis Summary Synthesis Logic & Schema

**Agent**: Explorer 2 (Milestone 1)  
**Working Directory**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_exp_2`  
**Target Recipient**: Parent Sub-Orchestrator (`sub_orch_m1`) / Worker Implementation Agent  
**Date**: 2026-08-05  

---

## 1. Observation

### 1.1 Requirements & Goals
- **Original Requirement R1 (`.agents/ORIGINAL_REQUEST.md:83-86`)**:
  > "Create a system that automatically generates a descriptive, narrative analysis paragraph (`Character Analysis Summary`) for each character based on their stats, recommended relics, weapons, and team synergy. This summary must be injected into the static HTML via the `prerender-meta.js` script to ensure Googlebot can index it as rich text."
- **Scope Contract (`.agents/sub_orch_m1/SCOPE.md:1-15`)**:
  > Parse character metadata, guide recommendations (relics/echoes, stats, light cones/weapons), team party data in `prerender-meta.js`, synthesize narrative `Character Analysis Summary` paragraphs, and inject them into `<div id="root">` of generated pre-rendered HTML files.
- **Survey Explorer 1 Assessment (`.agents/explorer_survey_1/handoff.md:17-25`)**:
  > `scripts/prerender-meta.js` currently loops over character IDs but only outputs simple `<h1>` titles and raw skill descriptions from locale files (`ww_characters_ko.json` / `hsr_characters_ko.json`). It completely omits guide recommendations, target stats, weapon builds, and team synergies.

### 1.2 Data Representation Across Supported Games

1. **Honkai: Star Rail (HSR)**:
   - **Character Metadata**: `hsr-hub/data/characters/hsr/*.ts` & `common-hub/locales/hsr/hsr_characters_ko.json`
     - Fields: `name`, `attribute` (e.g. 번개), `path` (e.g. 공허), `rarity` (e.g. 5), `briefInfo`, `baseStats`.
   - **Guide Recommendations**: `hsr-hub/data/guides/*.ts` (aggregated in `hsr-hub/data/guides/index.ts` as `HSR_CHARACTER_GUIDES`)
     - Interface: `CharacterGuide`
     - `bestRelics`: array of `string | { name, note }` (e.g. `["사수에 잠수한 선구자"]`)
     - `bestOrnaments`: array of `string | { name, note }` (e.g. `["이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"]`)
     - `mainStats`: `{ body, boots, sphere, rope }`
     - `subStats`: `string[]` (e.g. `["치명타 확률", "치명타 피해", "공격력", "속도"]`)
     - `targetStats`: `array of { label, value, note? }` (e.g. `[{ label: "치명타 확률", value: "80% 이상" }]`)
     - `bestLightCones`: array of `string | { name, note }` (e.g. `["흘러가는 강가를 따라"]`)
     - `skillPriority`: `string[]`
   - **Team Compositions**: `hsr-hub/data/parties/index.ts` (aggregated `HSR_PARTIES` from `aoe.ts`, `dot.ts`, `follow_up.ts`, `single.ts`, `break.ts`, `elation.ts`, `memory.ts`)
     - Interface: `PartyCombination` (`id`, `name`, `description`, `mainDPS`, `members` array with `name` and `role`, `substitutes`)

2. **Wuthering Waves (WW)**:
   - **Character Metadata**: `ww-hub/data/characters/ww/*.ts` & `common-hub/locales/ww/ww_characters_ko.json`
     - Fields: `name`, `attribute` (e.g. 기류), `weaponType` (e.g. 대검), `rarity` (e.g. 5), `briefInfo`, `roles`.
   - **Guide Recommendations**: `ww-hub/data/guides.ts` (`WW_CHARACTER_GUIDES`)
     - Interface: `WuwaCharacterGuide`
     - `echoSets`: array of `string | { name, note? }`
     - `mainEchoes`: array of `{ name, reason? }`
     - `weapons`: array of `{ name, rank }` (rank 1 = top priority weapon)
     - `targetStats`: array of `{ label, value }`
     - `mainStats`: array of `WuwaMainStat` (`{ cost, stats, note? }`)
     - `subStats`: `string[]`
     - `skillPriority`: `string[]`
     - `synergyCharacters`: `string[]`
     - `variants`: optional array of setting variants (fallback if base arrays are empty)
   - **Team Compositions**: `ww-hub/data/parties.ts` (`WW_PARTY_COMBINATIONS`)
     - Interface: `PartyCombination` (`id`, `name`, `description`, `members` array with `name` and `role`, `pros`, `cons`)

3. **Neverness to Everness (NTE) & Notion Data**:
   - **Character Metadata**: `nte-hub/data/index.ts` (`NTE_CHARACTERS`) & `common-hub/data/notion-data.json`
     - Fields: `name`, `attribute` (e.g. 령, 빛, 암), `weaponType`, `rarity`, `briefInfo`, `content`.

---

## 2. Logic Chain

1. **Problem Statement**:
   Search engines (Googlebot) flag dynamic client-rendered single-page applications (SPAs) with empty static content as AdSense "Thin Content". Pre-rendered static pages currently lack comprehensive text descriptions.
2. **Solution Strategy**:
   During `npm run prerender` (which executes `scripts/prerender-meta.js`), extract character profiles, guide recommendations, and team party data for every character across HSR, WW, and NTE. Then, synthesize a 4-sentence narrative `Character Analysis Summary` paragraph and inject it into `<div id="root">` inside a semantic `<section class="narrative-analysis-summary">` tag.
3. **Data Synthesis Approach**:
   Construct a unified intermediate data object `CharacterAnalysisData` for each character. Map game-specific fields (HSR Relics/LightCones, WW Echoes/Weapons) into normalized properties (`bestGear`, `mainEchoesOrOrnaments`, `bestWeapons`, `targetStats`, `subStats`, `recommendedParties`).
4. **Narrative Generation Structure**:
   Assemble sentences following a 4-pillar narrative formula:
   - **Sentence 1**: Profile & Combat Role (Name, Rarity, Attribute, Weapon/Path, Brief info/Role).
   - **Sentence 2**: Gear & Weapon Recommendations (Best Relics/Echoes, Ornaments/Main Echoes, Light Cones/Weapons).
   - **Sentence 3**: Stat Priorities & Target Benchmarks (Key target stats thresholds and sub-stat priorities).
   - **Sentence 4**: Team Synergy & Compositions (Matching team party names, members, or synergy partners).

---

## 3. Caveats

- **Pure Node.js Execution (`scripts/prerender-meta.js`)**:
  `prerender-meta.js` runs in pure Node.js (`"type": "module"` in `package.json`). While `.ts` files contain TypeScript type annotations, `prerender-meta.js` can safely parse guide objects from TS files using regex replacement (stripping `: CharacterGuide`, `: WuwaCharacterGuide[]`, etc.) followed by JS evaluated literals via `new Function('return ' + string)()`, which is already the established pattern used in `prerender-meta.js:134` (`getBlogPosts()`).
- **Optional Data Fallbacks**:
  Some characters (e.g. newly released or NTE characters) may have partial guide or party data. The narrative synthesizer must gracefully check for array existence and lengths, producing fluent sentences even when optional fields (like team parties or ornaments) are absent.
- **Variant Handling**:
  In `ww-hub/data/guides.ts`, some characters (e.g. `baizhi`, `sanhua`, `zhezhi`) define `variants` instead of top-level `echoSets`. The extraction logic must check `guide.echoSets` first, and if empty, fallback to `guide.variants[0].echoSets` and `guide.variants[0].mainEchoes`.

---

## 4. Conclusion & Technical Blueprint for Worker

Worker should update `scripts/prerender-meta.js` and `package.json` according to the following blueprint.

### 4.1 Schema Definition (`CharacterAnalysisData`)

```typescript
export interface CharacterAnalysisData {
  id: string;
  gameId: 'hsr' | 'ww' | 'nte';
  name: string;
  rarity?: number;
  attribute?: string;        // Attribute/Element (e.g. 번개, 기류, 령)
  pathOrWeapon?: string;     // HSR Path (공허) or WW Weapon (대검)
  briefInfo?: string;
  role?: string;             // Combat role
  
  // Recommended Gear & Builds
  bestGear: string[];                // Best Relics (HSR) or Echo Sets (WW)
  mainEchoesOrOrnaments: string[];   // Best Ornaments (HSR) or Main Echoes (WW)
  bestWeapons: string[];             // Best Light Cones (HSR) or Weapons (WW)
  
  // Stat Priorities
  targetStats: { label: string; value: string }[];
  subStats: string[];
  
  // Synergies & Parties
  synergyCharacters: string[];
  recommendedParties: { name: string; members: string[] }[];
}
```

### 4.2 Data Extraction Implementations for Node.js

#### A. HSR Data Extraction
```javascript
function extractHsrAnalysisData(id) {
  const charMeta = parseHsrCharacter(id);
  const charName = charMeta?.name || id;
  
  // 1. Read Guide File (e.g. hsr-hub/data/guides/아케론.ts)
  const guideFilePath = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides', `${charName}.ts`);
  let guideData = null;
  if (fs.existsSync(guideFilePath)) {
    const raw = fs.readFileSync(guideFilePath, 'utf8');
    // Strip TS interface annotation and parse object
    const objectStr = raw.replace(/export\s+const\s+\w+:\s*CharacterGuide\s*=\s*/, '').replace(/;\s*$/, '');
    try {
      guideData = new Function('return ' + objectStr)();
    } catch(e) {}
  }
  
  // Extract fields with helpers to normalize string | { name } objects
  const normalizeNames = (arr) => (arr || []).map(item => typeof item === 'string' ? item : item.name);
  
  const bestGear = normalizeNames(guideData?.bestRelics);
  const mainEchoesOrOrnaments = normalizeNames(guideData?.bestOrnaments);
  const bestWeapons = normalizeNames(guideData?.bestLightCones);
  const targetStats = (guideData?.targetStats || []).map(t => ({ label: t.label, value: t.value }));
  const subStats = guideData?.subStats || [];
  
  // 2. Match HSR Parties
  // Find party combinations where mainDPS === charName or members include charName
  const partyList = getHsrPartiesForCharacter(charName);
  
  return {
    id,
    gameId: 'hsr',
    name: charName,
    rarity: 5, // or from charMeta
    attribute: charMeta?.attribute || '특수',
    pathOrWeapon: charMeta?.path || '',
    briefInfo: charMeta?.briefInfo || '',
    bestGear,
    mainEchoesOrOrnaments,
    bestWeapons,
    targetStats,
    subStats,
    synergyCharacters: [],
    recommendedParties: partyList
  };
}
```

#### B. WW Data Extraction
```javascript
function extractWwAnalysisData(id) {
  const charMeta = parseWwCharacter(id);
  const charName = wwKoData[`character.${id}.name`] || charMeta?.name || id;
  
  // Load WW_CHARACTER_GUIDES from ww-hub/data/guides.ts
  const guide = getWwGuideById(id);
  
  let echoSets = (guide?.echoSets || []).map(e => typeof e === 'string' ? e : e.name);
  let mainEchoes = (guide?.mainEchoes || []).map(m => m.name);
  
  // Fallback to variant 0 if top-level echoSets empty
  if (echoSets.length === 0 && guide?.variants?.[0]) {
    echoSets = (guide.variants[0].echoSets || []).map(e => typeof e === 'string' ? e : e.name);
    mainEchoes = (guide.variants[0].mainEchoes || []).map(m => m.name);
  }
  
  const weapons = (guide?.weapons || [])
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .map(w => w.name);
    
  const partyList = getWwPartiesForCharacter(charName, id);

  return {
    id,
    gameId: 'ww',
    name: charName,
    rarity: charMeta?.rarity || 5,
    attribute: charMeta?.attribute || '기류',
    pathOrWeapon: charMeta?.weaponType || '무기',
    briefInfo: wwKoData[`character.${id}.briefInfo`] || '',
    bestGear: echoSets,
    mainEchoesOrOrnaments: mainEchoes,
    bestWeapons: weapons,
    targetStats: guide?.targetStats || [],
    subStats: guide?.subStats || [],
    synergyCharacters: guide?.synergyCharacters || [],
    recommendedParties: partyList
  };
}
```

---

### 4.3 Narrative Synthesis Generator Function

```javascript
function generateNarrativeSummaryParagraph(data) {
  const sentences = [];

  // Sentence 1: Profile & Combat Role
  const rarityStr = data.rarity ? `${data.rarity}성 ` : '';
  const attrStr = data.attribute ? `${data.attribute} 속성 ` : '';
  const typeStr = data.pathOrWeapon ? `${data.pathOrWeapon} ` : '';
  let s1 = `${data.name}은(는) ${rarityStr}${attrStr}${typeStr}캐릭터로, 독보적인 전투 스타일을 바탕으로 강력한 성능을 발휘합니다.`;
  if (data.briefInfo) {
    const cleanBrief = data.briefInfo.replace(/\n/g, ' ').trim();
    s1 += ` (${cleanBrief})`;
  }
  sentences.push(s1);

  // Sentence 2: Recommended Gear & Weapons
  const gearStr = (data.bestGear || []).slice(0, 2).join(', ');
  const subGearStr = (data.mainEchoesOrOrnaments || []).slice(0, 2).join(', ');
  const weaponStr = (data.bestWeapons || []).slice(0, 2).join(', ');

  let s2 = '';
  if (gearStr) {
    s2 += `추천 종결 장비(유물/에코) 세팅으로는 「${gearStr}」`;
    if (subGearStr) {
      s2 += ` 및 「${subGearStr}」`;
    }
    s2 += ` 조합이 권장되며, `;
  }
  if (weaponStr) {
    s2 += `최우선 추천 종결 무기(광추)로는 「${weaponStr}」이(가) 가장 뛰어난 효율을 보입니다.`;
  } else if (s2) {
    s2 += `상황에 따른 맞춤형 옵션 선택이 중요합니다.`;
  }
  if (s2) sentences.push(s2);

  // Sentence 3: Stat Priorities & Target Stats
  const targetStr = (data.targetStats || [])
    .map(ts => `${ts.label} ${ts.value}`)
    .slice(0, 3)
    .join(', ');
  const subStatStr = (data.subStats || []).slice(0, 4).join(', ');

  let s3 = '';
  if (targetStr) {
    s3 += `핵심 추천 목표 스탯으로는 ${targetStr} 달성을 목표로 하며, `;
  }
  if (subStatStr) {
    s3 += `유효 부옵션으로는 ${subStatStr} 순으로 챙기는 것이 좋습니다.`;
  } else if (s3) {
    s3 += `균형 잡힌 능력치 보완이 권장됩니다.`;
  }
  if (s3) sentences.push(s3);

  // Sentence 4: Team Synergies & Recommended Compositions
  let s4 = '';
  if (data.recommendedParties && data.recommendedParties.length > 0) {
    const p = data.recommendedParties[0];
    const memberStr = (p.members || []).join(', ');
    s4 += `추천 파티 조합으로는 『${p.name}』 (${memberStr}) 구성을 통해 최상의 시너지를 이끌어낼 수 있습니다.`;
  } else if (data.synergyCharacters && data.synergyCharacters.length > 0) {
    const synStr = data.synergyCharacters.slice(0, 4).join(', ');
    s4 += `추천 시너지 파티원으로는 ${synStr} 등과의 조합이 크게 추천됩니다.`;
  }
  if (s4) sentences.push(s4);

  return sentences.join(' ');
}
```

---

### 4.4 HTML Injection Structure into `<div id="root">`

`generateWwCharacterHtml(id)` and `generateHsrCharacterHtml(id)` in `scripts/prerender-meta.js` should output:

```html
<article>
  <h1>[Character Name] 상세 가이드</h1>
  
  <section class="narrative-analysis-summary" style="margin-bottom: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
    <h2>캐릭터 분석 요약 (Character Analysis Summary)</h2>
    <p>[Synthesized Narrative Summary Paragraph]</p>
  </section>

  <section class="build-recommendations">
    <h2>종결 세팅 및 장비 가이드</h2>
    <p><strong>추천 유물/에코:</strong> [bestGear]</p>
    <p><strong>추천 무기/광추:</strong> [bestWeapons]</p>
    <p><strong>목표 능력치:</strong> [targetStats]</p>
  </section>

  <section class="team-synergy">
    <h2>추천 파티 조합</h2>
    <p>[Party details & members]</p>
  </section>

  <section class="skills-info">
    <h2>전투 스킬 및 행적 정보</h2>
    ...
  </section>
</article>
```

---

### 4.5 Package Script Checklist
Ensure `package.json` contains:
```json
"scripts": {
  "prerender": "node scripts/prerender-meta.js"
}
```

---

## 5. Verification Method

1. **Build & Prerender Command Execution**:
   ```bash
   npm run prerender
   ```
2. **Pre-rendered File Inspection**:
   - Inspect `dist/gallery/hsr/character/acheron/index.html`
   - Inspect `dist/gallery/ww/character/jiyan/index.html`
3. **Pass Criteria**:
   - `<div id="root">` contains `<section class="narrative-analysis-summary">`.
   - The paragraph inside `<p>` contains synthesized text referencing:
     - Profile & Attribute
     - Relics / Echoes (e.g., "사수에 잠수한 선구자", "스쳐가는 바람")
     - Light Cones / Weapons (e.g., "흘러가는 강가를 따라", "청룡의 천장")
     - Target Stats (e.g., "치명타 확률 80% 이상")
     - Team Compositions / Synergy characters.
4. **Invalidation Condition**:
   If `<div id="root">` in `dist/gallery/hsr/character/acheron/index.html` contains only the raw skill names without the `narrative-analysis-summary` section or summary paragraph, verification fails.
