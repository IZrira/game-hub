---
id: developer-guide
category: "[[10_Wiki/🛠️ Projects/rira-game-hub]]"
confidence_score: 1.0
tags: [system, guidelines, coding, prompt, gemma-rag, wuwa, hsr]
last_reinforced: 2026-05-19
---

# [[developer-guide]]

## 📌 핵심 요약 (The Karpathy Summary)
> 이 문서는 로컬 LLM(Gemma 4)과 클라우드 LLM(Gemini)이 병행하여 Rira Game Hub 프로젝트를 무결하게 개발할 수 있도록 설계된 통합 지식 표준 가이드라인이다.

## 📖 시스템 아키텍처 및 역할 분담 (Role Division)
- **Gemini (클라우드)**: 대규모 코드베이스 리팩토링, 기능 구현, 전체 프로젝트 빌드 및 구조적 최적화 담당.
- **Gemma 4 (로컬 RAG)**: 로컬 지식베이스 기반의 캐릭터 메커니즘 퀵 서칭, 번역 데이터 교정, 특정 컴포넌트 규격 검증 및 질의응답 지원.

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
  - 따라서 번역 텍스트(`overview` 또는 `inputs` 값) 내부에 직접 `[공명 회로 게이지.webp]` 같은 마크다운 이미지 태그를 삽입하면 안 되며, 삽입 시 UI상에 중복으로 렌더링되므로 반드시 제외한다.

---

## 🛠️ Honkai: Star Rail (붕괴: 스타레일) 개발 표준 규격

- **캐릭터 리소스 및 위키 보관 경로**: `10_Wiki/👥 Characters/HSR/`
- **스타레일 기본 스키마 매핑**:
  - **속성 (Elements)**: 화염, 얼음, 번개, 바람, 물리, 양자, 허수
  - **운명의 길 (Paths)**: 파멸, 수렵, 지식, 화합, 공허, 보존, 풍요
  - **성장 능력치 구성**: 레벨, 기초 HP, 기초 공격력, 기초 방어력, 속도, 도발, 최대 에너지 순으로 데이터를 설계한다.

---

## 🎨 캐릭터 상세 위키 페이지 레이아웃 표준 (Section Sequence)

위키 마크다운 빌더가 생성하는 명조 캐릭터 상세 페이지는 다음 **10단계 고정 레이아웃 순서**를 엄격히 따라야 한다:
1. **메타데이터 (Frontmatter)**: `id`, `category`, `tags`, `rarity`, `element`, `weapon`, `release_version`
2. **타이틀**: `# [[id]] (한글명)`
3. **핵심 요약/통찰**: `## 핵심 요약/통찰 (The Karpathy Summary)` (한줄 요약 및 소속 표기)
4. **전투 역할 분석**: `## 스스로 메커니즘 분석 (Mechanism Analysis) -> 1. 주요 전투 역할 (Roles)`
5. **핵심 전투 메커니즘**: `## 스스로 메커니즘 분석 (Mechanism Analysis) -> 2. 핵심 전투 메커니즘 (Core Gameplay Loop)` (스킬 설명과 고유 패시브 리스트 포함)
6. **대표 파티 조합**: `## 대표 파티 조합 (Party Synergy)`
7. **티어표 공략**: `## 티어표 공략 (Tier Placements)` (역경의 탑 및 홀로그램 Tactical 티어 매핑)
8. **상세 프로필 및 능력치**: `## 상세 프로필 및 능력치 (Profile & Stats)` (성우진, 다국어 표기, 레벨별 능력치 표 테이블)
9. **공명 체인 돌파 효과**: `## 공명 체인 돌파 효과 (Resonance Chain)` (R1 ~ R6)
10. **돌파 및 스킬 육성 재료**: `## 돌파 및 스킬 육성 재료 (Materials)` (캐릭터 승급 재료 및 스킬 트레이스 레벨업 재료)

### 속성(Element)별 공식 테마 컬러
UI와 마크다운 하이라이트에서 사용하는 명조 속성별 고유 헥사/CSS 토큰 매핑 규칙이다:
- **인멸 (Havoc)**: `#F472B6` (인멸 분홍)
- **회절 (Spectro)**: `#FBBF24` (회절 노랑)
- **기류 (Aero)**: `#34D399` (기류 초록)
- **용융 (Fusion)**: `#F87171` (용융 빨강)
- **응결 (Glacio)**: `#60A5FA` (응결 파랑)
- **전도 (Conducto)**: `#A78BFA` (전도 보라)

---

## 📂 파일 및 에셋 명명 표준 (Asset Naming Standards)

- **공명 회로 게이지 이미지**:
  - 단일 게이지인 경우: `${CDN_URL}/ww%20images/skills/[folderName]/공명 회로 게이지.webp`
  - 다중 게이지/에너지인 경우: `${CDN_URL}/ww%20images/skills/[folderName]/공명 회로 게이지[N].webp` (예: `공명 회로 게이지1.webp`)
- **공명 체인(돌파) 아이콘 이미지**:
  - 파일명: `공명 체인[1-6].webp` (예: `공명 체인1.webp`, `공명 체인2.webp` 등)
