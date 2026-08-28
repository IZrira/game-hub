---
id: 6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c
category: "[[10_Wiki/⚖️ Decisions/History]]"
confidence_score: 1.0
tags: [worklog, timeline, accomplishments, milestones, nte-arcs, notion-sync, rarity-fix, paragraph-cleaner]
last_reinforced: 2026-08-29
github_commit: "fix-nte-arcs-rarity-formatting-and-lore"
---

# [[work-log]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 이환(NTE) 21종 캐릭터 및 49종 아크(Arc)의 노션 연동 파이프라인 정밀화, S/A/B 등급 체계 정상화, 마크다운 볼드(`**`) 스트리핑 및 넘버링(1. 2. 3.) 문단 정제 엔진 탑재, 아크 스토리(Arc Lore) 및 전용 조율 UI 완성.

## 📖 구조화된 지식 (Synthesized Content)
- **최신 성과 (2026-08-29):**
  - **NTE 아크 & 캐릭터 노션 DB 정밀 연동 및 등급(S/A/B) 정상화:**
    - 노션 API 파서(`fetch-notion-data.js`)에서 문자형 등급(`S`, `A`, `B`)이 정규식 변환 과정에서 유실되던 오류 해결.
    - S등급(골드), A등급(퍼플), B등급(블루) 3단 체계 확립 및 도감 필터 연동.
    - 21종 캐릭터(구원, 라크리모사, 잔홍 등) 및 49종 아크(「마지막 장미」, 물망산 등)의 전수 데이터 완벽 수집 및 동기화.
  - **스킬 텍스트 정제 및 문단 처리 엔진 (`cleanSkillParagraphs` & `renderRichText`):**
    - 노션 원문에 섞여 있던 마크다운 볼드(`**`) 기호를 파서 및 렌더러 전역에서 자동 제거.
    - `1.`, `2.`, `3.` 등 번호 매김 항목을 자동 감지하여 독립된 단락으로 분리 (`백만불짜리 미소` 등).
    - 첫 줄의 기본 스탯(`HP+24%`)과 하위 괄호 부가설명(`(해당 효과는 30초마다...)`)을 문맥에 맞게 지능적으로 연결/분리.
  - **아크 상세 UI/UX 리팩토링 (`NTEArcDetail.tsx`):**
    - 불필요한 기본값 "획득처: 노션 연동" 문구 완전 삭제.
    - 49종 아크의 배경 스토리(`weaponStory`)를 **04. 아크 스토리 (Arc Lore)** 전용 카드로 깔끔하게 렌더링.
    - 1~80Lv 성장 스탯 수치에 `**` 기호가 섞여 있어도 정상 파싱되도록 전처리 강화.
    - `dedicatedChar`가 등록된 아크에 한해 전용 조율 효과 카드를 동적으로 렌더링.

- **과거 마일스톤 이력 (2026-08-19):**
  - **멀티 게임 비주얼 파티 빌더 (`AdminPartyManager.tsx`)**:
    - HSR/NTE(4인 슬롯) 및 WW(3인 슬롯) 규격 자동 동기화.
    - 1-Click 파티 복제, 슬롯 우선 배치 ➡️ 메인 딜러 토글 워크플로우.
    - 돌파(Breakthrough) 추천 엔진 및 성혼/돌파 뱃지 시스템.
  - **3단계 오프라인 퍼스트 실시간 데이터 동기화**:
    - Supabase Cloud 실시간 연동 + localStorage 0ms 캐싱 + TypeScript 코드 내보내기.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 아크 도감에서 일괄 `A`등급(4성)으로 처리되던 문제를 해결하고, 노션 원문의 실제 `S`, `A`, `B` 등급을 100% 반영하도록 스키마 매핑을 업데이트함.
- **정책 변화:** 아크 상세 페이지의 획득처 표기는 노션 데이터에 신뢰성 있는 소환/합성 경로가 체계화되기 전까지 기본 노출을 생략하고, 전용 조율 캐릭터 및 스토리 중심으로 UI를 집중함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[10_Wiki/⚖️ Decisions]]
- **Related:** [[nte-arc-database-guide]], [[text-formatting-guide]], [[20_Meta/Obsidian_Dashboard]], [[20_Meta/Index]]
- **Raw Source:** [[docs/reports/completed_tasks.md]]
