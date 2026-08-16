import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('the Cypress login page is opened', () => {
  cy.visit('/');
});

When('the Cypress user logs in', () => {
  cy.get("input[name='username']").type(Cypress.env('WK_USERNAME') ?? 'Admin');
  cy.get("input[name='password']").type(Cypress.env('WK_PASSWORD') ?? 'admin123');
  cy.get("button[type='submit']").click();
});

Then('the Cypress dashboard is visible', () => {
  cy.get('.oxd-userdropdown-tab').should('be.visible');
});

When('the Cypress user logs out', () => {
  cy.get('.oxd-userdropdown-tab').click();
  cy.contains('Logout').click();
});

Then('the Cypress login page is visible', () => {
  cy.get("input[name='username']").should('be.visible');
});
