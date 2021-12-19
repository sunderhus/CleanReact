import faker from 'faker'
import * as FormHelper from '../support/form-helper'

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
    cy.getByTestId('name').type(faker.random.alphaNumeric(5))
    cy.getByTestId('email').type(faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').type(password)
    cy.getByTestId('passwordConfirmation').type(password)

    FormHelper.testInputStatus('name', '')
    FormHelper.testInputStatus('email', '')
    FormHelper.testInputStatus('password', '')
    FormHelper.testInputStatus('passwordConfirmation', '')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })
})
