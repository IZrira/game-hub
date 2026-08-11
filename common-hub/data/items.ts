import { ItemDetail } from '../types';
import enTranslation from '../en.json';
import { CDN_URL, safeEncodeURIComponent } from '../utils/assetManager';

// 데이터 소스 임포트
import { CONSUMABLE_DATA } from '../../hsr-hub/data/consumables';
import { EXP_ITEM_DATA, CHARACTER_ASCENSION_DATA, TRACE_PATH_DATA, ADVANCED_TRACE_DATA, COMMON_DROP_DATA, SYNTHESIS_MATERIAL_DATA } from '../../hsr-hub/data/materials';
import { WARP_ITEM_DATA, CURRENCY_DATA, SIMULATED_UNIVERSE_DATA, CURRENCY_WARS_DATA } from '../../hsr-hub/data/currencies';
import { WW_ITEM_META } from '../../ww-hub/data/items';
import notionData from './notion-data.json';

/** 아이템 데이터베이스를 조립하는 함수 (내부용) */
const assembleItemDB = (): Record<string, any> => {
  const hsrDB = {
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

  // WW 데이터를 공통 규격으로 변환
  const wwDB = Object.entries(WW_ITEM_META).reduce((acc, [name, item]) => {
    acc[name] = {
      name: item.name,
      type: item.category,
      rarity: item.rarity,
      desc: item.description,
      sources: item.source ? [item.source] : ["정보 없음"],
      folderName: item.folderName,
      gameId: 'ww'
    };
    return acc;
  }, {} as Record<string, any>);

  // 노션 아이템 데이터 병합 (노션이 우선순위를 가짐)
  if (Array.isArray(notionData)) {
    notionData.forEach((item: any) => {
      if (item.dbSource === 'ww_items' || item.dbSource === 'nte_items' || (!item.dbSource && (item.type === '아이템' || item.type === '소모품' || item.type === '재료' || item.type === '육성 아이템' || item.type === '성급' || !item.type))) {
        const itemName = item.name;
        if (itemName) {
          wwDB[itemName] = {
            name: itemName,
            type: item.type || wwDB[itemName]?.type || '기타',
            rarity: item.rarity || wwDB[itemName]?.rarity || 3,
            desc: item.content || item.skillDescription || wwDB[itemName]?.desc || '',
            sources: item.obtain ? item.obtain.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean) : wwDB[itemName]?.sources || ["정보 없음"],
            folderName: itemName,
            fileName: item.fileName || wwDB[itemName]?.fileName || '',
            gameId: item.dbSource === 'nte_items' ? 'nte' : 'ww'
          };
        }
      }
    });
  }

  return { ...hsrDB, ...wwDB };
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
export const getItemUrl = (name: string, gameId: string = 'hsr', overrideFileName?: string): string | null => {
  if (!name) return null;
  const normalized = name.normalize('NFC').replace(/\u00A0/g, ' ');
  const originalName = REVERSE_ITEM_MAP[normalized] || normalized;
  const itemDetail = ITEM_META[originalName];
  
  const targetGameId = itemDetail?.gameId || gameId;
  let targetFileName = overrideFileName || itemDetail?.fileName || itemDetail?.folderName || originalName.replace(/: /g, '_').replace(/:/g, '_');
  
  // Windows 파일 시스템 규칙에 맞춰 특수문자 치환 (사용자 요청: V???의 노트 -> V의 노트, <수감 판타지> -> 수감 판타지)
  targetFileName = targetFileName.replace(/[?<>]/g, '');
  
  if (targetGameId === 'ww') {
    return `${CDN_URL}/ww%20images/items/${safeEncodeURIComponent(targetFileName)}.webp`;
  }
  
  if (targetGameId === 'nte') {
    let nteFileName = overrideFileName || itemDetail?.fileName || itemDetail?.folderName || originalName;
    nteFileName = nteFileName.replace(/\//g, ''); // 1/3 -> 13
    nteFileName = nteFileName.replace(/: /g, '_'); 
    nteFileName = nteFileName.replace(/:/g, '_'); 
    nteFileName = nteFileName.replace(/[?<>]/g, '');
    
    return `${CDN_URL}/nte%20images/items/${safeEncodeURIComponent(nteFileName)}.webp`;
  }
  
  return `${CDN_URL}/hsr%20images/items/${safeEncodeURIComponent(targetFileName)}.webp`;
};

/** 아이템 메타 정보 획득 */
export const getItemMeta = (name: string): ItemDetail | undefined => {
  const normalized = (name || "").normalize('NFC').replace(/\u00A0/g, ' ');
  const originalName = REVERSE_ITEM_MAP[normalized] || normalized;
  return ITEM_META[originalName];
};

export const FILTER_CATEGORIES = ['전체', '캐릭터 성장', '광추/무기', '유물/에코', '재화/소모품'];

/** 아이템 타입에 따른 대분류 판별 */
export const categorizeItem = (type: string): string => {
  if (!type) return '기타';
  
  if (type.includes('경험치') || type.includes('돌파') || type.includes('재료') || type.includes('행적')) {
    if (type.includes('광추') || type.includes('무기')) return '광추/무기';
    if (type.includes('에코') || type.includes('유물')) return '유물/에코';
    return '캐릭터 성장';
  }
  
  if (type.includes('화폐') || type.includes('소모품') || type.includes('요리') || type.includes('아이템') || type.includes('시뮬레이션')) {
    return '재화/소모품';
  }

  return '재화/소모품'; // 기본값
};
