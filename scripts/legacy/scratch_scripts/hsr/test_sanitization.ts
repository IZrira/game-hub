import * as fs from 'fs';

const MASTER_PATH = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/master_158_perfect_final.json';
const masterData = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf8'));

function sanitize(text: string): string {
    if (!text) return '';
    // Remove separator lines and everything after them
    let clean = text.split(/[-=]{10,}/)[0];
    // Remove common junk phrases found in the mess
    clean = clean.split('\nHP ')[0];
    clean = clean.split('\n공격력 ')[0];
    clean = clean.split('\n방어력 ')[0];
    return clean.trim();
}

const sampled = masterData.filter((lc: any) => lc.story && (lc.story.includes('---') || lc.story.includes('HP ')));

console.log(`Found ${sampled.length} potentially corrupted entries.`);

sampled.forEach((lc: any) => {
    console.log(`--- ${lc.name} ---`);
    console.log(`BEFORE (last 50 chars): ...${lc.story.slice(-50)}`);
    console.log(`AFTER (last 50 chars): ...${sanitize(lc.story).slice(-50)}`);
});
