# Rira Game Hub

> 개발 작업의 공통 규칙은 [`AGENTS.md`](./AGENTS.md)를 따릅니다. Codex와 Claude Code가 함께 쓰는 단일 기준이며, Claude Code는 [`CLAUDE.md`](./CLAUDE.md)를 통해 같은 문서를 읽습니다. 원격 코드·이미지 저장소와 Cloudflare 조회는 [`GitHub MCP 운영 기준`](./docs/guides/GITHUB_MCP.md)을 따르고, 로컬 Git 검증·커밋·푸시 절차는 그대로 유지합니다.

> UI·UX 작업은 프로젝트 루트의 [`DESIGN.md`](./DESIGN.md)를 유일한 디자인 정책 기준으로 사용합니다. 공통 컴포넌트와 상태별 체크리스트는 `docs/design-system/`에서 관리합니다.

> 성능 변경과 신규 콘텐츠 개발은 [`성능 유지 기준`](./docs/guides/PERFORMANCE.md)을 따릅니다. 빌드 후 `npm run perf:audit`로 용량 회귀를 검사합니다.

> GF2 PDF·Notion 캐릭터 입력 시 [`GF2 용어 사전 및 입력 형식`](./docs/guides/GF2_TERMS.md)을 먼저 조회합니다. 용어 이름의 `_`는 공백으로 정리하고, 같은 이름의 효과를 재사용하되 수치·조건이 다른 정의는 덮어쓰지 않습니다.

> 품질 평가는 [`3인 독립 평가 기준`](./docs/guides/THREE_ENGINEER_REVIEW.md)에 따라 성능·보안·디자인 담당을 나눠 수행합니다. 자동 예약 없이 요청 시 실행하며, [`보고서 양식`](./docs/templates/three-engineer-review.md)으로 증거와 미검증 항목을 보관합니다.

