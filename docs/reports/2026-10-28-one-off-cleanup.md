# 일회성 파일 추가 정리

## 삭제 범위와 복구

참조가 없는 진단·과거 부분 보정 스크립트 8개와 동일한 광추 임시본 2개를 정리했다. 총 10개, 38,034바이트이며 빈 디렉터리는 삭제하지 않았다. 앱 기능·데이터·이미지·디자인 변경은 없다.

삭제 전에 `D:/rira game hub/cleanup-backups/2026-10-28-one-off-files.zip`에 백업했다. 압축 항목 10개의 개수·크기·SHA-256을 각각 원본과 대조했고, 삭제 직전에도 재검증했다. ZIP에는 파일명이 중복되지 않는 10개 항목이 있으며 아래 원래 경로로 복원할 수 있다. 추적 파일이므로 삭제 직전 Git 커밋 `4e7092945cfe7e67871ec1b7bd4f67539b610ea1`에서도 복구할 수 있다. 백업 파일은 저장소 밖에 보관하며 커밋하지 않는다.

## 삭제 목록

- `scratch/check-nte-props.cjs`: 사키리 일반 공격 필드를 출력하는 과거 수동 Notion 진단.
- `scratch/check-nte-props.mjs`: 구형 API를 사용하는 단일 레코드 속성명 출력 실험.
- `scratch/test-nte-db.ts`: 사키리 데이터 출력 실험. 현재 정식 테스트 대상 아님.
- `scratch/test-sync-nte.ts`: 캐릭터 5개 샘플 출력 실험.
- `scratch/test-supabase-upsert.ts`: 첫 5개 캐릭터 upsert 실험. 현재 상대 import도 맞지 않음. 실행하지 않고 삭제.
- `scratch/update-nte-basicattack.cjs`: 일반 공격 필드만 로컬 JSON에 덮어쓰는 과거 수동 보정. 공식 동기화 경로와 별개.
- `scratch/update-nte-glossary.cjs`: 용어 필드만 로컬 JSON에 덮어쓰는 과거 수동 보정. 공식 동기화 경로와 별개.
- `scripts/inspect_skills_content.js`: 카멜리아 스킬 3종을 출력하는 단발성 확인.
- `hsr-hub/data/lightcones/hunt_head.ts.tmp`: 광추 임시 작업본.
- `hsr-hub/data/lightcones/hunt_restore.ts.tmp`: 위 임시본과 SHA-256이 동일한 중복 작업본.

## 의존성과 보존 판단

- 후보 파일을 실행하지 않고 내용을 읽었다. 숨김 설정을 포함한 저장소에서 후보 파일명의 외부 호출·참조를 검색했으며 발견하지 못했다.
- package.json·CI·Vite·TypeScript·Vitest·생성 스크립트 경로를 확인했다. `scratch`는 타입 검사에서 제외되며 실제 테스트는 `tests/**/*.test.ts(x)`다. 광추 생성 도구는 `.ts`를 필터링하므로 `.ts.tmp`를 읽지 않는다.
- 운영 광추는 `hunt.ts`를 사용한다. 임시본 이름만으로 삭제하지 않고 사용 경로와 중복 해시까지 확인했다.
- 위키 재생성이 호출하는 `scratch/get_metadata.cjs`, `scratch/parse_char.cjs`, `scratch/parse_ww_char.cjs`는 보존했다.
- 원본 여부가 불분명한 JSON/TXT, 기존 legacy 복구 도구, production_artifacts, 공략 초안·회귀 테스트·문서·이미지·인증 파일은 보존했다.
- 기존 수정된 AGENTS.md와 미추적 보고서는 이번 작업에 포함하지 않는다.

## 검토와 검증 범위

별도 에이전트 3개가 성능/실행 경로, 보안/수동 쓰기 도구, 디자인/콘텐츠 의존성을 독립 정적 검토했으며 삭제를 막는 의존성을 발견하지 못했다. 실제 사이트 전체 감사나 성능 향상을 뜻하지 않는다.

apply_patch 삭제가 파일 접근 오류로 실패해 원본이 보존된 것을 확인했다. 이후 추가 실행 권한으로 원본 프로젝트 내부의 정확한 절대 경로와 ZIP 해시를 재검증한 뒤 PowerShell의 LiteralPath 단일 파일 삭제를 사용했다. 재귀 삭제나 다른 셸 위임은 사용하지 않았다.

Notion 동기화, 운영 DB 접근·쓰기 및 후보 스크립트 실행은 하지 않았다. 삭제 후 TypeScript → build → diff 검사 순서로 검증하고 전체 회귀 테스트도 수행한다. 빌드가 만든 무관한 날짜 갱신은 커밋에서 제외한다. 검증 및 배포 결과는 완료 보고에서 확인한다.

검증 결과: TypeScript·build, SEO 894개 경로·성능 예산 통과. 제한 샌드박스의 전체 테스트는 임시 변환 파일 ENOENT로 실패해 동일한 npm test를 추가 실행 권한으로 재실행했고, 70개 파일·526개 테스트가 모두 통과했다. 테스트 기준과 앱 코드는 변경하지 않았다. git diff --check 통과, 생성 데이터는 기존과 동일하며 무관한 변경은 포함하지 않는다.
