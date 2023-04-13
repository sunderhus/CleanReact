
import faker from 'faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const urlMatcher = /login/

export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(urlMatcher)

export const mockUnexpectedError = (): void => Http.mockServerError(urlMatcher, null)

export const mockSuccess = (): void => {
  cy.fixture('account').then(account => {
    Http.mockOk(urlMatcher, account)
  })
}

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
    mockInvalidCredentialsError()

    simulateValidSubmit()

    cy.getByTestId('spinner').should('exist')
    cy.getByTestId('main-error').should('not.exist')
    FormHelper.testMainError('Credenciais Inválidas')
    Helper.testUrl('/login')
  })

  it('Should save account if valid credentials are provided', () => {
    mockSuccess()

    simulateValidSubmit()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('not.exist')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should presente unexpected error', () => {
    mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve')
    Helper.testUrl('/login')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()

    cy.getByTestId('submit')
      .dblclick()
    cy.wait('@request')

    Helper.testCallsCount(1)
  })

  it('Should not call submit when form is invalid', () => {
    mockSuccess()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helper.testCallsCount(0)
  })
})
