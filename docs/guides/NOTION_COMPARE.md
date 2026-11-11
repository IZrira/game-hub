> **문서 용도**: Notion DB와 사이트 데이터를 대조하는 프로그램(`scripts/notion-compare/`)과 대조표 운영 절차. 에이전트와 사용자가 함께 본다. 공개 페이지에는 쓰지 않는다.

# Notion 데이터 대조표

## 무엇을 하나

- Notion DB(읽기 전용)와 사이트 데이터 파일을 항목별로 비교해 다른 곳을 모은다.
- 결과는 비공개 대조표 페이지로 보고, 항목마다 어느 쪽에 맞출지 고른다.
- 고른 결과를 Claude가 읽어 사이트 파일·Notion 원본을 고친다.
- 자동 예약은 없다. 사용자가 요청할 때 실행한다(사용자 결정).

## 실행

```bash
npm run compare:notion
```

```bash
npm run compare:notion -- hsr
```

- 필요한 것: `.env.local`의 `NOTION_TOKEN`, 각 DB가 연동 계정(Rira-Game-Hub-DB)에 공유돼 있어야 한다.
- 결과: `.tmp/notion-compare/items.json`(항목 목록), `.tmp/notion-compare/review.html`(대조표 페이지). 둘 다 Git 제외다.
- Notion 요청 속도 제한 때문에 페이지마다 잠깐 쉰다. HSR 전체는 몇 분 걸린다.

## 대조표 게시

- 대조표 주소: https://claude.ai/artifact/QzebC8KKRnVMtCoYz2pybe (비공개, 소유자만 열 수 있음)
- 갱신할 때는 `review.html`을 같은 주소로 다시 게시한다. 선택·메모는 아티팩트 저장소(`decisions` 모음)에 있어서 다시 게시해도 남는다.
- 선택 문서 하나: `choice`(notion·site·both·memo·ignore·hold), `note`, `hub`, `db`, `target`, `cat`, `label`, `hash`, `updatedAt`.

## 항목 id와 상태

- 항목 id는 위치(허브·DB·대상·분류·라벨)로 정한다. 문구가 바뀌어도 같은 차이면 선택이 이어진다.
- `hash`는 비교한 문구로 정한다. 선택할 때의 `hash`와 지금 항목의 `hash`가 다르면 "선택 후 내용 바뀜"으로 표시한다. 다시 확인이 필요하다는 뜻이다.
- 선택은 있는데 지금 대조에 나오지 않는 항목은 "해결됨"으로 모인다. 수정이 반영됐거나 비교 방식이 바뀐 경우다.
- HSR 항목의 `legacyId`는 2026-11-11 수동 대조 때의 id다. 그때 저장한 선택을 이어 쓰기 위해 둔다.

## "대조표대로 수정" 절차

1. 아티팩트 저장소의 `decisions`를 모두 읽고, 최신 `items.json`(먼저 `compare:notion` 실행)과 짝짓는다. 짝은 `id` 또는 `legacyId`로 찾는다.
2. 고칠 대상만 고른다.
   - `site`(사이트 기준): Notion을 사이트 값으로 고친다.
   - `notion`(Notion 기준): 사이트 파일을 Notion 값으로 고친다.
   - `both`, `memo`: 메모에 적힌 대로 고친다. 메모가 비었거나 뜻이 불분명하면 고치지 않고 사용자에게 묻는다.
   - `ignore`, `hold`, 해결됨, "선택 후 내용 바뀜"은 고치지 않는다(내용 바뀜은 사용자에게 다시 확인).
3. Notion 수정은 `AGENTS.md`의 "Notion 원본 함께 수정" 절차를 따른다. 한 블록·한 속성에만 있는 문장만 바꾸고, 바꾼 뒤 다시 읽어 확인한다.
4. 사이트 파일 수정 뒤에는 필수 검증(타입 검사, 빌드, diff)을 거쳐 commit·push한다.
5. `compare:notion`을 다시 실행해 고친 항목이 "해결됨"으로 옮겨 갔는지 확인하고, 대조표를 다시 게시한다.

## 허브 추가

- `scripts/notion-compare/hubs/<허브>/index.js`에 허브 객체(`id`, `name`, `compare()`)를 만들고 `scripts/notion-compare/index.js`의 `HUBS`에 넣는다.
- `compare()`는 Notion DB를 읽고(`lib/notion.js`), 사이트 TypeScript 데이터를 불러와(`lib/site-data.js`) 차이마다 `list.add({ db, target, cat, label?, notion?, site?, text?, kind?, hint? })`를 부른다.
- 문구 비교는 `lib/text.js`의 `textKind`를 쓴다. 띄어쓰기만 다르면 차이로 세지 않는다.
- 공통 규칙: 어느 쪽이 맞는지 추정해 값을 채우지 않는다. 데이터만 보고 알 수 있는 경우에만 `hint`(예: "반올림 차이", "Notion 오타 의심")를 단다.

## HSR 비교 범위

- 캐릭터: 기본 정보, 언어별 표기, 성우, 간단 정보, 성장 스탯, 승급·행적 재료, 스킬·추가 능력·성혼 이름과 문구, 속성 보너스. "(AS)" 페이지는 `asBuffData`와 비교한다.
- 광추: 이름, 운명의 길, 성급, 출시 버전, 효과 이름·문구(사이트가 1중첩 수치만 적은 경우 구분), 성장 스탯, 돌파 재료, 스토리.
- 유물·장신구: 종류, 출시 버전(유물만), 2·4세트 효과, 파츠 이름.
- 공략: 동기화 스크립트의 비교 기준(추천 장비, 주옵션, 부옵션, 목표 스탯, 스킬 우선순위, 추천 파티). 공략 본문 문단은 비교하지 않는다.
- 추천 파티: 파티 구성과 대체 캐릭터.
