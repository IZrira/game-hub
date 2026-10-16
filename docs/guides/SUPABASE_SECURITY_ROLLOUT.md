# Storage·댓글 권한 보강 적용 절차

2026-10-16. `20261016085211_secure_storage_and_comment_fields.sql`은 공식 CLI 2.120.0의 `migration new`로 생성했다. 최초에는 운영 미적용 후보였으나, 이후 사용자 운영 승인과 기존 두 관리자 권한 설정 후 SQL Editor에서 해당 변경을 운영 적용했다. GitHub/Cloudflare 배포가 SQL을 적용한 것은 아니다. [운영 적용 기록](../reports/2026-10-16-supabase-security-production.md)을 함께 확인한다.

## 현재 상태와 재실행 주의

- 후속 콘텐츠 쓰기 보강 `20261016141014_restrict_content_writes_and_internal_function.sql`도 별도 사용자 승인 후 운영 적용했다. 캐릭터/공지/티어표의 관리자 쓰기 통일 및 내부 event 함수 클라이언트 EXECUTE 제한 결과는 [후속 적용 기록](../reports/2026-10-16-content-admin-policy-preflight.md)을 따른다. 기존 공개 SELECT와 테이블 grants는 유지했다.
- 기존 등록 관리자 두 계정의 서버 관리 `app_metadata.role=admin` 저장을 재조회했다. JWT 반영을 위해 각 계정의 재로그인이 필요하다. 조직 소유권이나 DB superuser를 부여한 것은 아니다.
- Storage 관리자 쓰기 정책 세 개에서 user_metadata/이메일 허용을 제거했다. 댓글 guard, 소유자 UPDATE 정책 정리, 신고 관계 비공개, 집계 함수 search_path/직접 실행 제한을 적용하고 카탈로그 재조회로 확인했다.
- 운영 테이블 레코드의 일괄 수정, 운영 테스트 사용자·댓글·Storage 객체 생성, 기존 grant/API 공개 설정 변경은 하지 않았다.
- 운영 `supabase_migrations.schema_migrations` 테이블은 조회 시 존재하지 않았다. SQL Editor 적용이므로 CLI migration 이력이 자동 기록됐다고 가정하지 않는다. 새 trigger/policy는 단순 재실행 시 충돌하므로 실제 객체와 배포 기록을 먼저 확인한다. 무조건 재실행하거나 이력을 임의 생성하지 않는다.
- 실제 로그인 계정의 전체 업로드·댓글·좋아요·신고 여정 및 동시 쓰기 정확성은 미검증이다. 아래 최초 점검·로컬 테스트 조건은 해당 한계를 보완하는 후속 절차로 유지한다.

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

이 절의 항목은 최초 운영 읽기 점검 시점의 기록이다. 이후 관리자 일치·운영 DDL 적용·카탈로그 결과는 위 현재 상태 및 운영 적용 기록으로 갱신했다. 전용 계정의 전체 실제 API 허용/거부 여정은 여전히 미검증이다.

## 로컬 검증

폐기 가능한 Supabase 로컬 DB에서 이전 migrations와 후보 migration을 적용하고 `supabase test db`로 `supabase/tests/comment_authorization.test.sql`을 실행한다. 이 테스트는 fixture를 만들고 rollback한다. 운영에서는 실행하지 않는다. 현재 환경에는 Docker·psql·로컬 config가 없어 실제 DB 테스트를 실행하지 못했다. SQL 파일 존재/문자열 검사는 RLS 통과 증거가 아니다.

추가 전용 A/B/관리자 계정으로 anon 신고 조회 거부, 일반 사용자 미디어 INSERT/UPDATE/DELETE 거부, 서버 관리자 미디어 업로드·덮어쓰기·삭제 허용, 다른 bucket으로 이동 거부, 관리자 pin 허용, 일반 사용자 insert 배지·count 정규화, owner identity 변경 거부, 좋아요 취소·신고 삭제 후 count, 관리자 신고 조회·삭제를 검증한다. 모든 쓰기는 전용 로컬/스테이징 fixture만 사용한다. Advisors 결과도 확인한다.

## 운영 반영 조건

일반적인 후속 배포는 위 현재 정책 검토 및 전용 DB 허용/거부 테스트 후 대상·이력·SQL을 대조하여 적용한다. 이번 운영 승인 작업은 사전 롤백 DDL 실행, 임시 복제 테이블 guard 검사, Storage 정책식 평가 후 반영했으며 기존 로컬 pgTAP/실제 계정 여정을 대체한 것으로 표현하지 않는다. 신고 count·작성/편집·고정·좋아요·신고의 실제 정상 여정은 별도 검증해야 한다. 운영 침해/전체 보안 PASS는 이 변경만으로 판단하지 않는다.

## 공식 기준

- [RLS 및 정책·grants](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [열 권한과 행 정책의 차이](https://supabase.com/docs/guides/database/postgres/column-level-security)
- [CLI와 로컬 개발](https://supabase.com/docs/guides/local-development/cli/getting-started)
- [공식 changelog](https://supabase.com/changelog): markdown index fetch 실패 후 HTML 확인. 2026-10-12 TLS 변경은 향후 HTTP 호환 사항이며 이번 SQL 권한 설계를 대체하지 않는다.
