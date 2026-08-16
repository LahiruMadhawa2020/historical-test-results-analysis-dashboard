import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  API_OPERATIONS,
  UI_OPERATIONS,
  junitXml,
  playwrightJson,
  JUNIT_UI_TOOLS,
  JUNIT_API_TOOLS
} from '../../scripts/smoke-reports.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const junitDir = path.join(root, 'reports', 'junit');
const playwrightDir = path.join(root, 'reports', 'playwright');

fs.mkdirSync(junitDir, { recursive: true });
fs.mkdirSync(playwrightDir, { recursive: true });

for (const { toolId, className } of JUNIT_UI_TOOLS) {
  const filePath = path.join(junitDir, `${toolId}.xml`);
  fs.writeFileSync(filePath, junitXml(toolId, className, UI_OPERATIONS));
  console.log(`Created ${filePath}`);
}

for (const { toolId, className } of JUNIT_API_TOOLS) {
  const filePath = path.join(junitDir, `${toolId}-api.xml`);
  fs.writeFileSync(filePath, junitXml(toolId, className, API_OPERATIONS));
  console.log(`Created ${filePath}`);
}

for (const suffix of ['ui', 'api']) {
  const toolId = 'playwright-ts-tdd';
  const ops = suffix === 'api' ? API_OPERATIONS : UI_OPERATIONS;
  const filePath = path.join(playwrightDir, `${toolId}-${suffix}.json`);
  fs.writeFileSync(filePath, JSON.stringify(playwrightJson(toolId, ops), null, 2));
  console.log(`Created ${filePath}`);
}

console.log('Smoke reports generated.');
