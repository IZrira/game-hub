# HSR·NTE 분석 보강 — 독립 성능 검토

- 담당: `/root/content1031_performance` 성능 검토 에이전트.
- 날짜: 2026-10-31 KST.
- 기준: main, HEAD `146d1ff26363a2e7472d67c2ce8c1cf583ba5083` 위 이번 분석 콘텐츠·공개 연결 변경.
- 정책: `AGENTS.md`, `docs/guides/THREE_ENGINEER_REVIEW.md`, `docs/guides/PERFORMANCE.md`.
- 범위: HSR 어벤츄린·웨이브 1명, NTE 5명 분석을 공개 데이터·초기 HTML·기존 탭에 연결하는 변경. 전체 사이트 성능 평가가 아니다.
- 작업 시작부터 있던 AGENTS.md와 10월 15~18일 미추적 보고서는 검토·수정 대상에서 제외했다.
- 다른 검토자의 결론을 읽기 전에 아래 1차 결론을 고정했다. 코드 수정·Notion·생성기·테스트·빌드·배포는 실행하지 않았고, 부모가 실행하는 검증과 경합하지 않았다.

## 1차 판정

변경된 소스 의존과 데이터 생성 경계의 성능 검토 PASS. P0/P1 성능 결함은 발견하지 않았다. 부모의 최종 빌드 완료 통보 후 산출물 용량을 독립 재계산하여 예산 충족을 확인했다. 운영 실측은 별도 확인 대상이다.

### PASS P1 — 분석 본문이 목록 메타데이터에 포함되지 않음

`scripts/generate-guide-summaries.js`는 분석을 연결한 후 `content`, `sources`, `analysis`를 모두 제외해 목록용 요약을 생성한다. 원본 분석 JSON을 목록·사이드바에 직접 import하는 변경이 없다. 공통 `guideArticles.ts`는 작성·생성·검증용 전체 데이터 모듈이며 실제 페이지·hook·summary 쪽의 참조는 `import type`이다.

### PASS P2 — 선택한 공략의 JSON만 요청하는 경계 유지

NTE 상세 페이지는 변경 전과 같이 `useGuideArticle`로 slug별 해시 JSON을 요청한다. 분석 탭 전환은 이미 받은 `article.analysis`를 표시하며 별도 fetch·폴링·전체 공략 요청을 추가하지 않았다. 기존 요청 취소·뒤늦은 이전 응답 배제·재시도 코드는 변경하지 않았다. `key={article.slug}`를 유지하므로 다른 캐릭터 이동 시 분석/세팅 상태도 초기화된다.

### PASS P3 — 콘텐츠 증가와 실제 시간 지표 구분

원본 JSON과 순수 공개 변환 함수를 읽기 전용으로 비교한 NTE 예상 개별 runtime 크기(bytes)는 다음과 같다. 이는 생성 규칙의 계산값이며 최종 build 산출물·CDN 전송량을 대체하지 않는다.

- 아들러: raw 1,472 → 4,226, 최종 후보 gzip 2,021.
- 에드가: raw 1,396 → 4,241, 최종 후보 gzip 1,956.
- 우미츠키: raw 1,486 → 4,306, 최종 후보 gzip 2,008.
- 치즈: raw 1,468 → 4,382, 최종 후보 gzip 2,023.
- 파디아: raw 1,384 → 4,274, 최종 후보 gzip 2,102.

모두 글별 raw 24,000 bytes 예산 안이다. 본문을 삭제하거나 광고·이미지를 숨겨 용량을 낮춘 변경은 없다. NTE 원본 세팅과 추천 순서는 로컬 분석과 별도 저장된다.

## 최종 생성물 확인

부모가 TypeScript 및 최종 `npm run build` exit 0, SEO·성능 예산 통과를 알린 뒤 `dist/index.html`의 실제 module script와 preload 경로를 추출하고 `gzipSync`로 재계산했다. 빌드 명령 자체를 독립 재실행하지 않았다.

- 진입 JS gzip: 25,313 / 32,000 bytes.
- 진입 + modulepreload JS gzip: 139,867 / 170,000 bytes.
- JS chunk 299개 중 최대 gzip: 206,539 / 250,000 bytes.
- CSS 최대 gzip: 26,847 / 34,000 bytes.
- 목록 summary raw: 18,671 / 24,000 bytes. 생성 JSON 전체 항목에 analysis 필드 없음.
- 전체 article JSON 34개 최대 raw: 14,643 / 24,000 bytes.
- HSR guide JSON 93개 최대 raw: 31,890 / 40,000 bytes.
- WW guide JSON 57개 최대 raw: 5,473 / 40,000 bytes.
- HSR character JSON 93개 최대 raw: 28,496 / 40,000 bytes.

NTE 5개 manifest가 가리키는 최종 dist JSON은 위 후보와 byte 단위로 일치한다. 모두 analysis.status=published이고 대응 초기 HTML에도 `RIRA 캐릭터 분석` 본문이 있다. HSR 어벤츄린·웨이브 개별 JSON은 raw 5,867 bytes, gzip 2,548 bytes이며 analysis.status=published다. 이는 로컬 파일 크기로 실제 CDN 응답 전송량이나 속도 향상률을 뜻하지 않는다.

마지막 전체 테스트·commit·push·배포 여부는 이 독립 파일 검산과 구분하여 부모가 완료 보고한다.

## 미검증

- 실제 사용자 CWV, FCP/LCP/CLS/INP/TBT, 네트워크·CPU 제한, 콜드/웜 3회 측정: 이번 독립 검토에서 수행하지 않았다.
- 실제 브라우저 탭 전환·레이아웃과 console: 부모의 화면 검증으로 별도 보고한다.
- 최종 타입/테스트/build/SEO와 commit·push·Cloudflare·운영 commit: 부모가 실행하고 결과를 별도 보고한다.
- 이 결과를 사이트 전체 성능 통과나 검색·광고 승인 가능성으로 환산하지 않는다.

## 교차 검토 의견

성능 → 디자인: 추가된 분석은 기존 공통 `GuideAnalysis` 컴포넌트를 사용하며 세팅 화면은 탭으로 계속 제공한다. 검증된 콘텐츠를 숨겨 성능 수치를 높이는 변경이 아니다. 노션 세팅 원문을 짧게 바꾸거나 이미지·광고 로딩을 제거하지 않았다. 실제 화면 크기와 가독성은 디자인 및 부모 브라우저 검증의 범위다.
