import { LoadSurveyResult } from '@/domain/usecases'
import faker from 'faker'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(),
    date: faker.date.recent(),
    answers: [
      {
        asnwer: faker.lorem.words(8),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100, min: 0 }),
        image: faker.image.imageUrl(),
        isCurrentAccountAnswer: faker.datatype.boolean()
      },
      {
        asnwer: faker.lorem.words(8),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100, min: 0 }),
        isCurrentAccountAnswer: faker.datatype.boolean()
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
