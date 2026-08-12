import { describe, it, expect } from 'vitest';
import { 
  getRecommendedParties, 
  getElementGlowMapping, 
  calculateSubstitutes 
} from '../common-hub/utils/synergyManager';
import { getNTEFallbackParty, NTE_PARTY_COMBINATIONS } from '../nte-hub/data/parties';
import { WW_PARTY_COMBINATIONS } from '../ww-hub/data/parties';

describe('Milestone 2 Stress Testing — synergyManager & parties', () => {
  const edgeCaseInputs = [
    '',
    '   ',
    'undefined',
    'null',
    'NonExistentCharacter_9999',
    '!@#$%^&*()_+~`<>{}:;,./?',
    'SELECT * FROM users;',
    '<script>alert("xss")</script>',
    '🚀🔥🎉',
    'a'.repeat(500) // very long string
  ];

  const gameIds: ('hsr' | 'ww' | 'nte')[] = ['hsr', 'ww', 'nte'];

  describe('getRecommendedParties stress tests', () => {
    it('handles falsy input (empty string) safely for all gameIds', () => {
      gameIds.forEach(gameId => {
        const result = getRecommendedParties(gameId, '');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
      });
    });

    it('handles whitespace-only input without crashing or breaking invariants', () => {
      gameIds.forEach(gameId => {
        const result = getRecommendedParties(gameId, '   ');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      });
    });

    it('handles edge case inputs without throwing unhandled exceptions', () => {
      gameIds.forEach(gameId => {
        edgeCaseInputs.forEach(input => {
          expect(() => {
            const result = getRecommendedParties(gameId, input);
            expect(Array.isArray(result)).toBe(true);
            result.forEach(party => {
              expect(party.id).toBeDefined();
              expect(party.name).toBeDefined();
              expect(Array.isArray(party.members)).toBe(true);
              party.members.forEach(member => {
                expect(member.name).toBeDefined();
                expect(member.role).toBeDefined();
                expect(member.folderName).toBeDefined();
              });
            });
          }).not.toThrow();
        });
      });
    });

    it('returns structured parties for non-existent characters in HSR, WW, NTE', () => {
      const nonExistent = 'UnknownChar123';
      
      const hsrParties = getRecommendedParties('hsr', nonExistent);
      expect(hsrParties.length).toBeGreaterThan(0);

      const wwParties = getRecommendedParties('ww', nonExistent);
      expect(wwParties.length).toBeGreaterThan(0);
      expect(wwParties[0].name).toContain(nonExistent);

      const nteParties = getRecommendedParties('nte', nonExistent);
      expect(nteParties.length).toBeGreaterThan(0);
      expect(nteParties[0].name).toContain(nonExistent);
    });
  });

  describe('getNTEFallbackParty stress tests', () => {
    it('handles undefined/null string representations and unknown character names', () => {
      const inputs = ['', '   ', 'UnknownNTEChar', '!@#$', '구원', '민트'];
      inputs.forEach(input => {
        expect(() => {
          const fallback = getNTEFallbackParty(input);
          expect(fallback).toBeDefined();
          expect(fallback.id).toBeDefined();
          expect(fallback.name).toBeDefined();
          expect(fallback.members.length).toBe(4);
          expect(fallback.members[0].role).toBe('메인 딜러');
        }).not.toThrow();
      });
    });
  });

  describe('calculateSubstitutes stress tests', () => {
    it('handles members with and without predefined substitutes across games', () => {
      gameIds.forEach(gameId => {
        const dummyMember = {
          id: 'test-id',
          name: 'TestMember',
          role: '서포터',
          folderName: 'TestMember'
        };

        expect(() => {
          const subs = calculateSubstitutes(dummyMember, gameId);
          expect(Array.isArray(subs)).toBe(true);
        }).not.toThrow();
      });
    });

    it('handles malformed member objects without crashing', () => {
      const malformedMember = {
        id: '',
        name: '',
        role: '',
        folderName: ''
      };

      gameIds.forEach(gameId => {
        expect(() => {
          const subs = calculateSubstitutes(malformedMember, gameId);
          expect(Array.isArray(subs)).toBe(true);
        }).not.toThrow();
      });
    });
  });

  describe('getElementGlowMapping stress tests', () => {
    it('handles empty, undefined, unknown attributes across all gameIds', () => {
      const attrs = [undefined, '', '  ', 'UnknownAttr', '화염', '기류', '령'];
      gameIds.forEach(gameId => {
        attrs.forEach(attr => {
          const glow = getElementGlowMapping(gameId, attr);
          expect(glow).toBeDefined();
          expect(glow.primary).toMatch(/^#/);
          expect(glow.secondary).toMatch(/^#/);
          expect(glow.glowColor).toBeDefined();
          expect(glow.badgeBg).toBeDefined();
          expect(glow.borderGlow).toBeDefined();
        });
      });
    });
  });
});
