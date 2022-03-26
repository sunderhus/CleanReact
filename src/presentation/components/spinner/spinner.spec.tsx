import React from 'react'
import Spinner from '@/presentation/components/spinner'
import { render, screen } from '@testing-library/react'

const makeSut = (isNegative = false): void => {
  render(<Spinner isNegative={isNegative} />)
}

describe('Spinner', () => {
  it('Should present correct loading color when is not negative', () => {
    makeSut()

    const loading = screen.getByTestId('spinner')

    expect(loading.classList).not.toContain('negative')
  })

  it('Should present correct loading color when is negative', () => {
    makeSut(true)

    const loading = screen.getByTestId('spinner')

    expect(loading.classList).toContain('negative')
  })
})
