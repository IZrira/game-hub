# 콘텐츠 관리자 권한 보강 — 독립 보안 검토

2026-10-16 · 범위: `20261016141014_restrict_content_writes_and_internal_function.sql` 및 소스 회귀 테스트. 별도 보안 에이전트가 읽기 전용으로 검토했다. 실제 사람의 보안 감사나 침투 테스트를 의미하지 않는다.

## 직접 확인한 코드

- `characters`, `notices`, `tier_lists`의 쓰기를 기존 두 관리자 UID 또는 서버 관리 `app_metadata.role=admin`으로 제한한다. 사용자 수정 가능한 metadata·이메일은 권한 근거로 사용하지 않는다.
- INSERT는 WITH CHECK, UPDATE는 USING과 WITH CHECK, DELETE는 USING을 사용한다. 공개 SELECT 정책과 테이블 grants를 임의로 확대하지 않는다.
- `rls_auto_enable`의 정의·소유자·이벤트 연결을 변경하지 않고 클라이언트 EXECUTE를 회수한다. 기존 service_role의 실효 실행 권한만 보존한다.
- 사전 검토에서 지적한 restrictive 정책 삭제 위험은 운영 정책 모드 확인이 필요한 조건으로 전달했다. 부계정의 삭제 권한 확대도 사용자 추가 승인 전 적용하지 않도록 요청했다.

## 주 담당이 전달한 운영 검증 증거

다음은 검토 에이전트의 직접 DB 측정이 아니라, 운영 작업을 수행한 주 담당의 재조회 결과다.

- 사용자 명시 승인 후 적용했으며 공개 SELECT 6개, grants, RLS 상태는 기존과 동일하다. 두 관리자 준비 상태와 관리자 쓰기 정책 9개를 확인했다.
- 내부 함수의 정의·소유자·search_path·이벤트 연결은 동일하다. anon/authenticated EXECUTE는 false, service_role은 true다.
- Advisor 오류는 0개이며 경고는 12개에서 4개로 감소했다. 남은 경고를 해결 완료로 해석하지 않는다.
- 임시 clone 기반 권한 검사 90개와 웹 테스트 364개가 통과했다고 전달받았다. 웹 테스트 통과는 운영 RLS 검증을 대체하지 않는다.

## 판정 및 보안 → 성능 교차 검토

검토 범위에서 명백한 SQL 권한 우회 오류는 발견하지 못했다. 전달된 운영 증거는 공개 읽기와 유지보수 경로를 유지하면서 쓰기 권한을 제한하려는 목적에 부합한다.

읽기 정책·grants·함수 본문을 보존하므로 인증이나 보안을 약화해 성능을 높인 변경은 아니다. 실제 쿼리 지연·부하·실사용 성능을 측정하지 않았으므로 성능 향상 수치나 사이트 전체 보안 PASS를 선언하지 않는다.

## 제한

이 에이전트는 운영 DB·브라우저를 조작하지 않았고 실제 관리자 세션의 저장·삭제 사용자 여정을 직접 검증하지 않았다. 임시 clone 결과를 실제 공개 테이블에 대한 전체 종단 간 검증으로 확대하지 않는다. 남은 Advisor 경고와 미래 관리자 계정의 UI/DB 권한 일치는 별도 검토 대상이다. Notion 동기화는 하지 않았다.

기준: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), 프로젝트 3인 품질 검토 기준.
