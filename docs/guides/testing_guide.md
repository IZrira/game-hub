# 🧪 Rira Game Hub 종합 테스트 및 E2E 품질 검증 가이드 (Testing Guide)

> 반복 평가는 [3인 독립 평가 기준](THREE_ENGINEER_REVIEW.md)과 [보고서 양식](../templates/three-engineer-review.md)을 따릅니다. 자동 예약 없이 요청 시 실행합니다. 이 문서의 tests/e2e는 역사적인 이름이며 실제 브라우저·PageSpeed 측정을 실행하지 않습니다.

---

## 1. 📌 테스트 철학 및 아키텍처

* **블랙박스/요구사항 중심 검증 (Opaque-Box Testing)**:
  * 내부 상태에 의존하지 않고, 최종 번들 자산, 공개 컴포넌트 Props, 렌더링된 출력 및 리소스 무결성을 검증합니다.
* **단계별 테스트 격리 (Progressive Tiers)**:
  * **Tier 1 (Feature Coverage)**: WebP 압축 자산(<70KB), Home.tsx WebP 참조, 제한된 색상 유틸리티 문자열 검사. 실제 대비 계산이나 화면 전체 WCAG 충족을 의미하지 않습니다.
  * **Tier 2 (Boundary & Corner Cases)**: 누락 에셋 로컬 폴백(`/assets/unknown.webp`), CLS 방지 고정 비율(`width`/`height`), 404 루핑 방지 가드(`hasError`).
  * **Tier 3 (Cross-Feature Interactions)**: HSR/WW/NTE 모듈 간 내비게이션 및 테마 대비 시너지.
  * **Tier 4 (Real-World Application Scenarios)**: 빌드 명령 설정·파일 존재·일부 소스 참조 검사. 실제 build나 브라우저 콘솔 수집이 아닙니다.

---

## 2. 🚀 테스트 실행 명령어

```bash
# 전체 Vitest 회귀 검사 (일부는 happy-dom 기반)
npm test

# e2e 이름의 파일/설정 검사 묶음
npx vitest run tests/e2e/

# 테스트 러너 스크립트 실행
node tests/e2e/runner.js
```

---

## 3. 📊 계층별 커버리지 요약

| Tier | 테스트 파일 | 주요 검증 항목 | 케이스 수 |
|---|---|---|:---:|
| **Tier 1** | `tests/e2e/tier1_feature_coverage.test.ts` | WebP 파일·참조·색상 클래스 문자열, 실제 대비 계산 아님 | 12 |
| **Tier 2** | `tests/e2e/tier2_boundary_corner.test.ts` | 에셋 404 폴백, CLS 방지 속성, 더블 404 루프 방지 | 10 |
| **Tier 3** | `tests/e2e/tier3_cross_feature.test.ts` | 멀티 허브 네비게이션, 테마 클래스 정합성 | 6 |
| **Tier 4** | `tests/e2e/tier4_real_world.test.ts` | 빌드 설정·파일/소스 참조 검사, 실제 콘솔 검증 아님 | 6 |
| **전체** | `tests/e2e/runner.js` | 위 Vitest 정적 검사 묶음 | **34** |

위 케이스 수는 해당 묶음의 과거 기록이며, 전체 테스트 수와 성공 여부는 매 실행 출력으로 확인합니다. 실제 브라우저·네트워크·접근성·권한 검증은 별도로 수행하고 미실행이면 미검증으로 기록합니다.

## 4. 현재 검증 순서와 한계

package.json과 AGENTS.md의 Notion lifecycle 규칙을 먼저 확인하고 `npm run typecheck` → `npm test` → `npm run build` → `git diff --check` → diff 검토 순으로 실행합니다. 각 종료 코드를 확인합니다. build는 SEO 감사와 성능 예산 검사를 포함하며, 문서만 변경한 작업은 AGENTS.md의 문서 검증 예외를 따릅니다.

Windows spawn EPERM은 환경 실패로 분리하고 허용된 재실행 성공 전에는 통과 처리하지 않습니다. Notion은 명시 요청 없이 실행하지 않습니다.

현재 Security Scan은 `npm audit --audit-level=critical`을 실행하므로 CI 성공을 취약점 0개나 전체 보안 합격으로 표현하지 않습니다. 정적 테스트 통과를 실제 화면·콘솔 오류 없음 또는 WCAG 전체 충족으로 확대하지 않습니다.
