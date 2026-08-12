# Handoff Report: Milestone 2 Explorer 1 (SynergyDeck Component & UI Design)

## 1. Observation (관찰한 사실 및 근거)

- **디자인 토큰 및 시스템 가이드라인 (`DESIGN.md`)**:
  - `DESIGN.md:8`: 글로벌 다크 배경 색상은 `#0a0a0a` (Solid) 및 `#121212` (Card surface).
  - `DESIGN.md:9-11`: 게임별 주 테마 색상 — HSR (`#7E30E1`), WW (`#EAB308`), NTE (`#00D287`).
  - `DESIGN.md:14-20`: 글래스모피즘 표준 사양 — `bg-white/[0.03]` 또는 `bg-[#0f0f0f]/40`, `backdrop-blur-md` / `backdrop-blur-xl`, `border-white/5` 또는 `border-white/10`, `shadow-2xl`.
  - `DESIGN.md:36-41`: CDN 에셋 로딩 규정 (`raw.githubusercontent.com`), NTE 콜론(`:`) 문자의 언더스코어(`_`) 치환 규정.

- **기존 글로벌 CSS 및 스타일 클래스 (`common-hub/index.css`)**:
  - `common-hub/index.css:5-14`: `@theme` 블록 내 `--color-brand-primary: #7E30E1`, `--color-brand-accent: #E26EE5`, `--color-brand-dark: #121212`.
  - `common-hub/index.css:35-37`: `.card-glass` 적용 (`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl`).

- **에셋 및 이미지 유틸리티 (`common-hub/utils/`)**:
  - `common-hub/utils/assetManager.ts:2`: `CDN_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main'`.
  - `common-hub/utils/assetManager.ts:8-14`: `safeEncodeURIComponent(str)` 함수로 한글 NFC 정규화 및 괄호 인코딩 처리.
  - `common-hub/utils/imageHelper.ts:14-24`: `getCharacterArtPath(gameId, folderName, artNum)` 함수로 WW, NTE, HSR 에셋 URL 분기 생성.
  - `common-hub/components/LazyImage.tsx:13-54`: 로딩 스켈레톤(`bg-white/5 animate-pulse`), `opacity-0` -> `opacity-100` 페이드 효과, `fallbackSrc` 지원.

- **파티 데이터 인터페이스 및 기존 데이터**:
  - `hsr-hub/data/parties/index.ts:1-18`: `PartyMember` (`id`, `name`, `role`, `folderName`, `isTrailblazer?`, `substitutes?`), `PartyCombination` (`id`, `name`, `description`, `mainDPS`, `members`, `tags`, `category`), `HSR_PARTIES` 데이터셋.
  - `ww-hub/data/parties.ts:2-31`: `PartyMember`, `PartyCombination`, `WW_PARTY_COMBINATIONS` 데이터셋 (`pros`, `cons` 포함).
  - `nte-hub/data/index.ts:3-94`: `NTE_CHARACTERS` 6명 데이터 (속성 '령', '빛', '주', '암').

- **상세 페이지 테마 매핑 및 섹션 구조**:
  - `hsr-hub/pages/CharacterDetail.tsx:128-150` & `725-739`: `ELEMENT_THEMES` 속성 색상 매핑 및 `SectionHeader` 컴포넌트 구조.
  - `ww-hub/pages/CharacterDetail.tsx:128-145` & `850`: `ELEMENT_THEMES` 및 `SectionHeader`.
  - `nte-hub/pages/CharacterDetail.tsx:200-220` & `911`: `ELEMENT_THEMES` 및 `SectionHeader`.

---

## 2. Logic Chain (논리 체인)

