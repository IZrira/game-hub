---
name: RIRA Hub UX/UI Design System
description: Rira Game Hub의 UI를 설계·구현·검토할 때 적용하는 프로젝트 디자인 규칙입니다.
triggers: ["Design a new component", "Fix UI layout", "Apply styling", "Create a new page"]
---

# RIRA Game Hub UI/UX 작업 지침

UI 작업을 시작하기 전에 반드시 루트의 `DESIGN.md`를 전체 확인한다. 디자인·UX 정책은 `DESIGN.md`가 유일한 기준이며 이 파일은 실행 순서만 정의한다.

필요하면 다음 하위 명세를 추가로 확인한다.

- 컴포넌트 목록과 Props: `docs/design-system/components.md`
- 상태·접근성 체크리스트: `docs/design-system/ux-principles.md`

## 실행 순서

1. 사용자 요청과 해당 페이지의 핵심 여정을 확인한다.
2. `DESIGN.md`에서 페이지 유형과 금지 패턴을 확인한다.
3. 기존 공통 컴포넌트와 유사 구현을 검색한다.
4. 카드보다 정보 계층, 여백과 구분선을 먼저 설계한다.
5. 게임별 대표 정보의 우선순위를 반영한다.
6. 모바일, 접근성과 상태 UI를 함께 구현한다.
7. 타입 검사, production build, diff 검증과 대표 화면 확인을 수행한다.

## 금지

- 글래스모피즘, 큰 그림자, 그라디언트와 확대 hover를 기본값으로 사용하지 않는다.
- `rounded-[숫자]` 같은 새 임의 모서리 값을 추가하지 않는다.
- 특정 상세 페이지를 다른 게임에 그대로 복제하지 않는다.
- 하위 문서의 오래된 규칙이 `DESIGN.md`와 충돌할 경우 따르지 않는다.
