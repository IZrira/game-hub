# 여우 대표 이미지 변경 — 독립 디자인 검토

- 실행 ID: 2026-10-19-fox-brand-design / 프로토콜 1.0
- 일시·시간대: 2026-10-19 / Asia/Seoul
- 담당: 독립 디자인 에이전트 `/root/brand_design`. 다른 담당 결과를 열람하지 않고 결론을 작성했다.
- 대상: `main`, HEAD `68f6056e7f8f2f8f729df91e2fb97ffbf457fa86` 위의 미커밋 브랜딩 변경. 운영 배포 commit은 미확인.
- 범위: Navbar·LoginModal 로고, 기본 공유 이미지·사이트맵·프리렌더 참조, favicon·PWA 참조. 기존 dirty AGENTS.md 및 과거 보고서는 제외했다.
- 정책: AGENTS.md, DESIGN.md, docs/guides/THREE_ENGINEER_REVIEW.md, docs/design-system/ux-principles.md 및 보고서 양식.
- 도구·환경: Windows PowerShell git diff 및 view_image. 브라우저·viewport·로그인·쿠키·광고 조건은 실행하지 않아 미검증이다.
- 사용자 요청: 프로필과 동일한 대표 이미지. Notion 동기화는 허용되지 않았고 실행하지 않았다.

## 독립 결과

### D1 — 선택 원본과 정체성: PASS

선택 원본 `C:/Users/swjja/.codex/generated_images/01a15293-5cb2-7853-9279-29a4994e67b3/exec-7794fdfb-4b8c-420e-87d6-f64487764d9a.png`, `public/logo512.png`, `public/assets/brand/rira-fox.webp`를 각각 직접 열었다. 동일한 연보라색 여우, 별 머리장식, 보라색 게임패드, 라벤더 배경이며 제복·넥타이·파란 리본이 없다. 얼굴·귀·꼬리·게임패드의 상대적 비율과 구도가 일치하고 육안상 늘어짐이나 새 크롭은 없다. 원본/512px/768px 실물 파일 3개를 확인했다. 나머지 작은 아이콘 파일의 직접 시각 검사는 미실행이다.

### D2 — 레이아웃 보존·대체 텍스트: PASS (정적 범위)

Navbar는 기존 36px/40px 정사각형 래퍼, LoginModal은 64px 래퍼를 유지하며 이미지 width/height와 object-contain을 지정한다. 텍스트·메뉴·모달 동작은 이번 diff에서 변경하지 않는다. Navbar 이미지의 빈 alt는 인접한 RIRA GAME HUB 링크 텍스트와 중복 낭독을 피하며, LoginModal은 RIRA GAME HUB라는 식별 alt를 제공한다. WCAG 2.2 SC 1.1.1에 대한 소스 수동 확인만 수행했다: https://www.w3.org/TR/WCAG22/#non-text-content . 자동 접근성 검사나 전체 WCAG 적합 판정은 아니다.

### D3 — 실제 화면·작은 아이콘·공유 미리보기: UNVERIFIED

실제 브라우저에서 320/390/1440px, 확대, 키보드, 모달 열기, favicon 16/32px 가독성, 설치 아이콘 마스킹, 소셜 공유 크롭을 확인하지 않았다. 원본의 복잡한 세부는 작은 크기에서 약해질 수 있으므로 헤더에서 얼굴 식별 여부를 확인해야 한다. 정사각형 공유 이미지의 실제 플랫폼 표시도 미검증이다. console·404·캐시 갱신·이미지 오류 시 표시 또한 미검증이다. 루트 담당자의 실제 브라우저 검증으로 보완해야 한다.

## 교차 검토 및 최종 판정

- 디자인 → 보안 정적 검토: LoginModal 변경은 장식 로고에 국한되고 닫기·인증 버튼·권한 표시는 변경하지 않는다. 실제 인증·오류 여정은 미검증이다.
- 다른 담당 결과는 아직 열람하지 않았으며 교차 의견/이견은 취합 담당자가 후속 기록한다.
- 확정 P0/P1/P2 결함 없음. 정적 구현 및 원본 이미지 동일성에 한정해 PASS. 실제 브라우저 조건은 UNVERIFIED이므로 전체 디자인 통과를 선언하지 않는다.
- 구현 수정·Notion·타입 검사·빌드·commit·push·배포는 이 독립 검토에서 실행하지 않았다. 보고서만 추가했다.

## 후속 자산·교차 검토

- 독립 1차 결론 이후 성능·보안 보고서 `2026-10-19-fox-brand-performance.md`, `2026-10-19-fox-brand-security.md`를 읽고 현재 Navbar/LoginModal diff를 다시 확인했다. 두 컴포넌트는 이제 `/assets/brand/rira-fox-icon.webp`를 공유한다. width/height, 래퍼 크기, object-contain과 alt는 이전 검토와 동일하다.
- 96×96 WebP를 view_image로 직접 열었다. 여우 얼굴·귀·별 장식·게임패드·꼬리와 배경이 보존되고 늘어짐이나 구도 변경은 없다. 96px 실제 자산에서 식별성은 PASS이며, 브라우저에서 36/40/64px로 표시했을 때의 품질은 여전히 UNVERIFIED다.
- 성능 → 디자인 교차: 성능 보고서 PERF-04의 65,022-byte PNG에서 3,528-byte WebP로 변경은 동일 그림의 해상도·인코딩 최적화다. 콘텐츠·프로필 그림·광고를 숨기거나 제거하지 않으며 설치용 큰 PNG도 보존한다. 소스 및 직접 시각 확인과 보고서 사이에 이견이 없다.
- 디자인 → 보안 교차: S1–S4와 현재 diff가 일치한다. 이미지 alt는 브랜드 이름 또는 인접 링크와 중복을 피하는 빈 값이며 로그인 상태·성공·관리자 권한을 주장하지 않는다. 모달 인증 버튼·오류·닫기·권한 분기는 변경하지 않아 소스 범위에서 권한/로그인 인식 변경이 없다. 실제 인증 여정은 미검증이다.
- 루트 담당자가 로컬 브라우저 연결 `ERR_CONNECTION_TIMED_OUT`를 보고했다. 이 독립 검토에서 해당 브라우저 실행이나 운영 화면을 직접 확인하지 않았으므로 브라우저 PASS로 바꾸지 않는다. 운영 배포 후 시각 검증은 별도 근거가 필요하다.
