## 2026-08-05T06:50:08Z
You are Replacement Worker for Milestone 1 (R1: Automated Character Analysis Summary via prerender-meta.js).
Working directory: c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_worker_replacement

Reference Files (Read these first):
1. c:\Users\User\Desktop\rira game hub\game-hub\.agents\ORIGINAL_REQUEST.md (MANDATORY)
2. c:\Users\User\Desktop\rira game hub\game-hub\.agents\orchestrator\PROJECT.md
3. c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1\SCOPE.md
4. c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_exp_1\handoff.md
5. c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_exp_2\handoff.md
6. c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_exp_3\handoff.md

Tasks & Objectives:
1. Update `package.json`:
   Add `"prerender": "node scripts/prerender-meta.js"` under `"scripts"`.

2. Enhance `scripts/prerender-meta.js`:
   - Implement TS data file parsing / extraction helpers to load character metadata, guide recommendations (best relics/echoes, ornaments/main echoes, main/sub stats, target stats, best light cones/weapons), and team party data for HSR, WW, and Notion/NTE characters.
   - Implement narrative synthesis logic that generates a rich 4-section/4-paragraph Korean prose HTML structure (`<section class="narrative-analysis-summary">`) covering:
     - Profile & Combat Role
     - Best Equipment & Relics/Echoes / Light Cones / Weapons
     - Target Stats & Main/Sub Option priorities
     - Recommended Team Synergies & Compositions
   - Ensure safe HTML injection into `<div id="root">` using function-based replacer `html.replace(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i, () => '<div id="root">' + innerContent + '</div>')`.
   - Implement `escapeHtml` for all string insertions and graceful fallbacks for missing/partial guide or party data.
   - Preserve existing OpenGraph / Twitter meta tag injections and head tags.

3. Build & Verify:
   - Run `node scripts/prerender-meta.js` (or `npm run prerender`).
   - Run `npm run build` to test full build pipeline.
   - Verify generated HTML files in `dist/gallery/hsr/character/acheron/index.html` and `dist/gallery/ww/character/jiyan/index.html` contain `<section class="narrative-analysis-summary">` inside `<div id="root">` with actual synthesized text.

4. Handoff:
   - Create `handoff.md` in your working directory (`c:\Users\User\Desktop\rira game hub\game-hub\.agents\sub_orch_m1_worker_replacement\handoff.md`). Include exact file changes made, build/test execution logs, and verification output.
   - Notify the caller (parent) when done via `send_message`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
