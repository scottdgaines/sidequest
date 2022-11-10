describe('New quest', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('[href="/new-quest"] > button').click()
  })

  it('Should display the New Quest view', () => {
    cy.location('href').should('eq', 'http://localhost:3000/new-quest')
    cy.get('.scroll').should('be.visible')
    cy.get('.quest-header').should('be.visible').should('contain', 'Do a jigsaw puzzle')
    cy.get('.quest-text').should('be.visible').should('contain', 'Not sure where to start? Check out')
    cy.get('.quest-text > a').should('be.visible').should('contain', 'this link')
    cy.get('[href="/quest-complete"] > .quest-button').should('be.visible').should('contain', 'Mark as Complete')
    cy.get('[href="/new-quest"] > .quest-button').should('be.visible').should('contain', 'Get Another Quest')
    cy.get('[href="/"] > .quest-button').should('be.visible').should('contain', 'Return to Main')
  })

  context.skip('New quest user flows: mark quest as Complete', () => {
    beforeEach(() => {
      cy.get('[href="/quest-complete"] > .quest-button').click()
      cy.location('href').should('eq', 'http://localhost:3000/quest-complete')
    })

    it('Should be able to mark a quest as Complete', () => {
      cy.get('.quest-header').should('be.visible').should('contain', 'Well done, Traveler!')
      cy.get('[href="/view-all-completed"] > .quest-button').should('contain', 'View Completed')
    })

    it('Should be able to view Completed Quest', () => {
      cy.get('[href="/view-all-completed"] > .quest-button').should('contain', 'View Completed').click()
      cy.location('href').should('eq', 'http://localhost:3000/view-all-completed')
      cy.get('.quest-header').should('be.visible').should('contain', 'Your Completed Quests')
      cy.get('.text').should('be.visible').should('contain', 'On Thursday, November 10, 2022, you completed the quest to "Do a jigsaw puzzle"')
      cy.get('.quest-button').should('be.visible')
    })

    it('Should be able to return to the main page from Completed Quest', () => {
      cy.get('[href="/view-all-completed"] > .quest-button').should('contain', 'View Completed').click()
      cy.get('.quest-button').click()
      cy.location('href').should('eq', 'http://localhost:3000/')
      cy.get('.title').should('be.visible')
    })
  })

  context('New quest user flows: get another quest', () => {
    beforeEach(() => {
      cy.get('[href="/new-quest"] > .quest-button').click()
      cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub-2.json'});
    })

    it('Should display the same page, but with a new quest', () => {
      cy.get('[href="/new-quest"] > .quest-button').click()
      cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub-2.json'});
      cy.location('href').should('eq', 'http://localhost:3000/new-quest')
      cy.get('.quest-header').should('be.visible').should('contain', 'Mow your lawn')
      cy.get('.quest-text').should('not.exist')
    })

  })
})
