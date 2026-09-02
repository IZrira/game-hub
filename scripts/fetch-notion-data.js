import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 1. .env 및 .env.local 파서
function loadEnv() {
  const envFiles = ['.env', '.env.local'];
  for (const envFile of envFiles) {
    const envPath = path.join(ROOT_DIR, envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const match = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
        if (match) {
          process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }
}
loadEnv();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID; // Weapons DB
const NOTION_WW_CHARACTER_DB_ID = process.env.NOTION_WW_CHARACTER_DB_ID; // Characters DB
const NOTION_WW_ITEM_DB_ID = process.env.NOTION_WW_ITEM_DB_ID; // WW Items DB
const NOTION_WW_ECHOES_DB_ID = process.env.NOTION_WW_ECHOES_DB_ID; // WW Echoes DB
const NOTION_WW_GUIDES_DB_ID = process.env.NOTION_WW_GUIDES_DB_ID || '37495fae3dc780ce95fffd47cfb611f6'; // WW Guides DB
const NOTION_NTE_ITEM_DB_ID = process.env.NOTION_NTE_ITEM_DB_ID || '38095fae3dc780a29fffe0381071580d'; // NTE Items DB
const NOTION_NTE_CHARACTER_DB_ID = process.env.NOTION_NTE_CHARACTER_DB_ID || '38095fae3dc7802aa4abf9ab1977e687'; // NTE Characters DB
const NOTION_NTE_ARC_DB_ID = process.env.NOTION_NTE_ARC_DB_ID || '38095fae3dc780c3a7c4d901cbe9411c'; // NTE Arcs DB

const destDir = path.join(ROOT_DIR, 'common-hub', 'data');
const jsonPath = path.join(destDir, 'notion-data.json');

const parseRichTextArray = (richTextArray) => {
  if (!richTextArray) return '';
  return richTextArray.map(rt => {
    let text = rt.plain_text;
    if (rt.annotations) {
      if (rt.annotations.bold) text = `**${text}**`;
      if (rt.annotations.color && rt.annotations.color !== 'default') text = `==${text}==`;
    }
    return text;
  }).join('');
};

const sanitizeAwsSecrets = (text) => {
  if (!text || typeof text !== 'string') return text || '';
  // Strip S3 presigned query parameters (?X-Amz-Algorithm=... etc) that contain temporary AWS keys
  return text
    .replace(/https:\/\/prod-files-secure\.s3\.[a-z0-9-]+\.amazonaws\.com\/([^?\s\)]+)\?[^)\s\n]+/g, 'https://prod-files-secure.s3.amazonaws.com/$1')
    .replace(/X-Amz-[^=]+=[^&\s\)\n]+/g, '')
    .replace(/ASIA[A-Z0-9]{16,}/g, '');
};

const extractRichText = (prop) => {
  let res = '';
  if (!prop) return '';
  if (prop.type === 'rich_text') res = parseRichTextArray(prop.rich_text);
  else if (prop.type === 'title') res = parseRichTextArray(prop.title);
  else if (prop.type === 'select') res = prop.select?.name || '';
  else if (prop.type === 'multi_select') res = prop.multi_select?.map(s => s.name).join(', ') || '';
  else if (prop.type === 'date') res = prop.date?.start || '';
  else if (prop.type === 'number') res = prop.number?.toString() || '';
  else if (prop.rich_text) res = parseRichTextArray(prop.rich_text);
  
  if (res.trim() === '없음' || res.trim() === '없음.') return '';
  return sanitizeAwsSecrets(res);
};

