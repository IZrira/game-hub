# HSR 공개 경계 수정 보안 검토

- 담당: `/root/hsr_fix_security` 독립 보안 검토 에이전트
- 1차 판정 시각: 2026-10-30 02:10 KST
- 기준: `AGENTS.md`, `docs/guides/THREE_ENGINEER_REVIEW.md`
- 대상: main / 기준 HEAD `040f9cc3e8e19c7ce30f64df27e07f018a856f71` 위 HSR 라우트·공개 효율표 제외 변경. AGENTS.md 및 기존 보고서 변경 제외.
- 범위: 로컬 소스·생성물·미들웨어 회귀 테스트. 다른 담당의 판정을 열람하지 않고 작성했다. 운영 배포, 인증, DB, 의존성 전체 감사는 범위 밖이다.

## 독립 판정

검토 범위에서 P0/P1 보안 결함은 발견하지 않았다. 1차 검토에서 발견한 공개 JS 원본 잔존 P2는 수정 후 재검사로 해소했다. 제한된 변경 범위에서 PASS이며 전체 사이트 보안 통과 판정이 아니다.

### PASS S1 — 미등록 경로 차단 유지

등록 index에서 실제 가이드의 `characterName`만 읽고 공백·NFC를 정규화한다. 임의 URL이나 추측 ID로 허용 목록을 늘리지 않는다. 이름 충돌·파싱 오류는 빌드를 실패시킨다. 미들웨어 자체의 404·`noindex, nofollow` 정책은 변경하지 않았다.

### PASS S2 — 원본과 공개 변환 분리

`sanitizePublicHsrGuideData`는 새 객체를 만들어 `eidolonEfficiency`와 `eidolonVariants`를 비우며 기존 Notion URL 정리도 유지한다. HSR runtime, 초기 HTML 로더, React 공략의 세 경계에 적용했다. 원본 `hsr-hub/data/guides`와 미들웨어는 diff가 없다. 기존 추천·장비·파티 보존은 회귀 테스트에서 확인했다.

### PASS S3 — 구해시 정리 경계

정리 대상은 고정된 `public/assets/data/hsr/guides` 폴더의 `[a-z0-9_]+.<12자리 hex>.json` 파일 중 새 manifest가 참조하지 않는 파일로 제한된다. 삭제 명령은 조합한 고정 경로에 `unlinkSync`를 호출하며 디렉터리 재귀 삭제가 아니다. 로컬 원본이나 다른 허브를 정리 대상으로 삼지 않는다.

현재 배포 산출물에서의 제외이며, 과거 Cloudflare 배포나 이미 사용자 브라우저에 캐시된 이전 공개 응답의 철회를 보장하지 않는다.

### PASS S4 — 권한·캐시 보호 완화 없음

Auth/RLS, 운영 DB, secret, Cookie/CMP, CSP, 응답 공유 캐시 정책을 이번 작업에서 변경하지 않았다. 관련 테스트의 immutable JSON 정책도 유지된다. 운영 권한을 직접 검증한 결과로 확대 해석하지 않는다.

### PASS S5 — 공개 JS 원본 효율표 잔존 P2 해소

초기 확인한 `dist/assets/module-z0wCNDv6.js`(292,632 bytes)에 `efficiency1`/`efficiency3` 값이 남았다. `Gallery.tsx`의 공략 전체 데이터 동적 import와 `HsrRecommendedCharactersSection.tsx`의 전체 원본 static import가 원인이다. 화면·현재 JSON·초기 HTML에서 표를 숨겨도 이 JS를 다운로드하면 기존 수치를 읽을 수 있다. 이는 privileged secret 유출은 아니지만 공개 보류 정책에 미완료 지점이다.

후속 수정은 `Gallery.tsx`, `HsrRecommendedCharactersSection.tsx`, `hsr-hub/data/index.ts`의 가이드 의존을 `public-guide-catalog.json`으로 전환했다. 이 생성 카탈로그는 HSR 공개 변환을 적용하므로 기존 로컬 가이드 TS의 수치를 바꾸지 않는다. 성능용 필드 축약 요약은 아니며 공개 제외 정책을 적용한 카탈로그다.

2026-10-30 02:12 KST에 부모가 최종 빌드 성공을 전달한 뒤 독립 재검사했다. 최종 `dist/assets`의 JS 299개에서 `efficiency1`/`efficiency3` 문자열이 발견되지 않았다. 공개 카탈로그 93개와 manifest가 참조하는 dist runtime JSON 93개에서도 효율 수치 필드가 발견되지 않았다. 로컬 가이드 TS 경로는 여전히 diff가 없다. P2를 해소로 변경한다. 과거 캐시·과거 배포의 데이터 철회까지 의미하지 않는다.

## 실행 증거

`node node_modules/vitest/vitest.mjs run tests/hsr-guide-routes.test.ts tests/hsr-guide-runtime.test.ts tests/guide-public-links.test.ts`

- 1차 결과: 3 files / 57 tests PASS. 후속 수정 후 재검사: 3 files / 58 tests PASS.
- 등록 공략·원본 보존·효율표 JSON 제외·구해시 잔존 방지·Notion 링크 비노출·unknown 404 검증.
- 실행 과정에서 Notion, 운영 DB/API 쓰기, commit/push는 하지 않았다.

## 미검증

- 최종 운영 배포와 실응답 헤더: 부모 작업의 배포 후 검사 필요.
- 운영 인증·소유권/RLS 및 의존성 audit: 이번 변경과 무관하여 실행하지 않았다.
- 디자인·CWV·AdSense 승인 가능성: 이 보안 검토의 판정 범위가 아니다.

## 교차 검토

보안 → 성능: 권한·캐시 보호를 완화한 성능 조정은 없다. 효율표 데이터를 제거하는 공개 정책과 원본 가이드 보존을 구분한다. 클라이언트의 원본 의존을 공개 카탈로그로 전환한 뒤 JS 잔존이 해소된 것을 직접 확인했다. 이것을 불특정 비밀의 완전 부재나 운영 인증 통과로 확대하지 않는다.
