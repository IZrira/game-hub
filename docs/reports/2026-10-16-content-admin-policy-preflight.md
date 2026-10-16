# 콘텐츠 쓰기 최소 권한 사전 검증 — 2026-10-16

기준 커밋 `2ba9c06`. 최초 사전 검증 후 사용자가 운영 적용을 명시 승인했고, **SQL 운영 적용 및 카탈로그 검증을 완료**했다. 기존 관리자/Storage·댓글 보안 적용과 이번 변경을 구분한다.

## 범위와 후보

`20261016141014_restrict_content_writes_and_internal_function.sql`은 공식 Supabase CLI 2.120.0 `migration new`로 생성했다. characters/notices/tier_lists의 쓰기·ALL 정책만 관리자 INSERT/UPDATE/DELETE로 교체하며, 별도 공개 SELECT 정책과 기존 grants는 유지한다. 기존 두 관리자 UID 또는 서버 관리 app_metadata.role=admin이 권한 기준이다. UPDATE는 USING과 WITH CHECK를 모두 검사한다.

rls_auto_enable는 postgres 소유 event_trigger이며 ensure_rls에 연결되어 있었다. 함수 정의·owner·search_path·연결은 유지하고 PUBLIC/anon/authenticated EXECUTE만 회수한다. 이미 유효했던 service_role 실행권한은 조건부로 보존한다. 새로운 테이블 CRUD 권한이나 API 노출을 추가하지 않는다. 예상하지 못한 restrictive 쓰기 정책이 있으면 적용을 중단한다.

## 실제 사전 검증

운영 카탈로그에서 RLS 활성, 공개 SELECT 6개, PERMISSIVE 쓰기/ALL 9개, 기존 두 관리자 준비 상태를 확인했다. SQL Editor에서 후보를 트랜잭션 안에 실행한 뒤 임시 테이블에 실제 정책을 복제해 검사하고 전체 rollback했다. 운영 콘텐츠 행·사용자 계정·Storage 객체에는 테스트 레코드를 만들지 않았다.

- 비로그인, 일반 로그인, user_metadata만 admin, 본계정 UID, 부계정 UID, 서버 app_metadata admin의 6조건.
- 임시 테이블 3개에서 SELECT/INSERT/UPDATE/UPSERT/DELETE 5종, 총 90개 검사 통과.
- 최초 검사 harness의 CASE 비교식 문법 오류를 괄호로 수정했다. SQL 후보 자체의 오류가 아니며, 최초 실패는 통과로 계산하지 않았다.
- rollback 후 공개/쓰기 정책 전체, grants, 함수 정의·실행권한 및 event trigger가 최초 조회와 동일하고 두 관리자 상태가 유지됨을 재조회했다.

이 검사는 임시 복제 테이블의 RLS 동작 검증이다. 실제 로그인 JWT/Data API/실제 관리자 저장·삭제 또는 event trigger의 새 public 테이블 생성 동작을 전수 검증한 것은 아니다. source contract 4개는 SQL 구조 회귀 검사이며 DB 실행 증거와 구분한다.

## 독립 검토와 승인 경계

보안·성능·관리자 UX를 별도 에이전트가 읽기 전용으로 검토했다. 공개 조회, upsert 양방향 권한, 내부 event-trigger 연결 보존에 새 정적 차단점은 발견하지 못했다. 보안 검토에서 제안한 restrictive 정책 발견 시 중단 조건을 후보에 반영했다.

개별 기록: [보안](2026-10-16-content-admin-security-review.md), [성능·무결성](2026-10-16-content-admin-performance-review.md), [관리자 UX](2026-10-16-content-admin-ux-review.md). 각 보고서는 직접 코드 검토와 주 담당 전달 운영 실측을 구분하며, 세 역할의 교차 검토도 기록한다.

기존 부계정의 characters DELETE는 원래 없던 권한이므로 관리자 통일은 권한 확대를 포함한다. 이 변경과 운영 반영을 적용 직전에 확인받았고, 사용자가 '이 내용으로 운영 적용 승인'을 선택한 이후에만 영구 적용했다.

## 운영 적용 및 사후 검증

