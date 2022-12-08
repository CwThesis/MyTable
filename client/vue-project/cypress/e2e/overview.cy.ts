describe('Overview tests:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[name=username]').type('oliuignacio@gmail.com')
    cy.get('input[name=password]').type('123456789')
    cy.get('form').submit()
  })

  it('should log in successfully with valid credentials', () => {
    cy.url().should('include', '/overview')
  })
  it('renders correctly', () => {
    // Check that the side navbar and the top navbar are present
    cy.get('.side-navbar').should('be.visible');
    cy.get('.top-navbar').should('be.visible');
  });

  it('loads data from the API', () => {
    // Wait for the API call to finish and the data to be loaded
    cy.wait(1000);
    // Check that the restaurant name is rendered on the page
    cy.get('.restaurant-name').should('have.text', "Xavi and Guillem's RestoOPub");
    // Check that the staff members are rendered on the page
    cy.get('.staff-members').should('have.length', 4);
  });

  it('adds a new staff member', () => {

    // Wait for the API call to finish and the data to be loaded
    cy.wait(2000);
    
    cy.get('input[name=addstaff]').type('testWaiter')
    // Click on the "Add staff member" button
    cy.get('.addstaff-button').click();

    // Wait for the API call to finish and the data to be updated
    cy.wait(2000);

    // Check that the new staff member is rendered on the page
    cy.get('.staff-members')
      .should('have.length', 5)
      .last()
      .should('have.text', 'testWaiterEdit');
  });
})