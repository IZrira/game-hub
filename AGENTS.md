# 프로젝트 작업 규칙

이 규칙은 현재 원본 프로젝트 `D:\rira game hub\game-hub`와 하위 경로의 모든 작업에 적용한다.

HSR, WW, NTE, Aniimo, GF2를 포함한 이 프로젝트의 모든 허브에 동일하게 적용한다. 후속 작업에서도 이 문서를 먼저 확인하고, 작업 범위에 해당하는 하위 경로의 추가 지침이 있다면 함께 확인한다. 시스템·개발자 지침과 충돌하는 경우에는 상위 지침을 따른다.

이 문서는 Codex와 Claude Code가 함께 쓰는 단일 기준이다. Codex는 이 파일을 직접 읽고, Claude Code는 `CLAUDE.md`의 `@AGENTS.md`로 불러온다. 규칙은 이 파일에서만 고치고 `CLAUDE.md`에 같은 내용을 복사하지 않는다. 도구 이름이나 실행 방법이 다른 부분은 아래 "에이전트 환경별 차이"를 따른다.

사용자가 이번 작업의 범위나 실행 단계를 제한하면 그 지시를 우선한다. 특히 문서 작성만 요청한 작업에서는 다른 프로젝트 코드나 데이터를 수정하지 않으며, commit·push 보류 요청이 있으면 아래의 기본 자동 처리 절차도 실행하지 않는다. 사용자의 후속 "진행"만으로 명시적인 commit·push 보류를 해제한 것으로 해석하지 않는다.

## 기본 작업 규칙

1. 사용자가 요청한 작업을 정확히 수행한다.
2. 요청하지 않은 기능이나 데이터를 임의로 변경하지 않는다.
3. 기존 디자인과 기존 기능을 최대한 유지한다.
4. 작업 시작 전에 `git status`를 확인한다.
5. 원본 프로젝트를 직접 수정한다.
6. 작업 복사본이나 patch 파일만 만드는 방식은 사용하지 않는다.
7. 캐릭터의 일반 공격(Basic Attack) 스킬이 여러 개인데 개별 고유 아이콘이 1개만 존재하는 경우, 모든 일반 공격의 아이콘은 `basic_atk_1`로 통일한다.
8. 분석 가이드와 공략을 작성할 때 외부 자료는 사실 확인에만 활용하고, 공개 페이지에는 외부 출처 사이트 이름이나 링크를 노출하지 않는다.
9. 분석 가이드와 공략 본문에서는 Markdown 표처럼 렌더러에 따라 한 줄로 이어질 수 있는 형식을 사용하지 않는다. 비교 정보는 제목이 있는 짧은 항목이나 목록으로 나누어 모바일에서도 쉽게 읽히도록 작성한다.
10. 데이터, 명칭, 수치, 순서, 속성 관계, 진화 관계와 도표를 수정할 때는 코드·타입·빌드 검사만으로 완료 처리하지 않는다. 사용자가 제공한 원본 자료 또는 확인 가능한 기준 자료와 수정 결과를 항목별로 대조하고, 이미지 작업은 최종 렌더링 파일을 직접 열어 배치·아이콘·라벨·연결 관계까지 확인한다. 의미상 검증이 끝나기 전에는 commit 또는 push하지 않는다.
11. 웹사이트의 공개 페이지와 공개용 도감·공략 콘텐츠에 Notion 링크를 포함하거나 노출하지 않는다. 본문, 버튼, 출처, 이미지 링크 및 메타데이터에도 같은 규칙을 적용한다.

## Aniimo 도감 추가 규칙

- 새 지역 또는 신규 애니모가 추가되면 기존 항목을 덮어쓰지 않고 별도의 신규 항목으로 추가한다. 기존 데이터·이미지·공개 URL을 보존한다.
- 도감 데이터는 공식 도감에 표기된 명칭·번호·형태·속성·수치·스킬·출현 지역·진화 관계를 기준으로 수집하고 항목별로 대조한다. 공식 자료에 없는 값이나 관계를 추정해서 채우지 않는다.
- 지역별 도감 번호가 중복되더라도 기존 항목과 신규 항목이 충돌하지 않도록 식별자와 저장 경로를 구분한다. 화면에 표시하는 공식 번호는 그대로 유지한다.

