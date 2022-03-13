import faker from 'faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const urlMatcher = /signup/
export const mockEmailInUseError = (): void => Http.mockForbiddenError(urlMatcher)

export const mockUnexpectedError = (): void => Http.mockServerError(urlMatcher)

export const mockSuccess = (): void => {
  cy.fixture('account').then(account => {
    Http.mockOk(urlMatcher, account)
  })
}

const populateFields = (): void => {
  cy.getByTestId('name').type(faker.random.alphaNumeric(5))
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('Should begin with initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(4))
    cy.getByTestId('email').type(faker.random.words(4))
    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(6))

    FormHelper.testInputStatus('name', 'Campo inválido')
    FormHelper.testInputStatus('email', 'Campo inválido')
    FormHelper.testInputStatus('password', 'Campo inválido')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFields()

    FormHelper.testInputStatus('name', '')
    FormHelper.testInputStatus('email', '')
    FormHelper.testInputStatus('password', '')
    FormHelper.testInputStatus('passwordConfirmation', '')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('Should present email in use error on 403 status code', () => {
    mockEmailInUseError()

    simulateValidSubmit()
    FormHelper.testMainError('Este e-mail já está em uso.')
  })

  it('Should present unexpected error on default cases', () => {
    mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve')
  })

  it('Should save account when account creation returns success', () => {
    mockSuccess()

    simulateValidSubmit()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('not.exist')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submitions', () => {
    mockSuccess()

    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helper.testCallsCount(1)
  })

  it('Should not submit when form is invalid', () => {
    mockSuccess()
    cy.getByTestId('name').type(faker.random.alphaNumeric(7)).type('{enter}')

    Helper.testCallsCount(0)
  })
})
