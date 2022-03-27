import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

const makeSut = (): void => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn(() => mockAccountModel())

  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: getCurrentAccountMock
    }}>
      <SurveyResult />
    </ApiContext.Provider>
  )
}

describe('SurveyResult', () => {
  it('Should start with correct initial state', () => {
    makeSut()

    const surveyResult = screen.getByTestId('survey-result')
    const error = screen.queryByTestId('error')
    const loading = screen.queryByTestId('loading')

    expect(surveyResult).toBeEmptyDOMElement()
    expect(loading).not.toBeInTheDocument()
    expect(error).not.toBeInTheDocument()
  })
})