## GitHub MCP 사용 규칙

- GitHub 원격 저장소·commit·PR·이슈·CI 또는 이미지 경로 확인이 필요한 작업은 공식 GitHub MCP의 관련 읽기 도구를 우선 사용한다. 관련 없는 작업에 불필요한 호출은 하지 않는다. 등록 위치는 Codex `~/.codex/config.toml`, Claude Code 프로젝트 `.mcp.json`이며 두 곳 모두 같은 읽기 전용 서버와 환경 변수 `GITHUB_PAT_TOKEN`을 쓴다.
- 운영 기준과 확인된 연결 상태는 `docs/guides/GITHUB_MCP.md`를 따른다. 매 세션 도구 제공 여부와 실제 조회 성공을 확인하며, 과거 연결 성공을 현재 인증 성공으로 간주하지 않는다.
- 원격 조회 대상은 `IZrira/game-hub`, `IZrira/riragameinfo`다. 원본 로컬 수정과 status·diff·검증·commit·push는 기존 Git CLI 절차를 유지한다.
- 읽기 전용 MCP를 이유로 토큰 권한을 임의 확대하지 않는다. 도구가 없거나 인증이 실패하면 원인을 보고하고 허용된 CLI/API로 대체하며, MCP로 확인했다고 표현하지 않는다.
- 토큰 값은 문서·로그·채팅·저장소에 기록하지 않는다. Notion 동기화와 운영 배포는 MCP 연결만으로 실행 권한이 생기지 않는다.

## Notion 동기화 규칙

Notion 동기화는 사용자가 명시적으로 요청한 경우에만 실행한다.

예:

- "노션 동기화해"
- "노션까지 갱신해"
- "Notion 데이터 업데이트해"

사용자가 Notion 동기화를 요청하지 않았다면 `prebuild` 또는 Notion 동기화 스크립트를 임의로 실행하지 않는다.

빌드 전에 `package.json`의 현재 스크립트 구성을 확인한다. `prebuild`에 Notion 동기화가 포함된 경우, Notion 동기화 요청이 없는 빌드 검증에서는 자동 lifecycle 실행을 해당 명령에 한해 비활성화한다. `package.json`을 수정하거나 npm 전역 설정을 변경하지 않는다.

PowerShell 실행 예시:

```powershell
$previousIgnoreScripts = $env:npm_config_ignore_scripts
try {
    $env:npm_config_ignore_scripts = 'true'
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Build failed with exit code $LASTEXITCODE" }
} finally {
    if ($null -eq $previousIgnoreScripts) {
        Remove-Item Env:npm_config_ignore_scripts -ErrorAction SilentlyContinue
    } else {
        $env:npm_config_ignore_scripts = $previousIgnoreScripts
    }
}
```

Bash(Git Bash 포함) 실행 예시. 환경 변수는 이 명령에만 적용된다.

```bash
npm_config_ignore_scripts=true npm run build
```

이 방식은 명시적으로 요청한 `build` 스크립트 자체는 실행하고, 자동 `prebuild`/`postbuild` 실행을 억제한다. 스크립트 구성이 변경되면 현재 구성을 확인하고, Notion 동기화 금지와 필요한 빌드 검증을 모두 지킨다.

`build` 본문이나 그 하위 스크립트가 Notion 동기화를 직접 호출한다면 `ignore_scripts`만으로는 차단되지 않는다. Notion 동기화 요청이 없는 경우에는 동기화를 실행하지 않는 검증 경로를 확인하고, 안전하게 분리할 수 없다면 실행을 보류하고 사용자에게 알린다.

Notion 동기화를 요청받았다면:

