
import faker from 'faker'
import * as Http from '../integration/login-mocks'
import * as FormHelper from '../support/form-helper'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email')
    .type(faker.internet.email())
  cy.getByTestId('password')
    .type(faker.random.alphaNumeric(5))
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
    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))

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
    FormHelper.testUrl('/login')
  })

  it('Should save access token if valid credentials are provided', () => {
    Http.mockOk()

    simulateValidSubmit()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('not.exist')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should presente unexpected error', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve')
    FormHelper.testUrl('/login')
  })

  it('Should presente InvalidAccessTokenError if invalid data is returned', () => {
    Http.mockInvalidDataIntegration()

    simulateValidSubmit()

    FormHelper.testMainError('Ocorreu um problema no processo de autenticação')
  })

  it('Should prevent multiple submits', () => {
    Http.mockOk()

    cy.getByTestId('email')
      .type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit')
      .dblclick()

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit when form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
})
