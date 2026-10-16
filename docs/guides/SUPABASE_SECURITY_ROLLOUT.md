# Storage·댓글 권한 보강 적용 절차

2026-10-16. `20261016085211_secure_storage_and_comment_fields.sql`은 공식 CLI 2.120.0의 `migration new`로 생성했다. 운영에는 적용하지 않았다. GitHub/Cloudflare 배포는 SQL을 자동 적용한다는 뜻이 아니다.

## 변경 의도

- admin-media 쓰기는 기존 Storage 정책의 신뢰 가능한 app_metadata.role만 유지한다. 사용자 수정 가능한 metadata와 이메일 패턴은 권한 근거에서 제거한다. Storage 관리자 UID 예외는 기존 접근 일치가 검증되지 않아 추가하지 않는다. 공개 미디어 조회는 유지한다. UPDATE는 기존 행과 변경 후 행 모두 검사한다.
- 과거 두 소유자 UPDATE 정책을 함께 교체하여 permissive OR 중복을 제거한다. 고정된 댓글도 작성자가 본문을 편집할 수 있으며 pin 변경은 관리자에게만 허용한다.
- invoker trigger가 클라이언트 INSERT의 배지·pin·count를 서버에서 결정한다. UPDATE는 id·작성자·게임·캐릭터·답글 대상·닉네임·작성시각·배지·집계를 고정한다. 현재 편집기는 본문·평점·미디어·수정시각만 변경하므로 이 경계와 일치한다. 기존 행의 데이터는 일괄 변경하지 않는다.
- 기존 count SECURITY DEFINER 함수가 DB 소유자로 실행할 때는 집계 갱신을 유지한다. 새 guard 함수는 권한 상승 없이 실행하며 JWT role/trigger depth로 우회하지 않는다. 기존 count 함수의 search_path를 고정하고 직접 호출 권한을 회수한다.
- 신고 관계는 본인/관리자만 조회한다. 공개 report_count는 유지하고 UI는 부분 신고 목록 대신 서버 count를 표시한다. 좋아요 정책은 변경하지 않는다.

## 적용 전 확인 — 운영 읽기 전용

승인된 연결에서 migrations 이력, pg_policies(대상 세 테이블), pg_roles/role membership, table·column grants, triggers/functions와 소유자·search_path, Storage bucket 및 전체 storage.objects 정책을 확인한다. permissive OR로 더 넓게 허용하는 미등록 정책이 있으면 먼저 원인을 검토한다. guard가 판별하는 실제 Data API role이 anon/authenticated인지 확인한다. 독자적인 API role이 있다면 그대로 적용하지 않는다.

기존 댓글 정책의 두 UID가 현재 관리자 목록과 일치하는지 비공개로 대조한다. app_metadata 관리자와 실제 UI 권한이 다른 계정은 JWT 갱신 후 동작을 확인한다. Storage에서 email/user_metadata만으로 관리자였던 계정은 적용 후 접근이 차단되므로, 적용 전에 권한 소유자가 해당 관리자의 자격과 서버 관리 app_metadata로의 전환 필요 여부를 확인해야 한다. 자동 승격이나 일괄 메타데이터 변경은 하지 않는다. 기존 배지·집계 데이터는 정정 권한 없이 변경하지 않는다.

## 확인된 운영 메타데이터와 제한

2026-10-16 주 담당이 기존 로그인된 Dashboard SQL Editor에서 정책·ACL·함수·trigger 메타데이터만 읽어 확인했다. Supabase connector는 사용할 수 없었지만 Dashboard의 읽기 전용 조회는 성공했다. 사용자 레코드·auth.users·댓글·신고·Storage 객체 내용은 조회하지 않았다.

- Storage Admin Media INSERT/UPDATE/DELETE의 user_metadata 및 이메일 기반 허용 조건이 실제 정책에 존재했다. 권한 우회 쓰기 실험은 하지 않았다.
- 댓글의 legacy/Author 소유자 UPDATE 정책 두 개가 실제로 존재했다.
- count 함수 두 개는 postgres 소유 SECURITY DEFINER이며 proconfig가 null이었다. 기존 count trigger 두 개는 존재하고 신규 guard는 없었다.
- comment_reports/comment_upvotes에는 CRUD grant가 없고 TRUNCATE/REFERENCES/TRIGGER 권한이 관측되었다. Dashboard는 API DISABLED를 표시했다. character_reviews/party_recommendations의 CRUD 허용은 기존 상태다. 이 후보는 GRANT·기본 권한·API 노출 설정을 변경하지 않아 접근을 열지 않는다. 미리보기 UI 수정으로 신고 API가 활성화되는 것도 아니다.
- public 역할의 과잉 TRUNCATE/REFERENCES/TRIGGER 권한은 별도 최소 권한 검토 후보다. 실제 Data API 호출·악용은 확인하지 않았고, 이 migration에서 추가 회수하지 않았다. 무관한 권한을 임의로 변경하지 않는다.

현재 정책이 저장소에 존재한다는 사실은 확인했지만 전용 A/B/관리자 계정의 허용·거부 동작, 기존 Storage 관리자의 app_metadata 일치, migration 적용 결과는 아직 미검증이다. 운영 DDL은 실행하지 않았으며 후보를 운영 반영 완료로 보고하지 않는다.

## 로컬 검증

폐기 가능한 Supabase 로컬 DB에서 이전 migrations와 후보 migration을 적용하고 `supabase test db`로 `supabase/tests/comment_authorization.test.sql`을 실행한다. 이 테스트는 fixture를 만들고 rollback한다. 운영에서는 실행하지 않는다. 현재 환경에는 Docker·psql·로컬 config가 없어 실제 DB 테스트를 실행하지 못했다. SQL 파일 존재/문자열 검사는 RLS 통과 증거가 아니다.

추가 전용 A/B/관리자 계정으로 anon 신고 조회 거부, 일반 사용자 미디어 INSERT/UPDATE/DELETE 거부, 서버 관리자 미디어 업로드·덮어쓰기·삭제 허용, 다른 bucket으로 이동 거부, 관리자 pin 허용, 일반 사용자 insert 배지·count 정규화, owner identity 변경 거부, 좋아요 취소·신고 삭제 후 count, 관리자 신고 조회·삭제를 검증한다. 모든 쓰기는 전용 로컬/스테이징 fixture만 사용한다. Advisors 결과도 확인한다.

## 운영 반영 조건

위 현재 정책 검토 및 실제 DB 허용/거부 테스트가 모두 끝난 후 대상 프로젝트·migration 이력과 적용 SQL을 재대조하여 승인된 절차로 적용한다. 프론트와 SQL을 함께 배포하고 신고 count·작성/편집·고정·좋아요·신고의 정상 여정을 확인한다. 운영 침해/전체 보안 PASS는 이 변경만으로 판단하지 않는다. 현 단계는 배포 전 검증이 남은 상태다.

## 공식 기준

- [RLS 및 정책·grants](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [열 권한과 행 정책의 차이](https://supabase.com/docs/guides/database/postgres/column-level-security)
- [CLI와 로컬 개발](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [공식 changelog](https://supabase.com/changelog): markdown index fetch 실패 후 HTML 확인. 2026-10-12 TLS 변경은 향후 HTTP 호환 사항이며 이번 SQL 권한 설계를 대체하지 않는다.
