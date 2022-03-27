import React from 'react'
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'
import { render, screen, waitFor } from '@testing-library/react'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn(() => mockAccountModel())

  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: getCurrentAccountMock
    }}>
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult', () => {
  it('Should start with correct initial state', async () => {
    makeSut()

    const surveyResult = screen.getByTestId('survey-result')
    const error = screen.queryByTestId('error')
    const loading = screen.queryByTestId('loading')

    expect(surveyResult).toBeEmptyDOMElement()
    expect(loading).not.toBeInTheDocument()
    expect(error).not.toBeInTheDocument()

    await waitFor(() => surveyResult)
  })

  it('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()

    await waitFor(() => {
      screen.getAllByTestId('survey-result')
    })

    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
