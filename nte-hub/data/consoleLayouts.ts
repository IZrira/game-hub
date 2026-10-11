import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

export type NTEConsoleLayoutType = 1 | 2 | 3 | 4;

const CHARACTER_CONSOLE_LAYOUTS: Record<string, NTEConsoleLayoutType> = {
  사키리: 1,
  하니엘: 1,
  아들러: 1,
  호토리: 1,
  일로이: 1,
  치즈: 2,
  민트: 2,
  백장: 2,
  스키아: 2,
  카오스: 2,
  잔홍: 2,
  링코: 2,
  감정사: 3,
  다포딜: 3,
  하토르: 3,
  우미츠키: 3,
  파디아: 3,
  구원: 4,
  에드가: 4,
  나나리: 4,
  라크리모사: 4,
  신쿠: 4,
};

export const getNTEConsoleLayoutType = (characterName?: string): NTEConsoleLayoutType | null => {
  if (!characterName) return null;
  return CHARACTER_CONSOLE_LAYOUTS[characterName] ?? null;
};

export const getNTEConsoleLayoutImageUrl = (layoutType: NTEConsoleLayoutType) =>
  `${CDN_URL}/nte%20images/Console/${safeEncodeURIComponent(`콘솔 배치 유형 ${layoutType}.webp`)}`;
