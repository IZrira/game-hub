# 우선 개선 구현 및 검증 — 2026-10-16

기준 커밋: `a7e6c0ae42ec19d230c0ae233762a599638b37e7`, production branch `main`.
원본 프로젝트에서 기존 SEO/NTE 수정과 이번 성능·보안·디자인 개선을 통합했다. Notion 동기화, 원본 게임 데이터 수정, 수동 중복 배포는 하지 않았다.

## 구현

- SEO: React head 인계 시 기존 정적 태그와 클라이언트 태그의 중복을 제거한다. 소유권 확인·CSP·리소스 태그는 유지한다. JSON-LD 문자를 안전하게 직렬화한다. NTE 캐릭터 canonical과 파티 페이지의 초기 HTML·현재 로컬 파티 콘텐츠를 일치시킨다.
- NTE: 파티 페이지 모바일 flex 방향을 바로잡아 본문이 화면 밖으로 밀리지 않도록 한다. 기존 6개 파티와 추천 멤버는 유지한다.
- HSR: 전체 캐릭터 DB를 상세 페이지에 가져오지 않고 선택한 캐릭터의 해시 JSON을 로드한다. 장비·시너지 지연 섹션의 전체 DB 우회 참조도 분리한다. 93명 원본 객체, 영문 대체, 장비 효과, 추천 순서 보존 회귀 검사를 추가한다.
- 디자인·접근성: 검색 대화상자 이름·입력 라벨·포커스 가두기·닫은 후 복귀를 보강한다. WW 속성 아이콘을 실제 파일명으로 수정한다. 애니모 검색 무결과 상태에 초기화 버튼을 추가한다. 기존 디자인과 데이터는 유지한다.
- 웹 보안: Functions가 만드는 301/404/410 응답에도 기존 전역 보안 헤더를 적용한다. CSP 허용 범위를 확대하지 않는다. 상태·쿠키·본문·Location·기존 private/no-store 캐시를 보존한다. 성공한 공개 해시 JSON만 immutable 캐시한다.
- 유지 관리: 생성 스크립트와 자동 테스트에 선택 로딩 경로를 연결하고 개별 HSR JSON 40,000 bytes 예산을 추가한다. 기존 예산은 올리지 않았다. 사이트맵 인덱스 날짜를 갱신했다.

수정 파일은 공통 SEO/검색·후기 UI, HSR 상세/장비/시너지와 생성 manifest, NTE 상세/파티, WW 상세 아이콘, 애니모 Gallery, Functions, 생성·감사 스크립트, 테스트, 성능/보안 가이드이다. 전체 경로는 해당 Git 커밋 diff를 기준으로 확인한다. 기존의 별도 미추적 평가 보고서 10개는 이번 커밋에 포함하지 않는다.

## 자동 검증

- 최종 TypeScript 검사 성공, 전체 49파일 360테스트 성공.
- 최종 production build, SEO 감사, 성능 예산 감사와 diff 공백 검사 성공. GitHub CI·배포 확인은 push 이후 별도로 수행한다.
- 최종 빌드: 초기 JS gzip 139,377 / 170,000 bytes, entry 24,823 / 32,000, CSS 26,946 / 34,000, 최대 chunk 206,386 / 250,000. HSR 상세 최대 28,496 / 40,000 bytes, 가이드 최대 32,376 / 40,000 bytes. 890개 사이트맵 URL, 985개 prerender 문서.
- 동일 Node 기준 기존 로컬 초기 JS보다 665 bytes 증가했다. 전 사이트 초기 로딩이 빨라졌다고 주장하지 않는다. HSR 선택 JSON 분리와 전이 의존 제거가 이번 성능 개선의 핵심이다. 비소 상세 JSON은 raw 9,432 / 로컬 gzip 3,031 bytes이며 실제 네트워크 지연·CWV 개선률은 미측정이다.
- 데이터 검사에는 기존 키레네 유물 표현 관련 경고 2개가 남는다. 원본 의미를 임의 변경하지 않았다. fsmonitor IPC/CRLF 메시지는 코드 오류·whitespace 실패와 구분한다.

