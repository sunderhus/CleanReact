import React from 'react'
import Spinner from '@/presentation/components/spinner'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

const makeSut = (isNegative = false, customClass?: string): void => {
  render(<Spinner isNegative={isNegative} className={customClass} />)
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

  it('Should have custom class when its provided', () => {
    const customClass = faker.random.word()
    makeSut(true, customClass)

    const loading = screen.getByTestId('spinner')

    expect(loading.classList).toContain(customClass)
  })

  it('Should not add class undefined when its not provided a className', () => {
    makeSut()

    const loading = screen.getByTestId('spinner')

    expect(loading.classList).not.toContain('undefined')
  })
})
