import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createHash } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { CHARACTER_DATA } from '../hsr-hub/data/characters';
import { ashveil_en } from '../hsr-hub/data/ashveil';
import castorice_en from '../common-hub/castorice';
import { HSR_CHARACTER_GUIDES } from '../hsr-hub/data/guides';
import manifest from '../hsr-hub/data/generated/character-runtime-manifest.json';
import summary from '../hsr-hub/data/generated/detail-character-summary.json';
import synergy from '../hsr-hub/data/generated/synergy-guide-summary.json';
import { useHsrRuntime } from '../hsr-hub/utils/useHsrRuntime';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('preserves all 93 original characters, English replacements and related ordering exactly', () => {
  expect(Object.keys(manifest)).toHaveLength(CHARACTER_DATA.length);
  expect(summary).toEqual(CHARACTER_DATA.map(({ id, name, folderName, path, attribute }) => ({ id, name, folderName, path, attribute })));
  for (const character of CHARACTER_DATA) {
    const url = (manifest as Record<string, string>)[character.id];
    const text = fs.readFileSync(`public${url}`, 'utf8');
    const data = JSON.parse(text);
    expect(data.character, character.id).toEqual(JSON.parse(JSON.stringify({ ...character, gameId: 'hsr' })));
    const english = [ashveil_en, castorice_en].find(item => item.id === character.id);
    expect(data.english, character.id).toEqual(english ? JSON.parse(JSON.stringify({ ...english, originalName: character.name })) : undefined);
    expect(url).toContain(createHash('sha256').update(text).digest('hex').slice(0, 12));
  }
});

it('preserves all guide fallback roles, descriptions, recommendation members and order', () => {
  expect(synergy).toEqual(JSON.parse(JSON.stringify(HSR_CHARACTER_GUIDES.map(({ characterName, synergyCharacters, analysis }) => ({ characterName, synergyCharacters, analysis: { role: analysis?.role } })))));
});

it('removes full character, equipment and guide catalogs from detail and its deferred dependencies', () => {
  const detail = fs.readFileSync('hsr-hub/pages/CharacterDetail.tsx', 'utf8');
  const equipment = fs.readFileSync('hsr-hub/components/HsrEntityGraphSection.tsx', 'utf8');
  const parties = fs.readFileSync('common-hub/utils/synergyManager.ts', 'utf8');
  expect(detail).not.toMatch(/from ['"].*data\/(gameData|index|characters)['"]/);
  expect(equipment).not.toMatch(/from ['"].*data\/(games|guides|index|lightcones|relics|ornaments)['"]/);
  expect(parties).not.toMatch(/import \{ HSR_CHARACTER_GUIDES \} from/);
});

it('keeps full HSR catalogs out of every reachable local import, including lazy sections and dialogs', () => {
  const visited = new Set<string>();
  const visit = (file: string) => {
    if (visited.has(file)) return;
    visited.add(file);
    if (file.endsWith('.json')) return;
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    const resolve = (specifier: string) => {
      if (!specifier.startsWith('.')) return;
      const base = path.resolve(path.dirname(file), specifier);
      const target = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.json`, `${base}/index.ts`, `${base}/index.tsx`]
        .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
      if (target) visit(target);
    };
    const walk = (node: ts.Node) => {
      if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly && ts.isStringLiteral(node.moduleSpecifier)) resolve(node.moduleSpecifier.text);
      if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) resolve(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) resolve(node.arguments[0].text);
      ts.forEachChild(node, walk);
    };
    walk(source);
  };
  visit(path.resolve('hsr-hub/pages/CharacterDetail.tsx'));
  const modules = [...visited].map(file => file.replace(/\\/g, '/'));
  expect(modules.filter(file => /\/hsr-hub\/data\/(?:gameData\.ts|index\.ts|characters\.ts|characters\/hsr\/|guides\/|lightcones\/|relics\.ts|ornaments\.ts)/.test(file))).toEqual([]);
});

const valid = (value: { id: string }) => value.id === 'selected';
it('requests only the selected URL, retries failure and rejects incorrect data', async () => {
  const fetcher = vi.fn().mockResolvedValueOnce(new Response('', { status: 503 }))
    .mockResolvedValueOnce(new Response('{"id":"other"}'))
    .mockResolvedValueOnce(new Response('{"id":"selected"}'));
  vi.stubGlobal('fetch', fetcher);
  const { result } = renderHook(() => useHsrRuntime('/selected.hash.json', valid));
  await waitFor(() => expect(result.current.failed).toBe(true));
  act(() => result.current.retry());
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(result.current.failed).toBe(true));
  expect(result.current.data).toBeUndefined();
  act(() => result.current.retry());
  await waitFor(() => expect(result.current.data).toEqual({ id: 'selected' }));
  expect(fetcher.mock.calls.every(([url]) => url === '/selected.hash.json')).toBe(true);
});

it('hides stale data immediately and ignores late previous responses after navigation', async () => {
  let finish!: (response: Response) => void;
  const fetcher = vi.fn().mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve; }))
    .mockResolvedValueOnce(new Response('{"id":"selected"}'));
  vi.stubGlobal('fetch', fetcher);
  const { result, rerender } = renderHook(({ url }) => useHsrRuntime(url, valid), { initialProps: { url: '/first' } });
  rerender({ url: '/second' });
  expect(result.current.data).toBeUndefined();
  await waitFor(() => expect(result.current.data).toEqual({ id: 'selected' }));
  expect(fetcher.mock.calls[0][1].signal.aborted).toBe(true);
  await act(async () => finish(new Response('{"id":"old"}')));
  expect(result.current.data).toEqual({ id: 'selected' });
});

it('does not request unknown routes', () => {
  const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
  renderHook(() => useHsrRuntime(undefined, valid));
  expect(fetcher).not.toHaveBeenCalled();
});
