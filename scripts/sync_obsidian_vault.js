import fs from 'fs';
import path from 'path';

const NOTION_DATA_PATH = './common-hub/data/notion-data.json';
const WIKI_NTE_CHAR_DIR = './10_Wiki/👥 Characters/NTE';

if (!fs.existsSync(WIKI_NTE_CHAR_DIR)) {
  fs.mkdirSync(WIKI_NTE_CHAR_DIR, { recursive: true });
}

const notionData = JSON.parse(fs.readFileSync(NOTION_DATA_PATH, 'utf8'));
const nteChars = notionData.filter(d => d.dbSource === 'nte_characters');
const nteArcs = notionData.filter(d => d.dbSource === 'nte_arcs');

console.log(`Loaded ${nteChars.length} NTE characters and ${nteArcs.length} NTE arcs.`);

const nameToSlug = {
  '잔홍': 'zhanhong',
  '신쿠': 'shinku',
  '일로이': 'eloy',
  '치즈': 'cheese',
  '카오스': 'chaos',
  '우미츠키': 'umitsuki',
  '구원': 'guwon',
  '다포딜': 'daffodil',
  '호토리': 'hotori',
  '감정사': 'evaluator',
  '파디아': 'fadia',
  '아들러': 'adler',
  '하토르': 'hathor',
  '백장': 'baijiang',
  '에드가': 'edgar',
  '하니엘': 'haniel',
  '민트': 'mint',
  '나나리': 'nanari',
  '스키아': 'skia',
  '라크리모사': 'lacrimosa',
  '사키리': 'sakiri'
};

// 1. Generate/Update all 21 NTE Character MD files
nteChars.forEach(char => {
  const slug = nameToSlug[char.name] || char.fileName || char.name.toLowerCase();
  const filePath = path.join(WIKI_NTE_CHAR_DIR, `${slug}.md`);

  const rarityNum = char.rarity === 5 || char.rarity === 'S' ? 5 : char.rarity === 4 || char.rarity === 'A' ? 4 : 3;
  const rarityLabel = rarityNum === 5 ? 'S' : rarityNum === 4 ? 'A' : 'B';
  const element = char.abilityAttribute || char.itemAttribute || '혼';
  const role = char.combatRoles || '딜러';
  const affiliation = char.affiliation || '헤테로 시티';

  const content = `---
id: nte-char-${slug}
category: "[[10_Wiki/👥 Characters/NTE]]"
confidence_score: 1.0
tags: [nte, ${element}, ${role}, ${affiliation.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9가-힣-]/g, '')}, v${char.releaseVersion || '1-0'}]
rarity: ${rarityNum}
rarity_grade: ${rarityLabel}
element: ${element}
role: ${role}
release_version: "${char.releaseVersion || '1.0'}"
last_reinforced: 2026-08-29
---

# [[${slug}]] (${char.name})

## 📌 한 줄 요약/통찰 (The Karpathy Summary)
> "${char.briefInfo || `${char.name} - 헤테로 시티 ${affiliation} 소속의 ${rarityLabel}등급(${rarityNum}성) ${element} 속성 ${role}.`}"

---

## 📋 기본 정보 (Profile & Overview)
- **이름:** ${char.name}
- **등급:** **${rarityLabel}등급 (${rarityNum}성)**
- **이능력 속성:** ${element}
- **전투 포지션:** ${role}
- **소속:** ${affiliation}
- **아크 분류:** ${char.arc || '결합'}
- **계약 / 생일:** ${char.contract ? `계약: ${char.contract}` : ''} ${char.birthday ? `| 생일: ${char.birthday}` : ''}
- **성우진:** ${char.voiceActors || '미정'}
- **언어별 표기:** ${char.locales || char.name}

---

## 🌀 스킬 및 메커니즘 (Skills & Abilities)

### 🗡️ 일반 공격 (Basic Attack)
${char.basicAttack ? char.basicAttack.trim() : '등록된 일반 공격 정보가 없습니다.'}

### ⚡ 바이레일 스킬 (Virail Skill)
${char.virailSkill ? char.virailSkill.trim() : '등록된 바이레일 스킬 정보가 없습니다.'}

### 💥 울티메이트 (Ultimate)
${char.ultimateSkill ? char.ultimateSkill.trim() : '등록된 울티메이트 정보가 없습니다.'}

### 🛡️ 서포트 스킬 (Support Skill)
${char.supportSkill ? char.supportSkill.trim() : '등록된 서포트 스킬 정보가 없습니다.'}

### 🔮 패시브 스킬 1 & 2 (Passive Skills)
- **패시브 1:**
${char.passiveSkill1 ? char.passiveSkill1.trim() : '없음'}

- **패시브 2:**
${char.passiveSkill2 ? char.passiveSkill2.trim() : '없음'}

${char.citySkill || char.citySkill2 ? `### 🏙️ 도시 스킬 (City Skills)
${char.citySkill ? `- **도시 스킬 1:** ${char.citySkill}` : ''}
${char.citySkill2 ? `- **도시 스킬 2:** ${char.citySkill2}` : ''}` : ''}

${char.trait ? `### 🌟 특성 (Trait)
${char.trait.trim()}` : ''}

---

## 🌟 각성 효과 (Awakenings)
${char.awakenings ? char.awakenings.trim() : '각성 정보가 등록되어 있지 않습니다.'}

${char.resonance ? `---

## 🧬 공명 (Resonance)
${char.resonance.trim()}` : ''}

${char.ascensionMaterials || char.skillMaterials ? `---

## 📦 육성 재료 (Materials)
${char.ascensionMaterials ? `### 돌파 재료\n\`\`\`\n${char.ascensionMaterials}\n\`\`\`` : ''}
${char.skillMaterials ? `### 스킬 재료\n\`\`\`\n${char.skillMaterials}\n\`\`\`` : ''}` : ''}

---

## 🔗 지식 연결 (Graph)
- **Parent:** [[10_Wiki/👥 Characters/NTE]]
- **Related:** [[nte-arc-database-guide]], [[nte-party-strategies]], [[attribute-synergy-guide]], [[20_Meta/Index]]
`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved character: ${char.name} -> ${filePath}`);
});

console.log('Successfully generated all 21 NTE Character MD files!');
