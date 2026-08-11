import { HSR_PARTIES } from '../../hsr-hub/data/parties/index';
import { CHARACTER_DATA as HSR_CHARACTERS } from '../../hsr-hub/data/characters';
import { WW_PARTY_COMBINATIONS } from '../../ww-hub/data/parties';
import { WW_CHARACTER_GUIDES } from '../../ww-hub/data/guides';
import { WW_CHARACTERS } from '../../ww-hub/data/characters';
import { NTE_PARTY_COMBINATIONS, getNTEFallbackParty } from '../../nte-hub/data/parties';
import { NTE_CHARACTERS } from '../../nte-hub/data/index';

export interface UnifiedPartyMember {
  id: string;
  name: string;
  role: string;
  folderName: string;
  isMainTarget?: boolean;
  attribute?: string;
  isTrailblazer?: boolean;
  isRover?: boolean;
  substitutes?: {
    id?: string;
    name: string;
    folderName: string;
    role?: string;
    isTrailblazer?: boolean;
    isRover?: boolean;
  }[];
}

export interface UnifiedParty {
  id: string;
  name: string;
  description: string;
  category?: string;
  mainDPS?: string;
  members: UnifiedPartyMember[];
  tags?: string[];
  pros?: string[];
  cons?: string[];
}

export interface ElementGlowMapping {
  primary: string;
  secondary: string;
  glowColor: string;
  badgeBg: string;
  borderGlow: string;
}

/**
 * 게임 ID 및 캐릭터 식별자(이름 또는 ID) 기반 정규화된 추천 파티 조합 조회
 */
export function getRecommendedParties(
  gameId: 'hsr' | 'ww' | 'nte',
  characterNameOrId: string
): UnifiedParty[] {
  if (!characterNameOrId) return [];

  const targetNorm = characterNameOrId.trim().toLowerCase();

  if (gameId === 'hsr') {
    const charData = HSR_CHARACTERS.find(c => c.id.toLowerCase() === targetNorm || c.name.toLowerCase() === targetNorm);
    const searchTerms = [targetNorm];
    if (charData) {
      searchTerms.push(charData.name.toLowerCase());
      searchTerms.push(charData.id.toLowerCase());
      searchTerms.push(`char_${charData.name.toLowerCase()}`);
    }

    const matchedParties = HSR_PARTIES.filter(party => {
      const mainDpsMatch = searchTerms.some(term => party.mainDPS.toLowerCase().includes(term));
      const memberMatch = party.members.some(m => 
        searchTerms.some(term => 
          m.name.toLowerCase().includes(term) || 
          m.id.toLowerCase() === term ||
          m.folderName.toLowerCase() === term ||
          m.substitutes?.some(s => s.name.toLowerCase().includes(term))
        )
      );
      const tagMatch = party.tags?.some(t => searchTerms.some(term => t.toLowerCase().includes(term)));
      return mainDpsMatch || memberMatch || tagMatch;
    });

    if (matchedParties.length === 0) {
      return [];
    }

    return matchedParties.map(party => ({
      id: party.id,
      name: party.name,
      description: party.description,
      category: party.category,
      mainDPS: party.mainDPS,
      tags: party.tags,
      members: party.members.map(m => {
        const isTarget = searchTerms.some(term => m.name.toLowerCase().includes(term) || m.id.toLowerCase() === term);
        return {
          id: m.id,
          name: m.name,
          role: m.role,
          folderName: m.folderName,
          isMainTarget: isTarget,
          isTrailblazer: m.isTrailblazer,
          substitutes: m.substitutes?.map(s => ({
            name: s.name,
            folderName: s.folderName,
            isTrailblazer: s.isTrailblazer,
            role: s.role || m.role
          }))
        };
      })
    }));
  }

  if (gameId === 'ww') {
    const matchedParties = WW_PARTY_COMBINATIONS.filter(party => {
      return party.members.some(m => 
        m.name.toLowerCase().includes(targetNorm) || 
        m.id.toLowerCase() === targetNorm ||
        m.folderName.toLowerCase() === targetNorm
      );
    });

    if (matchedParties.length > 0) {
      return matchedParties.map(party => ({
        id: party.id,
        name: party.name,
        description: party.description,
        pros: party.pros,
        cons: party.cons,
        members: party.members.map(m => ({
          id: m.id,
          name: m.name,
          role: m.role,
          folderName: m.folderName,
          isMainTarget: m.name.toLowerCase().includes(targetNorm) || m.id.toLowerCase() === targetNorm,
          isRover: m.id.startsWith('rover_')
        }))
      }));
    }

    return [];
  }

  if (gameId === 'nte') {
    const matchedParties = NTE_PARTY_COMBINATIONS.filter(party => {
      const mainDpsMatch = party.mainDPS?.toLowerCase().includes(targetNorm);
      const memberMatch = party.members.some(m => 
        m.name.toLowerCase().includes(targetNorm) || 
        m.id.toLowerCase() === targetNorm ||
        m.folderName.toLowerCase() === targetNorm ||
        m.substitutes?.some(s => s.name.toLowerCase().includes(targetNorm))
      );
      const tagMatch = party.tags?.some(t => t.toLowerCase().includes(targetNorm));
      return mainDpsMatch || memberMatch || tagMatch;
    });

    if (matchedParties.length > 0) {
      return matchedParties.map(party => ({
        id: party.id,
        name: party.name,
        description: party.description,
        category: party.category,
        mainDPS: party.mainDPS,
        tags: party.tags,
        pros: party.pros,
        cons: party.cons,
        members: party.members.map(m => ({
          id: m.id,
          name: m.name,
          role: m.role,
          folderName: m.folderName,
          attribute: m.attribute,
          isMainTarget: m.name.toLowerCase().includes(targetNorm) || m.id.toLowerCase() === targetNorm,
          substitutes: m.substitutes
        }))
      }));
    }

    return [];
  }

  return [];
}

