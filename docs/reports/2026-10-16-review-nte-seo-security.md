# 변경 범위 독립 보안 검토 — NTE SEO·파티 초기 HTML

- 담당: `security_protocol` 에이전트. 다른 분야의 최종 판정 열람 전에 독립 결론을 작성했다.
- 기준 baseline: `6d451bfa61c0b92b31c4e4465f6ea91b630ea898`, `main`의 이번 미커밋 diff.
- 범위: 공통 SEO head 인계, JSON-LD 직렬화, NTE canonical, 파티 정적 본문 및 관련 감사·회귀 검사.
- 시작 `git status`를 확인했다. 기존 `AGENTS.md`와 앞선 보고서는 보존했다. 이 담당은 구현 코드를 수정하지 않았다.

## 독립 판정

**소스 검토 범위 PASS — 새 보안 차단점 없음.** 실제 브라우저·전체 검증·배포는 별도 단계이며 전체 운영 보안 합격이나 Google 색인 완료 판정이 아니다.

### 확인한 보호 조건

- `common-hub/utils/prerenderSeoHead.ts`는 최초 head의 페이지 메타 노드 참조만 캡처한다. 제거 때 새 selector로 현재 head 전체를 지우지 않으며, 반복 호출도 나중에 생성된 메타를 삭제하지 않는다.
- Google 소유권 인증, CSP, charset/viewport, font/preload, 외부 src script와 광고 로더는 제거 대상이 아니다. `SEO.tsx`는 route commit 전 정적 SEO를 유지하고 인계 후 기존 Helmet 경로로 새 메타를 출력한다. noindex 분기도 유지한다.
- `serializeJsonLd.js`는 JSON 직렬화 후 `<`와 U+2028/U+2029를 escape한다. script raw-text 경계 탈출을 막으면서 JSON 값은 보존한다. 동일 helper를 브라우저와 정적 생성에서 사용한다.
- `nte-party-prerender.js`는 TypeScript AST의 지정된 export literal만 읽는다. import, 함수 호출, spread, fallback 생성 코드를 실행하지 않고 지원하지 않는 형식은 실패 처리한다.
- 파티명·설명·역할·분류·태그·장단점·대체 멤버와 data 속성은 HTML escape를 거친다. 캐릭터 링크는 고정 내부 prefix와 `encodeURIComponent`를 사용하며 등록된 경로에만 연결한다. 위험한 경로 이름은 링크 대신 텍스트로 남긴다.
- NTE 상세는 이름 기반 canonical과 breadcrumb를 함께 정정한다. 파티 페이지는 명시적 내부 canonical을 갖는다. 신규 외부 redirect·외부 API·권한 코드·secret 환경값을 추가하지 않는다.
- `package.json`, lockfile, `public/_headers`, `index.html`, 인증 코드, Supabase 정책의 diff는 없었다. 새 본문 생성은 로컬 원본을 읽으며 Notion 동기화나 관리 비밀키가 필요하지 않다.

### 읽은 회귀 검사

`seo-head-handoff.test.tsx`의 초기 정적 메타 유지, 실제 SEO 출력 후 중복 제거, StrictMode, SPA, noindex 전환, 인증·CSP·리소스 보존, JSON 값 복원을 확인했다. `serialize-json-ld.test.ts`, `prerender-head-checks.test.ts`, `nte-party-prerender.test.ts`, `nte-page-seo.test.tsx`도 직접 읽었다.

파티 검사는 원본 순서·이름·설명·역할·대체 멤버의 일치, 원본 불변성, 내부 링크 제한, 텍스트/속성 escaping, 실행 표현식 거부를 포함한다. 기존 assertion을 지우거나 보안·데이터 검사를 완화하는 변경은 없었다.

보완 권장: 공개 정적 head에서 SPA noindex 전환하는 검사 외에, **정적 noindex 문서로 직접 진입하여 첫 SEO도 noindex인 경우**를 별도 회귀로 고정하면 좋다. 현 구현에서 위반을 재현한 것은 아니므로 차단 결함으로 분류하지 않는다.

## 검증 한계·금지 범위

이 담당은 관련 diff·신규 helper·테스트 소스를 읽고 판단했다. TypeScript·전체 테스트·빌드는 주 담당이 실행 중이므로 이 문서가 그 실행 통과를 대신하지 않는다. 새 코드의 운영 반영, 실제 브라우저 metadata, CSP 콘솔 위반, Google 처리 상태도 이 소스 검토만으로 확정하지 않는다.

Supabase 라이브 접근, 사용자·정책·데이터 읽기/쓰기, 운영 악성 입력, 업로드·삭제, 부하/침투 검사, secret 원문 조회, Notion 동기화, Git commit/push는 하지 않았다. 새 보고서만 작성했다. 앞선 운영 보안 평가의 미검증 항목이나 위험 후보는 이번 제한된 범위 PASS로 해결된 것으로 보지 않는다.

## 독립 판정 후 추가 확인·교차 검토

권장한 직접 noindex 진입 회귀가 `tests/seo-noindex-entry.test.tsx`로 추가되어 소스를 읽었다. 정적 noindex head에서 첫 SEO를 noindex로 렌더한 뒤 robots/title 단일성, canonical 부재, 소유권 인증·CSP 보존을 확인한다. 기존 공개 진입→SPA noindex 전환 검사와 별개이며 앞선 권장 항목의 검사 공백을 보완한다.

추가된 NTE 파티 본문 감사는 article 한 개, 실제 파티 section 존재, 파티별 멤버 네 자리를 요구한다. 일반 소개만 남거나 멤버가 잘린 본문을 통과시키지 않으며 기존 AdSense 중복 검사는 유지한다. 모바일 수정은 루트 flex 방향을 breakpoint별로 조정하는 최소 CSS 변경이고 인증·캐시·CSP에 영향을 주는 코드는 아니다.

보안 → 성능 교차 검토: [성능 범위 보고서](2026-10-16-review-nte-seo-performance.md)의 자기 구현 검토 한계·로컬 fragment 용량과 운영 전송량의 구분·실측 미수행 표시를 확인했다. 실제 diff에 인증·로그·CSP·캐시 보호 완화나 광고/동의 스크립트 제거가 없으며, AST parser는 빌드 전용 경계를 유지하고 원격 Notion·권한 API를 추가하지 않는다. 따라서 소스 범위 보안 PASS를 유지하며 성능 개선율·운영 권한 안전성으로 확대하지 않는다.

주 담당의 공용 검증 전달 기록은 첫 전체 실행의 42개 파일/324개 테스트·타입·build·SEO 890 경로·성능 예산 통과와, 4허브 대표 상세의 실제 브라우저 head/소유권/CSP/광고 단일성 확인이다. 이 담당의 독자 실행으로 기록하지 않는다. 마지막 본문 guard·모바일 CSS 변경 이후 전체 재검증은 주 담당이 별도로 기록하며, 이번 추가 검토가 대기 중인 최종 결과를 선행 승인한 것은 아니다.
