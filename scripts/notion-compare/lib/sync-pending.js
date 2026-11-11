// "동기화 대기": Notion now vs the last synced snapshot in common-hub/data/notion-data.json.
// Both sides are parsed by the sync script itself, so a difference here is exactly what the next
// `npm run sync:notion` would change.
import { diffDeep } from './diff.js';

export const PENDING_GROUP = '동기화 대기';
const keyOf = x => String(x?.characterName || x?.name || x?.id || '').trim();

/** Compare `live` items with snapshot items selected by `isSnapshotItem`; report under DB `label`. */
export function reportSyncPending({ live, snapshot, isSnapshotItem, label, add }) {
  const synced = new Map(snapshot.filter(isSnapshotItem).map(x => [keyOf(x), x]));
  const seen = new Set();
  for (const item of live) {
    const k = keyOf(item);
    seen.add(k);
    const old = synced.get(k);
    if (!old) {
      add({ db: label, target: k, cat: '동기화 대기', group: PENDING_GROUP, text: 'Notion에 새로 생긴 항목 (아직 동기화 안 됨)', hint: '동기화하면 반영' });
      continue;
    }
    const { dbSource: _a, ...oldBody } = old;
    const { dbSource: _b, ...liveBody } = item;
    for (const d of diffDeep(oldBody, liveBody, '', [])) {
      add({ db: label, target: k, cat: `동기화 대기 · ${d.path}`, group: PENDING_GROUP, notion: d.b, site: d.a, hint: '동기화하면 반영' });
    }
  }
  for (const k of synced.keys()) {
    if (!seen.has(k)) add({ db: label, target: k, cat: '동기화 대기', group: PENDING_GROUP, text: 'Notion에서 사라진 항목 (사이트에는 아직 남아 있음)', hint: '동기화하면 사라짐' });
  }
}
