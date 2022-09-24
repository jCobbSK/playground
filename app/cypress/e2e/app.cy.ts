describe('App flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('shows page with loaded words', () => {
    cy.intercept('http://localhost:8001/api/words', {
      body: {
        data: [
          {
            id: '1',
            word: 'First',
          },
        ],
      },
    }).as('words')

    cy.wait('@words')
    cy.get('[data-cy=word-item-1]')
      .should('be.visible')
      .should('contain', 'First')
  })

  it('allows to perform delete, create and move actions', () => {
    cy.intercept('http://localhost:8001/api/words', {
      body: {
        data: [
          {
            id: '1',
            word: 'First',
          },
        ],
      },
    }).as('words')

    cy.wait('@words')

    // create
    cy.get('[data-cy=add-word-button]').click()
    // confirm by enter
    cy.get('[data-cy=add-word-input]').type('Second{enter}')
    cy.get('[data-cy=add-word-button]').click()

    // confirm by explicit button click
    cy.get('[data-cy=add-word-input]').type('Third')
    cy.get('[data-cy=add-word-button]').click()

    cy.get('[data-cy^=word-item-]').should('have.length', 3)
    cy.get('[data-cy^=word-item-]').first().should('contain', 'Third')

    // delete
    // cypress can't easily simulate CSS hover so we
    // assume we have rendered hidden buttons
    cy.get('[data-cy="word-delete-btn"]').first().click({ force: true })
    cy.get('[data-cy^=word-item-]').should('have.length', 2)
    cy.get('[data-cy^=word-item-]').first().should('contain', 'Second')

    // move
    cy.dragAndDrop(
      '[data-cy^=word-item-]:last',
      '[data-cy^=word-item-]:first'
    ).wait(1000) // wait for re-order

    cy.get('[data-cy^=word-item-]').first().should('contain', 'First')
  })
})
