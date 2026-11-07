# 성능 독립 평가 — 운영 실측 미검증, 공개 HTTP·초기 자산·기준 코드 검사

## 실행 정보

- 실행 ID: 2026-10-16-a7e6c0a-eval-performance / 프로토콜 1.0.
- 담당 에이전트: /root/eval_performance_1016, 성능 담당. 다른 담당 보고서·결론을 읽지 않았다.
- 일시: 2026-10-16 17:34–17:37 KST. 공개 홈 응답 Date: 2026-10-16 08:34:32 GMT.
- 평가 기준: main, a7e6c0ae42ec19d230c0ae233762a599638b37e7. 시작 git status 확인. 기존 tracked 9개·untracked 16개 변경을 보존했다. dirty PERFORMANCE 정책도 읽었으며 기준 코드는 git show HEAD로 구분했다.
- 운영 commit 일치는 주 담당 확인에 의존한다. 이 담당이 확인한 운영 자산 식별자는 index-BoJpHqcy.js, module-B_OWLw4Y.js, index-mmpGSCuh.css이며 HTTP 자체에서 commit SHA를 증명하지 못했다.
- 전체 평가 요청 중 성능 역할. 한국어 공개 로그아웃 HTTP 조회. 브라우저 viewport·CPU·network·쿠키·광고 실제 표시 상태는 미검증이다. OS Windows, PowerShell Invoke-WebRequest/.NET gzip, web 도구, git 사용. 정확한 버전은 미수집.
- 읽은 원본: AGENTS.md, THREE_ENGINEER_REVIEW.md, three-engineer-review.md 양식, PERFORMANCE.md 전체. HEAD package.json·audit-performance.js·Quality Gate·index.tsx·useGuideArticle.ts·AdPlaceholder.tsx·HSR 데이터 의존·vite.config.ts·public/_headers 확인.
- 허용: 공개 HTTP·공개 CI 읽기. 코드/데이터/환경/예산/Notion 변경, 운영 쓰기, 부하 시험, commit/push 없음. 산출물은 이 보고서뿐이다.

## 독립 결론

1차 결론은 17:35 KST에 다른 담당 결과 열람 전에 주 담당에게 고정 전달했다. 초기 공개 자산 예산과 HTTP 표본은 PASS이며 전체 성능은 UNVERIFIED다. 이후 추가 정적 분석에서 HSR 상세의 전체 데이터 정적 의존을 확인해 P2 정책 불일치를 추가했다. 이는 다른 담당 결론에 따른 변경이 아니다.

실제 FCP/LCP/CLS/TBT/INP·콜드/웜·SPA·서드파티 실행비용을 측정하지 못했으므로 전체 성능 통과나 임의 점수를 선언하지 않는다. 확인한 범위에서 P0/P1 장애는 발견하지 않았다.

## 실행 및 원자료

기본 샌드박스의 Invoke-WebRequest는 DNS 오류였다. 공개 읽기 전용 요청을 require_escalated로 재시도하여 정상 사이트 HTTP를 확인했다. web 도구도 홈 초기 HTML에 접근했다. PSI API는 아래 두 요청 모두 HTTP 429 RESOURCE_EXHAUSTED, daily quota_limit_value=0을 반환했다.

- `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Friragamehub.com%2F&strategy=mobile`
- `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Friragamehub.com%2F&strategy=desktop`

모바일/desktop 각 1회 시도, 성공 0회다. 이미 명시된 일일 할당량 부족으로 동일 실패를 3번 반복하지 않았다. 모든 URL·기기별 독립 3회 실행, capture timestamp, FCP/LCP/CLS/TBT 원본 및 중앙값은 미존재다. INP 현장 집계·percentile·기간도 미확인이다. TBT를 INP로 대체하지 않았다. PSI API 실패를 사이트 성능 실패로 해석하지 않는다.

원자료는 이번 에이전트 도구 실행 출력에 남아 있으며 별도 HAR/Lighthouse JSON 파일은 없다. 보고서 아래 표에 응답 원값을 옮겼다. HTTP는 렌더링·상호작용 성능 검사가 아니다.

### HTTP 표본 14개

호스트는 모두 `https://riragamehub.com`, query 없음. 모두 200, HTML article 존재, `Cache-Control: must-revalidate, no-cache`, 같은 entry index-BoJpHqcy.js였다. article 존재만으로 본문 완전성이나 시각 표시를 통과시키지 않는다.

