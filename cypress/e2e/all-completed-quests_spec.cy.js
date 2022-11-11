describe('View All Completed Quests', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('[href="/new-quest"] > button').click()
    cy.get('[href="/quest-complete"] > .quest-button').click()
    cy.get('[href="/"] > .quest-button').click()
    cy.get('[href="/view-all-completed"] > button').click()
  })

  it('Should display the All Completed Quests view', () => {
    cy.location('href').should('eq', 'http://localhost:3000/view-all-completed');
    cy.get('.scroll').should('be.visible')
    cy.get('.quest-header').should('be.visible').should('contain', 'Your Completed Quests')
    cy.get('.completed-quests-container > :nth-child(1)').should('be.visible').should('contain', 'you completed the quest to "Do a jigsaw puzzle"')
    cy.get('.quest-button').should('be.visible')
  })

  context('All Completed Quests user flows', () => {
    it('Should be able to return to the main page from the View All Completed Quests dislay', () => {
        cy.get('.quest-button').should('be.visible').click()
        cy.location('href').should('eq', 'http://localhost:3000/')
        cy.get('.title').should('be.visible')
    })

    it('Should be able to view all completed quests from the Completed Quest View', () => {
      cy.get('.quest-button').should('be.visible').click()
      cy.get('[href="/new-quest"] > button').click()
      cy.get('[href="/quest-complete"] > .quest-button').click()
      cy.location('href').should('eq', 'http://localhost:3000/quest-complete')
      cy.get('[href="/view-all-completed"] > .quest-button').click()
      cy.location('href').should('eq', 'http://localhost:3000/view-all-completed')
      cy.get('.completed-quests-container > :nth-child(2)').should('be.visible').should('contain', 'you completed the quest to "Do a jigsaw puzzle"')
    })
  })
})