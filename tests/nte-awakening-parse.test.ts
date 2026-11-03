import fs from 'node:fs';
import { expect, it } from 'vitest';
import { normalizeNteCharacter } from '../scripts/lib/normalize-nte-character.js';

const parse = (awakenings: string) => normalizeNteCharacter({ name: '테스트', awakenings }).eidolons;

it('keeps a blank line between a numbered awakening title and its description inside one awakening', () => {
  const eidolons = parse('1. 첫 각성\n\n첫 설명.\n==「사냥」==: 보충 설명\n\n2. 둘째 각성\n\n둘째 설명.');
  expect(eidolons.map(item => [item.rank, item.name])).toEqual([[1, '1. 첫 각성'], [2, '2. 둘째 각성']]);
  expect(eidolons[0].description).toBe('첫 설명.\n==「사냥」==: 보충 설명');
});

it('still splits unnumbered awakenings on blank lines', () => {
  expect(parse('시선 관통\n설명 A\n\n천직 발견\n설명 B').map(item => item.name)).toEqual(['시선 관통', '천직 발견']);
});

it('gives every NTE character exactly six awakenings', () => {
  const characters = JSON.parse(fs.readFileSync('nte-hub/data/generated/characters.json', 'utf8'));
  for (const character of characters) expect(character.eidolons, character.name).toHaveLength(6);
  const janhong = characters.find((character: { name: string }) => character.name === '잔홍');
  expect(janhong.eidolons[4].name).toBe('5. 꽃과 피');
});
