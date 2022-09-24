describe('App flow', () => {
  it('shows page with loaded words', () => {
    cy.visit('http://localhost:5173')

    cy.contains('count is 0')
    cy.get('button').click()
    cy.contains('count is 1')
  })

  it('allows to perform delete, create and move actions', () => {})
})
