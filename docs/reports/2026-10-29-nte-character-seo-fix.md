# NTE 캐릭터 검색 메타데이터 정합성 수정

## 범위와 원인

사용자가 승인한 1차 범위만 반영했다. NTE 캐릭터 상세에서 스타레일의 광추·유물·운명의 길 문구를 생성하던 복사된 SEO 코드가 원인이었다. Notion 데이터나 번역을 바꾸지 않아도 재현됐다. 초기 HTML은 이환 설명이었지만 React는 다른 게임 설명과 화면에 없는 FAQ를 생성하고 있었다.

수정 전에 감정사·아카네 린의 실제 페이지 컴포넌트를 렌더링하는 회귀 테스트를 추가했다. 번역을 입력 그대로 고정하고 SEO props를 캡처했을 때 두 테스트 모두 잘못된 스타레일 설명으로 실패했다. 원래 있던 canonical 등 4개 테스트는 통과했다. 이는 자료 오류가 아니라 페이지 SEO 생성 경로의 결함이라는 재현 증거다.

## 변경

- `common-hub/utils/nteCharacterSeo.js`: 의존성 없는 공통 title·description·이름 canonical 함수.
- `nte-hub/pages/CharacterDetail.tsx`: 공통 함수를 사용하고 잘못된 비표시 FAQ 생성·주입 제거. 본문·스탯·추천·스타일은 유지.
- `scripts/prerender-meta.js`: NTE 상세 초기 HTML도 같은 함수를 사용.
- `scripts/audit-prerender-seo.js`: 모든 NTE 캐릭터 경로의 title·description·canonical 일치와 숨은 FAQ 부재를 빌드에서 검사.
- `tests/nte-page-seo.test.tsx`: 대표 2명의 실제 페이지 SEO 입력 회귀 검사.
- `tests/nte-character-head.test.tsx`: DOM 환경의 초기 head 인계·SPA 이동·언어 query canonical·인증 태그 보존·FAQ 부재, 전체 24명의 공통 메타데이터 검사.

언어 query는 기존 한국어 canonical에 통합하는 정책을 유지했다. 공통 메타데이터는 번역된 표시명이 아닌 원본 이름을 사용해 빌드 시점과 일치시킨다. 새 FAQ 화면이나 구조화 데이터를 임의로 만들지 않는다.

## 검증

- 수정 전 대표 2개 테스트 실패 → 수정 후 통과.
- TypeScript 통과.
- npm run build 통과. 사이트맵 894개 경로 SEO 감사·성능 예산 통과.
- 관련 4개 파일 40개 테스트 통과, 전체 71개 파일 553개 테스트 통과.
- 빌드 결과 NTE 상세 24개를 별도 파싱해 공통 메타데이터와 일치, FAQPage 부재 확인.
- 성능·보안·콘텐츠 담당 별도 에이전트 3개의 범위 한정 정적 검토에서 새 결함 없음. 전체 사이트 감사나 실측 결과는 아님.
- git diff 확인 및 공백 검사 수행. 생성된 사이트맵의 무관한 날짜 갱신은 원래 값으로 복원.

## 제한과 보존

인앱 브라우저는 연결 도구 초기화 단계에서 실패해 실제 브라우저 렌더 후 head·모바일 화면은 미검증이다. DOM 테스트는 실제 브라우저 검사로 표현하지 않는다. 배포 후 운영 초기 HTML과 CI·Cloudflare는 별도로 확인해 완료 보고한다.

Notion 동기화·운영 DB 변경·인증 설정 변경·신규 콘텐츠 작성 없음. 기존 AGENTS.md 수정과 다른 미추적 보고서는 커밋에서 제외한다. 이번 수정이 Google 색인이나 순위 상승을 보장하지 않으며, 기존 Search Console 판정의 해제 여부는 이후 재크롤링과 보고서를 확인해야 한다.
