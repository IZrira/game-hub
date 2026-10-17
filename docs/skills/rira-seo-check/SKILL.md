---
name: rira-seo-check
description: RIRA Game Hub에서 SEO점검, 색인·canonical·사이트맵·검색용 초기 HTML 분석을 요청할 때 사용한다. 광고 계정 운영이나 검색 노출 보장은 다루지 않는다.
---

# SEO점검

호출: `SEO점검` 또는 `$rira-seo-check`. RIRA 프로젝트 원본은 `D:\rira game hub\game-hub`이며 다른 경로에서는 Git remote가 `IZrira/game-hub`인지 확인한다.

프로젝트 루트 AGENTS.md와 git status를 확인하고 대상 URL·게임·배포 commit을 고정한다. 기본은 읽기 전용 진단이다. 수정·색인 요청·계정 설정 변경은 사용자의 현재 범위에서만 한다.

1. 지정된 URL과 관련 허브부터 검사한다. HTTP 상태·redirect·robots·noindex·canonical·사이트맵 포함 여부를 확인한다. 의도된 제외와 우발적 제외를 구분한다.
2. 서버가 주는 초기 HTML과 앱 렌더 후 title·description·canonical·H1·본문·내부 링크를 대조한다. 빈 로더나 잘못된 fallback을 정상 콘텐츠로 판단하지 않는다. 구조화 데이터는 실제 본문과 일치하는지만 검토하고 임의 평점·FAQ·리뷰를 만들지 않는다.
3. Search Console 접근이 허용되면 최신 보고서의 갱신일·속성·대상 URL을 확인한다. 배포일과 마지막 크롤링일을 구분하고, 현재 사이트 정상과 Google 재처리 완료를 혼동하지 않는다. 접근 불가 시 실제 보고서를 본 것처럼 수치·원인을 추정하지 않는다.
4. 공략의 검색 의도·중복·정보 누락과 허브 탐색 구조를 확인한다. 글자 수를 채우려고 문장을 늘리거나 얇은 페이지를 대량 생성하지 않는다. 수정 시 로컬 원본을 보존하고 Notion은 명시적 동기화 요청이 있을 때만 실행한다.
5. 구현을 변경했다면 현재 package.json과 AGENTS.md의 검증·Git·배포 절차를 따른다. 사이트맵·초기 HTML 생성과 빌드 내 SEO 감사 결과를 확인하고 중복 검사를 반복하지 않는다. 이미 정상인 URL의 사이트맵 재제출이나 색인 요청을 무조건 수행하지 않는다.

소유권 태그 문제일 때만 docs/guides/SEARCH_CONSOLE_VERIFICATION.md를 읽는다. 인증 태그·기존 소유자·DNS·계정 권한을 임의 변경하지 않는다.

보고는 확인 범위, 실제 오류, 중요도, 개선안, 미검증·Google 재처리 대기 항목 순으로 짧게 한다. 검색 순위·AdSense 승인·색인 기한을 보장하지 않는다.

참고가 필요할 때만 [marketingskills의 SEO 관련 원본](https://github.com/coreyhaines31/marketingskills)을 확인한다. 광고·전체 마케팅 묶음을 자동 실행하지 않는다.
