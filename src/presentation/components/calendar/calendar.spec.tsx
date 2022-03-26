import { Calendar } from '@/presentation/components'
import { render, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2020-12-01T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('01')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should present correct icon', () => {
    makeSut(new Date('2020-05-25T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('25')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
