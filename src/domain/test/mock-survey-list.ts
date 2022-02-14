import { LoadSurveyList } from '@/domain/usecases'
import faker from 'faker'

export const mockSurvey = (): LoadSurveyList.Model => {
  return {
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean(),
    id: faker.datatype.uuid(),
    question: faker.random.words()
  }
}

export const mockSurveyList = (numberOfSurveys: number): LoadSurveyList.Model[] => {
  const surveys: LoadSurveyList.Model[] = []

  for (let index = 0; index < numberOfSurveys; index++) {
    surveys.push(mockSurvey())
  }

  return surveys
}

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyList(3)

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++

    return await Promise.resolve(this.surveys)
  }
}
