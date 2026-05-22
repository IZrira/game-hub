# Skill: Safe Locales Update

## Objective
`common-hub/locales/ww/ww_characters_ko.json` 및 `ww_characters_en.json` 수정 시 렌더링 중복을 예방합니다.

## Instructions
1. **컴포넌트 자동 렌더링 확인**:
   - `ww-hub/components/WuwaSkillInput.tsx` 등에서 `공명 회로 게이지.webp`를 자동 노출하는 조건인지 확인합니다.
   - `hideGauge`가 명시적으로 true인 캐릭터가 아니라면, `skillInput.overview`나 `inputs` 필드에 물리적 이미지 링크(`[공명 회로 게이지.webp]`)를 절대 추가하지 마십시오.
2. **키 동기화**:
   - ko.json에 추가된 키는 반드시 en.json에도 쌍을 맞춰 추가해야 합니다.
