# WW 무기 SEO 변경 보안 검토 — 제한 범위

## 실행 정보

- 일자: 2026-10-18, 한국 시간.
- 담당: 독립 보안 검토 에이전트 `/root/ww_seo_security`.
- 기준: `AGENTS.md`, `docs/guides/THREE_ENGINEER_REVIEW.md`, 보고서 양식.
- 대상: `f15d5f5cc17cf4eeaebbb8df2329aad84da98985` 이후 작업 중인 WW 무기 SEO diff. 배포본 평가는 아니다.
- 검사 파일: `common-hub/utils/wwWeaponSeo.js`, `ww-hub/pages/WuwaWeaponDetail.tsx`, `scripts/prerender-meta.js`, `scripts/audit-prerender-seo.js`, `tests/ww-weapon-seo.test.ts`.
- 방법: git status/diff 및 관련 escaping·SEO 렌더링 코드 읽기. 다른 담당 결론을 열람하지 않고 작성했다.
- 소스 수정, Notion 동기화, 운영 쓰기, commit/push는 하지 않았다. 기존 AGENTS.md 및 보고서 변경은 보존했다.

## 독립 판정

제한된 정적 변경 검토에서 새 P0/P1 보안 결함을 발견하지 않았다. 전체 사이트 보안 통과나 침투 테스트 결과는 아니다.

### PASS — HTML/속성 출력 경계

- 공용 함수는 이름·분류를 문자열로 조합해 반환할 뿐 HTML을 직접 삽입하거나 실행하지 않는다.
- React 화면의 H1은 JSX 텍스트 노드이며 SEO title/description도 React/Helmet 텍스트·속성으로 전달한다. 새 `dangerouslySetInnerHTML` 사용은 없다.
- 초기 HTML H1은 기존 `escapeHtml`을 통과한다. 새 공용 title/description도 `injectMetaAndContent`의 기존 `escapeHtml`을 통과한다. 해당 함수는 앰퍼샌드, 꺾쇠 및 양쪽 인용부호를 인코딩한다.
- 새 데이터 유입은 기존 로컬 무기 데이터와 번역 함수다. 네트워크 입력 또는 새 사용자 입력 처리 경로를 추가하지 않았다.

### PASS — 권한·비밀·성능 교차 영향

- 새 함수와 diff에는 토큰, 인증정보, secret 로깅 또는 환경변수 사용이 없다.
- 인증·권한·CSP·캐시·보안 헤더 변경이 없다. 성능을 위해 보안 보호를 완화하는 변경도 없다.
- 감사 추가는 기존 무기 JSON 읽기 및 메타데이터 비교다. 외부 서비스 쓰기나 권한 확대를 추가하지 않는다.
- 의존성 및 lockfile 변경이 없으므로 이번 변경의 새 패키지 공급망 추가는 없다.

### UNVERIFIED — 범위 밖

- 악성 입력을 주입한 브라우저 실행 검증, 운영 CSP/헤더, 로그인 A/B 권한, 전체 번들 secret 검사 및 의존성 audit은 수행하지 않았다.
- 타입·테스트·빌드·운영 배포 확인은 주 작업 담당의 별도 검증 대상이다. 이 문서는 그 결과를 대신하지 않는다.
- 기존 보간·HTML 렌더링 시스템 전체에 대한 보안 감사가 아니다. 공용 함수의 반환 문자열 자체가 sanitizer라는 뜻도 아니다.

## 다음 조치

주 담당이 실제 생성 HTML과 런타임 메타데이터 비교, 전체 테스트·빌드 및 diff 확인을 완료한 뒤 배포 여부를 판단한다. 현재 제한 범위에서 보안 사유의 배포 차단 권고는 없다.
