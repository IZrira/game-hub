> **문서 용도**: 2026-11-10 디자인 평가(`docs/reports/2026-11-10-design-review-uiux.md`)의 문제 1~6을 어떻게 고칠지 정한 계획이다. 이 문서만 작성했고 코드는 아직 바꾸지 않았다. 작업 절차·검증·Git 처리는 `AGENTS.md`, 디자인 기준은 `DESIGN.md`를 따른다.

# 디자인 문제 1~6 수정 계획

- 작성일: 2026-11-10
- 근거: 디자인 평가 보고서(8개 화면 × 데스크톱·모바일 측정)
- 진행 상태 표기: `[ ]` 대기, `[~]` 진행 중, `[x]` 완료(commit hash 기록), `[?]` 사용자 결정 대기

## 0. 평가 보고서 정정

계획을 세우려고 코드를 다시 보다가 보고서의 두 군데가 틀린 것을 확인했다. 보고서에도 같은 정정을 적는다.

- 캐릭터 상세 "세팅 공략" 버튼의 대비 2.04는 측정 오류다. 흰 글자에 `theme.primary`(#7E30E1) 배경이라 실제 대비는 약 6.5:1로 기준을 넘는다. 측정 시점에 등장 애니메이션의 투명도가 반영된 것으로 본다. 다만 글자가 10px이라 문제 1(작은 글자)에는 해당한다.
- "게임 통합 데이터베이스" 문구는 헤더가 아니라 푸터(`common-hub/components/Footer.tsx:30`)에 있다. 모든 화면에 보이는 것은 같다.

## 1. 원칙

- `DESIGN.md`가 우선이다. 새 색상·테마는 만들지 않고, 기존 강조색의 "글자용 밝은 단계"만 추가한다.
- 화면 구조·배치·콘텐츠·추천 순서는 바꾸지 않는다. 크기·색·간격 값만 고친다.
- 공통 컴포넌트(헤더, 푸터, 빵부스러기, 카드)를 먼저 고친다. 그다음 화면 단위로 나눠 적용한다. 529개 클래스를 한 번에 바꾸지 않는다.
- 모든 단계는 같은 측정 스크립트로 전후를 비교하고, 데스크톱·모바일 캡처를 직접 본다.
- 배포는 작업 2~3개를 묶어 push한다(`docs/reports/2026-11-09-deploy-frequency.md`, Soft 404 수정 확인 기간).

## 2. 사용자 결정이 필요한 항목

결정 전에는 해당 작업을 시작하지 않는다.

- [x] D1. 최소 글자 크기 (2026-11-10 결정: 읽는 글 모바일 16px, 나머지는 추천안 — 정보 12px·보조 11px. 읽는 글은 데스크톱도 16px로 통일)
  - 제안 A(추천): 정보 글자는 최소 12px, 배지·단축키 같은 보조 표시만 11px 허용. 모바일 본문 단락은 15px·줄 간격 1.6.
  - 제안 B: 정보 글자 최소 11px, 모바일 본문 14px. 기존 화면 밀도를 더 지킨다.
- [x] D2. 한글 웹글꼴 (2026-11-10 결정: Pretendard 도입)
  - 제안 A(추천): Pretendard(오픈 라이선스 OFL, npm `pretendard` 1.3.9)를 저장소에 넣어 자체 제공한다. 필요한 글자 구간만 내려받는 분할 파일이라 화면당 수십 KB 수준이다. 외부 주소가 아니라서 보안 정책(CSP) 변경이 없다. 윈도우·맥·안드로이드에서 같은 모양이 되고, 굵기 900도 실제 글꼴로 나온다.
  - 제안 B: 시스템 글꼴을 유지하고 Inter의 900 굵기만 추가로 불러온다. 다운로드는 늘지 않지만 기기별 차이는 그대로다.

## 3. 측정 도구 (모든 작업의 전제)

- [x] T0. UI 측정 스크립트를 저장소에 넣는다 (2026-11-10)
  - 파일: `scripts/audit-ui.mjs`(헤드리스 Chrome 조작), `scripts/lib/ui-audit-page.js`(화면 안에서 실행하는 측정 코드). 평가 때 쓴 스크립트를 옮긴다.
  - 실행: `npm run ui:audit -- <URL...>`. 결과는 화면별 JSON과 캡처를 `.tmp/ui-audit/`(Git 제외)에 저장한다.
  - 측정 항목: 대비 미달 수, 12px 미만 글자 수, 24px 미만 조작 요소 수, 이름 없는 링크·버튼 수, 제목 단계 건너뜀, 가로 넘침. 키보드 포커스는 실제 Tab 입력으로 확인한다.
  - 대비 계산에서 투명도 애니메이션 중인 요소는 제외한다(0장의 오류 재발 방지). 렌더링 뒤 애니메이션이 끝날 때까지 기다린다.
  - 기준값: 평가 보고서의 8개 화면 수치를 첫 실행 결과로 다시 저장한다.

## 4. 작업

### T1. 보라색 작은 글자 대비 (문제 2) — [?] 2026-11-10 사용자 요청으로 색상 시안 확인 대기(추천 A `#A879F0`, B `#B794F6`)

- 원인: `--color-brand-primary`(#7E30E1)를 글자색으로 쓰면 어두운 배경에서 3.0~3.2:1이다. `text-brand-primary`가 48개 파일에 105번 쓰인다.
- 변경
  - `common-hub/index.css`의 `@theme`에 글자용 토큰 `--color-brand-primary-text: #A879F0`을 추가한다. #0a0a0a 배경 6.28:1, #121212 배경 5.94:1(계산 확인함).
  - 글자색으로 쓰인 `text-brand-primary`를 `text-brand-primary-text`로 바꾼다. 배경·테두리·버튼의 `bg-brand-primary`는 그대로 둔다.
  - HSR 화면이 인라인으로 `theme.primary`를 글자색에 쓰는 곳(성혼 번호 "E01~E06" 등)은 새 함수 `readableTextColor(hex: string, background?: string, minRatio?: number): string`을 거친다. 위치는 `common-hub/utils/colorContrast.ts`. 대비가 모자라면 흰색 쪽으로 조금씩 섞어 기준(기본 4.5)을 넘는 첫 색을 돌려준다. 기본 배경은 `#121212`다.
  - 푸터 "게임 통합 데이터베이스"(10px, 자간 0.16em)는 새 토큰으로 바꾸고 12px로 올린다. 자간은 문제 5에서 함께 정리한다.
- 테스트: `tests/color-contrast.test.ts`
  - `readableTextColor('#7E30E1')`의 결과가 #121212 대비 4.5 이상이다.
  - 이미 충분한 색(#FFFFFF, #EAB308)은 그대로 돌려준다.
  - 잘못된 값('', 'red')은 입력을 그대로 돌려주고 오류를 내지 않는다.
- 확인: 8개 화면 측정에서 보라색 글자 대비 미달 0.

### T2. 티어 등급 글자 (문제 3) — [?] 사용자 요청: 등급마다 다른 색. 시안(OP #FF6B6B, SS #FFA94D, S+ #38D9A9, S #4DABF7, A #DEE2E6, B #B197FC, C #91A7FF, D #E8A87C, E #F783AC, F #ADB5BD, 모두 대비 6 이상) 확인 대기. 기울임 제거는 T5에서 적용함

- 원인: HSR·WW 티어표가 등급 색(`TIER_COLORS`, 데이터의 `group.color`)을 그대로 글자색으로 쓴다. D(#485460)·E(#2d3436)·F(#1e272e)·B(#5F27CD)가 어두운 배경에서 1.2~2.3:1이다.
- 변경
  - `hsr-hub/pages/TierList.tsx:471`, `ww-hub/pages/TierList.tsx:355`의 등급 글자색을 `readableTextColor(group.color)`로 바꾼다(T1의 함수). 등급 칸 배경(`${group.color}10`)과 데이터의 색 값은 그대로 둔다.
  - 같은 줄의 `italic`을 지운다(문제 5).
  - 관리자 화면(`AdminDashboard.tsx:697`)은 바꾸지 않는다.
- 테스트: 기존 `tests/hsr-tierlist-render.test.tsx`에 등급 D·E·F 글자색이 #121212 대비 4.5 이상인지 확인하는 검사를 추가한다. WW도 같은 방식.
- 확인: WW·HSR 티어표 데스크톱·모바일 캡처에서 OP~F가 모두 읽힌다.

### T3. 터치 크기 (문제 4) — [x] 2026-11-10

- 변경
  - 빵부스러기(`common-hub/components/PageHeader.tsx:79-102`): 각 링크를 `inline-flex min-h-6 items-center px-1`로 감싸 24px 이상 클릭 영역을 준다. 글자 크기는 T4 기준을 따른다. `uppercase tracking-widest`는 지운다(문제 5).
  - 레벨·돌파 슬라이더(`hsr-hub/pages/CharacterDetail.tsx:779`, `ww-hub/pages/CharacterDetail.tsx:729`, `hsr-hub/pages/LightConeDetail.tsx:252·284`, `ww-hub/pages/WuwaWeaponDetail.tsx:581`): 입력 높이를 24px(`h-6`)로 늘리고, 보이는 막대는 지금처럼 4px로 그린다. 공통 CSS 클래스 `.range-slider`를 `common-hub/index.css`에 두고 다섯 곳이 함께 쓴다(같은 스타일 복제 금지).
  - 애니모 서식지(`aniimo-hub/pages/LocationDetail.tsx`): "원소 상성표 전체 보기" 링크와 기본·고유 칩에 `min-h-6`·세로 패딩을 준다. 칩 사이 간격은 8px 이상.
- 테스트: `tests/page-header-breadcrumb.test.tsx`(새 파일)에서 빵부스러기 링크에 `min-h-6` 클래스가 있는지 확인한다. 실제 크기는 T0 측정으로 확인한다.
- 확인: 8개 화면에서 24px 미만 조작 요소가 문장 속 링크를 빼고 0. 애니모 서식지 33개 → 0.

### T4. 작은 글자 (문제 1) — [x] 2026-11-10

- 규모: `text-[9px]` 105번(32개 파일), `text-[10px]` 277번(69개 파일), `text-[11px]` 120번(52개 파일).
- 변경 방법(D1 제안 A 기준)
  - `DESIGN.md` 3장 타이포그래피에 최소 글자 크기 규칙을 추가한다. 정보 글자는 12px 이상, 보조 표시(배지·단축키·카운트)는 11px 이상, 모바일 본문 단락은 15px·줄 간격 1.6.
  - 공통 컴포넌트부터 바꾼다: `Navbar`, `PageHeader`, `Footer`, `HubIntro`, `GalleryCards`, `GameCard`, `PartyBrowser`, `ReviewedGuideHighlights`, `DetailStickyNav`, `ItemIcon`, `common-hub/index.css`의 `.btn-primary`·`.btn-secondary`(10px).
  - 그다음 화면 단위로 나눈다. 묶음 하나가 commit 하나다.
    1. 캐릭터 상세 3종(HSR·WW·NTE) + 모바일 본문 단락(현재 11px/16.5px)
    2. 공략·분석 화면(`common-hub/components/guides/`, 현재 본문 12px/16px)
    3. 티어표·추천 파티·장비 상세
    4. 애니모 화면
  - 바꾸는 규칙: `text-[9px]`·`text-[10px]` → 정보 글자는 `text-xs`(12px), 보조 표시는 `text-[11px]`. 어느 쪽인지는 요소 역할로 판단하고, 판단이 애매하면 `text-xs`로 한다.
- 위험과 대응
  - 글자가 커지면 카드 안에서 줄바꿈·잘림이 생긴다. 특히 티어표 초상화 아래 이름("쿠크 · 헤…"), 추천 파티 카드, 애니모 칩. 각 묶음마다 320px·390px·1440px 캡처를 보고, 잘리면 `truncate` 대신 두 줄 허용이나 여백 조정으로 해결한다(`DESIGN.md` 11장: overflow 숨김으로 가리지 않기).
  - 사전 렌더링 HTML(`scripts/prerender-meta.js`)은 앱 스타일과 별개라 영향이 없다. 확인만 한다.
- 테스트: 클래스 문자열 검사는 하지 않는다(취약함). T0 측정의 12px 미만 글자 수를 전후 비교한다. 목표는 보조 표시를 뺀 정보 글자 0, 화면당 11px 표시는 이전의 20% 이하.

### T5. `DESIGN.md` 금지 패턴 (문제 5) — [x] 2026-11-10

이번에는 평가에서 보인 화면과 T1~T4에서 건드리는 파일만 정리한다. 저장소 전체 일괄 변경(`rounded-[…]` 211번, `transition-all` 299번)은 하지 않고, 이후 각 화면을 고칠 때 바꾼다(`DESIGN.md` 3장의 "점진적으로 교체" 규칙).

- 한글 기울임·대문자·넓은 자간
  - HSR·WW 티어표 제목(`hsr-hub/pages/TierList.tsx:398`, `ww-hub/pages/TierList.tsx:281`)과 등급 글자의 `italic uppercase`를 지운다.
  - 빵부스러기(T3), 푸터 문구, 홈 "4개 게임 통합 아카이브", 캐릭터 상세 "운명의 길 : 공허 | 번개"의 `tracking-widest`·`tracking-[0.16em]`을 지운다. 영문 라벨(예: "MENU")은 그대로 둔다.
  - `common-hub/index.css`의 `.btn-primary`·`.btn-secondary`에서 `uppercase tracking-widest`를 지운다. 두 클래스를 쓰는 곳을 캡처로 확인한다.
- 카드 안 카드
  - 캐릭터 상세 "기본 스탯"의 `StatRow`가 HSR·WW·NTE·WW 무기 상세에 4번 복제되어 있다. `common-hub/components/StatRow.tsx` 하나로 합치고, 모양을 카드에서 "구분선이 있는 줄"로 바꾼다(테두리·배경 제거, 아래 구분선 `border-b border-white/5`). Props는 기존과 같다: `{ label: string; value: string | number; color: string }`.
  - `docs/design-system/components.md`에 `StatRow`를 등록한다.
- 건드린 파일의 `rounded-[…]`·`transition-all`은 표준 값(`rounded-xl`·`rounded-2xl`, `transition-colors` 등)으로 바꾼다.
- 테스트: `tests/stat-row.test.tsx`(새 파일)에서 라벨과 값이 렌더링되고 카드 클래스(`rounded-xl border`)가 없는지 확인한다. 기존 캐릭터 상세 테스트가 통과하는지 확인한다.

### T6. 한글 글꼴 (문제 6) — [x] 2026-11-10

- D2 제안 A 기준
  - `pretendard` 패키지의 dynamic subset woff2와 CSS를 `public/fonts/pretendard/`에 복사한다(빌드 때 복사하거나 저장소에 포함). 라이선스 파일도 함께 둔다.
  - `index.html`에서 Pretendard CSS를 불러오고, Inter는 영문 숫자용으로 유지할지 함께 정한다. 기본안: `--font-sans: "Pretendard Variable", Pretendard, "Inter", ui-sans-serif, system-ui, sans-serif;` 한글과 영문을 모두 Pretendard로 맞추고 Inter는 예비로만 둔다. 이렇게 하면 Google Fonts Inter 요청을 없앨 수 있는지도 확인한다.
  - `font-display: swap`을 유지하고, 첫 화면 글꼴 1개만 preload한다.
  - 성능: `npm run perf:audit` 예산과 실제 전송량(헤드리스 Chrome 네트워크 기록)을 전후 비교한다. 화면당 글꼴 전송량 증가를 보고서에 적는다.
- D2 제안 B 기준: Google Fonts 요청에 900 굵기만 추가한다.
- 확인: 윈도우 Chrome 캡처에서 한글이 Pretendard로 나오는지, 제목 굵기가 실제 900인지 본다. 맥·모바일 실기기는 미검증으로 남긴다.

## 5. 순서와 배포

1. T0 측정 도구 → 기준값 저장
2. T1 + T2 (대비, 결정 불필요) → push 1
3. T3 + T5 (터치, 금지 패턴) → push 2
4. D1 결정 → T4 묶음 1~4 → push 3 (묶음이 크면 2번에 나눔)
5. D2 결정 → T6 → push 4

각 push 전에 `AGENTS.md` 필수 검증(타입 검사, Notion 동기화 없는 build, 테스트, `git diff --check`, `git diff`)과 8개 화면 측정·캡처 비교를 한다. 배포 뒤 운영 사이트에서 같은 측정을 한 번 더 한다.

## 6. 놓치기 쉬운 경우

- 글자를 키운 뒤 320px 화면에서 카드·칩 줄바꿈이 깨지는 경우. T4 각 묶음에서 320px 캡처를 반드시 본다.
- WW 노랑(#EAB308)·NTE 초록 버튼 위 흰 글자. T1 함수는 글자색만 고치므로, 밝은 배경 위 흰 글자는 별도로 측정한다(T0에 버튼 배경 대비 항목 포함).
- 데이터에서 오는 색(티어 색, 속성 색)이 새로 추가되는 경우. `readableTextColor`를 거치면 자동으로 보정된다.
- 로딩·빈 상태·오류 화면의 작은 글자. 평가에서 보지 않았으므로 T4 묶음마다 해당 상태를 한 번씩 연다.
- 관리자 화면. 이번 범위가 아니므로 공통 클래스(`.btn-primary`) 변경이 관리자 화면에 미치는 영향만 캡처로 확인한다.

## 7. 범위 밖

- 새 색상 체계·테마·레이아웃 재설계
- 저장소 전체 `rounded-[…]`·`transition-all` 일괄 교체
- skip link, 제목 단계, 모바일 헤더 버튼 한국어 이름(평가 보고서 우선순위 6번). 별도 작업으로 한다.

## 8. 적용 기록 (2026-11-10, T0·T3~T6)

- T0: `npm run ui:audit`(`scripts/audit-ui.mjs`, `scripts/lib/ui-audit-page.js`). 결과는 `.tmp/ui-audit/<label>/`(Git 제외). 등장 애니메이션이 끝난 뒤 측정하고, 키보드 포커스는 실제 Tab 10회로 확인한다.
- T3: 빵부스러기 링크 `min-h-6`(홈은 `min-w-6`도), 범위 입력 9곳을 공통 `.range-slider`(24px 영역·4px 막대)로, 애니모 형태 칩·링크 `min-h-6`과 간격 8px, 홈 "+ 더보기"·가이드 목록 링크 `min-h-6`.
- T4: 관리자 화면을 뺀 화면 코드에서 `text-[9px]` 88곳 → 11px, `text-[10px]` 216곳 → 12px. 읽는 글(Markdown 본문, 공략 `.guide-copy`·순위 목록, 캐릭터 설명 창, WW 역할 설명, 파티 설명, 장비 설명, 에코 효과)을 16px로. 공략 화면은 기존 CSS가 11px 이하를 이미 12px로 올리고 있었다.
- T5: 한글 제목의 `italic` 30곳 제거(티어표 제목·등급 포함), 빵부스러기·홈·푸터·캐릭터 상세의 한글 대문자·넓은 자간 제거, `StatRow` 4개 복제를 `common-hub/components/StatRow.tsx`(구분선 줄)로 통합. `.btn-primary`·`.btn-secondary`는 쓰는 곳이 없어 그대로 두었다.
- T6: Pretendard Variable 1.3.9 dynamic subset(글꼴 파일 92개, 3.1MB 중 화면에 필요한 구간만 받음)을 `public/fonts/pretendard-1.3.9/`에 넣고 비차단 preload로 불러온다. Google Fonts Inter 요청은 없앴다. `/fonts/*`는 1년 immutable 캐시. `tests/font-loading.test.ts`를 새 방식으로 바꿨다(2026-10-15 "한글 웹폰트 요청 없음" 결정을 사용자 결정으로 대체).
- 측정(로컬 빌드, 8개 화면): 9·10px 글자 0, 모바일 24px 미만 조작 요소 0(이전 화면당 1~33), 가로 넘침 0, 포커스 표시 유지. 11px 보조 표시는 남는다(추천 파티 화면 219개, 역할 라벨 등). 대비 미달 수는 T1·T2 적용 전이라 그대로다.
- 미검증: 글꼴 적용 후 실제 전송량·LCP 실측, 맥·iOS·안드로이드 실기기, 관리자 화면.
