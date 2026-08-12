import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');

console.log('===============================================================');
console.log('  Rira Game Hub — PageSpeed Insights E2E Test Suite Runner');
console.log('===============================================================');
console.log(`Root Directory: ${ROOT_DIR}`);
console.log(`Test Directory: ${__dirname}\n`);

const testFiles = [
  'tests/e2e/tier1_feature_coverage.test.ts',
  'tests/e2e/tier2_boundary_corner.test.ts',
  'tests/e2e/tier3_cross_feature.test.ts',
  'tests/e2e/tier4_real_world.test.ts',
];

let allPassed = true;
const results = [];

console.log('--- Executing E2E Test Tiers (Vitest Test Suite) ---\n');

const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const vitestResult = spawnSync(npxCmd, ['vitest', 'run', ...testFiles], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  env: { ...process.env, FORCE_COLOR: '1' }
});

if (vitestResult.status === 0) {
  console.log('\n===============================================================');
  console.log('  ✅ ALL E2E TEST TIERS PASSED SUCCESSFULLY! (Exit Code 0)');
  console.log('===============================================================');
  process.exit(0);
} else {
  console.error('\n===============================================================');
  console.error(`  ❌ E2E TEST FAILURE ENCOUNTERED! (Exit Code ${vitestResult.status})`);
  console.error('===============================================================');
  process.exit(vitestResult.status || 1);
}
