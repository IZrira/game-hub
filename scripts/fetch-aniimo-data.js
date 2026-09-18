import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
const INDEX_URL = 'https://wiki.aniimo.com/ko';
const SOURCE_BASE = 'https://wiki.aniimo.com';
const ELEMENT_LABELS = {
  holy: '빛', fire: '불', ice: '얼음', dark: '어둠', electric: '전기',
  grass: '풀', water: '물', ground: '땅', rock: '바위', wind: '바람'
};
const POSITION_LABELS = {
  dps: '딜', heal: '치유', sup: '서포터', break: '격파', energy: '에너지 재생'
};

const fetchHtml = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'RiraGameHub/1.0 (+https://riragamehub.com)' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
};

const classValues = (className, prefix) => [...className.matchAll(new RegExp(`${prefix}([a-z]+)`, 'g'))]
  .map(match => match[1]);

const parseNumber = (text, label, nextLabel) => {
  const expression = new RegExp(`${label}\\s*[：:]?\\s*(\\d+)(?=\\s*${nextLabel})`);
  const match = text.match(expression);
  return match ? Number(match[1]) : null;
};

const parseDetail = (html) => {
  const $ = cheerio.load(html);
  const text = $('body').text().replace(/\s+/g, ' ').trim();
  const imageUrl = [...html.matchAll(/https:\/\/worldx-website-cdn\.aniimo\.com\/[^"'\\ ]+Wiki_Aniimo_[^"'\\ ]+\.png/g)]
    .map(match => match[0])[0] || null;

  const getSection = label => $('.wiki-detail-container').filter((_, element) =>
    $(element).find('.wiki-detail-container-header-title').first().text().trim() === label
  ).first();
  const parseCircleItems = (label, includeMetadata = false) => {
    const section = getSection(label);
    return section.find('.circle-component').map((_, element) => {
      const circle = $(element);
      const body = circle.children().last();
      const blocks = body.children('div');
      const metadata = body.find('.content-list').text().replace(/\s+/g, ' ').trim();
      const name = blocks.eq(0).text().replace(/\s+/g, ' ').trim();
      const description = blocks.eq(1).text().replace(/\s+/g, ' ').trim();
      return {
        name,
        description,
        imageUrl: circle.find('img').first().attr('src') || null,
        ...(includeMetadata ? {
          skillType: metadata.match(/유형:\s*([^\d]+?)(?=소모 에너지|위력|$)/)?.[1]?.trim() || '',
          energyCost: Number(metadata.match(/소모 에너지:\s*(\d+)/)?.[1] ?? NaN) || 0,
          power: Number(metadata.match(/위력:\s*(\d+)/)?.[1] ?? NaN) || 0
        } : {})
      };
    }).get().filter(item => item.name);
  };

  const skillSection = getSection('스킬 소개');
  const skillGroups = skillSection.find('.wiki-detail-container-content-tab-content').toArray().map(group =>
    $(group).find('.circle-component').map((__, element) => {
      const circle = $(element);
      const body = circle.children().last();
      const blocks = body.children('div');
      const metadata = body.find('.content-list').text().replace(/\s+/g, ' ').trim();
      return {
        name: blocks.eq(0).text().replace(/\s+/g, ' ').trim(),
        description: blocks.eq(1).text().replace(/\s+/g, ' ').trim(),
        imageUrl: circle.find('img').first().attr('src') || null,
        skillType: metadata.match(/유형:\s*([^\d]+?)(?=소모 에너지|위력|$)/)?.[1]?.trim() || '',
        energyCost: Number(metadata.match(/소모 에너지:\s*(\d+)/)?.[1] ?? NaN) || 0,
        power: Number(metadata.match(/위력:\s*(\d+)/)?.[1] ?? NaN) || 0
      };
    }).get().filter(item => item.name)
  );

  const evolution = getSection('진화 루트').find('.aniimo-avatar-container').map((_, element) => {
    const avatar = $(element);
    const node = avatar.closest('[is-active]');
    return { stage: node.find('.stage-tag').text().replace(/\s+/g, ' ').trim(), imageUrl: avatar.find('img').attr('src') || null };
  }).get().filter((item, index, array) => item.imageUrl && array.findIndex(candidate => candidate.imageUrl === item.imageUrl) === index);

  const resonanceLevels = getSection('공명 단계 육성').find('tr').map((_, row) => {
    const cells = $(row).find('td');
    return {
      level: cells.eq(0).text().trim(), requirement: cells.eq(1).text().trim(),
      material: cells.eq(2).text().replace(/\s+/g, ' ').trim(), materialImageUrl: cells.eq(2).find('img').attr('src') || null
    };
  }).get().filter(item => item.level);

  return {
    imageUrl,
    stats: {
      total: parseNumber(text, '속성', 'HP'),
      hp: parseNumber(text, 'HP', '무력화'),
      break: parseNumber(text, '무력화', '공격'),
      attack: parseNumber(text, '공격', '마법 방어'),
      magicDefense: parseNumber(text, '마법 방어', '물리 방어'),
      physicalDefense: parseNumber(text, '물리 방어', '에너지 회복'),
      energyRecovery: parseNumber(text, '에너지 회복', '일러스트 보기')
    },
    description: getSection('기본 정보').find('.wiki-detail-container-content').text().replace(/\s+/g, ' ').trim(),
    locations: getSection('출현 지역').find('.capsule-item').map((_, element) => $(element).text().trim()).get().filter(Boolean),
    homeAbilities: getSection('홈 능력').find('.capsule-item').map((_, element) => {
      const capsule = $(element); const className = capsule.find('[class*="icon-home-"]').attr('class') || '';
      return { type: className.match(/icon-home-(\d+)/)?.[1] || 'unknown', value: Number(capsule.text().trim()) || null };
    }).get(),
    explorationSkills: parseCircleItems('탐사 스킬'),
    traits: parseCircleItems('애니모 특성'),
    combatSkills: skillGroups[0] || [],
    uniqueSkills: skillGroups[1] || [],
    evolution,
    resonanceLevels
  };
};

const indexHtml = await fetchHtml(INDEX_URL);
const $ = cheerio.load(indexHtml);
const roster = [];

$('a[href^="/ko/item/"]').each((_, element) => {
  const card = $(element);
  const href = card.attr('href');
  if (!href || roster.some(item => item.sourcePath === href)) return;
  const number = card.find('span').first().text().replace('NO.', '').trim();
  const name = card.find('div.text-center span').text().trim();
  const classes = card.html() || '';
  const elements = classValues(classes, 'aniimo-item-attribute-item-attributes-').map(value => ELEMENT_LABELS[value] || value);
  const positions = classValues(classes, 'aniimo-item-position-item-position-').map(value => POSITION_LABELS[value] || value);
  if (number && name) roster.push({ number, name, elements: [...new Set(elements)], positions: [...new Set(positions)], sourcePath: href });
});

const checkedAt = new Date().toISOString().slice(0, 10);
const results = [];
for (let index = 0; index < roster.length; index += 1) {
  const item = roster[index];
  const sourceUrl = `${SOURCE_BASE}${item.sourcePath}`;
  const detailHtml = await fetchHtml(sourceUrl);
  const detail = parseDetail(detailHtml);
  const detailDocument = cheerio.load(detailHtml);
  const formLinks = [];
  detailDocument('.morphology-tab').each((_, element) => {
    const href = detailDocument(element).attr('href');
    const label = detailDocument(element).text().replace(/\s+/g, ' ').trim();
    if (href && label && !formLinks.some(form => form.href === href)) formLinks.push({ href, label });
  });
  const forms = [];
  for (const form of formLinks) {
    const formUrl = `${SOURCE_BASE}${form.href}`;
    const formDetail = form.href === item.sourcePath ? detail : parseDetail(await fetchHtml(formUrl));
    forms.push({
      key: form.href.split('/').filter(Boolean).at(-1), label: form.label,
      imageUrl: formDetail.imageUrl, description: formDetail.description,
      stats: formDetail.stats, sourceUrl: formUrl
    });
  }
  results.push({ ...item, ...detail, forms, sourceUrl, checkedAt });
  process.stdout.write(`\r[Aniimo] ${index + 1}/${roster.length} ${item.name}`);
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
console.log(`\n[Aniimo] Wrote ${results.length} records to ${OUTPUT_FILE}`);
