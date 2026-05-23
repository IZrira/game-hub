import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { WW_DATA_ALL } from '../../ww-hub/data/index';
import { CHARACTER_DB_EN } from './index';
import i18n from '../i18n';
import notionData from './notion-data.json';

export const getGameData = (targetId: string) => {
  const isEn = targetId === 'en';
  const gameId = isEn ? 'hsr' : targetId; // 기본적으로 'en' 요청은 HSR 번역용으로 처리

  // 1. Notion 데이터 파싱 및 매핑
  const notionWeapons = ((notionData || []) as any[])
    .filter(item => ['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(item.type))
    .map(item => {
      let atk = 500;
      let subStatName = '공격력';
      let subStatValue = '36.4%';
      let skillName = '노션 연동 스킬';
      let skillDescription = '노션에서 연동된 무기 스킬 설명입니다.';
      let description = item.content || '노션에서 연동된 무기 스토리입니다.';

      if (item.content) {
        const atkMatch = item.content.match(/(?:기초\s*공격력|공격력)\s*:\s*(\d+)/i);
        if (atkMatch) atk = parseInt(atkMatch[1], 10);

        const subNameMatch = item.content.match(/(?:부옵션|서브\s*스탯|부스탯|부옵션명)\s*:\s*([^\d\s\n]+)/i);
        if (subNameMatch) subStatName = subNameMatch[1].trim();

        const subValMatch = item.content.match(/(?:부옵션|서브\s*스탯|부스탯)\s*:[^\n]*?([\d.]+%?)/i);
        if (subValMatch) subStatValue = subValMatch[1].trim();

        const skillNameMatch = item.content.match(/(?:스킬명|무기\s*스킬명)\s*:\s*([^\n]+)/i);
        if (skillNameMatch) skillName = skillNameMatch[1].trim();

        const skillDescMatch = item.content.match(/(?:스킬\s*설명|스킬\s*효과)\s*:\s*([^\n]+)/i);
        if (skillDescMatch) skillDescription = skillDescMatch[1].trim();
      }

      return {
        id: item.id,
        gameId: 'ww' as const,
        name: item.name,
        rarity: Number(item.rarity) || 5,
        type: (['대검', '직검', '권총', '권갑', '증폭기'].includes(item.type) ? item.type : '직검') as any,
        releaseVersion: item.releaseVersion || '1.0',
        obtain: item.obtain || '노션 연동',
        stats: {
          atk,
          subStatName,
          subStatValue
        },
        skill: {
          name: skillName,
          description: skillDescription
        },
        description: description,
        isNotion: true,
        content: item.content
      };
    });

  const notionCharacters = ((notionData || []) as any[])
    .filter(item => item.type === '캐릭터')
    .map(item => {
      let attribute = '회절';
      let weaponType = '직검';

      if (item.content) {
        const attrMatch = item.content.match(/(?:속성|공명\s*속성)\s*:\s*([^\s\n]+)/i);
        if (attrMatch) attribute = attrMatch[1].trim();

        const wpMatch = item.content.match(/(?:무기|무기\s*종류|무기\s*타입)\s*:\s*([^\s\n]+)/i);
        if (wpMatch) weaponType = wpMatch[1].trim();
      }

      return {
        id: item.id,
        name: item.name,
        originalName: item.name,
        gameId: 'ww' as const,
        folderName: item.name,
        attribute: attribute,
        weaponType: weaponType as any,
        rarity: Number(item.rarity) || 5,
        releaseVersion: item.releaseVersion || '1.0',
        obtain: item.obtain || '노션 연동',
        briefInfo: item.name + ' - 노션 연동 캐릭터 정보',
        isNotion: true,
        content: item.content,
        materials_v2: {
          ascension: [],
          traces: []
        },
        baseStats: {},
        skills: []
      };
    });

  const notionLightcones = ((notionData || []) as any[])
    .filter(item => item.type === '광추')
    .map(item => ({
      id: item.id,
      gameId: 'hsr' as const,
      name: item.name,
      rarity: Number(item.rarity) || 5,
      path: '파멸',
      releaseVersion: item.releaseVersion || '1.0',
      isNotion: true,
      content: item.content
    }));

  const notionHsrCharacters = ((notionData || []) as any[])
    .filter(item => item.type === 'HSR 캐릭터')
    .map(item => {
      let attribute = '물리';
      let pathType = '파멸';

      if (item.content) {
        const attrMatch = item.content.match(/(?:속성|전투\s*속성)\s*:\s*([^\s\n]+)/i);
        if (attrMatch) attribute = attrMatch[1].trim();

        const pathMatch = item.content.match(/(?:운명의\s*길|클래스)\s*:\s*([^\s\n]+)/i);
        if (pathMatch) pathType = pathMatch[1].trim();
      }

      return {
        id: item.id,
        name: item.name,
        originalName: item.name,
        gameId: 'hsr' as const,
        folderName: item.name,
        attribute: attribute,
        path: pathType,
        rarity: Number(item.rarity) || 5,
        releaseVersion: item.releaseVersion || '1.0',
        isNotion: true,
        content: item.content,
        materials_v2: {
          ascension: [],
          traces: []
        }
      };
    });

  const mergedCharacters = [...WW_DATA_ALL.CHARACTER_DB, ...notionCharacters];
  const mergedWeapons = [...WW_DATA_ALL.WEAPON_DATA, ...notionWeapons];
  const mergedHsrCharacters = [...HSR_DATA_ALL.CHARACTER_DB, ...notionHsrCharacters];
  const mergedLightcones = [...HSR_DATA_ALL.LIGHTCONE_DB, ...notionLightcones];

  // 2. 도메인별 데이터를 독립적으로 정의합니다.
  const hsrData = {
    CHARACTER_DB: mergedHsrCharacters,
    LIGHTCONE_DB: mergedLightcones,
    RELIC_DB: HSR_DATA_ALL.RELIC_DB,
    ORNAMENT_DB: HSR_DATA_ALL.ORNAMENT_DB,
    INVENTORY_DB: Object.fromEntries(
      Object.entries(HSR_DATA_ALL.INVENTORY_DB).map(([k, v]: [string, any]) => [k, { ...v, gameId: 'hsr' }])
    ),
    GUIDES: HSR_DATA_ALL.GUIDES,
    NOTICES: HSR_DATA_ALL.NOTICES
  };

  const wwData = {
    CHARACTER_DB: mergedCharacters,
    WEAPON_DB: mergedWeapons,
    WEAPON_DATA: mergedWeapons,
    ECHO_DB: WW_DATA_ALL.ECHO_DATA,
    INVENTORY_DB: (WW_DATA_ALL.ITEM_DATA || []).reduce((acc: any, item: any) => {
      acc[item.name || item.id] = { ...item, gameId: 'ww' };
      return acc;
    }, {}),
    NOTICES: WW_DATA_ALL.NOTICES,
    GUIDES: WW_DATA_ALL.GUIDES
  };

  // 3. 요청된 ID에 따라 관련 데이터셋을 선택합니다.
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
      WEAPON_DATA: wwData.WEAPON_DB,
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
      WEAPON_DATA: wwData.WEAPON_DB,
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