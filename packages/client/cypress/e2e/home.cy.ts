describe('Home Page', () => {
  it('Shows users on the homepage', () => {
    cy.visit('/');

    cy.get('[data-testid=usersList]').should('exist');

    cy.get('[data-testid=usersList] [data-testid=userCard]').should(
      'have.length.greaterThan',
      0,
    );
  });

  it('Shows user details when a user is clicked', () => {
    cy.visit('/');

    cy.get('[data-testid=usersList] [data-testid=userCard]').first().click();

    cy.get('[data-testid=userDetails]').should('exist');
  });
});
