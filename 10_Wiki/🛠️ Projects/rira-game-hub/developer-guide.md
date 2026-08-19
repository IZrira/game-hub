---
id: developer-guide
category: "[[10_Wiki/🛠️ Projects/rira-game-hub]]"
confidence_score: 1.0
tags: [system, guidelines, coding, prompt, gemma-rag, wuwa, hsr, nte, party-builder]
last_reinforced: 2026-08-19
---

# [[developer-guide]]

## 📌 핵심 요약 (The Karpathy Summary)
> 이 문서는 Rira Game Hub의 멀티 게임 아키텍처, 파티 빌더 엔진, 돌파(Breakthrough) 추천 시스템, 위키 동기화 파이프라인을 무결하게 개발할 수 있도록 설계된 통합 개발 표준 가이드라인이다.

## 📖 시스템 아키텍처 및 역할 분담 (Role Division)
- **Gemini (클라우드)**: 대규모 코드베이스 리팩토링, 기능 구현, 전체 프로젝트 빌드 및 구조적 최적화 담당.
- **Gemma 4 (로컬 RAG)**: 로컬 지식베이스 기반의 캐릭터 메커니즘 퀵 서칭, 번역 데이터 교정, 특정 컴포넌트 규격 검증 및 질의응답 지원.

---

## 👥 멀티 게임 파티 추천 및 빌더 아키텍처 (`common-hub/types/party.ts`)

### 1. 통합 파티 데이터 유니온 규격
- **HSR (스타레일)**: 4인 고정 슬롯 (`[PartySlot, PartySlot, PartySlot, PartySlot]`), `category` 메타데이터.
- **WW (명조)**: 3인 고정 슬롯 (`[PartySlot, PartySlot, PartySlot]`), 콤보 및 서포터 시너지.
- **NTE (이환)**: 4인 고정 슬롯 (`[PartySlot, PartySlot, PartySlot, PartySlot]`), `elementSynergy` 속성 시너지.

### 2. 돌파(Breakthrough) 추천 시스템
- 본체 슬롯(`PartySlot`) 및 대체 캐릭터(`substitutes`)에 `breakthrough` 및 `description` 필드를 표준 지원한다.
- **표준 프리셋**:
  - HSR: `명함 (E0)`, `1돌+ 권장`, `2돌+ 권장`, `2돌 필수`, `4돌+`, `6돌 (풀돌)`
  - WW: `명함 (S0)`, `1돌+ 권장`, `2돌+ 권장`, `3돌+`, `6돌 (풀돌)`
  - NTE: `명함`, `1돌+ 권장`, `2돌+ 권장`, `풀돌`
- **UI 렌더링**: 아바타 및 툴팁에 황금빛 돌파 뱃지(`1돌+`, `2돌+`)를 자동으로 부착한다.

### 3. 3단계 실시간 동기화 파이프라인
1. **Supabase Cloud**: `party_recommendations` 테이블 실시간 동기화.
2. **localStorage Cache**: `parties_HSR`, `parties_WW`, `parties_NTE` 키로 브라우저에 0ms 무지연 저장 및 로드.
3. **TypeScript Serializer**: `exportPartyToTSCode(game, parties)` 엔진을 통해 클립보드로 TS 상수를 원클릭 내보내기.

---

## 🛠️ Wuthering Waves (명조) 개발 표준 규격

### 1. 캐릭터 데이터 스키마 (`ww-hub/data/characters/ww/[id].ts`)
명조 캐릭터를 새로 생성하거나 수정할 때는 다음 규칙을 엄격히 준수한다.
- **팩토리 함수 활용**: `createWwBaseStats`와 `createMaterial`, `createWwSkill`을 사용해 데이터 구조를 초기화한다.
- **스킬 입력 가이드 (`skillInput`) 정의**:
  - **A타입 (상세 분석형)**: 복잡한 게이지 및 스택 메커니즘을 가진 캐릭터.
    - 구성: `{ hideGauge: true, overview: "character.[id].skillInput.overview", inputs: [] }`
    - 특징: 모든 스키마 및 가이드를 `overview` 문자열 필드 하나에 줄바꿈(`\n\n`) 기호와 함께 통합한다.
  - **B타입 (간결 요약형)**: 비교적 직관적인 딜링 사이클을 가진 캐릭터.
    - 구성: `{ overview: "character.[id].skillInput.overview", inputs: ["character.[id].skillInput.inputs.0", ...] }`
    - 특징: 게이지를 자동 렌더링하도록 `hideGauge`는 생략 또는 `false`로 지정한다.

