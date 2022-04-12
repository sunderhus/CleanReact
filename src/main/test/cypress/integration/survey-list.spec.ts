
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'
const urlMatcher = /surveys/

export const mockUnexpectedError = (): void => Http.mockServerError(urlMatcher)

export const mockAccessDeniedError = (): void => Http.mockForbiddenError(urlMatcher)

export const mockSuccess = (): void => {
  cy.fixture('survey-list').then(surveys => {
    Http.mockOk(urlMatcher, surveys)
  })
}

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
    cy.visit('/')
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

    cy.getByTestId('survey-list')
      .children('li:not(:empty)')
      .should('have.length', 3)
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    Helper.testUrl('/login')
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

  it('Should present a list of surveys', () => {
    mockSuccess()
    cy.getByTestId('survey-list').as('wrapper')
    cy.get('li:empty').as('empty-list')

    cy.get('@empty-list').should('have.length', 4)
    cy.get('@wrapper').children('li').should('have.length', 3)
  })

  it('Should display correctly all surveys', () => {
    mockSuccess()
    cy.getByTestId('survey-list').as('wrapper')
    cy.getByTestId('survey-list').children('li:nth-child(1)').as('first-survey')
    cy.getByTestId('survey-list').children('li:nth-child(2)').as('second-survey')
    cy.getByTestId('survey-list').children('li:nth-child(3)').as('third-survey')

    cy.get('@first-survey')
      .should('contain.text', 'Question 1')
      .should('contain.text', '2022')
      .should('contain.text', 'jan')
      .should('contain.text', '03')
      .should('contain.text', 'Ver resultado')

    cy.get('@second-survey')
      .should('contain.text', 'Question 2')
      .should('contain.text', '2021')
      .should('contain.text', 'fev')
      .should('contain.text', '13')
      .should('contain.text', 'Ver resultado')

    cy.get('@third-survey')
      .should('contain.text', 'Question 3')
      .should('contain.text', '2022')
      .should('contain.text', 'jun')
      .should('contain.text', '11')
      .should('contain.text', 'Ver resultado')

    cy.fixture('icons').then(icons => {
      cy.get('@first-survey').find('img').should('have.attr', 'src', icons.thumbUp)
      cy.get('@second-survey').find('img').should('have.attr', 'src', icons.thumbDown)
      cy.get('@third-survey').find('img').should('have.attr', 'src', icons.thumbUp)
    })
  })
})
