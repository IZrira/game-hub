# SEO 개선 1차: NTE 파티 초기/최종 메타 일관성

## 변경 범위

- `common-hub/data/ntePartySeo.js`: 제목·설명·H1·canonical 상대 경로의 공용 원본 추가.
- `nte-hub/pages/PartyRecommendations.tsx`: 공용 원본으로 제목·설명·H1을 출력. 기존 파티 구성·정렬·여백·카드 크기 유지.
- `scripts/prerender-meta.js`: 같은 원본으로 초기 HTML 생성.
- `scripts/audit-prerender-seo.js`: 빌드 산출물의 제목·설명·H1 불일치를 배포 전 차단.
- `tests/nte-page-seo.test.tsx`: 실제 React 출력과 공용 원본 일치, 기존 파티 목록 보존 검사.

## 검증

- `npm run typecheck`: 통과.
- `npm run build`: 통과. 985개 초기 HTML 생성, 사이트맵 890개 SEO 감사 및 성능 예산 통과.
- 전체 테스트: 57개 파일, 403개 테스트 통과. 첫 샌드박스 실행은 임시 변환 파일 ENOENT로 실패했으며, 권한 승인 후 제한 밖 재실행에서 통과했다.
- 로컬 production 미리보기에서 실제 한국어 제목·설명·H1 및 운영 canonical을 확인하고 화면을 직접 검토했다.
- `git diff --check`: 오류 없음. Windows LF/CRLF 안내는 남는다.
- Notion 동기화 미실행. 빌드가 읽은 기존 Notion JSON은 새 동기화가 아니다.

## 변경 범위 독립 검토

프로젝트 규칙에 따라 별도 에이전트 3개가 같은 변경을 읽기 전용으로 검토했다.

- 성능: 새 요청·effect·라이브러리 없이 문자열 4개만 공유. 차단 문제 없음. 실제 CWV나 로딩 가속률은 미측정.
- 보안: 고정 공개 문자열이며 기존 React 텍스트 및 초기 HTML escaping 유지. 권한·secret 변경 없음. 운영 침투 검사는 하지 않음.
- 디자인: 한국어 H1과 설명의 일관성 개선, 기존 레이아웃·파티 데이터 보존. 별도 담당은 정적 검토, 주 담당은 실제 데스크톱 렌더링 확인. 모바일 전수 검사는 미수행.

## 남은 작업

이 수정은 Search Console Soft 404의 해제 보장이 아니다. Google 저장 화면과 현재 실시간 렌더링 비교, 재크롤링 결과 관찰이 별도로 필요하다. 이번에는 색인 요청·유효성 재검사·사이트맵 재제출을 실행하지 않았다.

WW 무기 2개와 나머지 Soft 404 예시, 발견됨 미색인 선별 및 lastmod 개선은 이번 변경에 포함하지 않았다. 기존 SEO 전체 보고서의 수치는 당시 관찰 기록으로 유지한다.
