# NTE 로컬 분석 연결 — 독립 보안 검토

- 담당: `/root/content1031_security` 보안 검토 에이전트.
- 1차 판정: 2026-10-31 KST. 다른 담당의 판정을 열람하지 않고 작성했다.
- 기준: `AGENTS.md`, `docs/guides/THREE_ENGINEER_REVIEW.md`.
- 대상: main / 기준 HEAD `146d1ff26363a2e7472d67c2ce8c1cf583ba5083` 위 NTE 분석 연결 변경.
- 범위: 로컬 소스·diff·회귀 테스트 설계의 정적 검토. 기존 AGENTS.md 및 과거 미추적 보고서는 제외했다.
- 실행 환경: Windows PowerShell. 테스트·빌드·브라우저·배포·운영 인증 검증은 주 담당이 수행하며 이 에이전트는 실행하지 않았다.

## 판정

발견한 P0/P1은 없다. HTML 출력과 게시 상태·캐릭터 매칭은 정적 기준을 충족한다. 아래 P2 원본 변경 감지 한계는 주 담당에게 전달한 뒤 수정 소스를 재검토해 해소했다. 변경 범위의 정적 보안 판정은 PASS다. 전체 운영 보안 통과나 AdSense 승인 평가가 아니다.

### PASS S1 — 분석 문자열의 HTML 실행 차단

`renderNteGuideAnalysis`의 summary, role, standard, reviewedAt, 장점·주의점, 파티 원리, 운용 설명·순서·팁은 모두 전달된 `escape`를 거쳐 텍스트 문맥에 들어간다. 실제 호출부는 기존 `escapeHtml`을 전달하며 이 함수는 `& < > " '`를 이스케이프한다. 신규 helper는 분석값을 href·스타일·스크립트 문맥에 넣지 않는다.

React의 `GuideAnalysis`도 문자열을 JSX 텍스트 노드로 표시하고 `sanitizePublicGuideText`를 적용한다. 이번 경로에 raw HTML 삽입·eval·새 원격 실행은 없다.

회귀 테스트에는 summary의 img/onerror 문자열과 운용 순서의 script 문자열을 넣어 HTML로 살아나지 않는지 확인하는 사례가 있다. 테스트 실행 성공 여부는 주 담당의 최종 결과를 따른다.

### PASS S2 — 게시 및 캐릭터 일치 조건

`attachNteGuideAnalysis`는 NTE 문서와 `published` 문서만 대상으로 하고, 로컬 분석의 published 상태, characterId, applicableVersion, sourceReviewedAt 및 검토 원본 sourceContent가 일치해야 분석을 연결한다. 다른 게임, 미등록 slug, draft/review 분석은 연결하지 않는다. React도 analysis.status를 재확인하며 미등록 분석의 탭은 비활성화한다.

새 helper는 입력 article을 직접 수정하지 않고 복사본에 분석과 최종 검토일만 붙인다. 원본 content와 추천 순서·수치는 그대로 유지한다. 원본 공략 JSON과 Notion 동기화 스크립트에 diff가 없으므로, 이번 변경은 동기화 실행이나 DB 쓰기와 다르다.

### PASS S3 — 같은 날 원본 수정 감지 한계 P2 해소

1차 소스는 `record.sourceReviewedAt === article.reviewedAt`으로 원본의 신선도를 확인했다. 동기화 스크립트가 reviewedAt을 `last_edited_time.slice(0, 10)`으로 저장하므로 같은 날 본문이 바뀌면 날짜가 같아 기존 분석이 연결될 수 있다. 이 검사는 캐릭터·버전·검토일 일치이며 본문이 동일한 정확한 revision까지 보장하지 않는다.

- 기대: 검토한 원본 내용이 달라지면 재검토 전 분석 연결을 보류한다.
- 제안했던 해결 방향: 검토한 content의 fingerprint 또는 snapshot을 로컬 기록에 저장하고 현재 content와 함께 대조한다. 자동으로 새 기준을 덮어써 재검토를 생략하지 않는다.
- 재검토: 후속 helper는 `record.sourceContent !== article.content`인 경우 연결하지 않는다. 다섯 로컬 기록의 sourceContent가 현재 원본 content와 정확히 같은 것도 독립 파일 읽기로 확인했다. 기사 본문에 같은 날 한 줄을 추가하는 회귀 테스트 사례가 추가됐다.
- 공개 데이터에는 record 전체가 아니라 record.analysis만 연결한다. snapshot은 빌드 검토 기준이며 공개 runtime의 새 metadata로 복사하지 않는다.
- 상태: 소스 기준 해소. 테스트 실행·최종 생성물은 주 담당의 결과를 따른다. 이 gate는 세팅 글의 본문·메타데이터 일치를 확인하며 스킬 도감 변경의 의미를 자동 검수하는 기능은 아니다.

### PASS S4 — 권한·캐시·운영 설정 확대 없음

수정 범위에 Auth/RLS, service-role, 운영 DB, 환경변수, Cloudflare 설정, AdSense/CMP, CSP, 응답 공유 캐시 정책 변경이 없다. sourceAnalysis 파일은 공개할 가이드 내용이며 비밀값을 읽는 로직을 추가하지 않는다. 이번 정적 검토로 저장소 전체의 secret 부재를 주장하지 않는다.

## 검증 증거와 한계

- `git status --short`, 변경 파일의 `git diff`, 신규 helper·테스트·React 렌더러 및 실제 escapeHtml 정의를 읽었다.
- 원본 `common-hub/data/guideArticles.json`, `scripts/lib/sync-nte-guides.js`, `scripts/fetch-notion-data.js`, 미들웨어와 public 헤더에 diff 없음 확인.
- 확인한 변경 파일의 `git diff --check` 통과. LF→CRLF 안내만 있다.
- Notion·운영 DB/API 쓰기·스키마·권한 변경·commit/push·생성기·빌드·테스트는 실행하지 않았다.
- 실제 브라우저, 최종 생성 JSON/초기 HTML, 운영 헤더·인증·캐시·의존성 audit는 이 검토에서 UNVERIFIED다.
- 과거 배포 또는 사용자 브라우저에 이미 남은 공개 응답의 철회 여부는 이 변경의 보장이 아니다.

## 교차 검토 의견

보안 → 성능: 게시/검토 조건과 기존 캐시 보호를 완화해 성능 점수를 높인 변경은 없다. 목록용 summary에서 분석 본문을 제외하고 개별 runtime에 싣는 구조는 노출 범위와 로딩 범위를 분리한다. 실제 용량 예산은 성능 담당과 최종 빌드 결과를 따른다.
