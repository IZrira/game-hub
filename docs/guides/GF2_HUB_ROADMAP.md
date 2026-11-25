# GF2(소녀전선2: 망명) 허브 로드맵

2026-11-26 비공개로 시작했다. 이 문서는 현재 상태와 공개 전·후에 추가할 부분을 정리한다. 디자인은 `DESIGN.md`, 작업 절차는 `AGENTS.md`를 따른다.

## 1. 현재 상태 (비공개 1단계)

- 경로: `/gallery/gf2`(허브 홈), `/gallery/gf2/dolls`(인형 도감), `/gallery/gf2/character/<이름>`(인형 상세)
- 모든 페이지가 `noindex, nofollow`이고 "준비 중" 안내를 띄운다. 홈 게임 카드·푸터·통합 검색·사이트맵에는 넣지 않았다. 열 수 있는 경로로만 `functions/generated-routes.ts`에 등록된다(`scripts/generate-sitemap.js`의 앱 전용 경로).
- 코드: `gf2-hub/`
  - `pages/Hub.tsx`: `HubIntro` 기반 소개·검색·바로가기 → 최근 출시 인형 3명(약점 포함) → 직업·속성별 인원 → 최신 인형 8명
  - `pages/Dolls.tsx`: 검색, 레어도·직업·속성·무기 필터(`button` + `aria-pressed`, URL 쿼리 유지), 출시순·최신순·이름순 정렬
  - `pages/DollDetail.tsx`: 일러스트·직업·속성·약점·프로필 → 기본 능력치 → 섹션 목차 → 스킬(소환물·교체 스킬 포함) → 마인드 보강 → 뉴럴 헬릭스 → 결합키·리몰딩 코어 → 의상 → 용어
  - `utils/gf2Data.ts`: 이미지 경로, 인형별 상세 지연 로딩, Notion 원문 텍스트 파서
- 데이터: Notion "소녀전선2 캐릭터 도감 DB"(62명) → `gf2-hub/data/dolls.json`(원본 스냅샷) → `gf2-hub/data/generated/summary.json`(목록용) + `generated/dolls/NNN.json`(인형별, 파일명은 출시 순서)
  - 갱신: `npm run sync:gf2`. 빌드·`sync:notion`에는 포함하지 않는다.
  - 원본 스냅샷만 고쳤을 때는 `node scripts/fetch-gf2-data.js --split-only`로 화면용 파일만 다시 만든다.
- 이미지: `IZrira/riragameinfo`의 `gf2 images/`(초상·스킬·고유키·결합키·직업·속성·탄종 아이콘). 저장소 폴더 이름이 Notion과 다른 인형은 `fetch-gf2-data.js`의 `IMAGE_FOLDER`에서 맞춘다(사이엔→샤이엔, 엘바→앨바).

## 2. 공개 전에 해결할 것

1. **Notion 통합 공유**: 「Rira-Game-Hub-DB」 통합에 GF2 DB가 공유돼 있지 않아 `npm run sync:gf2`가 `object_not_found`로 실패한다. 2026-11-26 데이터는 Notion 커넥터로 읽어 만들었다. Notion에서 GF2 DATA 페이지의 연결에 통합을 추가해야 이후 갱신을 스크립트로 할 수 있다(계정 권한 작업이라 사용자가 진행).
2. **누락 이미지**: 네메시스·연광, 보이마스티나 초상이 저장소에 없어 공통 대체 이미지가 보인다. 공용키 아이콘(예: 킬링 비전)과 일부 추가 의상 이미지도 없다(없으면 화면에서 숨김).
3. **데이터 정리**
   - 그로자 무기가 「돌격 소총」(띄어쓰기)이다. 목록 필터는 공백을 지워 묶지만 Notion 원문도 맞추는 게 좋다.
   - 페리티아 결합도 보상은 결약 미구현(한국·글로벌)으로 비어 있다.
   - 초기 입력 인형(콜펜 등)은 스킬 탄종이 별도 줄, 최근 인형은 태그 줄에 있다. 파서가 둘 다 처리하지만 형식 통일을 권장한다.
4. **검색 노출 전환(정식 공개)**
   - `SEO`의 `noindex` 제거, 제목·설명 문구를 `common-hub/utils/pageSeo.js`에 GF2 항목으로 추가
   - `scripts/generate-sitemap.js`: 앱 전용 경로 대신 `sitemap-gf2.xml`로 등록(`lastmod`는 데이터 날짜 기준)
   - `scripts/prerender-meta.js`: 허브·도감·인형 62명의 검색용 초기 HTML(제목·설명·H1·본문 요약·내부 링크)
   - `scripts/audit-prerender-seo.js`: GF2 허브·대표 인형을 감사 대상에 추가
   - 홈 게임 카드(`common-hub/pages/Home.tsx`), 푸터 링크, `common-hub/data/archive.ts`, `GameId` 타입, 통합 검색 데이터(`scripts/generate-search-data.js`), 홈 수치(`home-stats.json`)
   - `rira-seo-check`로 초기 HTML·canonical·사이트맵을 점검하고, 공개 공지 초안(`[GF2]`, Notice) 작성
5. **화면 검수**: `rira-ui-check`로 다른 허브와 카드·여백·글자 크기 비교, 키보드 이동·포커스 확인

## 3. 공개 후 추가할 콘텐츠

데이터가 있는 순서로 정리했다.

1. **용어 사전 페이지**: 인형별 `용어`를 합쳐 중복을 없앤 공통 용어 목록(도발·독장·엄호 등). 상세 페이지 스킬 본문의 용어에 툴팁 연결.
2. **직업·속성 정리**: 직업 4종 역할, 위상 속성 7종과 탄종 5종, 약점 구조. 인형 목록과 연결.
3. **무기·파츠 도감**: 저장소에 무기 7종·파츠 16종 이미지가 있다. 이름·효과 데이터를 Notion에 먼저 정리해야 한다.
4. **지원 소대**: 저장소에 8종 이미지가 있다. 데이터 정리 필요.
5. **공용키·결합키 비교**: 62명의 결합키 이름·능력치(모두 3%)와 공용키 효과 목록.
6. **아이템**: 소모품·선물 이미지가 있다. 선호 선물은 현재 "선물 종류·N"만 있어 개별 선물명 대응이 필요하다.
7. **가이드·티어·파티**: 다른 허브처럼 공략 문서와 관리자 DB(`tier_lists`, `party_recommendations`) 연동. 공략 작성 규칙은 `AGENTS.md`를 따른다.
8. **다국어**: 현재 한국어만. `언어별 표기`(글로벌·중국·일본 이름)는 데이터에 있다.

## 4. 새 인형 추가 순서

1. Notion GF2 DB에 행 추가(기존 입력 양식 + `출시 순서`는 마지막 번호 다음 값)
2. 이미지 저장소 `gf2 images/skills/<이름>/`에 초상·스킬·고유키·결합키·의상 이미지 업로드
3. `npm run sync:gf2`(통합 공유 전에는 커넥터로 읽어 `dolls.json` 갱신 후 `--split-only`)
4. `npm run typecheck`, `npm run build`로 경로 등록·타입 확인 후 화면 점검
