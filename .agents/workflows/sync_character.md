---
description: Sync character wiki specs with code data and locales safely under security constraints
---

When the user types `/sync-character <char_name>`, run the following secure development pipeline:

### Execution Sequence:
1. **Context: @pm (Requirements Gathering)**
   - `10_Wiki/👥 Characters/WW/<char_name>.md` 파일을 분석하고 데이터 명세 명세서 `production_artifacts/spec_<char_name>.json`을 빌드합니다.
   - PII(개인정보) 유출 요소나 외부 보안 위험 요소가 없는지 1차 자가 진단합니다.
   - 데이터 포맷과 스키마 적합성에 대해 유저 확인을 구합니다. (유저가 "Approved"를 입력할 때까지 안전을 위해 대기)

2. **Context: @engineer (Secure Implementation)**
   - 승인된 명세를 기반으로 `ww-hub/data/characters/ww/<char_name>.ts`에 데이터를 매핑합니다.
   - 번역 문자열 `common-hub/locales/ww/ww_characters_ko.json` 및 `ww_characters_en.json`을 수정합니다.
   - 이 과정에서 `skills/update_locales.md` 및 `skills/credential_leak_prevention.md`에 기술된 하드코딩 방지 지침을 필히 준수합니다.

3. **Context: @qa (Security & Code Integrity Audit)**
   - `python rebuild_ww_wiki.py` 스크립트를 실행하여 데이터의 무결성을 테스트합니다.
   - `skills/dependency_audit.md` 스킬 지침에 따라 모듈 취약성을 점검하고 전체 빌드(`npm run build`) 테스트를 통과하는지 감사합니다.
   - 린트 또는 보안 검사 실패 시 수정 피드백을 기록하여 `@engineer`에게 전달하고 변경을 롤백합니다.

4. **Context: @devops (Secure Hosting & Delivery)**
   - `skills/secure_command_execution.md` 규칙 하에 권한을 엄격히 통제한 터미널을 작동합니다.
   - `node scripts/generate-sitemap.js`를 실행하여 검색 노출을 위한 사이트맵을 재생성합니다.
   - `git diff --cached`를 기동하여 최종 민감 정보 누출 검사를 마친 뒤 커밋하고 원격 저장소(`main` 브랜치)에 안전하게 배포(Push)합니다.
