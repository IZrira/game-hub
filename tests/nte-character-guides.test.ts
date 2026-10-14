import { describe, expect, it } from 'vitest';
import articles from '../common-hub/data/guideArticles.json';
import characters from '../nte-hub/data/generated/characters.json';
import { parseNteCharacterGuide } from '../nte-hub/data/parseCharacterGuide';
import { getNteGuideArcImageUrl } from '../nte-hub/data/guideAssets';
import { NTE_CARTRIDGES } from '../nte-hub/data/cartridges';

const guides = articles.filter(article => 'notionPageId' in article && article.gameId === 'nte');
describe('NTE character guide presentation data', () => {
  it.each(guides)('preserves ranks, numeric targets and party references for $title', article => {
    const guide = parseNteCharacterGuide(article.content);
    const sourceArcs = [...article.content.matchAll(/^(.+?)\s+(\d+)순위\s*:\s*(.+)$/gm)];
    expect(guide.arcs.map(arc => [arc.name, arc.rank, arc.note])).toEqual(sourceArcs.map(match => [match[1].replace(/\*\*/g, '').trim(), Number(match[2]), match[3]]));
    const sourceTargets = [...article.content.split('- 콘솔 주 옵션')[0].matchAll(/^\s{4,}-\s+(.+?)\s*:\s*(.+)$/gm)];
    expect(guide.statGroups.flatMap(group => group.items.map(item => [item.label, item.value]))).toEqual(sourceTargets.map(match => [match[1].trim(), match[2].trim()]));
    const awakeningText = article.content.split('각성 우선 순위')[1].split('파티 추천')[0];
    expect(guide.awakeningPriority).toEqual((awakeningText.match(/\b[1-6]\b/g) || []).map(Number));
    expect(new Set(guide.awakeningPriority).size).toBe(6);
    expect(guide.consoles.length).toBe((article.content.match(/^콘솔\s*세트\s*\d*\s*$/gm) || []).length);
    expect(guide.consoles.every(set => set.name && set.note)).toBe(true);
    expect(guide.consoles.every(set => NTE_CARTRIDGES.some(cartridge => cartridge.name === set.name))).toBe(true);
    expect(guide.skillPriority.length).toBeGreaterThanOrEqual(4);
    expect(guide.party.every(name => characters.some(character => character.name === name))).toBe(true);
    expect(guide.notes).toEqual([]);
  });

  it('keeps alternate stat targets separate instead of merging them into the default build', () => {
    const evaluator = parseNteCharacterGuide(guides.find(guide => guide.title.startsWith('감정사'))!.content);
    expect(evaluator.statGroups.map(group => group.label)).toEqual(['목표 육성치', '아크 휴일 사용 한 경우']);
    expect(evaluator.statGroups[0].items[0].value).toBe('40% 이상');
    expect(evaluator.statGroups[1].items[0].value).toBe('45% 이상');
    expect(evaluator.consoles.map(set => set.name)).toEqual(['음속 블루 고슴도치', '잃어버린 빛']);
    expect(evaluator.party.filter(name => name === '사키리')).toHaveLength(2);
  });

  it('supports skill priorities written without commas', () => {
    const guide = parseNteCharacterGuide(guides.find(guide => guide.title.startsWith('감정사'))!.content);
    expect(guide.skillPriority).toEqual(['울티메이트', '바이레일 스킬', '서포트 스킬', '일반 공격']);
  });
  it('preserves conditional main-stat explanations as option text', () => {
    const guide = parseNteCharacterGuide(guides.find(guide => guide.title.startsWith('신쿠'))!.content);
    expect(guide.mainStats).toEqual(['치명 확률 or 빛속성 이능력 피해 증강 : 안정성을 원하는 경우 치명 확률', '일로이가 없어서 피해 증가를 원하는 경우 : 빛속성 이능력 피해 증강']);
  });
  it('uses exact repository filenames for quoted arc illustrations', () => {
    expect(getNteGuideArcImageUrl('세상을 뒤흔든 비')).toContain(encodeURIComponent('「세상을 뒤흔든 비」'));
    expect(getNteGuideArcImageUrl('은하의 찰나')).toContain(encodeURIComponent('「은하의 찰나」'));
    expect(getNteGuideArcImageUrl('죄와 벌')).toContain(encodeURIComponent('죄와 벌'));
  });
});
