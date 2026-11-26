import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { parseCore, parseHelix, parseMind, parseSkillText, parseTerms } from '../gf2-hub/utils/gf2Data';

const dir = 'gf2-hub/data/generated/dolls';
const dolls = readdirSync(dir).map(file => JSON.parse(readFileSync(`${dir}/${file}`, 'utf8')));
const doll = (name: string) => dolls.find(entry => entry.name === name);

describe('GF2 Notion text parsers', () => {
  it('keeps stability damage and descriptions in the main skill when a blank line separates them', () => {
    const [main, ...rest] = parseSkillText(doll('그로자').basicAttack);
    expect(rest).toHaveLength(0);
    expect(main).toMatchObject({ name: '사격 명령', type: '일반 공격', tags: ['단일', '표준탄'], meta: [{ label: '안정 피해', value: '4' }] });
    expect(main.lines[0]).toMatch(/^반경 7칸/);
    const [support] = parseSkillText(doll('그로자').active2);
    expect(support.meta).toEqual([{ label: '턴 쿨타임', value: '2' }]);
    expect(support.lines).toHaveLength(1);
  });

  it('splits summons and their skills into separate parts', () => {
    const parts = parseSkillText(doll('바틸다').passive);
    expect(parts.map(part => `${part.kind}:${part.name}`)).toEqual(['skill:스패너 교정', 'unit:방어 조립체', 'skill:안전 의식', 'skill:집중 정비', 'unit:전투 조립체', 'skill:해체 기교', 'skill:추가 개조']);
    const kreeper = parseSkillText(doll('콜레다').passive);
    expect(kreeper.slice(1).map(part => part.name)).toEqual(['크립터 - 드라이브 가자!', '크립터 - 드리프트야!', '크립터 - 전속력으로!', '크립터 - 변속']);
  });

  it('parses every doll without losing a skill name or description', () => {
    for (const entry of dolls) for (const key of ['basicAttack', 'active1', 'active2', 'ultimate', 'passive']) {
      if (!entry[key]) continue;
      const parts = parseSkillText(entry[key]);
      expect(parts[0].name, `${entry.name} ${key}`).toBeTruthy();
      expect(parts[0].lines.length, `${entry.name} ${key}`).toBeGreaterThan(0);
      for (const part of parts) expect(part.name.length, `${entry.name} ${key} ${part.name}`).toBeLessThanOrEqual(26);
    }
  });

  it('reads mind, helix, core and terms for every doll', () => {
    for (const entry of dolls) {
      expect(parseMind(entry.mind).map(block => block.title), entry.name).toEqual(['중추 Ⅰ', '중추 Ⅱ', '중추 Ⅲ', '중추 Ⅳ', '중추 Ⅴ', '중추 Ⅵ']);
      const helix = parseHelix(entry.helix);
      expect(helix.filter(key => /^고유키 \d/.test(key.kind)).length, entry.name).toBe(6);
      for (const key of helix.filter(entry => entry.kind !== '고유키 활성 시 능력치')) expect(key.name, `${entry.name} ${key.kind}`).toBeTruthy();
      const core = parseCore(entry.core);
      expect(core.stages.map(stage => stage.name), entry.name).toEqual(['배아', '떡잎', '꽃눈', '꽃봉오리', '꽃망울', '꽃']);
      for (const stage of core.stages) expect(stage.text, `${entry.name} ${stage.name}`).toBeTruthy();
      expect(core.stats.length, entry.name).toBe(3);
      if (entry.terms) expect(parseTerms(entry.terms).length, entry.name).toBeGreaterThan(0);
    }
  });

  it('accepts terms written with or without a space before the colon', () => {
    const terms = parseTerms(doll('그로자').terms);
    expect(terms.map(term => term.term)).toContain('이동 감소Ⅱ');
    expect(terms.map(term => term.term)).toContain('엄호');
  });
});
