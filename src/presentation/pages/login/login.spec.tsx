import React from 'react'
import { render } from '@testing-library/react'
import Login from './index'

describe('', () => {
  test('Should not render Spinner and erro on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })
})
