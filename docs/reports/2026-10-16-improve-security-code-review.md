# 보안 개선 코드 검토 — 2026-10-16

범위는 현재 dirty 작업트리의 Storage·댓글 권한 후보와 edge 응답 헤더 보강이다. 기존 SEO/NTE 변경과 보고서는 보존했다. 담당 `/root/improve_security`가 DB 후보를 구현하고 자체 검토했으므로 해당 부분은 독립 구현 감사가 아니다. 독립 1차 의견은 다른 담당 결과 열람 전 고정했고, root가 구현한 헤더 변경과 성능 담당 변경은 별도로 읽기 전용 교차 검토했다. 운영 침투 테스트나 전체 보안 통과 보고서가 아니다.

## 판정

웹 헤더 보강은 소스·단위 회귀 범위에서 PASS다. SQL은 준비된 후보이며 운영 미적용이다. 로컬 실제 DB 테스트와 기존 Storage 관리자의 신뢰 가능한 권한 대조가 끝나지 않아 DB/RLS 동작은 UNVERIFIED다. 이를 웹 배포와 구분한다.

## 준비된 SQL과 연계 수정

공식 Supabase CLI 2.120.0의 `migration new`로 `20261016085211_secure_storage_and_comment_fields.sql`을 생성했다. Storage 쓰기에서 user_metadata·이메일 패턴을 제거하고 기존 trusted app_metadata.role만 유지한다. 미확인 관리자 UID 예외는 추가하지 않는다. 기존 이메일/user_metadata 기반 관리자는 적용 전에 서버 관리 권한 전환 필요 여부를 권한 소유자가 확인해야 하며 자동 승격하지 않는다.

댓글의 기존 두 permissive 소유자 UPDATE 정책을 함께 교체하고 invoker trigger가 배지·pin·count·작성자와 글 위치 등의 식별열을 보호한다. 기존 편집기의 본문·평점·미디어·수정시각 변경과 서버 count trigger는 보존하도록 설계했다. count 함수는 SECURITY DEFINER를 유지하되 빈 search_path와 완전수식 테이블을 사용하고 직접 EXECUTE를 회수한다. 신고 관계는 본인/관리자만 조회하는 후보이며 UI는 부분 목록으로 전체 count를 덮지 않고 서버 count를 유지한다.

이 후보는 table/column GRANT, 기본 권한, Data API 설정을 변경하지 않는다. 기존 API DISABLED를 해제하지 않고 사용자·운영 콘텐츠를 일괄 변경하지 않는다. 좋아요 정책은 변경하지 않는다. 상세한 적용 전제와 전용 계정 테스트는 [적용 가이드](../guides/SUPABASE_SECURITY_ROLLOUT.md)에 기록했다.

## 운영 메타데이터 확인

Supabase connector는 `not available`로 실패했으나 주 담당이 기존 로그인된 Dashboard SQL Editor에서 정책·ACL·함수·trigger 메타데이터만 읽는 데 성공했다. 본 담당은 브라우저를 동시에 조작하지 않았다. 사용자 레코드·auth.users·댓글·신고·Storage 객체 본문·키·토큰은 조회하지 않았다.

- Storage 쓰기 세 정책의 user_metadata/이메일 기반 허용 조건과 댓글 소유자 UPDATE 두 정책의 실제 존재를 확인했다. 실제 무단 쓰기 재현은 하지 않았다.
- count 함수 두 개는 postgres 소유 SECURITY DEFINER, proconfig null이며 기존 count trigger 두 개가 존재했다. 새 guard는 운영에 없다.
- comment_reports/comment_upvotes에는 CRUD grant가 없고 Dashboard는 API DISABLED를 표시했다. 해당 정책이 있다는 이유로 운영 Data API에서 신고/좋아요 쓰기나 공개 관계 조회가 가능하다고 단정하지 않는다. character_reviews/party_recommendations CRUD는 기존 허용 상태다.
- public 역할의 TRUNCATE/REFERENCES/TRIGGER 권한은 별도 최소 권한 검토 후보다. API 악용은 검증하지 않았고 후보에 임의 회수를 추가하지 않았다.

