# 디자인·UX 독립 평가 — 운영 모바일 파티 여정 FAIL

## 실행 정보와 독립 판정

- 실행 ID: 2026-10-16-a7e6c0a-eval-design / 프로토콜 1.0.
- 담당: 별도 에이전트 `/root/eval_design_1016`. 다른 담당 보고서 열람 전에 P1 모바일 파티 잘림 및 P2 검색 접근성 결론을 주 담당에게 고정 전달했다. 교차 열람은 그 뒤 주 담당의 요청으로만 수행했다.
- 일시: 2026-10-16 17:34–17:39 KST. 대상 HEAD `a7e6c0ae42ec19d230c0ae233762a599638b37e7`, main, 공개 `https://riragamehub.com`.
- 작업 시작 git status 확인: 기존 dirty 25개(수정 9, 미추적 16) 보존. 이 보고서 외 수정 없음. 운영 commit 동일성은 주 담당 확인에 의존하며 브라우저만으로 hash를 증명하지 않는다.
- 기준 완독: AGENTS.md, THREE_ENGINEER_REVIEW.md, 보고서 양식, DESIGN.md, ux-principles.md. 첫 일괄 출력에서 잘린 실행 가이드는 별도 전체 재독했다. 과거 평가 보고서 미열람.
- Windows / Codex in-app browser iab id2, 임시 tab1. 브라우저 정확한 엔진 버전은 도구에서 수집하지 못했다. 한국어, 공개 로그아웃 화면, 별도 인증·동의 조작 없음. 광고 fill·캐시 초기화·CPU/network 조건 미통제.
- 실제 viewport: 390×844, 1440×900, NTE parties 추가 320×844. 종료 전 viewport reset 완료.
- 전체 평가 요청 중 실제 대표 화면 표본 검사다. 아래 미검증을 포함하므로 전체 UX 통과를 선언하지 않는다. **독립 최종 판정 FAIL: 운영 NTE 추천 파티의 모바일 핵심 여정 차단(P1).**

## 실제 검사와 원자료

원자료는 이 에이전트의 `cua_repl` 도구 출력에 보존된 스크린샷·DOM snapshot·read-only DOM 결과다. 별도 PNG/HAR 파일을 저장하지 않았다. initial loading 관찰 후 DOM snapshot과 실제 본문을 다시 확인하고 메타데이터를 읽었다. 소스만으로 화면·console PASS를 부여하지 않았다.

| 표본 | 실제 시각 검사 | 렌더 후 h1 / 경계 등 원값 |
|---|---|---|
| `/gallery/aniimo/characters` | 390 첫 화면·검색필터, 초기 기본 크기 DOM | ANIIMO ARCHIVE, 전체86종 → 검색 무결과0종 |
| `/gallery/hsr/character/feixiao` | 390 히어로 | 비소 x49–106 |
| `/gallery/ww/character/baizhi` | 390 히어로 | 설지 x49–106, 응결 아이콘 로드 실패 |
| `/gallery/nte/character/감정사` | 390 히어로·기본 스탯으로 이동 | 감정사 x49–134.5, 스탯 섹션 실제 표시 |
| `/gallery/aniimo/character/탄멍멍` | 390·1440 히어로 | 탄멍멍 모바일 x45–147.61 |
| `/gallery/hsr/character/feixiao/guide` | 390 첫 화면·추천 세팅 상단 | 비소 공략 x133–291.03 |
| `/gallery/ww/character/baizhi/guide` | 390 첫 화면·세팅 선택 | 설지 공략 x133–302.81 |
| `/gallery/nte/guides/감정사-build-guide` | 390 첫 화면·세팅 선택 | 감정사 공략 x133–300.52 |
| `/gallery/aniimo/guides/evolution-and-forms-guide` | 390 첫 화면·본문 상단·공통 모바일 메뉴 | 긴 한글 h1 x45–337, 줄바꿈 확인 |
| `/gallery/nte/parties` | 390·320·1440 첫 화면 | 모바일 전체 본문 가림, 아래 D01 |
| `/gallery/hsr` | 1440 첫 화면 | HSR Archive x369–1351 |
| `/gallery/ww` | 1440 첫 화면 | Resonance Archive x369–1351 |
| `/gallery/nte` | 1440 첫 화면 | Neverness to Everness x369–1351 |

