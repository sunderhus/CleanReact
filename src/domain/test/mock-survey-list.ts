import { SurveyAnswerModel, SurveyModel } from '@/domain/models'
import faker from 'faker'

const mockSurveyAnswer = (quantity: number): SurveyAnswerModel[] => {
  const answers: SurveyAnswerModel[] = []

  for (let index = 0; index < quantity; index++) {
    const image = faker.datatype.boolean() ? faker.random.image() : ''
    const answer: SurveyAnswerModel = {
      answer: faker.random.words(),
      image
    }

    answers.push(answer)
  }

  return answers
}

export const mockSurvey = (numberOfAnswers: number): SurveyModel => {
  return {
    answers: [...mockSurveyAnswer(numberOfAnswers)],
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean(),
    id: faker.datatype.uuid(),
    question: faker.random.words()
  }
}

export const mockSurveyList = (numberOfSurveys: number): SurveyModel[] => {
  const surveys: SurveyModel[] = []

  for (let index = 0; index < numberOfSurveys; index++) {
    surveys.push(mockSurvey(faker.datatype.number({ min: 1, max: 5 })))
  }

  return surveys
}
