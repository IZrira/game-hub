# 독립 성능 평가 — 6d451bf

## 실행 정보와 독립성

- 실행 ID: 2026-10-15-review-6d451bf-performance / 프로토콜 1.0.
- 담당: performance_protocol 에이전트. 성능 1차 판정 고정: 2026-10-15 12:44:20 UTC, 21:44:20 KST. 이 판정까지 다른 두 담당의 보고서·결론은 열람하지 않았다. 독립 판정 후 디자인 보고서만 교차 검토했다.
- 대상: main, `6d451bfa61c0b92b31c4e4465f6ea91b630ea898`, 운영 `https://riragamehub.com`. 배포 버전 확인과 공용 실측 수집은 주 담당이 수행했다.
- 시작 git status: 기존 `AGENTS.md` 변경만 존재. 소스·설정·Notion·DB·Git 변경은 하지 않았고, 이 보고서만 작성했다.
- 기준: THREE_ENGINEER_REVIEW.md, PERFORMANCE.md, 현재 router·초기 진입·도감·공략 로딩 소스, 성능 예산 스크립트.
- 이 에이전트의 CUA 세션은 브라우저 목록이 비어 있었고, iab 생성도 Browser is not available로 실패했다. 공식 PSI API 대안도 12:38:50 UTC에 HTTP 429 RESOURCE_EXHAUSTED로 실패했다. 반복 호출하거나 별도 브라우저 조작 수단으로 우회하지 않았다.
- 주 담당의 정상 연결된 브라우저에서 PageSpeed UI 원자료를 공용 수집했다. 이 보고서는 그 수치를 독립 분석한 결과이며, 성능 담당이 직접 브라우저를 조작한 것처럼 표현하지 않는다.

## 범위와 측정 조건

- 최소 대표 표본 13 URL: 홈, 4개 허브, 4개 캐릭터 상세, 4개 세팅/분석 가이드. 이 중 11 URL에서 모바일·데스크톱 결과를 받았다.
- 총 15개 PSI 보고서, 기기별 결과 30개. 홈과 HSR 상세만 독립 3회이며, 나머지는 1회다. 동일 결과 URL을 복제해 횟수를 채우지 않았다.
- 도구: Lighthouse 13.5.0. 모바일 Moto G Power 에뮬레이션, Slow 4G, 초기 페이지 로드. 데스크톱은 별도 PSI 에뮬레이션이다. 디자인 점검용 390×844/1440×900과 같다고 간주하지 않는다.
- 반복 측정의 시각·결과와 원격 CPU 성능값이 서로 달랐다. 같은 PSI 프리셋이라도 원격 호스트 CPU까지 완전히 같은 통제 환경은 아니다. 아래 중앙값은 이번 관측 분포의 요약이며, 엄격한 전후 성능 개선율의 기준으로 사용하지 않는다.
- URL에 언어 query·인증 상태를 넣지 않았다. 초기 공개 페이지가 대상이며 운영 계정으로 로그인하지 않았다. PSI 세션의 쿠키/동의 배너 선택을 직접 통제하지 않았고, 광고·동의 스크립트 비용은 포함됐다. 광고를 차단하거나 제거하지 않았다.
- PSI 초기 로드와 실제 사용자 브라우저의 콜드/웜 캐시를 혼동하지 않는다. 별도의 캐시 초기화·웜 재진입·SPA 이동 실측은 미검증이다.
- CrUX 현장 데이터 없음. INP, 실사용자 75백분위 및 실제 CWV 통과 여부는 UNVERIFIED. TBT를 INP로 바꾸어 보고하지 않는다.

## 원자료 — 이번 버전만 사용

아래 M은 모바일, D는 데스크톱이다. 순서는 **성능 점수, FCP 초, LCP 초, TBT ms, CLS, Speed Index 초**다. 점수는 해당 URL·실행·기기에만 해당하며 사이트 전체 점수가 아니다. 모든 시각은 2026-10-15 KST다.

### 홈 — 3회

