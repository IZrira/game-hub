const fs = require('fs');
const path = require('path');

const tsPath = process.argv[2];
if (!tsPath) {
  process.exit(1);
}

try {
  const tsContent = fs.readFileSync(tsPath, 'utf8');
  
  // Strip imports
  const cleanContent = tsContent.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  
  const startIndex = cleanContent.indexOf('{');
  const endIndex = cleanContent.lastIndexOf('}');
  if (startIndex === -1 || endIndex === -1) {
    throw new Error("객체 괄호를 찾을 수 없습니다.");
  }
  
  const rawObjectStr = cleanContent.substring(startIndex, endIndex + 1);
  
  const charData = eval(`(function() {
    const createWwBaseStats = (...arrays) => {
      const levels = ['lv1', 'lv20', 'lv30', 'lv40', 'lv50', 'lv60', 'lv70', 'lv80', 'lv90'];
      const baseStats = {};
      levels.forEach((lv, i) => {
        if (arrays[i]) {
          baseStats[lv] = {
            '기초 HP': arrays[i][0],
            '기초 공격력': arrays[i][1],
            '기초 방어력': arrays[i][2]
          };
        }
      });
      return baseStats;
    };
    const createMaterial = (name, count, rarity) => ({ name, count, rarity });
    const createWwSkill = (name, tag, description, icon) => ({
      name, tag, description, icon
    });
    return (${rawObjectStr});
  })()`);
  
  console.log(JSON.stringify(charData));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
