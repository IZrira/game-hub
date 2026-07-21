const fs = require('fs');
const content = fs.readFileSync('.env.local', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  const match = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
  if (match) {
    console.log(`[${match[1]}] = [${match[2].trim().replace(/^['"]|['"]$/g, '')}]`);
  }
}
