import { EmailInUseError } from '@/domain/Errors'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/contexts'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import SignUp from '.'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock(account: AccountModel): void
}
type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn()
  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}
const simulateValidSubmit = async (
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const passwordConfirmation = password
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', passwordConfirmation)
  const signupForm = await screen.findByTestId('signupForm')
  fireEvent.submit(signupForm)
  await waitFor(() => signupForm)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testElementChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error when validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error when validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error when validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error when validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state when validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('Should show valid email state when validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state when validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation state when validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button when form is valid', () => {
    makeSut()
    Helper.testButtonIsDisabled('submit', false)
  })
  test('Should show loading on valid submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      name: name,
      email: email,
      password: password,
      passwordConfirmation: password
    })
  })

  test('Should prevent to call AddAccount multiple times', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present a error message and hide load spinner when AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()

    Helper.testElementText('main-error', error.message)
    Helper.testElementChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken when AddAccount succeed', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history).toHaveLength(1)
    expect(history).toHaveProperty('location.pathname', '/')
  })

  test('Should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history).toHaveLength(2)
    expect(history.location).toHaveProperty('pathname', '/login')
  })
})
