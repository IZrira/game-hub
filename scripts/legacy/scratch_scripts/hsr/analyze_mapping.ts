import * as fs from 'fs';
import * as path from 'path';

// This is a temporary script to finalize Path mapping
const masterData = JSON.parse(fs.readFileSync('c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/master_158_perfect_final.json', 'utf8'));
const userData = JSON.parse(fs.readFileSync('c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/user_provided_lcs.json', 'utf8'));

const userLCs = new Set(userData.map((lc: any) => lc.name));
const remainingLCs = masterData.filter((lc: any) => !userLCs.has(lc.name));

console.log(`Total Master LCs: ${masterData.length}`);
console.log(`User provided: ${userData.length}`);
console.log(`Remaining to categorize: ${remainingLCs.length}`);

// Simple keyword-based classifier
function classify(lc: any) {
    const text = (lc.s1 + lc.skillName + lc.story).toLowerCase();
    if (text.includes('치유량') || text.includes('디버프 해제') || text.includes('풍요')) return '풍요';
    if (text.includes('실드') || text.includes('방어력') || text.includes('보존')) return '보존';
    if (text.includes('디버프') || text.includes('지속 피해') || text.includes('효과 명중') || text.includes('공허')) return '공허';
    if (text.includes('추가 공격') || text.includes('필살기') || text.includes('지식')) return '지식';
    if (text.includes('아군') || text.includes('가하는 피해 증가') || text.includes('화합')) return '화합';
    if (text.includes('치명타 확률') || text.includes('치명타 피해') || text.includes('속도') || text.includes('수렵')) return '수렵';
    if (text.includes('피격') || text.includes('공격력') || text.includes('파멸')) return '파멸';
    return '기타';
}

const categorized = remainingLCs.reduce((acc: any, lc: any) => {
    const p = classify(lc);
    acc[p] = (acc[p] || 0) + 1;
    return acc;
}, {});

console.log('Categories for remaining LCs:', categorized);
