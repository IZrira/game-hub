# 🪐 Rira Game Hub & P-Reinforce: Autonomous Knowledge Engine

> **"파편화된 게임 데이터를 모아 거대한 지식의 우주를 구축합니다."**

이 프로젝트는 최신 프론트엔드 스택(React, Vite, Tailwind CSS)으로 구축된 **통합 게임 정보 위키 (Rira Game Hub)**와 이를 자동화하는 **자율형 지식 엔진 (P-Reinforce)**의 결합체입니다. 사용자가 던지는 파편화된 데이터나 스크립트를 에이전트가 해석하고, 구조화하며, 시각적으로 매력적인 웹사이트로 렌더링합니다.

---

## 🎮 주요 서비스 도메인 (Game Hubs)

현재 Rira Game Hub는 3개의 주요 게임 도메인을 지원 및 확장 중입니다:

1. **Honkai: Star Rail (붕괴: 스타레일 - HSR)**: 턴제 메커니즘, 속성/운명의 길, 상세 티어 리스트 및 파티 조합 가이드.
2. **Wuthering Waves (명조 - WW)**: 실시간 액션, 공명 체인, 에코 데이터, 복잡한 스킬 콤보 가이드.
3. **Neverness to Everness (이환 - NTE)**: 신규 추가된 게임 아카이브. GitHub CDN과 호환성을 위해 에셋 호출 시 특수 문자(`:`)를 안전하게 언더바(`_`)로 자동 파싱하는 로직 탑재.

---

## 📌 주요 기능 및 아키텍처 요약

1. **멀티 도메인 허브 구조 (Multi-Hub Architecture)**:
   - `common-hub`: 전역 상태, 디자인 토큰, Footer, 라우터, Asset Manager 공유.
   - `hsr-hub`, `ww-hub`, `nte-hub`: 각 게임별 특화 로직 및 UI 분리.
2. **비동기 데이터 동기화 (Notion API)**:
   - `fetch-notion-data.js` 스크립트가 Notion 데이터베이스를 정기적으로 크롤링하여 로컬 JSON 스키마로 변환합니다.
3. **소셜 로그인 및 보안 리뷰 시스템 (Supabase)**:
   - Google 및 Discord OAuth 로그인을 지원하는 완벽한 인증 모달 시스템 구축.
   - 캐릭터 리뷰 및 댓글 작성 시 작성자 본인만 수정/삭제 가능하도록 데이터베이스 레벨의 행 수준 보안(RLS) 적용.
4. **SEO 및 수익화 호환성 (AdSense Compliance)**:
   - 검색 엔진 최적화(SEO)를 위한 `sitemap.xml` 동적 생성 및 `prerender-meta.js` 구동.
   - 구글 애드센스 승인을 위한 필수 보안/정책 페이지 완비 (`Privacy Policy`, `Terms of Service`, `Contact Us`).
5. **P-Reinforce 지식 엔진**:
   - `00_Raw/` 폴더에 입력된 원시 데이터를 `10_Wiki/` 폴더의 구조화된 마크다운으로 자동 변환.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (글래스모피즘 및 다크 모드 특화), Framer Motion, Lucide React
- **Data Layer**: JSON 정적 데이터 + Notion API
- **Backend & Auth**: Supabase (PostgreSQL, OAuth, RLS)
- **CDN**: GitHub Raw Content (IZrira/riragameinfo)

---

## 📂 프로젝트 구조 (Project Structure)

```plaintext
root/
├── common-hub/             # [공용] 메인 라우터, 전역 컴포넌트, 디자인 시스템, 유틸리티
├── hsr-hub/                # [붕괴: 스타레일] 특화 컴포넌트 및 데이터베이스
├── ww-hub/                 # [명조] 특화 컴포넌트 및 데이터베이스
├── nte-hub/                # [이환] 신규 허브 컴포넌트
├── scripts/                # 데이터 페칭, 사이트맵 생성, 메타태그 주입 등 빌드 파이프라인
├── 00_Raw/                 # [불변] 가공되지 않은 사용자 데이터
├── 10_Wiki/                # [자동 구조화] 에이전트가 관리하는 개발 지식/위키 마크다운 층
└── .github/                # GitHub Sync 및 워크플로우
```

---

## 📞 문의 및 비즈니스 (Contact)

본 프로젝트의 법적, 상업적 문의 또는 구글 애드센스/파트너십 관련 사항은 아래 공식 이메일로 소통하실 수 있습니다:
- **Email**: [rira.game.hub@gmail.com](mailto:rira.game.hub@gmail.com)

---
*Powered by Rira Archive & P-Reinforce AI Engines.*
