import { RemoteLoadSurveyResult } from '@/data/usescases/load-survey-result/remote-load-survey-result'

import faker from 'faker'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => {
  return {
    answers: [
      {
        asnwer: faker.lorem.words(8),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100, min: 0 }),
        image: faker.image.imageUrl()
      },
      {
        asnwer: faker.lorem.words(4),
        count: faker.datatype.number(),
        percent: faker.datatype.number({ max: 100, min: 0 })
      }
    ],
    date: faker.date.recent().toISOString(),
    question: faker.lorem.words(10)
  }
}