async function fetchFromDB(notion, dbId, n2m, isCharacterDB = false, gameName = '명조') {
  let results = [];
  let hasMore = true;
  let nextCursor = undefined;

  // 캐릭터 DB의 기본 정렬 기준 (캐릭터 DB는 '캐릭터', 무기 DB는 '이름'이 타이틀)
  const sortProperty = isCharacterDB ? '캐릭터' : '이름';

  while (hasMore) {
    try {
      const response = await notion.request({
        path: `databases/${dbId}/query`,
        method: 'POST',
        body: {
          sorts: [{ property: sortProperty, direction: 'ascending' }],
          start_cursor: nextCursor
        }
      });
      console.log(`[Notion Sync] Fetched page ${results.length + response.results.length} from ${dbId}`);
      results.push(...response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    } catch (e) {
      console.warn(`[Notion Sync] Failed to fetch from DB ${dbId} (sort fallback):`, e.message);
      // fallback without sort if property missing
      hasMore = false;
      if (e.status === 400) {
        let hasMoreFallback = true;
        let nextCursorFallback = undefined;
        while(hasMoreFallback) {
           const fallbackResp = await notion.request({
            path: `databases/${dbId}/query`,
            method: 'POST',
            body: { start_cursor: nextCursorFallback }
          });
          console.log(`[Notion Sync] Fallback fetched page ${results.length + fallbackResp.results.length} from ${dbId}`);
          results.push(...fallbackResp.results);
          hasMoreFallback = fallbackResp.has_more;
          nextCursorFallback = fallbackResp.next_cursor;
        }
      } else {
        throw e;
      }
    }
  }

  const itemsMap = new Map();
  let wwKeysLogged = false;
  
  for (const page of results) {
    const props = page.properties;
    
    // Only log if this is from WW Items DB and we haven't logged yet
    if (!wwKeysLogged && !isCharacterDB && props['아이템'] || props['아이템 이름'] || props['이름'] || Object.keys(props).some(k => k.includes('아이템'))) {
       // We can just log if it's the WW items fetch loop... but `results` is mixed here.
       // Actually `fetchFromDB` is called separately for each DB, but `results` is the parameter of `fetchFromDB`? No, `fetchFromDB` maps the `results`.
    }
    
    // 캐릭터 DB인 경우 기본 type을 '캐릭터'로 지정
    
    // Dump properties for the first WW character for analysis
    if (isCharacterDB && !wwKeysLogged) {
      console.log('WW Character raw properties:', Object.keys(props));
      wwKeysLogged = true;
    }

    const type = isCharacterDB ? '캐릭터' : (props['필터']?.select?.name || props['필터']?.rich_text?.[0]?.plain_text || props['필터']?.multi_select?.[0]?.name || props['타입']?.select?.name || props['종류']?.select?.name || props['분류']?.select?.name || props['분류']?.rich_text?.[0]?.plain_text || '');
    
    let contentMarkdown = '';
    // 캐릭터 DB인 경우에만 본문 마크다운 파싱 (아이템/무기는 속성 프로퍼티 사용으로 초고속 처리)
    if (isCharacterDB) {
      try {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);
        contentMarkdown = sanitizeAwsSecrets(mdString.parent || '');
      } catch (mdErr) {
        console.error(`[Notion Sync] Failed to fetch markdown content for page ${page.id}:`, mdErr);
      }
    }

    const name = props['아크명']?.title?.[0]?.plain_text || props['아크명']?.rich_text?.[0]?.plain_text || props['아크 명']?.title?.[0]?.plain_text || props['캐릭터']?.title?.[0]?.plain_text || props['아이템 명']?.title?.[0]?.plain_text || props['이름']?.title?.[0]?.plain_text || props['이름']?.rich_text?.[0]?.plain_text || '';
    const rarity = extractRichText(props['성급']) || extractRichText(props['등급']) || props['성급']?.select?.name || props['등급']?.select?.name || props['등급']?.number?.toString() || '';
    
    let releaseVersion = '';
    if (props['출시 버전']?.type === 'select') {
      releaseVersion = props['출시 버전']?.select?.name || '';
    } else if (props['추가 버전']?.type === 'select') {
      releaseVersion = props['추가 버전']?.select?.name || '';
    } else if (props['출시 버전']?.type === 'number') {
      releaseVersion = props['출시 버전']?.number?.toString() || '';
    } else {
      releaseVersion = extractRichText(props['출시 버전']) || extractRichText(props['추가 버전']);
    }
    
    let obtain = '';
    if (props['획득 경로']?.type === 'select' || props['획득처']?.type === 'select') {
      obtain = props['획득 경로']?.select?.name || props['획득처']?.select?.name || '';
    } else if (props['획득 경로']?.type === 'multi_select' || props['획득처']?.type === 'multi_select') {
      const ms = props['획득 경로']?.multi_select || props['획득처']?.multi_select;
      obtain = ms?.map(s => s.name).join(', ') || '';
    } else {
      obtain = extractRichText(props['획득 경로']) || extractRichText(props['획득처']);
    }
    
    const growthStats = extractRichText(props['성장 스텟']);
    const skillName = extractRichText(props['스킬명']);
    const skillDescription = extractRichText(props['스킬 설명']) || extractRichText(props['설명']) || extractRichText(props['스킬']);
    const ascensionMaterials = extractRichText(props['승급 재료']) || extractRichText(props['돌파 재료']);
    const skillMaterials = extractRichText(props['스킬 재료']);
    const weaponStory = extractRichText(props['아크 스토리']) || extractRichText(props['무기 스토리']) || extractRichText(props['스토리']);
    const dedicatedChar = extractRichText(props['전용']);

    const weapon = props['무기']?.select?.name || '';
    const affiliation = extractRichText(props['소속']);
    const combatRoles = extractRichText(props['전투 역할']) || extractRichText(props['전투 포지션']);
    const locales = extractRichText(props['언어별 표기']);
    const voiceActors = extractRichText(props['성우']);
    const briefInfo = extractRichText(props['캐릭터 간단 정보']);

    const basicAttack = extractRichText(props['기본 공격']) || extractRichText(props['일반 공격 스킬']) || extractRichText(props['일반 공격']);
    const resonanceSkill = extractRichText(props['공명 스킬']);
    const resonanceCircuit = extractRichText(props['공명 회로']);
    const inherentSkill1 = extractRichText(props['고유 스킬 1']);
    const inherentSkill2 = extractRichText(props['고유 스킬 2']);
    const resonanceLiberation = extractRichText(props['공명 해방']);
    const introSkill = extractRichText(props['변주 스킬']);
    const outroSkill = extractRichText(props['반주 스킬']);
    const harmonyBreak = extractRichText(props['조화도 파괴']);
    const resonanceChains = extractRichText(props['공명 체인']);
    const glossary = extractRichText(props['용어 정리']) || extractRichText(props['용어']);

    // NTE 전용 필드들 추가
    const abilityAttribute = props['이능력 속성']?.select?.name || '';
    const arc = props['아크']?.select?.name || '';
    const birthday = extractRichText(props['생일']);
    const contract = extractRichText(props['계약']);
    const citySkill = extractRichText(props['도시 스킬']);
    const citySkill2 = extractRichText(props['도시 스킬2']);
    const virailSkill = extractRichText(props['바이레일 스킬']);
    const ultimateSkill = extractRichText(props['울티메이트']);
    const supportSkill = extractRichText(props['서포트 스킬']);
    const passiveSkill1 = extractRichText(props['패시브 스킬1']);
    const passiveSkill2 = extractRichText(props['패시브 스킬2']);
    const awakenings = extractRichText(props['각성']);
    const resonance = extractRichText(props['공명']);
    const skins = extractRichText(props['스킨']) || extractRichText(props['skins']);
    const trait = extractRichText(props['특성']);

    // 선택적 영문 파일명(이미지 매핑용) 추가
    const fileName = props['파일 명']?.rich_text?.[0]?.plain_text || props['파일명']?.rich_text?.[0]?.plain_text || props['영문명']?.rich_text?.[0]?.plain_text || '';

    // WW 에코 전용 필드들 추가
    const costProp = props['Cost'] || props['코스트'];
    const cost = costProp?.number || (costProp?.select ? parseInt(costProp.select.name) : 0) || 0;
    const cooldown = props['Cooldown']?.number || 0;
    let sonataSets = [];
    const sonataProp = props['SonataSets'] || props['세트'];
    if (sonataProp?.type === 'multi_select') {
      sonataSets = sonataProp.multi_select.map(s => s.name);
    }
    const hasPhantom = props['hasPhantom']?.checkbox || false;
    const enemyOriginalName = extractRichText(props['Enemy Original Name']);
    const enemyGrade = extractRichText(props['Enemy Grade']) || extractRichText(props['몬스터 등급']);
    const enemyDescription = extractRichText(props['Enemy Description']);
    const enemySpecialNote = extractRichText(props['Enemy Special Note']);
    
    let drops = [];
    if (props['Drops']?.type === 'multi_select') {
      drops = props['Drops'].multi_select.map(s => s.name);
    } else {
      const dropText = extractRichText(props['Drops']);
      if (dropText) drops = dropText.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    }

    // WW 캐릭터 전용 속성 (스킬 입력 가이드 및 딜 사이클)
    const skillInputGuide = extractRichText(props['스킬 입력 가이드']);
    const combatCycle = extractRichText(props['딜 사이클']);
    
    // 추가 속성 (남여 분리 등)
    let itemAttribute = '';
    if (props['속성']?.type === 'select') {
      itemAttribute = props['속성']?.select?.name || '';
    } else if (props['속성']?.type === 'multi_select') {
      itemAttribute = props['속성']?.multi_select?.map(s => s.name).join(', ') || '';
    } else {
      itemAttribute = extractRichText(props['속성']);
    }

    const specialNote = extractRichText(props['특이 사항']) || props['특이 사항']?.select?.name || props['특이 사항']?.multi_select?.map(s => s.name).join(', ') || '';
    if (specialNote) {
      itemAttribute = itemAttribute ? `${itemAttribute}, ${specialNote}` : specialNote;
    }

    const normalizedName = name.trim();
    
    // 자동화 파이프라인: autoDescription 생성 (Programmatic SEO)
    let autoDescription = '';
    if (isCharacterDB || type === '캐릭터') {
      const charAttr = itemAttribute || props['운명의 길']?.select?.name || props['운명의 길']?.rich_text?.[0]?.plain_text || '속성 미상';
      const isHSR = props['운명의 길'] !== undefined;
      if (isHSR) {
        const path = props['운명의 길']?.select?.name || props['운명의 길']?.rich_text?.[0]?.plain_text || '운명의 길 미상';
        autoDescription = `${name}은(는) 붕괴: 스타레일의 ${charAttr} 속성, ${path} 운명의 길 캐릭터입니다.`;
      } else if (gameName === 'NTE') {
        const arcStr = arc ? ` ${arc} 아크를 다루는` : '';
        const attrStr = abilityAttribute ? `${abilityAttribute} 속성의` : (charAttr ? `${charAttr} 속성의` : '');
        autoDescription = `${name}은(는) 이연(NTE)의 ${attrStr}${arcStr} 캐릭터입니다. 주로 ${combatRoles || '딜러 혹은 서포터'} 역할을 수행합니다.`;
      } else {
        const weaponStr = weapon ? ` ${weapon} 무기를 사용하는` : '';
        autoDescription = `${name}은(는) 명조의 ${charAttr} 속성,${weaponStr} 공명자입니다. 주로 ${combatRoles || '딜러 혹은 서포터'} 역할을 수행합니다.`;
      }
      
      if (briefInfo) {
        autoDescription += ` ${briefInfo}`;
      }
    } else if (weapon) {
      // 무기용 설명
      autoDescription = `${name}은(는) ${weapon} 무기입니다.`;
      if (weaponStory) autoDescription += ` ${weaponStory.substring(0, 100)}...`;
    }

    let parsedRarity = 4;
    if (rarity) {
      const upper = String(rarity).trim().toUpperCase();
      if (upper === 'S' || upper === '5' || upper.startsWith('5')) parsedRarity = 5;
      else if (upper === 'A' || upper === '4' || upper.startsWith('4')) parsedRarity = 4;
      else if (upper === 'B' || upper === '3' || upper.startsWith('3')) parsedRarity = 3;
      else {
        const num = parseInt(upper.replace(/[^0-9]/g, ''), 10);
        parsedRarity = !isNaN(num) && num > 0 ? num : 4;
      }
    }

    if (normalizedName) {
      itemsMap.set(normalizedName, {
        id: page.id,
        name,
        autoDescription,
        rarity: parsedRarity,
        type,
        releaseVersion,
        obtain,
        growthStats,
        skillName,
        skillDescription,
        ascensionMaterials,
        skillMaterials,
        weaponStory,
        fileName,
        skillInputGuide,
        combatCycle,
        itemAttribute,
        weapon,
        affiliation,
        combatRoles,
        locales,
        voiceActors,
        briefInfo,
        basicAttack,
        resonanceSkill,
        resonanceCircuit,
        inherentSkill1,
        inherentSkill2,
        resonanceLiberation,
        introSkill,
        outroSkill,
        harmonyBreak,
        resonanceChains,
        glossary,
        cost,
        cooldown,
        sonataSets,
        hasPhantom,
        enemyOriginalName,
        enemyGrade,
        enemyDescription,
        enemySpecialNote,
        drops,
        abilityAttribute,
        arc,
        birthday,
        contract,
        citySkill,
        citySkill2,
        virailSkill,
        ultimateSkill,
        supportSkill,
        passiveSkill1,
        passiveSkill2,
        awakenings,
        resonance,
        dedicatedChar,
        skins,
        trait,
        content: contentMarkdown
      });
    }
  }

  return Array.from(itemsMap.values());
}

