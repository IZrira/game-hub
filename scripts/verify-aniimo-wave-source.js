import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries = JSON.parse(fs.readFileSync(path.join(root, 'aniimo-hub/data/wave-archipelago.json'), 'utf8'));
const clean = value => value.replace(/\s+/g, ' ').trim();
let checked = 0;
for (const entry of entries) for (const form of entry.forms) {
  const url = new URL(form.sourceUrl);
  assert.equal(url.origin, 'https://wiki.aniimo.com');
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30000) });
  assert.equal(response.ok, true, `${entry.name} ${form.label} source response`);
  const $ = cheerio.load(await response.text());
  const section = label => $('.wiki-detail-container').filter((_, element) => clean($(element).find('.wiki-detail-container-header-title').text()) === label).first();
  const header = $('.aniimo-info-content-layer').parent();
  assert.ok(header.text().includes(entry.name), `${entry.name}: official name`);
  assert.equal($('img.aniimo-info-cover').attr('src'), form.imageUrl, `${entry.name}: artwork`);
  assert.equal(clean(section('기본 정보').find('.wiki-detail-container-content').text()), form.description, `${entry.name}: description`);
  const statText = header.text();
  for (const [key, label] of Object.entries({ total: '속성', hp: 'HP', break: '무력화', attack: '공격', magicDefense: '마법 방어', physicalDefense: '물리 방어', energyRecovery: '에너지 회복' })) {
    const expected = statText.match(new RegExp(`${label}\\s*[:：]\\s*(\\d+)`));
    assert.ok(expected, `${entry.name}: ${label} exists`);
    assert.equal(form.stats[key], Number(expected[1]), `${entry.name}: ${label}`);
  }
  assert.deepEqual(section('출현 지역').find('.capsule-item').map((_, element) => clean($(element).text())).get().filter(Boolean), form.locations, `${entry.name}: official locations`);
  const sourceForms = $('.morphology-tab').map((_, element) => ({ key: $(element).attr('href')?.split('/')[4], label: clean($(element).text()) })).get();
  assert.deepEqual(sourceForms, entry.forms.map(({ key, label }) => ({ key, label })), `${entry.name}: form coverage`);
  const skillGroups = section('스킬 소개').find('.wiki-detail-container-content-tab-content').toArray();
  for (const [index, field] of ['combatSkills', 'uniqueSkills'].entries()) {
    const expected = $(skillGroups[index]).find('.circle-component').map((_, element) => {
      const blocks = $(element).children().last().children('div');
      return { name: clean(blocks.eq(0).text()), description: clean(blocks.eq(1).text()) };
    }).get().filter(item => item.name);
    assert.deepEqual(form[field].map(({ name, description }) => ({ name, description })), expected, `${entry.name}: ${field}`);
  }
  checked++;
}
console.log(`[Aniimo Wave] Verified ${entries.length} species / ${checked} forms against fresh official HTML (names, forms, artwork, 7 stats, description, locations, combat/unique skill text).`);
