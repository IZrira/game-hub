# 후속 성능 개선: 초기 분석 가이드 본문 의존 제거

## 원인과 변경

기준 커밋 a94e506. 공통 라우터가 NTE 가이드 이동 경로를 판단하려고 guideArticles를 정적으로 참조했고, 이 모듈이 32개 가이드의 전체 본문까지 초기 번들에 포함했다. 사이드바와 목록·추천 글도 같은 모듈을 사용했다.

로컬 원본은 유지하고 본문·sources를 제외한 guide-summaries.json을 생성한다. 라우터, 사이드바, 목록·추천 글, NTE 도감의 공략 연결에는 이 요약만 사용한다. 상세 글과 NTE 세팅 본문은 기존 전체 데이터와 렌더러를 그대로 사용한다. 내용·순서·공개 상태·characterId·notionPageId 등 연결 필드는 동일하다.

개발·테스트·빌드와 로컬 검색 데이터 생성에 요약 생성을 연결했다. Notion 동기화는 하지 않았다. 원본 가이드 JSON, 디자인과 사이트맵 URL은 변경하지 않았다.

## 같은 로컬 빌드 조건의 크기 비교

- 원본 분석 가이드 JSON 94,405 bytes → 메타데이터 17,590 bytes. 본문은 상세에서 여전히 필요하다.
- 진입 JS gzip 43,574 → 24,065 bytes: 약 44.8% 감소.
- 진입 JS + HTML modulepreload gzip 합계 158,128 → 138,619 bytes: 약 12.3% 감소.
- CSS 최대 gzip 26,898 bytes: 변경 없음.

파일 압축 크기 비교이며 실측 네트워크 전송량이나 로딩 시간 개선율은 아니다. LCP·INP·CLS 및 Lighthouse 3회 중앙값은 확보하지 않았으므로 성능 점수·시간 개선을 주장하지 않는다.

## 유지 체계 보완

기존에는 GitHub 별도 단계에서만 성능 예산을 검사해 Cloudflare 빌드와 독립적으로 실패할 수 있었다. 이제 npm run build 마지막에 perf:audit를 넣었으므로 같은 빌드 명령을 쓰는 배포에서도 예산 초과가 빌드 실패로 처리된다. CI의 중복 실행은 제거했다.

개선 후 되돌아가지 않도록 진입 JS 예산 56,000→32,000 bytes, 초기 JS 합계 220,000→170,000 bytes로 강화했다. 요약 JSON 예산 24,000 bytes도 추가했다. PERFORMANCE.md에 초기 본문 정적 참조 금지와 생성 절차를 기록했다.

## 검증

- TypeScript 검사 성공.
- 전체 테스트 32개 파일·269개 테스트 통과. 32개 원본과 요약의 순서·필드 일치, 게임별 공개 필터와 링크, 없는 항목, esbuild 런타임 의존에서 전체 본문 모듈 제외를 검사했다.
- 기존 HSR·WW 세팅 전환 테스트가 UI 갱신 전에 결과를 읽어 실패한 경우를 확인했다. 선택 버튼의 aria-pressed 갱신을 기다리도록 보완 후 전체 검사 통과. 제품 코드나 공략 값은 이 문제 때문에 바꾸지 않았다.
- 빌드와 890개 사이트맵 경로 SEO 감사 및 강화된 성능 예산 검사 성공.
- 브라우저에서 이환 공략 목록의 기존 글 링크와 에스퍼 사이클 분석 본문·관련 글 연결이 표시되는 것을 확인했다.
- git diff --check 및 수정 내용 검토. 기존 AGENTS.md 변경은 보존하고 커밋에서 제외한다.
- commit/push/Cloudflare 및 운영 접근 결과는 완료 보고로 제공한다.

## 수정 파일

common-hub/data/guideSummaries.ts 및 생성 JSON, scripts/generate-guide-summaries.js, scripts/generate-search-data.js, 공통 router·GallerySidebar·ReviewedGuideHighlights·GuideList, NTE Gallery·CharacterDetail, package.json, GitHub Quality Gate, scripts/audit-performance.js, 관련 테스트, PERFORMANCE.md와 본 보고서.

## 남은 한계

본문 상세를 열면 전체 분석 글 모듈을 지연 로드하는 구조는 유지한다. 개별 분석 글 본문 분리는 별도 개선 대상이다. 외부 광고·폰트·CDN 조건과 실제 사용자 지표는 용량 예산만으로 보장할 수 없다. 기존 LF/CRLF 경고 및 키레네 혼합 유물 표기의 데이터 경고는 이번 범위에서 변경하지 않았다.
