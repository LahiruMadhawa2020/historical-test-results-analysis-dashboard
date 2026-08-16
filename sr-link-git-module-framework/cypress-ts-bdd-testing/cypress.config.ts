import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  e2e: {
    baseUrl: process.env.SR_LINK_APPLICATION_URL ?? 'https://opensource-demo.orangehrmlive.com/',
    specPattern: 'tests/cypress/**/*.{feature}',
    supportFile: 'src/main/typescript/cypress/support/e2e.ts',
    video: false,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'reports/junit/cypress-[suite].xml',
      toConsole: false
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));
      config.env.SR_LINK_USERNAME = process.env.SR_LINK_APPLICATION_USERNAME ?? 'Admin';
      config.env.SR_LINK_PASSWORD = process.env.SR_LINK_APPLICATION_PASSWORD ?? 'admin123';
      return config;
    }
  }
});
