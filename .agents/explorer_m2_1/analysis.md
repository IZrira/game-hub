# SynergyDeck Component & UI Design Analysis Report (Milestone 2)

## 요약 (Executive Summary)
본 보고서는 `common-hub/components/SynergyDeck.tsx` 컴포넌트의 시각적 디자인, 타입 정의, 반응형 레이아웃 및 교체(대체) 캐릭터 추천 UI 구조에 대한 상세 분석 및 설계 사양서입니다. 기존 코드베이스의 다크 모드, 글래스모피즘(`glass-card`), 엘리먼트 글루(Glow) 효과 및 CDN 에셋 안전 처리 표준을 완전하게 적용하여 작성되었습니다.

---

## 1. 코드베이스 UI/디자인 시스템 종합 분석

### 1.1 디자인 토큰 및 글래스모피즘 (Design Tokens & Glassmorphic Surface)
- **글로벌 다크 배경**: `#0a0a0a` (페이지 베이스), `#121212` (카드 서피스) (`DESIGN.md:8`)
- **게임별 대표 테마 컬러** (`DESIGN.md:9-11`):
  - **HSR (붕괴: 스타레일)**: Primary `#7E30E1`, Secondary `#E26EE5`
  - **WW (명조: 워더링 웨이브)**: Primary `#EAB308`, Secondary `#FDE047`
  - **NTE (네버니스 투 에버니스)**: Primary `#00D287`, Secondary `#34D399`
- **글래스모피즘 사양 (`glass-card`)** (`common-hub/index.css:35-37`, `DESIGN.md:14-20`):
  ```css
  bg-white/[0.03] 또는 bg-[#0f0f0f]/40 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[35px]
  ```
- **섹션 헤더 표준 (`SectionHeader`)** (`hsr-hub/pages/CharacterDetail.tsx:725-739`):
  - 대형 이탈릭 숫자 인덱스 상자 (`w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl`)
  - 타이틀: `text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6`
  - 숫자 상자 색상은 캐릭터 속성 테마에 동적 연동 (`backgroundColor: ${theme.primary}20`, `color: theme.primary`, `borderColor: ${theme.primary}60`)

### 1.2 에셋 관리 및 이미지 해상 유틸리티
- **중앙화 CDN URL**: `https://raw.githubusercontent.com/IZrira/riragameinfo/main` (`common-hub/utils/assetManager.ts:2`)
- **유니코드/경로 안전 인코딩**: `safeEncodeURIComponent(str)` (`common-hub/utils/assetManager.ts:8-14`) - 한글 자소 분리(NFC/NFD) 및 괄호 문자를 안전하게 인코딩.
- **게임별 이미지 경로 생성**: `getCharacterArtPath(gameId, folderName, artNum)` (`common-hub/utils/imageHelper.ts:14-24`):
  - WW: `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(folderName)}/${safeEncodeURIComponent(folderName)}.webp`
  - NTE: `${CDN_URL}/nte%20images/characters/${safeEncodeURIComponent(folderName)}/${safeEncodeURIComponent(artNum)}.png`
  - HSR: `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(folderName)}/${safeEncodeURIComponent(artNum)}.webp` (개척자의 경우 `art01-01.webp` vs `art01.webp`)
- **지연 로딩 및 로딩 스켈레톤**: `LazyImage.tsx` (`common-hub/components/LazyImage.tsx:13-54`) 컴포넌트를 활용해 로딩 중 `bg-white/5 animate-pulse` 뼈대 애니메이션 및 이미지 에러 시 네온 플레이스홀더 처리.

---

## 2. SynergyDeck 컴포넌트 명세 및 Interface 설계

### 2.1 Component Props Interface (`SynergyDeckProps`)
```typescript
export interface SynergyDeckProps {
  /** 캐릭터 이름 (예: "애쉬베일", "기염", "구원") */
  characterName: string;
  /** 게임 ID 구분 ('hsr' | 'ww' | 'nte') */
  gameId: 'hsr' | 'ww' | 'nte';
  /** 동적 속성 테마 (Primary, Secondary, Shadow Glow) */
  theme?: {
    primary: string;
    secondary: string;
    shadow?: string;
  };
  /** 섹션 번호 (HSR/NTE: "05", WW: "06" 기본값) */
  sectionNum?: string;
  /** 추가 커스텀 className */
  className?: string;
}
```

### 2.2 Data Types & Formatted Party Interfaces
`common-hub/utils/synergyManager.ts`와 연동되는 데이터 인터페이스 사양:

```typescript
export interface SynergyPartyMember {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러' | '탱커' | '힐러' | '디버퍼' | string;
  folderName: string;
  isTrailblazer?: boolean;
  isRover?: boolean;
  substitutes?: {
    name: string;
    folderName: string;
    isTrailblazer?: boolean;
    isRover?: boolean;
    role?: string;
  }[];
}

export interface FormattedPartyCombination {
  id: string;
  name: string;
  description: string;
  mainDPS?: string;
  category?: string;
  members: SynergyPartyMember[];
  tags?: string[];
  pros?: string[];
  cons?: string[];
}
```

