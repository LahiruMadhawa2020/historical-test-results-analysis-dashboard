import fs from 'fs';
import path from 'path';

const [toolId] = process.argv.slice(2);
const junitDir = path.join(process.cwd(), 'reports', 'junit');
const target = path.join(junitDir, `${toolId}.xml`);

if (!fs.existsSync(junitDir)) {
  console.error(`JUnit directory not found: ${junitDir}`);
  process.exit(1);
}

const source = fs.readdirSync(junitDir).find((name) => name.startsWith('cypress-') && name.endsWith('.xml'));
if (!source) {
  console.error('No Cypress JUnit report found');
  process.exit(1);
}

fs.copyFileSync(path.join(junitDir, source), target);
console.log(`Copied ${source} -> ${target}`);
