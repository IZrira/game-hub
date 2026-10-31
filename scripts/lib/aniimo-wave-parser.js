import * as cheerio from 'cheerio';

export const WAVE_REGION_ID = '300301';
export const WAVE_REGION_NAME = '웨이브 군도';
const clean = value => value.replace(/\s+/g, ' ').trim();
const ELEMENTS = { holy: '빛', fire: '불', ice: '얼음', dark: '어둠', electric: '전기', grass: '풀', water: '물', ground: '땅', rock: '땅', wind: '바람' };
const POSITIONS = { dps: '딜', heal: '치유', sup: '서포터', break: '격파', energy: '에너지 재생' };
const HOME = { 1000: '불', 1001: '풀', 1002: '물', 1003: '땅', 1004: '전기', 1005: '얼음', 1006: '바람', 1007: '어둠', 1008: '빛', 1100: '운반', 1101: '공예', 1102: '여가', 1103: '조향' };
const classLabels = (html, prefix, labels) => [...new Set([...html.matchAll(new RegExp(`${prefix}([a-z]+)`, 'g'))].map(match => {
  if (!labels[match[1]]) throw new Error(`Unknown official category: ${match[1]}`);
  return labels[match[1]];
}))];
export const aniimoAssetId = url => url?.match(/Wiki_(?:Aniimo|PetHead)_(\d+)\.png/i)?.[1] || null;

export function parseWaveRoster(html) {
  const $ = cheerio.load(html);
  const roster = [];
  $('a[href^="/ko/item/"]').each((_, element) => {
    const card = $(element);
    const sourcePath = card.attr('href');
    if (!/^\/ko\/item\/\d{3}\/[^/]+\/300301$/.test(sourcePath || '') || roster.some(item => item.sourcePath === sourcePath)) return;
    const number = clean(card.find('span').first().text().replace('NO.', ''));
    const name = clean(card.find('div.text-center span').text());
    if (!/^\d{3}$/.test(number) || !name) throw new Error('Incomplete official index card');
    roster.push({ id: `wave-archipelago-${number}`, regionId: WAVE_REGION_ID, regionName: WAVE_REGION_NAME, number, name, sourcePath });
  });
  if (roster.length !== 29 || new Set(roster.map(item => item.number)).size !== 29 || roster.some((item, i) => Number(item.number) !== i + 1)) {
    throw new Error(`Official Wave Archipelago roster changed; review before importing (${roster.length} entries)`);
  }
  return roster;
}

