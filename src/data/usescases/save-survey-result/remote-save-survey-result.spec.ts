import { HttpClientSpy } from '@/data/test'
import { mockRemoteSurveyResultModel } from '@/data/test/mock-remote-survey-result'
import faker from 'faker'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should call HttpClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.save({
      answer: faker.random.word()
    })

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('PUT')
  })
})
