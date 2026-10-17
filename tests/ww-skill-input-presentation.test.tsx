import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import WuwaSkillInput from '../ww-hub/components/WuwaSkillInput';
import characters from '../ww-hub/data/generated/characters.json';
import ko from '../common-hub/locales/ww/ww_characters_ko.json';
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => (ko as Record<string, string>)[value] || value }) }));
afterEach(cleanup);
it('renders Galbrena once without raw translation keys or duplicated controls', () => {
  const { container } = render(<WuwaSkillInput char={characters.find(character => character.id === 'galbrena')} />);
  expect(container.textContent).not.toContain('character.galbrena');
  expect(screen.getAllByRole('heading', { name: '조작 입력' })).toHaveLength(1);
  expect(container.textContent?.match(/강공격 · 살육 점화/g)).toHaveLength(1);
  expect(container.textContent?.match(/공중 공격 · 탄알 폭우/g)).toHaveLength(1);
});
