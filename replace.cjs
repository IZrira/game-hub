const fs = require('fs');
const path = require('path');

const targets = ['common-hub', 'hsr-hub', 'ww-hub', 'nte-hub'];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (!isDirectory && (f.endsWith('.tsx') || f.endsWith('.ts'))) {
      callback(dirPath);
    }
  });
}

targets.forEach(target => {
  walkDir(target, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('react-router-dom')) {
      let newContent = content.replace(/['"]react-router-dom['"]/g, "'react-router'");
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Updated ' + filePath);
      }
    }
  });
});
