# UX Principles & State Guidelines (RIRA Game Hub)

본 문서는 RIRA Game Hub의 일관된 사용자 경험(UX)을 유지하기 위한 **단일 진실 공급원(SSOT)**입니다.
AI 및 디자이너/개발자는 화면을 설계하거나 수정할 때, 개별적인 감각에 의존하지 않고 아래의 원칙을 기준으로 판단해야 합니다.

## 1. 4대 UI 상태(UI States) 원칙

모든 화면 및 컴포넌트는 다음의 4가지 상태를 명확히 정의하고 처리해야 합니다.

### 1) Default (기본 상태)
- **정보의 계층 구조**: 주요 정보는 강조하고, 부가적인 텍스트는 Tooltip이나 Modal을 활용하여 숨겨야 합니다. (미니멀리즘 유지)
- **글래스모피즘(Glassmorphism)**: 컨테이너 배경은 반투명한 화이트/블랙 베이스(`bg-white/5`, `bg-black/40` 등)에 블러 처리(`backdrop-blur-md`)를 필수로 적용합니다.

### 2) Loading (로딩 상태)
- 화면이나 데이터가 로드될 때 빈 화면이나 로딩 스피너 대신 **스켈레톤(Skeleton) UI**를 우선 사용합니다.
- 스켈레톤은 `animate-pulse` 클래스를 적용하고, 컨테이너 배경과 유사한 톤(`bg-white/5` 또는 `bg-white/10`)으로 구성하여 Layout Shift를 방지합니다.

### 3) Empty (빈 데이터 상태)
- 콘텐츠가 없는 경우 무너진 레이아웃을 보여주지 않고, 명확한 Empty State UI를 제공해야 합니다.
- **포맷**: 중앙 정렬된 회색 텍스트(예: `text-gray-700 uppercase tracking-widest`)로 빈 상태임을 안내합니다. (예: "미편성", "EMPTY")
- 티어표나 캐릭터 파티 등에서 할당되지 않은 슬롯은 `opacity-30` 정도의 빈 슬롯 UI를 렌더링해야 합니다.

### 4) Error & Fallback (에러 및 대체 상태)
- **이미지 로딩 실패**: 모든 `<img>` 태그는 `onError` 핸들러를 가져야 합니다.
  - 이미지 로드 실패 시 깨진 아이콘을 보여주지 않고, 컨테이너의 배경색을 바꾸거나 대체 텍스트("No Image")를 노출하도록 Fallback 처리합니다.
  - 예시: `<img onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<span>No Image</span>' }} />`

## 2. 상호작용 및 애니메이션 원칙

### 1) Hover 효과
- 클릭 가능한 모든 인터랙티브 요소(버튼, 카드, 링크)는 hover 시 **시각적 피드백**을 제공해야 합니다.
- **애니메이션 규격**: `transition-all duration-300`을 기본으로 사용합니다.
- **크기 변화**: 버튼과 카드는 호버 시 살짝 커지는 `hover:scale-105` 또는 `hover:scale-110`을 기본값으로 사용합니다.
- **테두리 변화**: 컴포넌트 활성화 또는 포커스 시 `border-brand-primary` 또는 `border-brand-accent`를 사용하여 활성 상태를 나타냅니다.

### 2) 접근성 (Accessibility, A11y)
- 키보드만으로도 사이트를 탐색할 수 있어야 합니다. 
- 클릭 가능한 커스텀 요소(`div` 등으로 만든 버튼)는 `role="button"`, `tabIndex={0}`, 그리고 `onKeyDown` 이벤트(Enter 및 Space 키로 클릭 효과 발생)를 반드시 포함해야 합니다.
- 스크린 리더를 위해 중요 이미지나 아이콘에는 `aria-label`을 제공합니다.

## 3. 기획 리뷰 및 리스크 점검 (Spec-review)
- 새로운 화면이나 기능을 설계하기 전, **"이 기능이 어떤 상황에서(Context), 누가(Role) 사용하는가?"**를 먼저 정의합니다.
- 복잡한 로직을 추가하기 전, 이 기능이 사용자에게 인지적 과부하를 주지 않는지 점검하고, 불가피하다면 사용자의 언어로 풀어서 보여주는 UX Writing을 적용합니다.