- 1회, 21:40대(초 단위 미수신): M 60 / 3.5 / 4.4 / 560 / 0 / 5.2. D 91 / 0.9 / 1.6 / 100 / 0.003 / 1.3. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com/nc96u0thl5?form_factor=mobile).
- 2회, 21:44:41: M 68 / 2.8 / 3.3 / 720 / 0 / 4.2. D 93 / 0.8 / 1.5 / 120 / 0 / 1.0. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com/4tbyyitx5z?form_factor=mobile).
- 3회, 21:47:19: M 79 / 3.3 / 4.0 / 150 / 0 / 3.3. D 84 / 0.7 / 1.4 / 280 / 0 / 1.0. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com/llqtwqqy94?form_factor=mobile).
- 관측 중앙값: M FCP 3.3초, LCP 4.0초, TBT 560ms, CLS 0, SI 4.2초. D FCP 0.8초, LCP 1.5초, TBT 120ms, CLS 0, SI 1.0초. 모바일 TBT 범위 150~720ms로 변동이 크다.

### HSR 비소 상세 — 3회

- URL: `/gallery/hsr/character/feixiao`.
- 1회, 21:41:39: M 49 / 2.7 / 10.5 / 470 / 0.174 / 4.4. D 64 / 0.7 / 2.0 / 430 / 0.130 / 1.8. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-hsr-character-feixiao/76lueyw3a9?form_factor=mobile).
- 2회, 21:44:43: M 58 / 3.3 / 9.9 / 140 / 0.174 / 4.0. D 82 / 0.9 / 2.1 / 100 / 0.130 / 1.5. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-hsr-character-feixiao/bc7q70gvsm?form_factor=mobile).
- 3회, 21:47:19: M 48 / 2.7 / 10.0 / 510 / 0.174 / 4.0. D 78 / 0.8 / 2.2 / 180 / 0.130 / 1.4. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-hsr-character-feixiao/kxid6zsqw9?form_factor=mobile).
- 관측 중앙값: M FCP 2.7초, LCP 10.0초, TBT 470ms, CLS 0.174, SI 4.0초. D FCP 0.8초, LCP 2.1초, TBT 180ms, CLS 0.130, SI 1.5초.

### 허브 — 각각 1회

- HSR, 21:40:46: M 55 / 3.0 / 8.1 / 260 / 0.174 / 4.5. D 76 / 0.8 / 1.7 / 260 / 0.130 / 1.8. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-hsr/epo57jr0ql?form_factor=mobile).
- WW, 21:40:47: M 59 / 3.3 / 9.1 / 80 / 0.174 / 4.4. D 80 / 0.9 / 1.9 / 160 / 0.130 / 1.7. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-ww/jb2pbv5t94?form_factor=mobile).
- NTE, 21:40:47: M 70 / 3.3 / 4.1 / 80 / 0.174 / 4.5. D 88 / 0.8 / 1.7 / 60 / 0.120 / 1.2. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-nte/ym80gobnev?form_factor=mobile).
- Aniimo, 21:40:48: M 57 / 2.8 / 8.9 / 260 / 0.174 / 3.5. D 87 / 1.0 / 1.7 / 150 / 0.065 / 1.3. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-aniimo/rsypn9s15s?form_factor=mobile).

### 추가 상세·가이드 — 각각 1회