/**
 * 속성/엘리먼트별 다이내믹 글로우 스타일 및 그래디언트 색상 매핑
 */
export function getElementGlowMapping(
  gameId: 'hsr' | 'ww' | 'nte',
  attributeOrElement?: string
): ElementGlowMapping {
  const attr = (attributeOrElement || '').trim();

  // HSR 속성 글로우 매핑
  if (gameId === 'hsr') {
    switch (attr) {
      case '화염':
      case 'Fire':
        return {
          primary: '#FF4D4F',
          secondary: '#FF7A45',
          glowColor: 'rgba(255, 77, 79, 0.35)',
          badgeBg: 'rgba(255, 77, 79, 0.15)',
          borderGlow: 'rgba(255, 77, 79, 0.4)'
        };
      case '얼음':
      case 'Ice':
        return {
          primary: '#40A9FF',
          secondary: '#69C0FF',
          glowColor: 'rgba(64, 169, 255, 0.35)',
          badgeBg: 'rgba(64, 169, 255, 0.15)',
          borderGlow: 'rgba(64, 169, 255, 0.4)'
        };
      case '바람':
      case 'Wind':
        return {
          primary: '#52C41A',
          secondary: '#73D13D',
          glowColor: 'rgba(82, 196, 26, 0.35)',
          badgeBg: 'rgba(82, 196, 26, 0.15)',
          borderGlow: 'rgba(82, 196, 26, 0.4)'
        };
      case '번개':
      case 'Lightning':
        return {
          primary: '#FADB14',
          secondary: '#FFEC3D',
          glowColor: 'rgba(250, 219, 20, 0.35)',
          badgeBg: 'rgba(250, 219, 20, 0.15)',
          borderGlow: 'rgba(250, 219, 20, 0.4)'
        };
      case '물리':
      case 'Physical':
        return {
          primary: '#D9D9D9',
          secondary: '#F0F0F0',
          glowColor: 'rgba(217, 217, 217, 0.35)',
          badgeBg: 'rgba(217, 217, 217, 0.15)',
          borderGlow: 'rgba(217, 217, 217, 0.4)'
        };
      case '양자':
      case 'Quantum':
        return {
          primary: '#9254DE',
          secondary: '#B37FEB',
          glowColor: 'rgba(146, 84, 222, 0.35)',
          badgeBg: 'rgba(146, 84, 222, 0.15)',
          borderGlow: 'rgba(146, 84, 222, 0.4)'
        };
      case '허수':
      case 'Imaginary':
        return {
          primary: '#FFC53D',
          secondary: '#FFE58F',
          glowColor: 'rgba(255, 197, 61, 0.35)',
          badgeBg: 'rgba(255, 197, 61, 0.15)',
          borderGlow: 'rgba(255, 197, 61, 0.4)'
        };
      default:
        return {
          primary: '#7E30E1',
          secondary: '#E26EE5',
          glowColor: 'rgba(126, 48, 225, 0.35)',
          badgeBg: 'rgba(126, 48, 225, 0.15)',
          borderGlow: 'rgba(126, 48, 225, 0.4)'
        };
    }
  }

  // WW 속성 글로우 매핑
  if (gameId === 'ww') {
    switch (attr) {
      case '기류':
      case 'Aero':
        return {
          primary: '#10B981',
          secondary: '#34D399',
          glowColor: 'rgba(16, 185, 129, 0.35)',
          badgeBg: 'rgba(16, 185, 129, 0.15)',
          borderGlow: 'rgba(16, 185, 129, 0.4)'
        };
      case '전도':
      case 'Electro':
        return {
          primary: '#A855F7',
          secondary: '#C084FC',
          glowColor: 'rgba(168, 85, 247, 0.35)',
          badgeBg: 'rgba(168, 85, 247, 0.15)',
          borderGlow: 'rgba(168, 85, 247, 0.4)'
        };
      case '회절':
      case 'Spectro':
        return {
          primary: '#F59E0B',
          secondary: '#FBBF24',
          glowColor: 'rgba(245, 158, 11, 0.35)',
          badgeBg: 'rgba(245, 158, 11, 0.15)',
          borderGlow: 'rgba(245, 158, 11, 0.4)'
        };
      case '인멸':
      case 'Havoc':
        return {
          primary: '#EF4444',
          secondary: '#F87171',
          glowColor: 'rgba(239, 68, 68, 0.35)',
          badgeBg: 'rgba(239, 68, 68, 0.15)',
          borderGlow: 'rgba(239, 68, 68, 0.4)'
        };
      case '용융':
      case 'Fusion':
        return {
          primary: '#F97316',
          secondary: '#FB923C',
          glowColor: 'rgba(249, 115, 22, 0.35)',
          badgeBg: 'rgba(249, 115, 22, 0.15)',
          borderGlow: 'rgba(249, 115, 22, 0.4)'
        };
      case '응결':
      case 'Glacio':
        return {
          primary: '#06B6D4',
          secondary: '#22D3EE',
          glowColor: 'rgba(6, 182, 212, 0.35)',
          badgeBg: 'rgba(6, 182, 212, 0.15)',
          borderGlow: 'rgba(6, 182, 212, 0.4)'
        };
      default:
        return {
          primary: '#EAB308',
          secondary: '#FDE047',
          glowColor: 'rgba(234, 179, 8, 0.35)',
          badgeBg: 'rgba(234, 179, 8, 0.15)',
          borderGlow: 'rgba(234, 179, 8, 0.4)'
        };
    }
  }

  // NTE 속성 글로우 매핑
  if (gameId === 'nte') {
    switch (attr) {
      case '령':
      case 'Spirit':
        return {
          primary: '#34d399',
          secondary: '#6ee7b7',
          glowColor: 'rgba(52, 211, 153, 0.35)',
          badgeBg: 'rgba(52, 211, 153, 0.15)',
          borderGlow: 'rgba(52, 211, 153, 0.4)'
        };
      case '상':
      case 'Image':
      case 'Xiang':
        return {
          primary: '#fbbf24',
          secondary: '#fde047',
          glowColor: 'rgba(251, 191, 36, 0.35)',
          badgeBg: 'rgba(251, 191, 36, 0.15)',
          borderGlow: 'rgba(251, 191, 36, 0.4)'
        };
      case '빛':
      case 'Light':
        return {
          primary: '#f1f5f9',
          secondary: '#ffffff',
          glowColor: 'rgba(241, 245, 249, 0.35)',
          badgeBg: 'rgba(241, 245, 249, 0.15)',
          borderGlow: 'rgba(241, 245, 249, 0.4)'
        };
      case '주':
      case 'Curse':
        return {
          primary: '#f43f5e',
          secondary: '#fb7185',
          glowColor: 'rgba(244, 63, 94, 0.35)',
          badgeBg: 'rgba(244, 63, 94, 0.15)',
          borderGlow: 'rgba(244, 63, 94, 0.4)'
        };
      case '암':
      case 'Dark':
        return {
          primary: '#a78bfa',
          secondary: '#c4b5fd',
          glowColor: 'rgba(167, 139, 250, 0.35)',
          badgeBg: 'rgba(167, 139, 250, 0.15)',
          borderGlow: 'rgba(167, 139, 250, 0.4)'
        };
      case '혼':
      case 'Soul':
        return {
          primary: '#38bdf8',
          secondary: '#7dd3fc',
          glowColor: 'rgba(56, 189, 248, 0.35)',
          badgeBg: 'rgba(56, 189, 248, 0.15)',
          borderGlow: 'rgba(56, 189, 248, 0.4)'
        };
      default:
        return {
          primary: '#9ca3af',
          secondary: '#d1d5db',
          glowColor: 'rgba(156, 163, 175, 0.35)',
          badgeBg: 'rgba(156, 163, 175, 0.15)',
          borderGlow: 'rgba(156, 163, 175, 0.4)'
        };
    }
  }

  return {
    primary: '#7E30E1',
    secondary: '#E26EE5',
    glowColor: 'rgba(126, 48, 225, 0.35)',
    badgeBg: 'rgba(126, 48, 225, 0.15)',
    borderGlow: 'rgba(126, 48, 225, 0.4)'
  };
}

