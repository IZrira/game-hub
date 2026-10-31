# Aniimo 웨이브 군도 추가 — 보안 독립 검토

## 공통 실행 정보

- 실행 ID: aniimo-wave-security-2026-10-31 / 프로토콜 1.0.
- 일시: 2026-10-31 11:45 KST.
- 담당 에이전트: `/root/wave_security_review`.
- 대상: `main`, 기준 commit `7d056e89983b97d4f97e330d32651476967c3a36` 이후 미커밋 Aniimo 변경.
- 범위: 신규 공식 도감 수집·파싱, 지역별 식별자, JSON 생성, 공개 렌더링, 검색·사이트맵·서식지 경로 변경.
- 제외: 운영 인증·Supabase·Cloudflare 설정·전체 의존성 감사. 해당 영역은 이번 변경에 포함되지 않는다.
- 환경: Windows / PowerShell / Node 24.19.0 / Vitest 5.0.3. 브라우저·viewport·콜드 캐시 검사는 이 정적 보안 검토에 적용하지 않았다.
- 권한: 저장소 읽기 및 전용 검토 보고서 작성. Notion 동기화·운영 DB 쓰기·권한 변경은 실행하지 않았다.
- 다른 담당의 결론을 열람하기 전에 아래 1차 보안 결론을 고정했다.

## 독립 판정

**변경 범위에서 확인한 보안 차단 결함 없음.** 수집 경로, 원본 보존, 공개 데이터의 외부 호스트와 텍스트 렌더링을 확인했다. 이는 운영 전체 보안 통과나 침투 테스트 완료를 의미하지 않는다.

## 실행 및 증거

### SEC-01 — 공식 수집 경로 제한 / PASS

- `scripts/fetch-aniimo-wave-data.js`는 `https://wiki.aniimo.com`을 고정 기준으로 URL을 만들고 origin 일치 여부를 확인한다.
- fetch에 `redirect: 'error'`, 30초 timeout, HTTP 성공 여부 검사가 있다. 외부 출처의 리디렉션을 따라 내부 주소나 임의 호스트로 이동하지 않는다.
- `parseWaveRoster`는 `/ko/item/NNN/<form>/300301` 경로와 29개의 번호 집합을 확인한다. 형태 링크도 동일한 번호와 지역 경로로 제한된다.
- 수집 HTML에서 스크립트를 실행하지 않고 Cheerio로 필요한 DOM만 읽는다. 새 코드에서 `eval`, 셸 실행, 환경 변수·자격 증명 사용을 발견하지 않았다.

### SEC-02 — 기존 데이터와 식별자 보존 / PASS

- 기존 `aniimo-hub/data/aniimo.json`은 Git diff 대상에 없었다.
- 직접 계산한 SHA-256: `a0d257b7dc68db76fa3a532668be565288ef576f5e767ba72e9d96effab0cb93`.
- 신규 29종·42형태는 별도 `wave-archipelago.json`에 저장된다. 수집 도중 결과를 기존 86종 파일에 쓰는 경로가 없다.
- `loadAniimoCatalog`는 기존 번호와 신규 `wave-archipelago-NNN` 식별자를 합쳐 중복을 검사한다.
- 상세 JSON 파일명·비교 선택·진화 조회에서 `id || number`를 사용하고, 기존 파티 번호 참조는 legacy 항목으로 제한한다. 새 지역의 `001`이 기존 `001` 데이터를 덮어쓰는 경로를 확인하지 않았다.

### SEC-03 — 공개 콘텐츠 및 링크 / PASS

- 새 JSON의 모든 HTTP(S) 값을 재귀 검사했다. 확인된 호스트는 `wiki.aniimo.com`, `worldx-website-cdn.aniimo.com` 두 곳뿐이며 다른 호스트는 없었다.
- 새 데이터와 새 수집·파서 코드에서 Notion URL, 토큰·비밀번호·서비스 역할 키를 발견하지 않았다. 실제 secret 값은 수집하거나 보고서에 출력하지 않았다.
- React에서 설명·명칭을 텍스트로 렌더링하며 신규 `dangerouslySetInnerHTML` 경로는 없다.
- 초기 HTML 생성의 신규 설명·스킬·지역·진화 라벨은 `escapeHtml`, 경로 구성 요소는 `encodeURIComponent`를 사용한다.
- 알 수 없는 진화 대상은 링크 없이 미확인 상태로 처리한다. 원본에 없는 이름을 추정해 URL을 만들지 않는다.

### SEC-04 — 회귀 검증 / PASS

실행 명령:

```powershell
npx vitest run tests/aniimo-wave-data.test.ts tests/aniimo-region-identity.test.tsx tests/aniimo-wave-locations.test.ts
```

- 결과: 3개 테스트 파일, 13개 테스트 통과.
- 원본 SHA, 신규 29종·42형태, 번호 분리, 공식 경로, 미확인 진화 처리, 신규 서식지 경로 및 기존 별칭 보존을 검증한다.
- `package.json`, lockfile, 공개 보안 헤더·리디렉션 파일에는 이번 범위 변경이 없었다.

## 미검증 및 비적용

- **UNVERIFIED:** 최종 commit의 운영 응답·CSP·보안 헤더·배포 상태. 주 담당의 최종 배포 확인이 필요하며 이 보고서로 대체하지 않는다.
- **UNVERIFIED:** 최종 production 번들·전체 빌드·전체 테스트. 본 담당은 위 13개 관련 테스트만 독립 실행했다.
- **N/A:** 계정 간 접근 거부, RLS, 관리자 권한, 쿠키·캐시 정책 검증. 이번 도감 추가는 해당 정책을 변경하지 않는다.
- **N/A:** 새 의존성 audit. 의존성이나 lockfile 변경이 없다. 기존 취약점이 없다는 주장으로 해석하지 않는다.

## 교차 검토

- 보안 → 성능: 확인한 diff에서 인증·CSP·캐시 보호를 완화하거나 데이터를 공유 캐시에 추가해 성능을 높이는 변경은 없었다. 상세를 식별자별 JSON으로 계속 분리한다.
- 성능·디자인 담당의 독립 결과와 최종 배포 상태는 주 담당이 취합한다.

## 완료 범위

- 본 담당이 작성한 파일: 이 보고서 1개.
- 프로젝트 코드 수정·Notion 실행·commit·push·배포는 수행하지 않았다.
- 확인한 변경 범위에 P0/P1 보안 차단 항목은 없다. 운영 전체 보안은 이번 판정 범위 밖이다.
