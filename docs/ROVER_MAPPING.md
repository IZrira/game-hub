# 방랑자 시리즈 매핑 규칙 (Rover Asset Mapping Rules)

명조(Wuthering Waves)의 주인공 캐릭터인 **방랑자(Rover)** 시리즈의 이미지 에셋 매핑 규칙을 정의합니다.

## 이미지 파일 명명 규칙 (Image Naming Convention)

방랑자의 속성 및 성별에 따른 이미지 파일은 다음의 명명 규칙을 엄격히 준수해야 합니다.

### 패턴 (Pattern)
- **여성 방랑자**: `방랑자 · 속성명(여).webp`
- **남성 방랑자**: `방랑자 · 속성명(남).webp`

### 속성별 예시 (Examples by Attribute)

| 속성 (Attribute) | 여성 방랑자 (Female) | 남성 방랑자 (Male) |
| :--- | :--- | :--- |
| **인멸 (Havoc)** | `방랑자 · 인멸(여).webp` | `방랑자 · 인멸(남).webp` |
| **기류 (Aero)** | `방랑자 · 기류(여).webp` | `방랑자 · 기류(남).webp` |
| **회절 (Spectro)** | `방랑자 · 회절(여).webp` | `방랑자 · 회절(남).webp` |

## 구현 시 주의사항 (Implementation Notes)

1. **파일명 일관성**: 데이터 파일(`rover_havoc.ts` 등)에서 `folderName` 또는 이미지 경로 설정 시 위 규칙을 기반으로 동적 생성이 가능하도록 구현하십시오.
2. **확장자**: 모든 이미지는 고효율 이미지 포맷인 `.webp`를 사용합니다.
3. **경로**: 일반적으로 에셋은 `/assets/characters/ww/rover/` 또는 지정된 CDN 경로 내에 위치합니다.