### 2. 로컬라이즈 파일 규칙 (`common-hub/locales/ww/ww_characters_ko.json`)
- 모든 캐릭터 관련 텍스트는 번역 JSON에 `character.[id].[field]` 형식의 다국어 매핑 키를 사용하며, `.ts` 파일 내에 직접 한글/영어 문자열을 하드코딩하지 않는다.
- **키캡/마우스 단축키 렌더링 포맷**:
  - `[key e]` 또는 `[key r]` 대신 `{{KEY_E}}`, `{{KEY_R}}` 형식을 권장한다.
  - `[mouse left]` 대신 `{{MOUSE_L}}` 형식을 권장한다.
- **⚠️ 중복 게이지 태그 절대 금지**:
  - `WuwaSkillInput.tsx` 컴포넌트가 `hideGauge`가 비활성화된 경우 상단에 `공명 회로 게이지.webp`를 자동으로 렌더링한다.
  - 따라서 번역 텍스트(`overview` 또는 `inputs` 값) 내부에 직접 `[공명 회로 게이지.webp]` 같은 마크다운 이미지 태그를 삽입하면 안 된다.

---

## 🛠️ Honkai: Star Rail (붕괴: 스타레일) 개발 표준 규격

- **캐릭터 리소스 및 위키 보관 경로**: `10_Wiki/👥 Characters/HSR/`
- **스타레일 기본 스키마 매핑**:
  - **속성 (Elements)**: 화염, 얼음, 번개, 바람, 물리, 양자, 허수
  - **운명의 길 (Paths)**: 파멸, 수렵, 지식, 화합, 공허, 보존, 풍요
  - **성장 능력치 구성**: 레벨, 기초 HP, 기초 공격력, 기초 방어력, 속도, 도발, 최대 에너지 순으로 데이터를 설계한다.

---

## 🛠️ Neverness to Everness (이환 - NTE) 개발 표준 규격

- **허브 아키텍처**: `nte-hub/` 디렉토리에 전용 컴포넌트(`CharacterDetail.tsx` 등)를 구현합니다.
- **이미지 파싱 필수 규칙 (Asset Pathing)**:
  - 깃허브 CDN 호환성 및 Windows 파일 시스템 정책을 준수하기 위해 아이템이나 캐릭터 명칭, 스킨 이름에 콜론(`:`) 문자가 포함된 경우 반드시 **언더바(`_`)로 치환**해야 합니다.
  - 적용 함수: `common-hub/data/items.ts` 내 `getItemUrl()`, `common-hub/utils/imageHelper.ts` 내 `getCharacterArtPath()`

---

## 🛡️ AdSense & Legal Compliance (애드센스 및 보안 정책)

- 구글 애드센스 승인 및 비즈니스 사이트 신뢰도 충족을 위해 다음 3종의 필수 페이지를 유지 관리합니다.
  - `PrivacyPolicy.tsx` (개인정보처리방침 및 DART 쿠키 거부)
  - `TermsOfService.tsx` (이용약관 및 게임 정보/가챠 확률에 대한 면책)
  - `ContactUs.tsx` (문의하기 - 공식 이메일 `rira.game.hub@gmail.com`으로 `mailto:` 링크 연결)

---

## 🚀 위키 자동 빌드 파이프라인 (Build Pipeline)
데이터 변경 후에는 수동으로 마크다운 문서를 작성하지 않고 빌더 스크립트를 통해 위키를 갱신한다.
- **명조(WW) 위키 빌드**: `python rebuild_ww_wiki.py`
- **붕괴: 스타레일(HSR) 위키 빌드**: `python rebuild_hsr_wiki.py`

### ⚠️ 위키 빌드 및 데이터 정합성 특수 사항
1. **HSR 개척자(Trailblazer) 데이터와 위키 파일 수 불일치**
   * HSR 위키 파일(.md)은 총 87개, 데이터 파일(.ts)은 총 86개. 개척자 상위 요약 문서(`trailblazer.md`)가 수동 보존되어 있으므로 정상 동작이다.
2. **Windows 환경에서 Node.js 파일 시스템 다중 이모지 경로 버그**
   * Windows에서 이모지 경로(`👥 Characters`) 핸들링 시 파일 잠김 현상을 방지하기 위해 파일 I/O 파이프라인은 **Python 스크립트(`rebuild_hsr_wiki.py`, `rebuild_ww_wiki.py`)로 일원화**한다.
