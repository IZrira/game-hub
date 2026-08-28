import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { WW_DATA_ALL } from '../../ww-hub/data/index';
import { NTE_DATA_ALL } from '../../nte-hub/data/index';
import { CHARACTER_DB_EN } from './index';
import i18n from '../i18n';
import notionData from './notion-data.json';

export interface NotionItem {
  id: string;
  name: string;
  rarity?: number | string;
  type?: string;
  releaseVersion?: string;
  obtain?: string;
  growthStats?: string;
  skillName?: string;
  skillDescription?: string;
  ascensionMaterials?: string;
  skillMaterials?: string;
  weaponStory?: string;
  fileName?: string;
  skillInputGuide?: string;
  combatCycle?: string;
  itemAttribute?: string;
  weapon?: string;
  affiliation?: string;
  content?: string;
  dbSource?: string;
  pieces?: string;
  effect2?: string;
  effect4?: string;
  effect5?: string;
  sonataEffect?: string;
  cost?: string;
  abilityAttribute?: string;
  arc?: string;
  birthday?: string;
  citySkill?: string;
  virailSkill?: string;
  ultimateSkill?: string;
  supportSkill?: string;
  passiveSkill1?: string;
  passiveSkill2?: string;
  awakenings?: string;
  resonance?: string;
}

