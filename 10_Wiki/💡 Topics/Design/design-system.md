---
id: a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d
category: "[[10_Wiki/💡 Topics/Design]]"
confidence_score: 1.0
tags: [design-system, tokens, architecture, ssot]
last_reinforced: 2026-05-14
github_commit: "reinforce-garden"
---

# [[design-system]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> Glassmorphism과 고대비 타이포그래피를 통해 Rira Game Hub만의 프리미엄 시각적 아이덴티티와 컴포넌트 아키텍처 표준을 정의함.

## 📖 구조화된 지식 (Synthesized Content)
- **추출된 패턴:**
  - **시각 언어**: `#0a0a0a` 배경과 `backdrop-blur-md`를 결합한 글래스모피즘 카드가 기본 UI 단위임.
  - **동적 테마**: 게임별(HSR-퍼플, WW-옐로우) 고유 컬러 테마와 속성별 액센트 컬러를 매핑하여 몰입감 제공.
- **세부 내용:**
  - **레이아웃**: `max-w-[1600px]` 컨테이너와 3:4.2 비율의 캐릭터 카드를 표준으로 사용.
  - **컴포넌트 계층**: Navbar(z-50) > PageHeader(z-40) > Content 순의 Z-인덱스 전략.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 없음.
- **정책 변화:** 디자인 표준을 Topics/Design으로 분류하여 개념적 기반을 확립함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[💡 Topics]]
- **Related:** [[ux-principles]]
- **Raw Source:** [[DESIGN.md]]
