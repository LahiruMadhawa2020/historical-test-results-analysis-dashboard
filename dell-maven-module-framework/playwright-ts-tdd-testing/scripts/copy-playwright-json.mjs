import fs from 'fs';
import path from 'path';

const [toolId] = process.argv.slice(2);
const source = path.join(process.cwd(), 'reports', 'playwright', 'results.json');
const target = path.join(process.cwd(), 'reports', 'playwright', `${toolId}.json`);

if (!fs.existsSync(source)) {
  console.error(`Playwright JSON report not found: ${source}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.copyFileSync(source, target);
console.log(`Copied ${source} -> ${target}`);