| 경로 | 디코딩 후 UTF-8 bytes |
|---|---:|
| / | 17,501 |
| /gallery/hsr | 75,487 |
| /gallery/hsr/character/feixiao | 27,428 |
| /gallery/hsr/character/feixiao/guide | 24,769 |
| /gallery/ww | 50,883 |
| /gallery/ww/character/baizhi | 23,783 |
| /gallery/ww/character/baizhi/guide | 20,519 |
| /gallery/nte | 27,045 |
| /gallery/nte/character/감정사 | 21,453 |
| /gallery/nte/guides/감정사-build-guide | 17,272 |
| /gallery/aniimo | 18,386 |
| /gallery/aniimo/characters | 25,721 |
| /gallery/aniimo/character/탄멍멍 | 19,552 |
| /gallery/aniimo/guides/evolution-and-forms-guide | 19,590 |

### 공개 초기 자산 예산 — PASS

공개 HTTP 응답 문자열을 UTF-8 bytes로 변환하고 .NET GZipStream Optimal로 메모리 압축했다. 이는 로컬 gzip 추정이며 CDN 실제 전송량·Content-Length가 아니다. 응답 Content-Encoding은 비어 있었다. Node zlib와 압축 구현이 다르므로 정확한 CI 원값과 동일하다고 주장하지 않는다.

| 자산 | 비압축 bytes | 로컬 gzip bytes | 예산 bytes |
|---|---:|---:|---:|
| /assets/index-BoJpHqcy.js | 84,821 | 24,148 | entry 32,000 |
| /assets/module-B_OWLw4Y.js | 360,344 | 115,767 | chunk 250,000 |
| entry + HTML modulepreload 합계 | 445,165 | 139,915 | initial JS 170,000 |
| /assets/index-mmpGSCuh.css | 217,738 | 26,998 | CSS 34,000 |

세 자산은 모두 HTTP 200, `public, must-revalidate, max-age=31536000, immutable`이었다. HTML은 재검증, 해시 JS/CSS는 장기 캐시라는 정책과 맞는다. 동적 chunk·이미지·폰트·광고 총전송량·긴 작업·요청 수는 이 합계에 포함하지 않았다.

### CI 및 정적 보호

