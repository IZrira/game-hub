import * as fs from 'fs';

const RAW_PATH = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/batch7_raw.txt';
const USER_DATA_PATH = 'c:/Users/User/Desktop/rira game hub/game-hub/scratch/hsr/user_provided_lcs.json';

const rawText = fs.readFileSync(RAW_PATH, 'utf8');
const existingData = JSON.parse(fs.readFileSync(USER_DATA_PATH, 'utf8'));

// Batch 7 has blocks separated by 2-3 newlines and horizontal lines sometimes, 
// let's use a more flexible block splitter: double newline follows by non-whitespace
const blocks = rawText.split(/\n\s*\n\s*\n/).filter(b => b.trim() !== '');

const parsedItems = blocks.map(block => {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
  if (lines.length === 0) return null;

  // First line: [Name] [Path]
  const firstLine = lines[0];
  const pathMatch = firstLine.match(/(파멸|수렵|지식|화합|공허|보존|풍요|환락|기억)$/);
  const path = pathMatch ? pathMatch[0] : '';
  const name = firstLine.replace(path, '').trim();

  let s1Name = '', s1Desc = '', s5Name = '', s5Desc = '';
  let hp = 0, atk = 0, def = 0;
  let storyLines: string[] = [];
  let state: 'none' | 's1' | 's5' | 'stats' | 'story' = 'none';

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line === '1중첩') {
      state = 's1';
      s1Name = lines[i+1] || '';
      i++;
      continue;
    }
    if (line === '5중첩') {
      state = 's5';
      s5Name = lines[i+1] || '';
      i++;
      continue;
    }
    if (line.startsWith('HP')) {
      state = 'stats';
      const hpMatch = line.match(/HP\s+(\d+)/);
      if (hpMatch) hp = parseInt(hpMatch[1]);
      continue;
    }
    if (line.startsWith('공격력')) {
      const atkMatch = line.match(/공격력\s+(\d+)/);
      if (atkMatch) atk = parseInt(atkMatch[1]);
      continue;
    }
    if (line.startsWith('방어력')) {
      const defMatch = line.match(/방어력\s+(\d+)/);
      if (defMatch) def = parseInt(defMatch[1]);
      continue;
    }
    if (line === '스토리') {
      state = 'story';
      continue;
    }

    if (state === 's1') s1Desc += line + ' ';
    else if (state === 's5') s5Desc += line + ' ';
    else if (state === 'story') storyLines.push(line);
  }

  // Determine rarity for 3-stars
  let rarity = (hp && hp > 1000) ? 5 : (hp && hp > 800 ? 4 : 3);
  if (name === '눈물의 흔적' || name === '비웃음' || name === '추억 회상' || name === '불타는 그림자') {
      rarity = 4; // These are specific 4-star-ish or specialized
  }

  return {
    name,
    path,
    hp,
    atk,
    def,
    rarity,
    skillName: s1Name,
    s1: s1Desc.trim(),
    s5: s5Desc.trim(),
    story: storyLines.join('\n')
  };
}).filter(item => item !== null);

const nameSet = new Set(parsedItems.map(item => item!.name));
const filteredExisting = existingData.filter((item: any) => !nameSet.has(item.name));

const finalData = [...filteredExisting, ...parsedItems];

fs.writeFileSync(USER_DATA_PATH, JSON.stringify(finalData, null, 2));
console.log(`Successfully parsed and merged ${parsedItems.length} items. Total high-quality items: ${finalData.length}`);
