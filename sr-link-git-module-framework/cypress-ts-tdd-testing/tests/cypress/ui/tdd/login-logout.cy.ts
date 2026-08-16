describe('Sr Link Cypress UI TDD', () => {
  it('logs in and logs out', () => {
    cy.visit('/');
    cy.loginOrangeHrm('Admin', 'admin123');
    cy.get('.oxd-userdropdown-tab').should('be.visible');
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();
    cy.get("input[name='username']").should('be.visible');
  });
});
