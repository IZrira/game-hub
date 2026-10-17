# 갈브레나·플로로 Notion 재동기화

## 수행 및 대조

사용자 명시 요청으로 공식 scripts/fetch-notion-data.js에 두 이름만 선택하는 옵션을 추가해 실행했다. 읽기/본문 실패, 누락/중복, 기존 UUID 불일치는 파일 저장 전 중단한다. 기존 배열 위치와 나머지 속성은 보존하며 캐릭터 두 건만 교체한다. 전체 DB·공략·다른 게임은 동기화하지 않았다.

- 전체 1,499개 및 순서 유지. 원본 diff의 변경은 두 캐릭터뿐이다.
- 갈브레나의 본문·수치는 최신 조회와 기존 값이 같았다. 공용 추출기의 consoleLayoutType:null만 추가됐다.
- 플로로는 skillInputGuide의 키·마우스 표기 변경과 consoleLayoutType:null이 반영됐다.
- 생성 characters.json 및 phrolova runtime의 입력 문장 4개를 원본과 대조했다. 두 번째 문장의 [mouse left 이미지] 3개는 새 원본에도 남아 있어 보존했다. 현재 아이콘 렌더러가 해당 표기를 일반 텍스트로 표시하는 문제는 동기화 누락과 구분한다.

## TLS 및 실행 방법

스크립트의 전역 TLS 인증서 검증 우회는 제거했다. 최초 실행은 인증서 체인 오류로 실패했고 저장하지 않았다. Windows 시스템 인증서를 사용한 다음 명령은 검증을 유지하며 성공했다.

```powershell
node --use-system-ca scripts/fetch-notion-data.js --ww-character-names=갈브레나,플로로
```

Node가 --use-system-ca를 지원하는 환경에서 사용한다. 신뢰 가능한 CA가 없는 환경에서는 실패를 숨기거나 TLS 검증을 끄지 않는다. 정상 동기화 이후 빌드에서 Notion을 다시 호출하지 않았다.

## 검증 및 독립 검토

타입 검사, 전체 52파일 372테스트, production build·SEO/성능 예산·diff 검사 통과. 초기 HTML·runtime·사이트맵 생성 완료. source contract 2개는 스크립트 구조 보호이며 실제 Notion 동기화 성공과 별개의 증거다.

성능·보안·UX 에이전트가 각각 읽기 전용으로 diff/객체를 검토했다. 다른 레코드 변경·비대화·새 secret 노출의 차단점은 없었다. UX 검토는 위 잔존 원본 표기를 확인했다. 디자인 컴포넌트 변경 없음. 실제 사용자의 인증 상태나 Notion DB 내용을 수정하지 않았다. CI/푸시/배포 결과는 완료 보고에 명시한다.
