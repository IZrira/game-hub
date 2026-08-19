# 🌐 RIRA Game Hub 프로젝트 개요 (Project Overview)

**[ID]** `RIRA-GH-20260819`
**[Confidence Score]** 1.0 (최신 상태)
**[Reinforced Date]** 2026-08-19
**[Source]** `00_Raw/` & `common-hub/`, `hsr-hub/`, `ww-hub/`, `nte-hub/`

---

## 📌 프로젝트 핵심 아키텍처 및 현황 (Current Architecture & Status)

### 1. 멀티 게임 지원 및 허브 모듈화
* **붕괴: 스타레일 (HSR)**: 턴제 4인 파티, 운명의 길/속성 시너지, 실시간 티어표 및 돌파 뱃지 추천 시스템.
* **명조: 워더링 웨이브 (WW)**: 3인 고정 파티, 공명 체인 및 에코 시너지 덱.
* **Neverness to Everness (이환 - NTE)**: 4인 속성 시너지 파티, 어반 오픈월드 특화 데이터베이스.

### 2. 멀티 게임 비주얼 파티 빌더 (`AdminPartyManager.tsx`)
* **슬롯 자동 전환**: 게임 전환 시 슬롯 규격(3인 vs 4인) 즉각 동기화.
* **슬롯 우선 배치 워크플로우**: 슬롯에 캐릭터를 먼저 배치하면, 2단계에서 오직 배치된 캐릭터들만 메인 딜러 토글 카드로 노출되어 원클릭 선택 가능.
* **돌파(Breakthrough) 추천 시스템**: 슬롯 본체 및 대체 캐릭터별 성혼/돌파(`명함`, `1돌+`, `2돌+`, `2돌 필수`, `풀돌`) 개별 지정 및 황금빛 뱃지 렌더링.
* **특수 문자 및 이름 원클릭 도구**: `•` (불릿), `·` (가운뎃점) 삽입 버튼, 슬롯 캐릭터명 원클릭 삽입 칩 (`[+ 천야•블레이드]`), `[✨ 파티명 자동완성]` 기능 탑재.
* **고정 높이 검색 UX**: `h-[650px]` 고정 모달 컨테이너로 타이핑 시 레이어 출렁임 완전 방지.

### 3. 3단계 오프라인 퍼스트 실시간 데이터 동기화 파이프라인
1. **1순위 (Supabase Realtime Cloud)**: `party_recommendations`, `tier_lists` 테이블을 통한 무중단 실시간 동기화.
2. **2순위 (localStorage 0ms Synchronous Cache)**: 수정 사항이 브라우저에 `0ms`로 즉시 저장 및 로드되어 오프라인에서도 즉시 렌더링.
3. **3순위 (TypeScript Code Exporter)**: `exportPartyToTSCode()` 직렬화 엔진으로 `[코드 내보내기]` 원클릭 클립보드 복사 ➡️ 소스코드 영구 병합.

---

## 📂 폴더 구조 (Directory Layout)
```plaintext
root/
├── common-hub/             # [공용] 메인 라우터, 관리자 대시보드(AdminPartyManager), 전역 컴포넌트, types/party.ts
├── hsr-hub/                # [붕괴: 스타레일] 추천 파티(PartyRecommendations), 티어표, 상세 가이드
├── ww-hub/                 # [명조] 추천 파티(PartyRecommendations), 에코/무기 데이터베이스
├── nte-hub/                # [이환] 신규 허브 컴포넌트 및 가이드
├── scripts/                # Notion API 동기화, 사이트맵 생성, 메타태그 사전 렌더링(prerender-meta.js)
├── 00_Raw/                 # [불변] 사용자로부터 입력된 가공되지 않은 모든 원본 데이터
├── 10_Wiki/                # [Obsidian Vault] 의사결정 기록(work-log), 캐릭터 위키, 프로젝트 가이드
├── 20_Meta/                # [Obsidian Meta] 인덱스, 대시보드, 시스템 정책
└── docs/                   # 개발 가이드, 설계 표준, 마일스톤 리포트
```