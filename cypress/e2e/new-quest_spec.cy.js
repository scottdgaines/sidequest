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

  context('New quest user flows: mark quest as Complete', () => {
    beforeEach(() => {
      cy.get('[href="/quest-complete"] > .quest-button').click()
    })

    it('Should be able to mark a quest as Complete', () => {
      cy.location('href').should('eq', 'http://localhost:3000/quest-complete')
      cy.get('.quest-header').should('be.visible').should('contain', 'Well done, Traveler!')
      cy.get('[href="/view-all-completed"] > .quest-button').should('contain', 'View Completed')
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
        .should('not.contain', 'Do a jigsaw puzzle')
      cy.get('.quest-name-container > :nth-child(3)').should('not.exist')
    })

    it('Should be able to return to the main page after getting a new quest', () => {
      cy.get('[href="/"] > .quest-button').click()
      cy.location('href').should('eq', 'http://localhost:3000/')
    })
  })
})

describe('New Quest: network error user flow', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('[href="/new-quest"] > button').click()
  })

  it('Should display an error message, if fetch failed after intial quest display', () => {
    cy.intercept('http://www.boredapi.com/api/activity/', {forceNetworkError: true});
    cy.get('[href="/new-quest"] > .quest-button').click()
    cy.get('.quest-text').should('be.visible').should('contain', 'Another quest cannot be granted at this time. Confound that Dark Lord!')
    cy.get('[href="/"] > .quest-button').click()
    cy.get('.welcome-message').should('be.visible').should('contain', 'The Dark Lord is afoot! For your safety, I cannot grant quests at this time. But fear not! You can try again later.')
  })
})
