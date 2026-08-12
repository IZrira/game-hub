import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DIST_GALLERY = path.join(ROOT_DIR, 'dist', 'gallery');

console.log('====================================================');
console.log('Automated HTML Verification Test Harness');
console.log(`Scanning directory: ${DIST_GALLERY}`);
console.log('====================================================\n');

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

const allHtmlFiles = getAllFiles(DIST_GALLERY);
console.log(`Found ${allHtmlFiles.length} HTML files under dist/gallery/\n`);

let totalChecked = 0;
let charPagesChecked = 0;
let failures = [];

const tokenRegex = /\$1|\$&|\$'|\$`/;

allHtmlFiles.forEach((filePath) => {
  totalChecked++;
  const relPath = path.relative(DIST_GALLERY, filePath).replace(/\\/g, '/');
  const isCharacterPage = relPath.includes('/character/');

  const content = fs.readFileSync(filePath, 'utf8');

  // Check 1: Root div existence & non-emptiness
  const rootMatch = content.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i);
  if (!rootMatch) {
    failures.push({ file: relPath, reason: 'Missing <div id="root"> tag' });
    return;
  }

  const rootInner = rootMatch[1].trim();
  if (rootInner.length === 0) {
    failures.push({ file: relPath, reason: 'Empty <div id="root"> tag' });
    return;
  }

  // Check 2: Character Page Narrative Analysis Summary section
  if (isCharacterPage) {
    charPagesChecked++;
    if (!rootInner.includes('<section class="narrative-analysis-summary"')) {
      failures.push({
        file: relPath,
        reason: 'Character page missing <section class="narrative-analysis-summary"> inside <div id="root">'
      });
    }

    // Additional check: verify narrative analysis summary has content (4 paragraphs)
    if (!rootInner.includes('class="summary-profile"') ||
        !rootInner.includes('class="summary-equipment"') ||
        !rootInner.includes('class="summary-stats"') ||
        !rootInner.includes('class="summary-synergy"')) {
      failures.push({
        file: relPath,
        reason: 'Narrative summary missing one or more required paragraphs (profile, equipment, stats, synergy)'
      });
    }
  }

  // Check 3: Dollar sign regex replacement token leakage ($1, $&, $', $`)
  if (tokenRegex.test(content)) {
    failures.push({
      file: relPath,
      reason: 'Regex replacement token leakage found ($1, $&, $\', or $`)'
    });
  }
});

console.log('----------------------------------------------------');
console.log(`Total HTML files audited: ${totalChecked}`);
console.log(`Character pages audited: ${charPagesChecked}`);
console.log(`Total failures: ${failures.length}`);
console.log('----------------------------------------------------');

if (failures.length > 0) {
  console.log('\n❌ VERIFICATION FAILED. Details:');
  failures.forEach((f, i) => {
    console.log(`  ${i + 1}. [${f.file}] ${f.reason}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ VERIFICATION PASSED! All prerendered HTML files satisfy empirical requirements.');
}