---

## 3. UI/UX 세부 구현 요구사항

### 3.1 파티원 포트레이트 및 역할 뱃지 (Role Badges)
1. **포트레이트 프레임**:
   - `aspect-[3/4]` 비비드 카드 프레임 적용
   - `LazyImage` 기반으로 CDN 이미지를 비동기 로딩하며, hover 시 `hover:scale-105 transition-transform duration-300` 적용
2. **역할 뱃지 (Role Badge) 스타일링**:
   - **메인 딜러 (Main DPS)**: `bg-rose-500/10 text-rose-400 border border-rose-500/30` (강렬한 붉은 톤)
   - **서브 딜러 (Sub DPS)**: `bg-purple-500/10 text-purple-300 border border-purple-500/30` (신비로운 보라 톤)
   - **서포터 (Support)**: `bg-emerald-500/10 text-emerald-300 border border-emerald-500/30` (생기 있는 녹색 톤)
   - **탱커/힐러 (Sustain / Tank / Healer)**: `bg-sky-500/10 text-sky-300 border border-sky-500/30` (안정감 있는 푸른 톤)
   - 뱃지 디자인: `px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md`

### 3.2 대체 캐릭터 (Substitute Recommendations) 추천 시스템
1. **트리거 및 뱃지 표시**:
   - 파티원 카드 하단에 대체 가능 캐릭터가 있을 경우 `<button className="mt-2 text-[10px] font-bold text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl border border-white/10 transition-all">` 버튼 제공 (예: `+ 대체 3명`)
2. **대체 캐릭터 드로어 / 모달 / 확장 카드**:
   - 버튼 클릭 시 해당 파티원 하단에 슬라이드 애니메이션(`animate-slide-up`)으로 대체 캐릭터 미니 포트레이트 목록 노출.
   - 각 대체 캐릭터는 초소형 카드(아바타 이미지 + 이름 + 역할 뱃지)로 표시되어 사용자가 보유하지 않은 캐릭터를 대체할 전술적 선택지를 즉시 확인 가능.

### 3.3 엘리먼트 글루(Glow) 및 시각 효과
1. **동적 엠비언트 글루**:
   - `SynergyDeck` 카드 상단 우측 배경에 `absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none` 요소 배치, `backgroundColor: theme.primary` 적용.
2. **파티 탭/카드 액티브 네온 링**:
   - 선택된 추천 파티 카드는 `border-brand-primary/50 shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.2)]` 효과로 주력 하이라이트.

### 3.4 반응형 및 다크모드 접근성 (Responsiveness & Accessibility)
1. **그리드 레이아웃**:
   - 4인 파티 (HSR/NTE): `grid-cols-2 md:grid-cols-4 gap-3 md:gap-4`
   - 3인 파티 (WW): `grid-cols-1 md:grid-cols-3 gap-4`
   - 전체 카드: `glass-card p-6 md:p-8 rounded-[35px] bg-[#0f0f0f]/40 backdrop-blur-xl border border-white/10`
2. **접근성 (a11y)**:
   - semantic HTML `<section aria-label="추천 팀 조합">` 사용
   - 탭 버튼에 `role="tab"`, `aria-selected` 지정
   - 이미지 대체 텍스트(`alt`)에 `${member.name} 포트레이트` 명확히 기재.

---

## 4. 검증 사양 (Verification Evidence Chain)
1. **의존성 파일 존재 확인**:
   - `common-hub/utils/assetManager.ts` (safeEncodeURIComponent, CDN_URL)
   - `common-hub/utils/imageHelper.ts` (getCharacterArtPath)
   - `common-hub/components/LazyImage.tsx` (LazyImage)
2. **데이터 세트 연동 준비 상태**:
   - `hsr-hub/data/parties/index.ts` (`HSR_PARTIES` 데이터 117줄 확인)
   - `ww-hub/data/parties.ts` (`WW_PARTY_COMBINATIONS` 데이터 32줄 확인)
   - `nte-hub/data/index.ts` (`NTE_CHARACTERS` 110줄 확인, M2 Implementer 2가 `nte-hub/data/parties.ts` 신규 생성 예정)

---

## 5. 결론 및 마일스톤 2 구현 가이드
Explorer 1의 조사를 통해 `common-hub/components/SynergyDeck.tsx` 구현에 필요한 타입 구조, 글래스모피즘 스타일, 동적 엘리먼트 글루, 역할 뱃지 및 대체 캐릭터 추천 UI 요구사항이 완벽히 정의되었습니다. Implementer 1 및 Implementer 2는 작성된 사양서를 바탕으로 안전하게 개발을 수행할 수 있습니다.