여러 게임의 캐릭터·장비·공략 정보를 한곳에서 제공하는 게임 정보 사이트입니다. 운영 주소는 [riragamehub.com](https://riragamehub.com)이며, GitHub `main`에 push하면 Cloudflare Pages(`rira-game-hub`)가 자동으로 배포합니다.

---

## 게임 허브

각 게임은 독립된 폴더(`*-hub/`)와 `/gallery/:gameId` 경로를 가집니다.

- **붕괴: 스타레일 (`hsr`)**: 캐릭터, 광추, 유물·장신구, 용어집, 티어표, 파티 추천, 캐릭터 분석 가이드.
- **명조 (`ww`)**: 캐릭터, 무기, 에코, 티어표, 3인 파티 추천, 캐릭터 가이드.
- **이환 (`nte`)**: 캐릭터, 아크(무기), 티어표, 4인 파티 추천, 공략 가이드.
- **애니모 (`aniimo`)**: 도감, 지역, 속성 상성표, 성격 가이드, 파티 빌더, 진화·형태 가이드.
- **소녀전선2 (GF2)**: 용어 사전(`docs/guides/GF2_TERMS*.md`)만 준비된 상태이며 공개 라우트와 허브 폴더는 아직 없습니다.

공통 페이지: 홈, 통합 검색(`/search`), 게임별 가이드 목록(`/gallery/:gameId/guides`), 공지(`/notices`), 소개·개인정보처리방침·이용약관·문의, 관리자 화면(`/admin`).

---

## 기술 스택

- **Frontend**: React 19, React Router 8, Vite 6, TypeScript 5.8, Tailwind CSS 4, motion, lucide-react
- **다국어**: i18next (한국어·영어·일본어). 게임별 번역 묶음은 경로에 따라 필요한 것만 불러옵니다.
- **Backend·인증**: Supabase (PostgreSQL, Google·Discord OAuth, RLS, Storage)
- **호스팅**: Cloudflare Pages + Pages Functions(`functions/`)
- **이미지**: 별도 저장소 `IZrira/riragameinfo` (GitHub raw → jsDelivr 순서로 조회)
- **콘텐츠 원본 연동**: Notion API (명시적 요청 시에만 동기화)
- **테스트**: Vitest

---

## 앱 구조

```plaintext
index.html                     # SEO 기본 HTML, AdSense, Cloudflare Analytics
└─ common-hub/index.tsx        # 언어 리소스 선로드 후 렌더링
   └─ common-hub/App.tsx       # AuthProvider + RouterProvider
      └─ common-hub/router.tsx # 전체 라우트 정의 (모든 페이지 lazy loading)
```

- `router.tsx`는 `/gallery/:gameId/...` 경로에서 `gameId`를 보고 각 허브의 페이지로 분기합니다(Dispatcher 컴포넌트). 게임 전용 경로(광추, 에코, 아크, 애니모 지역 등)는 별도로 등록되어 있습니다.
- 경로가 바뀌면 `RouteLanguageGate`가 해당 게임의 번역 묶음을 먼저 불러온 뒤 페이지를 표시합니다.
- `functions/_middleware.ts`는 Cloudflare Pages Functions에서 보안 헤더, 옛 주소 301 이동, 철회한 글의 410 응답, 존재하는 경로 판별(`functions/generated-routes.ts`)을 처리합니다.

---

## 데이터 흐름

콘텐츠는 **원본 → 생성 스크립트 → 생성 결과물 → 화면** 순서로 연결됩니다. 생성 결과물은 다음 실행 때 다시 만들어지므로 직접 고치지 않고 원본이나 생성 스크립트를 수정합니다.

1. **원본 (직접 편집)**
   - HSR 캐릭터: `hsr-hub/data/characters/hsr/*.ts`, 목록 등록 `hsr-hub/data/characters.ts`
   - HSR 공략: `hsr-hub/data/guides/*.ts` (`index.ts`에 등록)
   - HSR 광추: `hsr-hub/data/lightcones/*.ts`
   - WW·NTE 데이터: `ww-hub/data/`, `nte-hub/data/`
   - Aniimo 도감: `aniimo-hub/data/aniimo.json` 등
   - 가이드 글: `common-hub/data/guideArticles.json`, 공지: `common-hub/data/notices.ts`
2. **Notion 동기화 (요청 시에만)**: `npm run sync:notion` (`scripts/fetch-notion-data.js`)
   - `common-hub/data/notion-data.json`에 WW·NTE 데이터를 저장합니다.
   - HSR 공략은 로컬 파일과 비교한 뒤 `hsr-hub/data/guides/*.ts`로 저장합니다.
3. **생성 스크립트**: `predev`, `pretest`, `build` 때 자동 실행됩니다.
   - `*-hub/data/generated/*.json`: 목록·요약 데이터, 상세 데이터 위치표(manifest). **Git에 포함됩니다.**
   - `public/assets/data/{hsr,ww,aniimo}/...`: 상세 페이지가 `fetch`로 불러오는 JSON. 파일명에 내용 해시가 붙습니다. **Git에서 제외됩니다(.gitignore).**
   - `common-hub/data/search/`: 통합 검색 인덱스, 홈 통계
   - `common-hub/locales/{hsr,ww}/`: 캐릭터·공략 번역 묶음
4. **화면**: 목록은 생성된 요약 JSON을 import하고, 상세 페이지는 manifest에서 해시 파일 경로를 찾아 필요한 순간에만 받아옵니다.

---

## 이미지

- 이미지는 이 저장소가 아니라 `IZrira/riragameinfo` 저장소의 `hsr images`, `ww images`, `nte images`, `gf2 images` 폴더에 있습니다.
- `common-hub/utils/imageSources.ts`가 `raw.githubusercontent.com` → `fastly.jsdelivr.net` → `/assets/unknown.webp` 순서로 시도합니다. 옛 `cdn.jsdelivr.net` 주소는 자동으로 새 주소로 바뀝니다.
- 이미지 누락은 코드의 참조 경로와 이미지 저장소의 실제 파일명(대소문자, 공백, 확장자, 한글 정규화)을 대조해 진단합니다.

---

## Supabase

- 인증: Google·Discord OAuth (`common-hub/context/AuthContext.tsx`, `common-hub/lib/supabase.ts`)
- 테이블: `party_recommendations`, `tier_lists`, `notices`, `character_reviews`, `comment_upvotes`, `comment_reports` 등
- 권한: 행 수준 보안(RLS)과 Storage 정책은 `supabase/migrations/`에서 관리합니다.
- 관리자 화면의 파티 추천은 Supabase → localStorage 캐시 → 코드 내장 기본값 순서로 불러오며, 편집 결과를 TypeScript 코드로 내보낼 수 있습니다(`exportPartyToTSCode`).

---

## 빌드·검증·배포

```bash
npm run dev          # 개발 서버 (port 3001), predev에서 생성 스크립트 실행
npm run typecheck    # TypeScript 검사
npm test             # Vitest 회귀 테스트 (pretest에서 생성 스크립트 실행)
npm run validate:data
npm run build        # 아래 순서로 실행
```

`npm run build` 순서: 가이드 요약 생성 → TypeScript 검사 → 검색 데이터 생성 → Aniimo·WW 실행 데이터 생성 → 사이트맵·경로 목록 생성(`public/sitemap*.xml`, `functions/generated-routes.ts`) → Vite 빌드 → 페이지 메타 사전 렌더링(`prerender-meta.js`) → SEO 검사 → 용량 예산 검사(`perf:audit`).

- Notion 동기화가 요청되지 않은 빌드는 `AGENTS.md`의 lifecycle 차단 절차로 실행합니다.
- 빌드·테스트는 `public/sitemap.xml`의 `lastmod` 같은 생성 파일을 다시 쓸 수 있으므로, 커밋 전에 이번 작업과 무관한 변경을 구분합니다.
- CI(`.github/workflows/`): `main` push 시 Quality Gate(`typecheck` → `validate:data` → `test` → `build`)와 Security Scan(`npm audit --audit-level=critical`)이 실행됩니다.
- 배포: GitHub push를 Cloudflare Pages가 자동 배포합니다. 별도 배포 명령은 실행하지 않습니다.

---

## 콘텐츠 추가 작업 방식

새 캐릭터·장비·도감을 추가하는 커밋에는 보통 다음이 함께 포함됩니다.

1. 원본 데이터 파일과 목록 등록
2. 다시 생성된 `data/generated/*.json`, 검색·번역 파일
3. `functions/generated-routes.ts`와 `public/sitemap*.xml`
4. 해당 기능의 회귀 테스트(`tests/*.test.ts`)
5. 작업 보고서와 성능·보안·디자인 검토 보고서(`docs/reports/`)
6. 캐릭터 추가 시 Obsidian 위키(`10_Wiki/👥 Characters/`) 갱신

커밋 메시지는 `feat:`, `fix:`, `content:`, `docs:`, `perf:`, `chore:` 형식을 사용하고 검증 후 `main`에 push합니다.

---

## 폴더 구조

```plaintext
game-hub/
├── common-hub/        # 진입점, 라우터, 공통 레이아웃·컴포넌트, 홈·검색·가이드·공지·관리자, i18n, 이미지 유틸
├── hsr-hub/           # 붕괴: 스타레일 (캐릭터, 광추, 유물, 공략, 티어, 파티)
├── ww-hub/            # 명조 (캐릭터, 무기, 에코, 공략, 티어, 파티)
├── nte-hub/           # 이환 (캐릭터, 아크, 공략, 티어, 파티)
├── aniimo-hub/        # 애니모 (도감, 지역, 상성, 성격, 파티 빌더)
├── functions/         # Cloudflare Pages Functions (middleware, 보안 헤더, 생성된 경로 목록)
├── scripts/           # Notion 동기화, 생성 스크립트, 사이트맵, 사전 렌더링, SEO·성능 감사
├── public/            # 정적 파일, 사이트맵, 생성된 상세 데이터(일부 Git 제외)
├── supabase/          # DB migration과 정책 테스트
├── tests/             # Vitest 회귀 테스트
├── docs/              # guides(운영 기준), skills(에이전트 스킬 원본), design-system, reports, templates
├── 00_Raw/ 10_Wiki/ 20_Meta/   # Obsidian 지식 저장소 (원자료 → 위키 → 메타)
├── AGENTS.md / CLAUDE.md       # 에이전트 작업 규칙 (Codex·Claude Code 공용)
├── DESIGN.md / SKILL.md        # 디자인 정책 / UI 작업 실행 순서
└── .github/workflows/          # Quality Gate, Security Scan
```

---

## 문의

법적·상업적 문의, 애드센스·파트너십 관련 사항은 아래 이메일로 보내 주세요.

- **Email**: [rira.game.hub@gmail.com](mailto:rira.game.hub@gmail.com)
