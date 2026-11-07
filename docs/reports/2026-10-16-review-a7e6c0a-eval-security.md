# 보안 독립 평가 — a7e6c0a / eval

## 공통 실행 정보

- 실행 ID: 2026-10-16-eval-security / 프로토콜 1.0.
- 검사 시각: 2026-10-16 17:34–17:36 KST. 독립 1차 결론 고정: 17:35 KST, 다른 담당 보고서 열람 전.
- 담당: 별도 보안 에이전트 `/root/eval_security_1016`.
- 대상: `a7e6c0ae42ec19d230c0ae233762a599638b37e7`, main, https://riragamehub.com.
- 실제 배포 commit: 주 담당이 전달한 운영 대상. 이 담당은 Cloudflare 배포 API로 hash를 독립 확인하지 않았으므로 헤더 관측만으로 동일 commit을 증명하지 않는다.
- 시작 시 기존 dirty 25파일(수정 9, 미추적 16). 기존 SEO/NTE 변경과 보고서는 보존하고 운영 배포에 포함된 것으로 간주하지 않았다. 보안 검사 대상 lockfile, migrations, lib, 댓글, middleware, headers, CI는 HEAD와 작업트리 간 변경 없음 확인.
- 범위: 공개 서비스 일부 응답 및 HEAD의 인증·권한·렌더링·의존성 정적 검사. 전체 침투 테스트 아님.
- OS/도구: Windows PowerShell, curl.exe, Node v24.19.0, npm 11.17.0. 브라우저·viewport·CPU/network 에뮬레이션은 N/A(HTTP/소스 검사).
- 역할: 자격증명 없는 공개 GET/HEAD. 로그인·쿠키 동의·광고 동작·콘솔 위반은 미검증.
- 읽은 기준: AGENTS.md, THREE_ENGINEER_REVIEW.md, 보고서 양식 전체, Supabase 스킬 전체, 공식 RLS 문서 및 changelog 최신 항목.
- 운영 DB/Storage/사용자 데이터 조회, 쓰기, 계정 생성/변조, 권한 조작, 공격 payload, 부하 테스트는 실행하지 않았다.

## 독립 판정

전체 보안 통과를 선언할 수 없다. 공개 정상 응답의 주요 보안 헤더와 audit는 제한 범위 PASS지만, 관리자 Storage 정책의 위험한 권한 근거가 저장소에 남아 있고 운영 적용 상태 및 A/B 거부 검증은 UNVERIFIED다. 운영 침해나 권한 우회 재현을 주장하지 않는다.

검사군 8개: PASS 2개(SEC-01, SEC-02), FAIL 2개(SEC-04 소스 제한, SEC-06 헤더 일관성), UNVERIFIED 4개(SEC-03 운영 영향, SEC-05 공개 범위, SEC-07 XSS 전반, SEC-08 secret 전반). 부분 소스/헤더 증거와 운영 검증 상태를 아래에서 분리한다.

## 발견 사항

### SEC-01 / 의존성 audit — PASS, 한정된 의존성 진단

- `npm audit --json --ignore-scripts`: 샌드박스 DNS 실패, 외부 실행 기본 Node CA 인증서 실패. 인증서 검증을 해제하지 않고 `node --use-system-ca "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" audit --json --ignore-scripts`로 재실행 성공(exit 0).
- 2026-10-16 17:34 KST: auditReportVersion 2, vulnerabilities `{}`, info/low/moderate/high/critical 모두 0, dependencies total 563(prod344/dev213/optional109/peer7).
- lockfile 변경 없음. audit fix/설치/갱신/실행 script 없음. npm advisory가 제공하는 범위의 결과이며 취약점 부재나 침투 검사 통과를 의미하지 않는다.
- `.github/workflows/security-scan.yml`의 명령은 `npm audit --audit-level=critical`. CI 실행 결과 자체는 이 담당 미확인. 이 임계값의 성공을 취약점 0으로 일반화하면 안 된다.

