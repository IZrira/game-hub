---
id: a7b8c9d4-e5f6-4f0b-1c2d-3e4f5a6b7c8d
category: "[[10_Wiki/🚀 Skills/UI-UX]]"
confidence_score: 1.0
tags: [ui-ux, formatting, markdown, highlight, tooltip, paragraph-cleaner, rank-interpolation]
last_reinforced: 2026-08-29
github_commit: "feat-skill-paragraph-cleaner-and-markdown-stripper"
---

# [[text-formatting-guide]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 마크다운 서식(`==키워드==`, `{icon:xxx}`) 자동 파싱, 노션 원문 볼드(`**`) 스트리핑, 넘버링(1. 2. 3.) 목록 단락 분리, R1~R5 수치 보간 및 인게임 일치형 속성 하이라이트 표준.

## 📖 구조화된 지식 (Synthesized Content)
- **1. 스킬 본문 정제 엔진 (`cleanSkillParagraphs` in `formatter.tsx`):**
  - **마크다운 볼드(`**`) 전처리**: 노션 원문에 포함된 `**4%/4.8%**`, `**10초**`, `**10중첩**` 등의 기호를 자동 스트리핑.
  - **상시 기초 스탯 분리**: 첫 줄의 `HP+24%`, `공격력+14%` 등 상시 적용 스탯을 독립 문단(`<p>`)으로 분리.
  - **번호 매김 목록(`1.`, `2.`, `3.`) 분리**: `1.`, `2.`, `3.`, `①`, `②`, `③`, `-`, `*` 항목을 감지하여 독립된 개행 문단으로 렌더링.
  - **조건부/부가설명 연결**: `(해당 효과는 30초마다 최대 1회 발동)`과 같은 괄호 부가설명은 앞선 관련 문장에 자연스럽게 공백으로 연결.

- **2. 다단계 랭크 수치 보간 (`formatDescriptionByRank`):**
  - 슬래시(/)로 구분된 5단계 수치(`10%/12.5%/15%/17.5%/20%` 또는 `20/25/30/35/40`)를 현재 선택된 중첩(R1~R5)에 맞게 단일 수치로 치환하고 `{{YELLOW_START}}` 태그로 강조.

- **3. 인라인 리치 텍스트 렌더링 (`renderRichText`):**
  - **속성별 컬러링**: 전도, 기류, 회절, 인멸, 용융, 응결, 혼, 양자, 허수 등 속성 키워드 자동 컬러 적용.
  - **키보드/마우스 액션 아이콘**: `{{KEY_E}}`, `{{MOUSE_L}}`, `[Key E]`, `{icon:xxx}` 문법을 SVG/WebP 에셋으로 자동 변환.
  - **인라인 툴팁**: `==용어==` 문법에 호버 시 상세 설명 팝오버(최대 600px, backdrop-blur) 지원.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 노션에서 긁어온 원문에 `**` 기호가 그대로 노출되거나 어색한 줄바꿈이 생기던 문제를 해결하기 위해 `cleanSkillParagraphs` 및 `renderRichText`에 볼드 스트리핑 및 넘버링 문단 분리 파이프라인을 의무화함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[10_Wiki/🚀 Skills/UI-UX]]
- **Related:** [[ux-principles]], [[nte-arc-database-guide]], [[character-detail-standard]], [[20_Meta/Index]]
- **Raw Source:** [[docs/guides/WW_Text_Formatting_Guide.md]]
