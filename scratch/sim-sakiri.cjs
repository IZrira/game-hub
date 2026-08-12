const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// To execute dataManager.ts in Node, we can transpile it to JS and replace import.meta.glob,
// but it failed due to i18n.ts having import.meta.glob.
// Instead, let's just parse notion-data.json directly with the exact same logic.

const notionData = require('./common-hub/data/notion-data.json');

const notionCharacters = notionData
  .filter(item => item.type === '캐릭터' && item.dbSource !== 'nte_characters')
  .map(item => {
    let attribute = item.itemAttribute || '회절';
    return {
      id: item.id,
      name: item.name,
      gameId: 'ww',
      attribute: attribute,
      // ... stripped down
    };
  });

const notionNteCharacters = notionData
  .filter(item => item.dbSource === 'nte_characters')
  .map(item => {
    return {
      id: item.id,
      name: item.name,
      gameId: 'nte',
      attribute: item.abilityAttribute || item.itemAttribute || '',
      arc: item.arc || '',
      growthStats: item.growthStats || '',
    };
  });

// fallback
const fallbackDB = [...notionCharacters, ...notionNteCharacters];
const char = fallbackDB.find(c => c.id === '사키리' || c.name === '사키리' || c.originalName === '사키리');

console.log(char);
