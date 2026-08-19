# 🧪 Rira Game Hub 종합 테스트 및 E2E 품질 검증 가이드 (Testing Guide)

> **문서 용도**: 프로젝트의 E2E 테스트 스위트, 성능/접근성(PageSpeed/WCAG) 검증, 테스트 아키텍처 및 실행 명령어를 정의하는 통합 가이드입니다.

---

## 1. 📌 테스트 철학 및 아키텍처

* **블랙박스/요구사항 중심 검증 (Opaque-Box Testing)**:
  * 내부 상태에 의존하지 않고, 최종 번들 자산, 공개 컴포넌트 Props, 렌더링된 출력 및 리소스 무결성을 검증합니다.
* **단계별 테스트 격리 (Progressive Tiers)**:
  * **Tier 1 (Feature Coverage)**: WebP 압축 자산(<70KB), Home.tsx WebP 참조, 글로벌 명도 대비(WCAG AA/AAA) 적합성.
  * **Tier 2 (Boundary & Corner Cases)**: 누락 에셋 로컬 폴백(`/assets/unknown.webp`), CLS 방지 고정 비율(`width`/`height`), 404 루핑 방지 가드(`hasError`).
  * **Tier 3 (Cross-Feature Interactions)**: HSR/WW/NTE 모듈 간 내비게이션 및 테마 대비 시너지.
  * **Tier 4 (Real-World Application Scenarios)**: `npm run build` 정적 사전 렌더링 및 0-Error 콘솔 감사.

---

## 2. 🚀 테스트 실행 명령어

```bash
# 전체 E2E 테스트 스위트 실행
npm test

# Vitest 기반 직접 실행
npx vitest run tests/e2e/

# 테스트 러너 스크립트 실행
node tests/e2e/runner.js
```

---

## 3. 📊 계층별 커버리지 요약

| Tier | 테스트 파일 | 주요 검증 항목 | 케이스 수 |
|---|---|---|:---:|
| **Tier 1** | `tests/e2e/tier1_feature_coverage.test.ts` | WebP 배너 압축(<70KB), Home.tsx WebP 참조, WCAG 색상 대비 | 12 |
| **Tier 2** | `tests/e2e/tier2_boundary_corner.test.ts` | 에셋 404 폴백, CLS 방지 속성, 더블 404 루프 방지 | 10 |
| **Tier 3** | `tests/e2e/tier3_cross_feature.test.ts` | 멀티 허브 네비게이션, 테마 클래스 정합성 | 6 |
| **Tier 4** | `tests/e2e/tier4_real_world.test.ts` | 프로덕션 빌드 무결성, 0 404 콘솔 감사 | 6 |
| **전체** | `tests/e2e/runner.js` | 통합 E2E 검증 | **34** |
