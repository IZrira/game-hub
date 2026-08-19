---
id: c3d4e5f6-a7b8-4c7d-9e0f-1a2b3c4d5e6f
category: "[[10_Wiki/🛠️ Projects/rira-game-hub]]"
confidence_score: 1.0
tags: [roadmap, party-builder, data-standardization, milestones, breakthrough]
last_reinforced: 2026-08-19
github_commit: "feat-party-builder-and-docs-sync"
---

# [[development-roadmap]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 멀티 게임 파티 빌더와 3단계 실시간 동기화 파이프라인을 성공적으로 배포하였으며, 향후 각 게임 도메인별 신규 캐릭터 및 에셋 확장을 단계적으로 추진함.

## 📖 구조화된 지식 (Synthesized Content)
- **완료된 핵심 마일스톤 (Milestones Completed):**
  - **M5: 멀티 게임 비주얼 파티 빌더**: 스타레일/명조/이환 파티 생성, 슬롯 동기화, 1-클릭 복제.
  - **M6: 슬롯 우선 배치 워크플로우**: 슬롯 캐릭터 우선 배치 ➡️ 배치 전용 메인 딜러 토글 카드.
  - **M7: 돌파(Breakthrough) 추천 시스템**: 슬롯/대체 캐릭터별 성혼/돌파 레벨 지정 및 황금 뱃지 렌더링.
  - **M8: 3단계 오프라인 퍼스트 동기화**: Supabase Realtime + localStorage 0ms 무지연 캐싱 + TS 코드 내보내기.
  - **M9: 타이핑 편의 도구 & 고정 검색 UX**: `•`, `·` 삽입, 슬롯 이름 삽입 칩, 자동완성 버튼, `h-[650px]` 고정 모달.

- **향후 계획 (Next Steps & Future Roadmap):**
  - **신규 버전 캐릭터 데이터 지속 업데이트**: 스타레일 v3.5+, 명조 v2.0+ 신규 캐릭터 및 광추/무기/에코 추가.
  - **이환(NTE) 데이터 파이프라인 확장**: 공식 공개 일정에 맞춰 속성 시너지 덱 및 아이템 정보 정규화.
  - **시너지 덱(`SynergyDeck.tsx`) 연동 강화**: 캐릭터 상세 페이지에서 실시간 파티 데이터 자동 렌더링 확장.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 관리자 파티 빌더 도입으로 수동 하드코딩 방식의 파티 추가 프로세스가 완전히 시각적 인터페이스로 전환됨.
- **정책 변화:** 모든 파티 조합 데이터는 `types/party.ts` 유니온 인터페이스와 3-Tier 동기화 규격을 필수로 준수함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[🛠️ Projects]]
- **Related:** [[developer-guide]], [[local-analysis]], [[work-log]]
- **Raw Source:** [[docs/reports/completed_tasks.md]]
