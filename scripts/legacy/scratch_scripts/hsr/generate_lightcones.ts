import * as fs from 'fs';
import * as path from 'path';

const MASTER_PATH = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/master_158_perfect_final.json';
const USER_DATA_PATH = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/user_provided_lcs.json';
const EXTRACTED_MAPPING_PATH = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/extracted_mapping.json';
const OUTPUT_DIR = 'c:/Users/User/Desktop/rira game hub/game-hub/hsr-hub/data/lightcones';

const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf8'));
const userData = JSON.parse(fs.readFileSync(USER_DATA_PATH, 'utf8'));
const extractedMapping = JSON.parse(fs.readFileSync(EXTRACTED_MAPPING_PATH, 'utf8'));

const pathMap: Record<string, string> = {
    'abundance': '풍요',
    'destruction': '파멸',
    'erudition': '지식',
    'harmony': '화합',
    'hunt': '수렵',
    'nihility': '공허',
    'preservation': '보존',
    'elation': '환락',
    'remembrance': '기억',
    'mistery': '신비'
};

const revPathMap: Record<string, string> = {};
for (const [k, v] of Object.entries(pathMap)) revPathMap[v] = k;

function sanitize(text: string | undefined): string {
    if (!text) return '';
    // Remove everything starting from a separator or common corruption markers
    let clean = text.split('----')[0];
    clean = clean.split('HP ')[0];
    clean = clean.split('공격력 ')[0];
    clean = clean.split('방어력 ')[0];
    clean = clean.split('스토리')[0]; // Sometimes 'Story' text is mixed in
    return clean.trim();
}

function normalize(name: string) {
    return name.replace(/\(무명의 공훈\)/g, '').trim().replace(/\s+/g, '_').replace(/[,!~?]/g, '');
}

function classify(lc: any) {
    const text = (lc.s1 + lc.skillName + (lc.story || '')).toLowerCase();
    if (text.includes('치유량') || text.includes('디버프 해제') || text.includes('풍요')) return 'abundance';
    if (text.includes('실드') || text.includes('방어력') || text.includes('보존')) return 'preservation';
    if (text.includes('디버프') || text.includes('지속 피해') || text.includes('효과 명중') || text.includes('공허')) return 'nihility';
    if (text.includes('추가 공격') || text.includes('필살기') || text.includes('지식')) return 'erudition';
    if (text.includes('아군') || text.includes('가하는 피해 증가') || text.includes('화합')) return 'harmony';
    if (text.includes('치명타 확률') || text.includes('치명타 피해') || text.includes('속도') || text.includes('수렵')) return 'hunt';
    if (text.includes('피격') || text.includes('공격력') || text.includes('파멸')) return 'destruction';
    return 'destruction'; // Default
}

const finalData: Record<string, any[]> = {
    abundance: [],
    destruction: [],
    erudition: [],
    harmony: [],
    hunt: [],
    nihility: [],
    preservation: [],
    elation: [],
    remembrance: [],
    mistery: []
};

function cleanName(n: string) {
    return n.replace(/\s+/g, '').replace(/[,!~?]/g, '');
}

// Map each 158 entries
masterData.forEach((lc: any) => {
    const cleanedMasterName = cleanName(lc.name);
    
    // Check if user provided priority data
    const userLC = userData.find((u: any) => cleanName(u.name) === cleanedMasterName);
    
    let targetPath = 'destruction';
    if (userLC && userLC.path) {
        targetPath = revPathMap[userLC.path] || targetPath;
    } else if (extractedMapping[lc.name]) {
        targetPath = extractedMapping[lc.name];
    } else {
        targetPath = classify(lc);
    }

    // Manual Overrides for known ones if still wrong
    if (cleanedMasterName === '승리의순간') targetPath = 'preservation';
    if (cleanedMasterName === '세계의이름으로') targetPath = 'nihility';
    if (cleanedMasterName === '아직전투는끝나지않았다') targetPath = 'harmony';

    if (!finalData[targetPath]) targetPath = 'mistery';

    const finalS1 = userLC ? userLC.s1 : sanitize(lc.s1);
    const finalS5 = userLC ? userLC.s5 : sanitize(lc.s5);
    const finalStory = userLC ? userLC.story : sanitize(lc.story);
    const finalSkillName = userLC ? userLC.skillName : (lc.skillName || '');

    const rawName = userLC ? userLC.name : lc.name;
    const cleanDisplayName = rawName.replace(/\(무명의 공훈\)/g, '').trim();

    const mergedLC = {
        id: `lc_${normalize(cleanDisplayName)}`,
        name: cleanDisplayName,
        folderName: cleanDisplayName,
        rarity: (userLC && userLC.rarity) ? userLC.rarity : (lc.hp > 1000 ? 5 : (lc.hp > 800 ? 4 : 3)),
        path: pathMap[targetPath],
        baseStats: (userLC && userLC.hp) ? `createLv80Stats(${userLC.hp}, ${userLC.atk}, ${userLC.def})` : `createLv80Stats(${lc.hp || 0}, ${lc.atk || 0}, ${lc.def || 0})`,
        skill: {
            name: finalSkillName,
            description: `[1중첩] ${finalS1}\n[5중첩] ${finalS5}`
        },
        story: finalStory
    };

    finalData[targetPath].push(mergedLC);
});

// Add user-only LCs that might not be in the 158 master list (if any)
userData.forEach((u: any) => {
    const exists = masterData.find((m: any) => cleanName(m.name) === cleanName(u.name));
    if (!exists) {
        const targetPath = revPathMap[u.path] || 'mistery';
        const cleanDisplayName = u.name.replace(/\(무명의 공훈\)/g, '').trim();
        const newLC = {
            id: `lc_${normalize(cleanDisplayName)}`,
            name: cleanDisplayName,
            folderName: cleanDisplayName,
            rarity: (u.hp && u.hp > 1000) ? 5 : 4,
            path: u.path,
            baseStats: `createLv80Stats(${u.hp || 0}, ${u.atk || 0}, ${u.def || 0})`,
            skill: {
                name: u.skillName || '',
                description: `[1중첩] ${u.s1}\n[5중첩] ${u.s5}`
            },
            story: u.story || ''
        };
        finalData[targetPath].push(newLC);
    }
});

// Generate files
for (const [fileName, lcs] of Object.entries(finalData)) {
    const varName = `${fileName}Lightcones`;
    const content = `import { LightCone } from '../../../common-hub/types';
import { createLv80Stats } from '../dataFactory';

export const ${varName}: LightCone[] = ${JSON.stringify(lcs, null, 2).replace(/"baseStats": "([^"]+)"/g, '"baseStats": $1')};
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, `${fileName}.ts`), content);
}

console.log('Successfully generated all lightcone files.');
