# Component Registry (RIRA Game Hub)

이 문서는 RIRA Game Hub 내에서 재사용 가능한 공통 컴포넌트들의 **단일 진실 공급원(SSOT)**입니다.
AI 및 개발자가 새로운 UI를 구성하거나 수정할 때, **절대 임의로 유사한 기능의 CSS를 작성하거나 컴포넌트를 새로 만들지 말고 이 레지스트리에 등록된 컴포넌트를 우선적으로 호출**하여 사용해야 합니다.

## 1. 레이아웃 및 내비게이션 (Layout & Navigation)

### `PageHeader`
페이지 상단의 타이틀과 빵부스러기(Breadcrumb) 내비게이션을 렌더링하는 공통 헤더 컴포넌트입니다.
- **경로**: `common-hub/components/PageHeader.tsx`
- **Props**:
  - `gameId` (`string | undefined`): 현재 속한 게임의 ID ('hsr', 'ww' 등)
  - `title` (`string`): 페이지 제목
- **사용 예시**: `<PageHeader gameId={gameId} title="종합 메타 랭킹" />`

### `GallerySidebar`
게임별 캐릭터 및 아이템 갤러리의 좌측/하단 사이드바 내비게이션 역할을 담당합니다.
- **경로**: `common-hub/components/GallerySidebar.tsx`
- **Props**: 없음. 내부적으로 `useParams`와 `useLocation`을 통해 상태를 제어합니다.
- **사용처**: 모든 갤러리 및 도감 페이지의 메인 레이아웃 구성 시 함께 렌더링.

## 2. 메타 및 검색 엔진 최적화 (SEO)

### `SEO`
Next.js의 `<Head>`나 React Helmet과 유사하게, 페이지별 SEO 메타 태그 및 JSON-LD 구조화 데이터를 동적으로 주입합니다.
- **경로**: `common-hub/components/SEO.tsx`
- **Props**:
  - `title` (`string`): 페이지 제목 (예: "캐릭터 가이드")
  - `description` (`string`): 페이지 설명
  - `faqData` (`{ question: string; answer: string }[]` | optional): 검색 엔진에 노출할 FAQ 스키마 데이터.
  - `image` (`string` | optional): OG 이미지 URL
- **사용 예시**: `<SEO title="명조 티어표" description="최신 메타 분석" />`

## 3. UI 요소 (UI Elements)

### `ItemIcon`
게임 내 아이템, 캐릭터, 재료 등의 썸네일을 표시하고, 모달을 호출하거나 툴팁을 띄울 수 있는 공통 아이콘 컴포넌트입니다. 키보드 접근성(A11y)이 적용되어 있습니다.
- **경로**: `common-hub/components/ItemIcon.tsx`
- **Props**:
  - `item` (`{ id?: string; name: string; folderName?: string; count?: number | string; rarity?: number }`): 표시할 아이템 객체
  - `type` (`'character' | 'lightcone' | 'material' | 'relic' | 'weapon' | 'echo'` | optional): 아이템의 종류. 이미지 경로 구성에 사용됨.
  - `gameId` (`GameId`): 게임 식별자
  - `size` (`'sm' | 'md' | 'lg'` | optional): 아이콘 렌더링 사이즈 (기본값: 'md')
  - `disableModal` (`boolean` | optional): 클릭 시 상세 모달 오픈 여부 (기본값: false)
  - `onClick` (`() => void` | optional): 클릭 시 사용자 정의 액션
- **사용처**: 승급 재료 목록, 추천 파티 구성원, 유물 세트 등 아이템 이미지가 필요한 모든 곳.

### `AdPlaceholder`
구글 애드센스 등 광고 스크립트가 삽입되는 영역을 규격화한 컴포넌트입니다.
- **경로**: `common-hub/components/AdPlaceholder.tsx`
- **Props**:
  - `className` (`string` | optional): 컨테이너에 추가할 Tailwind 클래스.

---

> **[규칙 (Golden Rules)]**
> 1. 컴포넌트 내부의 스타일은 `tailwind.css`와 글래스모피즘 룰을 따릅니다.
> 2. 비슷한 기능이 필요하다면 **기존 컴포넌트를 확장(Props 추가)**하는 것을 최우선으로 고려하며, 새로운 컴포넌트 생성은 최소화합니다.
> 3. AI는 컴포넌트를 사용하기 전 반드시 해당 Props 인터페이스를 확인합니다.
