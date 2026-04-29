---
name: RIRA Hub UX/UI Design System
description: Guidelines for AI agents to follow when designing, developing, or refactoring UI components and layouts in the RIRA Game Hub project.
triggers: ["Design a new component", "Fix UI layout", "Apply styling", "Create a new page"]
---

# RIRA Game Hub UI/UX Design System

## 1. Design Principles
- **Premium Dark Theme**: 전체적인 테마는 어둡고 세련된 미래지향적 스타일을 유지합니다. 배경은 주로 `bg-[#0a0a0a]` 또는 `bg-[#121212]`를 사용합니다.
- **Glassmorphism (글래스모피즘)**: 깊이감을 주기 위해 반투명 배경과 블러 효과를 적극 활용합니다. `glass-card` 클래스 또는 `bg-white/5 backdrop-blur-md border border-white/10` 패턴을 자주 사용합니다.
- **Dynamic Micro-interactions**: UI는 반응성이 뛰어나고 살아있는 듯한 느낌을 줘야 합니다. `hover:scale-105 transition-transform duration-300` 및 활성화 상태 `active:scale-95`와 같은 호버 효과를 반드시 포함합니다.
- **High Contrast & Typography**: 헤더 및 제목에는 굵고(font-black), 기울임꼴(italic)이며 자간이 좁은(tracking-tighter) 타이포그래피를 사용하여 다크 배경에서 텍스트가 돋보이도록 합니다.

## 2. Design Tokens
### Colors
- **Global Backgrounds**: `#0a0a0a`, `#0f0f0f`, `#121212`
- **Brand Primary**: `brand-primary` (Tailwind 설정 참조)
- **HSR Element Themes** (캐릭터 속성에 따른 동적 테마 컬러):
  - Quantum (양자): `#8080FF` / `#651FFF`
  - Imaginary (허수): `#E6E600` / `#FFD600`
  - Lightning (번개): `#D2A1FF` / `#9D4DFF`
  - Ice (얼음): `#A1D9FF` / `#3D8CFF`
  - Fire (화염): `#FF8A8A` / `#FF4D4D`
  - Wind (바람): `#80FFB3` / `#00E676`
  - Physical (물리): `#E5E5E5` / `#A1A1A1`

### Typography Utilities
- **섹션 헤딩**: `text-2xl font-black uppercase tracking-widest text-gray-400 italic`
- **서브 라벨(Sub-labels)**: `text-[11px] font-black text-gray-500 uppercase tracking-widest`
- **스탯 수치(Stat numbers)**: `text-xl font-black tabular-nums text-white`

## 3. Structural Guidelines
- **Responsive Design**: 모바일 우선 접근 방식을 유지합니다. 데이터 그리드에는 `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`를 사용합니다.
- **Spacing**: 충분한 패딩과 둥근 모서리를 사용합니다. 표준 카드 UI는 `rounded-[30px]` 또는 `rounded-[35px]`를 쓰며, 패딩은 `p-6` 또는 `p-8`을 기본으로 합니다.
- **Borders & Shadows**: 카드를 돋보이게 하기 위해 `border border-white/5` 와 `shadow-2xl`을 사용합니다.

## 4. Single Source of Truth (SSOT)

RIRA Game Hub는 AI 에이전트의 일관된 코딩을 위해 **SSOT(단일 진실 공급원) 문서**를 운영합니다. 새로운 UI나 페이지를 구성하기 전, 반드시 다음 문서들을 확인해야 합니다.

### 4.1 Component Registry
공용 컴포넌트(`PageHeader`, `SEO`, `ItemIcon`, `GallerySidebar` 등)의 명세와 Props는 아래 문서에 정의되어 있습니다.
- **경로**: `docs/design-system/components.md`

### 4.2 UX Principles & UI States
디자인 상태(Default, Loading, Empty, Error) 처리와 애니메이션, 접근성 기준은 아래 문서에 정의되어 있습니다.
- **경로**: `docs/design-system/ux-principles.md`

## 5. Execution Instructions for AI (AI 에이전트 행동 지침)
- **SSOT 최우선**: UI 수정 및 신규 화면 구성 시, **반드시 `docs/design-system/components.md`와 `docs/design-system/ux-principles.md`를 우선적으로 읽고 그 기준에 맞추어 작업**하십시오. 임의로 새로운 CSS를 창조하거나 새로운 컴포넌트를 중복으로 생성해서는 안 됩니다.
- 새로운 UI 블록을 생성해달라는 요청을 받을 경우, 평면적이고 단조로운 색상(예: `bg-gray-800`)을 절대 사용하지 마십시오. **항상 `glass-card` 스타일이나 그라데이션 배경(`bg-gradient-to-br from-white/[0.03] to-transparent`)을 사용**해야 합니다.
- 상호작용이 가능한 요소(버튼, 카드 등)에는 **반드시 `transition-all duration-300` (또는 500) 및 `hover:scale-105` 애니메이션**을 포함하십시오.
- 디자인 수정 시 기존 코드의 심미성(이탤릭체, 폰트 굵기, 요소 간격)을 절대 하향 평준화 시키지 말고, 기존 디자인 랭귀지와 UX 원칙을 철저히 준수하십시오.
