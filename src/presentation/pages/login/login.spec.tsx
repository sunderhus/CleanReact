import React from 'react'
import { InvalidCredentialsError } from '@/domain/Errors'
import { Authentication } from '@/domain/usecases'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, Helper, ValidationStub } from '@/presentation/test'
import { populateField } from '@/presentation/test/form-helper'
import { act, fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock(account: Authentication.Model): void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {

    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField('email', email)
  populateField('password', password)
  const form = await screen.findByTestId('form')

  fireEvent.submit(form)
}

describe('Login Component', () => {
  test('Should not render Spinner and erro on start', () => {
    makeSut()
    const errorWrap = screen.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should not start with submit button enabled', () => {
    const validationError = faker.lorem.words(2)
    makeSut({ validationError })

    expect(screen.queryByTestId('submit')).toBeDisabled()
  })

  test('Should start email field with default title', () => {
    const validationError = faker.random.words(2)
    makeSut({ validationError })

    Helper.testStatusForField('email', validationError)
  })

  test('Should start password field with default title', () => {
    const validationError = faker.lorem.words(2)
    makeSut({ validationError })

    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    makeSut({ validationError })
    populateField('email')

    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    makeSut({ validationError })

    populateField('password')

    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state when Validation succeeds', () => {
    makeSut()

    populateField('email')

    Helper.testStatusForField('email')
  })

  test('Should show valid password state when Validation succeeds', () => {
    makeSut()

    populateField('password')

    Helper.testStatusForField('password')
  })

  test('Should focus input when label recive a click', () => {
    makeSut()
    const input = screen.getByTestId('password')
    const label = screen.getByTestId('password-label')

    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })

  test('Should enable submit button when form is valid', () => {
    makeSut()

    populateField('email')
    populateField('password')

    expect(screen.queryByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.lorem.words(2)
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await act(async () => simulateValidSubmit())

    expect(screen.queryByTestId('error-wrap').children).toHaveLength(1)
    expect(screen.queryByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should call UpdateCurrentAccount on success and navigate to main page', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    await screen.findByTestId('form')

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signUp page', () => {
    makeSut()
    const signUpLink = screen.getByTestId('signup-link')
    fireEvent.click(signUpLink)

    expect(history.action).toBe('PUSH')
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
