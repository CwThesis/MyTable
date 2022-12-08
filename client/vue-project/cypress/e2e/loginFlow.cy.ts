describe('Login Flow', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login')

    // Fill out the login form and submit it
    cy.get('input[name=username]').type('oliuignacio@gmail.com')
    cy.get('input[name=password]').type('123456789')
    cy.get('form').submit()

    // Assert that the user is redirected to the onboarding page after logging in
    cy.url().should('include', '/onboarding')
  })

  it('should display an error message if the login fails', () => {
    cy.visit('http://localhost:5173/login')

    // Fill out the login form with incorrect credentials and submit it
    cy.get('input[name=username]').type('myusername')
    cy.get('input[name=password]').type('incorrectpassword')
    cy.get('form').submit()

    // Assert that the error message is displayed
    cy.get('.amplify-alert--error').should('be.visible')
  })
})