- NTE 감정사 상세, 21:44:34: M 52 / 4.3 / 9.2 / 70 / 0.174 / 7.1. D 78 / 0.8 / 2.1 / 170 / 0.130 / 1.6. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-nte-character-%EA%B0%90%EC%A0%95%EC%82%AC/dwazh99jgd?form_factor=mobile). 첫 비인코딩 요청은 실패했고 URL 인코딩 후 성공했다. 실패 요청을 성능 표본으로 세지 않았다.
- WW 설지 상세, 21:45:13: M 51 / 3.4 / 9.8 / 320 / 0.174 / 4.7. D 40 / 0.8 / 2.9 / 1990 / 0.130 / 3.9. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-ww-character-baizhi/z2v1lxom0r?form_factor=mobile). 데스크톱 TBT 1990ms는 단일 관측이므로 재측정 없이 안정적인 분포로 일반화하지 않는다.
- HSR 비소 세팅 가이드, 21:45:13: M 47 / 2.8 / 3.3 / 1220 / 0.236 / 6.1. D 93 / 0.7 / 0.7 / 100 / 0.130 / 1.3. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-hsr-character-feixiao-guide/cuviubnipj?form_factor=mobile).
- WW 설지 세팅 가이드, 21:45:14: M 56 / 3.5 / 4.4 / 300 / 0.236 / 5.2. D 72 / 0.7 / 0.7 / 460 / 0.130 / 1.8. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-ww-character-baizhi-guide/nytdo8vbhw?form_factor=mobile).
- Aniimo 진화·형태 가이드, 21:45:14: M 71 / 3.3 / 4.2 / 20 / 0.174 / 3.5. D 86 / 0.9 / 1.7 / 110 / 0.130 / 1.3. [원본](https://pagespeed.web.dev/analysis/https-riragamehub-com-gallery-aniimo-guides-evolution-and-forms-guide/knoxus7ozo?form_factor=mobile).

## 발견 사항과 우선순위

### PERF-01 — 비홈 초기 전환에서 반복되는 레이아웃 이동

- 상태: FAIL / P2 / 실험실 재현 결함. 현장 CWV 실패를 확정한 것은 아니다.
- 비홈 표본의 모바일 CLS는 대부분 0.174다. HSR 상세는 독립 3회 모두 같은 값으로 재현했다. HSR·WW 가이드는 0.236이다.
- PSI 레이아웃 진단: 일반 비홈의 이동 요소는 footer. HSR·WW 가이드는 footer 0.174에 `div.flex.gap-8` 본문 0.062가 추가된다. 데스크톱 footer 기여는 HSR/WW/상세 0.130, NTE 허브 0.120, Aniimo 허브 0.065다.
- 홈은 모바일 3회 CLS 0, 데스크톱 0~0.003이었다. 홈의 안정성이 다른 경로에도 적용된 상태라고 볼 수 없다.
- 소스상 후보: router.tsx의 초기 readyKey 예외는 홈에만 적용된다. 비홈은 `min-h-[70vh]` PageFallback과 실제 콘텐츠가 Layout 내부에서 바뀌고 footer는 계속 존재한다. 진단과 일치하는 경로지만, footer는 이동한 요소이지 원인을 단독 증명하는 것은 아니다. trace/filmstrip으로 전환 순서를 더 확인해야 한다.
- 다음 조치: 비홈 직접 진입·공략 비동기 로드의 구조적 높이 변화를 먼저 안정화한다. 임의의 거대한 min-height, footer 숨김, 콘텐츠 삭제로 지표만 맞추지 않는다. 초기 HTML·탐색·다국어·오류 복구와 웜 이동을 함께 재검사한다.

### PERF-02 — 허브 LCP 배경 이미지의 요청·로딩 지연

- 상태: FAIL / P2 / 느린 실험실 LCP 관측. 원격 환경과 단일 실행의 한계를 함께 적용한다.
- HSR/WW 허브 모바일 LCP는 각각 8.1/9.1초였다. 실제 LCP 요소는 최근 캐릭터 카드가 아니라 `div.absolute.inset-0.bg-cover.bg-center`의 CDN CSS background다.
- 소스 대조: HSR Gallery.tsx:222는 애쉬베일, WW Gallery.tsx:193은 기염 그림을 backgroundImage로 지정한다. 최근 카드의 lazy 정책을 이 표본의 LCP 원인으로 지목한 가설은 맞지 않았다.
- 공유 진단 원자료: HSR 모바일 TTFB 10ms, 요청 지연 2420ms, 로딩 520ms, 렌더 지연 80ms. WW 모바일 10/1680/3130/90ms. 데스크톱 HSR 10/2410/80/310ms, WW 10/2080/2220/150ms. PSI는 fetchpriority=high 검토 항목을 표시했다.
- 진단 하위 시간의 합과 요약 LCP가 일치하지 않는다. 두 측정 방식·시뮬레이션 차이가 있으므로 합계로 LCP를 다시 계산하거나 원인별 기여율을 확정하지 않는다.
- 다음 조치: 실제 LCP 배경만 조기에 발견·요청하도록 하는 방안과 표시 크기에 맞는 이미지 후보를 검토한다. 모든 이미지를 high/eager로 바꾸지 않고, 전후 디자인·크롭·다국어·CLS를 보존하며 동일 표본을 다시 측정한다.

### PERF-03 — HSR/NTE 상세에 전체 데이터 정적 의존이 남음

- 상태: FAIL / P2 / 정책 대비 정적 구조 미달 확인. LCP 기여율은 UNVERIFIED.
- HSR CharacterDetail.tsx:35 → data/gameData.ts:1 → data/index.ts가 전체 캐릭터·광추·유물·장신구·공략·아이템을 가져온다. 상세는 getHsrGameData의 CHARACTER_DB에서 한 캐릭터를 찾는다. 현재 항목에 필요한 데이터만 로드한다는 PERFORMANCE.md 기준에 남은 개선 범위다.
- 현 commit 로컬 빌드에서 전체 HSR 캐릭터 chunk raw 789,156 / gzip 145,192 bytes, 광추 중심 chunk raw 647,674 / gzip 89,289 bytes, 전체 HSR 공략 chunk raw 275,357 / gzip 54,435 bytes를 확인했다. 개별 chunk 예산 내라도 상세 경로 전체가 가볍다는 보장은 아니다.
- NTE CharacterDetail.tsx:40은 전체 characterData를 가져오며, 해당 모듈은 generated/characters.json 전체를 참조한다. 원본 JSON raw 447,721 bytes, 로컬 minified 데이터 chunk raw 404,096 / gzip 59,977 bytes다.
- 이 값은 로컬 산출물/gzip 추정이지 운영 CDN의 실제 전송량·전체 요청 합계가 아니다. 해시 이름도 Windows와 Linux 빌드에서 달라질 수 있다.
- HSR 상세 모바일 LCP 관측 중앙값은 10.0초, NTE 상세 단일 관측 9.2초다. 이 수치 전부를 정적 DB 때문이라고 단정하지 않는다. HSR 실제 LCP는 비소 hero이며, 공유 진단의 모바일 요청 지연/로딩/렌더는 2060/60/340ms, 데스크톱 1770/50/300ms였다. 이 하위 수치도 요약 LCP와 단순 합산하지 않는다.
- 두 상세 hero에는 이미 fetchPriority=high가 있다. 성능 담당의 실제 CDN HEAD는 비소 art01.webp 200 image/webp, Content-Length 139,198 bytes; 감정사_f.webp 200 image/webp, 337,230 bytes였다. HEAD 길이를 PSI 전송량이나 로딩 시간으로 바꾸지 않는다.
- 다음 조치: WW 방식처럼 필요한 캐릭터 payload와 목록용 summary를 분리하고, 기존 다국어·관련 캐릭터·아이템·스킨·공략 연결을 보존한 뒤 경로 전체 요청/실행 비용을 재측정한다.

### PERF-04 — 실행 비용 변동과 서드파티 비용

- 상태: UNVERIFIED / P2 조사 후보. 단일 느린 결과만으로 사이트 전체 실행 비용을 확정하지 않는다.
- 홈 모바일 TBT는 150~720ms, HSR 가이드 단일 TBT 1220ms, WW 상세 데스크톱 단일 TBT 1990ms다. 우선 동일 조건 반복과 긴 작업의 스크립트 귀속이 필요하다.
- 홈 공유 진단: Inter 관련 전송 약 50KiB(폰트 48KiB+CSS 1KiB), Ads 약 265KiB/CPU 264ms, Funding 약 103KiB/CPU 84ms. CPU 시간의 합을 TBT 기여량으로 간주하지 않는다. 이전 폰트 결과를 섞어 절감률을 만들지 않는다.
- 소스에는 HSR/WW/NTE 상세가 공유/다운로드 클릭에서 쓰는 html-to-image를 정적 import하는 잔여 후보도 있다. 클릭 시 import 전환의 실제 절감량은 아직 측정하지 않았다.
- 다음 조치: first-party 긴 작업과 광고/동의 스크립트를 구분한 profile을 확보한다. 광고·동의·로깅·인증·CSP를 제거하거나 완화해 점수만 높이는 변경은 하지 않는다.

## 제한된 범위에서 확인한 양호 항목

- PASS: 이번 홈 모바일 3회 CLS 0, 데스크톱 0~0.003. 홈 표본에 한정된 레이아웃 안정성이다.
- PASS: 성능 담당의 운영 홈 GET은 HTTP 200, 초기 prerender 본문 존재, AdSense loader 1개, Inter 비차단 폰트 요청만 확인했다. HTML Cache-Control은 must-revalidate, no-cache였다. 스크립트 실행 후 전체 DOM·광고 렌더는 이 GET으로 검증한 것이 아니다.
- PASS, 공용 실행 근거: 주 담당이 현 commit에서 TypeScript, 테스트 298개, production build, SEO 890 경로, 성능 예산을 재실행해 통과했다. 성능 담당이 같은 명령을 중복 실행한 것으로 기록하지 않는다.
- 예산 최댓값 bytes: entry gzip 24,159 / 32,000; 초기 JS gzip 138,713 / 170,000; CSS gzip 26,898 / 34,000; 개별 chunk gzip 206,387 / 250,000; summary raw 17,590 / 24,000; article raw 14,643 / 24,000; guide raw 31,460 / 40,000; labels raw 20,536 / 28,000; WW 작은 이미지 raw 28,150 / 40,000; 큰 이미지 raw 85,884 / 110,000.
- 이 예산 PASS는 동적 경로 전체 비용·LCP·CLS·INP 통과를 보증하지 않는다. tests/e2e 역시 브라우저 성능 실측을 대체하지 않는다.

## 미검증과 다음 평가 조건

- 최소 대표 표본 중 Aniimo 탄멍멍 상세, NTE 감정사 세팅 가이드는 PSI 미측정이다. 별도 캐릭터 목록 query·가이드 목록·상성표·티어표·파티 추천 및 다른 캐릭터/언어/인증 조합도 성능 전체 합격 범위가 아니다.
- 홈·HSR 상세 외의 독립 3회, 완전 동일 CPU 조건의 전후 비교, 웜 재진입/SPA 이동, 실제 상호작용 INP, CrUX는 미검증이다. 전체 matrix를 완료한 것으로 보고하지 않는다.
- 성능 담당 브라우저 연결 제한 때문에 초기 HTML→앱→footer filmstrip, 긴 작업 trace, 캐시 초기화, 실패 주입·재시도·이전 응답 경합을 독자적으로 조작 검증하지 못했다.
- c24f68d 또는 cc12ea4의 이전 점수를 최신 성능으로 재사용하지 않았다. 이번 실측과 동일한 통제 조건의 변경 전 baseline이 없으므로 성능 개선율도 확정하지 않는다.

## 독립 최종 판정과 교차 검토 요청

판정: **전체 성능 PASS 불가. 자동 회귀/용량 예산은 PASS지만, 비홈 CLS와 상세·허브 LCP에 P2 개선 항목이 확인됐고 필수 실측 범위가 일부 UNVERIFIED다.** 측정한 범위에서 성능 관련 P0/P1 전면 장애는 확인하지 못했으며, 이는 보안·디자인 판정을 대신하지 않는다.

우선순위는 비홈/가이드 레이아웃 이동 안정화 → 실제 허브 LCP 배경의 발견·전송 최적화 → HSR/NTE 상세 데이터 분리 → 긴 작업·서드파티 비용 재현 순이다. 관련 경로의 독립 재측정과 다른 두 분야 영향 검사가 필요하다.

성능 → 디자인 교차 검토: [디자인 독립 보고서](2026-10-15-review-6d451bf-design.md)를 판정 후 확인했다. 소스 변경이나 콘텐츠·광고 숨김으로 점수를 높인 작업은 없으며, 공용 브라우저의 viewport 설정이 실제 DOM 1272×720에 반영되지 않아 모바일·요청 해상도 검사가 UNVERIFIED라는 한계도 정확히 표시했다. 이는 원격 PSI 모바일 에뮬레이션 결과를 무효로 만드는 문제는 아니지만, PSI를 실제 모바일 디자인·터치·탐색 검사의 대체 증거로 사용하면 안 된다. 향후 개선에서도 기존 그림·크롭·여백·탐색·접근성 및 광고/동의 기능을 보존해야 한다.

Notion 동기화·프로젝트 구현 변경·commit/push·Cloudflare 재배포는 이 평가에서 실행하지 않았다. 원자료는 위 공개 PSI 보고서 링크와 공용 수집 기록이며, 민감한 계정·쿠키·secret은 포함하지 않았다.
