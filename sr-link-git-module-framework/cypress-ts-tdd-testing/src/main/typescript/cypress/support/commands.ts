declare global {
  namespace Cypress {
    interface Chainable {
      loginOrangeHrm(username: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginOrangeHrm', (username: string, password: string) => {
  cy.get("input[name='username']").type(username);
  cy.get("input[name='password']").type(password);
  cy.get("button[type='submit']").click();
});

export {};
