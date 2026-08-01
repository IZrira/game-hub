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
const NOTION_NTE_ITEM_DB_ID = process.env.NOTION_NTE_ITEM_DB_ID || '38095fae3dc780a29fffe0381071580d'; // NTE Items DB
const NOTION_NTE_CHARACTER_DB_ID = process.env.NOTION_NTE_CHARACTER_DB_ID; // NTE Characters DB

const destDir = path.join(ROOT_DIR, 'common-hub', 'data');
const jsonPath = path.join(destDir, 'notion-data.json');

const extractRichText = (prop) => {
  if (!prop || !prop.rich_text) return '';
  return prop.rich_text.map(rt => rt.plain_text).join('');
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
    // 무기가 아닌 경우 본문 파싱
    if (!['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(type) || isCharacterDB) {
      try {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);
        contentMarkdown = mdString.parent || '';
      } catch (mdErr) {
        console.error(`[Notion Sync] Failed to fetch markdown content for page ${page.id}:`, mdErr);
      }
    }

    const name = props['캐릭터']?.title?.[0]?.plain_text || props['아이템 명']?.title?.[0]?.plain_text || props['이름']?.title?.[0]?.plain_text || props['이름']?.rich_text?.[0]?.plain_text || '';
    const rarity = props['성급']?.select?.name || props['등급']?.select?.name || props['등급']?.number?.toString() || '';
    
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
    const weaponStory = extractRichText(props['무기 스토리']);

    const weapon = props['무기']?.select?.name || '';
    const affiliation = extractRichText(props['소속']);
    const combatRoles = extractRichText(props['전투 역할']) || extractRichText(props['전투 포지션']);
    const locales = extractRichText(props['언어별 표기']);
    const voiceActors = extractRichText(props['성우']);
    const briefInfo = extractRichText(props['캐릭터 간단 정보']);

    const basicAttack = extractRichText(props['기본 공격']);
    const resonanceSkill = extractRichText(props['공명 스킬']);
    const resonanceCircuit = extractRichText(props['공명 회로']);
    const inherentSkill1 = extractRichText(props['고유 스킬 1']);
    const inherentSkill2 = extractRichText(props['고유 스킬 2']);
    const resonanceLiberation = extractRichText(props['공명 해방']);
    const introSkill = extractRichText(props['변주 스킬']);
    const outroSkill = extractRichText(props['반주 스킬']);
    const harmonyBreak = extractRichText(props['조화도 파괴']);
    const resonanceChains = extractRichText(props['공명 체인']);
    const glossary = extractRichText(props['용어 정리']);

    // NTE 전용 필드들 추가
    const abilityAttribute = props['이능력 속성']?.select?.name || '';
    const arc = props['아크']?.select?.name || '';
    const birthday = extractRichText(props['생일']);
    const citySkill = extractRichText(props['도시 스킬']);
    const virailSkill = extractRichText(props['바이레일 스킬']);
    const ultimateSkill = extractRichText(props['울티메이트']);
    const supportSkill = extractRichText(props['서포트 스킬']);
    const passiveSkill1 = extractRichText(props['패시브 스킬1']);
    const passiveSkill2 = extractRichText(props['패시브 스킬2']);
    const awakenings = extractRichText(props['각성']);
    const resonance = extractRichText(props['공명']);

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

    if (normalizedName) {
      itemsMap.set(normalizedName, {
        id: page.id,
        name,
        autoDescription,
        rarity: rarity ? parseInt(rarity.replace(/[^0-9]/g, '')) || 4 : 4,
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
        citySkill,
        virailSkill,
        ultimateSkill,
        supportSkill,
        passiveSkill1,
        passiveSkill2,
        awakenings,
        resonance,
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

    fs.writeFileSync(jsonPath, JSON.stringify(allItems, null, 2), 'utf8');
    console.log(`[Notion Sync] Successfully fetched total ${allItems.length} items and updated notion-data.json!`);
  } catch (error) {
    console.error('[Notion Sync] Error connecting to Notion API:', error.message);
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([], null, 2), 'utf8');
    }
  }
}

fetchNotionData();