1. 현재 프로젝트의 공식 Notion 동기화 스크립트를 확인한다.
2. 해당 스크립트를 실행한다.
3. 동기화 성공 여부를 확인한다.
4. 동기화로 변경된 파일을 `git diff`로 확인한다.
5. 이후 정상적인 검증 및 배포 절차를 계속 진행한다.

명시적 동기화를 이미 실행한 경우 후속 빌드에서 불필요한 중복 동기화를 실행하지 않는다.

## 필수 검증

AGENTS.md 등 작업 규칙 문서만 변경하고 코드 또는 데이터를 변경하지 않은 경우에는 문서 내용을 다시 읽고 요청 사항과 대조하며 `git diff --check`와 `git diff`로 검증한다. 기본 작업, Notion 실행 조건, 검증 순서, Git 처리, 배포 확인, 사용자 제한 우선 및 완료 보고 항목이 서로 충돌하지 않는지 확인한다. 이 경우 TypeScript 검사와 빌드는 필수가 아니며, 실행하지 않았다면 완료 보고에 명시한다.

문서만 수정하는 작업에서는 검증 명령도 해당 문서 범위로 한정한다. 작업 시작 시 확인한 기존 변경사항과 staging 상태를 보존하며, 문서 확인을 위해 프로젝트 생성·동기화 스크립트를 실행하지 않는다.

코드 또는 데이터가 변경된 모든 작업은 완료 전에 반드시 다음 순서로 검증한다.

1. TypeScript 타입 검사: 현재 프로젝트에서는 `npm run typecheck`.
2. `npm run build`: 위 Notion 동기화 규칙을 반드시 적용한다.
3. `git diff --check`.
4. `git diff` 확인. 신규 파일은 내용도 직접 확인한다.

`spawn EPERM` 처리는 실행 환경에 따라 다르다.

- Codex(Windows 제한 샌드박스): Node `child_process.spawn`이 `EPERM`으로 차단되는 것이 확인되어 있다. esbuild 직접 실행은 가능하다. `npm run build`가 `spawn EPERM`으로 실패하면 프로젝트 오류로 판단하지 않고, 사용자에게 추가 실행 권한을 요청해 샌드박스 밖에서 다시 실행한다. 샌드박스 밖에서는 정상 동작하는 것이 확인되었다.
- Claude Code: Node spawn과 `npm run typecheck`·`npm run build`가 정상 동작하는 것을 2026-11-02에 확인했다. `EPERM`이 나면 환경 제한으로 넘기지 말고 원인을 조사한다.
- 어느 환경이든 권한 문제가 남아 있으면 검증 성공으로 보고하지 않는다.
- `npm run build`·`npm test`·`predev`는 생성 스크립트로 추적 파일(예: `public/sitemap.xml`의 `lastmod`)을 다시 쓸 수 있다. 실행 후 `git status`로 이번 작업과 무관한 생성 변경을 구분하고 commit에 섞지 않는다.

빌드가 실제 코드 오류로 실패하면:

- commit 금지.
- push 금지.
- 오류 원인을 수정한다.
- 타입 검사와 build를 다시 실행한다.
- build가 성공할 때까지 검증을 반복한다.

## Git 자동 처리

사용자가 별도로 "push 하지 마", "배포하지 마", "검토만 해"라고 명시하지 않는 한 정상 완료된 작업은 항상 GitHub push까지 진행한다.

이 규칙은 사용자가 이 프로젝트에 미리 준 지속 승인이다. 에이전트의 기본 설정이 commit·push 전에 확인을 요구하더라도, 제한 요청이 없고 필수 검증이 모두 성공한 실제 변경은 다시 묻지 않고 진행한다.

검증 성공 후:

실제 변경이 있는 작업에만 다음 절차를 적용한다. 코드 또는 데이터 변경 작업은 TypeScript 검사와 build를 포함한 필수 검증이 모두 성공하기 전에는 commit 또는 push하지 않는다. 실행 권한 문제로 검증이 끝나지 않은 경우도 성공으로 간주하지 않는다.

