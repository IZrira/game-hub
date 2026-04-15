import { CHARACTER_DB as koCharDB, LIGHTCONE_DB as koLightconeDB, RELIC_DB as koRelicDB, ORNAMENT_DB as koOrnamentDB } from './games';
import { WEAPON_DATA as koWeaponData } from '../../ww-hub/data/weapons';
import { HSR_CHARACTER_GUIDES as koHsrGuides } from '../../hsr-hub/data/guides';
import { HSR_NOTICES as koHsrNotices } from '../../hsr-hub/data/notices';
import { WW_NOTICES as koWwNotices } from '../../ww-hub/data/notices';
import { CHARACTER_DB_EN } from './index';
import i18n from '../i18n';

export const getGameData = (lang: string) => {
  // 1. 베이스가 되는 한국어 메인 데이터
  const baseData = {
    CHARACTER_DB: koCharDB,
    LIGHTCONE_DB: koLightconeDB,
    RELIC_DB: koRelicDB,
    ORNAMENT_DB: koOrnamentDB,
    WEAPON_DATA: koWeaponData,
    HSR_CHARACTER_GUIDES: koHsrGuides,
    HSR_NOTICES: koHsrNotices,
    WW_NOTICES: koWwNotices
  };

  if (lang === 'en') {
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