13개 고유 경로를 실제 관찰했다. 고정 목록 전체·모든 경로×viewport 조합을 완료한 것이 아니다. 스크린샷 없는 DOM 초기 목록 관찰과 실제 screenshot 표본을 혼동하지 않는다.

### 제한 범위 PASS

- D-P01: 위 네 허브의 캐릭터 상세 모바일 대표 이미지·캐릭터명 및 세 공략의 세팅 상단은 실제 화면에서 읽을 수 있었다. 정보·수치가 원본과 정확히 같은지는 별도 항목 대조를 수행하지 않아 미검증이다.
- D-P02: NTE 감정사 기본 스탯 sticky 버튼 클릭으로 해당 섹션 이동, 숫자·슬라이더·2열 치명 항목의 모바일 배치 확인. 전체 sticky 메뉴·장비 하단 검사로 확대하지 않는다.
- D-P03: Aniimo 목록 입력 `zzzz-no-result` → 0종, 한국어 빈 상태 DOM 확인. `탄멍멍`으로 입력 교체도 수행했다. 전체 속성/지역 조합·비교 기능을 통과시킨 것은 아니다.
- D-P04: 모바일 Toggle Navigation Menu 열기 후 통합 검색/홈/로그인 항목 표시, 닫기 확인. 로그인 실행 없음.
- D-P05: 검색 초기 autofocus, 인기 키워드 표시, Escape 닫기는 작동했다. 닫기 후 복귀 실패는 별도 D02다.

## 발견 사항

### D01 / NTE 추천 파티 모바일 본문 전체가 화면 밖 — P1 / FAIL, 운영 확정

- URL: `/gallery/nte/parties`, 한국어 로그아웃, 390×844와 320×844.
- 재현: 직접 진입 → loading 이후 DOM에 파티 제목·카드가 존재함 확인 → screenshot과 h1 경계 확인.
- 기대: 메뉴 다음 파티 제목·검색·추천 카드가 모바일 읽기 순서로 나타난다.
- 실제: 상단 공통 헤더와 가로 메뉴만 보이고 아래가 빈 검정 화면이다. h1 x=398..618.20(390 viewport), x=328..548.20(320 viewport). 본문 시작이 viewport 우측 밖이다. document scrollWidth는 각382/312로 오히려 작아 scrollWidth만으로는 결함을 놓친다.
- 1440×900 대조에서는 h1 x231.84..907.69와 파티 카드가 실제 표시된다. 따라서 단순 요청 실패·loading을 빈 화면으로 오인한 것이 아니다.
- 기준: DESIGN.md 반응형·정보 접근. [WCAG 2.2 SC1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)의 320 CSS px에서 정보·기능 보존 기준과 대조한 수동 screenshot+DOM 경계 검사. 전체 WCAG 평가가 아니다.
- HEAD `nte-hub/pages/PartyRecommendations.tsx:224`의 루트는 `flex` 가로 배치이며 sidebar 다음 본문이 이어진다. **기존 dirty 변경에 이미 `flex-col lg:flex-row` 보강이 있으나 미배포다.** 이번 평가가 그 수정의 검증·배포 승인이 되는 것은 아니다.
- 다음: 기존 수정 범위의 타입/빌드 및 320·390·768·1440 실제 재검사 후 운영 확인. 중복 수정하지 않는다.

### D02 / 통합 검색 모달의 의미·포커스 복귀 부족 — P2 / FAIL, 일부 운영 확정