1. `git status`.
2. `git diff`.
3. `git diff --check`.
4. 작업과 관련된 변경 파일만 `git add`.
5. 변경 내용을 설명하는 commit message 작성.
6. `git commit`.
7. 현재 정상 production 작업 branch에 `git push`.
8. push 성공 여부 확인.

현재 branch와 원격 설정을 확인하여 production 작업 branch를 식별한다. 불명확하면 임의의 branch로 push하지 않고 사용자에게 확인한다.

- force push는 절대 사용하지 않는다.
- `reset --hard`도 사용하지 않는다.
- 사용자의 기존 변경사항을 임의로 삭제하지 않는다.
- 기존 변경사항이나 다른 작업의 변경을 이번 commit에 임의로 포함하지 않는다.
- API Key, 토큰, 비밀번호, `.env` 등의 secret은 절대 Git에 commit하지 않는다.

## Cloudflare

현재 프로젝트가 GitHub push를 통해 Cloudflare에 자동 배포되는 구조라면 별도의 중복 배포 명령을 실행하지 않는다.

- GitHub push 후 Cloudflare 배포 상태를 확인할 수 있다면 확인한다.
- Cloudflare 배포가 실패하면 작업이 완전히 완료됐다고 보고하지 않는다.
- 가능하다면 production 배포 완료 후 실제 사이트 접근 여부도 확인한다.
- 배포 상태나 사이트 접근을 확인하지 못했다면 확인하지 못한 사실을 보고한다.

## 작업 흐름

모든 흐름은 사용자 명령 우선 규칙과 Notion 동기화 규칙을 따른다.

### 일반 코드 수정 요청

사용자 요청 → git status → 코드 분석 → 원본 수정 → TypeScript 검사 → npm run build → git diff --check → git diff → commit → GitHub push → Cloudflare 배포 확인 → 완료 보고

### Notion 동기화 요청

사용자 요청 → git status → 요청한 작업 → Notion 동기화 → 동기화 결과 확인 → TypeScript 검사 → npm run build → git diff --check → git diff → commit → GitHub push → Cloudflare 배포 확인 → 완료 보고

### 단순 Notion 동기화 요청

git status → Notion 동기화 → 변경사항 확인 → 필요한 검증(TypeScript 검사 포함) → npm run build → git diff --check → git diff → commit → GitHub push → Cloudflare 배포 확인 → 완료 보고

## 사용자 명령 우선

사용자가 특정 단계만 요청하면 해당 요청을 우선한다.

문서 작성만 요청한 경우 문서 외의 프로젝트 코드나 데이터를 수정하지 않는다. commit, push 또는 배포를 보류하라는 명시적 요청은 기본 Git 자동 처리 규칙보다 우선한다.

- "분석만 해" → 파일 수정, commit, push 금지.
- "수정만 하고 푸쉬하지 마" → 수정 및 검증까지만 수행.
- "노션 동기화하지 마" → Notion 관련 스크립트 실행 금지.
- "노션 동기화해" → Notion 동기화 포함.
- "푸쉬까지 해" → 검증 성공 후 반드시 push.

별도의 제한 요청이 없다면 실제 변경이 발생한 정상 작업은 기본적으로 검증 후 GitHub push까지 진행한다.

## 완료 보고

작업 완료 후 반드시 다음을 보고한다. 실행하지 않았거나 확인하지 못한 항목은 그 사실과 이유를 명시한다.

- 수행한 작업.
- 수정한 파일.
- Notion 동기화 실행 여부.
- TypeScript 검사 결과.
- npm run build 결과.
- git diff 검증 결과.
- commit message.
- commit hash.
- GitHub push 결과.
- Cloudflare 배포 확인 결과.
- 남아 있는 경고 또는 문제.

## UI 작업

UI를 설계·구현·검토할 때는 루트 `SKILL.md`(디자인 실행 순서)와 `DESIGN.md`를 먼저 읽는다. 루트 `SKILL.md`는 어느 에이전트도 자동으로 불러오지 않으므로 이 규칙으로 읽는다.

## 에이전트 환경별 차이

정책은 위 규칙과 같고 도구 이름과 실행 방법만 다르다.

