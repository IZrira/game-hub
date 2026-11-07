# 독립 보안 평가 — 6d451bf

## 평가 조건과 독립 결론

- 담당: `security_protocol` 에이전트. 다른 두 담당의 평가 결과를 보지 않고 1차 결론을 작성했다.
- 실행 ID: `2026-10-15-review-6d451bf-security` / 프로토콜 1.0.
- 관찰 시간: 2026-10-15 21:38–21:43 KST. 요청 대상은 공개 운영 사이트 `https://riragamehub.com`이다.
- 로컬 HEAD: `6d451bfa61c0b92b31c4e4465f6ea91b630ea898`, branch `main`. 시작 시 기존 `AGENTS.md` 변경만 있었으며 수정하지 않았다.
- 도구: Windows PowerShell 7.6.5, Node 24.19.0, npm 11.17.0, Vitest 5.0.3. 운영 요청은 .NET HttpClient의 GET으로만 수행했다. 자동 redirect와 쿠키를 비활성화했으며 인증 헤더·로그인·운영 쓰기는 사용하지 않았다. 브라우저/viewport·광고 동의·로그인 UI는 이번 담당의 검사 대상이 아니다.
- 기준: `THREE_ENGINEER_REVIEW.md`, 현재 Supabase skill, 소스·migration·CI와 Supabase 공식 RLS 문서.
- 운영 버전 근거: 해당 HEAD의 Cloudflare Pages 체크가 21:32:50 KST에 성공했다. 실제 홈이 참조한 entry는 `/assets/index-BoJpHqcy.js`였다. 공개 응답에 commit 식별자가 없어 도메인이 해당 commit과 완전히 같다는 독립 증명은 하지 못했다.

**판정: 전체 보안 통과 불가.** 제한한 의존성·공개 응답 검사는 수행했지만, 오류/redirect 응답의 보안 헤더 누락과 로컬 인증 저장키 불일치를 확인했다. 운영 Storage·신고 데이터 권한에 P1 위험 후보가 있고 원격 정책 및 역할별 거부 검증이 없어 핵심 권한 영역은 미검증이다. 운영 침해나 실제 비밀 유출을 확인했다는 뜻은 아니다.

항목 13개 중 PASS 5개, FAIL 2개, UNVERIFIED 6개다. 이 숫자는 점수나 전체 공격면의 검사율이 아니다. P0 확정 사례는 발견하지 않았지만 전체 부재를 보장하지 않는다.

## 실제 실행 결과

### SEC-01 — 의존성 advisory 진단: PASS

`npm audit --json`을 실제 실행했다. 처음에는 로컬 Node 신뢰 인증서 문제로 실패했다. TLS 검증을 끄지 않고 해당 프로세스에서만 `NODE_OPTIONS=--use-system-ca`를 추가해 재실행한 뒤 이전 환경값을 복구했다.

- 성공 시각: 21:39:24 KST.
- exit code `0`, auditReportVersion `2`.
- info/low/moderate/high/critical/total: 모두 `0`.
- `npm audit fix`, install, lockfile 갱신, 전역 설정 변경: 미실행.

현재 registry advisory와 lockfile 기준의 결과다. 소스 취약점·운영 권한·공급망 전체가 안전하다는 뜻은 아니다. 초기 인증서 실패를 사이트 결함이나 취약점으로 계산하지 않았다.

### SEC-02 — 현재 commit의 CI 증거: PASS

GitHub 공개 check-runs API에서 해당 SHA의 다음 체크가 모두 `completed/success`임을 확인했다.

- Cloudflare Pages: `2026-10-15T12:32:50Z`.
- Type, data, test, build and SEO: `2026-10-15T12:33:08Z`.
- audit: `2026-10-15T12:31:33Z`.

