const fs = require('fs');
let content = fs.readFileSync('docs/reports/completed_tasks.md', 'utf8');
content += '- GitHub Actions CI/CD 파이프라인 (security-scan) 통과를 위해 `react-router` 패키지의 High 레벨 취약점 패치 진행 (`npm audit fix`).\n';
fs.writeFileSync('docs/reports/completed_tasks.md', content);
