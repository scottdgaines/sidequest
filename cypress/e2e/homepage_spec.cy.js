describe('Homepage', () => {

  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/activity/', {
      fixture: 'stub.json'
    });
    cy.visit('http://localhost:3000/')
  });

  it('Should display the home screen', () => {
    cy.get('.title').should('be.visible')
    cy.get('nav').should('be.visible')
      .should('contain', 'Welcome, Traveler! What would you like to do?')
    cy.get('.wizard').should('be.visible')
  })
})