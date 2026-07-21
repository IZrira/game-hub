import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { WW_DATA_ALL } from '../../ww-hub/data/index';
import { NTE_DATA_ALL } from '../../nte-hub/data/index';
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

      if (item.growthStats) {
        // 90레벨(또는 1~2성 무기의 경우 70레벨) 최종 스탯에서 고정밀 추출 시도
        const extractStats = (level: number) => {
          const regex = new RegExp(`${level}\\s*:\\s*(?:기초\\s*)?공격력\\s*\\*?\\*?(\\d+)\\*?\\*?\\s*\\/\\s*([^\\n*]+?)\\s*\\*?\\*?([\\d.]+%?)\\*?\\*?`, 'i');
          return item.growthStats.match(regex);
        };
        const lvMatch = extractStats(90) || extractStats(80) || extractStats(70);

        if (lvMatch) {
          atk = parseInt(lvMatch[1], 10);
          subStatName = lvMatch[2].trim();
          
          let parsedSubValue = lvMatch[3].trim();
          // 백분율 값 중 소수점 누락 오류 교차 검증 보정 (예: 201% -> 20.1%)
          if (parsedSubValue.endsWith('%')) {
            const num = parseFloat(parsedSubValue);
            if (num > 100) {
              parsedSubValue = (num / 10).toFixed(1).replace(/\.0$/, '') + '%';
            }
          }
          subStatValue = parsedSubValue;
        } else {
          // 폴백: 기존 라벨 기반 추출 시도 (부옵션명 공백 허용)
          const atkMatch = item.growthStats.match(/(?:기초\s*공격력|공격력)\s*:\s*(\d+)/i);
          if (atkMatch) atk = parseInt(atkMatch[1], 10);

          const subNameMatch = item.growthStats.match(/(?:부옵션|서브\s*스탯|부스탯|부옵션명)\s*:\s*([^\d\n]+)/i);
          if (subNameMatch) subStatName = subNameMatch[1].trim();

          const subValMatch = item.growthStats.match(/(?:부옵션|서브\s*스탯|부스탯)\s*:[^\n]*?([\d.]+%?)/i);
          if (subValMatch) {
            let val = subValMatch[1].trim();
            if (val.endsWith('%')) {
              const num = parseFloat(val);
              if (num > 100) {
                val = (num / 10).toFixed(1).replace(/\.0$/, '') + '%';
              }
            }
            subStatValue = val;
          }
        }
      }

      if (item.skillName) skillName = item.skillName.trim();
      if (item.skillDescription) skillDescription = item.skillDescription.trim();
      if (item.weaponStory) description = item.weaponStory.trim();

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
        ascensionMaterials: item.ascensionMaterials || '',
        description: description,
        isNotion: true,
        content: item.content
      };
    });

  const notionCharacters = ((notionData || []) as any[])
    .filter(item => item.type === '캐릭터')
    .map(item => {
      let attribute = item.itemAttribute || '회절';
      let weaponType = '직검';
      let releaseVersion = item.releaseVersion || '1.0';

      if (item.content) {
        if (!item.itemAttribute) {
          const attrMatch = item.content.match(/(?:속성|공명\s*속성)\s*:\s*([^\s\n]+)/i);
          if (attrMatch) attribute = attrMatch[1].trim();
        }

        if (!item.weapon) {
          const wpMatch = item.content.match(/(?:무기|무기\s*종류|무기\s*타입)\s*:\s*([^\s\n]+)/i);
          if (wpMatch) weaponType = wpMatch[1].trim();
        }


        if (!item.releaseVersion) {
          const verMatch = item.content.match(/(?:버전\s*정보|출시\s*버전)\s*:\s*([\d.]+)/i);
          if (verMatch) releaseVersion = verMatch[1].trim();
        }
      }

      const parsedBaseStats: any = {};
      if (item.growthStats) {
        const lines = item.growthStats.split('\n');
        lines.forEach((line: string) => {
          const match = line.match(/(\d+)\s*:\s*([\d,]+)\s+([\d,]+)\s+([\d,]+)/);
          if (match) {
            const level = match[1];
            parsedBaseStats[`lv${level}`] = {
              "기초 HP": parseInt(match[2].replace(/,/g, ''), 10),
              "기초 공격력": parseInt(match[3].replace(/,/g, ''), 10),
              "기초 방어력": parseInt(match[4].replace(/,/g, ''), 10)
            };
          }
        });
      }

      const parsedAscension: any[] = [];
      if (item.ascensionMaterials) {
        const parts = item.ascensionMaterials.split(/\n/);
        parts.forEach((p: string) => {
          const trimmed = p.trim();
          if (trimmed) {
            const nameMatch = trimmed.match(/([^\dx*,]+)/);
            const countMatch = trimmed.match(/[\dx*,]+$/);
            if (nameMatch) {
              parsedAscension.push({
                name: nameMatch[1].trim(),
                count: countMatch ? parseInt(countMatch[0].replace(/[x*,]/g, ''), 10) : 1
              });
            }
          }
        });
      }

      const parsedTraces: any[] = [];
      if (item.skillMaterials) {
        const parts = item.skillMaterials.split(/\n/);
        parts.forEach((p: string) => {
          const trimmed = p.trim();
          if (trimmed) {
            const nameMatch = trimmed.match(/([^\dx*,]+)/);
            const countMatch = trimmed.match(/[\dx*,]+$/);
            if (nameMatch) {
              parsedTraces.push({
                name: nameMatch[1].trim(),
                count: countMatch ? parseInt(countMatch[0].replace(/[x*,]/g, ''), 10) : 1
              });
            }
          }
        });
      }

      const parsedSkills: any[] = [];
      const skillMap = [
        { key: 'basicAttack', name: '기본 공격', type: '기본 공격' },
        { key: 'resonanceSkill', name: '공명 스킬', type: '공명 스킬' },
        { key: 'resonanceCircuit', name: '공명 회로', type: '공명 회로' },
        { key: 'inherentSkill1', name: '고유 스킬 1', type: '고유 스킬' },
        { key: 'inherentSkill2', name: '고유 스킬 2', type: '고유 스킬' },
        { key: 'resonanceLiberation', name: '공명 해방', type: '공명 해방' },
        { key: 'introSkill', name: '변주 스킬', type: '변주 스킬' },
        { key: 'outroSkill', name: '반주 스킬', type: '반주 스킬' },
        { key: 'harmonyBreak', name: '조화도 파괴', type: '조화도 파괴' }
      ];
      
      skillMap.forEach(s => {
        if (item[s.key]) {
          const lines = item[s.key].split('\n');
          const skillName = lines[0].trim();
          const description = lines.slice(1).join('\n').trim();

          parsedSkills.push({
            id: `notion_${s.key}`,
            name: skillName || s.name,
            type: s.type,
            tag: s.name, // Changed to s.name ('고유 스킬 1' instead of '고유 스킬') for WuwaSkillSection bonus parsing
            description: description
          });
        }
      });
      
      if (parsedSkills.length === 0 && (item.skillName || item.skillDescription)) {
        parsedSkills.push({
          id: 'notion_skill',
          name: item.skillName || '공명 스킬',
          type: '공명 스킬',
          tag: '공명 스킬',
          description: item.skillDescription || '상세 내용 없음'
        });
      }

      const parsedChains: any[] = [];
      if (item.resonanceChains) {
        const chainText = item.resonanceChains;
        // Match "1. Title \n Description" until next number or end of string
        const regex = /(\d)\.\s*([^\n]+)\n([^]*?)(?=(?:\n\d\.\s)|$)/g;
        let match;
        while ((match = regex.exec(chainText)) !== null) {
          parsedChains.push({
            id: `chain_${match[1]}`,
            rank: parseInt(match[1], 10),
            name: match[2].trim(),
            description: match[3].trim()
          });
        }
      }

      return {
        id: item.id,
        name: item.name,
        originalName: item.name,
        gameId: 'ww' as const,
        folderName: item.name,
        attribute: attribute,
        weaponType: item.weapon || weaponType as any,
        rarity: Number(item.rarity) || 5,
        releaseVersion: releaseVersion,
        obtain: item.obtain || '노션 연동',
        briefInfo: item.briefInfo || item.name + ' - 노션 연동 캐릭터 정보',
        affiliation: item.affiliation,
        roles: item.combatRoles ? item.combatRoles.split('\n').map((r: string) => {
          const parts = r.includes(':') ? r.split(':') : r.split('：');
          if (parts.length > 1) {
            return { label: parts[0].trim(), description: parts.slice(1).join(':').trim() };
          }
          return { label: r.trim(), description: '' };
        }).filter((r: any) => r.label) : [],
        locales: item.locales,
        voiceActors: item.voiceActors,
        glossary: item.glossary,
        isNotion: true,
        content: item.content,
        skillInputGuide: item.skillInputGuide,
        combatCycle: item.combatCycle,
        materials_v2: {
          ascension: parsedAscension,
          traces: parsedTraces
        },
        baseStats: Object.keys(parsedBaseStats).length > 0 ? parsedBaseStats : {},
        skills: parsedSkills,
        eidolons: parsedChains
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
      let releaseVersion = item.releaseVersion || '1.0';

      if (item.content) {
        const attrMatch = item.content.match(/(?:속성|전투\s*속성)\s*:\s*([^\s\n]+)/i);
        if (attrMatch) attribute = attrMatch[1].trim();

        const pathMatch = item.content.match(/(?:운명의\s*길|클래스)\s*:\s*([^\s\n]+)/i);
        if (pathMatch) pathType = pathMatch[1].trim();

        const verMatch = item.content.match(/(?:버전\s*정보|출시\s*버전)\s*:\s*([\d.]+)/i);
        if (verMatch) releaseVersion = verMatch[1].trim();
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
        releaseVersion: releaseVersion,
        isNotion: true,
        content: item.content,
        materials_v2: {
          ascension: [],
          traces: []
        }
      };
    });

  // 노션 명조 아이템 추출
  const notionWwItems = ((notionData || []) as any[])
    .filter(item => item.dbSource === 'ww_items' || (!item.dbSource && (item.type === '아이템' || item.type === '소모품' || item.type === '재료' || item.type === '육성 아이템' || item.type === '성급' || !item.type)))
    .map(item => {
      return {
        id: item.id,
        name: item.name,
        type: item.type || '아이템',
        rarity: item.rarity,
        desc: item.content || item.skillDescription || '',
        sources: item.obtain ? item.obtain.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean) : ["정보 없음"],
        folderName: item.name,
        fileName: item.fileName || '',
        gameId: 'ww',
        isNotion: true,
        itemAttribute: item.itemAttribute // 남여 분리 여부 등 확인을 위해 전달
      };
    });

  // 노션 명조 에코 추출 및 매핑
  const notionWwEchoes = ((notionData || []) as any[])
    .filter(item => item.dbSource === 'ww_echoes')
    .map(item => {
      return {
        id: item.id,
        name: item.name,
        cost: item.cost,
        sonataSets: item.sonataSets || [],
        folderName: item.name,
        cooldown: item.cooldown,
        description: item.content || item.skillDescription || '',
        hasPhantom: item.hasPhantom || false,
        enemyInfo: {
          originalName: item.enemyOriginalName || '',
          grade: item.enemyGrade || '',
          description: item.enemyDescription || '',
          specialNote: item.enemySpecialNote || '',
          drops: item.drops || []
        }
      };
    });

  // 중복 제거 및 노션 오버라이드 병합 로직 (이름 기준)
  const wwCharMap = new Map<string, any>();
  WW_DATA_ALL.CHARACTER_DB.forEach(c => {
    const key = (c.folderName || c.originalName || c.name || '').trim();
    if (key) wwCharMap.set(key, c);
  });
  const normalizeNotionGuide = (text: string) => {
    if (!text) return '';
    let normalized = text.replace(/\r\n/g, '\n');
    normalized = normalized.replace(/^스킬 입력 가이드.*?타입\n?/i, '');
    normalized = normalized.replace(/(?<!\n)\n(?!\n)/g, '\n\n');
    return normalized.trim();
  };

  const extractOverviewAndInputs = (text: string) => {
    if (!text) return { overview: '', extractedInputs: [] };
    const match = text.match(/\n\n(메커니즘 설명|조작 입력)\n\n/);
    if (match) {
      const splitIndex = match.index;
      const overview = text.substring(0, splitIndex!).trim();
      const mechText = text.substring(splitIndex!).trim();
      const extractedInputs = mechText.replace(/^(메커니즘 설명|조작 입력)\n\n/, '').split('\n\n').filter(Boolean);
      return { overview, extractedInputs };
    }
    return { overview: text, extractedInputs: [] };
  };

  notionCharacters.forEach(c => {
    const key = (c.folderName || c.originalName || c.name || '').trim();
    if (key) {
      const existing = wwCharMap.get(key);
      const normalizedGuide = c.skillInputGuide ? normalizeNotionGuide(c.skillInputGuide) : '';
      const { overview, extractedInputs } = extractOverviewAndInputs(normalizedGuide);

      let finalInputs = c.combatCycle ? c.combatCycle.split('\n').filter(Boolean) : [];
      if (finalInputs.length === 0 && extractedInputs.length > 0) {
        finalInputs = extractedInputs;
      }
      if (finalInputs.length === 0 && existing?.skillInput?.inputs) {
        finalInputs = existing.skillInput.inputs;
      }

      const finalOverview = overview || existing?.skillInput?.overview || '';

      if (existing) {
        if (import.meta.env?.DEV) {
          if (c.attribute && existing.attribute && existing.attribute !== c.attribute) {
            console.warn(`⚠️ [Data Mismatch] ${c.name || existing.name}: 로컬 속성(${existing.attribute})이 노션 속성(${c.attribute})과 다릅니다. 노션 데이터로 강제 오버라이드합니다.`);
          }
          if (c.weaponType && existing.weaponType && existing.weaponType !== c.weaponType) {
            console.warn(`⚠️ [Data Mismatch] ${c.name || existing.name}: 로컬 무기(${existing.weaponType})가 노션 무기(${c.weaponType})와 다릅니다. 노션 데이터로 강제 오버라이드합니다.`);
          }
        }

        // 기존 캐릭터가 있을 경우, 노션 데이터를 최우선으로 병합
        const mergedMetadata = {
          ...existing.metadata,
          element: c.attribute || existing.metadata?.element || existing.attribute,
          weapon: c.weaponType || existing.metadata?.weapon || existing.weaponType,
        };

        wwCharMap.set(key, {
          ...existing,
          name: c.name || existing.name || '',
          attribute: c.attribute || existing.attribute || '',
          weaponType: c.weaponType || existing.weaponType || '' as any,
          roles: c.roles && c.roles.length > 0 ? c.roles : existing.roles,
          materials_v2: c.materials_v2 && (c.materials_v2.ascension.length > 0 || c.materials_v2.traces.length > 0) ? c.materials_v2 : existing.materials_v2,
          skills: c.skills && c.skills.length > 0 ? c.skills : existing.skills,
          eidolons: c.eidolons && c.eidolons.length > 0 ? c.eidolons : existing.eidolons,
          baseStats: c.baseStats && Object.keys(c.baseStats).length > 0 ? c.baseStats : existing.baseStats,
          metadata: mergedMetadata,
          skillInput: {
            ...existing.skillInput,
            overview: finalOverview,
            inputs: finalInputs,
            hideGauge: true
          },
          obtain: c.obtain !== '노션 연동' ? c.obtain : existing.obtain,
          releaseVersion: c.releaseVersion || existing.releaseVersion,
        });
      } else {
        // 기존에 없는 신규 캐릭터
        (c as any).skillInput = {
          overview: finalOverview,
          inputs: finalInputs,
          hideGauge: true
        };
        wwCharMap.set(key, c);
      }
    }
  });
  const mergedCharacters = Array.from(wwCharMap.values());

  const wwWeaponMap = new Map<string, any>();
  WW_DATA_ALL.WEAPON_DATA.forEach(w => {
    const key = ((w as any).folderName || (w as any).originalName || w.name || '').trim();
    if (key) wwWeaponMap.set(key, w);
  });
  notionWeapons.forEach(w => {
    const key = ((w as any).folderName || (w as any).originalName || w.name || '').trim();
    if (key) wwWeaponMap.set(key, w);
  });
  const mergedWeapons = Array.from(wwWeaponMap.values());

  const hsrCharMap = new Map<string, any>();
  HSR_DATA_ALL.CHARACTER_DB.forEach(c => {
    const key = (c.folderName || c.originalName || c.name || '').trim();
    if (key) hsrCharMap.set(key, c);
  });
  notionHsrCharacters.forEach(c => {
    const key = (c.folderName || c.originalName || c.name || '').trim();
    if (key) hsrCharMap.set(key, c);
  });
  const mergedHsrCharacters = Array.from(hsrCharMap.values());

  const hsrLcMap = new Map<string, any>();
  HSR_DATA_ALL.LIGHTCONE_DB.forEach(lc => {
    const key = (lc.folderName || lc.originalName || lc.name || '').trim();
    if (key) hsrLcMap.set(key, lc);
  });
  notionLightcones.forEach(lc => {
    const key = ((lc as any).folderName || (lc as any).originalName || lc.name || '').trim();
    if (key) hsrLcMap.set(key, lc);
  });
  const mergedLightcones = Array.from(hsrLcMap.values());

  const wwEchoMap = new Map<string, any>();
  WW_DATA_ALL.ECHO_DATA.forEach(e => {
    const key = (e.name || '').trim();
    if (key) wwEchoMap.set(key, e);
  });
  notionWwEchoes.forEach(e => {
    const key = (e.name || '').trim();
    if (key) {
      const existing = wwEchoMap.get(key);
      if (existing) {
        wwEchoMap.set(key, {
          ...existing,
          cost: e.cost || existing.cost,
          sonataSets: e.sonataSets && e.sonataSets.length > 0 ? e.sonataSets : existing.sonataSets,
          cooldown: e.cooldown || existing.cooldown,
          description: e.description || existing.description,
          hasPhantom: e.hasPhantom || existing.hasPhantom,
          enemyInfo: {
            ...existing.enemyInfo,
            originalName: e.enemyInfo.originalName || existing.enemyInfo?.originalName || '',
            grade: e.enemyInfo.grade || existing.enemyInfo?.grade || '',
            description: e.enemyInfo.description || existing.enemyInfo?.description || '',
            specialNote: e.enemyInfo.specialNote || existing.enemyInfo?.specialNote || '',
            drops: e.enemyInfo.drops && e.enemyInfo.drops.length > 0 ? e.enemyInfo.drops : existing.enemyInfo?.drops || []
          }
        });
      } else {
        wwEchoMap.set(key, e);
      }
    }
  });
  const mergedEchoes = Array.from(wwEchoMap.values());

  // 2. 도메인별 데이터를 독립적으로 정의합니다.
  const hsrData = {
    CHARACTER_DB: mergedHsrCharacters,
    LIGHTCONE_DB: mergedLightcones,
    RELIC_DB: HSR_DATA_ALL.RELIC_DB,
    ORNAMENT_DB: HSR_DATA_ALL.ORNAMENT_DB,
    INVENTORY_DB: Object.fromEntries(
      Object.entries(HSR_DATA_ALL.INVENTORY_DB).map(([k, v]: [string, any]) => [k, { ...v, gameId: 'hsr' }])
    ),
    GUIDES: HSR_DATA_ALL.GUIDES
  };

  const wwData = {
    CHARACTER_DB: mergedCharacters,
    WEAPON_DB: mergedWeapons,
    WEAPON_DATA: mergedWeapons,
    ECHO_DB: mergedEchoes,
    INVENTORY_DB: [...notionWwItems, ...(WW_DATA_ALL.ITEM_DATA || [])].reduce((acc: any, item: any) => {
      acc[item.name || item.folderName || item.id] = { ...item, gameId: 'ww' };
      return acc;
    }, {}),
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
      GUIDES: wwData.GUIDES
    };
  } else if (gameId === 'nte') {
    baseData = {
      CHARACTER_DB: NTE_DATA_ALL.CHARACTER_DB,
      WEAPON_DB: NTE_DATA_ALL.WEAPON_DATA,
      WEAPON_DATA: NTE_DATA_ALL.WEAPON_DATA,
      ECHO_DB: NTE_DATA_ALL.ECHO_DATA,
      INVENTORY_DB: (NTE_DATA_ALL.ITEM_DATA || []).reduce((acc: any, item: any) => {
        acc[item.name || item.id] = { ...item, gameId: 'nte' };
        return acc;
      }, {}),
      NOTICES: NTE_DATA_ALL.NOTICES,
      GUIDES: NTE_DATA_ALL.GUIDES
    };
  } else {
    // 폴백: 전체 병합 (언어 코드 'ko' 등이 들어왔을 때 데이터 유실 방지)
    baseData = {
      CHARACTER_DB: [...hsrData.CHARACTER_DB, ...wwData.CHARACTER_DB, ...NTE_DATA_ALL.CHARACTER_DB],
      LIGHTCONE_DB: hsrData.LIGHTCONE_DB,
      WEAPON_DB: [...wwData.WEAPON_DB, ...NTE_DATA_ALL.WEAPON_DATA],
      WEAPON_DATA: [...wwData.WEAPON_DB, ...NTE_DATA_ALL.WEAPON_DATA],
      ECHO_DB: [...wwData.ECHO_DB, ...NTE_DATA_ALL.ECHO_DATA],
      RELIC_DB: hsrData.RELIC_DB,
      ORNAMENT_DB: hsrData.ORNAMENT_DB,
      INVENTORY_DB: { ...hsrData.INVENTORY_DB, ...wwData.INVENTORY_DB, ...((NTE_DATA_ALL.ITEM_DATA || []).reduce((acc: any, item: any) => { acc[item.name || item.id] = item; return acc; }, {})) },
      GUIDES: [...hsrData.GUIDES, ...wwData.GUIDES, ...NTE_DATA_ALL.GUIDES]
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