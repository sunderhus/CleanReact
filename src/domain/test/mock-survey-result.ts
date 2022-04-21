import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10)
})

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(),
    date: faker.date.recent(),
    answers: [
      {
        answer: faker.lorem.words(8),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100, min: 0 }),
        image: faker.image.imageUrl(),
        isCurrentAccountAnswer: true
      },
      {
        answer: faker.lorem.words(8),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100, min: 0 }),
        isCurrentAccountAnswer: false
      }
    ]
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return await Promise.resolve(this.surveyResult)
  }
}
