import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./tests/wdio/**/*.spec.ts'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: process.env.WK_HEADLESS === 'false' ? [] : ['--headless=new']
    }
  }],
  logLevel: 'error',
  framework: 'mocha',
  reporters: ['spec', ['junit', { outputDir: './reports/junit', outputFileFormat: () => 'wdio-java-tdd.xml' }]],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  baseUrl: process.env.WK_APPLICATION_URL ?? 'https://opensource-demo.orangehrmlive.com/'
};
