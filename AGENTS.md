# 프로젝트 작업 규칙

이 규칙은 현재 원본 프로젝트 `D:\rira game hub\game-hub`와 하위 경로의 모든 작업에 적용한다.

## 기본 작업 규칙

1. 사용자가 요청한 작업을 정확히 수행한다.
2. 요청하지 않은 기능이나 데이터를 임의로 변경하지 않는다.
3. 기존 디자인과 기존 기능을 최대한 유지한다.
4. 작업 시작 전에 `git status`를 확인한다.
5. 원본 프로젝트를 직접 수정한다.
6. 작업 복사본이나 patch 파일만 만드는 방식은 사용하지 않는다.
7. 캐릭터의 일반 공격(Basic Attack) 스킬이 여러 개인데 개별 고유 아이콘이 1개만 존재하는 경우, 모든 일반 공격의 아이콘은 `basic_atk_1`로 통일한다.

## Notion 동기화 규칙

Notion 동기화는 사용자가 명시적으로 요청한 경우에만 실행한다.

예:

- "노션 동기화해"
- "노션까지 갱신해"
- "Notion 데이터 업데이트해"

사용자가 Notion 동기화를 요청하지 않았다면 `prebuild` 또는 Notion 동기화 스크립트를 임의로 실행하지 않는다.

현재 `npm run build`는 기본적으로 Notion 동기화가 포함된 `prebuild`를 실행하므로, Notion 동기화 요청이 없는 빌드 검증에서는 자동 lifecycle 실행을 해당 명령에 한해 비활성화한다. `package.json`을 수정하거나 npm 전역 설정을 변경하지 않는다.

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

이 방식은 명시적으로 요청한 `build` 스크립트 자체는 실행하고, 자동 `prebuild`/`postbuild` 실행을 억제한다. 스크립트 구성이 변경되면 현재 구성을 확인하고, Notion 동기화 금지와 필요한 빌드 검증을 모두 지킨다.

Notion 동기화를 요청받았다면:

1. 현재 프로젝트의 공식 Notion 동기화 스크립트를 확인한다.
2. 해당 스크립트를 실행한다.
3. 동기화 성공 여부를 확인한다.
4. 동기화로 변경된 파일을 `git diff`로 확인한다.
5. 이후 정상적인 검증 및 배포 절차를 계속 진행한다.

명시적 동기화를 이미 실행한 경우 후속 빌드에서 불필요한 중복 동기화를 실행하지 않는다.

## 필수 검증

코드 또는 데이터가 변경된 모든 작업은 완료 전에 반드시 다음 순서로 검증한다.

1. TypeScript 타입 검사: 현재 프로젝트에서는 `npm run typecheck`.
2. `npm run build`: 위 Notion 동기화 규칙을 반드시 적용한다.
3. `git diff --check`.
4. `git diff` 확인. 신규 파일은 내용도 직접 확인한다.

현재 Windows Codex 제한 샌드박스에서는 Node `child_process.spawn`이 `EPERM`으로 차단되는 것이 확인되어 있다.

- esbuild 직접 실행은 가능하지만 Node `child_process.spawn`은 제한 샌드박스에서 실패한다.
- 따라서 `npm run build`가 `spawn EPERM`으로 실패하면 프로젝트 오류로 판단하지 않는다.
- 필요한 경우 사용자에게 추가 실행 권한을 요청하고 샌드박스 밖에서 `npm run build`를 실행한다.
- 샌드박스 밖에서는 Node spawn과 `npm run build`가 정상 동작하는 것이 이미 확인되었다.
- 권한 문제가 남아 있으면 검증 성공으로 보고하지 않는다.

빌드가 실제 코드 오류로 실패하면:

- commit 금지.
- push 금지.
- 오류 원인을 수정한다.
- 타입 검사와 build를 다시 실행한다.
- build가 성공할 때까지 검증을 반복한다.

## Git 자동 처리

사용자가 별도로 "push 하지 마", "배포하지 마", "검토만 해"라고 명시하지 않는 한 정상 완료된 작업은 항상 GitHub push까지 진행한다.

검증 성공 후:

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