현재 운영 정책의 위험한 권한 근거는 확인했지만 침해나 우회를 확정한 것은 아니다. 기존 Storage 관리자의 app_metadata 일치와 실DB 테스트가 없어 이번 운영 DDL 적용은 보류했다.

## 헤더 독립 검토

root 구현 `functions/security-headers.ts` 및 middleware wrapper를 `public/_headers`와 대조했다. 동일 보안 정책을 응답에 없는 경우에만 추가하여 기존 CSP 등 downstream 정책을 덮지 않는다. 301/404/410 및 원래 응답 상태·Location·본문·Content-Type·쿠키·개별 캐시를 wrapper에서 유지한다. 광고 CSP 허용 범위를 새로 넓히거나 Auth 정책을 완화한 변경은 없다.

해시 공개 HSR JSON의 immutable cache 분기도 별도로 검토했다. downstream private/no-store를 덮을 수 있다는 의견을 root에게 전달했고, 최종 diff에서 해당 지시자가 있으면 immutable override를 생략하는 guard와 회귀 두 개가 추가된 것을 확인했다. 18:07 KST 헤더 suite를 다시 실행해 15개 PASS. 공개 정적 경로/상태/Content-Type 제한과 기존 private/no-store를 함께 보존한다. 소스 범위에서 새 차단점을 발견하지 않았다. 배포 후 실제 200/301/404/410 응답 헤더 관측은 최종 배포 검증 대상이다.

## 검증 및 한계

- 직접 실행: `tests/edge-security-headers.test.ts`, `tests/comment-report-privacy.test.tsx`, `tests/security-migration-contract.test.ts` 합계 3파일 17개 PASS(18:05 KST). 이후 헤더 보강 두 항목이 추가되어 헤더 suite만 독립 재실행 15개 PASS(18:07 KST). UI 1개와 SQL source contract 3개는 앞선 실행 결과다. source contract는 SQL 실행·RLS PASS가 아니다.
- pgTAP 12개를 `supabase/tests/comment_authorization.test.sql`에 준비했다. `supabase test db --local` 실제 실행은 127.0.0.1:54322 ECONNREFUSED. Docker·psql·로컬 DB 실행 환경이 없어 DB 검증 불가다. 운영에서 fixture/payload를 실행하지 않았다.
- 자체 초기 typecheck는 동시 작업 중 synergyManager 타입 오류였으며 성능 담당 후속 수정 뒤 성공했다고 전달받았다. 최종 typecheck/build/전체 suite는 root의 통합 검증 결과를 따른다. root가 전달한 전체 355 PASS를 본 담당의 독립 전체 실행으로 표현하지 않는다.
- 신규 migration/가이드 재독과 diff 공백 검증 완료. Git fsmonitor IPC 및 CRLF 경고는 whitespace 오류와 구분했다.
- Notion 동기화·운영 DDL·운영 쓰기·계정/metadata 변조·commit·push·배포는 본 담당이 실행하지 않았다. 웹 배포와 Cloudflare/실사이트 확인은 root 담당이다.

## 보안 → 성능 교차 검토

독립 1차 의견 고정 후 synergyManager/guideRuntime/search-data 생성 및 검색·Aniimo UI diff, 성능 담당 보고서를 읽었다. 공개 게임 콘텐츠를 선택 로딩하는 범위에서 인증·CSP 완화, 민감응답 공유 캐시 추가, 보안 로그 삭제는 관측하지 않았다. 원본 데이터와 실패/재시도·늦은 응답 무시를 보존하는 테스트를 확인했다. 위 해시 공개 JSON의 upstream 캐시 존중 제안은 root가 반영했고 최종 코드와 회귀 통과를 확인했다. 바이트 절감을 실제 사용자 가속률·운영 권한 PASS로 확대하지 않은 성능 보고서 서술에 동의한다. FCP/LCP/INP 및 전체 브라우저·관리자 여정은 본 담당 미검증이다.
