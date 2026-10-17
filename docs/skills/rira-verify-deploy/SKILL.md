---
name: rira-verify-deploy
description: RIRA Game Hub에서 검증배포 요청 시 변경 범위를 검증하고 허용된 파일만 커밋·푸시한 뒤 CI와 Cloudflare 결과를 확인한다. 분석만·푸시 금지 등 사용자 제한을 우선하며, 무관한 프로젝트에는 적용하지 않는다.
---

# 검증배포

호출: `검증배포` 또는 `$rira-verify-deploy`.

## 시작

대상은 `D:\rira game hub\game-hub` 원본 프로젝트다. 다른 경로라면 Git remote로 `IZrira/game-hub`인지 확인한다. 현재 요청과 루트 `AGENTS.md`, 작업 경로의 추가 지침을 읽는다. 스킬의 과거 실행 결과를 이번 검증 결과로 재사용하지 않는다.

1. `git status`, 현재 branch·HEAD·remote·diff를 확인해 이번 작업 파일과 기존 변경을 분리한다. 미커밋 변경 전체를 이번 작업으로 간주하지 않는다. 별도 보류된 `AGENTS.md`나 기존 보고서를 임의 포함하지 않는다.
2. `package.json`의 실제 스크립트만 확인해 검증 경로를 정한다. Notion 동기화는 명시적 요청이 있을 때만 실행한다. lifecycle 또는 하위 스크립트가 동기화를 호출한다면 `AGENTS.md`의 동기화 차단 절차를 적용한다.
3. 코드·데이터는 TypeScript → build → diff 검사 순서를 지킨다. 현재 명령은 `npm run typecheck`, `npm run build`, `git diff --check`, `git diff`. 회귀 영향이 있으면 관련 테스트·전체 `npm test`와 `npm run validate:data`를 추가한다. 문서 전용 변경은 AGENTS의 예외에 따른다. 실제 원본 대조·화면 검증이 필요한 변경은 빌드만으로 완료하지 않는다.
4. 성공한 build에 포함된 SEO·성능 예산 검사를 이유 없이 다시 실행하지 않는다. 생성 파일은 diff로 이번 변경에 필요한 것만 포함한다. 데이터·라우트 변경 시 사이트맵 생성과 초기 HTML 반영 여부를 확인한다. 빌드·데이터 생성은 Notion 동기화와 다르다.

## 오류와 배포

- `spawn EPERM`은 환경 제한과 코드 실패를 구분한다. 허용된 추가 실행 권한으로 재검증하고, 인증서 검증·승인 정책을 끄거나 권한을 넓혀 해결하지 않는다. 실제 검사 실패 또는 미검증 상태에서는 commit·push하지 않는다.
- 사용자 범위가 허용하고 검증이 끝났을 때만 관련 파일 경로를 지정해 stage한다. staged diff를 읽고 secret·무관한 변경이 없는지 확인한 뒤 설명형 메시지로 commit하고 확인된 production branch에 일반 push한다. `git add .`, force push, 파괴적 reset은 사용하지 않는다.
- GitHub 연동 자동 배포이면 중복 배포하지 않는다. 현재 제공되는 GitHub MCP 읽기 도구를 우선하고, 없으면 허용된 CLI/API를 사용한다. 도구 노출·인증은 세션마다 확인한다. 필요할 때만 `docs/guides/GITHUB_MCP.md`를 읽는다.
- 해당 commit의 CI·보안 audit·Cloudflare 상태를 구분한다. 실행 중에는 결과가 바뀔 시간을 두고 확인하며 짧은 진행 안내를 유지한다. 실패 시 원인을 조사하되, 별개 수정·운영 변경이 필요하면 범위를 확인한다. 끝나지 않은 배포를 성공이라고 보고하지 않는다.

## 보고

변경 파일·Notion 실행 여부·타입/테스트/build/diff 결과·commit 메시지/해시·push·CI/Cloudflare·실제 사이트 확인·남은 문제를 짧게 보고한다. 미실행·미검증은 명시한다. 성능·보안 전체 감사나 3인 독립 평가를 수행한 것으로 확대하지 않는다.
