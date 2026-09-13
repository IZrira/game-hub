import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// TLS 인증서 검증 우회 (로컬 개발 및 사설 CA 환경 호환)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
const NOTION_HSR_GUIDES_DB_ID = process.env.NOTION_HSR_GUIDES_DB_ID || '36f95fae3dc780c8abe7dfad2cfebc24'; // HSR Guides DB
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
    const skillName = extractRichText(props['스킬명']) ? extractRichText(props['스킬명']).replace(/\*\*/g, '').trim() : '';
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

  if (process.argv.includes('--ww-guides-only')) {
    console.log('[Notion Sync] Running in --ww-guides-only mode...');
    const existing = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : [];
    const wwGuides = await fetchWwGuidesFromDB(notion, n2m, NOTION_WW_GUIDES_DB_ID);
    const otherItems = existing.filter(i => i.dbSource !== 'ww_guides');
    const combined = [...otherItems, ...wwGuides];
    fs.writeFileSync(jsonPath, JSON.stringify(combined, null, 2), 'utf8');
    console.log(`[Notion Sync] Successfully updated ${wwGuides.length} WW character guides in notion-data.json.`);
    return;
  }

  try {
    let allItems = [];

    // 1. Fetch from Weapons DB
    if (NOTION_DATABASE_ID && NOTION_DATABASE_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching Weapons from ${NOTION_DATABASE_ID}...`);
      const weapons = await fetchFromDB(notion, NOTION_DATABASE_ID, n2m, false);
      const formattedWeapons = weapons.map(item => ({
        ...item,
        dbSource: 'weapons'
      }));
      allItems.push(...formattedWeapons);
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

    // 9. Fetch from HSR Character Guides DB
    if (NOTION_HSR_GUIDES_DB_ID && NOTION_HSR_GUIDES_DB_ID !== 'xxxxxxxxxxxx') {
      console.log(`[Notion Sync] Fetching HSR Character Guides from ${NOTION_HSR_GUIDES_DB_ID}...`);
      const hsrGuides = await fetchHsrGuidesFromDB(notion, n2m, NOTION_HSR_GUIDES_DB_ID);
      allItems.push(...hsrGuides);
      console.log(`[Notion Sync] Fetched and parsed ${hsrGuides.length} HSR character guides.`);
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
  '플로로': 'phrolova',
  '루미': 'lumi',
  '페비': 'phoebe',
  '자니': 'zani',
  '젠니': 'zani',
  '샤콘': 'chaconne',
  '오구스타': 'augusta',
  '아우구스타': 'augusta',
  '유노': 'iuno',
  '린네': 'linne',
  '브란트': 'brant',
  '브렌트': 'brant',
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
  '구원': 'qiuyuan',
  '카르티시아': 'cartethyia',
  '복링': 'buling',
  '치사': 'chisa',
  '시그리카': 'sigrika',
  '경연': 'jingran',
  '청초': 'qingcao',
  '모니에': 'mornye',
  '에이메스': 'aemeath',
  '방랑자 (기류)': 'rover_aero',
  '방랑자(기류)': 'rover_aero',
  '방랑자 · 기류': 'rover_aero',
  '방랑자 기류': 'rover_aero',
  '방랑자 (인멸)': 'rover_havoc',
  '방랑자(인멸)': 'rover_havoc',
  '방랑자 · 인멸': 'rover_havoc',
  '방랑자 인멸': 'rover_havoc',
  '방랑자 (전도)': 'rover_electro',
  '방랑자(전도)': 'rover_electro',
  '방랑자 · 전도': 'rover_electro',
  '방랑자 전도': 'rover_electro',
  '방랑자 (회절)': 'rover_spectro',
  '방랑자(회절)': 'rover_spectro',
  '방랑자 · 회절': 'rover_spectro',
  '방랑자 회절': 'rover_spectro',
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

  // 방랑자 속성별 명시적 정규화
  if (pageTitle.includes('방랑자')) {
    if (pageTitle.includes('기류')) {
      matchedCharName = '방랑자 · 기류';
      charId = 'rover_aero';
    } else if (pageTitle.includes('인멸')) {
      matchedCharName = '방랑자 · 인멸';
      charId = 'rover_havoc';
    } else if (pageTitle.includes('전도')) {
      matchedCharName = '방랑자 · 전도';
      charId = 'rover_electro';
    } else {
      matchedCharName = '방랑자 · 회절';
      charId = 'rover_spectro';
    }
  } else if (!matchedCharName) {
    const cleanTitle = pageTitle.replace(/_?세팅_?공략|_?공략|_?세팅/g, '').trim();
    if (cleanTitle) {
      matchedCharName = cleanTitle;
      charId = cleanTitle;
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
        const rawText = line
          .replace(/[\(（]?\s*\d+\s*순위\s*[\)）]?/g, '')
          .replace(/[*#\-–—_]/g, '')
          .trim();
        let name = rawText;
        let note = undefined;
        if (rawText.includes(':') || rawText.includes('：')) {
          const parts = rawText.split(/[:：]/);
          name = parts[0].trim();
          note = parts.slice(1).join(':').trim() || undefined;
        }
        if (name && !isNaN(rank)) {
          weapons.push({ name, rank, note });
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
      const headerLineMatch = vb.match(/^[^\n]*에코\s*세트\s*(\d+)\s*[:：]?\s*([^\n]*)/i);
      const sameLineTitle = headerLineMatch ? headerLineMatch[2].replace(/[*#_]/g, '').trim() : '';
      
      const vEchoSets = [];
      const linesAfterHeader = vb.replace(/^[^\n]*에코\s*세트\s*\d*[^\n]*\n+/i, '');
      const setNameMatch = linesAfterHeader.match(/([^\n]+(?:5세트|세트))/i);
      let sName = setNameMatch ? setNameMatch[1].replace(/[*#_]/g, '').trim() : '';

      let sNote = undefined;
      if (sName.includes(':') || sName.includes('：')) {
        const parts = sName.split(/[:：]/);
        sName = parts[0].trim();
        sNote = parts.slice(1).join(':').trim() || undefined;
      }
      const reasonMatch = vb.match(/이유\s*[:：]\s*([^\n]+)/i);
      if (reasonMatch) {
        const reasonText = reasonMatch[1].replace(/[*#_]/g, '').trim();
        sNote = sNote ? `${sNote} - ${reasonText}` : reasonText;
      }

      let variantName = sameLineTitle || sName || '추천 세팅';
      if (variantName === '세트' || variantName === '추천 세팅') {
        if (sName && sName !== '세트') variantName = sName;
      }
      if (!sName || sName.toLowerCase() === '세트') {
        sName = variantName;
      }

      vEchoSets.push({
        name: sName,
        note: sNote
      });

      const vMainEchoes = [];
      const mainEchoRegex = /메인(?:\s*에코)?\s*[:：]\s*([^\n]+?)(?:\n+이유\s*[:：]\s*([^\n]+))?(?=\n|$)/gi;
      let meMatch;
      while ((meMatch = mainEchoRegex.exec(vb)) !== null) {
        let meName = meMatch[1].replace(/[*#_]/g, '').trim();
        let meReason = meMatch[2] ? meMatch[2].replace(/[*#_]/g, '').trim() : undefined;
        if (meName.includes(':') || meName.includes('：')) {
          const parts = meName.split(/[:：]/);
          meName = parts[0].trim();
          const extra = parts.slice(1).join(':').trim();
          meReason = meReason ? `${extra} - ${meReason}` : extra;
        }
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
      let sName = setMatch[1].replace(/[*#_]/g, '').trim();
      let sNote = undefined;
      if (sName.includes(':') || sName.includes('：')) {
        const parts = sName.split(/[:：]/);
        sName = parts[0].trim();
        sNote = parts.slice(1).join(':').trim() || undefined;
      }
      const afterSet = mdContent.slice(setMatch.index + setMatch[0].length);
      const nextStop = afterSet.search(/(?:메인(?:\s*에코)?\s*[:：]|[-*]?\s*목표\s*육성치|---|스킬)/i);
      const setBlock = nextStop !== -1 ? afterSet.slice(0, nextStop) : afterSet;
      const reasonMatch = setBlock.match(/이유\s*[:：]\s*([^\n]+)/i);
      if (reasonMatch) {
        const reasonText = reasonMatch[1].replace(/[*#_]/g, '').trim();
        sNote = sNote ? `${sNote} - ${reasonText}` : reasonText;
      }
      echoSets.push({ name: sName, note: sNote });
    }

    const mainEchoRegex = /메인(?:\s*에코)?\s*[:：]\s*([^\n]+?)(?:\n+이유\s*[:：]\s*([^\n]+))?(?=\n|$)/gi;
    let meMatch;
    while ((meMatch = mainEchoRegex.exec(mdContent)) !== null) {
      let meName = meMatch[1].replace(/[*#_]/g, '').trim();
      let meReason = meMatch[2] ? meMatch[2].replace(/[*#_]/g, '').trim() : undefined;
      if (meName.includes(':') || meName.includes('：')) {
        const parts = meName.split(/[:：]/);
        meName = parts[0].trim();
        const extra = parts.slice(1).join(':').trim();
        meReason = meReason ? `${extra} - ${meReason}` : extra;
      }
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
      const m = l.match(/[-*]\s*([^:：\n]+?)\s*[:：]\s*([^:：\n]+?)(?:\s*[:：]\s*(.*))?$/);
      if (m) {
        const label = m[1].replace(/[*#_]/g, '').trim();
        const value = m[2].replace(/[*#_]/g, '').trim();
        const note = m[3] ? m[3].replace(/[*#_]/g, '').trim() : undefined;
        if (label && value && !label.includes('목표 육성치')) {
          targetStats.push({ label, value, note: note || undefined });
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
  const mainStatBlocks = mdContent.match(/[-*]?\s*에코\s*주\s*옵션(?:\s*[\(（][^\)）\n]+[\)）])?\s*\n+([\s\S]*?)(?=(?:[-*]?\s*에코\s*주\s*옵션|[-*]?\s*에코\s*부\s*옵션|\n\s*[-*]?\s*스킬\s*(?:레벨|우선)|\n\s*[-*]?\s*파티|$))/gi);
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
  const subStatSectionMatch = mdContent.match(/에코\s*부\s*옵션\s*\n+([\s\S]*?)(?=(?:\n\s*[-*]?\s*스킬\s*(?:레벨|우선)|\n\s*[-*]?\s*파티|$))/i);
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
      const delimiterRegex = pText.includes(',') ? /[,,\n]+/ : /\s+[·/]\s+|\n+/;
      synergyCharacters = pText.split(delimiterRegex).map(s => s.trim()).filter(Boolean);
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

function cleanMd(text) {
  if (!text) return '';
  return text.replace(/[*_`]/g, '').trim();
}