async function fetchNotionData() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (!NOTION_TOKEN || NOTION_TOKEN === 'secret_xxxxxxxxx') {
    console.log('[Notion Sync] Notion token is missing. Skipping fetch.');
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([], null, 2), 'utf8');
    }
    return;
  }

  console.log('[Notion Sync] Connecting to Notion API...');
  const notion = new Client({ auth: NOTION_TOKEN, notionVersion: '2022-06-28' });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  try {
    let allItems = [];

    // 1. Fetch from Weapons DB
    if (NOTION_DATABASE_ID && NOTION_DATABASE_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching Weapons from ${NOTION_DATABASE_ID}...`);
      const weapons = await fetchFromDB(notion, NOTION_DATABASE_ID, n2m, false);
      allItems.push(...weapons);
      console.log(`[Notion Sync] Fetched ${weapons.length} weapons.`);
    }

    // 2. Fetch from Characters DB
    if (NOTION_WW_CHARACTER_DB_ID && NOTION_WW_CHARACTER_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching Characters from ${NOTION_WW_CHARACTER_DB_ID}...`);
      const characters = await fetchFromDB(notion, NOTION_WW_CHARACTER_DB_ID, n2m, true);
      allItems.push(...characters);
      console.log(`[Notion Sync] Fetched ${characters.length} characters.`);
    }

    // 3. Fetch from WW Items DB
    if (NOTION_WW_ITEM_DB_ID && NOTION_WW_ITEM_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching WW Items from ${NOTION_WW_ITEM_DB_ID}...`);
      const wwItems = await fetchFromDB(notion, NOTION_WW_ITEM_DB_ID, n2m, false);
      
      if (wwItems.length > 0) {
        console.log('[DEBUG] First WW Item raw properties:', Object.keys(wwItems[0]));
      }

      // Ensure type is '아이템' if not explicitly set
      const formattedItems = wwItems.map(item => ({
        ...item,
        type: item.type || '아이템',
        dbSource: 'ww_items'
      }));
      
      allItems.push(...formattedItems);
      console.log(`[Notion Sync] Fetched ${wwItems.length} WW items.`);
    }

    // 4. Fetch from WW Echoes DB
    if (NOTION_WW_ECHOES_DB_ID && NOTION_WW_ECHOES_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching WW Echoes from ${NOTION_WW_ECHOES_DB_ID}...`);
      const wwEchoes = await fetchFromDB(notion, NOTION_WW_ECHOES_DB_ID, n2m, false);
      
      const formattedEchoes = wwEchoes.map(item => ({
        ...item,
        dbSource: 'ww_echoes'
      }));
      
      allItems.push(...formattedEchoes);
      console.log(`[Notion Sync] Fetched ${wwEchoes.length} WW echoes.`);
    }

    // 5. Fetch from NTE Items DB
    if (NOTION_NTE_ITEM_DB_ID && NOTION_NTE_ITEM_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching NTE Items from ${NOTION_NTE_ITEM_DB_ID}...`);
      const nteItems = await fetchFromDB(notion, NOTION_NTE_ITEM_DB_ID, n2m, false, 'NTE');
      
      const formattedNteItems = nteItems.map(item => ({
        ...item,
        type: item.type || '아이템',
        dbSource: 'nte_items'
      }));
      
      allItems.push(...formattedNteItems);
      console.log(`[Notion Sync] Fetched ${nteItems.length} NTE items.`);
    }

    // 6. Fetch from NTE Characters DB
    if (NOTION_NTE_CHARACTER_DB_ID && NOTION_NTE_CHARACTER_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching NTE Characters from ${NOTION_NTE_CHARACTER_DB_ID}...`);
      const nteCharacters = await fetchFromDB(notion, NOTION_NTE_CHARACTER_DB_ID, n2m, true, 'NTE');
      
      const formattedNteCharacters = nteCharacters.map(item => ({
        ...item,
        type: '캐릭터',
        dbSource: 'nte_characters'
      }));
      
      allItems.push(...formattedNteCharacters);
      console.log(`[Notion Sync] Fetched ${nteCharacters.length} NTE characters.`);
    }

    // 7. Fetch from NTE Arcs DB
    if (NOTION_NTE_ARC_DB_ID && NOTION_NTE_ARC_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching NTE Arcs from ${NOTION_NTE_ARC_DB_ID}...`);
      const nteArcs = await fetchFromDB(notion, NOTION_NTE_ARC_DB_ID, n2m, false, 'NTE');
      
      const formattedNteArcs = nteArcs.map(item => ({
        ...item,
        type: item.type || '결합',
        dbSource: 'nte_arcs'
      }));
      
      allItems.push(...formattedNteArcs);
      console.log(`[Notion Sync] Fetched ${nteArcs.length} NTE arcs.`);
    }

    // 8. Fetch from WW Character Guides DB
    if (NOTION_WW_GUIDES_DB_ID && NOTION_WW_GUIDES_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching WW Character Guides from ${NOTION_WW_GUIDES_DB_ID}...`);
      const wwGuides = await fetchWwGuidesFromDB(notion, n2m, NOTION_WW_GUIDES_DB_ID);
      allItems.push(...wwGuides);
      console.log(`[Notion Sync] Fetched and parsed ${wwGuides.length} WW character guides.`);
    }

    fs.writeFileSync(jsonPath, JSON.stringify(allItems, null, 2), 'utf8');
    console.log(`[Notion Sync] Successfully fetched total ${allItems.length} items and updated notion-data.json!`);
  } catch (error) {
    console.error('[Notion Sync] Error connecting to Notion API:', error.message);
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([], null, 2), 'utf8');
    }
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const WW_GUIDE_CHAR_MAP = {
  '기염': 'jiyan',
  '앙코': 'encore',
  '모르테피': 'mortefi',
  '치샤': 'chixia',
  '히유키': 'hiyuki',
  '카를로타': 'carlotta',
  '유호': 'youhu',
  '절지': 'zhezhi',
  '능양': 'lingyang',
  '산화': 'sanhua',
  '설지': 'baizhi',
  '음림': 'yinlin',
  '금희': 'jinhsi',
  '장리': 'changli',
  '파수인': 'the_shorekeeper',
  '카멜리아': 'camellya',
  '벨리나': 'verina',
  '감심': 'jianxin',
  '젠신': 'jianxin',
  '상리요': 'xiangli_yao',
  '연무': 'yuanwu',
  '카카루': 'calcharo',
  '도기': 'taoqi',
  '단근': 'danjin',
  '알토': 'aalto',
  '로코코': 'rococo',
  '칸타렐라': 'cantarella',
  '플로로바': 'phrolova',
  '루미': 'lumi',
  '페비': 'phoebe',
  '자니': 'zani',
  '샤콘': 'chaconne',
  '오구스타': 'augusta',
  '유노': 'iuno',
  '린네': 'linne',
  '브란트': 'brant',
  '루파': 'lupa',
  '갈브레나': 'galbrena',
  '모르니에': 'mornye',
  '에메스': 'aemeath',
  '데니아': 'denia',
  '레베카': 'rebecca',
  '수수': 'susu',
  '루시': 'lucy',
  '루실라': 'lucilla',
  '루크': 'luuk',
  '양양': 'yangyang',
  '방랑자': 'rover_spectro'
};

