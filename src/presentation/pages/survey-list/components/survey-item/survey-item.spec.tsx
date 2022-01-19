import { mockSurvey } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (surveyMock = mockSurvey(1)): void => {
  render(<SurveyItem survey={surveyMock}/>)
}

describe('SurveyItem', () => {
  test('Should render with correct values', () => {
    const surveyMock = Object.assign(mockSurvey(1), {
      didAnswer: true,
      date: new Date('2020-12-01T00:00:00')
    })
    makeSut(surveyMock)
    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(surveyMock.question)
    expect(screen.getByTestId('day')).toHaveTextContent('01')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
