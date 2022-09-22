describe('App flow', () => {
  it('counter works', () => {
    cy.visit('http://localhost:5173')

    cy.contains('count is 0')
    cy.get('button').click()
    cy.contains('count is 1')
  })
})
