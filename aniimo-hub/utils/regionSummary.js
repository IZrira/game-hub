// A short, data-derived overview of one habitat: which elements and positions
// appear there and which attacking elements the official chart favours against
// them. Everything is computed from the encyclopedia entries shown on the page,
// so the app and the prerendered HTML say the same thing.
import { ANIIMO_ELEMENT_LIST, elementMultiplier } from '../data/elementChartData.js';

const countBy = (values) => {
  const counts = new Map();
  values.forEach(value => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), 'ko'));
};

const list = (pairs, unit) => `${pairs.map(([name, count]) => `${name} ${count}`).join(', ')}${unit}`;

/**
 * @param {{ entry: { name: string }, forms: { label: string, elements?: string[], positions?: string[] }[] }[]} appearances
 * @param {(form: any) => boolean} [isExclusive] whether a form appears only in this habitat
 */
export function summarizeRegion(appearances, isExclusive = () => false) {
  const forms = appearances.flatMap(({ entry, forms: shown }) => shown.map(form => ({ entry, form })));
  const favoured = ANIIMO_ELEMENT_LIST.map(attacker => [attacker, forms.filter(({ form }) => {
    const multipliers = (form.elements || []).map(defender => elementMultiplier(attacker, defender));
    return multipliers.includes(1.6) && !multipliers.includes(0.625);
  }).length]).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);
  const resisted = ANIIMO_ELEMENT_LIST.map(attacker => [attacker, forms.filter(({ form }) =>
    (form.elements || []).some(defender => elementMultiplier(attacker, defender) === 0.625)).length])
    .filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);

  return {
    speciesCount: appearances.length,
    formCount: forms.length,
    elements: countBy(forms.flatMap(({ form }) => form.elements || [])),
    positions: countBy(forms.flatMap(({ form }) => form.positions || [])),
    favoured: favoured.slice(0, 2),
    resisted: resisted.slice(0, 1),
    exclusiveForms: forms.filter(({ form }) => isExclusive(form)).map(({ entry, form }) => `${entry.name}(${form.label})`),
  };
}

/** Plain sentences for the "지역 한눈에 보기" block. */
export function regionSummaryParagraphs(summary) {
  if (!summary.formCount) return [];
  const paragraphs = [];
  const topElements = summary.elements.slice(0, 3);
  paragraphs.push(`애니모 ${summary.speciesCount}종(${summary.formCount}개 형태)이 서식합니다. 원소는 ${list(topElements, '개 형태')}${summary.elements.length > topElements.length ? ' 순으로 많고, 그 밖의 원소도 섞여 있습니다' : ' 순입니다'}.`);
  if (summary.positions.length) {
    paragraphs.push(`포지션은 ${list(summary.positions.slice(0, 3), '개 형태')} 순으로 많습니다.`);
  }
  if (summary.favoured.length) {
    const resisted = summary.resisted[0];
    paragraphs.push(`원소 상성표 기준으로 이 지역 형태에 가장 넓게 유리한 공격 원소는 ${list(summary.favoured, '개 형태')}입니다.${resisted ? ` 반대로 ${resisted[0]} 원소 공격은 ${resisted[1]}개 형태에 저항받습니다.` : ''} 복합 원소 형태는 한쪽 원소에 효과적이고 다른 원소에 저항받지 않을 때만 유리한 것으로 셉니다.`);
  }
  if (summary.exclusiveForms.length) {
    paragraphs.push(`이 지역에서만 확인되는 형태: ${summary.exclusiveForms.join(', ')}.`);
  }
  return paragraphs;
}
