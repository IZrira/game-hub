# 🌐 RIRA Game Hub 프로젝트 개요 (Project Overview)

**[ID]** `RIRA-GH-20260819`
**[Confidence Score]** 1.0 (최상)
**[Reinforced Date]** 2026-08-19
**[Source]** `00_Raw/` & `common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/`

---

### ✨ Karpathy Summary
rira game hub는 Cloudflare Pages를 통해 글로벌 서비스 중이며, 멀티 게임 위키(HSR, WW, NTE), 관리자 실시간 비주얼 파티 빌더, 돌파(Breakthrough) 추천 엔진, 그리고 3단계 오프라인 퍼스트 동기화 파이프라인(Supabase + localStorage 0ms + TypeScript Code Exporter)을 완비한 차세대 웹 아카이브 플랫폼이다.

### 📝 구조화된 지식 (Structured Knowledge)

#### 🚀 1. 서비스 개요 및 운영 상태
* **프로젝트명:** rira game hub
* **운영 플랫폼:** Cloudflare Pages
* **현재 접속 링크:** [https://rira-game-hub.pages.dev/](https://rira-game-hub.pages.dev/)
* **지원 도메인:** 붕괴: 스타레일(HSR), 명조(WW), 이환(NTE)

#### 📂 2. 핵심 리소스 아키텍처 (Resource Architecture)
* **A. 지식 관리 (Wiki / Obsidian Vault):**
  * **목적:** 프로젝트 지식, 의사결정 기록, 캐릭터 메커니즘 위키 보관.
  * **GitHub:** [https://github.com/IZrira/rira-wiki.git](https://github.com/IZrira/rira-wiki.git)
* **B. 웹 애플리케이션 (Code Backup):**
  * **목적:** Rira Game Hub 웹 프론트엔드 및 관리자 시스템 소스코드 버전 관리.
  * **GitHub:** [https://github.com/IZrira/game-hub.git](https://github.com/IZrira/game-hub.git)
* **C. 이미지 및 에셋 (Image Assets):**
  * **목적:** 고화질 캐릭터 일러스트, 광추/무기/에코/유물 이미지 및 스킬 아이콘 CDN 서빙.
  * **GitHub:** [https://github.com/IZrira/riragameinfo.git](https://github.com/IZrira/riragameinfo.git)

### 🔗 지식 연결 (Knowledge Graph)
* **Parent:** [[20_Meta/Index.md]]
* **Related:**
  * [[10_Wiki/🛠️ Projects/rira-game-hub/developer-guide.md]]
  * [[10_Wiki/🛠️ Projects/rira-game-hub/development-roadmap.md]]
  * [[10_Wiki/⚖️ Decisions/History/work-log.md]]
  * [[docs/guides/party_builder_guide.md]]
* **Source:** `00_Raw/`

---

### ♻️ RL 업데이트 및 최근 변경 이력
* **[2026-08-19] 멀티 게임 파티 빌더 & 돌파 추천 엔진 완성:**
  * **슬롯 동기화**: 스타레일/이환(4인) 및 명조(3인) 슬롯 자동 전환 및 1-클릭 파티 복제.
  * **슬롯 우선 배치 워크플로우**: 1단계 슬롯 멤버 배치 ➡️ 2단계 배치 전용 메인 딜러 토글 카드 원클릭 선택.
  * **돌파(Breakthrough) 추천 시스템**: 슬롯/대체 캐릭터별 성혼 및 돌파(`명함`, `1돌+`, `2돌+`, `2돌 필수`, `풀돌`) 지정 및 황금 뱃지 렌더링.
  * **타이핑 도구 & 고정 검색**: `•`, `·` 삽입, 슬롯 캐릭터명 원클릭 칩, 자동완성 버튼, `h-[650px]` 고정 모달.
  * **3단계 실시간 동기화**: Supabase Realtime + localStorage 0ms 무지연 캐싱 + TypeScript 코드 내보내기.
* **[2026-06-09] 신규 에코 데이터 추가 및 명조 시스템 고도화**
* **[2026-05-29] HSR 4.3 신규 캐릭터 및 장비 데이터 통합**