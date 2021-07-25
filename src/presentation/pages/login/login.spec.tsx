import React from 'react'
import { render } from '@testing-library/react'
import Login from './index'

describe('Login Component', () => {
  test('Should not render Spinner and erro on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Should not start with submite button enabled', () => {
    const { getByTestId } = render(<Login />)
    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(true)
  })
})
