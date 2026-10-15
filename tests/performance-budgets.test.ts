import { expect, it } from 'vitest';
import { budgets, checkBudgets } from '../scripts/audit-performance.js';

it('rejects regressions for every budget and permits the exact limit', () => {
  for (const [metric, bytes] of Object.entries(budgets)) {
    expect(checkBudgets([{ metric, bytes, file: 'fixture' }])).toEqual([]);
    expect(checkBudgets([{ metric, bytes: bytes + 1, file: 'fixture' }])).toHaveLength(1);
  }
});
