// UI audit for design fixes (docs/plans/design-fix-1-6.md, T0).
// Opens each URL in headless Chrome at desktop (1440x900) and mobile (390x844),
// waits for entrance animations to finish, runs scripts/lib/ui-audit-page.js,
// presses Tab ten times to check visible keyboard focus, and saves a screenshot.
// Read-only: it never writes outside .tmp/ui-audit/.
//
// Usage: npm run ui:audit -- [--label before] <url...>
//   Default URLs are the eight pages of the 2026-11-10 design review.
//   CHROME_PATH overrides the Chrome executable.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://riragamehub.com';
const DEFAULT_PATHS = [
  '/', '/gallery/hsr', '/gallery/hsr/character/acheron', '/gallery/hsr/character/acheron/guide',
  '/gallery/ww/tierlist', '/gallery/nte/guides/잔홍-build-guide', '/gallery/aniimo/location/붓꽃-바다', '/gallery/hsr/parties',
];
const VIEWPORTS = [['desktop', 1440, 900, false], ['mobile', 390, 844, true]];
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9335;
// Pages render data after load; 7 s covered every reviewed page in the 2026-11-10 run.
const SETTLE_MS = 7000;

const args = process.argv.slice(2);
const labelIndex = args.indexOf('--label');
const label = labelIndex >= 0 ? args.splice(labelIndex, 2)[1] : new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
const urls = (args.length ? args : DEFAULT_PATHS.map(p => BASE + encodeURI(p)));
const outDir = path.join(ROOT, '.tmp', 'ui-audit', label);
fs.mkdirSync(path.join(outDir, 'shots'), { recursive: true });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-first-run',
  `--user-data-dir=${path.join(ROOT, '.tmp', 'ui-audit', '.profile')}`, 'about:blank'], { stdio: 'ignore' });

try {
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    try { await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); ready = true; } catch { await sleep(250); }
  }
  if (!ready) throw new Error(`Chrome did not start (${CHROME}). Set CHROME_PATH.`);
  const page = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(resolve => { ws.onopen = resolve; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
  };
  const send = (method, params = {}) => new Promise(resolve => { const i = ++id; pending.set(i, resolve); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async expression => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

  const auditSource = fs.readFileSync(path.join(ROOT, 'scripts', 'lib', 'ui-audit-page.js'), 'utf8');
  const waitForAnimations = `Promise.race([Promise.all(document.getAnimations().map(a => a.finished.catch(() => null))), new Promise(r => setTimeout(r, 5000))]).then(() => true)`;
  const focusProbe = `(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none'; })()`;

  await send('Page.enable');
  await send('Runtime.enable');
  const results = [];
  for (const [viewport, width, height, mobile] of VIEWPORTS) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
    for (const url of urls) {
      await send('Page.navigate', { url });
      await sleep(SETTLE_MS);
      await evaluate(waitForAnimations);
      const data = JSON.parse((await evaluate(auditSource)) || '{}');
      let focusVisible = 0;
      let focusTested = 0;
      for (let i = 0; i < 10; i++) {
        await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        const visible = await evaluate(focusProbe);
        if (visible !== null) { focusTested++; if (visible) focusVisible++; }
      }
      Object.assign(data, { viewport, focusTested, focusVisible });
      results.push(data);
      await evaluate('window.scrollTo(0, 0); document.activeElement?.blur?.(); true');
      const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
      const name = `${viewport}-${decodeURIComponent(new URL(url).pathname).replace(/[\\/ ]+/g, '_').replace(/^_|_$/g, '') || 'home'}.jpg`;
      fs.writeFileSync(path.join(outDir, 'shots', name), Buffer.from(shot.result.data, 'base64'));
      console.log(`${viewport} ${data.url}: 대비 미달 ${data.lowContrast}, 12px 미만 ${data.smallText}, 24px 미만 조작 ${data.targetsUnder24}, 이름 없음 ${data.noAccessibleName}, 제목 건너뜀 ${data.headingSkips}, 가로 넘침 ${data.horizontalOverflow}, 포커스 ${focusVisible}/${focusTested}`);
    }
  }
  fs.writeFileSync(path.join(outDir, 'results.json'), `${JSON.stringify(results, null, 1)}\n`);
  console.log(`결과: ${path.relative(ROOT, outDir)}`);
  ws.close();
} finally {
  chrome.kill();
}
