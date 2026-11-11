// Load site data through Vite's SSR loader: modules that use Vite-only features
// (import.meta.glob, import.meta.env, JSON imports) run exactly as in the app.
import { createServer } from 'vite';

/**
 * Run `fn(load)` with a throwaway Vite server; `load(path)` is `ssrLoadModule`.
 * `transform(code, id)` may rewrite modules for this server only (e.g. to hide local data).
 */
export async function withViteModules(root, fn, transform) {
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'silent',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: transform ? [{ name: 'notion-compare-transform', enforce: 'post', transform(code, id) { return transform(code, id) ?? null; } }] : [],
  });
  try {
    return await fn(path => server.ssrLoadModule(path));
  } finally {
    await server.close();
  }
}
