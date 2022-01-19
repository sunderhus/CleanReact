import React from 'react'
import { screen, render } from '@testing-library/react'
import SurveyList from '.'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount= 0;
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++

    return await Promise.resolve(null)
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
  it('Should present a list with 4 empty items on start', () => {
    makeSut()
    const emptyList = screen.queryByRole('list')
    expect(emptyList.children.length).toBe(4)
  })

  it('Should call  LoadSurveyList on start', () => {
    const { loadSurveyList } = makeSut()

    expect(loadSurveyList.callsCount).toBe(1)
  })
})
