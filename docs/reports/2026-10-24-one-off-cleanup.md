# 일회성 파일 정리

## 범위와 복구

원본 프로젝트에서 참조 없는 일회성 스크립트 10개와 오래된 로그 6개를 삭제했다. 총 16개, 3,163,544바이트다. 빈 디렉터리는 삭제하지 않았다. 생성물 전체 삭제나 소스 구조 변경은 하지 않았다.

삭제 전 모든 파일을 프로젝트 밖 `D:\rira game hub\cleanup-backups\2026-10-24-one-off-files.zip`에 압축했다. 압축 항목 16개 각각의 크기와 SHA-256을 원본과 대조한 후 정확한 절대 경로 목록만 삭제했다. 파일별 이름이 서로 달라 압축본에서 구분할 수 있다. 복구 시 아래 원래 경로에 파일을 되돌린다. 추적 스크립트는 이 정리 직전 Git 커밋에서도 복구할 수 있다. 로그는 Git 추적 대상이 아니므로 로컬 압축본을 보존한다. 백업은 로그·진단 정보를 포함할 수 있어 공개 저장소에 추가하지 않았다.

## 삭제한 스크립트

- `fix_guides.cjs`: 순위·cost 및 타입 일괄 치환용 임시 수정.
- `fix_types.cjs`: 과거 타입 치환 보정.
- `replace.cjs`: react-router-dom → react-router 일회성 전환.
- `test_db.js`: 단순 import 확인용. UTF-16이라 apply_patch로 삭제할 수 없어 지정 경로 파일 삭제로 처리.
- `test_env.cjs`: 환경변수 값을 콘솔에 출력하는 임시 진단. 실행하지 않고 제거했다.
- `update_md.cjs`: 완료 보고서에 특정 문장을 한 번 덧붙이는 도구.
- `scratch/fix_asterisks.cjs`: Notion 원본 문자열의 별표 일괄 수정용 임시 스크립트.
- `scratch/sim-sakiri.cjs`: 사키리 데이터 조회 시뮬레이션.
- `scratch/test-glossary.js`: 고정 예제 용어 파서 실험.
- `scratch/test-glossary2.js`: 고정 예제 정규식·툴팁 실험.

package.json·CI·설정·문서·스크립트 참조를 검색해 위 파일의 외부 호출이 없는 것을 확인했다. 파일 내용을 읽었으며 어떤 수정·동기화 스크립트도 실행하지 않았다.

## 삭제한 로그

- `logs/build_log_v2.txt`
- `logs/build_log.txt`
- `logs/divergent_names.txt`
- `logs/full_diff.txt.tmp`
- `logs/shadow_names.txt`
- `logs/tsc_error.txt`

재사용 참조가 없고 운영 입력 데이터가 아닌 과거 빌드·타입 검사·diff 결과다. Git ignore 대상이다.

## 보존한 파일과 이유

- `scratch/get_metadata.cjs`, `scratch/parse_char.cjs`, `scratch/parse_ww_char.cjs`: 위키 재생성 Python 도구가 호출한다.
- `scratch`의 나머지 진단·동기화 도구와 JSON/TXT 원본: 재사용 여부 또는 고유 원본 여부를 확정하지 않은 파일은 보존한다.
- `production_artifacts`: 작업 흐름 문서에서 사용하는 캐릭터 명세다.
- `scripts/legacy/scratch_scripts`: 이미 분리된 과거 복구·변환 도구 및 원본 묶음이다. 일괄 제거하지 않았다.
- `lucilla.json`, `lucy_data_extracted.txt`, `sonata_files.txt`: 원본 자료인지 확정하지 못해 보존한다.
- `.env`·인증 파일·개인 메모/위키·이미지·node_modules·dist·공략 원본·기존 보고서·사용자가 수정한 AGENTS.md는 변경하지 않았다.

## 검증과 영향

Notion 동기화 및 운영 데이터 변경 없음. TypeScript → build → diff 검사와 회귀 테스트로 삭제 영향을 확인한다. 빌드 내 SEO·성능 예산 검사를 재사용하며 이전 성공을 이번 결과로 대체하지 않는다. 기존 의존성 보안 audit 실패는 별도 문제이며 파일 정리를 이유로 검사 기준을 완화하지 않는다.

실행 결과: TypeScript 통과, 전체 회귀 테스트 68개 파일·518개 테스트 통과, build 및 SEO 893개 경로·성능 예산 통과. 생성 데이터는 기존과 동일하며 관련 없는 생성 파일 변경은 없다. 삭제 diff와 신규 보고서를 확인하고 공백 검사를 통과했다. 원격 CI와 Cloudflare는 push 후 별도 확인해 최종 응답에 보고한다.

성능: 실행 코드·번들 최적화가 아닌 저장소 정리다. 화면 로딩 향상을 주장하지 않는다. 보안: 환경변수 출력용 스크립트를 제거했지만 기존 키 노출 여부나 의존성 취약점 전체를 해결한 것은 아니다. 디자인: 화면 컴포넌트·스타일은 변경하지 않는다. 별도 3인 독립 전체 감사는 수행하지 않았다.
