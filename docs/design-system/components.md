# Rira Game Hub 공통 컴포넌트 레지스트리

이 문서는 컴포넌트의 위치와 역할을 관리한다. 시각·UX 정책은 루트 `DESIGN.md`를 따르며 충돌 시 `DESIGN.md`가 우선한다.

## 작업 규칙

1. 사용 전에 실제 Props 인터페이스를 확인한다.
2. 같은 역할의 컴포넌트를 새로 만들지 않는다.
3. 차이가 작으면 기존 컴포넌트에 의미 기반 variant 또는 Props를 추가한다.
4. 공통화가 게임별 정보 계층을 훼손하면 게임 전용 컴포넌트를 유지한다.
5. 새 공통 컴포넌트를 추가하거나 경로를 바꾸면 이 문서를 갱신한다.

## 레이아웃과 내비게이션

- `PageHeader` — `common-hub/components/PageHeader.tsx`: 현재 게임, 카테고리와 제목
- `DetailStickyNav` — `common-hub/components/DetailStickyNav.tsx`: 긴 상세 페이지의 섹션 이동
- `GallerySidebar` — `common-hub/components/GallerySidebar.tsx`: 게임 허브 내부 도감·공략 이동

## 이미지와 아이템

- `LazyImage` — `common-hub/components/LazyImage.tsx`: 지연 로딩, 크기 안정화와 fallback
- `ItemIcon` — `common-hub/components/ItemIcon.tsx`: 게임별 아이템·장비·재료 이미지와 상호작용
- `HsrItemIcon` — `hsr-hub/components/HsrItemIcon.tsx`: HSR 재료 이미지 규칙 처리
- `WwItemIcon` — `ww-hub/components/WwItemIcon.tsx`: WW 아이템 이미지 규칙 처리

## 콘텐츠와 상태

- `SEO` — `common-hub/components/SEO.tsx`: title, description, canonical, OG와 구조화 데이터
- `AdPlaceholder` — `common-hub/components/AdPlaceholder.tsx`: 광고 영역의 크기와 배치 안정화
- Loading fallback / Empty state — 기존 공통 구현을 먼저 검색하고 UX 체크리스트 적용

이 레지스트리는 모든 컴포넌트를 나열하는 자동 목록이 아니다. 여러 허브에서 재사용하거나 작업자가 우선 확인해야 하는 핵심 컴포넌트를 관리한다.