승인 직후 실제 정책·grants·함수 정의가 사전 검증 기준과 같고 두 관리자가 준비됐는지 재조회했다. 짧은 lock_timeout/statement_timeout을 둔 단일 트랜잭션으로 후보와 같은 의미의 SQL을 적용했다. 관리자 준비 상태, 쓰기 정책 9개 및 클라이언트 함수 실행 차단 확인 후 commit했다. SQL Editor 성공 응답은 `Content administrator policies committed`이다.

- 공개 SELECT 정책 6개: 변경 전후 전체 정의 동일.
- 테이블 grants와 RLS: 변경 전후 동일.
- 세 테이블 쓰기: authenticated 역할 대상 관리자 INSERT/UPDATE/DELETE 정책 9개 확인. 과거 쓰기·ALL 정책은 제거됐다.
- rls_auto_enable 정의·owner·search_path 및 ensure_rls event-trigger 연결: 보존 확인.
- rls_auto_enable 실행권한: anon/authenticated false, 기존 service_role true 유지 확인.
- 기존 두 관리자 app_metadata 상태: 유지 확인. 운영 콘텐츠 행·사용자 계정·Storage 객체 데이터는 변경하지 않았다.
- 운영 Security Advisor: 갱신 후 오류 0개, 경고 12개에서 4개로 감소 확인. 재실행 결과는 최종 보고에서도 확인한다. 남은 것은 공개 bucket listing 2개, update_updated_at_column search_path 1개, 유출 비밀번호 보호 미활성 1개다.

SQL Editor 직접 적용이므로 CLI migration 이력이 자동 기록됐다고 주장하지 않는다. 이미 적용된 운영 상태와 migration 파일을 대조하고 임의로 이전 전체 migration을 재실행하거나 history를 만들지 않는다.

## 웹 검증과 인계

타입 검사, 50파일 364테스트, production build와 SEO·성능 예산 검사, diff 공백 검사 통과. 운영 적용 후 동일 검증을 다시 실행해 통과했다. Notion 동기화·게임 데이터/디자인 변경·운영 콘텐츠 수정 없음. 새 migration/test/report 파일을 검토해 정상 commit/push 절차로 보관한다.

실제 로그인 JWT/Data API/관리자 작성·삭제의 종단 간 검증 및 새 public 테이블 생성에 의한 event trigger 실동작은 미검증이다. commit/push·Cloudflare 배포 결과는 최종 보고로 인계한다. 공개 bucket listing, update_updated_at_column search_path, 비밀번호 보호 설정과 기타 과잉 grants는 이번 변경 범위에 포함하지 않았다. 사이트 전체 보안 통과로 확대하지 않는다.

## 푸시 후 CI 후속 검증

보안 변경 commit `a89adae`의 Cloudflare 배포와 audit 검사는 성공했지만 Quality Gate의 기존 HSR 가이드 테스트가 첫 세팅 선택 유지 assertion에서 실패했다. 로컬 364테스트 성공과 별개로 CI 실패를 완료로 처리하지 않았다.

콘텐츠는 부모의 guide URL key로 이미 초기화되는데 mount effect가 선택을 다시 초기화하는 중복 경로를 제거했다. 동일 가이드의 별칭 이동은 선택을 유지하고, 다른 가이드 이동은 key 변경으로 초기화한다. 이 중복 초기화는 경쟁 가능성이 있는 코드이나 CI 실패의 독립 재현을 확보한 것은 아니다. StrictMode 최초 선택 유지 회귀 테스트를 추가했으며 기존 선택 전환·다른 캐릭터 초기화 assertion은 약화하지 않았다.

성능·보안·UX 담당이 각각 읽기 전용으로 후속 diff를 검토했다. 추가 요청·권한 변경·다른 캐릭터 상태 잔존의 정적 차단점은 없었다. 직접 브라우저 검증이나 CI 원인 독립 재현으로 확대하지 않는다. 후속 타입 검사와 전체 50파일 365테스트, 해당 가이드 8테스트 5회 반복, 최종 production build·SEO·성능 예산·diff 공백 검사는 통과했다. 새 commit의 CI/배포 결과는 최종 인계에 명시한다.

운영 적용 후 실제 세 public 테이블을 anon 역할의 읽기 전용 트랜잭션으로 조회해 각각 행 존재 여부 true를 확인했다. 실제 데이터 내용은 가져오지 않았다.
