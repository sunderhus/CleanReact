import { InvalidCredentialsError } from '@/domain/Errors'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, Helper, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import { populateField } from '@/presentation/test/form-helper'
import { act, cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)
  const form = await sut.findByTestId('form')

  fireEvent.submit(form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render Spinner and erro on start', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should not start with submit button enabled', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    Helper.testButtonIsDisabled(sut, 'submit', true)
  })

  test('Should start email field with default title', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })

    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should start password field with default title', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })
    populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state when Validation succeeds', () => {
    const { sut } = makeSut()

    populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state when Validation succeeds', () => {
    const { sut } = makeSut()

    populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password')
  })

  test('Should focus input when label recive a click', () => {
    const { sut } = makeSut()
    const input = sut.getByTestId('password')
    const label = sut.getByTestId('password-label')

    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })

  test('Should enable submit buton when form is valid', () => {
    const { sut } = makeSut()

    populateField(sut, 'email')
    populateField(sut, 'password')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.lorem.words(2)
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await act(async () => simulateValidSubmit(sut))

    await Helper.testElementChildCount(sut, 'error-wrap', 1)
    await Helper.testElementText(sut, 'main-error', error.message)
  })

  test('Should call SaveAccessToken on success and navigate to main page', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    await simulateValidSubmit(sut)

    await sut.findByTestId('form')

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    await Helper.testElementChildCount(sut, 'error-wrap', 1)
    await Helper.testElementText(sut, 'main-error', error.message)
  })

  test('should go to signUp page', () => {
    const { sut } = makeSut()
    const signUpLink = sut.getByTestId('signup-link')
    fireEvent.click(signUpLink)

    expect(history.action).toBe('PUSH')
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
