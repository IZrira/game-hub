---
id: 3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f
category: "[[10_Wiki/🚀 Skills/HonkaiStarRail]]"
confidence_score: 1.0
tags: [hsr, lightcone, detailed-stats, ascension-materials]
last_reinforced: 2026-05-14
github_commit: "reinforce-100-coverage"
---

# [[lightcone-config]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 8단계 정밀 스탯 슬라이더와 전수 명시된 승급 재료 데이터를 통해 HSR 광추 정보의 무결성과 시각적 정확성을 확보함.

## 📖 구조화된 지식 (Synthesized Content)
- **추출된 패턴:**
  - **스탯 정규화**: `createDetailedBaseStats`를 통해 [1, 20, 30, 40, 50, 60, 70, 80] 레벨별 스탯을 팩토리 함수로 관리.
  - **재료 전수 명시**: 고레벨 단계에서도 하위 등급 재료를 생략하지 않고 전체 리스트를 명시하여 데이터 손실 방지.
- **세부 내용:**
  - **80레벨 규칙**: 80레벨 재료 항목은 UI 일관성을 위해 70레벨 항목을 그대로 복제하여 설정함.
  - **스킬 단계**: `description`에는 S1을, `descriptions` 배열에는 S1~S5 전체를 기술.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 없음.
- **정책 변화:** HSR 전용 광추 설정 기술을 Skills 하위로 분류하여 전문화함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[🚀 Skills]]
- **Related:** [[character-detail-standard]]
- **Raw Source:** [[docs/guides/lightcones_config.md]]
