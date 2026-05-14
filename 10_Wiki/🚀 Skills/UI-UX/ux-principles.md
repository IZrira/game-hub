---
id: b2c3d4e5-f6a7-4b6c-9d8e-1f2a3b4c5d6e
category: "[[10_Wiki/🚀 Skills/UI-UX]]"
confidence_score: 1.0
tags: [ux, interaction, glassmorphism, accessibility, skeleton-ui]
last_reinforced: 2026-05-14
github_commit: "reinforce-100-coverage"
---

# [[ux-principles]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 4대 UI 상태(Default, Loading, Empty, Error)의 명확한 처리와 접근성 준수를 통해 중단 없는 사용자 경험을 제공함.

## 📖 구조화된 지식 (Synthesized Content)
- **추출된 패턴:**
  - **4대 UI 상태**:
    - **Default**: 미니멀리즘과 글래스모피즘(`backdrop-blur-md`) 결합.
    - **Loading**: Layout Shift 방지를 위한 스켈레톤 UI(`animate-pulse`) 우선 사용.
    - **Empty**: 중앙 정렬된 회색 텍스트와 빈 슬롯(`opacity-30`) UI 제공.
    - **Error**: `onError` 핸들러를 통한 이미지 Fallback 처리 필수.
  - **상호작용 규격**: `transition-all duration-300` 및 `hover:scale-105` 기본값.
- **세부 내용:**
  - **접근성(A11y)**: 키보드 탐색 지원(`tabIndex`, `onKeyDown`) 및 `aria-label` 제공.
  - **기획 리뷰**: Context와 Role을 먼저 정의하여 인지적 과부하 방지.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 없음 (기존 위키를 공식 문서 기반으로 보강).
- **정책 변화:** UI 상태 관리 규칙을 디자인 시스템의 핵심 지식으로 고도화함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[🚀 Skills]]
- **Related:** [[design-system]], [[component-registry]], [[text-formatting-guide]]
- **Raw Source:** [[docs/design-system/ux-principles.md]]
