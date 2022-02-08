import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import SurveyList from '.'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'
import { UnexpectedError } from '@/domain/Errors'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyList(3)

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++

    return await Promise.resolve(this.surveys)
  }
}
interface SutTypes {
  loadSurveyList: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyList: loadSurveyListSpy
  }
}

describe('SurveyList', () => {
  it('Should present a list with 4 empty items on start', async () => {
    makeSut()
    const emptyList = screen.queryByRole('list')
    expect(emptyList.children.length).toBe(4)
    await screen.findByRole('heading')
    const errorWrapper = screen.queryByTestId('error')
    expect(errorWrapper).not.toBeInTheDocument()
  })

  it('Should call  LoadSurveyList on start', async () => {
    const { loadSurveyList } = makeSut()

    expect(loadSurveyList.callsCount).toBe(1)
    await screen.findByRole('heading')
  })

  it('Should render survey items on success', async () => {
    makeSut()
    await screen.findByRole('list')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('Should handle error on load fails', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    const surveyList = await screen.findByRole('list')
    expect(surveyList).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })
})
