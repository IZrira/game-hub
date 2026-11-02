import { useEffect, useState } from 'react';

type PartyGameId = 'hsr' | 'ww' | 'nte';

/**
 * Resolves whether a character has any registered party, without pulling party data
 * into the page bundle: it loads the same lazy chunk that SynergyDeck uses.
 * Returns false until parties are confirmed so an empty "추천 파티" section never shows.
 */
export function useHasRecommendedParties(gameId: PartyGameId, characterId: string): boolean {
  const [hasParties, setHasParties] = useState(false);

  useEffect(() => {
    let active = true;
    setHasParties(false);
    if (!characterId) return;
    void import('../utils/synergyManager')
      .then(({ getRecommendedParties }) => {
        if (active) setHasParties(getRecommendedParties(gameId, characterId).length > 0);
      })
      .catch(error => console.error('Failed to load recommended parties:', error));
    return () => {
      active = false;
    };
  }, [gameId, characterId]);

  return hasParties;
}
