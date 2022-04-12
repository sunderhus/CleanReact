
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'
const urlMatcher = /survey/

export const mockUnexpectedError = (): void => Http.mockServerError(urlMatcher)

export const mockAccessDeniedError = (): void => Http.mockForbiddenError(urlMatcher)

export const mockSuccess = (): void => {
  cy.fixture('survey-result').then(surveyResult => {
    Http.mockOk(urlMatcher, surveyResult)
  })
}

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
    cy.visit('/survey/any_id')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()

    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should('exist')
    mockSuccess()
    cy.getByTestId('reload').click()

    cy.getByTestId('answers').should('exist')
  })
})
