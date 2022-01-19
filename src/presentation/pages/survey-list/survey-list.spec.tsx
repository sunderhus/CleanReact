import React from 'react'
import { screen, render } from '@testing-library/react'
import SurveyList from '.'

const makeSut = (): void => {
  render(<SurveyList/>)
}

describe('SurveyList', () => {
  it('Should present a list with 4 empty items on start', () => {
    makeSut()
    const emptyList = screen.queryByRole('list')
    expect(emptyList.children.length).toBe(4)
  })
})
