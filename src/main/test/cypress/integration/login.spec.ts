
import faker from 'faker'
import * as Http from '../support/login-mocks'
import * as FormHelper from '../support/form-helpers'
import * as Helper from '../support/helpers'

const populateFields = (): void => {
  cy.getByTestId('email')
    .type(faker.internet.email())
  cy.getByTestId('password')
    .type(faker.random.alphaNumeric(5))
}
const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should begin with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email')
      .type(faker.random.word())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(4))

    FormHelper.testInputStatus('email', 'Campo inválido')
    FormHelper.testInputStatus('password', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFields()

    FormHelper.testInputStatus('email', '')
    FormHelper.testInputStatus('password', '')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    Http.mockInvalidCredentialsError()

    simulateValidSubmit()

    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    FormHelper.testMainError('Credenciais Inválidas')
    Helper.testUrl('/login')
  })

  it('Should save account if valid credentials are provided', () => {
    Http.mockOk()

    simulateValidSubmit()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('not.exist')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should presente unexpected error', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve')
    Helper.testUrl('/login')
  })

  it('Should prevent multiple submits', () => {
    Http.mockOk()
    populateFields()

    cy.getByTestId('submit')
      .dblclick()

    Helper.testCallsCount(1)
  })

  it('Should not call submit when form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helper.testCallsCount(0)
  })
})
