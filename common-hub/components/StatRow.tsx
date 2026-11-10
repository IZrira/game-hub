import React from 'react';

interface StatRowProps {
  label: string;
  value: string | number;
  /** Game accent color for the leading marker. */
  color: string;
}

/**
 * One base-stat line (HP, ATK, DEF...) on character and weapon detail pages.
 * A divided row, not a card, so the surrounding stat panel does not hold
 * cards of the same visual weight (DESIGN.md 4, 5).
 */
const StatRow: React.FC<StatRowProps> = ({ label, value, color }) => (
  <div className="flex items-center justify-between border-b border-white/5 px-1 py-3 last:border-b-0">
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-5 w-1 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm font-bold text-gray-300">{label}</span>
    </div>
    <span className="text-xl font-black tabular-nums text-white">{value}</span>
  </div>
);

export default StatRow;
