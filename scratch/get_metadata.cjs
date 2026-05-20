const fs = require('fs');
const ts = require('typescript');
const path = require('path');

// Register .ts extension transpiler
require.extensions['.ts'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true
    }
  }).outputText;
  module._compile(compiled, filename);
};

const domain = process.argv[2]; // 'ww' or 'hsr'

try {
  let parties = [];
  let tiers = {};

  if (domain === 'ww') {
    const partiesMod = require('../ww-hub/data/parties.ts');
    const tiersMod = require('../ww-hub/data/tiers.ts');
    parties = partiesMod.WW_PARTY_COMBINATIONS || [];
    tiers = tiersMod.WW_TIER_DATA || {};
  } else if (domain === 'hsr') {
    const partiesMod = require('../hsr-hub/data/parties/index.ts');
    const tiersMod = require('../hsr-hub/data/tiers.ts');
    parties = partiesMod.HSR_PARTIES || [];
    tiers = tiersMod.HSR_TIER_DATA || {};
  }

  console.log(JSON.stringify({ parties, tiers }, null, 2));
} catch (e) {
  console.error("Error loading metadata:", e);
  process.exit(1);
}
