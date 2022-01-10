import { EmailInUseError } from '@/domain/Errors'
import { AddAccountSpy, Helper, UpdateCurrentAccountMock, ValidationStub } from '@/presentation/test'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import SignUp from '.'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}
type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <SignUp validation={validationStub} addAccount={addAccountSpy} updateCurrentAccount={updateCurrentAccountMock} />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    updateCurrentAccountMock
  }
}
const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const passwordConfirmation = password
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation)
  const signupForm = await sut.findByTestId('signupForm')
  fireEvent.submit(signupForm)
  await waitFor(() => signupForm)
}

describe('SignUp Component', () => {
  test('Should start with initial state', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await Helper.testElementChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error when validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error when validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error when validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error when validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state when validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email state when validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state when validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state when validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button when form is valid', () => {
    const { sut } = makeSut()
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
  test('Should show loading on valid submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name: name,
      email: email,
      password: password,
      passwordConfirmation: password
    })
  })

  test('Should prevent to call AddAccount multiple times', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present a error message and hide load spinner when AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)

    await Helper.testElementText(sut, 'main-error', error.message)
    await Helper.testElementChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken when AddAccount succeed', async () => {
    const { sut, addAccountSpy, updateCurrentAccountMock } = makeSut()

    await simulateValidSubmit(sut)
    expect(updateCurrentAccountMock.account).toEqual(addAccountSpy.account)
    expect(history).toHaveLength(1)
    expect(history).toHaveProperty('location.pathname', '/')
  })

  test('Should present a error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    await Helper.testElementChildCount(sut, 'error-wrap', 1)
    await Helper.testElementText(sut, 'main-error', error.message)
  })

  test('Should go to login page', () => {
    const { sut } = makeSut()
    const loginLink = sut.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history).toHaveLength(2)
    expect(history.location).toHaveProperty('pathname', '/login')
  })
})
