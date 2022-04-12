
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'
const urlMatcher = /survey/

export const mockUnexpectedError = (): void => Http.mockServerError(urlMatcher)

export const mockAccessDeniedError = (): void => Http.mockForbiddenError(urlMatcher)

export const mockSuccess = (): void => {
  cy.fixture('survey-list').then(surveys => {
    Http.mockOk(urlMatcher, surveys)
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
})
