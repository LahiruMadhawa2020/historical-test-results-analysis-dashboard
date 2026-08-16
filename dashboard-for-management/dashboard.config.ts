import type { ApplicationType, ManagementDashboardConfigFile, ManagementSourceConfig } from 'historical-analytics-dashboard';

type ProjectKey = 'WK' | 'DELL' | 'Sr Link';

interface SourceSpec {
  id: string;
  label: string;
  project: ProjectKey;
  frameworkName: string;
  tool: string;
  rootDir: string;
}

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

const STANDARD_FILTERS = {
  applicationTypes: ['UI', 'API', 'Mobile'] as ApplicationType[],
  toolNames: [...STANDARD_TOOL_IDS],
  showFrameworkFilter: false,
  showToolFilter: true,
  showProjectFilter: true
};

function filesystemSource(spec: SourceSpec): ManagementSourceConfig {
  const methodology = spec.tool.includes('bdd') ? 'BDD' : 'TDD';
  const applicationType = spec.tool === 'newman' ? 'API' : 'UI';

  return {
    id: spec.id,
    label: spec.label,
    projectName: spec.project,
    frameworkName: spec.frameworkName,
    applicationType,
    tool: spec.tool,
    methodology,
    storage: {
      type: 'filesystem',
      rootDir: spec.rootDir
    },
    enabled: true
  };
}

function buildProjectSources(
  prefix: string,
  project: ProjectKey,
  frameworkName: string,
  rootDir: string
): SourceSpec[] {
  return STANDARD_TOOL_IDS.map((tool) => ({
    id: `${prefix}-${tool}`,
    label: `${project} · ${tool}`,
    project,
    frameworkName,
    tool,
    rootDir
  }));
}

const wkRoot = '../wk-all-in-one-framework/.analytics-data';
const dellRoot = '../dell-maven-module-framework/.analytics-data';
const srLinkRoot = '../sr-link-git-module-framework';

const wkSources = buildProjectSources('wk', 'WK', 'wk-all-in-one-framework', wkRoot);
const dellSources = buildProjectSources('dell', 'DELL', 'dell-maven-module-framework', dellRoot);

const srLinkSources: SourceSpec[] = STANDARD_TOOL_IDS.flatMap((tool) => {
  const rootByTool: Record<string, string> = {
    newman: `${srLinkRoot}/postman-api-testing/.analytics-data`,
    'selenium-java-tdd': `${srLinkRoot}/selenium-tdd-testing/.analytics-data`,
    'selenium-java-bdd': `${srLinkRoot}/selenium-bdd-testing/.analytics-data`,
    'playwright-java-tdd': `${srLinkRoot}/playwright-java-tdd-testing/.analytics-data`,
    'playwright-java-bdd': `${srLinkRoot}/playwright-java-bdd-testing/.analytics-data`,
    'playwright-ts-tdd': `${srLinkRoot}/playwright-ts-tdd-testing/.analytics-data`,
    'cypress-tdd': `${srLinkRoot}/cypress-ts-tdd-testing/.analytics-data`,
    'cypress-bdd': `${srLinkRoot}/cypress-ts-bdd-testing/.analytics-data`,
    'wdio-java-tdd': `${srLinkRoot}/wdio-ts-tdd-testing/.analytics-data`,
    'wdio-java-bdd': `${srLinkRoot}/wdio-ts-bdd-testing/.analytics-data`
  };

  return [{
    id: `sr-link-${tool}`,
    label: `Sr Link · ${tool}`,
    project: 'Sr Link',
    frameworkName: 'sr-link-git-module-framework',
    tool,
    rootDir: rootByTool[tool]
  }];
});

const exampleRemoteSources: ManagementSourceConfig[] = [
  {
    id: 'example-s3-wk-selenium',
    label: 'Example · WK Selenium (S3)',
    projectName: 'WK',
    frameworkName: 'wk-all-in-one-framework',
    applicationType: 'UI',
    tool: 'selenium-java-tdd',
    methodology: 'TDD',
    storage: {
      type: 's3',
      bucket: 'my-test-artifacts',
      prefix: 'wk/selenium-java-tdd',
      region: 'us-east-1'
    },
    enabled: false
  }
];

const config: ManagementDashboardConfigFile = {
  dashboard: {
    title: 'Management Dashboard - Test Execution Analytics',
    theme: 'light',
    openBrowser: false,
    output: {
      htmlFile: 'reports/management-dashboard.html'
    },
    thresholds: {
      warningResponseTimeMs: 1000
    }
  },
  management: {
    sources: [
      ...wkSources.map(filesystemSource),
      ...dellSources.map(filesystemSource),
      ...srLinkSources.map(filesystemSource),
      ...exampleRemoteSources
    ],
    filters: STANDARD_FILTERS
  }
};

export default config;