1. **관찰**: `DESIGN.md` 및 `common-hub/index.css`에 구축된 글래스모피즘과 다크 모드 토큰이 모든 게임 상세 페이지에 일관되게 적용되어 있다.
2. **추론**: 신규 `SynergyDeck.tsx` 컴포넌트는 해당 토큰(`bg-[#0f0f0f]/40 backdrop-blur-xl border-white/10 shadow-2xl rounded-[35px]`)과 `SectionHeader` 사양을 동일하게 승계해야 디자인 이질감이 없다.
3. **관찰**: 캐릭터 속성에 따라 primary/secondary/shadow 글로우 테마가 정해진다.
4. **추론**: `SynergyDeck`에 `theme?: { primary: string; secondary: string; shadow?: string }` 프로퍼티를 전달하고, 배경 엠비언트 포커스 글로우(`absolute -right-20 -top-20 w-80 h-80 blur-[100px] opacity-20`) 및 네온 링 테두리를 동적으로 연동해야 한다.
5. **관찰**: HSR 파티 데이터에는 `substitutes` (대체 캐릭터)가 정의되어 있으나, UI에 시각적으로 노출하는 컴포넌트가 아직 없다.
6. **추론**: 각 파티원 카드가 대체 캐릭터 개수 버튼(`+ 대체 N명`)을 가지고, 클릭 시 슬라이드 토글 방식으로 대체 캐릭터의 아바타/이름/역할 뱃지가 표시되도록 인터페이스를 설계해야 한다.
7. **관찰**: `getCharacterArtPath`와 `LazyImage`가 이미 작성되어 최적화되어 있다.
8. **추론**: `SynergyDeck.tsx` 내 파티원 이미지 로딩 시 별도의 URL 빌더를 중복 구현하지 않고 `getCharacterArtPath`와 `LazyImage`를 직관적으로 재활용한다.

---

## 3. Caveats (주의사항 및 미조사 영역)

- NTE (네버니스 투 에버니스) 파티 전용 데이터 파일(`nte-hub/data/parties.ts`)은 M2 Implementer 2 단계에서 신규 생성될 예정이므로, `SynergyDeck`은 데이터 미 존재 시 `synergyManager.ts`의 Fallback 로직(동일 속성/역할 기반 조합 생성)을 안전하게 수용할 수 있도록 제작해야 합니다.
- 읽기 전용 스코프 경계에 따라 실체 소스 코드(`common-hub/components/SynergyDeck.tsx`)의 수정/생성은 실시하지 않았으며, 설계 및 분석 결과만을 기록하였습니다.

---

## 4. Conclusion (결론 및 최종 평가)

`common-hub/components/SynergyDeck.tsx` UI 컴포넌트의 exact prop types, interfaces, 및 UI 요구사항 분석이 완료되었습니다. 

- **컴포넌트 프로퍼티**: `SynergyDeckProps` (`characterName`, `gameId`, `theme`, `sectionNum`, `className`)
- **주요 기능 구조**:
  1. `SectionHeader` 통합 (HSR/NTE Section 05, WW Section 06)
  2. 탭 기반 추천 파티 조합 선택 기능 (1순위, 2순위, 하이퍼캐리, 추공 등)
  3. 4인(HSR/NTE) / 3인(WW) 그리드 파티원 포트레이트 및 색상 코딩된 역할 뱃지 (Main DPS, Sub DPS, Support, Sustain)
  4. 클릭 가능 대체 캐릭터(Substitute) 모달/확장 카드 시스템
  5. 속성 연동 동적 엠비언트 글루 배경 및 다크모드/글래스모피즘 표면 처리

상세 분석 사양은 `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_1\analysis.md`에 보관되어 구현 담당 에디터에게 전달 준비가 끝났습니다.

---

## 5. Verification Method (독립 검증 방법)

1. **분석 보고서 검증**:
   - `c:\Users\User\Desktop\rira game hub\game-hub\.agents\explorer_m2_1\analysis.md` 파일 존재 및 구체적 인터페이스 정의 확인.
2. **참조 소스 코드 확인**:
   - `common-hub/utils/assetManager.ts`
   - `common-hub/utils/imageHelper.ts`
   - `common-hub/components/LazyImage.tsx`
   - `hsr-hub/data/parties/index.ts`
   - `ww-hub/data/parties.ts`
3. **타입 빌드 검증**:
   ```bash
   npm run lint
   ```
