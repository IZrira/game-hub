export const ANIIMO_ELEMENTS = ['불', '물', '풀', '전기', '얼음', '바위', '바람', '빛', '어둠'] as const;

export type AniimoElement = typeof ANIIMO_ELEMENTS[number];
export type ElementEffectiveness = 1.6 | 1 | 0.625;

export const ELEMENT_META: Record<AniimoElement, { icon: string; color: string }> = {
  불: { icon: '🔥', color: '#fb7185' },
  물: { icon: '💧', color: '#60a5fa' },
  풀: { icon: '🌿', color: '#4ade80' },
  전기: { icon: '⚡', color: '#facc15' },
  얼음: { icon: '❄️', color: '#67e8f9' },
  바위: { icon: '🪨', color: '#d6a85f' },
  바람: { icon: '🌪️', color: '#5eead4' },
  빛: { icon: '✨', color: '#fde68a' },
  어둠: { icon: '🌑', color: '#c4b5fd' },
};

const rows: Record<AniimoElement, readonly ElementEffectiveness[]> = {
  불: [0.625, 0.625, 1.6, 1, 1.6, 0.625, 1, 0.625, 1],
  물: [1.6, 0.625, 0.625, 1, 0.625, 1.6, 1, 0.625, 1],
  풀: [0.625, 1.6, 0.625, 1, 1, 1.6, 1, 0.625, 1],
  전기: [1, 1.6, 1, 0.625, 0.625, 0.625, 1.6, 1, 1],
  얼음: [0.625, 1.6, 1, 1.6, 0.625, 0.625, 1, 1, 1],
  바위: [1.6, 0.625, 0.625, 1, 1.6, 0.625, 1, 1, 0.625],
  바람: [1, 1, 1.6, 0.625, 1, 1, 0.625, 1, 1.6],
  빛: [1, 1, 1, 0.625, 1, 1, 1.6, 0.625, 1.6],
  어둠: [1, 0.625, 1.6, 1.6, 1, 1, 0.625, 1.6, 1],
};

export const ELEMENT_CHART = Object.fromEntries(
  ANIIMO_ELEMENTS.map(attacker => [
    attacker,
    Object.fromEntries(ANIIMO_ELEMENTS.map((defender, index) => [defender, rows[attacker][index]])),
  ]),
) as Record<AniimoElement, Record<AniimoElement, ElementEffectiveness>>;

export const effectivenessLabel = (value: ElementEffectiveness) =>
  value === 1.6 ? '효과적' : value === 0.625 ? '저항' : '보통';

export interface AniimoElementMatchup {
  element: AniimoElement;
  strongAgainst: AniimoElement[];
  weakTo: AniimoElement[];
  resists: AniimoElement[];
}

export const isAniimoElement = (value: string): value is AniimoElement =>
  ANIIMO_ELEMENTS.includes(value as AniimoElement);

export const getElementMatchup = (element: AniimoElement): AniimoElementMatchup => ({
  element,
  strongAgainst: ANIIMO_ELEMENTS.filter(defender => ELEMENT_CHART[element][defender] === 1.6),
  weakTo: ANIIMO_ELEMENTS.filter(attacker => ELEMENT_CHART[attacker][element] === 1.6),
  resists: ANIIMO_ELEMENTS.filter(attacker => ELEMENT_CHART[attacker][element] === 0.625),
});

export const getElementMatchups = (elements: string[]) =>
  elements.filter(isAniimoElement).map(getElementMatchup);
