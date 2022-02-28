export const testInputStatus = (field: string, error: string): void => {
  cy.getByTestId(`${field}-wrap`)
    .should('have.attr', 'data-invalid', `${!!error}`)

  const assertSelector = `${error ? 'have.attr' : 'not.have.attr'}`
  cy.getByTestId(field)
    .should(assertSelector, 'title', error)
  cy.getByTestId(`${field}-label`)
    .should(assertSelector, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error')
    .should('exist')
    .should('contain.text', error)
}