공개 GitHub Actions API에서 HEAD 일치 Quality Gate success를 확인했다: [run 38870282700](https://github.com/IZrira/game-hub/actions/runs/38870282700), 생성 2026-10-16 07:55:25Z. HEAD workflow는 typecheck→validate:data→npm test→build이며 build 마지막에 SEO·perf:audit를 실행한다. 이는 해당 workflow 성공 증거이고 개별 로그·artifact의 수치까지 읽은 결과는 아니다.

HEAD index.tsx는 홈·언어 준비를 병렬 대기하고 다른 경로는 Home을 선다운로드하지 않는다. useGuideArticle는 URL별 선택 JSON fetch·AbortController·이전 URL 응답 숨김·재시도를 갖는다. AdPlaceholder는 숨긴 슬롯의 무한 RAF 재시도 대신 ResizeObserver를 쓰며 timer/RAF/observer를 정리한다. 이들은 정적 구현 확인 PASS이며 실제 브라우저 회귀 재현은 UNVERIFIED다.

이 담당은 타입·테스트·build·perf:audit를 로컬에서 재실행하지 않았다. 기존 dirty tree의 빌드 결과나 dist를 HEAD/운영 빌드 증거로 사용하지 않았다. 주 담당이 전한 dirty tree 타입·326테스트·build PASS는 별도 범위다.

## 발견 사항

### PERF-01 — HSR 상세의 전체 데이터 정적 의존

- 성능 / P2 / FAIL(코드 정책 불일치), 실제 체감 영향 UNVERIFIED.
- 범위: HEAD `/gallery/hsr/character/feixiao` 및 같은 HSR 상세 모듈 경로.
- 재현: `git show HEAD:hsr-hub/pages/CharacterDetail.tsx`의 getHsrGameData import 및 115행 호출 → `hsr-hub/data/gameData.ts`의 HSR_DATA_ALL import → `hsr-hub/data/index.ts`의 characters/lightcones/relics/ornaments/guides 정적 import → `characters.ts`의 전체 캐릭터 정적 import 확인.
- 기대: PERFORMANCE.md의 상세에 필요한 선택 데이터만 로드한다는 원칙.
- 실제: 전체 CHARACTER_DB를 반환 후 find하며, HSR_DATA_ALL 경유로 장비·공략 전체 원본까지 정적 의존한다. Vite의 hsr-character-details 수동 chunk 분리는 캐릭터별 선택 로딩과 동일하지 않다.
- 확정 범위는 소스 의존 관계다. 해당 경로 전체 다운로드량·LCP 지연·배포 회귀 시점은 측정하지 않았으며 예산 초과라고 주장하지 않는다.
- 다음 조치: 별도 구현 요청 시 상세 선택 로더와 목록 요약/장비 참조를 분리하되 추천·시너지·아이콘·번역을 보존하고, 실제 경로 전송량 및 모바일/desktop 3회로 검증한다. 이번 평가에서는 수정하지 않았다.

### PERF-02 — 운영 체감 및 CWV 핵심 증거 부족

- 성능 / UNVERIFIED / 핵심 평가 공백. 사이트 결함으로 분류하지 않으며 코드 심각도를 붙이지 않는다.
- PSI 할당량 0으로 FCP/LCP/CLS/TBT 실험실 자료가 없다. INP 현장 자료, cache 초기화·웜·SPA 이동·실패복구·광고 비용도 없다.
- 다음 조치: 사용 가능한 PSI 할당량 또는 승인된 브라우저 성능 측정 도구에서 같은 배포·광고 조건으로 홈과 각 허브 목록/상세/가이드의 모바일·desktop 독립 3회 원자료를 보관한다. Core Web Vitals 현장 75백분위 목표와 실험실 수치를 구별한다.

## 미검증 범위와 완료 기록

- 정적 자동 검사: HEAD CI workflow 성공 확인. 전체 asset별 예산 원자료 재수집은 미실행.
- 브라우저: 초기 HTML→앱 전환, 검색/메뉴/필터, SPA, 이미지 fallback, stale 응답·오류 재시도, 긴 스크롤, 폰트/광고 비용 미검증.
- 고정 평가 목록 중 공통 about/privacy/contact, 각 guide 목록·추가 전투 가이드·티어표·파티 경로는 성능 HTTP 표본에서 제외되어 이 담당 기준 미검증이다. Aniimo characters를 목록 표본으로 포함했다.
- N/A: 운영 데이터 쓰기·부하/침투 시험·Notion 동기화·배포는 읽기 전용 평가 범위 밖이다.
- 수정 파일: 이 보고서만. Notion·commit·push·Cloudflare 배포 실행 없음. commit message/hash 없음(평가 대상 hash와 별개).
- 보고서 내용 재검토 및 diff whitespace 검사를 수행한다. 기존 tracked 수정의 diff는 평가 산출물에 포함하지 않는다.

## 교차 검토

독립 결론 고정 후 교차 검토를 진행한다. 다른 담당 결과로 독립 판정을 임의 상쇄하지 않는다.

- 보안→성능: /root/eval_security_1016의 독립 결론 고정 후 전달 의견. 공개 hashed JS/CSS 장기 캐시·HTML 재검증은 보안 관측과 일치한다. 평가 때문에 Auth/CSP/광고·콘텐츠를 완화하거나 변경한 증거는 없으며 gzip 예산 PASS를 권한/RLS 또는 전체 성능 통과로 확대하지 않은 점을 확인했다. HSR 선택 로더 제안도 인증 응답 공유 캐시나 CSP 완화를 요구하지 않는다. 운영 RLS 미검증은 별개로 유지한다.
- 성능→디자인: 독립 결론 고정 후 `2026-10-16-review-a7e6c0a-eval-design.md` 전체를 읽었다. D01의 NTE parties 390px에서 h1 x398 시작, 320px에서 x328 시작 및 검은 본문, desktop 정상 표시는 핵심 모바일 접근을 막는 P1이며 초기 JS 예산 PASS와 충돌하지 않는다. 이 경로는 이 담당 14개 HTTP 표본에도 포함되지 않았다. overflow로 scrollWidth가 정상처럼 보이는 조건은 숫자만으로 레이아웃을 통과시키지 말아야 함을 뒷받침한다. D02 검색 모달 Escape 후 BODY 복귀 역시 전송량과 별개의 UX 실패다. 디자인 관측을 FCP/LCP/CLS/INP 수치로 변환하지 않았다.
- 콘텐츠·이미지·광고 보존: 이번 평가에서 이를 숨기거나 제거하는 수정은 어느 담당도 수행하지 않았다. HTTP article 존재와 예산 준수만으로 모든 본문·이미지·광고가 화면에서 보존됐다고 판정하지 않는다. 실제 광고 fill 및 전체 콘텐츠 화면 보존은 미검증이다. D03 아이콘 로드 실패와 D04 앱 전환 후 head 중복은 초기 HTTP 성공과 별개로 유지한다.
- 이견: 없음. 성능 전체 UNVERIFIED 및 HSR 정적 의존 P2, 디자인 P1/P2를 각각 유지한다. dirty 기존 수정이 있다는 사실은 운영 재검증 PASS가 아니다.
