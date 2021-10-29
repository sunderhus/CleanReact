import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignUp from '.'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}
const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp
    />
  )

  return {
    sut
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', async () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    await Helper.testElementChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