/**
 * 파티원에 대한 대체 캐릭터 추천 정보 계산 헬퍼
 */
export function calculateSubstitutes(
  member: UnifiedPartyMember,
  gameId: 'hsr' | 'ww' | 'nte'
): { id?: string; name: string; folderName: string; role?: string; isTrailblazer?: boolean; isRover?: boolean }[] {
  if (member.substitutes && member.substitutes.length > 0) {
    return member.substitutes;
  }

  const roleToMatch = member.role;

  if (gameId === 'hsr') {
    const candidates = HSR_CHARACTERS.filter(c => c.name !== member.name && c.folderName !== member.folderName);
    return candidates.slice(0, 3).map(c => ({
      id: c.id,
      name: c.name,
      folderName: c.folderName || c.name,
      role: roleToMatch,
      isTrailblazer: c.name.includes('개척자')
    }));
  }

  if (gameId === 'ww') {
    const candidates = WW_CHARACTERS.filter(c => c.name !== member.name && c.folderName !== member.folderName);
    return candidates.slice(0, 3).map(c => ({
      id: c.id,
      name: c.name,
      folderName: c.folderName || c.name,
      role: roleToMatch,
      isRover: c.name.includes('방랑자')
    }));
  }

  if (gameId === 'nte') {
    const candidates = NTE_CHARACTERS.filter(c => c.name !== member.name && c.folderName !== member.folderName);
    return candidates.slice(0, 3).map(c => ({
      id: c.id,
      name: c.name,
      folderName: c.folderName || c.name,
      role: roleToMatch
    }));
  }

  return [];
}
