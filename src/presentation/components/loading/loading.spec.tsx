import React from 'react'
import { Loading } from '@/presentation/components'
import { render, screen } from '@testing-library/react'

const makeSut = (): void => {
  render(<Loading />)
}

describe('Loading', () => {
  it('should be able to render with correct Spinner', () => {
    makeSut()

    const spinner = screen.getByTestId('spinner')

    expect(spinner.classList).toContain('negative')
  })
})
