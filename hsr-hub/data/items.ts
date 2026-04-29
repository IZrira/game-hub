import { ItemDetail } from '../../common-hub/types';
import enTranslation from '../../common-hub/en.json';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

// 데이터 소스 임포트
import { CONSUMABLE_DATA } from './consumables';
import { EXP_ITEM_DATA, CHARACTER_ASCENSION_DATA, TRACE_PATH_DATA, ADVANCED_TRACE_DATA, COMMON_DROP_DATA, SYNTHESIS_MATERIAL_DATA } from './materials';
import { WARP_ITEM_DATA, CURRENCY_DATA, SIMULATED_UNIVERSE_DATA, CURRENCY_WARS_DATA } from './currencies';

/** 아이템 데이터베이스를 조립하는 함수 (내부용) */
const assembleItemDB = (): Record<string, ItemDetail> => {
  return {
    ...EXP_ITEM_DATA,
    ...CHARACTER_ASCENSION_DATA,
    ...TRACE_PATH_DATA,
    ...ADVANCED_TRACE_DATA,
    ...COMMON_DROP_DATA,
    ...CONSUMABLE_DATA,
    ...SYNTHESIS_MATERIAL_DATA,
    ...WARP_ITEM_DATA,
    ...CURRENCY_DATA,
    ...SIMULATED_UNIVERSE_DATA,
    ...CURRENCY_WARS_DATA
  };
};

/** 조립된 정적 데이터베이스 캐시 */
export const ITEM_META: Record<string, ItemDetail> = assembleItemDB();

/** 외부에서 DB에 접근할 때 사용하는 함수 */
export const getItemMetaDB = (): Record<string, ItemDetail> => ITEM_META;

/** 영어 명칭을 한글 명칭으로 역매핑하는 사전 */
export const REVERSE_ITEM_MAP: Record<string, string> = Object.entries(enTranslation).reduce((acc, [ko, en]) => {
  acc[en as string] = ko;
  return acc;
}, {} as Record<string, string>);

/** 이름에 따른 등급(희귀도) 자동 판별 */
export const getAutoRarity = (name: string): number => {
  const normalized = (name || "").normalize('NFC').replace(/\u00A0/g, ' ');
  const originalName = REVERSE_ITEM_MAP[normalized] || normalized;
  return ITEM_META[originalName]?.rarity || 3;
};

/** 아이템 에셋 URL 생성 */
export const getItemUrl = (name: string, gameId: string = 'hsr'): string | null => {
  if (!name) return null;
  const normalized = name.normalize('NFC').replace(/\u00A0/g, ' ');
  const originalName = REVERSE_ITEM_MAP[normalized] || normalized;
  const itemDetail = ITEM_META[originalName];
  
  const targetFileName = itemDetail?.fileName || originalName.replace(/: /g, '_').replace(/:/g, '_');
  
  // GitHub Raw URL (403/CORB 방지)
  return `https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/items/${safeEncodeURIComponent(targetFileName)}.webp`;
};

/** 아이템 메타 정보 획득 */
export const getItemMeta = (name: string): ItemDetail | undefined => {
  const normalized = (name || "").normalize('NFC').replace(/\u00A0/g, ' ');
  const originalName = REVERSE_ITEM_MAP[normalized] || normalized;
  return ITEM_META[originalName];
};

export const FILTER_CATEGORIES = ['전체', '캐릭터 성장', '광추/무기', '유물/에코', '재화/소모품'];