- **단축키 및 컨트롤 키캡 이미지**:
  - `/ww images/common/position/` 경로 아래에 위치한다.
  - 마우스 왼쪽 클릭: `mouse left.webp` (포맷팅: `{{MOUSE_L}}`)
  - 키보드 E 키: `key E.webp` (포맷팅: `{{KEY_E}}`)
  - 키보드 R 키: `key R.webp` (포맷팅: `{{KEY_R}}`)
  - 키보드 왼쪽 Shift 키: `left shift.webp` (포맷팅: `{{KEY_LSHIFT}}` 또는 `[left shift]`)

---

## 🚀 위키 자동 빌드 파이프라인 (Build Pipeline)
데이터 변경 후에는 수동으로 마크다운 문서를 작성하지 않고 빌더 스크립트를 통해 위키를 갱신한다.
- **명조(WW) 위키 빌드**: `python rebuild_ww_wiki.py`
  - 이 스크립트는 `scratch/parse_ww_char.cjs`를 사용해 캐릭터 객체를 로드하고, 로컬라이즈 파일과 매핑하여 `10_Wiki/👥 Characters/WW/[id].md`에 BOM 인코딩(`utf-8-sig`) 파일로 위키를 자동 작성한다.
- **붕괴: 스타레일(HSR) 위키 빌드**: `python rebuild_hsr_wiki.py`
  - 이 스크립트는 `scratch/parse_char.cjs`를 사용하여 HSR 캐릭터 객체를 로드하고, 파티 및 티어 메타데이터를 매핑하여 `10_Wiki/👥 Characters/HSR/[id].md`에 BOM 인코딩(`utf-8-sig`) 파일로 위키를 자동 작성한다.

### ⚠️ 위키 빌드 및 데이터 정합성 특수 사항 (Important Mappings & Platform Gotchas)
개발진은 동일한 정합성 혼선이나 런타임 오류가 발생하지 않도록 아래 특수 사항을 반드시 숙지해야 한다.

1. **HSR 개척자(Trailblazer) 데이터와 위키 파일 수 불일치**
   * **현상**: HSR 위키 파일(.md)은 총 **87개**인 반면, 데이터 파일(.ts)은 총 **86개**로 불일치한다.
   * **원인**: 개척자(Trailblazer)는 물리, 보존, 화합, 기억, 환락 등 다중 운명의 길을 가지므로, 위키에는 각 속성별 마크다운 문서 5개 외에 전체 관계도를 요약한 상위 문서인 `trailblazer.md`가 수동으로 추가 보존되어 있다. 실제 `.ts` 데이터베이스 코드는 속성별 개척자 5종으로만 구분되어 저장 및 서빙되므로, 위키 요약 파일 1개만큼 개수가 차이 나는 것은 **정상 동작**이다. (캐릭터 누락이 아니므로 개척자 요약 마크다운 파일을 수동 삭제하지 말 것).

2. **Windows 환경에서 Node.js 파일 시스템 다중 이모지 경로 버그**
   * **현상**: `node scripts/rebuild_hsr_wiki.js`와 같은 JavaScript 기반 파일 쓰기 스크립트는 Windows OS 환경에서 이모지가 포함된 디렉터리 경로(`👥 Characters`)를 핸들링할 때 파일 잠김(File Lock) 또는 스레드 블로킹(Hang) 상태가 발생한다.
   * **해결책**: 해당 이슈를 방지하기 위해 파일 I/O 파이프라인은 유니코드 경로를 Windows에서 완벽하게 우회 처리할 수 있는 **Python 스크립트(`rebuild_hsr_wiki.py`, `rebuild_ww_wiki.py`)로 일원화**하였다. Node.js 기반 빌더 파일은 사용을 금하며, 빌드 가이드 갱신 및 레거시 js 스크립트를 코드베이스에서 격리 및 제거하여 정합성을 유지한다.

---

## 🔍 로컬 RAG 검색 및 응답 가이드라인 (RAG & Gemma 4 Behavior)
`scripts/gemma.js` 스크립트를 통해 로컬 Gemma 4에 질의할 때 적용되는 엄격한 AI 필터 규칙이다.
1. **임계값 필터링 (Score Threshold)**:
   - 검색된 노트 중 매칭 점수가 `score >= 10` 이면서 가장 높은 점수 대비 15% 이상(`score >= maxScore * 0.15`)인 문서만 컨텍스트로 전달한다. 이를 통해 무관한 캐릭터가 답변에 오염되는 현상을 차단한다.
2. **답변 제약 (System Instruction)**:
   - "답변할 때 외부의 상식이나 다른 정보는 완전히 배제하고, 제공되는 [참고 자료]에 기재된 내용만을 사용하여 사용자의 질문에 한국어로 정확하게 답변하세요. 지어내거나 추측하여 답변하지 마세요."
   - 컨텍스트에 정보가 없을 경우, 억지로 소설을 쓰거나("데미안" 사례) 가상의 데이터를 생성하지 말고 정직하게 "정보를 찾을 수 없습니다"라고 응답해야 한다.
3. **윈도우 Emoji 디렉터리 핸들링**:
   - `👥 Characters`와 같이 이모지가 들어간 폴더 경로는 Node.js에서 파일 접근 시 깨짐이 발생할 수 있으므로, 항상 PowerShell `Get-Content` 브릿지 함수(`readFileContent` 등)를 통해 우회하여 로드한다.
4. **리강화(RL) 메타 태그**:
   - 지식베이스 마크다운 파일들의 Frontmatter에는 강화 학습(RL) 동기화 추적을 위한 `github_commit` 및 `last_reinforced` 날짜 태그가 반드시 명시되어야 한다.