- 스킬 위치와 호출: 원본은 `docs/skills/`다. Codex는 `~/.codex/skills/`에서 `$rira-…`로, Claude Code는 `~/.claude/skills/`에서 `/rira-…`로 호출한다. 한국어 호출어(`이미지점검`, `검증배포` 등)는 둘 다 쓸 수 있다. 스킬을 고치면 `docs/skills/`를 먼저 고치고 두 설치 위치에 같은 내용을 반영한다.
- MCP 등록: Codex는 `~/.codex/config.toml`, Claude Code는 프로젝트 `.mcp.json`(`github`, `cloudflare`)이다. GitHub 토큰은 Windows 사용자 환경 변수 `GITHUB_PAT_TOKEN`으로만 읽고 파일에 값을 넣지 않는다. Claude Code의 `cloudflare`는 OAuth 로그인(`/mcp` → cloudflare → Authenticate, Read only)을 쓴다. 이 PC의 Norton 360이 HTTPS를 가로채면 MCP가 `InvalidHTTPResponse`·`ECONNRESET`으로 실패하므로, 연결 오류가 나면 Norton 안전한 웹 제외 항목부터 확인한다(`docs/guides/GITHUB_MCP.md`). Claude Code는 `.mcp.json`이 있는 `game-hub` 폴더에서 세션을 열어야 이 서버를 읽는다.
- Cloudflare 배포 확인: `cloudflare` MCP가 연결되면 그것으로 확인한다. 연결되지 않으면 `CLOUDFLARE_API_TOKEN`으로 Cloudflare REST API의 Pages 배포 목록을 읽기 전용(GET)으로 조회하고(명령은 `docs/guides/GITHUB_MCP.md`), 실제 사이트 접근도 확인한다. 이 경우 MCP로 확인했다고 표현하지 않는다. 토큰에 수정 권한이 있어도 설정 변경 API는 사용자가 요청할 때만 쓴다.
- GitHub 대체 경로: MCP 장애 시 `gh` CLI(로그인된 경우) → `git` CLI(`git ls-remote`, `git log origin/main`) 순으로 쓰고, 실제 사용한 경로를 보고한다.
- 브라우저: Codex 인앱 브라우저는 Claude Code 내장 브라우저에 해당한다. 사용자 로그인이 필요한 사이트는 사용자가 직접 로그인한다. 사용자의 실제 Chrome(Codex chrome 스킬, Claude in Chrome)은 사용자가 요청할 때만 쓴다.
- 독립 에이전트: 3인 독립 품질 검토의 "별도 에이전트"는 Codex 하위 에이전트 또는 Claude Code Agent 도구로 띄운다. 서로의 결과를 넘기지 않고 독립 보고서를 받은 뒤 교차 검토한다.
- 이미지 생성: Codex는 이미지 생성 도구를 쓸 수 있다. Claude Code에는 없으므로 정보 이미지는 HTML/SVG를 headless Chrome·Edge로 캡처해 만들고, AI 일러스트가 필요하면 사용자에게 알린다.
- commit 메시지: Claude Code는 끝에 `Co-Authored-By: Claude …` 줄을 붙인다. 사용자가 빼라고 하기 전까지 유지한다.

## 3인 독립 품질 검토

- 성능·보안·디자인 검토는 `docs/guides/THREE_ENGINEER_REVIEW.md`와 보고서 양식을 따른다.
- 매 작업의 검토는 변경 범위에 비례하게 세 역할로 분리한다. 가능하면 별도 에이전트 3개가 독립 결론을 작성한 뒤 교차 검토한다. 한 사람의 종합 인상평으로 대체하지 않는다.
- 실제 측정·브라우저·권한 검증을 하지 않은 항목은 미검증이다. 정적 테스트 통과를 운영 전체 평가로 표현하지 않는다.
- 사용자는 자동 예약 없이 필요할 때 실행하도록 선택했다. 전체 정기 평가는 요청 시 실행하며 예약이 있다고 주장하지 않는다.
