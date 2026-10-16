# 디자인 개선 구현·코드 검토 — 브라우저 검증 별도

## 실행 범위와 한계

- 담당: `/root/improve_design`. 사용자 최신 개선 요청을 주 담당으로부터 위임받아 검색 모달, WW 속성 아이콘, Aniimo 빈 결과 복구만 수정했다. 초기 dirty 29개 파일은 보존했다.
- 기준: AGENTS.md, DESIGN.md, docs/design-system/components.md, docs/design-system/ux-principles.md, docs/guides/THREE_ENGINEER_REVIEW.md, 기존 a7e6c0a 디자인 평가. 잘린 일괄 출력은 분할 재독했다.
- Windows PowerShell, happy-dom/Vitest 회귀 검사. 이 담당은 실제 브라우저를 실행하지 않았다. viewport·스크린샷·console·실제 이미지 픽셀·스크린리더·대비는 UNVERIFIED다. 주 담당의 브라우저 재검사가 필요하다.
- 구현자가 자기 코드를 검토했으므로 별도 독립 디자인 평가와 같지 않다. 아래 1차 결론은 다른 담당 결과 열람 전에 고정했다. 타 분야 결과로 디자인 미검증을 상쇄하지 않는다.

## 1차 결론

제한된 코드·DOM 회귀 검사 PASS. 운영 UX 전체, WCAG 적합성 및 실제 배포 결과는 UNVERIFIED.

