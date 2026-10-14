import { expect, it } from 'vitest';
import { CHARACTER_DATA } from '../hsr-hub/data/characters';
import summary from '../hsr-hub/data/generated/character-summary.json';

it('preserves every HSR guide identity, image folder, attribute and trailblazer variant', () => {
  expect(summary).toHaveLength(CHARACTER_DATA.length);
  for (const original of CHARACTER_DATA) {
    const actual = summary.find(character => character.id === original.id);
    expect(actual, original.id).toBeDefined();
    expect(actual?.name).toBe(original.name);
    expect(actual?.folderName).toBe(original.folderName || original.name);
    expect(actual?.attribute).toBe(original.attribute);
    expect(actual?.path).toBe(original.path);
    expect(Boolean(actual?.isTrailblazer)).toBe(Boolean(original.isTrailblazer));
  }
});