function parseSkillPriority(rawText) {
  if (!rawText) return [];
  let cleaned = rawText.replace(/\*\*/g, '').trim();
  if (cleaned.includes(',') || cleaned.includes('>') || cleaned.includes('→')) {
    return cleaned
      .replace(/[>→]|->/g, ',')
      .split(/[,·\n]+/)
      .map(s => s.trim())
      .filter(Boolean);
  }
  const knownSkills = [
    '공명 회로', '공명 해방', '공명 스킬', '기본 공격', '일반 공격',
    '변주 스킬', '반주 스킬', '고유 스킬'
  ];
  const regex = new RegExp(knownSkills.join('|'), 'g');
  const matches = cleaned.match(regex);
  if (matches && matches.length > 0) {
    return matches;
  }
  return cleaned.split(/\s{2,}|\n/).map(s => s.trim()).filter(Boolean);
}

function parseWuwaGuideMarkdown(pageTitle, mdContent) {
  // 1. 캐릭터 식별
  let matchedCharName = '';
  let charId = '';
  for (const [name, id] of Object.entries(WW_GUIDE_CHAR_MAP)) {
    if (pageTitle.includes(name)) {
      matchedCharName = name;
      charId = id;
      break;
    }
  }

  // 2. 패치 버전
  const verMatch = mdContent.match(/패치\s*버전\s*([\d.]+)/i);
  const patchVersion = verMatch ? verMatch[1].trim() : '1.0';

  // 3. 무기 파싱
  const weapons = [];
  const weaponSectionMatch = mdContent.match(/무기\s*\n+([\s\S]*?)(?=(?:에코\s*세트|목표\s*육성치|$))/i);
  if (weaponSectionMatch) {
    const lines = weaponSectionMatch[1].split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      const rankMatch = line.match(/(\d+)\s*순위/);
      if (rankMatch) {
        const rank = parseInt(rankMatch[1], 10);
        const name = line
          .replace(/[\(（]?\s*\d+\s*순위\s*[\)）]?/g, '')
          .replace(/[*#\-–—_]/g, '')
          .trim();
        if (name && !isNaN(rank)) {
          weapons.push({ name, rank });
        }
      }
    }
  }

  // 4. 에코 세트 및 variants 파싱
  const hasVariants = /에코\s*세트\s*1/i.test(mdContent) && /에코\s*세트\s*2/i.test(mdContent);
  const echoSets = [];
  const mainEchoes = [];
  const variants = [];

  if (hasVariants) {
    const variantBlocks = mdContent.split(/(?=에코\s*세트\s*\d+)/i).filter(b => /에코\s*세트\s*\d+/i.test(b));
    for (const vb of variantBlocks) {
      const vHeaderMatch = vb.match(/에코\s*세트\s*(\d+)\s*\n+\s*([^\n]+)/i);
      const variantName = vHeaderMatch ? vHeaderMatch[2].replace(/[*#_]/g, '').trim() : '추천 세팅';
      
      const vEchoSets = [];
      const linesAfterHeader = vb.replace(/^[^\n]*에코\s*세트\s*\d*[^\n]*\n+/i, '');
      const setNameMatch = linesAfterHeader.match(/([^\n]+(?:5세트|세트))/i);
      let sName = setNameMatch ? setNameMatch[1].replace(/[*#_]/g, '').trim() : '';
      if (!sName || sName.toLowerCase() === '세트') {
        sName = variantName;
      }
      const reasonMatch = vb.match(/이유\s*[:：]\s*([^\n]+)/i);
      vEchoSets.push({
        name: sName,
        note: reasonMatch ? reasonMatch[1].replace(/[*#_]/g, '').trim() : undefined
      });

      const vMainEchoes = [];
      const mainEchoRegex = /메인(?:\s*에코)?\s*[:：]\s*([^\n]+?)(?:\n+이유\s*[:：]\s*([^\n]+))?(?=\n|$)/gi;
      let meMatch;
      while ((meMatch = mainEchoRegex.exec(vb)) !== null) {
        const meName = meMatch[1].replace(/[*#_]/g, '').trim();
        const meReason = meMatch[2] ? meMatch[2].replace(/[*#_]/g, '').trim() : undefined;
        if (meName) {
          vMainEchoes.push({ name: meName, reason: meReason });
        }
      }

      variants.push({
        name: variantName,
        echoSets: vEchoSets,
        mainEchoes: vMainEchoes
      });
    }
  } else {
    const setMatch = mdContent.match(/에코\s*세트(?:\s*\d+)?\s*\n+\s*([^\n]+)/i);
    if (setMatch) {
      echoSets.push({ name: setMatch[1].replace(/[*#_]/g, '').trim() });
    }

    const mainEchoRegex = /메인(?:\s*에코)?\s*[:：]\s*([^\n]+?)(?:\n+이유\s*[:：]\s*([^\n]+))?(?=\n|$)/gi;
    let meMatch;
    while ((meMatch = mainEchoRegex.exec(mdContent)) !== null) {
      const meName = meMatch[1].replace(/[*#_]/g, '').trim();
      const meReason = meMatch[2] ? meMatch[2].replace(/[*#_]/g, '').trim() : undefined;
      if (meName) {
        mainEchoes.push({ name: meName, reason: meReason });
      }
    }
  }

  // 5. 목표 육성치 파싱
  const targetStats = [];
  const targetSectionMatch = mdContent.match(/목표\s*육성치\s*\n+([\s\S]*?)(?=(?:[-*]?\s*에코\s*주\s*옵션|스킬|파티|$))/i);
  if (targetSectionMatch) {
    const lines = targetSectionMatch[1].split('\n');
    for (const l of lines) {
      const m = l.match(/[-*]\s*([^\n:：]+)\s*[:：]\s*(.+)/);
      if (m) {
        const label = m[1].replace(/[*#_]/g, '').trim();
        const value = m[2].replace(/[*#_]/g, '').trim();
        if (label && value && !label.includes('목표 육성치')) {
          targetStats.push({ label, value });
        }
      }
    }
  }

  // 6. 에코 주 옵션 파싱 (단일 세팅 및 변형 세팅별 주옵션 완벽 지원)
  const parseCostStats = (blockText) => {
    const statsList = [];
    const lines = blockText.split('\n');
    let currentCostObj = null;

    for (const rawLine of lines) {
      if (!rawLine.trim()) continue;
      const line = rawLine.trim();

      const isDeeplyIndented = /^\s{6,}/.test(rawLine);
      const isNoteText = /부\s*옵션|경우|대체|맞출\s*수\s*없/i.test(line);

      if ((isDeeplyIndented || isNoteText) && currentCostObj) {
        const cleanNote = line
          .replace(/^[-*]\s*/, '')
          .replace(/^([431]\s*cost|[431]\s*코스트)\s*[:：]\s*/i, '')
          .replace(/[*#_]/g, '')
          .trim();
        currentCostObj.note = cleanNote;
        continue;
      }

      const costMatch = line.match(/^[-*]?\s*([431])\s*(?:cost|코스트)\s*[:：]\s*(.+)/i);
      if (costMatch) {
        const costNum = parseInt(costMatch[1], 10);
        const optText = costMatch[2].replace(/[*#_]/g, '').trim();
        const options = optText.split(/\s+or\s+|\s*\/\s*/i).map(s => s.trim()).filter(Boolean);
        currentCostObj = {
          cost: costNum,
          stats: options
        };
        statsList.push(currentCostObj);
      }
    }
    return statsList;
  };

  let mainStats = [];
  const mainStatBlocks = mdContent.match(/[-*]?\s*에코\s*주\s*옵션(?:\s*[\(（][^\)）\n]+[\)）])?\s*\n+([\s\S]*?)(?=(?:[-*]?\s*에코\s*주\s*옵션|[-*]?\s*에코\s*부\s*옵션|스킬|파티|$))/gi);
  if (mainStatBlocks && mainStatBlocks.length > 0) {
    mainStatBlocks.forEach((block, idx) => {
      const parsedBlockStats = parseCostStats(block);
      if (idx === 0) {
        mainStats = parsedBlockStats;
      }

      const hintMatch = block.match(/에코\s*주\s*옵션\s*[\(（]([^\)）\n]+)[\)）]/i);
      if (hintMatch && variants.length > 0) {
        const hint = hintMatch[1].replace(/채용\s*시/g, '').trim();
        const targetVariant = variants.find(v => v.name.includes(hint) || v.echoSets.some(e => e.name.includes(hint)));
        if (targetVariant) {
          targetVariant.mainStats = parsedBlockStats;
        } else if (variants[idx]) {
          variants[idx].mainStats = parsedBlockStats;
        }
      } else if (variants.length > 0 && variants[idx]) {
        variants[idx].mainStats = parsedBlockStats;
      }
    });
  }

  // 7. 에코 부 옵션 파싱
  const subStats = [];
  const subStatSectionMatch = mdContent.match(/에코\s*부\s*옵션\s*\n+([\s\S]*?)(?=(?:스킬|파티|$))/i);
  if (subStatSectionMatch) {
    const lines = subStatSectionMatch[1].split('\n');
    for (const l of lines) {
      const clean = l.replace(/^\s*[-*]\s*/, '').replace(/[*#_]/g, '').trim();
      if (clean && !clean.includes('에코 부 옵션')) {
        subStats.push(clean);
      }
    }
  }

  // 8. 스킬 레벨 업 우선 순위 파싱
  let skillPriority = [];
  const skillSectionMatch = mdContent.match(/스킬\s*(?:레벨\s*업\s*)?우선\s*순위\s*\n+([^\n]+)/i);
  if (skillSectionMatch) {
    skillPriority = parseSkillPriority(skillSectionMatch[1]);
  }

  // 9. 파티 추천 파싱
  let isUniversalSynergy = false;
  let synergyCharacters = [];
  const partySectionMatch = mdContent.match(/파티\s*추천\s*\n+([^\n]+(?:\n+[^\n]+)?)/i);
  if (partySectionMatch) {
    const pText = partySectionMatch[1].replace(/[*#_]/g, '').trim();
    if (pText.includes('유지력') || pText.includes('범용') || pText.includes('필요한 경우') || pText.includes('선택 가능')) {
      isUniversalSynergy = true;
      synergyCharacters = [];
    } else {
      synergyCharacters = pText.split(/[,·\n]+/).map(s => s.trim()).filter(Boolean);
    }
  }

  return {
    id: charId || pageTitle.replace(/\s+/g, '_'),
    name: matchedCharName,
    patchVersion,
    weapons,
    echoSets,
    mainEchoes,
    variants: variants.length > 0 ? variants : undefined,
    targetStats,
    mainStats,
    subStats,
    skillPriority,
    isUniversalSynergy: isUniversalSynergy || undefined,
    synergyCharacters
  };
}

async function fetchWwGuidesFromDB(notion, n2m, dbId) {
  const guides = [];
  try {
    let pages = [];
    try {
      const db = await notion.databases.retrieve({ database_id: dbId });
      if (db.data_sources && db.data_sources.length > 0) {
        const dataSourceId = db.data_sources[0].id;
        const res = await notion.dataSources.query({ data_source_id: dataSourceId });
        pages = res.results || [];
      }
    } catch (dsErr) {
      console.warn(`[Notion Sync] dataSources.query fallback on DB ${dbId}:`, dsErr.message);
    }

    if (pages.length === 0) {
      try {
        const res = await notion.request({ path: `databases/${dbId}/query`, method: 'POST' });
        pages = res.results || [];
      } catch (reqErr) {
        console.warn(`[Notion Sync] databases/query fallback failed on DB ${dbId}:`, reqErr.message);
      }
    }

    console.log(`[Notion Sync] Fetched ${pages.length} guide pages from Notion.`);

    for (const page of pages) {
      await sleep(100); // Rate limit protection (100ms)
      const pageTitle = page.properties['이름']?.title?.[0]?.plain_text || page.properties['캐릭터']?.title?.[0]?.plain_text || '';
      try {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);
        const guide = parseWuwaGuideMarkdown(pageTitle, mdString.parent || '');
        guide.dbSource = 'ww_guides';
        guides.push(guide);
        console.log(`[Notion Sync] Parsed guide for ${guide.name || pageTitle} (${guide.id})`);
      } catch (pErr) {
        console.error(`[Notion Sync] Failed to parse guide page ${page.id}:`, pErr.message);
      }
    }
  } catch (err) {
    console.error(`[Notion Sync] Error in fetchWwGuidesFromDB:`, err.message);
  }
  return guides;
}

fetchNotionData();

