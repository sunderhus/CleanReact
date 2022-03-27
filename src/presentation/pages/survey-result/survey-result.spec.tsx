import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn(() => mockAccountModel())

  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.surveyResult = surveyResult

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

    await screen.findByTestId('survey-result')

    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  it('Should present SurveyResult answers on success', async () => {
    const surveyResultStub = Object.assign(mockSurveyResultModel(), {
      date: new Date('2022-01-10T00:00:00')
    })
    makeSut(surveyResultStub)

    await screen.findByTestId('survey-result')
    const [firstImage, secondImage] = screen.queryAllByTestId('image')
    const [firstAnswer, secondAnswer] = screen.queryAllByTestId('answer')
    const [firstPercent, secondPercent] = screen.queryAllByTestId('percent')
    const [firstAnswerWrap, secondAnswerWrap] = screen.queryAllByTestId('answer-wrap')

    expect(firstAnswerWrap).toHaveClass('active')
    expect(secondAnswerWrap).not.toHaveClass('active')
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResultStub.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    expect(firstImage).toHaveAttribute('src', surveyResultStub.answers[0].image)
    expect(firstImage).toHaveAttribute('alt', surveyResultStub.answers[0].asnwer)
    expect(secondImage).toBeFalsy()
    expect(firstAnswer).toHaveTextContent(surveyResultStub.answers[0].asnwer)
    expect(secondAnswer).toHaveTextContent(surveyResultStub.answers[1].asnwer)
    expect(firstPercent).toHaveTextContent(`${surveyResultStub.answers[0].percent}%`)
    expect(secondPercent).toHaveTextContent(`${surveyResultStub.answers[1].percent}%`)
  })
})
