import faker from 'faker'
const requestAlias = 'request'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept(url, {
    delay: 100,
    statusCode: 401,
    body: {
      error: faker.random.words(5)
    }
  }).as(requestAlias)
}
export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept(url, {
    delay: 100,
    statusCode: 403,
    body: {
      error: faker.random.words(5)
    }
  }).as(requestAlias)
}

export const mockUnexpectedError = (url: RegExp): void => {
  cy.intercept(url, {
    delay: 100,
    statusCode: faker.helpers.randomize([400, 402, 404, 500]),
    body: {
      accessToken: faker.datatype.uuid()
    }
  }).as(requestAlias)
}

export const mockOk = <R>(url: RegExp, response: R): void => {
  cy.intercept(url, {
    delay: 100,
    statusCode: 200,
    body: response
  }).as(requestAlias)
}

export const mockInvalidDataIntegration = <R>(url: RegExp, response: R): void => {
  cy.intercept(url, {
    delay: 100,
    statusCode: 200,
    body: response
  }).as(requestAlias)
}
