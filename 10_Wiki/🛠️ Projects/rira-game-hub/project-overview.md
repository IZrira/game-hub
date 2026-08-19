---
id: 1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d
category: "[[10_Wiki/🛠️ Projects/rira-game-hub]]"
confidence_score: 1.0
tags: [setup, local-dev, party-builder, supabase-realtime, deploy]
last_reinforced: 2026-08-19
github_commit: "feat-party-builder-and-docs-sync"
---

# [[project-overview]]

## 📌 한 줄 통찰 (The Karpathy Summary)
> Rira Game Hub는 AI 에이전트와 관리자 시각화 도구를 결합하여 멀티 게임 위키, 실시간 파티 추천, 돌파 메타데이터를 통합 서빙하는 고성능 React 18 웹 플랫폼임.

## 📖 구조화된 지식 (Synthesized Content)
- **추출된 패턴:**
  - **멀티 허브 아키텍처**: `hsr-hub`(붕괴: 스타레일), `ww-hub`(명조), `nte-hub`(이환) 3대 게임 허브 체제 완비.
  - **멀티 게임 비주얼 파티 빌더 (`AdminPartyManager.tsx`)**: 
    - 슬롯 자동 전환(3인 vs 4인), 1-Click 복제, 대체 캐릭터 중복 방지 필터.
    - 슬롯 우선 배치 ➡️ 배치 전용 메인 딜러 토글 카드 워크플로우.
    - 본체/대체 캐릭터별 성혼 및 돌파(`breakthrough`) 추천 시스템 및 황금 뱃지 렌더링.
    - 특수 기호(`•`, `·`) 및 슬롯 캐릭터명 원클릭 삽입 칩, 자동완성 엔진.
    - `h-[650px]` 고정 모달 컨테이너 UX.
  - **3단계 실시간 데이터 동기화 파이프라인**:
    - 1순위 Supabase Cloud Realtime ➡️ 2순위 localStorage 0ms 무지연 캐싱 ➡️ 3순위 TypeScript 직렬화 코드 내보내기.
  - **비즈니스 규정 준수 (AdSense Compliance)**: `PrivacyPolicy`, `TermsOfService`, `ContactUs` 3종 필수 정책 페이지 및 동적 `sitemap.xml`, `prerender-meta.js` 사전 렌더링.
  - **데이터베이스 자동화**: Notion API 크롤링 스크립트 및 jsDelivr/GitHub CDN 이미지 정규화.

## ⚠️ 모순 및 업데이트 (Contradictions & RL Update)
- **과거 데이터와의 충돌:** 정적 TypeScript 상수에 의존하던 파티 추천을 Supabase 및 localStorage 0ms 캐시와 결합하여 실시간 반응형 아키텍처로 진화시킴.
- **정책 변화:** 파티 데이터 작성 시 슬롯 캐릭터를 먼저 배치한 후 메인 딜러를 선택하는 워크플로우를 기본 표준으로 정립함.

## 🔗 지식 연결 (Graph)
- **Parent:** [[🛠️ Projects]]
- **Related:** [[development-roadmap]], [[developer-guide]], [[docs/guides/party_builder_guide|party_builder_guide]]
- **Raw Source:** [[README.md]]
