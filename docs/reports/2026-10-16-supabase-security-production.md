# Supabase 운영 보안 적용 기록 — 2026-10-16

## 승인과 범위

사용자가 운영 반영, 기존 등록 두 관리자 계정의 앱 최고 관리자 권한 설정 및 계속 진행을 승인했다. 계정 권한 확대는 적용 직전 별도로 확인받았다. 두 계정의 서버 관리 app_metadata.role=admin을 저장하고 재조회했다. DB 인증 역할은 authenticated 그대로이며 Supabase 조직 소유권/DB superuser를 부여한 것이 아니다. 다른 계정과 나머지 app_metadata는 유지했다.

이번 기록은 이후 Storage·댓글 보안 후보의 운영 반영 결과이다. 이메일·키·토큰·사용자 콘텐츠·raw metadata는 공개 보고서에 복사하지 않는다. Notion 동기화와 게임 데이터 변경은 없다.

## 운영 사전 조회

대상 프로젝트 main production을 확인했다. 관리자 준비 상태 true, 댓글·신고·좋아요·Storage RLS 활성, 두 count 함수 postgres 소유 SECURITY DEFINER, guard trigger 부재, 기존 관리자 댓글 정책과 보호 필드 구조를 대조했다. 다른 Storage 쓰기 정책은 review-media 범위였다. comment_reports/comment_upvotes CRUD grant가 없는 기존 상태도 재확인했다.

## 사전 검증

짧은 lock_timeout/statement_timeout을 둔 단일 트랜잭션에서 후보 DDL을 실행한 후 rollback했다. 실제 사용자·댓글·신고·좋아요·Storage 객체를 fixture로 생성하거나 수정하지 않았다.

- pg_temp에 character_reviews 구조를 복제하고 실제 신규 guard를 연결해 INSERT 배지/pin/count 정상화, 본문/평점/미디어 편집, 비관리자 pin·배지·count·식별열 변경 거부, 관리자 pin, DB owner 집계 갱신 경로를 검사했다.
- Storage 실제 정책식을 로컬 JWT 설정값과 합성 bucket 값으로 SELECT 평가했다. 일반·user_metadata만 admin·이메일 패턴만 일치·승인된 두 관리자 등 5조건에서 네 정책식과 다른 bucket 거부를 합쳐 40회 검사했다.
- SQL 오류 없이 검사 결과를 반환한 뒤 rollback했고, 재조회로 guard 부재·기존 Storage 세 정책 복구를 확인했다.

임시 복제 테이블 검사는 guard 동작 확인이며 실제 public 테이블 RLS·Data API·실제 로그인 JWT·Storage 업로드의 종단 간 검증이 아니다. 운영 금지인 기존 pgTAP fixture 스크립트는 실행하지 않았다.

## 운영 적용과 사후 조회

후보 `20261016085211_secure_storage_and_comment_fields.sql`의 정책·함수·트리거 변경을 동일한 의미로 SQL Editor에서 단일 트랜잭션 적용했다. 관리자 준비/중복 trigger 부재, Storage 결과/guard 생성 확인을 전후에 포함했다. 성공 응답 `Security policies committed` 후 별도 SELECT로 확인했다.

- Storage 관리자 세 정책의 user_metadata/이메일 권한 근거: 제거 확인.
- 기존 두 관리자 서버 권한: 유지 확인.
- 댓글 guard trigger: 생성 확인. invoker와 빈 search_path 확인.
- 소유자 UPDATE: legacy 중복 제거, 정책 1개 확인.
- 신고 전체 공개 SELECT: 제거, authenticated 본인/관리자 조건 확인.
- count 함수 두 개: postgres 소유 SECURITY DEFINER 유지, 빈 search_path 확인.
- 변경 전후 테이블 grants 및 RLS 카탈로그: 동일 확인. API 설정이나 권한을 임의로 열지 않았다.

SQL Editor 적용이라 CLI migration 이력이 자동 생성되지 않았다. 조회 시 migration 이력 테이블 자체가 없었다. 현재 카탈로그와 이 기록을 확인하고 재실행 충돌에 주의한다. 이전의 불안전한 정책을 자동 복원하는 rollback 파일이나 관리자 계정 자동 승격 migration은 추가하지 않는다.

## 세 역할 검토

별도 에이전트가 보안, 성능/무결성, UX/권한 호환을 읽기 전용으로 각각 검토했다. 새 코드상의 치명적 차단점은 발견하지 못했으며 운영 카탈로그 확인은 주 담당이 수행했다. 에이전트가 운영 UI/DB를 직접 테스트했다고 표현하지 않는다.

- 보안: invoker guard·권한 근거·기존 관리자 정책 보존 및 중복 적용 방지 전제 확인.
- 성능: count 함수 기존 구조와 트리거 연결 유지, 순환 없음, 짧은 DDL 잠금 제한 권고.
- UX: 기존 본문 편집·관리자 pin·admin-media 신규 업로드·서버 report_count 사용과 정적 호환.

## 남은 한계

실제 계정 로그인 후 업로드/교체/삭제, 댓글 편집/pin, 신고/좋아요 쓰기, 동시성 검사는 별도 필요하다. 댓글 편집/pin UI의 기존 error 미처리, reports/upvotes CRUD 권한 부재, 기존 과잉 TRUNCATE/REFERENCES/TRIGGER grants와 COUNT 방식 동시성 문제는 범위 밖으로 남겼다. 이를 해결하려고 API 권한을 확대하거나 원본 데이터를 변경하지 않았다.

## 검증 결과와 다음 우선순위

- 운영 Security Advisor에서 Rerun linter를 실행하고 오류 0개·경고 12개를 확인했다. 이번 대상 user_metadata 권한 근거 경고는 목록에 없다.
- 남은 경고: 다른 테이블의 과도한 쓰기 정책 6개, 공개 bucket listing 2개, 기존 rls_auto_enable 함수 공개/로그인 실행 2개, update_updated_at_column search_path 1개, 유출 비밀번호 보호 미활성 1개. 해당 함수와 쓰기 정책은 다음 최소 권한 검토 우선 대상이며 실제 악용을 검증한 것은 아니다. 임의로 사용자 접근·공개 이미지 목록·Auth 설정을 바꾸지 않았다.
- 공식 [Advisor 안내](https://supabase.com/docs/guides/database/database-linter) 및 [RLS 안내](https://supabase.com/docs/guides/database/postgres/row-level-security)를 기준으로 개별 영향과 허용 범위를 확인해야 한다.
- `npm run typecheck`, 전체 49파일 360테스트, `npm run build` 및 build 내 SEO·성능 예산 검사 통과. Notion 동기화 없이 로컬 생성만 실행했다.
- 문서·diff 공백 검사와 파일 재독을 수행한다. 문서 commit/push·Cloudflare 상태는 최종 작업 보고로 인계한다.

이번 변경을 사이트 전체 보안 또는 RLS 전수 검사 통과로 표현하지 않는다.
