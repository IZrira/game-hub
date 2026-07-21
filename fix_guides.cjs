const fs = require('fs');
let content = fs.readFileSync('ww-hub/data/guides.ts', 'utf8');

// replace note: "X순위" with rank: X
content = content.replace(/note:\s*\"(\d+)순위\"/g, 'rank: $1');
content = content.replace(/note:\s*\'(\d+)순위\'/g, 'rank: $1');

// replace cost: "X" with cost: X
content = content.replace(/cost:\s*\"(\d+)\"/g, 'cost: $1');
content = content.replace(/cost:\s*\'(\d+)\'/g, 'cost: $1');

fs.writeFileSync('ww-hub/data/guides.ts', content);

// Also fix items.ts types
let items = fs.readFileSync('ww-hub/data/items.ts', 'utf8');
items = items.replace(
  /export type WuwaCategory =/,
  'export type WuwaCategory =\n  | "이벤트 아이템"\n  | "임무 아이템"'
);
fs.writeFileSync('ww-hub/data/items.ts', items);
