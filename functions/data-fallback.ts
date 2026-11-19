import hsrGuides from '../hsr-hub/data/generated/guide-runtime-manifest.json';
import hsrCharacters from '../hsr-hub/data/generated/character-runtime-manifest.json';
import wwGuides from '../ww-hub/data/generated/guide-runtime-manifest.json';
import articles from '../common-hub/data/generated/article-runtime-manifest.json';

// Data JSON is named "<id>.<content hash>.json", so a new deploy removes the old name.
// A JS chunk from an earlier deploy (kept for a while, or cached by Google's renderer)
// still asks for that old name; answering 404 made the page show its load-error screen,
// which Search Console reported as Soft 404. Serve the current file for the same id.
const HASHED_DATA = /^(\/assets\/data\/(?:[a-z]+\/)+[a-z0-9_-]+)\.[a-f0-9]{12}\.json$/;

function collectPaths(value: unknown, out: string[]): string[] {
  if (typeof value === 'string') out.push(value);
  else if (value && typeof value === 'object') for (const item of Object.values(value)) collectPaths(item, out);
  return out;
}

/** Maps "/assets/data/<dir>/<id>" to the current hashed file for that id. */
export function buildLatestDataIndex(...manifests: unknown[]): Map<string, string> {
  const index = new Map<string, string>();
  for (const file of manifests.flatMap(manifest => collectPaths(manifest, []))) {
    const match = file.match(HASHED_DATA);
    if (match) index.set(match[1], file);
  }
  return index;
}

const LATEST_DATA = buildLatestDataIndex(hsrGuides, hsrCharacters, wwGuides, articles);

/** The current file to serve for a removed hashed data path, or null. */
export function latestDataPathFor(pathname: string, index: Map<string, string> = LATEST_DATA): string | null {
  const match = pathname.match(HASHED_DATA);
  if (!match) return null;
  const latest = index.get(match[1]);
  return latest && latest !== pathname ? latest : null;
}
