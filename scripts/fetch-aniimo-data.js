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
  grass: '풀', water: '물', ground: '땅', wind: '바람'
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
    }
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
  const detail = parseDetail(await fetchHtml(sourceUrl));
  results.push({ ...item, ...detail, sourceUrl, checkedAt });
  process.stdout.write(`\r[Aniimo] ${index + 1}/${roster.length} ${item.name}`);
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
console.log(`\n[Aniimo] Wrote ${results.length} records to ${OUTPUT_FILE}`);
