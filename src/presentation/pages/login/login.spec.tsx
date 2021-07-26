import { ValidationStub } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import Login from './index'

type SutTypes ={
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.lorem.words(2)
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(() => {
    cleanup()
  })

  test('Should not render Spinner and erro on start', () => {
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should not start with submite button enabled', () => {
    const { sut } = makeSut()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(true)
  })

  test('Should start email field with default title', () => {
    const { sut, validationStub } = makeSut()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should start password field with default title', () => {
    const { sut, validationStub } = makeSut()

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error when Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error when Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state when Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
