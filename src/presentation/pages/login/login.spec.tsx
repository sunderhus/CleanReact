import React from 'react'
import 'jest-localstorage-mock'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { InvalidCredentialsError } from '@/domain/Errors'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { act, cleanup, findByTestId, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import Login from './index'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

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

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = await sut.findByTestId('form')

  fireEvent.submit(form)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testElementExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)

  expect(element).toBeTruthy()
}

const testElementChildCount = async (sut: RenderResult, testId: string, count: number): Promise<void> => {
  const wrapElement = await sut.findByTestId(testId)
  expect(wrapElement.childElementCount).toBe(count)
}

const testElementText = async (sut: RenderResult, testId: string, text: string): Promise<void> => {
  const element = await sut.findByTestId('main-error')
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Login Component', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should not render Spinner and erro on start', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should not start with submite button enabled', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    testButtonIsDisabled(sut, 'submit', true)
  })

  test('Should start email field with default title', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })

    testStatusForField(sut, 'email', validationError)
  })

  test('Should start password field with default title', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)

    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error when Validation fails', () => {
    const validationError = faker.lorem.words(2)
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)

    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state when Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    testStatusForField(sut, 'email')
  })

  test('Should show valid password state when Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    testStatusForField(sut, 'password')
  })

  test('Should enable submit buton when form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    testElementExists(sut, 'spinner')
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

    await testElementChildCount(sut, 'error-wrap', 1)
    await testElementText(sut, 'main-error', error.message)
  })

  test('Should add accessToken to localStorage on success and navigate to main page', async () => {
    const { sut, authenticationSpy } = makeSut()

    await simulateValidSubmit(sut)

    await sut.findByTestId('form')

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signUp page', () => {
    const { sut } = makeSut()
    const signUpLink = sut.getByTestId('signup')
    fireEvent.click(signUpLink)

    expect(history.action).toBe('PUSH')
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
