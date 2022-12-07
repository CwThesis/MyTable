describe('Login Flow', () => {
  it('should redirect to /login if private routes are accessed without auth', () => {
    // Assert that the user is redirected to the login page after accessing a private route
    cy.visit('http://localhost:5173/dashboard/menu')
    cy.url().should('include', '/login')
    cy.visit('http://localhost:5173/dashboard/tickets')
    cy.url().should('include', '/login')
    cy.visit('http://localhost:5173/dashboard/tables')
    cy.url().should('include', '/login')
    cy.visit('http://localhost:5173/dashboard/overview')
    cy.url().should('include', '/login')
  })
})
