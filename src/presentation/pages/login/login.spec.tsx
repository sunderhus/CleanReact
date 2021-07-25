import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './index'

type SutTypes ={
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)

  return {
    sut
  }
}

describe('Login Component', () => {
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

  test('Should start with defaults inputs status titles ', () => {
    const { sut } = makeSut()
    const emailStatus = sut.getByTestId('email-status') as HTMLButtonElement
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status') as HTMLButtonElement
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
