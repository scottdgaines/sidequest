describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

// cy.intercept('http://www.boredapi.com/api/*', {fixture: 'stub.json'});
// cy.visit('http://localhost:3000/')
// cy.get('[href="/new-quest"] > button').click()
// cy.get('[href="/quest-complete"] > .quest-button').click()
// cy.get('[href="/"] > .quest-button').click()