- 검색: 대화상자 이름·`aria-modal`, 입력 이름, 초기 검색 입력 포커스, 양쪽 Tab 경계, 외부 포커스 회수, Escape·닫기 후 원래 위치 복귀를 구현했다. Ctrl/Meta+K를 이미 열린 상태에서 다시 눌러도 원래 시작 위치를 덮어쓰지 않는다. 모듈 로딩 중 fallback에도 대화상자 의미와 포커스 한정을 적용한다.
- 모바일 메뉴에서 시작한 버튼이 제거되면 현재 보이는 검색 버튼으로 복귀한다. Navbar에는 모바일 검색 버튼 식별 속성 하나만 추가했다. 기존 화면 스타일과 문구는 유지한다.
- Aniimo: 빈 결과 아래 작은 `검색 조건 초기화` 버튼으로 검색어·원소·포지션·지역·성장 단계·성격을 초기화한다. 비교 선택은 보존한다.
- WW: 공개 [에셋 저장소 tree API](https://api.github.com/repos/IZrira/riragameinfo/git/trees/main?recursive=1)를 읽어 `ww images/common/position/`의 기류·용융·응결·인멸·전도·회절 각각에 `피해 부스트.webp` 파일이 존재함을 대조했다. 기존 `${속성}.webp` 파일 경로를 해당 파일명으로 고쳤다. 로드 실패 시 장식 아이콘만 제거하고 `증폭기 | 응결` 같은 기존 무기·속성 텍스트를 남긴다. 다른 이미지로 재요청하지 않는다. 실제 아이콘 그림 의미·색·크기는 주 담당의 브라우저 확인이 남았다.

## 검사 증거

- `npm exec -- vitest run tests/search-dialog-accessibility.test.tsx tests/aniimo-gallery-empty.test.tsx tests/ww-character-attribute-icon.test.tsx`: 3파일, 7개 PASS.
- 검색 테스트: 대화상자·입력 이름, 초기 포커스, Tab/Shift+Tab 순환, 외부 포커스 차단, Escape와 닫기, Ctrl/Meta+K 시작 위치, custom event, 중복 열기, 사라진 메뉴 버튼 대신 보이는 검색 버튼 복귀.
- Aniimo 테스트: 모든 조건을 동시에 설정한 무결과에서 복구, 전체 필터값·지역 복원, 원래 카드 수 복원, 비교 선택 보존.
- WW 테스트: 실제 설지 runtime fixture 렌더 후 응결 파일 URL, 장식용 빈 alt, 오류 시 재요청 없이 아이콘 숨김 및 기존 속성 텍스트 보존.
- `npm run typecheck`: PASS. 최종 전체 통합 typecheck/build는 주 담당 기록을 따른다.
- `git diff --check`와 담당 파일 diff 검토: whitespace 오류 없음. 기존 Git fsmonitor IPC 진단 및 LF→CRLF 안내는 관측되었으나 diff 검사는 exit 0.
- build는 주 담당의 공유 작업 트리 전체 검증에 맡겨 동시 생성 스크립트 실행을 피했다. 이 보고서만으로 build PASS를 주장하지 않는다.

## 재검사와 잠재 회귀

- 실제 320·390·768·1440 화면에서 검색 Tab/Shift+Tab, Escape, 닫기, overlay 닫기, Ctrl/Cmd+K, 모바일 상단 검색과 메뉴 검색의 복귀를 확인해야 한다. 스크린리더 모달 밖 탐색과 자동 axe 검사는 아직 미실행이다.
- 검색 결과가 바뀌면서 현재 포커스 요소가 제거되는 경우, 다음 Tab은 모달의 첫 요소로 회수한다. 실제 브라우저의 결과 탐색·스크롤·좁은 화면 잘림은 별도 확인해야 한다.
- WCAG 2.2 SC 2.1.1 Keyboard, 2.4.3 Focus Order, 4.1.2 Name, Role, Value와 [W3C Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)에 대응하는 일부 DOM 동작을 검사했으며, 모든 성공 기준이나 전체 적합성을 평가한 것은 아니다.
- WW 아이콘 로드 실패는 텍스트 fallback으로 탐색을 유지하지만 원본 누락이 해결되었다는 증거가 아니다. 정상 아이콘 실표시와 실패 fallback을 구분해 확인해야 한다.
- 인증·권한·DB·캐시·보안 설정·콘텐츠·광고는 이 담당 변경 범위 밖이다. 로그인/오류/관리자 UI의 민감정보 노출은 UNVERIFIED이며 공개 검색 회귀 테스트를 권한 보장으로 확대하지 않는다.

## 변경·완료 기록

- 기존 파일: common-hub/components/GlobalSearch.tsx, SearchModal.tsx, Navbar.tsx, ww-hub/pages/CharacterDetail.tsx, aniimo-hub/pages/Gallery.tsx.
- 신규 파일: common-hub/components/useDialogFocus.ts, 위 회귀 테스트 3파일, 이 보고서.
- Notion 동기화, commit, push, Cloudflare 배포는 이 담당 실행 없음. 최종 통합 검증·배포는 주 담당이 담당한다.

## 주 담당의 로컬 production 브라우저 증거 공유

아래는 `/root`가 직접 실행한 로컬 production build 브라우저 결과를 메시지로 전달받은 기록이다. 이 담당의 직접 브라우저 관찰이나 운영 배포 확인으로 표현하지 않는다. 스크린샷 원자료와 브라우저 도구 출력은 주 담당 세션에 있다.

- NTE 파티: 390px에서 h1 x16–366(clientWidth382), 320px x16–296(clientWidth312), 768px x48–482, 1440px x203–879. 마지막 수치는 resize transition 영향 가능성이 있다고 주 담당이 명시했다. 카드 6개 존재 및 모바일 screenshot 본문 정상 표시 확인을 전달받았다.
- NTE 파티 title·description·canonical·verification 각1개. NTE 감정사·HSR 비소·WW 설지도 해당 head 요소 각1개라는 검사 결과를 전달받았다. SEO 중복 개선과 실화면 콘텐츠 보존을 별개 항목으로 확인했다.
- WW 응결 피해 부스트: `naturalWidth=128`, `complete=true`, `hidden=false` 및 실제 screenshot 확인을 전달받았다. 정상 파일 표시 증거이며 테스트의 오류 fallback 동작과 구분한다.
- 모바일 검색: dialog의 `aria-modal=true`, 입력 이름 `검색어`, 자동 포커스 INPUT 및 Escape 후 `BUTTON Search` 복귀를 직접 확인했다는 결과를 전달받았다. 모든 Tab 순환·스크린리더·다국어·대비의 수동 PASS로 확대하지 않는다.
- Aniimo: 무결과 0종 → 초기화 → 86종 복원 직접 조작 결과를 전달받았다. HSR 실제 장비·파티 내용 정상 표시도 전달받았다.
- 따라서 위 로컬 표본은 주 담당 실측 근거가 추가되었으나 운영 배포·운영 데이터 권한·전체 UX 적합성은 여전히 별도 검증 대상이다.

## 디자인 → 보안 교차 검토

- 이 담당의 1차 결론 고정 뒤 공개 로그아웃 UI 범위에서 변경 diff를 검토했다. Navbar 변경은 검색 복귀용 식별 속성 1개이며 로그인·관리자 배지·인증 흐름을 변경하지 않는다. 검색 포커스 복귀 역시 접근 가능한 공개 버튼으로의 이동이며 권한 부여 동작이 아니다.
- CharacterReviewBoard의 원격 신고 수 계산은 제한된 신고 행의 길이 대신 서버가 제공한 집계 `report_count`를 표시하도록 변경되었다. 이는 일부 행만 볼 수 있는 사용자가 불완전한 수치를 전체 집계로 오인할 위험을 줄인다. 로컬 데모 집계는 별도 유지한다는 코드를 확인했다. 집계 필드의 서버 신뢰성이나 실제 저장·거부 응답은 UI diff로 증명되지 않는다.
- 주 담당이 보안 SQL을 운영에 아직 적용하지 않았다고 명시했다. 로컬 UI 정상 표시와 정적 테스트를 운영 권한 수정 완료 또는 일반 사용자·관리자·A/B 계정의 허용/거부 실증으로 해석하지 않는다.
- 공개 검색·목록·상세의 이번 변경에서 새로운 로그인 오류, 관리자 권한 표시 또는 민감정보 노출 UI를 추가한 코드는 발견하지 못했다. 인증 화면·신고 쓰기·서버 거부 메시지·운영 권한은 직접 조작하지 않아 UNVERIFIED다. 실제 보안 SQL 적용 및 계정별 권한 검증은 보안 담당 범위에 남긴다.