const HSR_CHAR_MAP = {
  '아글라이아': { charName: '아글라이아', exportName: '아글라이아Guide', fileName: '아글라이아.ts' },
  '아낙사': { charName: '아낙사', exportName: '아낙사Guide', fileName: '아낙사.ts' },
  '아처': { charName: '아처', exportName: '아처Guide', fileName: '아처.ts' },
  '달리아': { charName: '달리아', exportName: '달리아Guide', fileName: '달리아.ts' },
  '다리아': { charName: '달리아', exportName: '달리아Guide', fileName: '달리아.ts' },
  '에버나이트': { charName: '에버나이트', exportName: '에버나이트Guide', fileName: '에버나이트.ts' },
  '키레네': { charName: '키레네', exportName: '키레네Guide', fileName: '키레네.ts' },
  '세이버': { charName: '세이버', exportName: '세이버Guide', fileName: '세이버.ts' },
  '로빈 · 서머레토': { charName: '로빈•서머레토', exportName: '로빈서머레토Guide', fileName: '로빈서머레토.ts' },
  '로빈•서머레토': { charName: '로빈•서머레토', exportName: '로빈서머레토Guide', fileName: '로빈서머레토.ts' },
  '길가메시': { charName: '길가메시', exportName: '길가메시Guide', fileName: '길가메시.ts' },
  '토오사카 린': { charName: '토오사카 린', exportName: '토오사카린Guide', fileName: '토오사카린.ts' },
  '히메코 · 노바': { charName: '히메코•노바', exportName: '히메코노바Guide', fileName: '히메코노바.ts' },
  '히메코·노바': { charName: '히메코•노바', exportName: '히메코노바Guide', fileName: '히메코노바.ts' },
  '천야 · 블레이드': { charName: '천야•블레이드', exportName: '천야블레이드Guide', fileName: '천야블레이드.ts' },
  '천야•블레이드': { charName: '천야•블레이드', exportName: '천야블레이드Guide', fileName: '천야블레이드.ts' },
  '개척자 (환락)': { charName: '개척자 (환락)', exportName: '개척자환락Guide', fileName: '개척자환락.ts' },
  '에바네시아': { charName: '에바네시아', exportName: '에바네시아Guide', fileName: '에바네시아.ts' },
  '은랑 Lv.999': { charName: '은랑 LV.999', exportName: '은랑LV999Guide', fileName: '은랑LV999.ts' },
  '은랑 Lv999': { charName: '은랑 LV.999', exportName: '은랑LV999Guide', fileName: '은랑LV999.ts' },
  '은랑LV999': { charName: '은랑 LV.999', exportName: '은랑LV999Guide', fileName: '은랑LV999.ts' }
};

