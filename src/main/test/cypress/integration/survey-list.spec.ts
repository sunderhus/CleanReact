
import faker from 'faker'
import * as Http from '../support/survey-list-mocks'
import * as Helper from '../support/helpers'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName()
    })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()

    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
  })

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()

    Helper.testUrl('/')
  })

  it('Should present correct username', () => {
    Http.mockOk()
    const account = Helper.getLocalStorageItem<{name: string}>('account')

    cy.getByTestId('username').should('contain.text', account.name)
  })
})