[Quality Gate 실행](https://github.com/IZrira/game-hub/actions/runs/38735279086), [Security Scan 실행](https://github.com/IZrira/game-hub/actions/runs/38735278972).

`.github/workflows/security-scan.yml`의 실제 차단 임계값은 `npm audit --audit-level=critical`이다. CI 성공만으로 high 이하 advisory가 없다고 판단하지 않았다. 이번 SEC-01에서는 별도 전체 JSON 진단으로 모든 심각도 0을 확인했다.

### SEC-03 — 정상 공개 응답의 헤더: PASS, 표본 한정

21:39:31–34 KST에 `/`, `/gallery/hsr`, `/gallery/ww`, `/gallery/nte`, `/gallery/aniimo`를 각각 GET했다. 모두 HTTP `200`, `text/html; charset=utf-8`였고 다음 헤더가 실제 응답에 있었다.

- `Cache-Control: must-revalidate, no-cache`.
- HSTS `max-age=31536000; includeSubDomains; preload`.
- CSP의 `default-src 'self'`, `base-uri 'self'`, `object-src 'none'`, `frame-ancestors 'none'`.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- camera/microphone/geolocation/payment/usb를 차단하는 Permissions-Policy.
- 다섯 응답 모두 `Set-Cookie`가 없었다. 쿠키·토큰 원문은 수집하지 않았다.

CSP에는 `script-src 'unsafe-inline'`, 광고 관련 호스트, `img-src https:`가 허용된다. 정책 존재만으로 XSS 방어 완료 판정을 하지 않는다. 실제 브라우저 위반·광고 호환·nonce/hash 전환 가능성은 별도 검증이 필요하다.

### SEC-04 — middleware 응답의 보안 헤더 누락: FAIL / P2, 확정

동일한 클라이언트로 21:39:34–35 KST에 다음을 확인했다.

- `/security-review-nonexistent-20261015`: HTTP `404`, HTML, `Cache-Control: public, max-age=60`, `X-Robots-Tag: noindex, nofollow`.
- `/blog`: HTTP `410`, HTML, `Cache-Control: public, max-age=300`, 같은 X-Robots-Tag.
- `/gallery/hsr/`: HTTP `301`, `Location: https://riragamehub.com/gallery/hsr`.
- `https://rira-game-hub.pages.dev/gallery/hsr`: HTTP `301`, 같은 custom-domain 목적지.

네 응답 모두 CSP·HSTS·nosniff·X-Frame-Options·Referrer-Policy·Permissions-Policy가 없었다. 정상 HTML과 적용 범위가 다르다. 소스상 `functions/_middleware.ts`의 직접 생성 Response/redirect가 근거이며 `public/_headers` 존재만으로 이 응답까지 보호되지 않는다.

현재 404/410 본문은 고정 문자열이고 입력이 삽입되지 않는다. 따라서 이 결과만으로 XSS 재현 또는 권한 우회를 주장하지 않는다. 후속 수정은 공통 응답 헤더 처리 후 200/301/404/410와 기존 redirect·SEO·cache 계약을 함께 회귀 검사해야 한다.

### SEC-05 — 공개 상태·redirect·해시 자산 캐시: PASS, 표본 한정

위 응답에서 없는 경로가 HTTP 200 SPA로 잘못 반환되지 않았고, 폐쇄된 blog는 410이었다. 두 redirect는 HTTPS의 의도된 호스트·경로를 가리켰다. 공격적인 URL·외부 redirect payload는 사용하지 않았다.

홈이 참조한 `/assets/index-BoJpHqcy.js`는 21:39:35 KST에 HTTP `200`, `application/javascript`, `Cache-Control: public, must-revalidate, max-age=31536000, immutable`이었다. 정상 보안 헤더도 유지되었다. 정상 HTML이나 위 오류 응답에는 immutable이 없었다. 이 검사로 인증 응답의 공유 캐시 안전성까지 확인한 것은 아니다.

### SEC-06 — 제한한 공개 JS의 secret 패턴: PASS, 표본 한정

21:40:52–55 KST에 초기 HTML이 직접 참조한 JS 두 개만 읽어 패턴 개수·JWT role만 검사했다. 값 원문·인증 헤더는 출력/저장하지 않았다.

- `/assets/index-BoJpHqcy.js`.
- `/assets/module-B_OWLw4Y.js`.

각 파일의 private-key PEM, Supabase `sb_secret_`, Google API key 패턴 개수는 모두 `0`, 검출한 JWT role은 없었다. 일반 anonymous/public client 설정키와 privileged secret은 구분했다. Git 추적 파일명 확인에서 `.env` 원본 대신 `.env.example`만 나타났다.

이는 전체 동적 chunk·Git 이력·배포 환경을 검사한 secret audit가 아니다. `.env` 실제 값은 읽거나 출력하지 않았고 모든 secret이 없다고 주장하지 않는다.

## 핵심 미검증 및 로컬 결함

### SEC-07 — 입력 렌더링·브라우저 XSS: UNVERIFIED

`common-hub/pages/Detail.tsx:29`에서 DOMPurify 후 HTML을 삽입하는 경로와 금지 태그·속성을 확인했다. `MarkdownRenderer.tsx`는 ReactMarkdown/remarkGfm을 사용하고 외부 링크에 `noopener noreferrer`를 둔다. `AdminPartyManager.tsx:756` 및 관리자 화면 일부에는 이름 앞 두 글자를 `innerHTML`로 넣는 fallback이 남아 있다.

보호 함수 존재는 확인했지만 이번 평가에는 악성 입력·브라우저 실행·sanitizer 우회 검증을 포함하지 않았다. 두 글자 sink만으로 실행 가능한 XSS를 확정하지 않는다. 안전한 로컬 fixture 테스트와 `textContent`/React 텍스트 출력 검토가 후속 사항이다. 기존 공략 출처 제거 테스트는 HTML 보안 sanitizer 검사와 별개다.

### SEC-08 — Storage 관리자 정책: UNVERIFIED / P1 위험 후보

`supabase/migrations/20260726000001_create_admin_media_bucket.sql`에 사용자 편집 가능한 metadata를 관리자 권한 근거로 사용하는 정책이 있다. `20261012011429_secure_admin_rls_metadata.sql`은 댓글 관련 두 정책을 교체하며 이 Storage 정책은 다루지 않는다.

로컬 SQL의 위험 구조는 확인했지만 운영의 현재 grants/policy·후속 수정·migration 적용 여부는 확인할 수 없었다. 운영 버킷·사용자 metadata를 변경하거나 업로드·삭제하여 증명하지 않았다. 운영 적용 여부를 읽기 전용으로 먼저 확인하고, 실제 거부 검증은 허가된 staging A/B/관리자 계정에서 해야 한다.

### SEC-09 — 신고자 관계의 공개 읽기: UNVERIFIED / P1 위험 후보

`20260725030000_full_schema_and_moderation.sql:30`의 신고 테이블 SELECT는 공개 전체 행을 허용하는 형태이고, 테이블에는 신고자와 댓글의 연결 정보가 있다. `CharacterReviewBoard.tsx`도 이 연결 정보를 client에서 요청한다. 최근 관리자 정책 교체는 이 SELECT를 제거하지 않는다.

신고자 비공개가 의도된 제품 정책이라면 공개 범위가 과도할 수 있다. 실제 운영의 grants·RLS·노출 데이터·개인정보 정책은 미확인이다. 검증을 위해 실제 신고 행·사용자 정보를 가져오지 않았다. 현재 운영 정책을 확인한 뒤 공개 aggregate와 본인 신고 상태만으로 기능을 유지할 수 있는지 검토해야 한다.

### SEC-10 — 인증 저장키와 초기화 판정 불일치: FAIL / P2, 로컬 정합성 확정

`common-hub/lib/supabase.ts:21`은 custom storage key를 사용하지만 `common-hub/context/AuthContext.tsx:15`의 세션 존재 판정은 SDK 기본 형식만 검사한다. 실제 custom key만 저장된 상태이고 OAuth callback이 없으면 이 조건은 인증 초기화를 건너뛴다.

`tests/auth-bootstrap.test.ts`도 기본 형식만 다뤄 custom-key 복원 회귀를 잡지 못한다. 소스상의 불일치는 확인했지만 운영 계정으로 로그인·새로고침하여 세션 복원 장애를 재현하지 않았다. 권한 상승이 확인된 것은 아니다. 후속 조치는 실제 키를 포함한 판정과 해당 회귀 테스트이며 RLS를 완화해서 해결하면 안 된다.

### SEC-11 — 운영 권한·세션·Storage 역할별 검증: UNVERIFIED

현재 turn에 Supabase skill을 전체 재독하고 사용 가능한 도구의 이름/설명에서 Supabase connector를 검색했으나 결과가 없었다. 원격 SQL·Advisors·grants·RLS·view/function·Storage 설정을 읽는 도구가 없고, 허가된 전용 staging A/B/관리자 계정도 제공되지 않았다.

따라서 타 사용자 행 접근 거부, 관리자 승인·회수, JWT 갱신, 로그아웃·계정 전환 후 비공개 데이터 제거, 업로드 MIME/용량·소유권·삭제 거부는 미검증이다. 클라이언트 관리자 ID 판정이나 UI 숨김을 서버 권한 검증으로 인정하지 않았다. 없는 권한을 추정하거나 `.env`의 관리 비밀값을 꺼내 우회하지 않았다.

### SEC-12 — client build의 비밀 환경값 치환 경로: UNVERIFIED / P2 위험 후보

`vite.config.ts:56`은 비공개일 수 있는 API 환경값을 `process.env` 상수로 치환하도록 설정한다. 현재 확인한 런타임 소스에서는 이 상수를 쓰는 참조를 찾지 못했고 SEC-06의 초기 JS에서도 해당 키 패턴이 없었다.

따라서 현재 유출을 확정하지 않는다. 향후 client 참조가 생길 때의 노출 경로를 제거하거나 서버 경계로 제한하는 검토와 전체 배포 chunk 검사가 필요하다. 값은 읽지 않았다.

### SEC-13 — privileged 함수·민감 필드 권한: UNVERIFIED / P2 위험 후보

moderation migration에 `SECURITY DEFINER` trigger 함수가 있으며 로컬 정의에는 고정 `search_path`가 보이지 않는다. 댓글의 관리자 표시·고정·집계 필드도 client payload와 연결된다. 운영의 함수 소유자·실행 grant·schema CREATE 권한·column grant·trigger 후속 정의는 미확인이다.

직접 권한 우회·관리자 위장 성공을 확정하지 않는다. 원격 schema/권한을 읽기 전용으로 확인하고, 필요한 경우 staging에서 민감 필드를 일반 사용자가 바꾸지 못하는지 검증해야 한다.

## 실행한 회귀 검사와 범위 제한

다음 명령을 21:41:33 KST에 실행해 5개 파일, 35개 테스트가 통과했다.

```text
node node_modules/vitest/vitest.mjs run tests/auth-bootstrap.test.ts tests/production-domain-redirect.test.ts tests/withdrawn_blog_routes.test.ts tests/language-url-canonical.test.ts tests/article-runtime.test.tsx
```

인증 초기화 조건·redirect·폐쇄 경로·canonical·정적 article 응답 캐시/보안 헤더 보존에 관한 로컬 회귀다. `happy-dom`/mock 테스트를 실제 운영 RLS·로그인·브라우저 콘솔·XSS 검사로 표현하지 않는다. 전체 타입/테스트/빌드는 이 보안 담당이 중복 실행하지 않았으며 해당 SHA의 CI 결과와 별도 담당 실행을 구분한다.

Notion 동기화, production 데이터 접근/변경, 메타데이터 변조, 업로드·삭제, 침투/부하 스캔, 의존성 fix, 코드 수정, Git commit/push, 별도 배포는 하지 않았다. 이 보고서만 작성했다.

## 다음 우선순위와 공식 기준

1. P1 위험 후보 두 개의 현재 운영 policy/grants를 권한 있는 읽기 전용 도구로 확인한다. 신고자 공개 범위의 제품 정책도 확인한다.
2. middleware의 정상·redirect·404·410 공통 보안 헤더 처리와 custom auth storage key 회귀를 각각 수정·검증한다.
3. 승인된 staging에서 A/B/관리자 역할의 허용·거부 테스트를 수행하고 client secret·sanitizer·Storage·privileged 함수 영역을 확장한다.

[Supabase RLS 공식 문서](https://supabase.com/docs/guides/database/postgres/row-level-security)의 user/app metadata 구분, grants와 정책의 차이, privileged 함수 지침을 확인했다. [공식 변경 이력](https://supabase.com/changelog.md)을 실제 GET했고 관련 [TLS cipher 변경](https://supabase.com/changelog/cbc-tls-ciphers-deprecated)도 확인했다. 이번 평가에서 서버나 TLS 정책을 변경하지 않았다.

## 교차 검토

독립 1차 결론 작성 후 성능 담당의 실제 측정 조건·변경 여부를 확인한다. 현재까지 성능을 위해 인증·CSP·로그·운영 캐시를 완화하는 변경은 수행하지 않았다. 다른 담당 결과를 받은 뒤 이 섹션에 별도로 기록하며 1차 결론을 소급해서 바꾸지 않는다.

보안 → 성능 교차 검토: [성능 독립 보고서](2026-10-15-review-6d451bf-performance.md)와 현재 변경 범위를 확인했으며, 이번 측정에서 인증·CSP·로그·캐시 보호를 완화하거나 광고·동의·콘텐츠를 제거한 구현 변경은 없었다. 실행 주체·공용 PSI 원자료·독립 3회와 단일 관측·쿠키 상태 미통제·콜드/웜/INP 미검증을 구분한 보고는 적절하며, 공개 비로그인 성능 수치와 예산 통과를 운영 인증·권한·공유 캐시 안전성 검증으로 대신하지 않는다는 기존 보안 판정을 유지한다.
