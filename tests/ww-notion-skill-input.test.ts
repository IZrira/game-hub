import fs from 'node:fs';
import { expect, it } from 'vitest';
import { parseNotionSkillInput, repairNotionSkillReferences } from '../ww-hub/utils/notionSkillInput';

it.each(['조작 입력', '**조작 입력**', '__조작 입력__', '### 조작 입력', '**조작 입력 소제목**', '**메커니즘 설명**'])('splits standalone %s once without duplicated authoring sections', heading => {
  const parsed = parseNotionSkillInput(`스킬 입력 가이드 b 타입\r\n[공명 회로 게이지.webp]\r\n**개요**\r\n수치 100pt 유지\r\n${heading}\r\n· 첫 공격 [mouse left]\r\n조작 입력 소제목\r\n· 두 공격 [key E]`);
  expect(parsed.overview).toContain('수치 100pt 유지');
  expect(parsed.overview).not.toContain('첫 공격');
  expect(parsed.extractedInputs).toEqual(['· 첫 공격 [mouse left]', '· 두 공격 [key E]']);
});
it('handles a heading at the start and leaves matching words inside prose alone', () => {
  expect(parseNotionSkillInput('**조작 입력**\n· 공격').extractedInputs).toEqual(['· 공격']);
  expect(parseNotionSkillInput('이 설명은 조작 입력 순서를 설명한다').extractedInputs).toEqual([]);
  expect(parseNotionSkillInput('').extractedInputs).toEqual([]);
});
it('repairs missing references from the matching Notion skills without changing valid local data', () => {
  const original = { additionalAbilities: [{ name: 'character.x.a.name', description: 'known', icon: 'bonus_1' }], concertDissipation: { description: 'character.x.harmony' } };
  const result = repairNotionSkillReferences(original, [{ id: 'notion_inherentSkill1', name: '실제 이름', description: '원본 설명' }, { id: 'notion_harmonyBreak', name: '조화도 파괴 · 권갑', description: '원본 파괴 설명' }], { known: '기존 설명' });
  expect(result.additionalAbilities[0]).toEqual({ name: '실제 이름', description: 'known', icon: 'bonus_1' });
  expect(result.concertDissipation).toEqual({ name: '조화도 파괴 · 권갑', description: '원본 파괴 설명' });
  expect(original.additionalAbilities[0].name).toBe('character.x.a.name');
});
it('never substitutes skill two when skill one is absent', () => {
  const original = { additionalAbilities: [{ name: 'character.x.missing', description: 'character.x.missingDescription' }] };
  expect(repairNotionSkillReferences(original, [{ id: 'notion_inherentSkill2', name: '둘째', description: '둘째 설명' }], {}).additionalAbilities).toEqual(original.additionalAbilities);
});
it('preserves all supplied guide text except standalone authoring headings', () => {
  const items = JSON.parse(fs.readFileSync('common-hub/data/notion-data.json', 'utf8'));
  for (const item of items.filter((item: any) => item.type === '캐릭터' && item.skillInputGuide)) {
    const raw = item.skillInputGuide.replace(/\r\n?/g, '\n').replace(/^스킬 입력 가이드[^\n]*\n?/i, '').replace(/\[공명 회로 게이지 이미지(\d*)(?:\.webp)?\]/g, '[공명 회로 게이지$1.webp]');
    const expected = raw.split('\n').filter((line: string) => !/^\s*(?:#{1,6}\s*)?(?:\*\*|__)?(?:메커니즘 설명|조작 입력)(?:\s+소제목)?(?:\*\*|__)?\s*$/.test(line)).join('');
    const parsed = parseNotionSkillInput(item.skillInputGuide);
    expect([parsed.overview, ...parsed.extractedInputs].join('').replace(/\s/g, ''), item.name).toBe(expected.replace(/\s/g, ''));
  }
});
it('keeps every published WW character reference resolvable and authoring headings out of input rows', () => {
  const characters = JSON.parse(fs.readFileSync('ww-hub/data/generated/characters.json', 'utf8'));
  const translations = Object.assign({}, ...['common-hub/ko.json', 'common-hub/locales/ww/ww_characters_ko.json', 'common-hub/locales/ww/ww_ui_ko.json'].map(file => JSON.parse(fs.readFileSync(file, 'utf8'))));
  const missing: string[] = [];
  const walk = (value: unknown) => {
    if (typeof value === 'string' && /^character\.[\w]+\.[\w.]+$/.test(value) && !translations[value]) missing.push(value);
    else if (value && typeof value === 'object') Object.values(value).forEach(walk);
  };
  characters.forEach(walk);
  expect(missing).toEqual([]);
  const galbrena = characters.find((character: { id: string }) => character.id === 'galbrena');
  expect(galbrena.skillInput.inputs).toHaveLength(3);
  expect(galbrena.skillInput.inputs[0]).toContain('강공격');
  expect(galbrena.skillInput.overview).not.toContain('조작 입력');
});
