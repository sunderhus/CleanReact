import { mockSurvey } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (surveyMock = mockSurvey()): void => {
  render(<SurveyItem survey={surveyMock}/>)
}

describe('SurveyItem', () => {
  test('Should render with correct values', () => {
    const surveyMock = Object.assign(mockSurvey(), {
      didAnswer: true
    })
    makeSut(surveyMock)

    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(surveyMock.question)
  })

  test('Should present correct icon', () => {
    const surveyMock = Object.assign(mockSurvey(), {
      didAnswer: false
    })
    makeSut(surveyMock)

    expect(screen.getByRole('img')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(surveyMock.question)
  })
})
