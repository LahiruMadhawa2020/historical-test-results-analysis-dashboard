import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./tests/wdio/ui/bdd/**/*.feature'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: process.env.SR_LINK_HEADLESS === 'false' ? [] : ['--headless=new']
    }
  }],
  logLevel: 'error',
  framework: 'cucumber',
  reporters: ['spec', ['junit', { outputDir: './reports/junit', outputFileFormat: () => 'wdio-bdd.xml' }]],
  cucumberOpts: {
    require: ['./tests/wdio/ui/bdd/**/*.steps.ts'],
    timeout: 60000
  },
  baseUrl: process.env.SR_LINK_APPLICATION_URL ?? 'https://opensource-demo.orangehrmlive.com/'
};
