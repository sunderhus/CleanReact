import { EmailInUseError } from '@/domain/Errors'
import { AddAccount } from '@/domain/usecases'
import { Helper, ValidationStub, AddAccountSpy, SaveAccessTokenMock } from '@/presentation/test'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import SignUp from '.'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}
type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <SignUp validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}
const simutaleValidSubmit = async (
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
    await simutaleValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simutaleValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name: name,
      email: email,
      password: password,
      passwordConfirmation: password
    })
  })

  test('Should prevent to call AddAccount multiple times', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simutaleValidSubmit(sut)
    await simutaleValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })

    await simutaleValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present a error message and hide load spinner when AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simutaleValidSubmit(sut)

    await Helper.testElementText(sut, 'main-error', error.message)
    await Helper.testElementChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken when AddAccount succeed', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()

    await simutaleValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history).toHaveLength(1)
    expect(history).toHaveProperty('location.pathname', '/')
  })
})
