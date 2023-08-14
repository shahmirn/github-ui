describe('User Details Page', () => {
  it('shows repositories, organizations, and followers for a user', () => {
    cy.visit('/users/mojombo');

    cy.get('[data-testid=repositoryCard]').should('have.length.greaterThan', 0);
    cy.get('[data-testid=organizationCard]').should(
      'have.length.greaterThan',
      0,
    );
    cy.get('[data-testid=followerCard]').should('have.length.greaterThan', 0);
  });

  it('shows no repositories for a user with no repos', () => {
    cy.visit('/users/railsjitsu');

    cy.contains('No Repositories').should('be.visible');
    cy.get('[data-testid=repositoryCard]').should('not.exist');
  });

  it('shows no organizations for a user with no organizations', () => {
    cy.visit('/users/pjhyett');

    cy.contains('No Organizations').should('be.visible');
    cy.get('[data-testid=organizationCard]').should('not.exist');
  });

  it('shows no followers for a user with no followers', () => {
    cy.visit('/users/AmitaTatar');

    cy.contains('No Followers').should('be.visible');
    cy.get('[data-testid=followerCard]').should('not.exist');
  });
});
