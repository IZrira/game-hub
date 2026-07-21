const fs = require('fs');

let index = fs.readFileSync('hsr-hub/data/parties/index.ts', 'utf8');
const lines = index.split('\n');
if (lines[1].includes('role?: string;')) {
  lines.splice(1, 1);
}
fs.writeFileSync('hsr-hub/data/parties/index.ts', lines.join('\n'));

let items = fs.readFileSync('ww-hub/data/items.ts', 'utf8');
// Clean up any previous bad replacements
items = items.replace(/export type WuwaCategory =\s*\|\s*"이벤트 아이템"\s*\|\s*"임무 아이템"\s*\|\s*"이벤트 아이템"\s*\|\s*"임무 아이템"/g, 'export type WuwaCategory =');
items = items.replace(/export type WuwaCategory =\s*\|\s*"이벤트 아이템"\s*\|\s*"임무 아이템"/g, 'export type WuwaCategory =');

// Apply it once
items = items.replace(/export type WuwaCategory =/, 'export type WuwaCategory =\n  | "이벤트 아이템"\n  | "임무 아이템"');
fs.writeFileSync('ww-hub/data/items.ts', items);

console.log('Fixed types');
