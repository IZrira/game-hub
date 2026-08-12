# Scope: Milestone 1 - Automated Character Analysis Summary via prerender-meta.js

## Architecture
- Script: `scripts/prerender-meta.js`
- Configuration: `package.json` (add `"prerender": "node scripts/prerender-meta.js"`)
- Goal: Read character metadata, guide recommendations (relics/echoes, stats, light cones/weapons), and team party data across games (HSR, Genshin, ZZZ, WuWa, etc. as present in dataset), synthesize narrative `Character Analysis Summary` paragraphs, and inject them into `<div id="root">` for static HTML prerendering.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | package.json prerender script | Add `"prerender": "node scripts/prerender-meta.js"` to package.json scripts | M1 | ORIGINAL_REQUEST.md |
| 2 | Metadata parsing | Parse character metadata, guide recommendations (relics/echoes, stats, light cones/weapons), team party data in prerender-meta.js | M1 | ORIGINAL_REQUEST.md |
| 3 | Narrative summary synthesis | Synthesize narrative Character Analysis Summary paragraphs combining stats, gear, and team recommendations | M1 | ORIGINAL_REQUEST.md |
| 4 | Static HTML prerendering injection | Inject synthesized summary into `<div id="root">` of generated pre-rendered HTML files | M1 | ORIGINAL_REQUEST.md |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: prerender-meta.js summary synthesis | package.json update, prerender-meta.js parser & synthesizer enhancement, static HTML injection into root div | none | IN_PROGRESS |

## Interface Contracts
### package.json ↔ npm run prerender
- Script command: `node scripts/prerender-meta.js`

### prerender-meta.js ↔ prerendered HTML output
- Injection target: `<div id="root">...[synthesized summary]...</div>`
