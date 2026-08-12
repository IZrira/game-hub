import { getGameData } from '../common-hub/data/dataManager';

const data = getGameData('ko');
const chars = data.CHARACTER_DB.filter((c: any) => c.name === '사키리');
console.log('Found characters:', chars.length);
chars.forEach((c: any, i: number) => {
  console.log(`\n--- Char ${i} ---`);
  console.log('gameId:', c.gameId);
  console.log('attribute:', c.attribute);
  console.log('arc:', c.arc);
  console.log('growthStats:', !!c.growthStats);
});
