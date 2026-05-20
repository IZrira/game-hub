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

try {
  const tsPath = path.resolve(process.argv[2]);
  const charModule = require(tsPath);
  const charData = charModule.default || charModule;
  console.log(JSON.stringify(charData, null, 2));
} catch (e) {
  console.error("Error parsing TS file:", e);
  process.exit(1);
}
