
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'
const urlMatcher = /survey[s]/

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
    cy.visit('/surveys')
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

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    Helper.testUrl('/login')
  })

  it('Should present surveyResult', () => {
    mockSuccess()

    cy.getByTestId('answers').children('li:nth-child(1)').as('first-surveyResult')
    cy.getByTestId('answers').children('li:nth-child(1)').children('img').as('first-surveyResult-image')
    cy.getByTestId('answers').children('li:nth-child(2)').as('second-surveyResult')

    cy.getByTestId('question').should('contain.text', 'Question 1')
    cy.getByTestId('day').should('contain.text', '11')
    cy.getByTestId('month').should('contain.text', 'abr')
    cy.getByTestId('year').should('contain.text', '2022')
    cy.get('@first-surveyResult')
      .should('contain.text', 'any_answer')
      .should('contain.text', '12%')
    cy.get('@first-surveyResult-image')
      .should('have.attr', 'src', 'any_image')
    cy.get('@second-surveyResult')
      .should('contain.text', 'any_answer_2')
      .should('contain.text', '88%')
  })

  it('Should logout ', () => {
    cy.visit('')
    mockSuccess()
    cy.visit('/survey/any_id')

    cy.getByTestId('back-button').click()

    Helper.testUrl('/')
  })
})