export function parseWaveDetail(html, sourcePath) {
  const $ = cheerio.load(html);
  const section = label => $('.wiki-detail-container').filter((_, e) => clean($(e).find('.wiki-detail-container-header-title').first().text()) === label).first();
  const text = clean($('.aniimo-info-content-layer').parent().text());
  const number = label => {
    const value = text.match(new RegExp(`${label}\\s*[：:]\\s*(\\d+)`));
    return value ? Number(value[1]) : null;
  };
  const parseSkill = element => {
    const circle = $(element);
    const body = circle.children().last();
    const blocks = body.children('div');
    const metadata = clean(body.find('.content-list').text());
    const numeric = label => {
      const match = metadata.match(new RegExp(`${label}\\s*[:：]\\s*(\\d+)`));
      return match ? Number(match[1]) : null;
    };
    return {
      name: clean(blocks.eq(0).text()) || clean(circle.children().first().find('span').text()),
      description: clean(blocks.eq(1).text()),
      imageUrl: circle.find('img').first().attr('src') || null,
      ...(metadata ? { skillType: metadata.match(/유형\s*[:：]\s*(.+?)(?=소모 에너지|위력|$)/)?.[1]?.trim() || '', energyCost: numeric('소모 에너지'), power: numeric('위력') } : {})
    };
  };
  const circles = label => section(label).find('.circle-component').map((_, e) => parseSkill(e)).get().filter(item => item.name);
  const skillGroups = section('스킬 소개').find('.wiki-detail-container-content-tab-content').map((_, e) => [$(e).find('.circle-component').map((__, child) => parseSkill(child)).get().filter(item => item.name)]).get();
  const evolutionSection = section('진화 루트');
  const nodeForChart = chart => {
    const node = $(chart).children('div').first().find('[is-active]').first();
    return { stage: clean(node.find('.stage-tag').text()), imageUrl: node.find('.aniimo-avatar-container img').first().attr('src') || null, name: null, number: null, formKey: null, formLabel: null };
  };
  const pathsForChart = chart => {
    const node = nodeForChart(chart);
    // The official tempest route includes a growth-stage placeholder with no image.
    // Preserve that missing value instead of assigning a guessed species or form.
    if (!node.stage) throw new Error('Incomplete official evolution stage');
    const children = $(chart).children('.children-container').children('.child-branch').children('.flex').children('.evolution-chart').toArray();
    return children.length ? children.flatMap(child => pathsForChart(child).map(route => [node, ...route])) : [[node]];
  };
  const roots = evolutionSection.find('.evolution-chart').filter((_, e) => $(e).parents('.evolution-chart').length === 0).toArray();
  const evolutionRoutes = roots.flatMap(pathsForChart);
  const evolution = evolutionRoutes.flat().filter((node, i, nodes) => nodes.findIndex(other => other.imageUrl === node.imageUrl) === i);
  const forms = $('.morphology-tab').map((_, e) => ({ href: $(e).attr('href'), label: clean($(e).text()) })).get();
  if (!forms.length || forms.some(form => !new RegExp(`^/ko/item/${sourcePath.split('/')[3]}/[^/]+/300301$`).test(form.href || '') || !form.label)) throw new Error('Unexpected official form link');
  const info = $('.aniimo-info-content-layer').first().html() || '';
  const imageUrl = $('img.aniimo-info-cover').attr('src') || null;
  const stats = { total: number('속성'), hp: number('HP'), break: number('무력화'), attack: number('공격'), magicDefense: number('마법 방어'), physicalDefense: number('물리 방어'), energyRecovery: number('에너지 회복') };
  if (!aniimoAssetId(imageUrl) || Object.values(stats).some(value => value === null)) throw new Error(`Incomplete official detail: ${sourcePath}`);
  return {
    forms,
    detail: {
      imageUrl,
      elements: classLabels(info, 'aniimo-info-content-layer-attribute-', ELEMENTS),
      positions: classLabels(info, 'aniimo-info-content-layer-position-', POSITIONS),
      stats,
      description: clean(section('기본 정보').find('.wiki-detail-container-content').text()),
      locations: section('출현 지역').find('.capsule-item').map((_, e) => clean($(e).text())).get().filter(Boolean),
      homeAbilities: section('홈 능력').find('.capsule-item').map((_, e) => {
        const capsule = $(e);
        const type = (capsule.find('[class*="icon-home-"]').attr('class') || '').match(/icon-home-(\d+)/)?.[1];
        if (!type || !HOME[type]) throw new Error('Unknown official home ability');
        return { type, name: HOME[type], description: '', value: Number(clean(capsule.text())) || null };
      }).get(),
      explorationSkills: circles('Pathfinding').concat(circles('탐사 스킬')),
      traits: circles('애니모 특성'), combatSkills: skillGroups[0] || [], uniqueSkills: skillGroups[1] || [],
      evolution, evolutionRoutes,
      resonanceLevels: section('공명 단계 육성').find('tr').map((_, e) => {
        const cells = $(e).find('td');
        return { level: clean(cells.eq(0).text()), requirement: clean(cells.eq(1).text()), material: clean(cells.eq(2).text()), materialImageUrl: cells.eq(2).find('img').attr('src') || null };
      }).get().filter(item => item.level)
    }
  };
}
