# GitHub MCP 운영 기준

최종 확인: 2026-10-17 (한국 시간).

## 확인된 상태

- 공식 GitHub 원격 MCP가 Codex 사용자 설정에 `github`로 등록되어 있다.
- 서버 주소: `https://api.githubcopilot.com/mcp/readonly`.
- 인증 환경 변수 이름: `GITHUB_PAT_TOKEN`. 실제 값은 기록하지 않는다.
- 실제 MCP `get_me` 호출로 `IZrira` 인증을 확인했다.
- 실제 MCP `get_file_contents` 호출로 `IZrira/game-hub` 루트 목록을 조회했다.
- 같은 호출로 `IZrira/riragameinfo`의 `gf2 images`, `hsr images`, `nte images`, `ww images` 폴더를 조회했다.
- 위 내용은 해당 날짜의 조회 증거이며 모든 세션·기능의 영구적인 접근을 보장하지 않는다. Actions 로그, PR, 이슈 개별 조회는 이번 연결 시험에 포함하지 않았다.

## 작업별 사용

원격 코드·commit·PR·이슈·CI 조사에는 제공되는 GitHub MCP 읽기 도구를 우선한다. 이미지 누락은 코드 저장소의 참조 경로와 이미지 저장소의 실제 파일명을 대조한다. 대소문자·공백·확장자와 branch/commit 기준을 함께 확인한다.

로컬 미커밋 변경은 원격 MCP로 알 수 없다. 작업 시작 시 로컬 `git status`를 확인하고 원본 프로젝트를 직접 수정한다. diff·검증·commit·push는 `AGENTS.md`와 기존 Git CLI 절차를 따른다. MCP로 이미지 업로드·소스 수정·merge·workflow 실행을 시도하지 않는다.

로컬 코드 검토나 문서 편집만 필요한 경우 불필요한 원격 호출을 하지 않는다. Notion 동기화는 명시적으로 요청받았을 때만 실행한다. 공개 페이지·공략의 출처 노출 규칙은 기존 기준을 유지한다.

## 세션별 연결 검사와 장애 대응

1. 현재 세션에 GitHub MCP 도구가 제공되는지 확인한다.
2. 인증 확인이 필요하면 `get_me`, 저장소 접근 확인은 해당 저장소의 최소 목록 조회로 검증한다.
3. 도구 등록과 실제 호출 성공을 구분한다. 필요한 도구가 노출되지 않으면 해당 기능을 사용 가능하다고 보고하지 않는다.
4. 인증 오류는 토큰 만료·철회·환경 변수 적용 여부를 값 노출 없이 확인한다. 접근 거절은 저장소 선택과 해당 읽기 권한을 확인한다.
5. 서버 장애 또는 도구 미제공 시 허용된 기존 CLI/API로 확인할 수 있다. 사용한 경로와 미검증 항목을 보고한다. 권한 확대나 자격 증명 생성은 임의로 수행하지 않는다.

## 인증 및 권한

토큰 생성 전 화면에서 Actions·Contents·Issues·Pull requests·Metadata 읽기 전용, 계정 추가 권한 없음, 2027-01-15 만료 설정을 확인했다. 생성된 토큰의 실제 만료·전체 권한은 별도 재조회하지 않았다. 현재 확인된 것은 인증과 두 저장소 읽기 성공이다.

만료 7일 전 기준일은 2027-01-08이다. 알림은 아직 등록하지 않았다. 이 문서 작성만으로 자동 예약이 생성되는 것은 아니다. 실제 발급 토큰의 만료일이 다르면 확인 후 날짜를 갱신한다.

토큰 교체는 사용자가 직접 새 자격 증명을 발급하고 Windows 사용자 환경 변수에 저장한다. Codex를 완전히 종료한 뒤 다시 실행하고 실제 조회로 확인한다. 비밀 값을 출력하거나 보고서·채팅·`.env`·Git에 복사하지 않는다. 서버 읽기 전용 모드와 토큰 자체의 권한은 별개이므로 둘 다 최소 권한을 유지한다.

Codex 설정은 사용자 PC에 있으며 저장소 clone만으로 다른 PC에 설치되지 않는다. 다른 환경에서는 공식 절차로 별도 등록·인증해야 한다.

## 검증과 문서 유지

- MCP 변경 후에는 인증 계정, 대상 저장소 조회 결과, 검사 날짜와 미검증 기능을 갱신한다.
- TypeScript·빌드·브라우저·보안·성능 검증을 MCP 조회로 대체하지 않는다. CI 성공, Cloudflare 배포 성공, 실제 사이트 접근도 각각 확인한다.
- 기존 `docs/reports/2026-10-17-git-mcp-adoption-assessment.md`는 설치 전 검토 기록이다. 현재 운영 상태는 본 문서를 기준으로 하며 과거 보고서를 설치 완료 증거로 사용하지 않는다.
- 공통 기준은 `AGENTS.md`, 디자인은 `DESIGN.md`, 성능은 `docs/guides/PERFORMANCE.md`, 3인 독립 평가는 `docs/guides/THREE_ENGINEER_REVIEW.md`를 따른다. 검증하지 않은 성과나 상태를 완료로 바꾸지 않는다.

## 공식 참고

- [GitHub 공식 Codex 설치 안내](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md)
- [GitHub 공식 원격 서버·읽기 전용 설정](https://github.com/github/github-mcp-server/blob/main/docs/remote-server.md)
