describe('Not Found display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/new-quests')
  })

  it('Should display an error message if URL is not found', () => {
    cy.get('.quest-text').should('be.visible').should('contain', 'The page you were looking for does not exist! Please check the url and try again or return home')
  })

  it('Should be able to navigate to the Home page via the error message', () => {
    cy.location('href').should('eq', 'http://localhost:3000/new-quests')
    cy.get('a').click()
    cy.location('href').should('eq', 'http://localhost:3000/')
  })
})
