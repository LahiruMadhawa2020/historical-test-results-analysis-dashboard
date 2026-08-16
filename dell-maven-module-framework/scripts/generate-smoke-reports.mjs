import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  API_OPERATIONS,
  UI_OPERATIONS,
  junitXml,
  playwrightJson
} from '../../scripts/smoke-reports.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const junitDir = path.join(root, 'reports', 'junit');
const playwrightDir = path.join(root, 'reports', 'playwright');

const JUNIT_UI_TOOLS = [
  { toolId: 'selenium-java-tdd', className: 'com.dell.testing.selenium.tdd.LoginLogoutTddTest' },
  { toolId: 'selenium-java-bdd', className: 'com.dell.testing.selenium.bdd.RunCucumberTest' },
  { toolId: 'playwright-java-tdd', className: 'com.dell.testing.playwright.tdd.ui.LoginLogoutTddTest' },
  { toolId: 'playwright-java-bdd', className: 'com.dell.testing.playwright.bdd.ui.RunCucumberUiTest' },
  { toolId: 'cypress-tdd', className: 'cypress.ui.tdd.loginLogout' },
  { toolId: 'cypress-bdd', className: 'cypress.ui.bdd.loginLogout' },
  { toolId: 'wdio-java-tdd', className: 'wdio.ui.tdd.loginLogout' },
  { toolId: 'wdio-java-bdd', className: 'wdio.ui.bdd.loginLogout' }
];

const JUNIT_API_TOOLS = [
  { toolId: 'playwright-java-tdd', className: 'com.dell.testing.playwright.tdd.api.JsonPlaceholderCrudTddTest' },
  { toolId: 'playwright-java-bdd', className: 'com.dell.testing.playwright.bdd.api.RunCucumberApiTest' }
];

fs.mkdirSync(junitDir, { recursive: true });
fs.mkdirSync(playwrightDir, { recursive: true });

for (const { toolId, className } of JUNIT_UI_TOOLS) {
  fs.writeFileSync(path.join(junitDir, `${toolId}.xml`), junitXml(toolId, className, UI_OPERATIONS));
}

for (const { toolId, className } of JUNIT_API_TOOLS) {
  fs.writeFileSync(path.join(junitDir, `${toolId}-api.xml`), junitXml(toolId, className, API_OPERATIONS));
}

for (const suffix of ['ui', 'api']) {
  const ops = suffix === 'api' ? API_OPERATIONS : UI_OPERATIONS;
  fs.writeFileSync(
    path.join(playwrightDir, `playwright-ts-tdd-${suffix}.json`),
    JSON.stringify(playwrightJson('playwright-ts-tdd', ops), null, 2)
  );
}

console.log('DELL smoke reports generated.');
