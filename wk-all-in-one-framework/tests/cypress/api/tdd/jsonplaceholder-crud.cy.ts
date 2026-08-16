const apiUrl = Cypress.env('WK_API_URL') ?? 'https://jsonplaceholder.typicode.com/';

describe('WK Cypress API TDD', () => {
  it('1. Create Post', () => {
    cy.request('POST', `${apiUrl}posts/`, {
      title: 'wk',
      body: 'create',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
    });
  });

  it('2. Get Post', () => {
    cy.request(`${apiUrl}posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
    });
  });

  it('3. Update Post', () => {
    cy.request('PUT', `${apiUrl}posts/1`, {
      id: 1,
      title: 'wk-updated',
      body: 'update',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq('wk-updated');
    });
  });

  it('4. Delete Post', () => {
    cy.request('DELETE', `${apiUrl}posts/1`).its('status').should('eq', 200);
  });
});
