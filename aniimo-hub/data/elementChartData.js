// Official element chart rows, kept in plain JS so the prerender script and the
// app (via elementChart.ts) read the same table. Row = attacker, column = defender.
export const ANIIMO_ELEMENT_LIST = ['불', '물', '풀', '전기', '얼음', '바위', '바람', '빛', '어둠'];

export const ANIIMO_ELEMENT_ROWS = {
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

/** @param {string} attacker @param {string} defender */
export function elementMultiplier(attacker, defender) {
  const index = ANIIMO_ELEMENT_LIST.indexOf(defender);
  return index < 0 || !ANIIMO_ELEMENT_ROWS[attacker] ? 1 : ANIIMO_ELEMENT_ROWS[attacker][index];
}