function parseHsrGuideMarkdown(pageTitle, mdContent) {
  let rawName = pageTitle.replace(/세팅\s*공략|공략/g, '').replace(/[\[\]]/g, '').trim();
  let mapped = HSR_CHAR_MAP[rawName];
  if (!mapped) {
    for (const [k, v] of Object.entries(HSR_CHAR_MAP)) {
      if (rawName.includes(k) || k.includes(rawName)) {
        mapped = v;
        break;
      }
    }
  }

  const charName = mapped ? mapped.charName : rawName;
  const exportName = mapped ? mapped.exportName : rawName.replace(/[^a-zA-Z0-9가-힣]/g, '') + 'Guide';
  const fileName = mapped ? mapped.fileName : rawName.replace(/[^a-zA-Z0-9가-힣]/g, '') + '.ts';

  const patchMatch = mdContent.match(/패치\s*버전\s*([\d.]+)/i);
  const patchVersion = patchMatch ? patchMatch[1].trim() : '3.6';

  let skillPriority = [];
  const knownSkills = [
    '기억 정령 스킬', '기억 정령 특성', '환락 스킬', '전투 스킬', '일반 공격',
    '필살기', '특성', '비술'
  ];
  const skillMatch = mdContent.match(/(?:스킬\s*(?:레벨\s*업\s*)?우선\s*순위|행적\s*우선\s*순위)\s*\n+([^\n#]+)/i);
  if (skillMatch) {
    const rawSkills = skillMatch[1].trim();
    if (rawSkills.includes(',')) {
      skillPriority = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
    } else if (rawSkills.includes('>')) {
      skillPriority = rawSkills.split('>').map(s => s.trim()).filter(Boolean);
    } else {
      let remaining = rawSkills;
      while (remaining.trim()) {
        let found = false;
        for (const ks of knownSkills) {
          if (remaining.trim().startsWith(ks)) {
            skillPriority.push(ks);
            remaining = remaining.trim().slice(ks.length).trim();
            found = true;
            break;
          }
        }
        if (!found) {
          const word = remaining.split(/\s+/)[0];
          if (word) skillPriority.push(word);
          remaining = remaining.slice(word.length).trim();
        }
      }
    }
  } else {
    const lastLineMatch = mdContent.match(/(?:필살기|전투\s*스킬|특성|일반\s*공격|환락\s*스킬).*(?:일반\s*공격|필살기|특성)/);
    if (lastLineMatch) {
      let remaining = lastLineMatch[0].trim();
      while (remaining.trim()) {
        let found = false;
        for (const ks of knownSkills) {
          if (remaining.trim().startsWith(ks)) {
            skillPriority.push(ks);
            remaining = remaining.trim().slice(ks.length).trim();
            found = true;
            break;
          }
        }
        if (!found) {
          const word = remaining.split(/\s+/)[0];
          if (word) skillPriority.push(word);
          remaining = remaining.slice(word.length).trim();
        }
      }
    }
  }
  if (skillPriority.length === 0) {
    skillPriority = ['전투 스킬', '필살기', '특성', '일반 공격'];
  }

  let partyRecommendation = [];
  const partyMatch = mdContent.match(/파티\s*추천\s*\n+([^\n#]+(?:\n+[^\n#]+)?)/i);
  if (partyMatch) {
    partyRecommendation = partyMatch[1].split(/[,，\n]+/).map(p => cleanMd(p).trim()).filter(p => Boolean(p) && p !== '-');
  }

  const parseLightConeItem = (line) => {
    line = cleanMd(line).replace(/^[-*]\s*/, '').trim();
    if (!line || line.endsWith('세팅') || line.startsWith('유물') || line.startsWith('차원') || line === '-') return null;
    const rankMatch = line.match(/^(.+?)\s+(\d)순위(?:\s*:\s*(.*))?$/) ||
                      line.match(/^(.+?)\s*:\s*(\d)순위(?:\s*:\s*(.*))?$/);
    if (rankMatch) {
      const name = rankMatch[1].trim();
      const rank = rankMatch[2];
      const note = rankMatch[3]?.trim();
      return { name, note: note ? `${rank}순위 : ${note}` : `${rank}순위` };
    }
    const colonMatch = line.match(/^([^:]+):\s*(.+)$/);
    if (colonMatch) {
      return { name: colonMatch[1].trim(), note: colonMatch[2].trim() };
    }
    return { name: line.trim() };
  };

  let bestLightCones = [];
  const lcSection = mdContent.match(/광추\s*\n+([\s\S]*?)(?=(?:유물|(?:\n\s*(?:[1-9]\.|\S+)\s*세팅)|\n\s*[-=]{3,}|$))/i);
  if (lcSection) {
    const lines = lcSection[1].split('\n').map(l => cleanMd(l)).filter(Boolean);
    bestLightCones = lines.map(parseLightConeItem).filter(Boolean);
  }

  function parseStatsAndRelicsFromChunk(chunk) {
    const relics = [];
    const ornaments = [];
    const targetStats = [];
    const mainStats = { body: '', boots: '', sphere: '', rope: '' };
    const subStats = [];

    const relicMatch = chunk.match(/유물(?:\s*:\s*([^\n]+))?\s*\n+([\s\S]*?)(?=(?:차원\s*장신구|목표|주\s*옵션|부\s*옵션|$))/i);
    if (relicMatch) {
      const sameLine = relicMatch[1] ? cleanMd(relicMatch[1]).trim() : '';
      const lines = relicMatch[2].split('\n').map(l => cleanMd(l)).filter(l => Boolean(l) && l !== '-');
      if (sameLine) lines.unshift(sameLine);

      let currentRelic = null;
      for (const line of lines) {
        if (line.startsWith('이유')) {
          const reason = line.replace(/^이유\s*:\s*/, '').trim();
          if (currentRelic) {
            currentRelic.note = currentRelic.note ? `${currentRelic.note} (${reason})` : reason;
          }
        } else {
          const m = line.match(/^(.+?)\s+(\d)순위(?:\s*:\s*(.*))?$/) ||
                    line.match(/^(.+?)\s*:\s*(\d)순위(?:\s*:\s*(.*))?$/);
          if (m) {
            currentRelic = { name: m[1].trim(), note: m[3] ? `${m[2]}순위 : ${m[3].trim()}` : `${m[2]}순위` };
          } else if (line.includes(':')) {
            const parts = line.split(':');
            currentRelic = { name: parts[0].trim(), note: parts.slice(1).join(':').trim() };
          } else {
            currentRelic = { name: line.trim() };
          }
          if (currentRelic.name) {
            currentRelic.name = currentRelic.name.replace(/유성을\s*쫒는\s*괴도/g, '유성을 쫓는 괴도');
            if (currentRelic.name.includes(' 4세트')) {
              currentRelic.name = currentRelic.name.replace(/\s*4세트/g, '').trim();
            }
          }
          if (currentRelic.name.includes('속도 2세트') || currentRelic.name.includes('속도2세트')) {
            currentRelic.note = currentRelic.note ? currentRelic.note + ' (추천: 가상공간을 누비는 메신저, 천명에 응해 먼 길을 떠난 점술가 등)' : '가상공간을 누비는 메신저, 점술가 등 속도 6% 세트 조합';
          }
          relics.push(currentRelic);
        }
      }
    }

    const ornMatch = chunk.match(/차원\s*장신구(?:\s*:\s*([^\n]+))?\s*\n+([\s\S]*?)(?=(?:목표|주\s*옵션|부\s*옵션|$))/i);
    if (ornMatch) {
      const sameLine = ornMatch[1] ? cleanMd(ornMatch[1]).trim() : '';
      const lines = ornMatch[2].split('\n').map(l => cleanMd(l)).filter(l => Boolean(l) && l !== '-');
      if (sameLine) lines.unshift(sameLine);

      let currentOrn = null;
      for (const line of lines) {
        if (line.startsWith('이유')) {
          const reason = line.replace(/^이유\s*:\s*/, '').trim();
          if (currentOrn) {
            currentOrn.note = currentOrn.note ? `${currentOrn.note} (${reason})` : reason;
          }
        } else {
          const m = line.match(/^(.+?)\s+(\d)순위(?:\s*:\s*(.*))?$/) ||
                    line.match(/^(.+?)\s*:\s*(\d)순위(?:\s*:\s*(.*))?$/);
          if (m) {
            currentOrn = { name: m[1].trim(), note: m[3] ? `${m[2]}순위 : ${m[3].trim()}` : `${m[2]}순위` };
          } else if (line.includes(':')) {
            const parts = line.split(':');
            currentOrn = { name: parts[0].trim(), note: parts.slice(1).join(':').trim() };
          } else {
            currentOrn = { name: line.trim() };
          }
          if (currentOrn.name.includes('속도 증가 장신구')) {
            currentOrn.note = currentOrn.note ? currentOrn.note + ' (추천: 겁화 연등의 연마궁, 생명의 바커 공 등)' : '겁화 연등의 연마궁, 바커 공 등 속도 증가 장신구';
          }
          ornaments.push(currentOrn);
        }
      }
    }

    const targetMatch = chunk.match(/목표\s*(?:육성치|스탯)\s*\n+([\s\S]*?)(?=(?:유물\s*주\s*옵션|주\s*옵션|부\s*옵션|$))/i);
    if (targetMatch) {
      const lines = targetMatch[1].split('\n').map(l => cleanMd(l)).filter(Boolean);
      for (const l of lines) {
        const m = l.match(/^[-*]\s*([^:]+?)\s*:\s*([^:\n]+?)(?:\s*:\s*(.*))?$/);
        if (m) {
          const label = m[1].trim();
          const value = m[2].trim();
          const note = m[3]?.trim();
          targetStats.push({ label, value, note: note || undefined });
        }
      }
    }

    const mainMatch = chunk.match(/(?:유물\s*)?주\s*옵션\s*\n+([\s\S]*?)(?=(?:유물\s*부\s*옵션|부\s*옵션|$))/i);
    if (mainMatch) {
      const lines = mainMatch[1].split('\n').map(l => cleanMd(l)).filter(Boolean);
      for (const l of lines) {
        const m = l.match(/^[-*]\s*([^:]+?)\s*:\s*(.+)$/);
        if (m) {
          const slot = m[1].trim();
          const val = m[2].trim();
          if (slot.includes('몸통') || slot.includes('상의')) mainStats.body = val;
          else if (slot.includes('다리') || slot.includes('신발') || slot.includes('발')) mainStats.boots = val;
          else if (slot.includes('차원') || slot.includes('구체')) mainStats.sphere = val;
          else if (slot.includes('연결') || slot.includes('매듭') || slot.includes('줄')) mainStats.rope = val;
        }
      }
    }

    const subMatch = chunk.match(/(?:유물\s*)?부\s*옵션\s*\n+([\s\S]*?)(?=(?:스킬|행적|파티|필살기|특성|일반\s*공격|환락|기억|\n\s*[-=]{3,}|$))/i);
    if (subMatch) {
      const lines = subMatch[1].split('\n').map(l => cleanMd(l)).filter(Boolean);
      for (const l of lines) {
        const clean = l.replace(/^[-*]\s*/, '').trim();
        if (clean && !clean.includes('부 옵션')) {
          if (!clean.includes('스킬') && !clean.includes('필살기') && !clean.includes('일반 공격') && !clean.includes('특성')) {
            subStats.push(clean);
          }
        }
      }
    }

    return { relics, ornaments, targetStats, mainStats, subStats };
  }

  const variants = [];
  const variantHeaderRegex = /(?:^|\n)(?:(?:[1-9]\.\s*)?([^\n\-*:]{2,}?세팅(?:\s*:\s*[^\n]+)?))(?=\n)/g;
  const matches = [...mdContent.matchAll(variantHeaderRegex)].filter(m => {
    const txt = m[1].trim();
    return !txt.includes('순위') && !txt.includes('이유') && !txt.startsWith('-') && !txt.startsWith('*') && !txt.includes('조합');
  });

  if (matches.length > 1) {
    for (let i = 0; i < matches.length; i++) {
      const vName = cleanMd(matches[i][1]).replace(/^[1-9]\.\s*/, '').trim();
      const start = matches[i].index + matches[i][0].length;
      const end = i < matches.length - 1 ? matches[i+1].index : mdContent.length;
      const chunk = mdContent.slice(start, end);
      const parsedChunk = parseStatsAndRelicsFromChunk(chunk);
      
      const vLcSection = chunk.match(/광추\s*\n+([\s\S]*?)(?=(?:유물|목표|주\s*옵션|$))/i);
      let vLightCones = undefined;
      if (vLcSection) {
        const lines = vLcSection[1].split('\n').map(l => cleanMd(l)).filter(Boolean);
        vLightCones = lines.map(parseLightConeItem).filter(Boolean);
      }

      variants.push({
        name: vName,
        bestRelics: parsedChunk.relics,
        bestOrnaments: parsedChunk.ornaments,
        bestLightCones: vLightCones && vLightCones.length > 0 ? vLightCones : undefined,
        mainStats: parsedChunk.mainStats,
        subStats: parsedChunk.subStats,
        targetStats: parsedChunk.targetStats
      });
    }
  }

  const globalParsed = parseStatsAndRelicsFromChunk(mdContent);

  return {
    characterName: charName,
    name: charName,
    exportName,
    fileName,
    patchVersion,
    variants: variants.length > 0 ? variants : undefined,
    bestRelics: variants.length > 0 && variants[0].bestRelics.length > 0 ? variants[0].bestRelics : globalParsed.relics,
    bestOrnaments: variants.length > 0 && variants[0].bestOrnaments.length > 0 ? variants[0].bestOrnaments : globalParsed.ornaments,
    bestLightCones: bestLightCones.length > 0 ? bestLightCones : (variants.length > 0 && variants[0].bestLightCones ? variants[0].bestLightCones : []),
    mainStats: variants.length > 0 && variants[0].mainStats.body ? variants[0].mainStats : globalParsed.mainStats,
    subStats: variants.length > 0 && variants[0].subStats.length > 0 ? variants[0].subStats : globalParsed.subStats,
    targetStats: variants.length > 0 && variants[0].targetStats.length > 0 ? variants[0].targetStats : globalParsed.targetStats,
    skillPriority,
    partyRecommendation: partyRecommendation.length > 0 ? partyRecommendation : undefined,
    dbSource: 'hsr_guides'
  };
}

function serializeHsrGuideToTypeScript(guide) {
  const tsObj = {
    characterName: guide.characterName,
    lastUpdated: new Date().toISOString().split('T')[0],
    patchVersion: guide.patchVersion,
  };
  if (guide.variants && guide.variants.length > 0) {
    tsObj.variants = guide.variants.map(v => ({
      name: v.name,
      bestRelics: v.bestRelics.map(r => r.note ? { name: r.name, note: r.note } : r.name),
      bestOrnaments: v.bestOrnaments.map(o => o.note ? { name: o.name, note: o.note } : o.name),
      ...(v.bestLightCones ? { bestLightCones: v.bestLightCones.map(l => l.note ? { name: l.name, note: l.note } : l.name) } : {}),
      mainStats: v.mainStats,
      subStats: v.subStats,
      targetStats: v.targetStats
    }));
  }
  tsObj.bestRelics = guide.bestRelics.map(r => r.note ? { name: r.name, note: r.note } : r.name);
  tsObj.bestOrnaments = guide.bestOrnaments.map(o => o.note ? { name: o.name, note: o.note } : o.name);
  tsObj.mainStats = guide.mainStats;
  tsObj.subStats = guide.subStats;
  tsObj.targetStats = guide.targetStats;
  tsObj.bestLightCones = guide.bestLightCones.map(l => l.note ? { name: l.name, note: l.note } : l.name);
  tsObj.skillPriority = guide.skillPriority;
  if (guide.partyRecommendation && guide.partyRecommendation.length > 0) {
    tsObj.synergyCharacters = guide.partyRecommendation;
  }
  tsObj.eidolonEfficiency = [];

  const jsonStr = JSON.stringify(tsObj, null, 2);
  return `import { CharacterGuide } from './index';\n\nexport const ${guide.exportName}: CharacterGuide = ${jsonStr};\n`;
}

async function fetchHsrGuidesFromDB(notion, n2m, dbId) {
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
      console.warn(`[Notion Sync] dataSources.query fallback on HSR DB ${dbId}:`, dsErr.message);
    }

    if (pages.length === 0) {
      try {
        const res = await notion.request({ path: `databases/${dbId}/query`, method: 'POST' });
        pages = res.results || [];
      } catch (reqErr) {
        console.warn(`[Notion Sync] databases/query fallback failed on HSR DB ${dbId}:`, reqErr.message);
      }
    }

    console.log(`[Notion Sync] Fetched ${pages.length} HSR guide pages from Notion.`);

    const guidesDir = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides');

    for (const page of pages) {
      await sleep(100);
      const pageTitle = page.properties['이름']?.title?.[0]?.plain_text || page.properties['캐릭터']?.title?.[0]?.plain_text || '';
      try {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);
        const guide = parseHsrGuideMarkdown(pageTitle, mdString.parent || '');
        guide.dbSource = 'hsr_guides';
        guides.push(guide);

        if (guide.fileName) {
          const filePath = path.join(guidesDir, guide.fileName);
          const tsCode = serializeHsrGuideToTypeScript(guide);
          fs.writeFileSync(filePath, tsCode, 'utf8');
          console.log(`[Notion Sync] Written ${guide.fileName} for ${guide.characterName}`);
        }
      } catch (pErr) {
        console.error(`[Notion Sync] Failed to parse HSR guide page ${page.id}:`, pErr.message);
      }
    }
  } catch (err) {
    console.error(`[Notion Sync] Error in fetchHsrGuidesFromDB:`, err.message);
  }
  return guides;
}

fetchNotionData();

