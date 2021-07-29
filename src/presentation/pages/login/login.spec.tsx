import React from 'react'
import faker from 'faker'
import { act, cleanup, fireEvent, getByTestId, render, RenderResult, waitFor } from '@testing-library/react'
import Login from './index'
import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { mockAccountModel } from '@/domain/test'
import { InvalidCredentialsError } from '@/domain/Errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')

  act(() => {
    fireEvent.input(passwordInput, { target: { value: password } })
  })
}
const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  act(() => {
    fireEvent.input(emailInput, { target: { value: email } })
  })
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  const submitButton = sut.getByTestId('submit')

  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  fireEvent.click(submitButton)
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should not render Spinner and erro on start', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should not start with submite button enabled', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(true)
  })

  test('Should start email field with default title', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })

    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should start password field with default title', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show email error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)

    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)

    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state when Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    simulateStatusForField(sut, 'email')
  })

  test('Should show valid password state when Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    simulateStatusForField(sut, 'password')
  })

  test('Should enable submit buton when form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.lorem.words(2)
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateEmailField(sut)

    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)

    const errorWrap = await sut.findByTestId('error-wrap')
    const mainError = await sut.findByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })
})
