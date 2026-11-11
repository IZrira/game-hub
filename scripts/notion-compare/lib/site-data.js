// Load the site's TypeScript data modules the same way the runtime generators do (esbuild, in memory).
import path from 'node:path';
import { build } from 'esbuild';

/** Bundle `source` (an ES module importing project files) and return its default export. */
export async function loadSiteModule(root, source) {
  const result = await build({
    stdin: { contents: source, resolveDir: root, sourcefile: 'notion-compare-entry.ts', loader: 'ts' },
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
    loader: { '.webp': 'empty', '.png': 'empty', '.jpg': 'empty', '.svg': 'empty', '.css': 'empty' },
    absWorkingDir: path.resolve(root),
  });
  const code = Buffer.from(result.outputFiles[0].text).toString('base64');
  return (await import(`data:text/javascript;base64,${code}`)).default;
}
