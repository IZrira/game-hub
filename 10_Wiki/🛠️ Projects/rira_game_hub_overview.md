# 🌐 RIRA Game Hub 프로젝트 개요 (Project Overview)

**[ID]** `RIRA-GH-20260416`
**[Confidence Score]** 0.95 (높음)
**[Reinforced Date]** 2024-05-16
**[Source]** `00_Raw/2026-04-16 rira game hub.md`

---

### ✨ Karpathy Summary
rira game hub는 현재 클라우드플레어를 통해 웹 서비스가 운영되고 있으며, 프로젝트의 지식 관리(Wiki), 코딩 백업, 그리고 이미지 자산 관리를 분리된 세 개의 GitHub 저장소를 통해 체계적으로 관리하고 있다.

### 📝 구조화된 지식 (Structured Knowledge)

#### 🚀 1. 서비스 개요 및 운영 상태
*   **프로젝트명:** rira game hub
*   **운영 플랫폼:** Cloudflare Pages
*   **현재 접속 링크:** [https://rira-game-hub.pages.dev/](https://rira-game-hub.pages.dev/)
*   **목표:** (추가 정보 필요 - 서비스의 핵심 목표가 명시되지 않았으나, 게임/콘텐츠 허브 역할 수행)

#### 📂 2. 핵심 리소스 아키텍처 (Resource Architecture)
본 프로젝트는 기능별로 세 개의 독립적인 저장소(Repository)를 활용하여 관리됩니다.

*   **A. 지식 관리 (Wiki):**
    *   **목적:** 프로젝트와 관련된 모든 지식, 문서화, 구조화된 내용을 기록합니다.
    *   **GitHub:** [https://github.com/IZrira/rira-wiki.git](https://github.com/IZrira/rira-wiki.git)
*   **B. 코딩 백업 (Code Backup):**
    *   **목적:** rira game hub의 코드를 버전 관리하고 백업하는 저장소입니다.
    *   **GitHub:** [https://github.com/IZrira/game-hub.git](https://github.com/IZrira/game-hub.git)
*   **C. 이미지 자산 (Image Assets):**
    *   **목적:** 웹 서비스에 사용되는 모든 이미지, 매핑 자료 등의 창고 역할을 합니다.
    *   **GitHub:** [https://github.com/IZrira/riragameinfo.git](https://github.com/IZrira/riragameinfo.git)

### 🔗 지식 연결 (Knowledge Graph)
*   **Parent:** N/A (최상위 프로젝트 개요)
*   **Related:**
    *   [[10_Wiki/🛠️ Projects/rira_game_hub_overview.md]] (자기 참조)
    *   [[20_Meta/Index.md]] (전체 지식 아키텍처와 연결됨)
*   **Source:** `00_Raw/2026-04-16 rira game hub.md`

---

### ♻️ RL 업데이트 및 최근 변경 이력
*   **[2026-05-26] 노션 데이터 연동 아키텍처 개편:**
    *   기존의 노션 페이지 본문(Markdown) 정규식 파싱 방식을 폐기하고, 무기 데이터에 한하여 **노션 데이터베이스 속성(Properties)**(`성장 스텟`, `스킬명`, `스킬 설명`, `돌파 재료`, `무기 스토리`)을 직접 1:1로 매핑하도록 구조를 전면 개편함. 
    *   이에 따라 마크다운 변환(`notion-to-md`)에 소요되던 오버헤드를 대폭 줄여 데이터 동기화(`fetch:notion`) 속도 향상.
*   **[2026-05-26] UI/UX 렌더링 고도화:**
    *   **스킬 수치 강조**: 스킬 설명 내의 변동 수치(예: `12%/15%...`)를 정규식으로 감지하고 렌더러단에서 노란색(Yellow-400)으로 하이라이팅 처리하여 가독성 강화.
    *   **돌파 재료 동기화**: 무기별 하드코딩 방식 대신, 노션 속성(`돌파 재료`) 텍스트 파싱을 최우선으로 사용하여 웹 UI 아이콘 및 수량이 정확히 매칭되도록 보완.
    *   **획득 경로 지원**: Select 및 Multi-select 유형의 속성도 정상적으로 텍스트로 변환되도록 파서 보강.

*   **상태:** 지식 및 코드 합성 완료. (안정성 확보)
*   **권장 사항:** 향후 캐릭터 및 에코 데이터 연동 시에도 본문 파싱이 아닌 속성 기반 매핑으로 전환할 수 있도록 노션 데이터베이스의 점진적 구조화(Refactoring)를 권장함.