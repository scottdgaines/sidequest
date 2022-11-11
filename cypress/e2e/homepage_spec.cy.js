describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
  });
  
  it('Should display the home ', () => {
    cy.get('.meadow-background').should('be.visible')
    cy.get('.title').should('be.visible')
    cy.get('header > a').should('be.visible')
    cy.get('nav').should('be.visible')
      .should('contain', 'Welcome, Traveler! I have a quest for you! What would you like to do?')
    cy.get('[href="/new-quest"] > button').should('be.visible').should('contain', 'View Your Quest')
    cy.get('[href="/view-all-completed"] > button').should('be.visible').should('contain', 'Show Completed Quests')
    cy.get('.character').should('be.visible')
  })

  it('Should be able to navigate to the new quest page', () => {
    cy.get('[href="/new-quest"] > button').click()
    cy.location('href').should('eq', 'http://localhost:3000/new-quest');
    cy.get('.quest-header').should('be.visible')
    cy.get('.title').should('not.exist')
  })

  it('Should be able to view all completed quests from the main page', () => {
    cy.get('[href="/view-all-completed"] > button').click()
    cy.location('href').should('eq', 'http://localhost:3000/view-all-completed')
    cy.get('.quest-header').should('be.visible')
  })

})

describe('Homepage network error user flow', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/activity/', {forceNetworkError: true});
    cy.visit('http://localhost:3000/')
  })

  it('Should display an error message if fetch fails', () => {
    cy.get('.welcome-message').should('contain', 'The Dark Lord is afoot! For your safety, I cannot grant quests at this time. But fear not! You can try again later.')
    cy.get('button').should('be.visible').should('contain', 'Show Completed Quests')
  })
  
  it('Should be able to navigate to the Completed Quests page', () => {
    cy.get('[href="/view-all-completed"] > button').click()
    cy.location('href').should('eq', 'http://localhost:3000/view-all-completed');
    cy.get('.quest-header').should('be.visible').should('contain', 'Your Completed Quests')

  })
})