export const getGameData = (targetId: string) => {
  const isEn = targetId === 'en';
  const gameId = isEn ? 'hsr' : targetId; // 기본적으로 'en' 요청은 HSR 번역용으로 처리

  // 1. Notion 데이터 파싱 및 매핑
  const typedNotionData: any[] = (notionData || []) as any[];

  const notionWeapons = typedNotionData
    .filter(item => item.type && ['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(item.type) && item.dbSource !== 'nte_weapons' && item.dbSource !== 'nte_characters' && item.dbSource !== 'nte_items')
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

  const notionCharacters = typedNotionData
    .filter(item => item.type === '캐릭터' && item.dbSource !== 'nte_characters' && item.dbSource !== 'nte_items')
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

      const parsedTerms: any[] = [];
      const specialTerms: Record<string, string> = {};
      if (item.glossary) {
        const blocks = item.glossary.split(/\n\s*\n/);
        blocks.forEach((block: string) => {
          const lines = block.split('\n').filter(Boolean);
          if (lines.length > 0) {
            const name = lines[0].replace(/[*=「」]/g, '').trim();
            const description = lines.slice(1).join('\n').trim();
            if (name && description) {
              parsedTerms.push({ name, description });
              specialTerms[name] = description;
              specialTerms[`「${name}」`] = description;
            }
          }
        });
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
        specialTerms: specialTerms,
        terms: parsedTerms,
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

  const notionLightcones = typedNotionData
    .filter(item => item.dbSource === 'weapons' && ['지식', '수렵', '파멸', '보존', '풍요', '공허', '화합'].includes(item.type || ''))
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

  const notionHsrCharacters = typedNotionData
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
  const notionWwItems = typedNotionData
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

  // 노션 이환(NTE) 아이템 추출
  const notionNteItems = typedNotionData
    .filter(item => item.dbSource === 'nte_items')
    .map(item => {
      return {
        id: item.id,
        name: item.name,
        type: item.type || '아이템',
        rarity: item.rarity,
        desc: item.content || item.skillDescription || item.briefInfo || '',
        sources: item.obtain ? item.obtain.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean) : ["정보 없음"],
        folderName: item.name,
        fileName: item.fileName || '',
        gameId: 'nte',
        isNotion: true,
        itemAttribute: item.itemAttribute
      };
    });

  // 노션 이환(NTE) 캐릭터 추출
  const notionNteCharacters = typedNotionData
    .filter(item => item.dbSource === 'nte_characters')
    .map(item => {
      let parsedBaseStats: any = {};
      if (item.growthStats) {
        const lines = item.growthStats.split('\n');
        lines.forEach((line: string) => {
          const match = line.match(/(\d+)\s*:\s*([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d\.%]+)\s+([\d\.%]+)/);
          if (match) {
            const level = match[1];
            parsedBaseStats[`lv${level}`] = {
              "기초 HP": parseInt(match[2].replace(/,/g, ''), 10),
              "기초 공격력": parseInt(match[3].replace(/,/g, ''), 10),
              "기초 방어력": parseInt(match[4].replace(/,/g, ''), 10),
              "치명 확률": match[5],
              "치명 피해": match[6]
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
      if (item.citySkill) item.citySkill = item.citySkill.replace(/(Lv\.\s*\d+)\s*\n/g, '$1 ');
      if (item.citySkill2) item.citySkill2 = item.citySkill2.replace(/(Lv\.\s*\d+)\s*\n/g, '$1 ');

      const parsedSkills: any[] = [];
      const skillMap = [
        { key: 'citySkill', name: '도시 스킬', type: '도시 스킬', icon: '도시 스킬1' },
        { key: 'citySkill2', name: '도시 스킬2', type: '도시 스킬', icon: '도시 스킬2' },
        { key: 'basicAttack', name: '일반 공격', type: '기본 공격', icon: '일반 공격' },
        { key: 'virailSkill', name: '바이레일 스킬', type: '바이레일 스킬' },
        { key: 'ultimateSkill', name: '울티메이트', type: '울티메이트' },
        { key: 'supportSkill', name: '서포트 스킬', type: '서포트 스킬' },
        { key: 'passiveSkill1', name: '패시브 스킬1', type: '패시브 스킬1' },
        { key: 'passiveSkill2', name: '패시브 스킬2', type: '패시브 스킬2' },
        { key: 'trait', name: '특성', type: '특성', icon: '캐릭터 특성' },
        { key: 'resonance', name: '공명', type: '공명' }
      ];
      
      skillMap.forEach(s => {
        if (item[s.key as keyof typeof item]) {
          if (s.key === 'resonance') {
             const blocks = (item[s.key as keyof typeof item] as string).split(/\n\n+/).filter(p => p.trim());
             blocks.forEach((block, idx) => {
               const lines = block.split('\n');
               const skillName = lines[0].replace(/\*\*/g, '').trim();
               const description = lines.slice(1).join('\n').trim();
               parsedSkills.push({
                 id: `notion_nte_${s.key}_${idx + 1}`,
                 name: skillName || `${s.name} ${idx + 1}`,
                 type: s.type,
                 tag: s.name,
                 description: description,
                 icon: `공명`
               });
             });
          } else {
             const lines = (item[s.key as keyof typeof item] as string).split('\n');
             const skillName = lines[0].replace(/\*\*/g, '').trim();
             const description = lines.slice(1).join('\n').trim();

             parsedSkills.push({
               id: `notion_nte_${s.key}`,
               name: skillName || s.name,
               type: s.type,
               tag: s.name,
               description: description,
               icon: s.icon || undefined
             });
          }
        }
      });

      const parsedEidolons: any[] = [];
      if (item.awakenings) {
         const blocks = item.awakenings.split(/\n\n+/).filter((p: string) => p.trim());
         blocks.forEach((block: string, idx: number) => {
            const lines = block.split('\n');
            const name = lines[0].replace(/\*\*/g, '').replace(/==/g, '').trim();
            const desc = lines.slice(1).join('\n').trim();
            parsedEidolons.push({
               rank: idx + 1,
               name: name,
               description: desc,
               iconKey: `각성${idx + 1}`
            });
         });
      }

      const specialTerms: Record<string, string> = {};
      if (item.glossary) {
         const blocks = item.glossary.split(/\n\n+/).filter((p: string) => p.trim());
         blocks.forEach((block: string) => {
            const lines = block.split('\n');
            const term = lines[0].replace(/\*\*/g, '').replace(/==/g, '').trim();
            const desc = lines.slice(1).join('\n').trim();
            if (term && desc) {
               specialTerms[term] = desc;
            }
         });
      }

      return {
        id: item.id,
        name: item.name,
        originalName: item.name,
        gameId: 'nte' as const,
        folderName: item.name,
        fileName: item.fileName || item.name,
        isTrailblazer: item.name === '감정사',
        type: '캐릭터',
        rarity: (typeof item.rarity === 'string' && (item.rarity.toUpperCase() === 'S' || item.rarity === '5')) ? 5 : (Number(item.rarity) || 4),
        releaseVersion: item.releaseVersion || '1.0',
        itemAttribute: item.itemAttribute || '',
        attribute: item.abilityAttribute || item.itemAttribute || '',
        arc: item.arc || '',
        contract: item.contract || '',
        birthday: item.birthday || '',
        citySkill: item.citySkill || '',
        virailSkill: item.virailSkill || '',
        ultimateSkill: item.ultimateSkill || '',
        supportSkill: item.supportSkill || '',
        passiveSkill1: item.passiveSkill1 || '',
        passiveSkill2: item.passiveSkill2 || '',
        awakenings: item.awakenings || '',
        eidolons: parsedEidolons,
        resonance: item.resonance || '',
        content: item.content || '',
        briefInfo: item.briefInfo || '',
        locales: item.locales || '',
        voiceActors: item.voiceActors || '',
        glossary: item.glossary || '',
        affiliation: item.affiliation || '',
        combatRoles: item.combatRoles || '',
        roles: item.combatRoles ? item.combatRoles.split('\n').filter(Boolean) : [],
        growthStats: item.growthStats || '',
        baseStats: Object.keys(parsedBaseStats).length > 0 ? parsedBaseStats : {},
        specialTerms: specialTerms,
        materials_v2: {
          ascension: parsedAscension,
          traces: parsedTraces
        },
        skills: parsedSkills,
        ascensionMaterials: item.ascensionMaterials || '',
        skillMaterials: item.skillMaterials || '',
        basicAttack: item.basicAttack || '',
        isNotion: true,
        skins: item.skins || item['스킨'] ? (item.skins || item['스킨']).split('\n').map((s: string) => s.replace(/[*=]/g, '').trim()).filter(Boolean) : [],
      };
    });

  // 노션 이환(NTE) 아크(무기) 추출
  const notionNteArcs = typedNotionData
    .filter(item => item.dbSource === 'nte_arcs' || item.dbSource === 'nte_weapons' || (item.type && ['고체', '액체', '기체', '결합', '플라즈마'].includes(item.type)))
    .map(item => {
      const parsedBaseStats: Record<number, { atk: number; subStatName: string; subStatValue: string }> = {};
      let baseAtk = 395;
      let subStatName = '방어력';
      let subStatValue = '52.5%';

      if (item.growthStats) {
        const lines = item.growthStats.split('\n');
        lines.forEach((line: string) => {
          const match = line.match(/(\d+)\s*:\s*(?:기초\s*)?공격력\s*([\d,]+)\s*(?:\/|\,)\s*([^\d\n]+?)\s*([\d.]+%?)/i);
          if (match) {
            const lv = parseInt(match[1], 10);
            const atk = parseInt(match[2].replace(/,/g, ''), 10);
            const subName = match[3].trim();
            const subVal = match[4].trim();
            parsedBaseStats[lv] = { atk, subStatName: subName, subStatValue: subVal };
            if (lv === 80 || lv === Math.max(...Object.keys(parsedBaseStats).map(Number))) {
              baseAtk = atk;
              subStatName = subName;
              subStatValue = subVal;
            }
          }
        });
      }

      const parsedMaterials: { name: string; count: number }[] = [];
      if (item.ascensionMaterials) {
        const lines = item.ascensionMaterials.split('\n');
        lines.forEach((line: string) => {
          const trimmed = line.trim();
          if (trimmed) {
            const match = trimmed.match(/^([^xX*]+)[xX*]\s*([\d,]+)/);
            if (match) {
              parsedMaterials.push({
                name: match[1].trim(),
                count: parseInt(match[2].replace(/,/g, ''), 10) || 1
              });
            } else {
              const numMatch = trimmed.match(/[\d,]+$/);
              const textMatch = trimmed.replace(/[\d,xX*]+$/, '').trim();
              if (textMatch) {
                parsedMaterials.push({
                  name: textMatch,
                  count: numMatch ? parseInt(numMatch[0].replace(/,/g, ''), 10) : 1
                });
              }
            }
          }
        });
      }

      let rarityNum = 4;
      if (typeof item.rarity === 'string') {
        const r = item.rarity.toUpperCase();
        if (r === 'S' || r === '5') rarityNum = 5;
        else if (r === 'A' || r === '4') rarityNum = 4;
        else if (r === 'B' || r === '3') rarityNum = 3;
      } else if (typeof item.rarity === 'number') {
        rarityNum = item.rarity;
      }

      return {
        id: item.id,
        name: item.name,
        gameId: 'nte' as const,
        rarity: rarityNum,
        rarityGrade: (rarityNum === 5 ? 'S' : rarityNum === 4 ? 'A' : 'B') as 'S' | 'A' | 'B',
        type: item.type || '결합',
        releaseVersion: item.releaseVersion || '1.0',
        obtain: item.obtain || '노션 연동',
        dedicatedChar: item.dedicatedChar || item.exclusive || '',
        growthStats: item.growthStats || '',
        baseStats: parsedBaseStats,
        stats: {
          atk: baseAtk,
          subStatName: subStatName,
          subStatValue: subStatValue
        },
        skill: {
          name: (item.skillName || '아크 스킬').replace(/\*\*/g, '').trim(),
          description: (item.skillDescription || '').replace(/\*\*/g, '')
        },
        ascensionMaterials: item.ascensionMaterials || '',
        materials: parsedMaterials,
        description: item.weaponStory || item.description || item.content || '',
        isNotion: true
      };
    });

  // 노션 명조 에코 추출 및 매핑
  const notionWwEchoes = typedNotionData
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
    normalized = normalized.replace(/^스킬 입력 가이드[^\n]*\n?/i, '');
    normalized = normalized.replace(/(?<!\n)\n(?!\n)/g, '\n\n');
    normalized = normalized.replace(/\[공명 회로 게이지 이미지(\d*)(?:\.webp)?\]/g, '[공명 회로 게이지$1.webp]');
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
      let rawGuide = c.skillInputGuide || '';
      if (rawGuide.trim().toLowerCase() === 'a') rawGuide = ''; // Ignore 'a' placeholder

      const normalizedGuide = rawGuide ? normalizeNotionGuide(rawGuide) : '';
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
          glossary: c.glossary || existing.glossary,
          specialTerms: c.specialTerms && Object.keys(c.specialTerms).length > 0 ? c.specialTerms : existing.specialTerms,
          terms: c.terms && c.terms.length > 0 ? c.terms : existing.terms,
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

  const parseReleaseVersion = (v: any) => {
    if (!v) return 0;
    const match = String(v).match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  const sortCharactersByVersion = (chars: any[]) => {
    return chars.sort((a, b) => {
      const vA = parseReleaseVersion(a.releaseVersion);
      const vB = parseReleaseVersion(b.releaseVersion);
      if (vA !== vB) return vB - vA;
      const rA = Number(a.rarity) || 4;
      const rB = Number(b.rarity) || 4;
      if (rA !== rB) return rB - rA;
      return (a.name || '').localeCompare(b.name || '');
    });
  };

  const mergedCharacters = sortCharactersByVersion(Array.from(wwCharMap.values()));

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
  const mergedHsrCharacters = sortCharactersByVersion(Array.from(hsrCharMap.values()));

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

  const nteArcMap = new Map<string, any>();
  NTE_DATA_ALL.WEAPON_DATA.forEach(w => {
    const key = (w.name || '').trim();
    if (key) nteArcMap.set(key, w);
  });
  notionNteArcs.forEach(w => {
    const key = (w.name || '').trim();
    if (key) nteArcMap.set(key, w);
  });
  const mergedNteArcs = Array.from(nteArcMap.values());

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
      CHARACTER_DB: [...NTE_DATA_ALL.CHARACTER_DB, ...notionNteCharacters],
      WEAPON_DB: mergedNteArcs,
      WEAPON_DATA: mergedNteArcs,
      ECHO_DB: NTE_DATA_ALL.ECHO_DATA,
      INVENTORY_DB: [...notionNteItems, ...(NTE_DATA_ALL.ITEM_DATA || [])].reduce((acc: any, item: any) => {
        acc[item.name || item.id] = { ...item, gameId: 'nte' };
        return acc;
      }, {}),
      NOTICES: NTE_DATA_ALL.NOTICES,
      GUIDES: NTE_DATA_ALL.GUIDES
    };
  } else {
    // 폴백: 전체 병합 (언어 코드 'ko' 등이 들어왔을 때 데이터 유실 방지)
    baseData = {
      CHARACTER_DB: [...hsrData.CHARACTER_DB, ...wwData.CHARACTER_DB, ...NTE_DATA_ALL.CHARACTER_DB, ...notionNteCharacters],
      LIGHTCONE_DB: hsrData.LIGHTCONE_DB,
      WEAPON_DB: [...wwData.WEAPON_DB, ...mergedNteArcs],
      WEAPON_DATA: [...wwData.WEAPON_DB, ...mergedNteArcs],
      ECHO_DB: [...wwData.ECHO_DB, ...NTE_DATA_ALL.ECHO_DATA],
      RELIC_DB: hsrData.RELIC_DB,
      ORNAMENT_DB: hsrData.ORNAMENT_DB,
      INVENTORY_DB: { ...hsrData.INVENTORY_DB, ...wwData.INVENTORY_DB, ...([...notionNteItems, ...(NTE_DATA_ALL.ITEM_DATA || [])].reduce((acc: any, item: any) => { acc[item.name || item.id] = item; return acc; }, {})) },
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