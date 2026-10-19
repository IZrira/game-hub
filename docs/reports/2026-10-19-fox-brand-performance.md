# 여우 브랜드 이미지 변경 — 제한 범위 독립 성능 검토

## 공통 실행 정보

- 실행 ID: fox-brand-performance-20261019 / 프로토콜 1.0.
- 독립 담당: `/root/brand_performance`. 다른 분야 보고서를 읽기 전에 2026-10-19 14:47 KST에 1차 결론 고정.
- 대상: `main`, HEAD `68f6056` 위 작업 중 브랜드 변경. AGENTS.md 및 기존 보고서 변경은 제외.
- 원본: AGENTS.md, docs/guides/THREE_ENGINEER_REVIEW.md, docs/templates/three-engineer-review.md, docs/guides/PERFORMANCE.md, 변경 diff와 로컬 이미지.
- 환경: Windows / Node v24.19.0 / sharp 0.35.5. 브라우저·viewport·네트워크·광고·로그인 상태는 이번 정적 검사에 해당하지 않는다.
- 범위: Navbar/LoginModal, SEO 기본 이미지, 초기 HTML 아이콘, manifest, prerender/sitemap 브랜드 기본 이미지, 이미지 5종. 운영 배포 commit은 미확인.
- 사용자 요청: 프로필과 같은 여우 대표 이미지 적용. Notion 동기화 불허, 실행 안 함.

## 검사 방법과 증거

`git status --short`, HEAD/branch, 범위별 `git diff`, `git cat-file -s HEAD:<image>`, Node fs.statSync 및 sharp.metadata로 검사했다. 이미지 바이트는 압축 전송량 추정이 아닌 디스크 파일 크기다.

| 이미지 | 치수 | 이전 bytes | 현재 bytes |
|---|---|---:|---:|
| assets/brand/rira-fox.webp | 768×768 | 신규 | 75,420 |
| assets/brand/rira-fox-icon.webp | 96×96 | 신규 | 3,528 |
| logo192.png | 192×192 | 49,014 | 65,022 |
| logo512.png | 512×512 | 310,900 | 401,840 |
| apple-touch-icon.png | 180×180 | 43,328 | 58,064 |
| favicon.ico | ICO 컨테이너, 치수는 이번 검사 미측정 | 13,417 | 20,274 |

## 독립 판정

- PERF-01 PASS: Navbar의 기존 36/40px 고정 박스, shrink-0, 이미지 width/height 40을 유지한다. LoginModal도 기존 64px 박스와 width/height 64를 유지한다. 소스상 이미지 로드로 새 공간이 확장되는 변경은 없다. 실제 CLS 수치는 미측정이다.
- PERF-02 PASS: 새 외부 JS, 데이터 의존, 동기화, 폰트, 광고 정책 변경이 없다. 기존 Navbar Gamepad2는 다른 위치에서 여전히 사용하므로 SVG 라이브러리 제거로 JS 용량이 준다고 주장하지 않는다.
- PERF-03 PASS: rira-fox.webp는 SEO 메타 및 sitemap 기본 이미지 경로다. 메타 URL 기재만으로 일반 브라우저가 본문 이미지처럼 내려받는 것은 아니다. 전역 헤더 비용과 OG 파일 비용을 합산하지 않는다.
- PERF-04 PASS / P3 후보 해소: 1차 검토에서는 헤더가 65,022-byte logo192.png를 요청했다. 후속 diff와 sharp/fs 재검사에서 Navbar·LoginModal 모두 새 96×96 rira-fox-icon.webp(3,528 bytes)를 공유하는 것으로 확인했다. 이전 구현의 65,022-byte 후보 대비 61,494 bytes 감소이며 페이지 가속률을 뜻하지 않는다. 고정 박스와 alt를 유지한다. favicon/PWA PNG는 별도로 유지해 앱 설치 이미지 품질을 보존한다. 작은 크기 시각 품질은 디자인 담당 확인 대상이다.
- PERF-05 UNVERIFIED: TypeScript, production build, SEO/perf budget는 주 작업 담당이 별도로 실행 중이며 이 독립 보고서에서 통과를 대리 선언하지 않는다.
- PERF-06 UNVERIFIED: FCP/LCP/CLS/TBT, INP, 전송량·요청 수, cold/warm/SPA, 모바일·데스크톱 3회 독립 실측, 운영 캐시 정책. 이번 변경 범위 소스·파일 검사에서는 수행하지 않았다. 실제 CWV 또는 사이트 전체 성능 통과 아님.
- N/A: 전체 데이터 선택 로딩 및 공략 원문 변경 검증. 해당 구현은 이번 브랜드 변경에 없다.

확정 P0/P1 또는 명시 예산 FAIL은 발견하지 않았다. 소스와 이미지 파일에 한정한 검토 결과이며, 실측 미검증을 유지한다. 구현 변경·Notion·commit·push·배포는 이 검토자가 실행하지 않았다.

## 교차 검토

- 성능 → 디자인: 기존 헤더/로그인 박스 크기와 콘텐츠·광고를 유지하며 브랜드 이미지만 바뀐다. 실제 크롭과 작은 크기 식별성은 디자인 담당의 브라우저 검사 대상으로 전달했다.
- 독립 결론 고정 후 보안 보고서를 읽고 교차 확인: 고정 동일 출처 WebP로 최적화했으며 인증 코드·CSP·캐시 보호 정책 완화가 없다. 보안 보고서 S1–S4와 소스 diff가 일치한다. 이견 없음. 타입/빌드·운영·CWV 결론은 주 작업 담당이 별도로 취합한다.
