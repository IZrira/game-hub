import { CONSUMABLE_DATA } from './consumables';
import { EXP_ITEM_DATA, CHARACTER_ASCENSION_DATA, TRACE_PATH_DATA, ADVANCED_TRACE_DATA, COMMON_DROP_DATA, SYNTHESIS_MATERIAL_DATA } from './materials';
import { WARP_ITEM_DATA, CURRENCY_DATA, SIMULATED_UNIVERSE_DATA, CURRENCY_WARS_DATA } from './currencies';
import { WW_ITEM_DATA } from './ww_items';
import { ashveil_en } from './ashveil';
import castorice_en from '../castorice';

// 다국어 로드를 위한 영문 번역 메타데이터 통합
export const CHARACTER_DB_EN = [
  ashveil_en,
  castorice_en
];

export const INVENTORY_DB = {
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
  ...CURRENCY_WARS_DATA,
  ...WW_ITEM_DATA
};

export * from './types';