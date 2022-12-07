describe('Register Flow', () => {
  it('should create a new account successfully', () => {
    cy.visit('http://localhost:5173/login')

    // Fill out the registration form and submit it
    cy.get('.amplify-tabs-item:nth-of-type(2)').click();
    cy.get('input[name=email]').type('mynewusername3@test')
    cy.get('input[name=password]').type('mynewpassword2')
    cy.get('input[name=confirm_password]').type('mynewpassword2')
    cy.get('form').submit()

    // Assert that the user is redirected to the onboarding page after registering
    cy.get('.amplify-heading--3').should('be.visible')  })

  it('should display an error message if the registration fails', () => {
    cy.visit('http://localhost:5173/login')

    // Fill out the registration form with invalid data and submit it
    cy.get('.amplify-tabs-item:nth-of-type(2)').click();
    cy.get('input[name=email]').type('mynewusername@test.com')
    cy.get('input[name=password]').type('mynewpasswfsdf')
    cy.get('input[name=confirm_password]').type('mynewpassword')
    cy.get('form').submit()

    // Assert that the error message is displayed
    cy.get('.amplify-text--error').should('be.visible')
  })
})