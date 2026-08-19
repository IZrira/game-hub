# 🪐 Rira Game Hub & P-Reinforce: Autonomous Knowledge Engine

> **"파편화된 게임 데이터를 모아 거대한 지식의 우주를 구축합니다."**

이 프로젝트는 최신 프론트엔드 스택(React 18, Vite, TypeScript, Tailwind CSS)으로 구축된 **통합 게임 정보 위키 (Rira Game Hub)**와 이를 자동화하는 **자율형 지식 엔진 (P-Reinforce)**의 결합체입니다. 사용자가 던지는 파편화된 데이터나 스크립트를 에이전트가 해석하고 구조화하며, 시각적으로 매력적이고 고성능인 웹 애플리케이션으로 렌더링합니다.

---

## 🎮 주요 서비스 도메인 (Game Hubs)

현재 Rira Game Hub는 3개의 주요 게임 도메인을 완벽 지원 및 확장 중입니다:

1. **Honkai: Star Rail (붕괴: 스타레일 - HSR)**: 턴제 메커니즘, 속성/운명의 길, 실시간 동기화 티어표, 고도화된 파티 조합 추천 및 캐릭터별 시너지 덱.
2. **Wuthering Waves (명조 - WW)**: 실시간 액션, 공명 체인(돌파), 에코 데이터, 복잡한 스킬 콤보 및 3인 파티 조합 빌더.
3. **Neverness to Everness (이환 - NTE)**: 신규 추가된 어반 오픈월드 RPG 아카이브. 특수 문자 치환, 4인 속성 시너지 파티 추천 탑재.

---

## 📌 주요 기능 및 아키텍처 요약

1. **멀티 도메인 허브 구조 (Multi-Hub Architecture)**:
   - `common-hub`: 전역 상태, 디자인 토큰, Footer, 메인 라우터, Asset Manager, 통합 관리자 대시보드 (`/admin`).
   - `hsr-hub`, `ww-hub`, `nte-hub`: 각 게임별 특화 로직, 데이터베이스 및 독립 UI 층.
2. **멀티 게임 파티 빌더 & 돌파 추천 엔진 (Admin Party Builder)**:
   - 각 게임별 슬롯 규격 자동 동기화 (스타레일/이환: 4인 고정, 명조: 3인 고정).
   - **슬롯 우선 배치 ➡️ 배치된 캐릭터 전용 메인 딜러 토글 카드** 워크플로우.
   - **돌파 추천 시스템 (`breakthrough`)**: 명함, 1돌+, 2돌+, 2돌 필수, 풀돌 등 본체 및 대체 캐릭터별 개별 성혼/돌파 수치 지정.
   - **특수기호(`•`, `·`) 및 캐릭터명 원클릭 삽입 칩 + 파티명 자동완성 엔진**.
   - 고정 높이 컨테이너(`h-[650px]`) 기반 흔들림 없는 고속 캐릭터 검색 모달.
3. **3단계 오프라인 퍼스트 실시간 데이터 동기화 (3-Tier Sync Architecture)**:
   - **1순위 (Supabase Cloud)**: `party_recommendations`, `tier_lists` 테이블을 통한 무중단 실시간 동기화.
   - **2순위 (localStorage Cache)**: `0ms` 지연 없는 즉각적인 로컬 캐싱 및 브라우저 즉시 렌더링.
   - **3순위 (TypeScript Code Exporter)**: `exportPartyToTSCode()` 직렬화 엔진으로 `[코드 내보내기]` 원클릭 클립보드 복사 ➡️ 소스코드 영구 병합.
4. **비동기 데이터 동기화 (Notion API)**:
   - `fetch-notion-data.js` 스크립트가 Notion 데이터베이스를 정기적으로 크롤링하여 로컬 JSON 스키마로 변환.
5. **소셜 로그인 및 보안 리뷰 시스템 (Supabase Auth & RLS)**:
   - Google 및 Discord OAuth 로그인을 지원하는 완벽한 인증 시스템.
   - 캐릭터 리뷰 및 댓글 작성 시 작성자 본인만 수정/삭제 가능하도록 행 수준 보안(RLS) 적용.
6. **SEO 및 구글 애드센스 호환성 (AdSense Compliance)**:
   - 검색 엔진 최적화(SEO)를 위한 `sitemap.xml` 동적 생성 및 `prerender-meta.js` 정적 사전 렌더링.
   - 구글 애드센스 필수 보안/정책 페이지 완비 (`Privacy Policy`, `Terms of Service`, `Contact Us`).
7. **Obsidian Vault 연동 P-Reinforce 지식 엔진**:
   - `00_Raw/` ➡️ `10_Wiki/` ➡️ `20_Meta/` 3단계 지식 정제 파이프라인.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (글래스모피즘 및 다크 모드 특화), Framer Motion, Lucide React
- **Data Layer**: JSON 정적 데이터 + Notion API + Supabase Realtime
- **Backend & Auth**: Supabase (PostgreSQL, OAuth, RLS)
- **CDN**: jsDelivr / GitHub Raw Content (IZrira/riragameinfo)

---

## 📂 프로젝트 구조 (Project Structure)

```plaintext
root/
├── common-hub/             # [공용] 메인 라우터, 관리자 대시보드(AdminPartyManager), 전역 컴포넌트, 유틸리티
│   ├── components/         # AdminPartyManager, LazyImage, Navbar, Footer, PageHeader 등
│   ├── types/              # party.ts (UnifiedPartyData 유니온), game.ts 등
│   └── utils/              # imageHelper, synergyManager, safeEncodeURIComponent 등
├── hsr-hub/                # [붕괴: 스타레일] 특화 컴포넌트, 데이터베이스, 추천 파티(PartyRecommendations)
├── ww-hub/                 # [명조] 특화 컴포넌트, 데이터베이스, 추천 파티(PartyRecommendations)
├── nte-hub/                # [이환] 특화 컴포넌트 및 데이터베이스
├── scripts/                # Notion 데이터 페칭, 사이트맵 생성, 메타태그 사전 렌더링(prerender-meta.js)
├── 00_Raw/                 # [불변] 가공되지 않은 사용자 데이터
├── 10_Wiki/                # [Obsidian Vault] 프로젝트 지식, 의사결정 기록(work-log), 캐릭터 위키
├── 20_Meta/                # [Obsidian Meta] 인덱스, 대시보드, 시스템 정책
└── .github/                # GitHub Sync 및 CI/CD 워크플로우
```

---

## 📞 문의 및 비즈니스 (Contact)

본 프로젝트의 법적, 상업적 문의 또는 구글 애드센스/파트너십 관련 사항은 아래 공식 이메일로 소통하실 수 있습니다:
- **Email**: [rira.game.hub@gmail.com](mailto:rira.game.hub@gmail.com)

---
*Powered by Rira Archive & P-Reinforce AI Engines.*