## 실제 로컬 production 화면 표본

- NTE 파티: 320·390·768·1440 viewport에서 본문 H1 좌우 경계가 화면 내에 있다. 모바일 화면 직접 확인. title/description/canonical/소유권 확인 태그 각 1개, 원래 6개 파티 유지.
- HSR 비소: 기본 상세, 광추 4개·유물 2개·장신구 3개와 파티 3개가 지연 로딩 후 표시된다.
- WW 설지: 응결 아이콘 naturalWidth 128, 실제 모바일 이미지 정상 표시.
- 검색: 이름 있는 dialog와 자동 입력 포커스, Escape 종료 후 Search 버튼으로 포커스 복귀 확인. 모든 키보드 경로·스크린리더 검증은 아니다.
- 애니모: 존재하지 않는 검색어로 무결과를 만든 뒤 초기화하면 86종 표시로 복구된다.
- NTE 감정사: 이름 기반 canonical과 단일 메타 태그 확인.

일부 desktop 캡처는 인앱 브라우저 패널에 의해 잘리므로 전체 desktop 픽셀 비교로 간주하지 않는다. 전체 캐릭터·모든 기기·관리자 여정을 검증한 것은 아니다. 운영 배포 후 HTTP/브라우저 확인 결과는 완료 보고에 별도 기재한다.

## DB 보안: 후보 준비, 운영 미적용

로그인된 Supabase Dashboard에서 정책·권한·함수·트리거 메타데이터만 SELECT했다. 사용자 행·키·토큰·댓글·Storage 객체는 읽거나 변경하지 않았다.

Storage 쓰기 3정책의 user_metadata/이메일 기반 권한 근거, 댓글 소유자 UPDATE 2정책, count 함수의 search_path 미설정이 운영 메타데이터에서 확인됐다. 실제 무단 쓰기나 침해를 재현한 것은 아니다.

`supabase/migrations/20261016085211_secure_storage_and_comment_fields.sql`은 준비된 후보이다. trusted app_metadata.role 기반 Storage 쓰기, 댓글 보호열 guard, count 함수 안전한 search_path, 신고 조회 제한을 포함한다. 테이블 grant·Data API·계정 권한을 임의로 확대하지 않는다. 공개 화면 신고 수는 서버 집계를 유지한다.

**운영 DB에 적용하지 않았다.** 로컬 DB 접속 불가로 pgTAP 12개는 미실행이며 source contract 통과가 RLS 검증을 대신하지 않는다. 기존 Storage 관리자에게 신뢰 가능한 서버 권한이 있는지 먼저 확인해야 한다. 전용 테스트 DB에서 계정 A/B/관리자와 Storage 검증 후 적용한다. 기존 과도한 TRUNCATE/REFERENCES/TRIGGER 권한은 별도 최소 권한 검토 대상으로 남겼다.

절차: [Supabase 보안 적용 가이드](../guides/SUPABASE_SECURITY_ROLLOUT.md).

## 역할별 검토

세 에이전트가 구현 역할을 나누고 성능 → 디자인 → 보안 → 성능 순서로 교차 검토했다. 구현자의 자체 검토가 포함되며 3명의 독립 인간 감사 또는 운영 전체 보안 통과로 표현하지 않는다.

- [성능 검토](2026-10-16-hsr-selective-loading-performance.md)
- [디자인 검토](2026-10-16-improve-design-code-review.md)
- [보안 검토](2026-10-16-improve-security-code-review.md)

Cloudflare는 GitHub push 자동 배포를 사용한다. 별도 수동 배포를 중복 실행하지 않으며, commit hash·push·CI·배포 및 공개 응답 확인 결과는 작업 완료 보고로 인계한다. 검증하지 않은 CWV·전체 보안·AdSense 승인에 점수나 보장을 부여하지 않는다.
