import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SynergyDeck from '../common-hub/components/SynergyDeck';

vi.mock('../common-hub/utils/synergyManager', () => ({
  getRecommendedParties: (game: string) => [{
    id: 'party', name: '추천 조합', description: '설명 유지',
    members: Array.from({ length: game === 'ww' ? 3 : 4 }, (_, i) => ({
      id: String(i), name: `캐릭터 ${i}`, folderName: String(i), role: '서포터',
    })),
  }],
  getElementGlowMapping: () => ({ primary: '#fff' }),
  calculateSubstitutes: () => [{ name: '대체 캐릭터', folderName: 'sub' }],
}));
vi.mock('../common-hub/utils/imageHelper', () => ({ getCharacterArtPath: () => '/assets/unknown.webp' }));
vi.mock('../common-hub/components/LazyImage', () => ({ default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} /> }));
vi.mock('html-to-image', () => ({ toPng: vi.fn() }));
afterEach(cleanup);

describe('detail recommendation card sizing', () => {
  it.each(['hsr', 'ww', 'nte'] as const)('%s retains the outer panel and compact member grid', gameId => {
    const { container } = render(<MemoryRouter><SynergyDeck characterName="test" gameId={gameId} /></MemoryRouter>);
    const portraits = screen.getAllByAltText(/포트레이트/);
    expect(portraits).toHaveLength(gameId === 'ww' ? 3 : 4);
    const memberGrid = portraits[0].closest('a')!.parentElement!.parentElement!;
    expect(memberGrid.classList.contains('grid-cols-2')).toBe(true);
    expect(memberGrid.classList.contains('mx-auto')).toBe(true);
    expect(memberGrid.classList.contains(gameId === 'ww' ? 'max-w-2xl' : 'max-w-4xl')).toBe(true);
    expect(memberGrid.classList.contains(gameId === 'ww' ? 'sm:grid-cols-3' : 'sm:grid-cols-4')).toBe(true);
    expect(memberGrid.parentElement?.className).toContain('p-5 md:p-6');
    expect(container.querySelector('section')?.className).toContain('w-full');
    expect(screen.getByText('설명 유지')).toBeTruthy();
    fireEvent.click(screen.getAllByRole('button', { name: '+ 대체 1명' })[0]);
    expect(screen.getByRole('link', { name: /대체 캐릭터/ })).toBeTruthy();
  });
});
