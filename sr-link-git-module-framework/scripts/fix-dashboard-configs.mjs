import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const base = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const projects = [
  { dir: 'selenium-tdd-testing', tools: ['selenium-java-tdd'], applicationType: 'UI', methodology: 'TDD', junit: true, playwrightJson: false },
  { dir: 'selenium-bdd-testing', tools: ['selenium-java-bdd'], applicationType: 'UI', methodology: 'BDD', junit: true, playwrightJson: false },
  { dir: 'playwright-java-tdd-testing', tools: ['playwright-java-tdd', 'playwright-java-api-tdd'], applicationType: 'UI', methodology: 'TDD', junit: true, playwrightJson: false },
  { dir: 'playwright-java-bdd-testing', tools: ['playwright-java-bdd', 'playwright-java-api-bdd'], applicationType: 'UI', methodology: 'BDD', junit: true, playwrightJson: false },
  { dir: 'playwright-ts-tdd-testing', tools: ['playwright-ts-tdd', 'playwright-ts-api-tdd'], applicationType: 'UI', methodology: 'TDD', junit: false, playwrightJson: true },
  { dir: 'cypress-ts-tdd-testing', tools: ['cypress-tdd'], applicationType: 'UI', methodology: 'TDD', junit: true, playwrightJson: false },
  { dir: 'cypress-ts-bdd-testing', tools: ['cypress-bdd'], applicationType: 'UI', methodology: 'BDD', junit: true, playwrightJson: false },
  { dir: 'wdio-ts-tdd-testing', tools: ['wdio-tdd'], applicationType: 'UI', methodology: 'TDD', junit: true, playwrightJson: false },
  { dir: 'wdio-ts-bdd-testing', tools: ['wdio-bdd'], applicationType: 'UI', methodology: 'BDD', junit: true, playwrightJson: false },
  { dir: 'postman-api-testing', tools: ['newman'], applicationType: 'API', methodology: 'TDD', junit: false, playwrightJson: false, newman: true }
];

function frameworksBlock(toolIds) {
  const entries = toolIds.map((id) => `      '${id}': {
        historyFile: 'history.json',
        resultsDir: 'runs'
      }`).join(',\n');
  return `    frameworks: {\n${entries}\n    }`;
}

function dashboardConfig({ tools, applicationType, methodology, junit, playwrightJson, newman }) {
  const toolsBlock = newman
    ? `  tools: {
    newman: {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1
    }
  },`
    : '';

  return `import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const config: DashboardConfigFile = {
  dashboard: {
    title: 'Sr Link - Historical Analytics Dashboard',
    theme: 'light',
    openBrowser: true,
    output: {
      htmlFile: 'reports/analytics-dashboard.html'
    },
    thresholds: {
      warningResponseTimeMs: 1000
    }
  },
  storage: {
    rootDir: '.analytics-data',
    maxHistoryEntries: 100,
${frameworksBlock(tools)}
  },
${toolsBlock}
  importFormats: {
    'postman-collection': {
      enabled: ${newman ? 'true' : 'false'}
    },
    'newman-json': {
      enabled: false
    },
    'junit-xml': {
      enabled: ${junit}
    },
    'playwright-json': {
      enabled: ${playwrightJson}
    },
    'cypress-mochawesome': {
      enabled: false
    }
  },
  project: {
    id: 'sr-link',
    name: 'Sr Link',
    frameworkName: 'sr-link-git-module-framework',
    applicationType: '${applicationType}',
    methodology: '${methodology}'
  }
};

export default config;
`;
}

for (const project of projects) {
  const file = path.join(base, project.dir, 'dashboard.config.ts');
  fs.writeFileSync(file, dashboardConfig(project));
  console.log('fixed', project.dir);
}
