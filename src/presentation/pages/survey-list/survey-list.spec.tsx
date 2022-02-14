import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { UnexpectedError } from '@/domain/Errors'
import { LoadSurveyListSpy } from '@/domain/test'
import SurveyList from '.'

interface SutTypes {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy: loadSurveyListSpy
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
    const { loadSurveyListSpy } = makeSut()

    expect(loadSurveyListSpy.callsCount).toBe(1)
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

  it('Should call LoadSurveylist on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveyListSpy)
    await screen.findByRole('heading')
    fireEvent.click(screen.queryByTestId('reload'))
    await screen.findByRole('list')

    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
