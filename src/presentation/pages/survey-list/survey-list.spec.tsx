import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import SurveyList from '.'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount= 0
  surveys = mockSurveyList(3)

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++

    return await Promise.resolve(this.surveys)
  }
}
interface SutTypes {
  loadSurveyList: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy}/>)

  return {
    loadSurveyList: loadSurveyListSpy
  }
}

describe('SurveyList', () => {
  it('Should present a list with 4 empty items on start', async () => {
    makeSut()
    const emptyList = screen.queryByRole('list')
    expect(emptyList.children.length).toBe(4)
    await waitFor(() => emptyList)
  })

  it('Should call  LoadSurveyList on start', async () => {
    const { loadSurveyList } = makeSut()

    expect(loadSurveyList.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('Should render survey items on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
