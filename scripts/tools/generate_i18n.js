import fs from 'fs';
import path from 'path';

const charactersDir = path.join(process.cwd(), 'hsr-hub/data/characters/hsr');
const lightconesDir = path.join(process.cwd(), 'hsr-hub/data/lightcones');
const localesDir = path.join(process.cwd(), 'hsr-hub/locales');

if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

let characterMapKo = {};
let characterMapEn = {};
let lightconeMapKo = {};
let lightconeMapEn = {};

function processFile(filePath, isCharacter) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Regex to broadly grab keys like "character.dan_heng_..." or "lightcone.lc_..." anywhere
  const keyRegex = /['"]((?:character\.[^'"]+|evernight\.[^'"]+|phainon\.[^'"]+|lightcone\.[^'"]+))['"]/g;
  
  let match;
  while ((match = keyRegex.exec(content)) !== null) {
     const fullKey = match[1];
     if (isCharacter) {
         if (!characterMapKo[fullKey]) {
             characterMapKo[fullKey] = generateKoreanMock(fullKey);
             characterMapEn[fullKey] = generateEnglishMock(fullKey);
         }
     } else {
         if (!lightconeMapKo[fullKey]) {
             lightconeMapKo[fullKey] = generateKoreanMock(fullKey);
             lightconeMapEn[fullKey] = generateEnglishMock(fullKey);
         }
     }
  }
}

// Special treatment for dan_heng_permansor_terrae and evernight to create nicely formatted strings
function generateKoreanMock(key) {
    if (key.includes('dan_heng_permansor_terrae')) {
        if (key.endsWith('.name') || key.endsWith('metadata.name')) return "단항•등황";
        if (key.endsWith('.briefInfo') || key.endsWith('metadata.brief')) return "단항•등황 캐릭터 간략 정보 (임시 번역)";
        if (key.includes('.skills.')) return "단항•등황 스킬 (임시 번역)";
        if (key.includes('.additionalAbilities.')) return "추가 능력 (임시 번역)";
        if (key.includes('.eidolons.')) return "단항•등황 성혼 (임시 번역)";
        if (key.includes('.specialTerms.')) return "특수 용어 설명 (임시 번역)";
    }
    if (key.includes('evernight')) {
        if (key.endsWith('evernight.skill.basic.name')) return "에버나이트 일반 공격";
        if (key.endsWith('evernight.skill.skill.name')) return "에버나이트 전투 스킬";
        if (key.endsWith('evernight.skill.ultimate.name')) return "에버나이트 필살기";
        if (key.endsWith('evernight.skill.talent.name')) return "에버나이트 특성";
        if (key.endsWith('.name')) return "에버나이트 이름/특성";
        if (key.endsWith('.desc') || key.endsWith('.description')) return "에버나이트 스킬 설명 (임시 번역)";
    }
    if (key.includes('phainon')) {
        if (key.endsWith('.name')) return "파이논 스킬/특성";
        if (key.endsWith('.desc') || key.endsWith('.description')) return "파이논 설명 (임시 번역)";
    }
    if (key.startsWith('lightcone.')) {
        // e.g. lightcone.lc_고독의_치유.name -> 고독의 치유
        const nameMatch = key.match(/lc_([^\.]+)\.name/);
        if (nameMatch) {
            return nameMatch[1].replace(/_/g, ' ');
        }
        const skillMatch = key.match(/lc_([^\.]+)\.skill\.name/);
        if (skillMatch) {
            return skillMatch[1].replace(/_/g, ' ') + " 스킬명 (임시 번역)";
        }
    }
    
    // Fallback
    return key + " (KO)";
}

function generateEnglishMock(key) {
    if (key.includes('dan_heng_permansor_terrae')) {
        if (key.endsWith('.name') || key.endsWith('metadata.name')) return "Dan Heng • Permansor Terrae";
        if (key.endsWith('.briefInfo') || key.endsWith('metadata.brief')) return "Brief character info (Pending)";
        if (key.includes('.skills.')) return "Skill Description (Pending)";
        if (key.includes('.additionalAbilities.')) return "Additional Ability (Pending)";
        if (key.includes('.eidolons.')) return "Eidolon (Pending)";
        if (key.includes('.specialTerms.')) return "Special Term (Pending)";
    }
    if (key.includes('evernight')) {
        if (key.endsWith('evernight.skill.basic.name')) return "Evernight Basic ATK";
        if (key.endsWith('evernight.skill.skill.name')) return "Evernight Skill";
        if (key.endsWith('evernight.skill.ultimate.name')) return "Evernight Ultimate";
        if (key.endsWith('evernight.skill.talent.name')) return "Evernight Talent";
        if (key.endsWith('.name')) return "Evernight Name/Talent";
        if (key.endsWith('.desc') || key.endsWith('.description')) return "Evernight Skill Desc (Pending)";
    }
    if (key.includes('phainon')) {
        if (key.endsWith('.name')) return "Phainon Skill/Talent";
        if (key.endsWith('.desc') || key.endsWith('.description')) return "Phainon Desc (Pending)";
    }
    if (key.startsWith('lightcone.')) {
        const nameMatch = key.match(/lc_([^\.]+)\.name/);
        if (nameMatch) {
            return nameMatch[1] + " (EN)";
        }
        const skillMatch = key.match(/lc_([^\.]+)\.skill\.name/);
        if (skillMatch) {
            return skillMatch[1] + " Skill (Pending EN)";
        }
    }
    return key + " (EN)";
}

function scanDir(dir, isCharacter) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full, isCharacter);
    } else if (full.endsWith('.ts')) {
      processFile(full, isCharacter);
    }
  }
}

scanDir(charactersDir, true);
scanDir(lightconesDir, false);

fs.writeFileSync(path.join(localesDir, 'hsr_characters_ko.json'), JSON.stringify(characterMapKo, null, 2));
fs.writeFileSync(path.join(localesDir, 'hsr_characters_en.json'), JSON.stringify(characterMapEn, null, 2));
fs.writeFileSync(path.join(localesDir, 'hsr_lightcones_ko.json'), JSON.stringify(lightconeMapKo, null, 2));
fs.writeFileSync(path.join(localesDir, 'hsr_lightcones_en.json'), JSON.stringify(lightconeMapEn, null, 2));

console.log("Successfully extracted and merged i18n keys for Characters and Lightcones!");
