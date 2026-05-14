import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { WW_DATA_ALL } from '../../ww-hub/data/index';
import { CHARACTER_DB_EN } from './index';
import i18n from '../i18n';

export const getGameData = (targetId: string) => {
  const isEn = targetId === 'en';
  const gameId = isEn ? 'hsr' : targetId; // 기본적으로 'en' 요청은 HSR 번역용으로 처리

  // 1. 도메인별 데이터를 독립적으로 정의합니다.
  const hsrData = {
    CHARACTER_DB: HSR_DATA_ALL.CHARACTER_DB,
    LIGHTCONE_DB: HSR_DATA_ALL.LIGHTCONE_DB,
    RELIC_DB: HSR_DATA_ALL.RELIC_DB,
    ORNAMENT_DB: HSR_DATA_ALL.ORNAMENT_DB,
    INVENTORY_DB: Object.fromEntries(
      Object.entries(HSR_DATA_ALL.INVENTORY_DB).map(([k, v]: [string, any]) => [k, { ...v, gameId: 'hsr' }])
    ),
    GUIDES: HSR_DATA_ALL.GUIDES,
    NOTICES: HSR_DATA_ALL.NOTICES
  };

  const wwData = {
    CHARACTER_DB: WW_DATA_ALL.CHARACTER_DB,
    WEAPON_DB: WW_DATA_ALL.WEAPON_DATA,
    ECHO_DB: WW_DATA_ALL.ECHO_DATA,
    INVENTORY_DB: (WW_DATA_ALL.ITEM_DATA || []).reduce((acc: any, item: any) => {
      acc[item.name || item.id] = { ...item, gameId: 'ww' };
      return acc;
    }, {}),
    NOTICES: WW_DATA_ALL.NOTICES,
    GUIDES: WW_DATA_ALL.GUIDES
  };

  // 2. 요청된 ID에 따라 관련 데이터셋을 선택합니다.
  let baseData: any;
  if (gameId === 'hsr') {
    baseData = {
      CHARACTER_DB: hsrData.CHARACTER_DB,
      LIGHTCONE_DB: hsrData.LIGHTCONE_DB,
      RELIC_DB: hsrData.RELIC_DB,
      ORNAMENT_DB: hsrData.ORNAMENT_DB,
      HSR_INVENTORY: hsrData.INVENTORY_DB,
      INVENTORY_DB: hsrData.INVENTORY_DB,
      NOTICES: hsrData.NOTICES,
      GUIDES: hsrData.GUIDES
    };
  } else if (gameId === 'ww') {
    baseData = {
      CHARACTER_DB: wwData.CHARACTER_DB,
      WEAPON_DB: wwData.WEAPON_DB,
      ECHO_DB: wwData.ECHO_DB,
      WW_INVENTORY: wwData.INVENTORY_DB,
      INVENTORY_DB: wwData.INVENTORY_DB,
      NOTICES: wwData.NOTICES,
      GUIDES: wwData.GUIDES
    };
  } else {
    // 폴백: 전체 병합 (언어 코드 'ko' 등이 들어왔을 때 데이터 유실 방지)
    baseData = {
      CHARACTER_DB: [...hsrData.CHARACTER_DB, ...wwData.CHARACTER_DB],
      LIGHTCONE_DB: hsrData.LIGHTCONE_DB,
      WEAPON_DB: wwData.WEAPON_DB, // 명조 무기 복구
      ECHO_DB: wwData.ECHO_DB,     // 명조 에코 복구
      RELIC_DB: hsrData.RELIC_DB,
      ORNAMENT_DB: hsrData.ORNAMENT_DB,
      INVENTORY_DB: { ...hsrData.INVENTORY_DB, ...wwData.INVENTORY_DB },
      GUIDES: [...hsrData.GUIDES, ...wwData.GUIDES],
      NOTICES: [...hsrData.NOTICES, ...wwData.NOTICES]
    };
  }

  if (isEn) {
    const translatedCharacters = baseData.CHARACTER_DB.map(koChar => {
      const enChar = CHARACTER_DB_EN.find((c: any) => c.id === koChar.id);

      // 1. 완전한 형태의 영어 파일(ashveil_en)이 존재하면 병합 없이 100% 통째로 교체합니다!
      if (enChar) {
        return { ...enChar, originalName: koChar.name };
      }

      // 2. 아직 영어 파일이 없는 캐릭터만 기존 KO 버전에 이름만 영어로 유지
      return {
        ...koChar,
        originalName: koChar.name, // 혹시 모를 로직 에러를 대비해 한글 원본 이름 보존
        name: i18n.t(koChar.name),
        path: koChar.path ? (i18n.t(koChar.path) as any) : undefined,
        attribute: koChar.attribute ? (i18n.t(koChar.attribute) as any) : undefined,
        materials_v2: {
          ascension: koChar.materials_v2?.ascension?.map((m: any) => ({ ...m, name: i18n.t(m.name) })) || [],
          traces: koChar.materials_v2?.traces?.map((m: any) => ({ ...m, name: i18n.t(m.name) })) || []
        }
      };
    });

    return {
      ...baseData,
      CHARACTER_DB: translatedCharacters
    };
  }

  return {
    ...baseData,
    CHARACTER_DB: baseData.CHARACTER_DB.map(koChar => ({
      ...koChar,
      originalName: koChar.name
    }))
  };
};