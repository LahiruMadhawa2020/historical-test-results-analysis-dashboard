import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.SR_LINK_APPLICATION_URL ?? 'https://opensource-demo.orangehrmlive.com/',
    specPattern: 'tests/cypress/**/*.cy.ts',
    supportFile: 'src/main/typescript/cypress/support/e2e.ts',
    video: false,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'reports/junit/cypress-[suite].xml',
      toConsole: false
    },
    setupNodeEvents(on, config) {
      config.env.SR_LINK_USERNAME = process.env.SR_LINK_APPLICATION_USERNAME ?? 'Admin';
      config.env.SR_LINK_PASSWORD = process.env.SR_LINK_APPLICATION_PASSWORD ?? 'admin123';
      return config;
    }
  }
});
