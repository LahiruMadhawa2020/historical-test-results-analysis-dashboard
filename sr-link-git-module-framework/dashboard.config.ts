import type { DashboardConfigFile } from 'historical-analytics-dashboard';

const STANDARD_TOOL_IDS = [
  'cypress-bdd',
  'cypress-tdd',
  'newman',
  'playwright-java-bdd',
  'playwright-java-tdd',
  'playwright-ts-tdd',
  'selenium-java-bdd',
  'selenium-java-tdd',
  'wdio-java-bdd',
  'wdio-java-tdd'
] as const;

const frameworkEntry = {
  historyFile: 'history.json',
  resultsDir: 'runs'
};

const toolIds = [...STANDARD_TOOL_IDS];
const frameworks = Object.fromEntries(toolIds.map((id) => [id, frameworkEntry]));

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
    frameworks
  },
  tools: {
    newman: {
      enabled: true,
      reporter: 'cli',
      iterationCount: 1
    }
  },
  importFormats: {
    'postman-collection': { enabled: true },
    'newman-json': { enabled: false },
    'junit-xml': { enabled: true },
    'playwright-json': { enabled: true }
  },
  project: {
    id: 'sr-link',
    name: 'Sr Link',
    frameworkName: 'sr-link-git-module-framework',
    applicationType: 'API',
    methodology: 'TDD'
  },
  filters: {
    applicationTypes: ['UI', 'API', 'Mobile'],
    toolNames: [...STANDARD_TOOL_IDS],
    showFrameworkFilter: false,
    showToolFilter: true,
    showProjectFilter: false
  }
};

export default config;
