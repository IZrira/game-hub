---
id: 2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e
category: "[[10_Wiki/💡 Topics/Design]]"
confidence_score: 1.0
tags: [component, ssot, react, props, accessibility]
last_reinforced: 2026-05-14
github_commit: "reinforce-100-coverage"
---

# [[component-registry]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> 재사용 가능한 공통 컴포넌트의 SSOT를 통해 코드 중복을 방지하고 디자인 일관성을 강제로 유지함.

## 📖 구조화된 지식 (Synthesized Content)
- **추출된 패턴:**
  - **핵심 컴포넌트**: `PageHeader`(내비게이션), `ItemIcon`(썸네일/모달), `SEO`(메타데이터)가 시스템의 중추를 이룸.
  - **확장 우선 원칙**: 새로운 UI 필요 시 기존 컴포넌트에 Props를 추가하여 확장하는 것을 최우선으로 함.
- **세부 내용:**
  - **ItemIcon**: `type`에 따라 이미지 경로를 자동 구성하며 키보드 접근성(A11y)이 내장됨.
  - **SEO**: FAQ 스키마 및 JSON-LD를 동적으로 주입하여 검색 엔진 최적화 지원.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 없음.
- **정책 변화:** 컴포넌트 명세를 지식화하여 AI가 임의로 유사한 컴포넌트를 생성하는 것을 금지함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[💡 Topics]]
- **Related:** [[design-system]], [[ux-principles]]
- **Raw Source:** [[docs/design-system/components.md]]
