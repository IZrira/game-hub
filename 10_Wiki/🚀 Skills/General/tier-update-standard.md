---
id: 5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b
category: "[[10_Wiki/🚀 Skills/General]]"
confidence_score: 1.0
tags: [tier-list, template, metadata, standards]
last_reinforced: 2026-05-18
github_commit: "reinforce-100-coverage"
---

# [[tier-update-standard]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 표준화된 JSON 서식과 명확한 등급 기준을 통해 티어표의 데이터 일관성과 업데이트 편의성을 극대화함.

## 📖 구조화된 지식 (Synthesized Content)
- **추출된 패턴:**
  - **데이터 서식**: `id`, `folderName`, `role`, `name`, `change` 필드를 포함한 정규화된 JSON 객체 사용.
  - **상태 관리**: 신규 추가 시 `"change": "new"`, 이후 업데이트 시 `"change": "stay"`로 동적 관리.
- **세부 내용:**
  - **등급 체계**: OP(메타 지배)부터 SS, S+, S, A/B, C 이하(제한적 사용)까지의 상세 기준 정의.
  - **동기화**: `tiers.ts` 수정 시 요약 문서도 함께 업데이트하는 SSOT 원칙 준수.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 없음.
- **정책 변화:** 티어표 관리 지식을 공통 스킬로 분류하여 커뮤니티 데이터 대응력 확보.

## 🔗 지식 연결 (Graph)
- **Parent:** [[🚀 Skills]]
- **Related:** [[hsr-tier-logic-summary]]
- **Raw Source:** [[docs/guides/tier_update_template.md]]
