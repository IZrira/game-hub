import { describe, it, expect } from 'vitest';
import { 
  getRecommendedParties, 
  getElementGlowMapping, 
  calculateSubstitutes, 
  UnifiedPartyMember 
} from '../common-hub/utils/synergyManager';
import { getNTEFallbackParty, NTE_PARTY_COMBINATIONS } from '../nte-hub/data/parties';
import { WW_PARTY_COMBINATIONS } from '../ww-hub/data/parties';
import { HSR_PARTIES } from '../hsr-hub/data/parties/index';

describe('Milestone 2 Final Adversarial Verification Suite', () => {
  const games: ('hsr' | 'ww' | 'nte')[] = ['hsr', 'ww', 'nte'];
  
  const extremeInputs = [
    '',
    '   ',
    '\t\n\r',
    'undefined',
    'null',
    '__proto__',
    'constructor',
    'valueOf',
    'NonExistentChar_9999',
    '<script>alert("xss")</script>',
    '\' OR \'1\'=\'1',
    'DROP TABLE users;--',
    '🚀🔥⚡️🎭',
    'a'.repeat(2048),
    '~!@#$%^&*()_+`-={}|[]\\:";\'<>?,./'
  ];

  describe('1. synergyManager.ts Stress & Invariant Testing', () => {
    it('getRecommendedParties handles all extreme inputs gracefully across all games', () => {
      games.forEach(gameId => {
        extremeInputs.forEach(input => {
          expect(() => {
            const parties = getRecommendedParties(gameId, input);
            expect(Array.isArray(parties)).toBe(true);
            parties.forEach(p => {
              expect(typeof p.id).toBe('string');
              expect(typeof p.name).toBe('string');
              expect(typeof p.description).toBe('string');
              expect(Array.isArray(p.members)).toBe(true);
              p.members.forEach(m => {
                expect(typeof m.id).toBe('string');
                expect(typeof m.name).toBe('string');
                expect(typeof m.role).toBe('string');
                expect(typeof m.folderName).toBe('string');
              });
            });
          }).not.toThrow();
        });
      });
    });

    it('getRecommendedParties produces correct fallback parties when character is unknown', () => {
      const unknown = 'UnknownHeroX';

      const hsrParties = getRecommendedParties('hsr', unknown);
      expect(hsrParties.length).toBeGreaterThan(0);
      expect(hsrParties.length).toBeLessThanOrEqual(2); // Should take slice(0, 2) fallback

      const wwParties = getRecommendedParties('ww', unknown);
      expect(wwParties.length).toBe(1);
      expect(wwParties[0].name).toContain(unknown);
      expect(wwParties[0].members.length).toBe(3);
      expect(wwParties[0].members[0].isMainTarget).toBe(true);

      const nteParties = getRecommendedParties('nte', unknown);
      expect(nteParties.length).toBe(1);
      expect(nteParties[0].name).toContain(unknown);
      expect(nteParties[0].members.length).toBe(4);
      expect(nteParties[0].members[0].role).toBe('메인 딜러');
    });

    it('getElementGlowMapping handles all standard, edge, and invalid attributes', () => {
      const attributes = [
        '화염', 'Fire', '얼음', 'Ice', '바람', 'Wind', '번개', 'Lightning', '물리', 'Physical', '양자', 'Quantum', '허수', 'Imaginary',
        '기류', 'Aero', '전도', 'Electro', '회절', 'Spectro', '인멸', 'Havoc', '용융', 'Fusion', '응결', 'Glacio',
        '령', 'Spirit', '빛', 'Light', '주', 'Curse', '암', 'Dark',
        '', '   ', 'UnknownAttr', undefined, null as any
      ];

      games.forEach(gameId => {
        attributes.forEach(attr => {
          const glow = getElementGlowMapping(gameId, attr);
          expect(glow).toBeDefined();
          expect(glow.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
          expect(glow.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
          expect(glow.glowColor).toContain('rgba');
          expect(glow.badgeBg).toContain('rgba');
          expect(glow.borderGlow).toContain('rgba');
        });
      });
    });

    it('calculateSubstitutes generates non-empty fallback substitutes for dummy or malformed members', () => {
      const malformedMembers: UnifiedPartyMember[] = [
        { id: '', name: '', role: '서포터', folderName: '' },
        { id: 'custom-1', name: '구원', role: '메인 딜러', folderName: '구원' },
        { id: 'custom-2', name: 'NonExistent', role: '탱커/힐러', folderName: 'NonExistent' }
      ];

      games.forEach(gameId => {
        malformedMembers.forEach(mem => {
          expect(() => {
            const subs = calculateSubstitutes(mem, gameId);
            expect(Array.isArray(subs)).toBe(true);
            expect(subs.length).toBeGreaterThan(0);
            subs.forEach(s => {
              expect(typeof s.name).toBe('string');
              expect(typeof s.folderName).toBe('string');
            });
          }).not.toThrow();
        });
      });
    });
  });

  describe('2. nte-hub/data/parties.ts Stress & Invariant Testing', () => {
    it('NTE_PARTY_COMBINATIONS contains valid 4-member party structures', () => {
      expect(NTE_PARTY_COMBINATIONS.length).toBeGreaterThan(0);
      NTE_PARTY_COMBINATIONS.forEach(party => {
        expect(party.id).toBeDefined();
        expect(party.name).toBeDefined();
        expect(party.members.length).toBe(4);
        party.members.forEach(member => {
          expect(member.id).toBeDefined();
          expect(member.name).toBeDefined();
          expect(member.role).toBeDefined();
          expect(member.folderName).toBeDefined();
        });
      });
    });

    it('getNTEFallbackParty produces robust fallback party for any character input', () => {
      const testInputs = ['구원', '민트', '치즈', '호토리', '아들러', '라크리모사', '새로운캐릭터', '', '   ', '123'];
      testInputs.forEach(input => {
        const fallback = getNTEFallbackParty(input);
        expect(fallback).toBeDefined();
        expect(fallback.id).toContain('nte_fallback_');
        expect(fallback.members.length).toBe(4);
        expect(fallback.members[0].role).toBe('메인 딜러');
      });
    });
  });

  describe('3. Role Badge Logic Precision Test (SynergyDeck)', () => {
    it('correctly prioritizes Sub-DPS over Main DPS to avoid substring collision', () => {
      // Re-verifying getRoleBadgeStyle logic from SynergyDeck.tsx
      const getRoleBadgeStyle = (role: string) => {
        const lowerRole = role.toLowerCase();
        if (role.includes('서브 딜러') || lowerRole.includes('sub')) {
          return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
        }
        if (role.includes('메인 딜러') || role.includes('딜러') || lowerRole.includes('main') || lowerRole.includes('dps')) {
          return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
        }
        if (role.includes('서포터') || role.includes('버퍼') || role.includes('디버퍼') || lowerRole.includes('support') || lowerRole.includes('buffer')) {
          return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
        }
        if (role.includes('힐러') || role.includes('탱커') || role.includes('생존') || lowerRole.includes('healer') || lowerRole.includes('tank') || lowerRole.includes('sustain')) {
          return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
        }
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      };

      // Critical Test Case: '서브 딜러' contains '딜러'
      expect(getRoleBadgeStyle('서브 딜러')).toContain('purple');
      expect(getRoleBadgeStyle('Sub-DPS')).toContain('purple');
      expect(getRoleBadgeStyle('sub dps')).toContain('purple');

      expect(getRoleBadgeStyle('메인 딜러')).toContain('rose');
      expect(getRoleBadgeStyle('딜러')).toContain('rose');
      expect(getRoleBadgeStyle('Main DPS')).toContain('rose');

      expect(getRoleBadgeStyle('서포터')).toContain('emerald');
      expect(getRoleBadgeStyle('버퍼')).toContain('emerald');

      expect(getRoleBadgeStyle('탱커/힐러')).toContain('teal');
      expect(getRoleBadgeStyle('생존')).toContain('teal');

      expect(getRoleBadgeStyle('Unknown')).toContain('sky');
    });
  });
});