### SEC-02 / 정상 공개 응답과 정적 캐시 — PASS, 표본 범위

- 17:34:37–38 KST `HEAD /`, `/gallery/nte`: 200, HTML UTF-8, Cache-Control `no-cache, must-revalidate`, HSTS 31536000/includeSubDomains/preload, CSP, nosniff, DENY, strict-origin-when-cross-origin, Permissions-Policy 존재.
- CSP의 object-src/frame-ancestors `none`, base-uri `self` 확인. COOP same-origin-allow-popups. 공개 정적 응답의 ACAO `*` 자체를 인증 데이터 노출로 판단하지 않는다.
- 17:35:27 KST 홈페이지 GET에서 찾은 단일 `/assets/*.js` HEAD: 200 application/javascript, `public, max-age=31536000, must-revalidate, immutable`, 동일 보안 헤더. 인증·사용자 API 캐시는 조회하지 않았다.
- `functions/_middleware.ts`의 immutable override는 성공한 특정 hashed 공개 자료/thumbnail에 한정되어 있다. 인증 응답 캐시 안전 전체를 증명하지 않는다.

### SEC-03 / 관리자 Storage의 사용자 수정 가능 권한 근거 — P1 위험 후보 / UNVERIFIED(운영)

- 소스 확정: `supabase/migrations/20260726000001_create_admin_media_bucket.sql`의 관리자 쓰기 정책이 user_metadata의 관리자 표식을 신뢰한다. 현재 HEAD의 후속 migration 전체 이름/내용 검색에서 해당 Storage 정책을 대체하는 수정은 확인되지 않았다.
- `20261012011429_secure_admin_rls_metadata.sql`은 댓글/신고 관리자 정책 두 개를 교체하지만 Storage는 대상이 아니다. 댓글 정책의 개선을 Storage 개선으로 확대 해석하면 안 된다.
- 기대: 서버가 관리하는 권한 근거와 최소 권한 정책만 사용. 실제: 저장소 선언에 사용자 수정 가능 근거 잔존.
- 공식 근거: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)는 user metadata를 권한 근거로 쓰지 않도록 명시한다. 관련 스킬 직접 확인. [changelog](https://supabase.com/changelog.md)의 2026-10-12 TLS 변경은 향후 호환 이슈이며 이 권한 문제의 해결 근거가 아니다.
- 운영 migration 적용 여부, 현재 pg_policies/grants 및 Storage 정책은 확인하지 않았다. 운영 무단 업로드/수정/삭제를 재현한 것이 아니다.
- 다음: 승인된 환경에서 현재 정책/적용 이력 읽기 전용 확인, dedicated 일반/관리자 계정으로 거부/허용 검사. 소스 보강은 별도 수정 요청 범위.

### SEC-04 / 댓글 민감 열의 소유자 정책 제한 부재 — P2 소스 확정 / FAIL, 운영 영향 UNVERIFIED

- `20260725010000_update_reviews_auth.sql`의 소유자 UPDATE 정책은 user_id 일치만 검사한다. 후속 full_schema migration은 다른 이름의 정책을 제거하므로 이 기존 정책은 남는다.
- full_schema의 새 소유자 정책에 is_pinned 제한이 있어도 기본 permissive 정책은 OR로 합쳐지므로 기존 허용 정책을 좁히지 않는다. 최신 관리자 migration도 이 기존 소유자 정책을 제거하지 않는다.
- INSERT도 소유자만 검사하며 `20260726000002_add_author_is_admin.sql`은 관리자 표식 열만 추가한다. 저장소 내 서버 계산/열 권한 제한 근거를 확인하지 못했다.
- `CommentCard.tsx:186`은 `review.author_is_admin`으로 배지를 보여주고 CharacterReviewBoard는 해당 값을 저장한다. pin/count 등 제어 열과 작성자 편집 권한을 구분할 필요가 있다. 관리자 배지 조작이 곧 서버 관리자 권한 획득인 것은 아니다.
- 운영 grants·추가 trigger/정책이 저장소 외에 존재할 수 있어 실제 조작 가능성은 미검증. 사용자 데이터 변경 없이 정적으로 확인했다.
- 다음: 테스트 DB에서 migration 순차 적용 후 작성자 허용 열/거부 열 검사, 서버 계산 및 열 권한 확인. 영향 확인 시 우선순위 재판정.

### SEC-05 / 신고 데이터 공개 정책 — P2 위험 후보 / UNVERIFIED

- full_schema migration의 comment_reports SELECT는 public/USING true이며 user_id와 comment_id를 포함하는 테이블이다. 신고자 식별 관계가 공개에 필요한지 확인해야 한다.
- 운영 조회·반환열·grants는 검사하지 않았다. 개인정보 유출을 확정하지 않는다. 서버 권한/응답 최소화 점검 필요.
- 같은 파일의 SECURITY DEFINER trigger 함수는 search_path 고정 및 명시 EXECUTE 권한 제한이 소스에 보이지 않는다. trigger 반환형 함수의 직접 RPC 실행 가능성을 일반 함수와 같다고 단정하지 않으며 운영 Advisors/권한 미검증으로 남긴다.

### SEC-06 / 함수 생성 응답의 보안 헤더 누락 — P2 / FAIL(운영 표본 확정)

- HEAD `/security-review-missing-20261016`: 404 HTML, public max-age=60, noindex/nofollow. `/blog`: 410, public max-age=300. `/about/`: 301 Location `https://riragamehub.com/about`.
- 위 세 응답에는 정상 문서의 CSP/HSTS/nosniff/X-Frame-Options/Referrer-Policy가 관측되지 않았다. `functions/_middleware.ts`의 직접 생성 Response가 해당 헤더를 넣지 않는 것과 일치한다.
- 고정 오류본문에서 XSS를 발견한 것은 아니다. 운영 응답 종류별 보안 정책 일관성 결함이며 exploit 확정이 아니다. redirect 목적지는 관측 표본에서 같은 origin 정상 주소.
- HTTP 루트는 환경에서 port80 연결 실패해 HTTPS redirect는 UNVERIFIED. 사이트의 redirect 미설정을 확정하지 않는다.
- 다음: edge 생성 응답에도 공통 헤더 적용 검토 후 200/301/404/410 재검사.

### SEC-07 / CSP·렌더링 — P2 완화 후보 / UNVERIFIED(전체 XSS)

- 운영 CSP script-src에 unsafe-inline 및 여러 광고 origin wildcard가 존재한다. 헤더 존재만으로 XSS 방어 완료라고 할 수 없다. nonce/hash 전환의 광고 호환성은 실측하지 않았다.
- HEAD `Detail.tsx:29`는 DOMPurify html profile 및 금지 태그/속성 후 sanitizedContent만 HTML sink에 넣는다. MarkdownRenderer는 react-markdown+remark-gfm, raw HTML plugin 없이 외부 링크 noopener/noreferrer.
- 회귀 payload 실행 및 실제 브라우저 CSP 위반/광고 동작은 미검증. 운영에 payload를 넣지 않았다.
- HEAD SEO.tsx의 JSON.stringify script와 현재 dirty serializeJsonLd 개선은 다른 버전이다. dirty 개선을 운영 보안 개선으로 계산하지 않았다. 입력의 신뢰경계/전체 초기 HTML 검증은 미수행.

### SEC-08 / secret·클라이언트 노출 경계 — UNVERIFIED(전체), P3 정리 후보

- `common-hub/lib/supabase.ts`는 VITE_SUPABASE_ANON_KEY를 사용한다. 공개 anon/publishable 설정과 service-role secret은 구분한다. 이 파일에서 privileged key 하드코딩을 관측하지 않았다.
- git 추적 `.env*`는 `.env.example`만 확인. 실제 .env와 운영 자격증명은 열거나 출력하지 않았다. 검색은 민감 패턴 일치 파일명만 반환하도록 수행했다.
- vite.config.ts는 Gemini 환경변수를 define 치환 대상으로 등록하지만 HEAD에서 해당 process.env 참조는 config 자신만 검색되었다. 이것만으로 실 배포 키 노출을 확정할 수 없다. 불필요한 치환 설정 정리 후보이며 운영 bundle 전수 secret 검사는 미수행.
- source filename 결과 외 민감값·JWT·쿠키·관리자 UUID는 이 문서에 기록하지 않았다. 과거 legacy script와 Git 전체 이력의 secret 안전은 검증하지 않았다.

## 미검증과 제한

- 실제 운영 RLS·grants·view/function·Storage 정책 및 Advisors, migration 적용 여부.
- 계정 A/B 소유권, 관리자 거부, logout/계정 전환 캐시, JWT 갱신/철회 조건.
- 운영 사용자·개인정보 응답, 로그인 쿠키, 콘솔/CSP 광고 호환, 전체 bundle/이력 secret, 모든 고정 URL 조합.
- 원자료는 위 명령/시각/정제 응답과 코드 위치로 기록했다. 네트워크 NEL URL과 전체 응답식별자는 문서에 복사하지 않았다.

## 교차 검토

- 독립 결론 고정 완료. 교차 검토 요청 전 다른 담당 결과 열람하지 않음.
- 보안 → 성능(17:38 KST): 독립 결론 고정 후 `2026-10-16-review-a7e6c0a-eval-performance.md` 전체 확인. 공개 hashed JS/CSS만 장기 캐시하고 HTML 재검증을 유지하는 표본은 보안 검사와 일치한다. 측정을 위해 Auth/CSP/광고·콘텐츠를 완화하거나 변경한 증거는 없다. gzip 예산 PASS는 공개 초기 자산에 한정되며 운영 권한·RLS·전체 성능 PASS로 확대하지 않는 서술을 확인했다. 향후 HSR 선택 로더 제안에도 인증응답 공유 캐시 확대/CSP 완화는 포함되지 않는다. 운영 RLS는 별개 UNVERIFIED로 유지한다.
- 디자인 → 보안: 별도 디자인 담당은 로그아웃 UI만 관찰했고 로그인/관리자/댓글·신고 쓰기는 미실행하여 권한·민감정보 안전 PASS 불가에 동의했다. SEC-04 배지 열 신뢰는 UI 권한 인식 위험과 연결되지만 운영 조작 가능성은 미검증이다. 디자인 담당의 NTE 현재 탭 error/warn 표본 0건은 그 탭 조회만 의미하며 CSP·광고 전체 합격 증거가 아니다. 이견 없음.
- 주 담당은 Supabase connector의 프로젝트 메타정보 읽기 호출이 `not available to model`로 실패하여 현재 운영 정책을 확인하지 못했다고 전달했다. DB·사용자 데이터 조회 성공으로 계산하지 않는다.

## 변경 및 검증

- 신규 보고서 한 파일만 작성. 코드/데이터/설정, 기존 사용자 변경 수정 없음.
- Notion·typecheck·build·테스트 미실행: 읽기 전용 평가 및 보고서 작성 범위. 생성 스크립트 실행하지 않음.
- commit message/hash: 없음. commit/push/배포 미실행. 공개 사이트 접근은 위 표본에서 확인했으나 신규 Cloudflare 배포 상태는 확인 대상 아님.
- 문서 재독 및 요청 범위 대조 완료. `git diff --no-index --check -- NUL <신규 보고서>`는 공백 오류 출력 없음(exit 1은 신규 내용 차이). LF→CRLF 경고만 관측. 전체 작업트리 검증은 주 담당 취합 시 별도 기록.
