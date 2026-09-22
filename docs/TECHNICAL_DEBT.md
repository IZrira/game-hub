# Rira Game Hub — Technical Debt & Architecture Baseline Log

## 1. SEO & Prerender Observation Baseline

- **Baseline Commit**: `189a689`
- **Deployment Scope**: 931 routes with deep crawlable prerendered entity content, Aniimo evolution tree, and Cloudflare Pages 301 redirects.
- **Observation Period**: 1 to 3 weeks.
- **Key Metrics to Track in Google Search Console**:
  1. **Discovered - currently not indexed (발견됨 - 현재 색인되지 않음)**: Target is observing gradual transition of the 732 backlog URLs into crawled and indexed status.
  2. **Crawled - currently not indexed (크롤링됨 - 현재 색인되지 않음)**.
  3. **Indexed Pages (색인 생성된 페이지)**.
  4. **Googlebot Last Crawl Date & Frequency**.
- **Action Policy**: Do not mass-generate new landing URLs, restructure sitemaps, or modify canonical rules during this observation window so Search Console metrics remain clean and attributable.

---

## 2. Technical Debt Items

### TD-001: Dual Data Engine Normalization (Prerender vs. UI Runtime)
- **Status**: Recorded (Low risk for now, monitored by `scripts/validate-data.js`).
- **Context**:
  Currently, `scripts/prerender-meta.js` evaluates TypeScript character/weapon module factories (`createHsrBaseStats`, `createWwBaseStats`, `createSkill`, etc.) inside a sandboxed VM during static site generation to produce crawlable HTML, while React components at runtime consume normalized datasets via `common-hub/data/dataManager.ts` and individual hub data modules.
- **Risk**:
  Potential data drift between the prerendered HTML output and the React client if internal schemas change without updating both evaluators.
- **Future Solution**:
  Extract a shared build-time data normalization pipeline (e.g. `scripts/build-data-cache.js` or a unified JSON export layer) that outputs immutable normalized entity JSON consumed identically by both React hydration and prerendering scripts.
