const parseMaterials = text => (text || '').split('\n').flatMap(rawLine => {
  const line = rawLine.trim();
  if (!line) return [];
  const nameMatch = line.match(/([^\dx*,]+)/);
  const countMatch = line.match(/[\dx*,]+$/);
  if (!nameMatch) return [];
  return [{
    name: nameMatch[1].trim(),
    count: countMatch ? Number.parseInt(countMatch[0].replace(/[x*,]/g, ''), 10) : 1
  }];
});

const parseSkill = (value, definition) => {
  const cleanSkill = value
    .replace(/\*\*\s*\n+\s*\*\*/g, '\n')
    .replace(/(^|\n)\*\*\s*-\s*/g, '$1- ');
  const lines = cleanSkill.split('\n');
  return {
    id: `notion_nte_${definition.key}`,
    name: lines[0].replace(/\*\*/g, '').replace(/==/g, '').trim() || definition.name,
    type: definition.type,
    tag: definition.name,
    description: lines.slice(1).join('\n').trim().replace(/(^|\n)\*\*\s*-\s*/g, '$1- '),
    icon: definition.icon
  };
};

export const normalizeNteCharacter = item => {
  const citySkill = (item.citySkill || '').replace(/(Lv\.\s*\d+)\s*\n/g, '$1 ');
  const citySkill2 = (item.citySkill2 || '').replace(/(Lv\.\s*\d+)\s*\n/g, '$1 ');
  const normalizedSkills = { ...item, citySkill, citySkill2 };
  const baseStats = {};
  for (const line of (item.growthStats || '').split('\n')) {
    const match = line.match(/(\d+)\s*:\s*([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d\.%]+)\s+([\d\.%]+)/);
    if (!match) continue;
    baseStats[`lv${match[1]}`] = {
      '기초 HP': Number.parseInt(match[2].replace(/,/g, ''), 10),
      '기초 공격력': Number.parseInt(match[3].replace(/,/g, ''), 10),
      '기초 방어력': Number.parseInt(match[4].replace(/,/g, ''), 10),
      '치명 확률': match[5],
      '치명 피해': match[6]
    };
  }

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
  const skills = [];
  for (const definition of skillMap) {
    const value = normalizedSkills[definition.key];
    if (!value) continue;
    if (definition.key !== 'resonance') {
      skills.push(parseSkill(value, definition));
      continue;
    }
    const cleanResonance = value
      .replace(/\*\*\s*\n+\s*\*\*/g, '\n')
      .replace(/(^|\n)\*\*\s*-\s*/g, '$1- ');
    cleanResonance.split(/\n\n+/).filter(block => block.trim()).forEach((block, index) => {
      const lines = block.split('\n');
      skills.push({
        id: `notion_nte_resonance_${index + 1}`,
        name: lines[0].replace(/\*\*/g, '').replace(/==/g, '').trim() || `공명 ${index + 1}`,
        type: '공명',
        tag: '공명',
        description: lines.slice(1).join('\n').trim().replace(/(^|\n)\*\*\s*-\s*/g, '$1- '),
        icon: '공명'
      });
    });
  }

  const eidolons = (item.awakenings || '').split(/\n\n+/).filter(block => block.trim()).map((block, index) => {
    const lines = block.split('\n');
    return {
      rank: index + 1,
      name: lines[0].replace(/\*\*/g, '').replace(/==/g, '').trim(),
      description: lines.slice(1).join('\n').trim(),
      iconKey: `각성${index + 1}`
    };
  });

  const specialTerms = {};
  for (const block of (item.glossary || '').split(/\n\n+/).filter(value => value.trim())) {
    const lines = block.split('\n');
    const term = lines[0].replace(/\*\*/g, '').replace(/==/g, '').trim();
    const description = lines.slice(1).join('\n').trim();
    if (term && description) specialTerms[term] = description;
  }

  const skinSource = item.skins || item['스킨'] || '';

  return {
    id: item.id,
    name: item.name,
    originalName: item.name,
    gameId: 'nte',
    folderName: item.name,
    fileName: item.fileName || item.name,
    isTrailblazer: item.name === '감정사',
    type: '캐릭터',
    rarity: typeof item.rarity === 'string' && (item.rarity.toUpperCase() === 'S' || item.rarity === '5') ? 5 : Number(item.rarity) || 4,
    releaseVersion: item.releaseVersion || '1.0',
    itemAttribute: item.itemAttribute || '',
    attribute: item.abilityAttribute || item.itemAttribute || '',
    arc: item.arc || '',
    contract: item.contract || '',
    birthday: item.birthday || '',
    citySkill,
    virailSkill: item.virailSkill || '',
    ultimateSkill: item.ultimateSkill || '',
    supportSkill: item.supportSkill || '',
    passiveSkill1: item.passiveSkill1 || '',
    passiveSkill2: item.passiveSkill2 || '',
    awakenings: item.awakenings || '',
    eidolons,
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
    baseStats,
    specialTerms,
    materials_v2: {
      ascension: parseMaterials(item.ascensionMaterials),
      traces: parseMaterials(item.skillMaterials)
    },
    skills,
    ascensionMaterials: item.ascensionMaterials || '',
    skillMaterials: item.skillMaterials || '',
    basicAttack: item.basicAttack || '',
    isNotion: true,
    skins: skinSource.split('\n').map(value => value.replace(/[*=]/g, '').trim()).filter(Boolean)
  };
};
