import notionSearchData from '../../common-hub/data/search/notion-search.json';
import type { WuwaEcho } from '../types';
import { ECHO_DATA } from './echoes';

type NotionEcho = Omit<WuwaEcho, 'cost'> & { cost?: number };

const notionEchoes = (notionSearchData.wwEchoes || []) as NotionEcho[];
const echoMap = new Map<string, WuwaEcho>();

ECHO_DATA.forEach(echo => {
  const key = echo.name.trim();
  if (key) echoMap.set(key, echo);
});

notionEchoes.forEach(echo => {
  const key = echo.name?.trim();
  if (!key) return;

  const existing = echoMap.get(key);
  if (!existing) {
    echoMap.set(key, echo as WuwaEcho);
    return;
  }

  echoMap.set(key, {
    ...existing,
    cost: (echo.cost || existing.cost) as WuwaEcho['cost'],
    sonataSets: echo.sonataSets?.length ? echo.sonataSets : existing.sonataSets,
    cooldown: echo.cooldown || existing.cooldown,
    description: echo.description || existing.description,
    hasPhantom: echo.hasPhantom || existing.hasPhantom,
    enemyInfo: {
      ...existing.enemyInfo,
      originalName: echo.enemyInfo?.originalName || existing.enemyInfo?.originalName || '',
      grade: echo.enemyInfo?.grade || existing.enemyInfo?.grade || '',
      description: echo.enemyInfo?.description || existing.enemyInfo?.description || '',
      specialNote: echo.enemyInfo?.specialNote || existing.enemyInfo?.specialNote || '',
      drops: echo.enemyInfo?.drops?.length ? echo.enemyInfo.drops : existing.enemyInfo?.drops || []
    }
  });
});

export const WW_ECHO_DATA: WuwaEcho[] = Array.from(echoMap.values());
