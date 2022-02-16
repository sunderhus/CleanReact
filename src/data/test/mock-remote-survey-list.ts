import { RemoteLoadSurveyList } from '@/data/usescases'
import faker from 'faker'

export const mockRemoteSurvey = (): RemoteLoadSurveyList.Model => {
  return {
    date: faker.date.recent().toISOString(),
    didAnswer: faker.datatype.boolean(),
    id: faker.datatype.uuid(),
    question: faker.random.words()
  }
}

export const mockRemoteSurveyList = (numberOfSurveys: number): RemoteLoadSurveyList.Model[] => {
  const surveys: RemoteLoadSurveyList.Model[] = []

  for (let index = 0; index < numberOfSurveys; index++) {
    surveys.push(mockRemoteSurvey())
  }

  return surveys
}