- URL: Aniimo characters 390. Search 클릭 → 지연 모달 렌더 → 검색 input autofocus → Close search에서 Escape.
- 실제 read-only DOM: `[role=dialog]` 수0, 검색 input에 label/aria-label 없음, 닫은 뒤 activeElement BODY/aria-label null. 검색 시작 버튼으로 포커스가 돌아오지 않는다.
- 소스 `SearchModal.tsx:154–209`, `:602` 및 `GlobalSearch.tsx`에서 Escape·화살표 이동은 있으나 dialog semantics·Tab 포커스 한정·trigger 복귀 구현은 확인되지 않는다. 실제 전체 Tab 순환 탈출은 실행하지 않아 **trap 동작 부재는 정적 위험**으로 구분한다. Close search에서 Tab을 눌러 첫 인기 키워드로 이동한 것만 직접 관찰했다.
- 기대: 이름이 있는 검색 입력과 대화상자, 닫기 후 시작 위치 복귀. W3C [Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)의 이름·포커스 한정·복귀 지침과 대조했다. APG 권고와 WCAG 전체 적합 판정은 구분한다. 자동 axe/스크린리더 검사는 미실행.
- 다음: 기존 디자인을 유지하며 의미/포커스 처리 보강 후 Ctrl/Cmd+K·Tab/Shift+Tab·Escape·trigger 복귀 수동 재검사.

### D03 / WW 설지 상세의 속성 아이콘 로드 실패 — P2 / FAIL, 로드 실패 확정

- URL: `/gallery/ww/character/baizhi`, 표시 이름 설지, 390.
- DOM 원값: `complete=true`, `naturalWidth=0`, alt 빈값인 이미지가 `ww%20images/common/position/%EC%9D%91%EA%B2%B0.webp`를 요청한다. 히어로의 `증폭기 | 응결` 텍스트는 보존되어 핵심 캐릭터 진입은 가능하다.
- `ww-hub/pages/CharacterDetail.tsx:274,675`에서 attribute를 position 디렉터리에 조합한다. 해당 img에 onError가 없다. 올바른 이미지 원본과 대조하지 않았으므로 특정 대체 경로를 정답이라고 확정하지 않는다.
- 다음: 공식 에셋 경로와 대조 후 해당 아이콘 및 공통 fallback 확인. CSS로 가려 로드 실패를 무시하지 않는다.

### D04 / 렌더 전후 SEO head 중복 및 NTE canonical 불일치 — P2 / FAIL, 운영 DOM 확정

- 네 상세, 네 공략, HSR/WW/NTE 허브, NTE parties에서 렌더 완료 후 title2·description2·canonical2를 관측했다. 검색 목록 initial 상태와 혼동하지 않는다.
- 상세 canonical 두 값: HSR feixiao·WW baizhi·Aniimo 탄멍멍은 동일 URL 중복이다. NTE 감정사는 name 경로와 `/gallery/nte/character/3b895fae-3dc7-8079-b2b2-f06408a2e0c5`가 공존한다.
- NTE parties는 `/gallery/nte/parties`와 `https://riragamehub.com/`가 공존한다. 감정사 initial loading 중에는 head 각1개였고 실제 본문 생성 후 각2개가 되어 초기 HTML→앱 전환에서의 중복을 직접 확인했다.
- 실제 검색엔진 색인/순위 영향은 미검증이다. dirty SEO 개선과 parties url 보강이 이미 존재하며 이번 검토에서는 미배포 운영 현상과 분리했다.
- 다음: 기존 head handoff 수정 검증 후 운영 DOM과 raw HTML을 함께 재확인.

### D05 / Aniimo 빈 목록에 다음 행동 부족 — P3 / FAIL, 운영·소스 확정

- `zzzz-no-result` 검색 시 한국어로 조건 불일치·0종을 표시하지만 빈 결과 영역에 초기화/다른 메뉴 이동 등 복구 행동이 없다. 검색 입력을 직접 고치면 복구 가능하므로 P1/P2로 과장하지 않는다.
- `aniimo-hub/pages/Gallery.tsx:177`은 메시지만 출력한다. DESIGN.md Empty 지침과 상태 체크리스트의 다음 행동 제공 기준에 미달한다.
- 같은 카드 img(:171)에 onError가 없는 것은 별도 정적 위험 후보다. 이번 표본에서 Aniimo 이미지 실패를 실제 재현한 것이 아니므로 로드 실패 확정 건수에 더하지 않는다.

