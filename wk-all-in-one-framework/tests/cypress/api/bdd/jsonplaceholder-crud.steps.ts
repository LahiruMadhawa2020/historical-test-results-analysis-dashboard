import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const apiUrl = Cypress.env('WK_API_URL') ?? 'https://jsonplaceholder.typicode.com/';

Given('the Cypress API client is ready', () => {
  expect(apiUrl).to.contain('jsonplaceholder');
});

When('a Cypress API post is created', () => {
  cy.request('POST', `${apiUrl}posts/`, { title: 'wk', body: 'create', userId: 1 }).as('create');
});

Then('the Cypress create response status is {int}', (status: number) => {
  cy.get('@create').its('status').should('eq', status);
});

When('Cypress fetches post {int}', (id: number) => {
  cy.request(`${apiUrl}posts/${id}`).as('read');
});

Then('the Cypress read response status is {int}', (status: number) => {
  cy.get('@read').its('status').should('eq', status);
});

When('Cypress updates post {int}', (id: number) => {
  cy.request('PUT', `${apiUrl}posts/${id}`, {
    id,
    title: 'wk-bdd-updated',
    body: 'update',
    userId: 1
  }).as('update');
});

Then('the Cypress update response status is {int}', (status: number) => {
  cy.get('@update').its('status').should('eq', status);
});

When('Cypress deletes post {int}', (id: number) => {
  cy.request('DELETE', `${apiUrl}posts/${id}`).as('delete');
});

Then('the Cypress delete response status is {int}', (status: number) => {
  cy.get('@delete').its('status').should('eq', status);
});
