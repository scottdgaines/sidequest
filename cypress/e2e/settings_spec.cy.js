describe('Settings', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('.setting-icon').click()
  });

  it('Should display the settings page', () => {
    cy.location('href').should('eq', 'http://localhost:3000/settings');
    cy.get('.theme-setting-container').should('be.visible')
    cy.get('p.quest-text').should('be.visible').should('contain', 'Choose Your Theme')
    cy.get('[for="meadow"]').should('be.visible').should('contain', 'Meadow')
    cy.get('[value="meadow"]').should('be.checked')
    cy.get('[for="haunted-forest"]').should('be.visible').should('contain', 'Haunted Forest')
    cy.get('[value="forest"]').should('not.be.checked')
    cy.get('[for="castle"]').should('be.visible').should('contain', 'Castle')
    cy.get('[value="castle"]').should('not.be.checked')
    cy.get('.quest-button').should('be.visible').should('contain', 'Return to Main')
  })
})

describe('Meadow Theme', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('.setting-icon').click()
  })

  it('Should be able to select Meadow theme', () => {
    cy.get('[value="meadow"]').should('be.checked')
    cy.get('.meadow-background').should('be.visible')
  })

  it('Should be able to return to the Main page', () => {
    cy.get('.quest-button').click()
    cy.location('href').should('eq', 'http://localhost:3000/');
  })

  it('Should show the Meadow theme on the Main page', () => {
    cy.get('.quest-button').click()
    cy.get('.meadow-background').should('be.visible')
    cy.get('.character').should('be.visible').should('have.attr', 'src').should('include', 'wizard')
    cy.get('.welcome-message').should('contain', 'Traveler')
  })

  it('Should show the Meadow theme on the Quest View pages', () => {
    cy.get('.quest-button').click()
    cy.get('[href="/new-quest"] > button').click()
    cy.get('.meadow-background').should('be.visible')
    cy.get('.quest-name-container > :nth-child(1)').should('contain', 'Traveler')
    cy.get('[href="/quest-complete"] > .quest-button').click()
    cy.get('.meadow-background').should('be.visible')
    cy.get('.quest-header').should('contain', "Traveler")
  })

  it('Should show the Meadow them on the All Completed Quests page', () => {
    cy.get('.quest-button').click()
    cy.get('[href="/view-all-completed"] > button').click()
    cy.get('.meadow-background').should('be.visible')
  })
})

describe('Haunted Forest Theme', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('.setting-icon').click()
    cy.get('[value="forest"]').click()
  });

  it('Should be able to select Haunted Forest theme', () => {
    cy.get('[value="forest"]').should('be.checked')
    cy.get('.forest-background').should('be.visible')
  })

  it('Should be able to return to the Main page', () => {
    cy.get('.quest-button').click()
    cy.location('href').should('eq', 'http://localhost:3000/');
  })

  it('Should show the Haunted Forest theme on the Main page', () => {
    cy.get('.quest-button').click()
    cy.get('.forest-background').should('be.visible')
    cy.get('.character').should('be.visible').should('have.attr', 'src').should('include', 'witch')
    cy.get('.welcome-message').should('contain', 'Wandering One')
  })

  it('Should show the Haunted Forest theme on the Quest Wiew pages', () => {
    cy.get('.quest-button').click()
    cy.get('[href="/new-quest"] > button').click()
    cy.get('.forest-background').should('be.visible')
    cy.get('.quest-name-container > :nth-child(1)').should('contain', 'Wandering One')
    cy.get('[href="/quest-complete"] > .quest-button').click()
    cy.get('.forest-background').should('be.visible')
    cy.get('.quest-header').should('contain', "Wandering One")
  })

  it('Should show the Haunted Forest them on the All Completed Quests page', () => {
    cy.get('.quest-button').click()
    cy.get('[href="/view-all-completed"] > button').click()
    cy.get('.forest-background').should('be.visible')
  })
})

describe('Castle Theme', () => {
  beforeEach(() => {
    cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
    cy.visit('http://localhost:3000/')
    cy.get('.setting-icon').click()
    cy.get('[value="castle"]').click()
  });

  it('Should be able to select Haunted Forest theme', () => {
    cy.get('[value="castle"]').should('be.checked')
    cy.get('.castle-background').should('be.visible')
  })

  it('Should be able to return to the Main page', () => {
    cy.get('.quest-button').click()
    cy.location('href').should('eq', 'http://localhost:3000/');
  })

  it('Should show the Haunted Castle theme on the Main page', () => {
    cy.get('.quest-button').click()
    cy.get('.castle-background').should('be.visible')
    cy.get('.character').should('be.visible').should('have.attr', 'src').should('include', 'king')
    cy.get('.welcome-message').should('contain', 'Noble One')
  })

  it('Should show the Haunted Castle theme on the Quest Wiew pages', () => {
    cy.get('.quest-button').click()
    cy.get('[href="/new-quest"] > button').click()
    cy.get('.castle-background').should('be.visible')
    cy.get('.quest-name-container > :nth-child(1)').should('contain', 'Noble One')
    cy.get('[href="/quest-complete"] > .quest-button').click()
    cy.get('.castle-background').should('be.visible')
    cy.get('.quest-header').should('contain', "Noble One")
  })

  it('Should show the Haunted Forest them on the All Completed Quests page', () => {
    cy.get('.quest-button').click()
    cy.get('[href="/view-all-completed"] > button').click()
    cy.get('.castle-background').should('be.visible')
  })
})