## 미검증·N/A

- `/`, `/about`, `/privacy`, `/contact` 실제 화면, 각 가이드 목록·NTE 전투 가이드·Aniimo type-chart·HSR/WW 티어/파티 및 각 허브 모든 메뉴 여정은 미검증이다. HTTP 접근 결과로 대신 통과시키지 않는다.
- 768×1024, 200% 확대, 영문/일문 긴 이름, reduced-motion, 완전한 키보드·스크린리더·자동 접근성·대비 계측은 미검증.
- 페이지 전체 긴 스크롤·푸터·모든 지연 이미지·장비 링크·이미지/스킨 전환·뒤로가기·강제 실패/재시도는 미완료. 이미지 naturalWidth0이 없는 표본도 아직 로드하지 않은 이미지의 성공 증거가 아니다.
- 현재 NTE 허브에서 실제 `dev.logs(error,warn,limit30)` 결과 `[]`였다. 현재 도구 수집 범위의 관찰일 뿐 모든 경로 console0 또는 광고/CSP 호환 PASS가 아니다.
- 로그인·관리자·댓글/신고·서버 저장 성공·A/B 계정 권한은 미검증. 운영 데이터 쓰기와 실패 주입은 실행하지 않았다.
- N/A: 이번 평가에서 코드 변경·Notion 동기화·운영 쓰기·배포. 전체 통과를 막는 표본 공백은 N/A로 숨기지 않는다.

## 교차 검토 — 독립 결론 고정 후

- 성능 보고서 열람: 공개 14경로 HTTP200/article 존재와 초기 자산 예산 PASS는 화면 콘텐츠 보존·광고 실제 표시 증거가 아니다. NTE parties의 DOM 콘텐츠는 존재해도 모바일에서 완전히 가려졌으므로 성능 표본 PASS와 D01 FAIL은 충돌하지 않는다. 이번 에이전트 및 성능 담당이 콘텐츠/광고/이미지를 숨기는 수정은 하지 않았다. 광고 fill·전체 콘텐츠 보존은 여전히 미검증이다.
- 디자인→보안: 보안 보고서의 SEC-04 관리자 배지 데이터 신뢰 위험은 사용자 권한 인식에 영향을 줄 수 있다. 실제 로그인/관리자/신고 화면·쓰기·권한 검증을 하지 않았으므로 민감정보가 없거나 권한이 안전하다고 통과시킬 수 없다. 공개 헤더의 로그인 버튼 관찰만 수행했다. 이 범위를 보안 담당에게 전달했다.
- 독립 P1/P2 판정을 타 분야 결과로 상쇄하지 않았다. 권한 우회나 운영 침해를 실제 재현한 것으로 표현하지 않는다.

## 변경·완료 기록

- 변경: 신규 보고서 이 파일만. 기존 코드·데이터·설정·25개 dirty 변경 보존.
- Notion 실행 없음. typecheck/build/테스트 미실행: 읽기 전용 평가 및 문서 작성 범위이며 기존 dirty 검증을 운영 코드 검증으로 계산하지 않는다.
- 문서 재독 및 실제 증거·추정·미검증 대조 완료. 문서 whitespace diff 검사 결과는 주 담당에게 전달한다.
- commit message/hash 없음, commit/push/Cloudflare 배포 실행 없음. 평가 대상 commit hash와 신규 commit을 혼동하지 않는다.
- 사용자용 결론: 대표 모바일 상세·세팅은 읽을 수 있으나 **현재 운영 NTE 파티 화면은 모바일에서 사용할 수 없어 전체 통과 불가**다. 기존 미배포 수정과 SEO 보강을 검증·배포한 뒤 해당 경로를 다시 확인해야 한다.
