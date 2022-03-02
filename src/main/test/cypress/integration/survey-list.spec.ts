
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const urlMatcher = /surveys/

export const mockUnexpectedError = (): void => Http.mockServerError(urlMatcher)

export const mockAccessDeniedError = (): void => Http.mockForbiddenError(urlMatcher)

export const mockSuccess = (surveys = []): void => Http.mockOk(urlMatcher, surveys)

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()

    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    Helper.testUrl('/')
  })

  it('Should present correct username', () => {
    mockSuccess()
    const account = Helper.getLocalStorageItem<{ name: string }>('account')

    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('Should logout on logout button was clicked', () => {
    mockSuccess()
    cy.getByTestId('logout').click()

    Helper.testUrl('/login')
  })
})
